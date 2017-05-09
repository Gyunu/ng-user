import { NgModule, ModuleWithProviders } from '@angular/core';

/*
  Services
*/
import { UserService } from './services/index';

/*
  Contracts
*/
import {
  USERSCHEMA
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

  static forRoot(config = {schema: null}): ModuleWithProviders {
    return {
      ngModule: UserModule,
      providers: [
        {provide: UserService, useClass: UserService},
        {provide: USERSCHEMA, useValue: config.schema}
      ]
    }
  }

}
