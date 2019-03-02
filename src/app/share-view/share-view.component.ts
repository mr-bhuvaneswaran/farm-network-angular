import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-share-view',
  templateUrl: './share-view.component.html',
  styleUrls: ['./share-view.component.css']
})
export class ShareViewComponent implements OnInit {
  shares : any;
  user : any;
  newOwner : any;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private router:Router, private stocks:StockService,private session:SessionService) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.updateShare();
  }

  updateShare(){
    this.spinnerService.show()
    this.stocks.getShares(this.user.userId)
    .subscribe((data:Array<Object>)=>{
      this.shares =  data.reverse();
      this.spinnerService.hide()
    });
  }

  transferShare(shareId){
    alert("Verify the user ID before Transfer");
    this.spinnerService.show();
    this.stocks.updateShare(shareId,this.newOwner)
    .subscribe((status)=>{
      if(status == false){
        document.getElementById('warn').style.color = "red"
        document.getElementById('warn').innerHTML = "Receiver Error";
      }else{
        document.getElementById('warn').style.color = "green"
        document.getElementById('warn').innerHTML = "Transfer Successful";
        alert('successful Transaction');
        this.updateShare()
      }
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
