import { NgModule } from "@angular/core";
import { MatToolbarModule, 
         MatSidenavModule,
         MatIconModule,
         MatButtonModule,
         MatListModule} from "@angular/material"


@NgModule({
    imports: [
        MatToolbarModule, 
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule        
    ],
    exports: [
        MatToolbarModule, 
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule      
    ]
})

export class MaterialModule {

}