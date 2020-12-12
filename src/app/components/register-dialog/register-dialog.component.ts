import { AuthenticationService } from "./../../shared/services/authentication.service";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { PasswordValidator } from "src/app/shared/validators/password.validator";

@Component({
  selector: "app-register-dialog",
  templateUrl: "./register-dialog.component.html",
  styleUrls: ["./register-dialog.component.scss"],
})
export class RegisterDialogComponent implements OnInit {
  hide = true;
  // ---------------------------------------------------------------
  // Data form
  // ---------------------------------------------------------------
  name = new FormControl("", [Validators.required, Validators.minLength(2)]);
  email = new FormControl("", [Validators.required, Validators.email]);
  password1 = new FormControl("", [
    Validators.required,
    Validators.minLength(6),
  ]);
  password2 = new FormControl("", [Validators.required]);

  userInfoForm: FormGroup;
  // ---------------------------------------------------------------
  // /Data form
  // ---------------------------------------------------------------

  constructor(
    public fb: FormBuilder,
    public _authService: AuthenticationService,
    private dialogRef: MatDialogRef<RegisterDialogComponent>
  ) {
    dialogRef.disableClose = true;
    // this.name.setValue("Telemachus");
    // this.email.setValue("Telemachus@unal.edu.co");
    // this.password1.setValue("odySSey");
    // this.password2.setValue("odySSey");
  }

  ngOnInit(): void {
    this.userInfoForm = this.fb.group(
      {
        name: this.name,
        password1: this.password1,
        password2: this.password2,
      },
      { validator: PasswordValidator }
    );

    //Diseable password2 field
    // this.userInfoForm.controls["password2"].disable();
  }

  getErrorMessage(value: string) {
    switch (value) {
      case "name": {
        if (this.name.hasError("required")) {
          return "You must enter a name";
        }
        return this.name.hasError("minlength")
          ? "name must be at least 2 characters"
          : "";
      }
      case "email": {
        if (this.email.hasError("required")) {
          return "You must enter an email";
        }
        return this.email.hasError("email") ? "Not valid email" : "";
      }
      case "password1": {
        if (this.password1.hasError("required")) {
          return "You must enter a password";
        }
        return this.password1.hasError("minlength")
          ? "password must be at least 6 characters"
          : "";
      }
      case "password2": {
        if (this.password2.hasError("required")) {
          return "You must enter a password";
        }
        return this.password2.hasError("misMatch")
          ? "Passwords do not match"
          : "";
      }
    }
  }

  // onClick() {
  //   console.log(this.userInfoForm);
  //   console.log("has ERROR:", this.userInfoForm.hasError("misMatch"));
  // }
}
