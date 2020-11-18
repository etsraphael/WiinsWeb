import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
        MatRadioModule, MatTabsModule, MatListModule, MatSelectModule, MatButtonModule,
        MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatGridListModule, MatInputModule,
        MatSidenavModule, MatSnackBarModule, MatTableModule, MatDialogModule, MatButtonToggleModule,
        MatAutocompleteModule, MatBadgeModule, MatProgressBarModule, MatSlideToggleModule, MatStepperModule,
        MatDividerModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule
    ],
    exports: [
        MatRadioModule, MatTabsModule, MatListModule, MatSelectModule, MatButtonModule,
        MatCheckboxModule, MatToolbarModule, MatIconModule, MatCardModule, MatGridListModule, MatInputModule,
        MatSidenavModule, MatSnackBarModule, MatTableModule, MatDialogModule, MatButtonToggleModule,
        MatAutocompleteModule, MatBadgeModule, MatProgressBarModule, MatSlideToggleModule, MatStepperModule,
        MatDividerModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule
    ]
})

export class MaterialModule { }
