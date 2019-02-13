import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../session.service';
import { StockService } from '../stock.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user :any;
  warn :any;
  intervalId :any;
  constructor(private stocks: StockService,private session: SessionService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.warn = 0;
    setInterval(()=>{
      this.stocks.getUser(this.user.userId).subscribe((data)=>{
          this.user = data;
          this.session.setUser(data);
      });
      this.intervalId =  this.stocks.getMessages(this.user.userId).subscribe((data:Array<Object>)=>{
        this.warn = data.length
      })
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }


  createNew(){
    this.router.navigate(['./new'],{relativeTo:this.route}).then((status)=>{
      if(status == false){
        this.createNew();
      }
    });
  }

  showNotifications(){
    this.router.navigate(['./notifications'],{relativeTo:this.route}).then((status)=>{
      if(status == false){
        this.showNotifications();
      }
    })
  }
}
