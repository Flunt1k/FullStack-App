import { Component, OnInit } from "@angular/core"
import { Router, NavigationEnd } from '@angular/router'

@Component({
	selector: "app-order-page",
	templateUrl: "./order-page.component.html",
	styleUrls: ["./order-page.component.css"],
})
export class OrderPageComponent implements OnInit {
  constructor(private router: Router) {}
  
  isRoot: boolean

	ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        this.isRoot = this.router.url === '/order'
      }
    })
  }
}
