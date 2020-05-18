import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailViewComponent } from './detail-view.component';
import { DetailViewRoutingModule } from './detail-view-routing.module';
import { MatCardModule, MatInputModule } from '@angular/material';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [DetailViewComponent],
  imports: [
    CommonModule,
    DetailViewRoutingModule,
    AngularMaterialModule
  ]
})
export class DetailViewModule { }
