import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TokenService } from "src/app/services/token.service";
// var bcrypt = require('bcryptjs');
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  showSpinner: boolean = false;
  credentials: any;
  flag: Boolean;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {}

  loginUser(form) {
    this.authService.loginUser(form.value).subscribe(
      data => {
        this.tokenService.SetToken(data.token);
        form.reset();
        console.log("From Submitted Sucessfully");
        this.router.navigate(["streams"]);
      },
      err => {
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message;
        }
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }
}
