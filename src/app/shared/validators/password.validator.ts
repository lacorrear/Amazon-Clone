import { AbstractControl } from "@angular/forms";

export function PasswordValidator(control: AbstractControl) {
  // -------------------------------------------
  const password1 = control.get("password1");
  // Password 2 is comfirm password field
  const password2 = control.get("password2");
  // -------------------------------------------

  if (password1.pristine || password2.pristine) {
    return null;
  } else if (password1 && password2 && password1.value !== password2.value) {
    // Set error in password2 input in order to use mat-error
    return password2.setErrors({ misMatch: true });
  } else {
    return null;
  }
}
