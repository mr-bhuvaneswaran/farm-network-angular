import { Component, OnInit, Inject } from '@angular/core';
import { StockService } from '../stock.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-received-request',
  templateUrl: './received-request.component.html',
  styleUrls: ['./received-request.component.css']
})

export class ReceivedRequestComponent implements OnInit {
  requests :any;
  user : any;
  constructor(public dialog: MatDialog, private spinnerService:Ng4LoadingSpinnerService, private session:SessionService,private stocks:StockService, private router:Router) { }

  ngOnInit() {
    this.user = this.session.getUser()
    this.updateRequest();
  }

  updateRequest(){
    this.stocks.getRequests(this.user.userId)
    .subscribe((data)=>{
      this.requests = data;
    });
  }

  deleteRequest(request){
    this.spinnerService.show();
    this.stocks.deleteRequest(request.requestId).subscribe((data)=>{
      this.updateRequest();
      this.stocks.getCrop(request.insuranceId)
      .subscribe(data=>{
        let stock = data;
        let message = {
          id : (Date.now().toString()+ this.user.userId),
          title : "Stock Request Cancelled",
          description : "Stock request for stock from " + stock['place'] + " with quantity " + request.quantity + " kgs has been Cancelled by owner",
          userId : request.requestor 
        }
        this.stocks.createMessage(message)
        .subscribe(data=>{
          this.spinnerService.hide();
        })
  
      });
    })
  }

  checkUserStatus(request): void {
    this.spinnerService.show();
    this.stocks.getUser(request.requestor)
    .subscribe(data=>{
      let requestor = data;
      this.stocks.getCrop(request.insuranceId)
      .subscribe(data=>{
        this.stocks.getCommodity(data['commodityId'])
        .subscribe((data)=>{
          this.spinnerService.hide();
          let commodity = data;
          const dialogRef = this.dialog.open(UserStatusDialog, {
            width: '250px',
            data: {request : request,requestor: requestor, commodity: commodity}
          });
  
          dialogRef.afterClosed().subscribe(result => {
            if(result == true){
              this.spinnerService.show();
              this.stocks.acceptRequest(request.requestId).subscribe((data)=>{
                if(data == true){
                    this.updateRequest();
                }
                this.spinnerService.hide();
              })
            }
          });
        });        
      });

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

export interface DialogData {
  requestor: any;
  commodity: any;
  request : any;
}


@Component({
  selector: 'user-status-dialog',
  templateUrl: 'user-status.html',
})
export class UserStatusDialog implements OnInit{

  suffice : Boolean;

  constructor(
    public dialogRef: MatDialogRef<UserStatusDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private stocks: StockService) {}

  ngOnInit(){
    this.suffice = ( (this.data.commodity.fnc *  this.data.request.quantity) <= this.data.requestor.balance)  
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  acceptRequest(){
    this.dialogRef.close(true);
  }

}