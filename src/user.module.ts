import { NgModule, ModuleWithProviders } from '@angular/core';
/*
  Services
*/
import { UserService } from './services/index';

/*
  Contracts
*/
import {
  USERCONFIG
} from "./contracts/index";



@NgModule({
  declarations: [
  ],
  imports: [],
  bootstrap: [],
  exports: [],
  entryComponents: [],
  providers: []
})
export class UserModule {

  static forRoot(config = {schema: {}, prefix: 'users'}): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [
        {provide: UserService, useClass: UserService},
        {provide: USERCONFIG, useValue: config}
      ]
    }
  }

}
