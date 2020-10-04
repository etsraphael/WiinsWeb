import { MatRadioModule, MatTabsModule,  MatListModule, MatSelectModule,  MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatIconModule, MatGridListModule, MatInputModule, MatSidenavModule, MatSnackBarModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports:[MatRadioModule, MatTabsModule, MatListModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatGridListModule, MatInputModule, MatSidenavModule, MatSnackBarModule],
    exports:[MatRadioModule, MatTabsModule, MatListModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatGridListModule, MatInputModule, MatSidenavModule, MatSnackBarModule],
})

export class MaterialModule { }
