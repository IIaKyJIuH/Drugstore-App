import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detailed-medicine',
  templateUrl: './detailed-medicine.component.html',
  styleUrls: ['./detailed-medicine.component.css']
})
export class DetailedMedicineComponent {

  medicineInfo$: Observable<any>;

  constructor(
    private database: AngularFireDatabase,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.medicineInfo$ = activatedRoute.params.pipe(
      switchMap(params => {
        const pharmacy = params.pharmacy;
        const medicineId = params.medicineId;
        return this.database.object(`/medicines/pharmacies/${pharmacy}/${medicineId}`).valueChanges().pipe(
          switchMap((item: any) => {
            const headerDict = {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept',
            }
                                                                                                                                                                                          
            const requestOptions = {                                                                                                                                                                                 
              headers: new HttpHeaders(headerDict), 
            };
            return http.get(`https://www.nhs.uk/search/?q=${item.term}`, requestOptions);
          })
        )
      })
    );
  }

}
