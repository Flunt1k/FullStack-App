import { Component, OnInit, Input } from "@angular/core"
import { Order } from 'src/app/shared/Interfaces'

@Component({
	selector: "app-history-list",
	templateUrl: "./history-list.component.html",
	styleUrls: ["./history-list.component.css"],
})
export class HistoryListComponent implements OnInit {
	constructor() {}

	@Input() orders: Order[]

	ngOnInit(): void {}
}
