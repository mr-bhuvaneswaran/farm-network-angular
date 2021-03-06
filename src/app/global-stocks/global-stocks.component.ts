import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StockService } from '../stock.service';
import { SessionService } from '../session.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-global-stocks',
  templateUrl: './global-stocks.component.html',
  styleUrls: ['./global-stocks.component.css']
})
export class GlobalStocksComponent implements OnInit {
  commodities : any;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private route:ActivatedRoute,private session:SessionService, private stock:StockService, private router: Router) {  }

  ngOnInit() {
    this.spinnerService.show();
    this.stock.getGlobalStocks()
    .subscribe((data)=>{
      this.commodities = data;
      this.spinnerService.hide();
    })
  }

  showCommodity(commodity: any) {
    this.router.navigate(['./crop'],{relativeTo:this.route}).then((res)=>{
      if(res == true){
        this.session.setCommodity(commodity);
      }else{
        this.showCommodity(commodity);   
      }    
    })
  }

}
