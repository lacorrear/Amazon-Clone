import { PaymentGuard } from "./shared/guards/payment.guard";
import { PaymentComponent } from "./pages/payment/payment.component";
import { SingInComponent } from "./pages/sing-in/sing-in.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "payment", component: PaymentComponent, canActivate: [PaymentGuard] },
  { path: "checkout", component: CheckoutComponent },
  { path: "singIn", component: SingInComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
