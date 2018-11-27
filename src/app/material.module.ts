import { NgModule } from "@angular/core";
import { MatToolbarModule, 
         MatSidenavModule,
         MatIconModule,
         MatButtonModule,
         MatListModule,
         MatCardModule,
         MatInputModule,
         MatFormFieldModule,
         MatTabsModule} from "@angular/material"


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
        MatTabsModule        
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
        MatTabsModule      
    ]
})

export class MaterialModule {

}