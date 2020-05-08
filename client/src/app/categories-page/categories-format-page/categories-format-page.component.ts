import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/Interfaces';

@Component({
  selector: 'app-categories-format-page',
  templateUrl: './categories-format-page.component.html',
  styleUrls: ['./categories-format-page.component.css'],
})
export class CategoriesFormatPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService
  ) {}

  @ViewChild('fileInput') inputRef: ElementRef;
  isNew = true;
  form: FormGroup;
  image: File;
  imagePreview = '';
  category: Category;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.form.disable();

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false;
            return this.categoryService.fetchById(params['id']);
          }
          return of(null);
        })
      )
      .subscribe(
        (category: Category) => {
          if (category) {
            this.category = category
            this.form.patchValue({
              name: category.name,
            });
            this.imagePreview = category.imageSrc
            MaterialService.updateTextInputs();
          }
          this.form.enable();
        },
        (error) => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      );
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    };

    reader.readAsDataURL(file);
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onSubmit() {
    let obs$
    this.form.disable()

    if (this.isNew) {
      obs$ = this.categoryService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoryService.update(this.category._id ,this.form.value.name, this.image)
    }

    obs$.subscribe(
      category => {
        this.category = category
        MaterialService.toast('Изменения сохранены')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }
}
