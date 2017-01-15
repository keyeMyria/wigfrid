##ProviderElementContext

```typescript
export class ProviderElementContext {
  private _contentQueries: CompileTokenMap<CompileQueryMetadata[]>;

  private _transformedProviders = new CompileTokenMap<ProviderAst>();
  private _seenProviders = new CompileTokenMap<boolean>();
  private _allProviders: CompileTokenMap<ProviderAst>;
  private _attrs: {[key: string]: string};
  private _hasViewContainer: boolean = false;
  
  /**
   *
   * @param _viewContext
   * @param _parent
   * @param _isViewRoot
   * @param _directiveAsts
   * @param attrs
   * @param refs
   * @param _sourceSpan
   */
  constructor(
      private _viewContext: ProviderViewContext, private _parent: ProviderElementContext,
      private _isViewRoot: boolean, private _directiveAsts: DirectiveAst[], attrs: AttrAst[],
      refs: ReferenceAst[], private _sourceSpan: ParseSourceSpan) {
    this._attrs = {};
    attrs.forEach((attrAst) => this._attrs[attrAst.name] = attrAst.value);
    var directivesMeta = _directiveAsts.map(directiveAst => directiveAst.directive);
    this._allProviders =
        _resolveProvidersFromDirectives(directivesMeta, _sourceSpan, _viewContext.errors);
    this._contentQueries = _getContentQueries(directivesMeta);
    var queriedTokens = new CompileTokenMap<boolean>();
    this._allProviders.values().forEach(
        (provider) => { this._addQueryReadsTo(provider.token, queriedTokens); });
    refs.forEach((refAst) => {
      this._addQueryReadsTo(new CompileTokenMetadata({value: refAst.name}), queriedTokens);
    });
    if (isPresent(queriedTokens.get(identifierToken(Identifiers.ViewContainerRef)))) {
      this._hasViewContainer = true;
    }

    // create the providers that we know are eager first
    this._allProviders.values().forEach((provider) => {
      var eager = provider.eager || isPresent(queriedTokens.get(provider.token));
      if (eager) {
        this._getOrCreateLocalProvider(provider.providerType, provider.token, true);
      }
    });
  }

  afterElement() {
    // collect lazy providers
    this._allProviders.values().forEach((provider) => {
      this._getOrCreateLocalProvider(provider.providerType, provider.token, false);
    });
  }

  get transformProviders(): ProviderAst[] { return this._transformedProviders.values(); }

  get transformedDirectiveAsts(): DirectiveAst[] {
    var sortedProviderTypes =
        this._transformedProviders.values().map(provider => provider.token.identifier);
    var sortedDirectives = ListWrapper.clone(this._directiveAsts);
    ListWrapper.sort(
        sortedDirectives, (dir1, dir2) => sortedProviderTypes.indexOf(dir1.directive.type) -
            sortedProviderTypes.indexOf(dir2.directive.type));
    return sortedDirectives;
  }

  get transformedHasViewContainer(): boolean { return this._hasViewContainer; }

  private _addQueryReadsTo(token: CompileTokenMetadata, queryReadTokens: CompileTokenMap<boolean>) {
    this._getQueriesFor(token).forEach((query) => {
      var queryReadToken = isPresent(query.read) ? query.read : token;
      if (isBlank(queryReadTokens.get(queryReadToken))) {
        queryReadTokens.add(queryReadToken, true);
      }
    });
  }

  private _getQueriesFor(token: CompileTokenMetadata): CompileQueryMetadata[] {
    var result: CompileQueryMetadata[] = [];
    var currentEl: ProviderElementContext = this;
    var distance = 0;
    var queries: CompileQueryMetadata[];
    while (currentEl !== null) {
      queries = currentEl._contentQueries.get(token);
      if (isPresent(queries)) {
        ListWrapper.addAll(result, queries.filter((query) => query.descendants || distance <= 1));
      }
      if (currentEl._directiveAsts.length > 0) {
        distance++;
      }
      currentEl = currentEl._parent;
    }
    queries = this._viewContext.viewQueries.get(token);
    if (isPresent(queries)) {
      ListWrapper.addAll(result, queries);
    }
    return result;
  }


  private _getOrCreateLocalProvider(
      requestingProviderType: ProviderAstType, token: CompileTokenMetadata,
      eager: boolean): ProviderAst {
    var resolvedProvider = this._allProviders.get(token);
    if (isBlank(resolvedProvider) ||
        ((requestingProviderType === ProviderAstType.Directive ||
          requestingProviderType === ProviderAstType.PublicService) &&
         resolvedProvider.providerType === ProviderAstType.PrivateService) ||
        ((requestingProviderType === ProviderAstType.PrivateService ||
          requestingProviderType === ProviderAstType.PublicService) &&
         resolvedProvider.providerType === ProviderAstType.Builtin)) {
      return null;
    }
    var transformedProviderAst = this._transformedProviders.get(token);
    if (isPresent(transformedProviderAst)) {
      return transformedProviderAst;
    }
    if (isPresent(this._seenProviders.get(token))) {
      this._viewContext.errors.push(new ProviderError(
          `Cannot instantiate cyclic dependency! ${token.name}`, this._sourceSpan));
      return null;
    }
    this._seenProviders.add(token, true);
    var transformedProviders = resolvedProvider.providers.map((provider) => {
      var transformedUseValue = provider.useValue;
      var transformedUseExisting = provider.useExisting;
      var transformedDeps: CompileDiDependencyMetadata[];
      if (isPresent(provider.useExisting)) {
        var existingDiDep = this._getDependency(
            resolvedProvider.providerType,
            new CompileDiDependencyMetadata({token: provider.useExisting}), eager);
        if (isPresent(existingDiDep.token)) {
          transformedUseExisting = existingDiDep.token;
        } else {
          transformedUseExisting = null;
          transformedUseValue = existingDiDep.value;
        }
      } else if (isPresent(provider.useFactory)) {
        var deps = isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
        transformedDeps =
            deps.map((dep) => this._getDependency(resolvedProvider.providerType, dep, eager));
      } else if (isPresent(provider.useClass)) {
        var deps = isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
        transformedDeps =
            deps.map((dep) => this._getDependency(resolvedProvider.providerType, dep, eager));
      }
      return _transformProvider(provider, {
        useExisting: transformedUseExisting,
        useValue: transformedUseValue,
        deps: transformedDeps
      });
    });
    transformedProviderAst =
        _transformProviderAst(resolvedProvider, {eager: eager, providers: transformedProviders});
    this._transformedProviders.add(token, transformedProviderAst);
    return transformedProviderAst;
  }

  private _getLocalDependency(
      requestingProviderType: ProviderAstType, dep: CompileDiDependencyMetadata,
      eager: boolean = null): CompileDiDependencyMetadata {
    if (dep.isAttribute) {
      var attrValue = this._attrs[dep.token.value];
      return new CompileDiDependencyMetadata({isValue: true, value: normalizeBlank(attrValue)});
    }
    if (isPresent(dep.query) || isPresent(dep.viewQuery)) {
      return dep;
    }

    if (isPresent(dep.token)) {
      // access builtints
      if ((requestingProviderType === ProviderAstType.Directive ||
           requestingProviderType === ProviderAstType.Component)) {
        if (dep.token.equalsTo(identifierToken(Identifiers.Renderer)) ||
            dep.token.equalsTo(identifierToken(Identifiers.ElementRef)) ||
            dep.token.equalsTo(identifierToken(Identifiers.ChangeDetectorRef)) ||
            dep.token.equalsTo(identifierToken(Identifiers.TemplateRef))) {
          return dep;
        }
        if (dep.token.equalsTo(identifierToken(Identifiers.ViewContainerRef))) {
          this._hasViewContainer = true;
        }
      }
      // access the injector
      if (dep.token.equalsTo(identifierToken(Identifiers.Injector))) {
        return dep;
      }
      // access providers
      if (isPresent(this._getOrCreateLocalProvider(requestingProviderType, dep.token, eager))) {
        return dep;
      }
    }
    return null;
  }

  private _getDependency(
      requestingProviderType: ProviderAstType, dep: CompileDiDependencyMetadata,
      eager: boolean = null): CompileDiDependencyMetadata {
    var currElement: ProviderElementContext = this;
    var currEager: boolean = eager;
    var result: CompileDiDependencyMetadata = null;
    if (!dep.isSkipSelf) {
      result = this._getLocalDependency(requestingProviderType, dep, eager);
    }
    if (dep.isSelf) {
      if (isBlank(result) && dep.isOptional) {
        result = new CompileDiDependencyMetadata({isValue: true, value: null});
      }
    } else {
      // check parent elements
      while (isBlank(result) && isPresent(currElement._parent)) {
        var prevElement = currElement;
        currElement = currElement._parent;
        if (prevElement._isViewRoot) {
          currEager = false;
        }
        result = currElement._getLocalDependency(ProviderAstType.PublicService, dep, currEager);
      }
      // check @Host restriction
      if (isBlank(result)) {
        if (!dep.isHost || this._viewContext.component.type.isHost ||
            identifierToken(this._viewContext.component.type).equalsTo(dep.token) ||
            isPresent(this._viewContext.viewProviders.get(dep.token))) {
          result = dep;
        } else {
          result = dep.isOptional ?
              result = new CompileDiDependencyMetadata({isValue: true, value: null}) :
              null;
        }
      }
    }
    if (isBlank(result)) {
      this._viewContext.errors.push(
          new ProviderError(`No provider for ${dep.token.name}`, this._sourceSpan));
    }
    return result;
  }
}
```
