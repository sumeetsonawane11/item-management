import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { Router } from '@angular/router';
import { ActiveElements } from 'src/app/shared/models/item.model';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'type', 'location', 'qty'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: ActiveElements[] = [];
  isLoading = false;
  totalItems = 10;
  currentPage = 1;
  ItemsPerPage = 3;
  pageSizeOptions = [1, 3, 5, 10];
  getItemSubs: Subscription;
  authSubs: Subscription;
  userId: string;
  isUserAuthenticated: boolean;
  constructor(
    private dashBoardService: DashboardService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.isUserAuthenticated = this.authService.getAuth();
    this.dashBoardService.getItems(this.ItemsPerPage, this.currentPage);
    //this.dashBoardService.deleteItems();

    this.getItemSubs = this.dashBoardService.getItemCreatedHandler()
      .subscribe((result: any) => {
        this.isLoading = false;
        this.dataSource = result.items ? result.items : [];
        // this.dataSource = result.items ? result.items.filter(item => {
        //   return item.creator === this.userId
        // }) : [];
        if (result.maxCount)
          this.totalItems = result.maxCount;
      });

    this.authSubs = this.authService.getAuthStatusListner()
      .subscribe(() => {
        this.isLoading = true;
      });
  }

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  onRowSelect(row) {
    console.log(row);
    this.router.navigate(['detail-view', row._id]);
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.ItemsPerPage = pageData.pageSize
    this.dashBoardService.getItems(this.ItemsPerPage, this.currentPage);
    this.isLoading = true;
  }

  ngOnDestroy() {
    this.getItemSubs.unsubscribe();
  }
}
