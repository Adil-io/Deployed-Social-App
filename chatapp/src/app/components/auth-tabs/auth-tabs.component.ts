import { Component, OnInit } from "@angular/core";
import * as M from "materialize-css";

@Component({
  selector: "app-auth-tabs",
  templateUrl: "./auth-tabs.component.html",
  styleUrls: ["./auth-tabs.component.css"]
})
export class AuthTabsComponent implements OnInit {
  constructor() {}

  userForms: HTMLElement;

  ngOnInit(): void {
    this.userForms = <HTMLElement>document.getElementById("user_options-forms");
  }

  onLogin() {
    this.userForms.classList.remove("bounceLeft");
    this.userForms.classList.add("bounceRight");
  }
  onSignup() {
    this.userForms.classList.remove("bounceRight");
    this.userForms.classList.add("bounceLeft");
  }
}
