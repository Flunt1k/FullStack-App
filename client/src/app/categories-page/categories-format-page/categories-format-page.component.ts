import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';

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

  isNew = true;
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.form.disable()

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
        (category) => {
          if (category) {
            this.form.patchValue({
              name: category.name,
            });
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        (error) => MaterialService.toast(error.error.message)
      );
  }

  onSubmit() {}
}
