import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LstProductos } from './components/lst-productos/lst-productos';
import { FormProductos } from './components/form-productos/form-productos';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'productos' },
  { path: 'productos', component: LstProductos },
  { path: 'form/:id', component: FormProductos },
  { path: '**', redirectTo: 'productos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
