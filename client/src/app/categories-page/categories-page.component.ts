import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/Interfaces';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
})
export class CategoriesPageComponent implements OnInit {
  constructor(private categoriesService: CategoriesService) {}

  loading = false
  categories: Category[] = []

  ngOnInit(): void {
    this.loading = true
    this.categoriesService.fetch().subscribe(categories => {
      this.loading = false
      this.categories = categories
    })
  }
}
