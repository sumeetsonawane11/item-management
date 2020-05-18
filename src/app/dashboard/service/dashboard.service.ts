import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, ActiveElements } from '../../shared/models/item.model';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/item/';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private items: ActiveElements[] = [];
  private getItemsSubject = new Subject<{ items: ActiveElements[], maxCount?: number, isNewlyCreated: boolean }>();

  constructor(private http: HttpClient) { }

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

  CreateItem(itemObj) {
    return this.http.post<{ message: string, result: { data: Item, maxItems: number, id: string } }>(BACKEND_URL + 'create', itemObj)
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
        //this.createItemSubject.next();
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
