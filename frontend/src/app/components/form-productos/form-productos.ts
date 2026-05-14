import { Component } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-productos',
  standalone: false,
  templateUrl: './form-productos.html',
  styleUrl: './form-productos.css',
})
export class FormProductos {

  id: number = 0

  esNuevo:boolean = true
  producto:Producto = {
    nombre: '',
    precio: 0,
    descripcion: '',
    categoria: '',
  }

  constructor(private activeRoute:ActivatedRoute,
              private productoService:ProductoService,
              private router:Router,
              private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
     this.activeRoute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.esNuevo = this.id === 0;


      if (!this.esNuevo) {
        this.getProducto();
      }
    });
  }


  getProducto(){
    this.productoService.getProductoById(this.id).subscribe({
      next:(res)=> {
          console.log(res.producto);
          this.producto = res.producto
      },
      error(err) {
        console.error('Erro al encontrar producto',err.mensaje);
      },
    })
  }



  onSubmit(formProducto:NgForm){
    if (formProducto.invalid) {
      formProducto.control.markAllAsTouched();
      return;
    }

    if (this.esNuevo) {
      this.productoService.postProducto(this.producto).subscribe({
        next: (res) => {
          this.toastr.success(res.mensaje, 'Éxito');
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          this.toastr.error('Error al crear producto', 'Error');
          console.error('Error al crear producto', err);
        }
      });
    } else {
      this.productoService.putProducto(this.id, this.producto).subscribe({
        next: (res) => {
          this.toastr.success(res.mensaje, 'Éxito');
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          this.toastr.error('Error al actualizar producto', 'Error');
          console.error('Error al actualizar producto', err);
        }
      });
    }
  }
}
