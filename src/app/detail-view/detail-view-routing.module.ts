import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailViewComponent } from './detail-view.component';
// import { ItemDetailResolverService } from '../dashboard/service/item-detail-resolver.service';
const routes: Routes = [
    {
        path: ':id', component: DetailViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class DetailViewRoutingModule { }
