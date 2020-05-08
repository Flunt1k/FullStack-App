import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/Interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent implements OnInit {
  constructor(private categoriesService: CategoriesService) {}

  
  categories$: Observable<Category[]>

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
  }
}
