import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../services/alert';

@Component({
  selector: 'app-lst-productos',
  standalone: false,
  templateUrl: './lst-productos.html',
  styleUrls: ['./lst-productos.css'],
})
export class LstProductos implements OnInit {
  lstProductos: Producto[] = [];
  productosPaginados: any[] = [];

  paginaActual: number = 1;
  itemsPorPagina: number = 10;
  totalPaginas: number = 0;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private toastr: ToastrService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (res) => {
        this.lstProductos = res.productos;
        this.totalPaginas = Math.ceil(
          this.lstProductos.length / this.itemsPorPagina,
        );
        this.actualizarPaginacion();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  actualizarPaginacion(): void {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;

    this.productosPaginados = this.lstProductos.slice(inicio, fin);
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) return;

    this.paginaActual = pagina;
    this.actualizarPaginacion();
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  agregar(): void {
    this.router.navigate(['form', 0]);
  }

  editar(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['form', id]);
  }

  eliminar(id: number | undefined): void {
    if (!id) return;

    this.alertService.confirmarEliminacion().then((result) => {
      if (!result.isConfirmed) return;

      this.productoService.deleteProducto(id).subscribe({
        next: (res) => {
          this.alertService.exito('Producto eliminado', res.mensaje);
          this.getProductos();
        },
        error: (err) => {
          this.alertService.error('Error', 'No se pudo eliminar el producto');
          console.error('Error al eliminar producto', err);
        },
      });
    });
  }
}
