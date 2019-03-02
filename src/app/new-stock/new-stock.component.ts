import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../stock.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.css']
})
export class NewStockComponent implements OnInit {
  stockGroup : FormGroup;
  commodities : any;
  hide = false;
  stock = {
    insuranceId: '',
    commodity:{},
    place : '',
    quantity : 1,
    type: '',
    harvestDate: '',
    owner : this.session.getUser().userId,
    open : false
  }

  constructor(private spinnerService: Ng4LoadingSpinnerService,private router:Router, private fb: FormBuilder, private session:SessionService,private stocks:StockService) { }

  ngOnInit() {
    this.stocks.getGlobalStocks()
    .subscribe((data)=>{
      this.commodities = data;
    });
    this.stockGroup = this.fb.group({
      "id" : [this.stock.insuranceId,[
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10)
      ]],
      "commodity" : [this.stock.commodity,[
              Validators.required,
      ]],
      "place" : [this.stock.place,[
              Validators.required,
              Validators.min(1)
      ]],
      "quantity" : [this.stock.quantity,[
              Validators.required,
              Validators.min(10)
      ]],
      "type" : [this.stock.type,[
              Validators.required
      ]],
      "harvestDate" : [this.stock.harvestDate,[
              Validators.required,
              Validators.pattern(/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/)
      ]],
      "open"  : [this.stock.open,[
              Validators.required
      ]]

    })
  }

  createStock(){
    this.spinnerService.show();
    let commodity = this.stock.commodity;
    this.stock.commodity = this.stock.commodity['commodityId'];
    this.stocks.createStock(this.stock)
    .subscribe((data)=>{
      if(data){
        commodity['quantity'] += this.stock.quantity;
        this.stocks.updateCommodity(commodity)
        .subscribe((data)=>{
          if(data){
            this.goBack();
            this.spinnerService.hide();            
          }
        },(err)=>{
          this.hide=true;
          this.spinnerService.hide();
        });
      }
    },(err)=>{
      this.hide=true;
      this.spinnerService.hide();
    });    
  }

  goBack(){
    this.router.navigate(['/home']).then((status)=>{
      if(status == false){
        this.goBack();
      }
    })
  }
}
