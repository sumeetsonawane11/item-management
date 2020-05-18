// import { Injectable }             from '@angular/core';
// import {
//   Router, Resolve,
//   RouterStateSnapshot,
//   ActivatedRouteSnapshot
// }                                 from '@angular/router';
// import { Observable, of, EMPTY }  from 'rxjs';
// import { DashboardService } from './dashboard.service';
// import { take, mergeMap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class ItemDetailResolverService implements Resolve<any> {
//   constructor( private router: Router, private dashboardService: DashboardService) {}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
//     let id = route.paramMap.get('id');


//     // return of({
//     //   itemName: 'Item 1',
//     //   itemType: 'Type 1',
//     //   provider: 'Provider 1',
//     //   vendor: 'Vendor 1',
//     //   qty: 10
//     // })
//   }
// }