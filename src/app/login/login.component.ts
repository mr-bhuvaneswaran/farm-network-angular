import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logGroup: FormGroup;
  user = {
    id:'',
    password:''
  }
  hide = true;

  constructor(private session: SessionService,  private spinnerService: Ng4LoadingSpinnerService,private auth:AuthService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    document.getElementById("warn-div").style.display='none';
    this.logGroup = this.fb.group({
      "id": [this.user.id,[
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12)
      ]],
      "password" : [this.user.password,[
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  loginUser(){
    document.getElementById("warn-div").style.display='none';
    var bcrypt = require('bcrypt-nodejs');
    this.spinnerService.show(); 
    this.auth.loginUser(this.user.id)
    .subscribe(data=>{
      bcrypt.compare(this.user.password, data['password'],(err, res)=> {
        if(res==true){
          this.router.navigateByUrl('home').then((route: any)=>{
            this.session.setUser(data);
            this.spinnerService.hide();
          },(err: any)=>{
            document.getElementById("warn-div").style.display='block';
            document.getElementById("warn-text").innerHTML="Please Login";
            this.session.setUser(null);
            this.spinnerService.hide();
          });
        }else{
          document.getElementById("warn-div").style.display='block';
          this.session.setUser(null);
          this.spinnerService.hide();
        }
      });
    },err=>{
      document.getElementById("warn-div").style.display='block';
      this.session.setUser(null);
      this.spinnerService.hide();
    });
  }

}
