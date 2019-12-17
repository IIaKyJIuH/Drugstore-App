import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(
    private database: AngularFireDatabase
  ) { }

  writeUnBookedTransaction(transaction): void {

  }

  writeSuccessfulTransaction(transaction): void {

  }

  writeFailedTransaction(transaction): void {
    
  }
}
