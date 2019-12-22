// For mapping objects from firebase response.
export class ProjectFunctions {

 ***REMOVED*****REMOVED****
  ***REMOVED*** Concatenates key fields from db to each item.
  ***REMOVED*** @param object - object to be converted.
  ***REMOVED***/
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

 ***REMOVED*****REMOVED****
  ***REMOVED*** Concatenates key fields from db to each item.
  ***REMOVED*** @param object - object to be converted.
  ***REMOVED*** @param email - for filtering results by.
  ***REMOVED***/
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
