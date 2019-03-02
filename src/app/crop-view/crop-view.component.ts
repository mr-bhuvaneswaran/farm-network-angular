import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../session.service';
import { StockService } from '../stock.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-crop-view',
  templateUrl: './crop-view.component.html',
  styleUrls: ['./crop-view.component.css']
})
export class CropViewComponent implements OnInit {
  commodity : any;
  stockList :any;
  quantity : any;
  status = false;
  constructor(private spinnerService: Ng4LoadingSpinnerService,  private stocks:StockService, private route: ActivatedRoute,private session: SessionService,private router:Router) { }

  ngOnInit() {
    this.spinnerService.show();
    this.route.params.subscribe(data=>{
    const commodityId = data.commodityId
      this.commodity = this.stocks.getCommodity(commodityId).subscribe(data=>{
            this.commodity = data;
            const user = this.session.getUser();
            this.stocks.getStocksOfCommodity(this.commodity.commodityId,user.userId)
            .subscribe((data:Array<Object>)=>{
                this.stockList = data.reverse();
                this.spinnerService.hide();  
           })
      })
    })
    
     
  }

  goBack(){
    this.router.navigate(['/home']).then((status)=>{
      if(status == true){
        this.session.clear('commodity');
      }
      else{
        this.goBack();
      }
    })
  }

  buyRequestStock(stock){
    this.spinnerService.show();
    let user = this.session.getUser()
    let request = {
      requestId : (Date.now().toString()+ user.userId),
      title : this.commodity.name + " Stock Request",
      description : this.quantity +" Kg of " + this.commodity.name + "-" + this.commodity.type + " Requested by " + user.firstName,
      ownerId : stock.ownerId,
      requestorId : user.userId,
      cropId : stock.insuranceId,
      quantity : this.quantity,
    }
    this.stocks.createRequest(request)
    .subscribe((data)=>{
      let message = {
        id : (Date.now().toString()+ user.userId),
        title : "Stock Requested",
        description : "Stock "+ this.commodity.name + "-" + this.commodity.type +" from "+ stock.place + " with quantity " + this.quantity + " kg has been requested",
        userId : user.userId
      }
      this.stocks.createMessage(message)
      .subscribe(data=>{
        let message = {
          id : (Date.now().toString()+ stock.ownerId),
          title : "New Stock Request",
          description : this.commodity.name + '-' + this.commodity.type + " request from " + user.firstName + ", for " + this.quantity + " kg",
          userId : stock.ownerId 
        }
        this.stocks.createMessage(message)
        .subscribe(data=>{
          this.status = true;
          this.spinnerService.hide();
        })
      })  

    })
  }

}
