import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private selectedItemSubject = new Subject();
  $selectedItemNotifier = this.selectedItemSubject.asObservable();
  constructor() { }
}
