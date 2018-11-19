import { NgModule } from "@angular/core";
import { MatToolbarModule, 
         MatSidenavModule,
         MatIconModule,
         MatButtonModule,
         MatListModule,
         MatCardModule} from "@angular/material"


@NgModule({
    imports: [
        MatToolbarModule, 
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule        
    ],
    exports: [
        MatToolbarModule, 
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatCardModule      
    ]
})

export class MaterialModule {

}