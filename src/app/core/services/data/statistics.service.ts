import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NEVER, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  staffEmail: string;

  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService
  ) { 
    this.staffEmail = this.authService.getUserData().email;
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

  writeUnBookedTransaction(element): void {

  }

  writeFailedTransaction(element): void {

  }
}
