import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatIconModule, MatSnackBarModule, MatToolbarModule, MatSidenavModule, MatListModule, MatRadioModule, MatDividerModule, MatSelectModule, MatCheckboxModule, MatExpansionModule, MatBadgeModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NavigateComponent } from './navigate/navigate.component';
import { GlobalStocksComponent } from './global-stocks/global-stocks.component';
import { CropViewComponent } from './crop-view/crop-view.component';
import { NewStockComponent } from './new-stock/new-stock.component';
import { ReceivedRequestComponent, UserStatusDialog } from './received-request/received-request.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { StockViewComponent } from './stock-view/stock-view.component';
import { ShareViewComponent } from './share-view/share-view.component';


const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatRadioModule,
  MatDividerModule,
  MatCardModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatBadgeModule,
  MatDialogModule
];

@NgModule({
imports: [...modules],
exports: [...modules],
declarations: []
})export class MaterialModule {};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavigateComponent,
    GlobalStocksComponent,
    CropViewComponent,
    NewStockComponent,
    ReceivedRequestComponent,
    NotificationsComponent,
    UserStatusDialog,
    StockViewComponent, 
    ShareViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    UserStatusDialog
  ]
})
export class AppModule { }
