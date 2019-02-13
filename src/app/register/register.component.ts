import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SessionService } from '../session.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerGroup: FormGroup;
  warn = false;
  user = {
    id:'',
    fname:'',
    lname:'',
    password:''
  }
  hide = true;

  constructor(private session: SessionService,private spinnerService: Ng4LoadingSpinnerService, private auth:AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    document.getElementById("warn-div").style.display='none';
    this.registerGroup = this.fb.group({
      "id": [this.user.id,[
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12)
      ]],
      "fname" : [this.user.fname,[
        Validators.required
      ]],
      "lname" : [this.user.lname,[
        Validators.required
      ]],
      "password" : [this.user.password,[
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }
  ngAfterViewInit(){
    
  }

  createUser(){
    document.getElementById("warn-div").style.display='none';
    var bcrypt = require('bcrypt-nodejs');
    this.spinnerService.show();
    bcrypt.genSalt(10, (err, salt)=> {
      bcrypt.hash(this.user.password, salt,null,(error,hash)=> {
        this.auth.createUser(this.user.id,this.user.fname,this.user.lname,hash)
        .subscribe((data)=>{
          this.router.navigateByUrl('home').then((route: any)=>{
            this.session.setUser(data);
            this.spinnerService.hide();
          },(err: any)=>{
            document.getElementById("warn-div").style.display='block';
            document.getElementById("warn-text").innerHTML="Please Login";
            this.spinnerService.hide();
          });
        },(err)=>{
          this.spinnerService.hide();
          document.getElementById("warn-div").style.display='block';
          document.getElementById("warn-text").innerHTML="Aadhar Number already Exists";
          this.spinnerService.hide();
        });
      });
    });
    
  }
}
