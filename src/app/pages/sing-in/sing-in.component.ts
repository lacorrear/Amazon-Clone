import { AuthenticationService } from "./../../shared/services/authentication.service";
import { RegisterDialogComponent } from "./../../components/register-dialog/register-dialog.component";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-sing-in",
  templateUrl: "./sing-in.component.html",
  styleUrls: ["./sing-in.component.scss"],
})
export class SingInComponent implements OnInit {
  hide = true;
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required]);

  profileForm = this.fb.group({
    user: this.email,
    password: this.password,
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public _authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.email.setValue("Telemachus@unal.edu.co");
    this.password.setValue("odySSey");
  }

  getErrorMessage(value: string) {
    switch (value) {
      case "user": {
        if (this.email.hasError("required")) {
          return "You must enter a user";
        }
        return this.email.hasError("email") ? "Not a valid user" : "";
      }
      case "password": {
        if (this.password.hasError("required")) {
          return "You must enter a password";
        }
        return this.password.hasError("password") ? "Not a valid password" : "";
      }
    }
  }

  onSubmit() {
    this._authService.SignIn(this.email.value, this.password.value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
