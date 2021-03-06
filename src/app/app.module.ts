import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from  './header/header.component';
import { FooterComponent } from  './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import {ClienteService} from './clientes/cliente.service';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatAutocompleteModule,MatInputModule,MatFormFieldModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import {AuthGuard} from './usuarios/guards/auth.guard';
import {RoleGuard} from './usuarios/guards/role.guard';
import {TokenInterceptor} from './usuarios/interceptors/token.interceptor';
import {AuthInterceptor} from './usuarios/interceptors/auth.interceptor';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import { WelcomeComponent } from './welcome/welcome.component';
registerLocaleData(es);
const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'clientes/form', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'facturas/:id', component: DetalleFacturaComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_USER'}},
  {path: 'facturas/form/:clienteId', component: FacturasComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_USER'}},
  {path: 'clientes/form/:id', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role: 'ROLE_ADMIN'}},
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatMomentDateModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [ClienteService,
  { provide: LOCALE_ID, useValue: "es-ES" },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
