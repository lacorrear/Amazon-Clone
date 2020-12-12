import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,

    public ngZone: NgZone,
    public router: Router
  ) {
    // NOTE: Full Angular 7|8|9|10 Firebase Authentication Tutorial Examples in
    //  https://www.positronx.io/full-angular-7-firebase-authentication-system/

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([""]);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // SIGN UP with email/password
  SignUp(email, password) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        // Setting data in Firebase
        this.SetUserData(result.user);
        this.router.navigate([""]);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  // SIGN OUT
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["singIn"]);
    });
  }

  // async UpdateProfile(displayName: string) {
  //   const profile = {
  //     displayName: displayName,
  //   };
  //   return (await this.afAuth.currentUser).updateProfile(profile);
  // }
}
