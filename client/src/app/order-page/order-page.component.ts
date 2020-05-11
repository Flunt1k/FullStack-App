import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	OnDestroy,
	AfterViewInit,
} from "@angular/core"
import { Router, NavigationEnd } from "@angular/router"
import {
	MaterialService,
	MaterialInterface,
} from "../shared/classes/material.service"
import { OrderService } from './order.service'

@Component({
	selector: "app-order-page",
	templateUrl: "./order-page.component.html",
  styleUrls: ["./order-page.component.css"],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private router: Router,
              private order: OrderService) {}

	@ViewChild("modal") modalRef: ElementRef
	isRoot: boolean
	modal: MaterialInterface

	ngOnInit(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.isRoot = this.router.url === "/order"
			}
		})
	}

	ngOnDestroy() {
		this.modal.destroy()
	}

	ngAfterViewInit() {
	  this.modal =	MaterialService.initModal(this.modalRef)
	}

	openWindow() {
		this.modal.open()
	}

	closeWindow() {
		this.modal.close()
	}

	onSubmit() {
		this.modal.close()
	}
}
