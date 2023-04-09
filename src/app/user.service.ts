import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '@prisma/client';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject?: BehaviorSubject<User>;

  constructor() {
    this.userSubject = new BehaviorSubject(null as unknown as User);
  }

  public get user(): Observable<User> | undefined {
    return this.userSubject?.asObservable()
  }

  public update(input: User) {
    this.userSubject?.next(input);
  }

}