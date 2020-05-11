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
import { OrderService } from "./order.service"
import { OrderList, Order } from "../shared/Interfaces"
import { OrdersService } from "../shared/services/orders.service"
import { Subscription } from "rxjs"

@Component({
	selector: "app-order-page",
	templateUrl: "./order-page.component.html",
	styleUrls: ["./order-page.component.css"],
	providers: [OrderService],
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
	constructor(
		private router: Router,
		public order: OrderService,
		private ordersService: OrdersService
	) {}

	@ViewChild("modal") modalRef: ElementRef
	isRoot: boolean
	modal: MaterialInterface
	pending = false
	oSub: Subscription

	ngOnInit(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.isRoot = this.router.url === "/order"
			}
		})
	}

	ngOnDestroy() {
		this.modal.destroy()
		if (this.oSub) {
			this.oSub.unsubscribe()
		}
	}

	ngAfterViewInit() {
		this.modal = MaterialService.initModal(this.modalRef)
	}

	openWindow() {
		this.modal.open()
	}

	closeWindow() {
		this.modal.close()
	}

	onSubmit() {
		this.pending = true
		const order: Order = {
			list: this.order.list.map((item) => {
				delete item._id
				return item
			}),
		}
		this.oSub = this.ordersService.create(order).subscribe(
			(resOrder) => {
				MaterialService.toast(`Заказ № ${resOrder.order} был создан`)
				this.order.clear()
			},
			(error) => MaterialService.toast(error.error.message),
			() => {
				this.modal.close()
				this.pending = false
			}
		)
	}

	removePosition(orderList: OrderList) {
		this.order.remove(orderList)
	}
}
