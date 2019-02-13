import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StockService } from '../stock.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.css']
})
export class StockViewComponent implements OnInit {

  stockList :any;
  user :any;

  constructor(private router:Router, private spinnerService:Ng4LoadingSpinnerService,private stocks:StockService,private session : SessionService) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.updateStocks();
  }

  updateStocks(){
    this.spinnerService.show();
    this.stocks.getStocks(this.user.userId).subscribe((data)=>{
      this.stockList = data;
      this.spinnerService.hide();
    })
  }

  notify(share){
    this.spinnerService.show();
    this.stocks.notifyShareHolders(share.cropId)
    .subscribe((data)=>{
      if(data == true){
        this.updateStocks();
      }
      this.spinnerService.hide()
    })
  }

  open(stock){
    this.spinnerService.show();
    stock.open =true;
    this.stocks.updateStockOpen(stock).subscribe((data)=>{
      this.spinnerService.hide();
      this.updateStocks();
    })
  }

  close(stock){
    this.spinnerService.show();
    stock.open =false;
    this.stocks.updateStockOpen(stock).subscribe((data)=>{
      this.spinnerService.hide();
      this.updateStocks();
    })

  }

  goBack(){
    this.router.navigate(['/home']).then((status)=>{
      if(status == false){
        this.goBack();
      }
    });
  }

}
