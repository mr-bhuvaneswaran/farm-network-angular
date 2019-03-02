import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  messages :any;
  user = this.session.getUser();
  constructor(private spinnerService: Ng4LoadingSpinnerService, private router:Router, private stocks:StockService, private session:SessionService) { }

  ngOnInit() {
    this.stocks.getMessages(this.user.userId)
    .subscribe((data:Array<Object>)=>{
      this.messages =  data.reverse();
    })
  }

  clearMessage(messageId){
    this.spinnerService.show();
    this.stocks.deleteMessage(messageId).subscribe((data)=>{
      this.stocks.getMessages(this.user.userId)
      .subscribe((data:Array<Object>)=>{
        this.messages =  data.reverse();
        this.spinnerService.hide();
      })      
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
