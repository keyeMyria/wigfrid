export class CompileIdentifierMetadata {
  reference: any;
  name: string;
  prefix: string;
  moduleUrl: string;
  value: any;

  constructor(
      {reference, name, moduleUrl, prefix, value}:
          {reference?: any, name?: string, moduleUrl?: string, prefix?: string, value?: any} = {}) {
    this.reference = reference;
    this.name = name;
    this.prefix = prefix;
    this.moduleUrl = moduleUrl;
    this.value = value;
  }

  get identifier(): CompileIdentifierMetadata { return this; }
}
