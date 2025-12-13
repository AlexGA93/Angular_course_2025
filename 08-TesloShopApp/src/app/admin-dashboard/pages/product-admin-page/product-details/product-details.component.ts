import { Component, inject, input, OnInit, signal } from "@angular/core";
import { MappedProduct } from "@products/interfaces/mapped-product.interface";
import { ProductCarouselComponent } from "@products/components/product-carousel/product-carousel.component";
import { constants } from "@utils/constants";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormUtils } from "@utils/form-utils";
import { Product } from "@products/interfaces/product.interface";
import { FormErrorLabel } from "@shared/components/form-error-label/form-error-label";
import { ProductsService } from "@products/services/products.service";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "product-details",
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabel],
  templateUrl: "./product-details.component.html",
})
export class ProductDetailsComponent implements OnInit {
  // inputs
  product = input.required<MappedProduct>();

  // inyecciones
  fb = inject(FormBuilder);
  ps = inject(ProductsService);
  router = inject(Router);

  // definiciones
  productForm = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    slug: [
      "",
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [1, [Validators.required, Validators.min(1)]],
    stock: [1, [Validators.required, Validators.min(1)]],
    sizes: [[""]],
    tags: [""],
    images: [[]],
    gender: [
      "men",
      [Validators.required, Validators.pattern(FormUtils.genderPattern)],
    ],
  });

  wasSaved = signal<boolean>(false);

  sizes: string[] = [
    constants.COMMON.SIZES.XS,
    constants.COMMON.SIZES.S,
    constants.COMMON.SIZES.M,
    constants.COMMON.SIZES.L,
    constants.COMMON.SIZES.XL,
    constants.COMMON.SIZES.XXL,
  ];

  ngOnInit(): void {
    this.productForm.reset(this.product() as any);
  }

  // definimos un metodo en el que le pasamos un objeto parcial de producto y seteamos los valores del formulario
  setFormvalue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any);

    // seteamos los valores del formulario con los valores del objeto parcial de producto pasado como argumento
    // this.productForm.patchValue(formLike as any);
    // para los tags, unimos el array en una cadena separada por comas
    this.productForm.patchValue({ tags: formLike.tags?.join(",") });
  }

  onSizeChange(size: string) {
    const currentSizes = this.productForm.get("sizes")?.value as string[];
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }
    this.productForm.patchValue({ sizes: currentSizes });
    console.log(this.productForm.value);
    
  }

  // funciones
  async onSubmit() {
    const isValid = this.productForm.valid;
    console.log({isValid});
    

    // marcamos todos los elementos del formulario como tocados
    this.productForm.markAllAsTouched();

    if (!isValid) return;

    // obtenemos los valores del formulario
    const formValue = this.productForm.value;
    console.log({formValue});
    

    // retornamos los valores del formulario, pero con los tags como un array de strings
    const productLike: MappedProduct = { ...(formValue as any) };
    /**
     * * Necesitamos disparar el wasSaved despues de que se tenga la respuesta de la peticion HTTP.
     * Para ello, tratamos la logica como promesas
     */
    // condicion si es producto nuevo o no
    if (this.product().id === "new") {
      // recibe un observable y regresa una promesa con el primer valor emitido
      const product = await firstValueFrom(this.ps.createProduct(productLike));
      // console.log({ product });
      // redirigimos al usuario a la pagina de edicion del nuevo producto
      this.router.navigate(["admin/products", product.id]);

      // en lugar de actualizar, creamos el nuevo producto
      // this.ps.createProduct(productLike).subscribe((product) => {
      //   console.log("producto creado", product);
      //   // redirigimos al usuario a la pagina de edicion del nuevo producto
      //   this.router.navigate(['admin/products', product.id]);
      // });
    } else {
      await firstValueFrom(this.ps.updateProduct(this.product().id,productLike));

      // this.ps
      // .updateProduct(this.product().id, productLike)
      // .subscribe((product) => console.log("producto actualizado", product));

      console.log("cache actualizado");
    }

    // asignamos el valor de wasSaved a true y tras un lapso de tiempo lo volvemos a settear a false
    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }
}
