import {
	Component,
	Input,
	ViewChild,
	ElementRef,
	OnDestroy,
	AfterViewInit,
} from "@angular/core"
import { Order } from "src/app/shared/Interfaces"
import {
	MaterialService,
	MaterialInterface,
} from "src/app/shared/classes/material.service"

@Component({
	selector: "app-history-list",
	templateUrl: "./history-list.component.html",
	styleUrls: ["./history-list.component.css"],
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
	@Input() orders: Order[]
	@ViewChild("modal") modalRef: ElementRef
	modal: MaterialInterface
	selectedOrder: Order

	ngOnDestroy() {
		this.modal.destroy()
	}

	ngAfterViewInit() {
		this.modal = MaterialService.initModal(this.modalRef)
	}

	calcPrice(order: Order): number {
		return order.list.reduce((acc, item) => {
			return (acc += item.quantity * item.cost)
		}, 0)
	}

	showModal(order: Order) {
		this.selectedOrder = order
		this.modal.open()
	}

	closeWindow() {
		this.modal.close()
	}
}
