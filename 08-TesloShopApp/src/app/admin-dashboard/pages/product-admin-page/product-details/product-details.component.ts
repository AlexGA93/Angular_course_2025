import { Component, inject, input, OnInit } from '@angular/core';
import { MappedProduct } from '@products/interfaces/mapped-product.interface';
import { ProductCarouselComponent } from "@products/components/product-carousel/product-carousel.component";
import { constants } from '@utils/constants';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/form-utils';
import { Product } from '@products/interfaces/product.interface';

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  // inputs
  product = input.required<MappedProduct>();

  // inyecciones
  fb = inject(FormBuilder);

  // definiciones
  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    tags: [''],
    images: [[]],
    gender: ['men', [Validators.required, Validators.pattern(FormUtils.genderPattern)]]
  });

  sizes: string[] = [constants.COMMON.SIZES.XS, constants.COMMON.SIZES.S, constants.COMMON.SIZES.M, constants.COMMON.SIZES.L, constants.COMMON.SIZES.XL, constants.COMMON.SIZES.XXL];

  ngOnInit(): void {
    this.productForm.reset(this.product() as any);
  }

  // definimos un metodo en el que le pasamos un objeto parcial de producto y seteamos los valores del formulario
  setFormvalue(formLike: Partial<Product>){
    this.productForm.reset(this.product() as any);

    // seteamos los valores del formulario con los valores del objeto parcial de producto pasado como argumento 
    // this.productForm.patchValue(formLike as any);
    // para los tags, unimos el array en una cadena separada por comas
    this.productForm.patchValue({tags: formLike.tags?.join(',')});
  }

onSizeChange(size: string) {
    const currentSizes = this.productForm.get('sizes')?.value as string[];
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }
    this.productForm.patchValue({ sizes: currentSizes });
  }

  // funciones
  onSubmit() {
    console.log(this.productForm.value);
    
  }
}
