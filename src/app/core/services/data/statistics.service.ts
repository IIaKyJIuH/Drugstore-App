import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { MedicineStatisticsDto } from '../dtos/statistics/medicine-statistics-dto';
import { PeopleStatisticsDto } from '../dtos/statistics/people-statistics-dto';
import { UserStatisticsDto } from '../dtos/statistics/user-statistics-dto';
import { BookingModel } from '../models/bookings/booking-model';
import { MedicineModel } from '../models/medicines/medicine-model';
import { MedicineStatisticsModel } from '../models/statistics/medicine-statistics-model';
import { PeopleStatisticsModel } from '../models/statistics/people-statistics-model';
import { UserStatisticsModel } from '../models/statistics/user-statistics-model';
import { ProjectFunctions } from './project-functions';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  /**
   * Converts dto<t>[] to model<t>[]
   * @param dtoArr - to be converted.
   * @return model related to dto.
   */
  private static mapDtoArrayToModelArray(dtoArr: MedicineStatisticsDto[] | PeopleStatisticsDto[] | UserStatisticsDto[])
    : MedicineStatisticsModel[] | PeopleStatisticsModel[] | UserStatisticsModel[] {
    const resultArr = [];
    if (StatisticsService.isMedicineStatistics(dtoArr)) {
      for (const dto of (dtoArr as MedicineStatisticsDto[])) {
        resultArr.push(new MedicineStatisticsModel({
          name: dto.term,
          purchasesAmount: dto.purchased,
          key: dto.key
        }))
      }
    } else if (StatisticsService.isUserStatistics(dtoArr)) {
      for (const dto of (dtoArr as UserStatisticsDto[])) {
        resultArr.push(new UserStatisticsModel({
          email: dto.email,
          purchasesAmount: dto.purchasedItems,
          cancellationsAmount: dto.cancelledBookings,
          failuresAmount: dto.failures,
          key: dto.key
        }))
      }
    } else {
      for (const dto of (dtoArr as PeopleStatisticsDto[])) {
        resultArr.push(new PeopleStatisticsModel({
          email: dto.email,
          purchasesAmount: dto.purchasedItems,
          key: dto.key
        }))
      }
    }
    return resultArr;
  }

  /**
   * Checks if the given array is of specific type.
   * @param array - to be checked.
   * @return array type = MedicineStatisticsDto - true, else - false.
   */
  private static isMedicineStatistics(array: MedicineStatisticsDto[] | object): array is MedicineStatisticsDto {
    return (array as MedicineStatisticsDto[])[0].term !== undefined; // 'term' is MedicineDto field.
  }

  /**
   * Checks if the given array is of specific type.
   * @param array - to be checked.
   * @return array type = UserStatisticsDto - true, else - false.
   */
  private static isUserStatistics(array: UserStatisticsDto[] | object): array is UserStatisticsDto[] {
    return (array as UserStatisticsDto[])[0].failures !== undefined; // 'failures' is UserStatisticsDto field.
  }

  /**
   * .ctor
   * @param database - for interacting with db.
   * @param authService - for getting user auth info.
   */
  constructor(
    private database: AngularFireDatabase,
    private authService: AuthenticationService
  ) {}

  /**
   * Send get request to db fro medicine statistics.
   * @return db medicines statistics model.
   */
  getMedicinesStatistics(): Observable<MedicineStatisticsModel[]> {
    return this.database.list('/statistics/medicines/').valueChanges()
      .pipe(
        map(records => {
          const dtoArr: MedicineStatisticsDto[] = ProjectFunctions.mapObjectToArray(records);
          return StatisticsService.mapDtoArrayToModelArray(dtoArr) as MedicineStatisticsModel[];
        })
      );
  }

  /**
   * Send get request to db for staff statistics.
   * @return db staff statistics model.
   */
  getStaffStatistics(): Observable<PeopleStatisticsModel[]> {
    return this.database.list('/statistics/staff/').valueChanges()
      .pipe(
        map(records => {
          const dtoArr: PeopleStatisticsDto[] = ProjectFunctions.mapObjectToArray(records);
          return StatisticsService.mapDtoArrayToModelArray(dtoArr) as PeopleStatisticsModel[];
        })
      );
  }

  /**
   * Send get request to db for users statistics.
   * @return db users statistics model.
   */
  getUsersStatistics(): Observable<UserStatisticsModel[]> {
    return this.database.list('/statistics/users/').valueChanges()
      .pipe(
        map(records => {
          const dtoArr: UserStatisticsDto[] = ProjectFunctions.mapObjectToArray(records);
          return StatisticsService.mapDtoArrayToModelArray(dtoArr) as UserStatisticsModel[];
        })
      );
  }

  /**
   * Records successful transaction.
   * @param transaction - to be recorded.
   */
  writeSuccessfulTransaction(transaction: BookingModel): void {
    const basePath = '/statistics/';
    const statisticsPlaces = ['medicines/', 'users/', 'staff/'];
    for (const place of statisticsPlaces) {
      if (place === 'users/') {
        this.processTransactionRequestOnPath(basePath + place, transaction, UserStatus.Success);
      }
      this.processTransactionRequestOnPath(basePath + place, transaction);
    }
  }

  /**
   * Records cancelled booking.
   * @param booking - to be recorded.
   */
  writeCancelledBooking(booking: BookingModel): void {
    this.processTransactionRequestOnPath('/statistics/users/', booking, UserStatus.Cancel);
  }

  /**
   * Records failed transaction.
   * @param transaction - to be recorded.
   */
  writeFailedTransaction(transaction: BookingModel): void {
    this.processTransactionRequestOnPath('/statistics/users/', transaction, UserStatus.Fail);
  }

  /**
   * Records medicines items from transaction.
   * @param medicinesDto - medicine statistics items from db.
   * @param medicines - to be recorded.
   */
  private writeMedicines(medicinesDto: MedicineStatisticsDto[], medicines: MedicineModel[]): void {
    // this.database.object('/statistics/medicines/').valueChanges()
    // .pipe(
    //   take(1),
    //   map((records: object) => ProjectFunctions.mapObjectToArray(records)),
    //   tap((records: MedicineStatisticsDto[]) => {
    //
    //   })
    // ).subscribe();
    for (const medicine of medicines) {
      const appropriateRecord = medicinesDto.find(x => x.term === medicine.name);
      if (appropriateRecord) {
        this.database.object(`/statistics/medicines/${appropriateRecord.key}/purchased`).set(appropriateRecord.purchased + medicine.amount);
      } else {
        this.database.list('/statistics/medicines/').push(
          Object.assign({}, {
            purchased: medicine.amount,
            term: medicine.name
          })
        );
      }
    }
  }

  /**
   * Records staff who processed transaction.
   * @param staffDto - specific staff record from db who processed transaction or undefined if there isn`t.
   * @param transaction - to be registered on staff db record.
   */
  private writeStaff(staffDto: PeopleStatisticsDto | undefined, transaction: BookingModel): void {
    const staffEmail = this.authService.getUserData().email; // Because only staff can set transaction status.
    const itemsCount = transaction.medicines.reduce((accumulated, {amount}) => accumulated + amount, 0);
    // this.database.object('/statistics/staff/').valueChanges()
    //   .pipe(
    //     take(1),
    //     map((records: object) => ProjectFunctions.mapObjectToArray(records)),
    //     tap((records: PeopleStatisticsDto[]) => {
    //
    //     })
    //   ).subscribe();
    if (staffDto) {
      this.database.object(`/statistics/staff/${staffDto.key}/purchasedItems`).set(staffDto.purchasedItems + itemsCount);
    } else {
      this.database.list(`/statistics/staff/`).push(
        Object.assign({}, {
          email: staffEmail,
          purchasedItems: itemsCount
        })
      );
    }
  }

  /**
   * Records user who registered transaction.
   * @param userDto - specific user statistics from db who payed transaction or undefined if there isn`t.
   * @param transaction - to be registered as successful on transaction user.
   */
  private writeSuccessfulUser(userDto: UserStatisticsDto | undefined, transaction: BookingModel): void {
    const itemsCount = transaction.medicines.reduce((accumulated, {amount}) => accumulated + amount, 0);
    // this.database.object('/statistics/users/').valueChanges()
    //   .pipe(
    //     take(1),
    //     map((records: object) => ProjectFunctions.mapObjectToArray(records)),
    //     tap((records: UserStatisticsDto[]) => {
    //
    //     })
    //   ).subscribe();
    if (userDto) {
      this.database.object(`/statistics/users/${userDto.key}/purchasedItems`).set(userDto.purchasedItems + itemsCount);
    } else {
      this.database.list(`/statistics/users/`).push(
        Object.assign({}, {
          email: transaction.email,
          purchasedItems: itemsCount,
          cancelledBookings: 0,
          failures: 0
        })
      );
    }
  }

  /**
   * Records user who cancelled booking.
   * @param userDto - specific user statistics who cancelled transaction from db or undefined if there isn`t.
   * @param transaction - to be registered as cancelled on transaction user.
   */
  private writeCancelledUser(userDto: UserStatisticsDto | undefined, transaction: BookingModel): void {
    // this.database.object('/statistics/users/').valueChanges()
    //   .pipe(
    //     take(1),
    //     map((records: object) => ProjectFunctions.mapObjectToArray(records)),
    //     tap((records: UserStatisticsDto[]) => {
    //
    //     })
    //   ).subscribe();
    if (userDto) {
      this.database.object(`/statistics/users/${userDto.key}/cancelledBookings`).set(userDto.cancelledBookings + 1);
    } else {
      this.database.list(`/statistics/users/`).push(
        Object.assign({}, {
          email: transaction.email,
          purchasedItems: 0,
          cancelledBookings: 1,
          failures: 0
        })
      );
    }
  }

  /**
   * Records user that failed transaction.
   * @param userDto - specific user statistics who failed to pay transaction from db or undefined if there isn`t.
   * @param transaction - that was failed.
   */
  private writeFailedUser(userDto: UserStatisticsDto | undefined, transaction: BookingModel): void {
    // this.database.object('/statistics/users/').valueChanges()
    //   .pipe(
    //     take(1),
    //     map((records: object) => ProjectFunctions.mapObjectToArray(records)),
    //     tap((records: UserStatisticsDto[]) => {
    //
    //   ).subscribe();
    if (userDto) {
      this.database.object(`/statistics/users/${userDto.key}/failures`).set(userDto.failures + 1);
    } else {
      this.database.list(`/statistics/users/`).push(
        Object.assign({}, {
          email: transaction.email,
          purchasedItems: 0,
          cancelledBookings: 0,
          failures: 1
        })
      );
    }
  }

  private processTransactionRequestOnPath(path: string, transaction: BookingModel, userStatus?: UserStatus): void {
    this.database.object(path).valueChanges()
      .pipe(
        take(1),
        map((records: object) => ProjectFunctions.mapObjectToArray(records)),
        tap((records: MedicineStatisticsDto[] | PeopleStatisticsDto[] | UserStatisticsDto[]) => {
          if (path.includes('medicines')) {
            this.writeMedicines(records as MedicineStatisticsDto[], transaction.medicines);
          } else if (path.includes('users')) {
            const userDto = (records as UserStatisticsDto[]).find(x => x.email === transaction.email);
            switch (userStatus) {
              case UserStatus.Success:
                this.writeSuccessfulUser(userDto, transaction);
                break;
              case UserStatus.Fail:
                this.writeFailedUser(userDto, transaction);
                break;
              case UserStatus.Cancel:
                this.writeCancelledUser(userDto, transaction);
                break;
            }
          } else {
            const staffEmail = this.authService.getUserData().email;
            const staffDto = (records as PeopleStatisticsDto[]).find(x => x.email === staffEmail);
            this.writeStaff(staffDto, transaction);
          }
        })
      ).subscribe();
  }
}

enum UserStatus {
  Success,
  Fail,
  Cancel
}
