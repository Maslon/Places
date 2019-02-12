import { NgModule } from "@angular/core";
import { MatToolbarModule, 
         MatSidenavModule,
         MatIconModule,
         MatButtonModule,
         MatListModule,
         MatCardModule,
         MatInputModule,
         MatFormFieldModule,
         MatTabsModule,
         MatCheckboxModule,
         MatPaginatorModule,
         MatDialogModule} from "@angular/material"


@NgModule({
    imports: [
        MatToolbarModule, 
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatTabsModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatDialogModule        
    ],
    exports: [
        MatToolbarModule, 
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatTabsModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatDialogModule      
    ]
})

export class MaterialModule {

}