import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GlobalStocksComponent } from './global-stocks/global-stocks.component';
import { CropViewComponent } from './crop-view/crop-view.component';
import { NewStockComponent } from './new-stock/new-stock.component';
import { ReceivedRequestComponent } from './received-request/received-request.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { StockViewComponent } from './stock-view/stock-view.component';
import { ShareViewComponent } from './share-view/share-view.component';

const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },{
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'home',
    component : HomeComponent,
    children : [
      {
        path:'stocks',
        component : StockViewComponent
      },
      {
        path : 'shares',
        component: ShareViewComponent
      },
      {
        path: 'crop',
        component : CropViewComponent
      },
      {
          path : 'requests',
          component : ReceivedRequestComponent
      },
      {
          path : 'notifications',
          component : NotificationsComponent
      },
      {
        path : 'new',
        component : NewStockComponent
      },
      {
        path :'',
        component : GlobalStocksComponent
      }
    ]
  },{
    path:'**',
    redirectTo : 'login',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
