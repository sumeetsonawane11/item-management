import { NgModule } from "@angular/core";

import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatListModule,
    MatDividerModule
} from '@angular/material';

@NgModule({
    // imports: [
    //     MatInputModule,
    //     MatCardModule,
    //     MatButtonModule,
    //     MatToolbarModule,
    //     MatExpansionModule,
    //     MatProgressSpinnerModule,
    //     MatPaginatorModule,
    //     MatDialogModule
    // ],

    //   No need to add the material modules in imports array if you are exporting
    // all the modules, Angular will import it automatically for u
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        MatListModule,
        MatDividerModule
    ],
    providers: [
        MatDatepickerModule,
    ],
})
export class AngularMaterialModule { }
