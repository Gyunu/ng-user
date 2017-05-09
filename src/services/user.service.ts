import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  //the current user
  public current;

  constructor(
  ) {

  }

  public save(user) {
    console.log('saving user', user);
    //check to see if any other users are saved
    //if yes, save this user with name as key
    //if no, save this user with name as key, alias a default user as this user
  }

  public get(username) {
    //if username is passed, return that user if found
      //if not found return null
    //if username is not passed, return the default user
      //if not found return null
  }

  public validate(user) {
    //validate the user against the schema provided in the config
      //if pass, return true
      //if fail, return false
  }

  public remove(user) {
    //remove the user from storage
  }

  public all() {
    //return all the users saved
  }

}
