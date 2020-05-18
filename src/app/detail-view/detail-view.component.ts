import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DashboardService } from '../dashboard/service/dashboard.service';
import { error } from 'protractor';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  data: any;
  itemId: string;
  isLoading = false;
  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.itemId = paramMap.get('id');
      }
      this.dashboardService.getItemDetails(this.itemId)
        .subscribe((res: { data: any }) => {
          this.isLoading = true;
          this.data = res.data;
        });;
    },
      error => {
        console.log('Item id not found' + error)
      }
    );
    // this.route.data.subscribe((data) => {
    //   this.data = {...data.itemData};
    // })
  }

}
