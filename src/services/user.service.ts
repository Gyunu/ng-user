import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {
  USERCONFIG,
  Storage
} from "../contracts/index";


@Injectable()
export class UserService {

  //the current user
  public current;
  public users = {};

  private storage: Storage;


  constructor(
    @Inject(USERCONFIG) private config
  ) {
  }

  public setDiskStorage(storage: Storage) {
    this.storage = storage;
  }

  public getAvailableUsers(): Observable<any> {
    if(!this.storage) {
      throw new Error('Users Module: Storage not set');
    }

    let observable = Observable.create(
      (observer) => {
        this.storage.getItem(this.config.prefix)
        .then(
          (success) => {
            if(success) {
              console.log('users parsed', JSON.parse(success));
              console.log('users', success);
            }
            else {
              console.log('users no data', success);
            }

          },
          (error) => {
            console.log('error', error);
          }
        );
    });

    return observable;
  }

  public save(name: string, user): Observable<any> {
    if(!this.storage) {
      throw new Error('Users Module: Storage not set');
    }

    let observable = Observable.create(
      (observer) => {
        this.users[name] = user;
        console.log('Users Module: Save: current state', this.users);
        this.storage.setItem(this.config.prefix, JSON.stringify(this.users))
        .then(
          (success) => {
            console.log('user saved', success);
            observer.next(true);
            observer.complete();
          },
          (error) => {
            console.log('user save error', error);
            observer.error();
          }
        );
    });

    return observable;
  }

  public get(name: string): Observable<any> {
    if(!this.storage) {
      throw new Error('Users Module: Storage not set');
    }

    const observable = Observable.create(
      (observer) => {
        if(this.users[name]) {
          console.log('Users Module: Getting from memCache', this.users[name]);
          observer.next(this.users[name]);
          observer.complete();
        }
        else {
          console.log('Users Module: Getting From Storage', this.config.prefix);
          this.storage.getItem(this.config.prefix)
          .then(
            (success) => {
              console.log('Users Module: Getting From Storage SUCCESS', success);            
              let user = null;
              if(success) {   
                user = JSON.parse(success)[name]; 
              }

              observer.next(user);
              observer.complete();
            },
            (error) => {
              console.log('Users Module: Getting From Storage ERROR', error);
              observer.error(error);
              observer.complete();
            }
          )
        }
    });

    return observable;
  }

  public validate(user): boolean {
    let valid: boolean[] = [];
    for(let field in this.config.schema) {
      if(this.config.schema[field].required) {
        if(!user[field] || user[field] == null) {
          valid.push(false);
        }
      }
    }

    return (valid.indexOf(false) > -1) ? false : true;
  }

  public remove(name: string): Observable<any> {
    const observable = Observable.create(
      (observer) => {
        this.users[name] = null;
        this.storage.setItem(this.config.prefix, this.users)
        .then(
          (success) => {
            observer.next(true);
            observer.complete();
          },
          (error) => {
            observer.error(error);
            observer.complete();
          }
        )
    });

    return observable;
  }

  public all() {
    return this.users;
  }

}
