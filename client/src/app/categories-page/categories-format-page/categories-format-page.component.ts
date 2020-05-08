import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-categories-format-page',
  templateUrl: './categories-format-page.component.html',
  styleUrls: ['./categories-format-page.component.css'],
})
export class CategoriesFormatPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

  }
}
