import { NgModule } from "@angular/core";
import { MatToolbarModule, 
         MatSidenavModule,
         MatIconModule,
         MatButtonModule,
         MatListModule,
         MatCardModule,
         MatInputModule,
         MatFormFieldModule,} from "@angular/material"


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
    ]
})

export class MaterialModule {

}