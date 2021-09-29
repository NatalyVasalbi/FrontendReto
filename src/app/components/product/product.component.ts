import { ProviderAstType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  listProducts: any[] = [
  ];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  idProduct: number;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _productService: ProductService) {

    this.form=this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      registrationDate: ['']
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._productService.getListProducts().subscribe(data => {
      console.log(data);
      this.listProducts=data;
    },error =>{
      console.log(error);
    })
  }

  saveProduct(){
    const product: any = {
      name: this.form.get('name')?.value,
      price: Number(this.form.get('price')?.value),
      stock: Number(this.form.get('stock')?.value),
      registrationDate: this.form.get('registrationDate')?.value
    }
    if(this.id==undefined){
      //agregamos un nuevo producto
      this._productService.addProduct(product).subscribe(data=>{
        this.toastr.success('El producto ha sido registrado con éxito!', 'Producto Registrado!');
        this.getProducts();
        this.form.reset();
      },error=>{
        this.toastr.error('Upss.. ocurrió un error!', 'Error!');
        console.log(error);
      })
      this.form.reset();
    }else{
      //editamos el producto
      product.id=this.id;
      this._productService.updateProduct(product).subscribe(data=>{
        this.form.reset();
        this.accion="Editar";
        this.id=undefined;
        this.toastr.info('El producto ha sido actualizado con éxito!', 'Producto actualizado');
        this.getProducts();
      }, error=>{
        console.log(error);
      })
    }

  }
  deleteProduct(id: number){
    //this.listProducts.splice(index,1);
    this._productService.deleteProduct(id).subscribe(data=>{
      this.toastr.error('El producto ha sido eliminado!', 'Producto Eliminado!');
      this.getProducts();
    }),
    error=>{
      console.log(error);
    }
  }
  editProduct(product: any){
    this.accion="Editar";
    this.id=product.id;
    this.form.patchValue({
      name: product.name,
      price: product.price,
      stock: product.stock,
      registrationDate: product.registrationDate
    })
  }
  searchProduct(){
    if(this.idProduct){
      this._productService.searchProduct(this.idProduct).subscribe(data => {
        if(data){
          this.listProducts=[];
        this.listProducts.push(data);
        }else{
          this.toastr.error('No se encontró el producto!', 'Mensaje!');
        }
      },error =>{
        console.log(error);
      })
    }else{
      this.getProducts();
    }

  }
}
