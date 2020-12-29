import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgxWebstorageModule } from "ngx-webstorage";

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CheckoutItemCardComponent } from "./components/checkout-item-card/checkout-item-card.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { PaymentSumaryComponent } from "./components/payment-sumary/payment-sumary.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { RegisterDialogComponent } from "./components/register-dialog/register-dialog.component";
import { SubtotalComponent } from "./components/subtotal/subtotal.component";
import { MaterialModule } from "./modules/material/material.module";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { HomeComponent } from "./pages/home/home.component";
import { PaymentComponent } from "./pages/payment/payment.component";
import { SingInComponent } from "./pages/sing-in/sing-in.component";
import { PaymentGuard } from "./shared/guards/payment.guard";

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
    PaymentComponent,
    PaymentSumaryComponent,
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    SweetAlert2Module,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [PaymentGuard],
  entryComponents: [RegisterDialogComponent],

  bootstrap: [AppComponent],
})
export class AppModule {}
