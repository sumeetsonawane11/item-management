import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, ActiveElements } from '../../shared/models/item.model';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

const BACKEND_URL = environment.apiUrl + '/item/';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private items: ActiveElements[] = [];
  private getItemsSubject = new Subject<{ items: ActiveElements[], maxCount?: number, isNewlyCreated: boolean }>();
  private getErrorSub = new Subject<{ error: Error }>();
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getItems(itemsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string, data: Item[], maxItems: number }>(BACKEND_URL + 'getItems' + queryParams)
      .pipe(map((response) => {
        return {
          data: response.data,
          maxItems: response.maxItems
        };
      }))
      .subscribe((items: any) => {
        this.items = items.data;
        // this.toasterService.success('Item Created successfully');
        this.getItemsSubject.next({ items: [...this.items], maxCount: items.maxItems, isNewlyCreated: false })
      }, error => {

      });
  }

  getItemCreatedHandler() {
    return this.getItemsSubject.asObservable();
  }

  getErrorHandler() {
    return this.getErrorSub.asObservable()
  }

  CreateItem(itemObj) {
    return this.http.post<{ message: string, result: { data: Item, maxItems: number, id: string } }>(BACKEND_URL + 'creates', itemObj)
      .pipe(map((newItem) => {
        return {
          transformedData: {
            id: newItem.result.id,
            name: newItem.result.data.name,
            type: newItem.result.data.type,
            location: newItem.result.data.location,
            qty: newItem.result.data.qty,
            creator: newItem.result.data.creator
          },
          maxItems: newItem.result.maxItems
        };
      }))
      .subscribe((item) => {
        this.items.push(item.transformedData);
        this.getItemsSubject.next({ items: [...this.items], maxCount: item.maxItems, isNewlyCreated: true });
        this.toastr.success('Item created successfully');
      },
        error => {
          this.getErrorSub.next(error);
          this.toastr.error('Item creation failed')
        });
  }

  getItemDetails(id: string) {
    return this.http.get(BACKEND_URL + `/${id}`)
  }

  deleteItems() {
    return this.http.delete(BACKEND_URL + 'deleteItems')
      .subscribe((res) => {
        console.log(res)
      });
  }
}
