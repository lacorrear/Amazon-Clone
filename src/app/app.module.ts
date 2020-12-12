import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CheckoutItemCardComponent } from "./components/checkout-item-card/checkout-item-card.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { RegisterDialogComponent } from "./components/register-dialog/register-dialog.component";
import { SubtotalComponent } from "./components/subtotal/subtotal.component";
import { MaterialModule } from "./modules/material/material.module";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { HomeComponent } from "./pages/home/home.component";
import { SingInComponent } from "./pages/sing-in/sing-in.component";
import { NgxWebstorageModule } from "ngx-webstorage";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductCardComponent,
    CheckoutComponent,
    SubtotalComponent,
    FooterComponent,
    CheckoutItemCardComponent,
    SingInComponent,
    RegisterDialogComponent,
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  entryComponents: [RegisterDialogComponent],

  bootstrap: [AppComponent],
})
export class AppModule {}
