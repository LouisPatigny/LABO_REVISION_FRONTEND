import { Routes } from '@angular/router';
import { VoirProduitsComponent } from './merch/voir-produits/voir-produits.component';
import { ConsulterDetailsComponent} from './merch/consulter-details/consulter-details.component';
import { MerchResolver } from './merch/shared/resolvers/merch.resolver';
import { ProductResolver } from './merch/shared/resolvers/product.resolver';
import { RegisterComponent } from './auth/pages/register/register.component';
import { LoginComponent } from './auth/pages/login/login.component';
import {PageProfilComponent} from './profile/page-profil/page-profil.component';

export const routes: Routes =
[
  { path: '', redirectTo: '/merch', pathMatch: 'full' },
  { path: 'merch', component: VoirProduitsComponent, resolve: { products: MerchResolver } },
  { path: 'merch/product/:id', component: ConsulterDetailsComponent, resolve: { product: ProductResolver } },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'profile', component: PageProfilComponent }
];
