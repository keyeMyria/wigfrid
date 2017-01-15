import {provide, PACKAGE_ROOT_URL} from '@angular/core';
import {bootstrap} from '@angular/platform-browser';
import {ListboxDirectiveRun} from './ListBoxComponentRun'


bootstrap(ListboxDirectiveRun, [provide(PACKAGE_ROOT_URL, {useValue: './../'})]);
