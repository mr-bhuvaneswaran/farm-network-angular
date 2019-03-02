import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {
  menus = [{'name':'My Shares','call':'showMyShares'},{'name':'My Stocks','call':'showMyStocks'},{'name':'Requests','call':'showRequests'},{'name':'LogOut','call':'logOut'}];
  user :any;
  constructor(private session: SessionService, private router: Router, private route :ActivatedRoute) { }

  ngOnInit() {
    this.user = this.session.getUser();
  }

  showMyShares(){
    this.router.navigate(['./shares'],{relativeTo:this.route})
    .then(status=>{
      if(status == false){
        this.showRequests();
      }
    })
  }

  showMyStocks(){
    this.router.navigate(['./stocks'],{relativeTo:this.route})
    .then(status=>{
      if(status == false){
        this.showRequests();
      }
    })
  }

  showRequests(){
    this.router.navigate(['./requests'],{relativeTo:this.route})
    .then(status=>{
      if(status == false){
        this.showRequests();
      }
    })
  }

  logOut(){
    this.router.navigateByUrl('/login').then((route: any)=>{
      this.session.clear('user');
    });
  }

}
