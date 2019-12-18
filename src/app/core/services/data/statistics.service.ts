import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NEVER, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  currentUser: any;

  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService
  ) { 
    this.currentUser = this.authService.getUserData();
  }

  getMedicinesStatistics(): Observable<any> {
    return NEVER;
  }

  getStaffStatistics(): Observable<any> {
    return NEVER;
  }

  getUsersStatistics(): Observable<any> {
    return NEVER;
  }

  writeSuccessfulTransaction(element): void {
    
  }

  writeCancelledTransaction(element): void {

  }

  writeFailedTransaction(element): void {

  }
}
