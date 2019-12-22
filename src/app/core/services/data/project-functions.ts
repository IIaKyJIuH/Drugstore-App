import { BookingDto } from '../dtos/bookings/booking-dto';

export class ProjectFunctions {

  public static mapObjectToArray(object: object): any[] {
    const arr = [];
    for (const key of Object.keys(object)) {
      const current = object[key];
      if (key !== 'default') {
        arr.push(Object.assign(current, {
          key
        }));
      }
    }
    return arr;
  }

  public static mapObjectToArrayForUser(object: object, email: string): any[] {
    const arr = [];
    for (const key of Object.keys(object)) {
      const current = object[key]; // TODO: type!
      if (current.email === email) {
        arr.push(Object.assign(current, {
          key
        }));
      }
    }
    return arr;
  }

}
