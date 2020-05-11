import { Injectable } from "@angular/core"
import { Position, OrderList, Order } from "../shared/Interfaces"

@Injectable()
export class OrderService {
	public list: OrderList[] = []
	public price = 0

	add(position: Position) {
		const orderPosition: OrderList = Object.assign(
			{},
			{
				name: position.name,
				cost: position.cost,
				quantity: position.quantity,
				_id: position._id,
			}
		)
		const candidate = this.list.find(
			(position) => position._id === orderPosition._id
		)

		if (candidate) {
			candidate.quantity += orderPosition.quantity
		} else {
			this.list.push(orderPosition)
		}

		this.calcPrice()
	}

	remove(orderList: OrderList) {
		const index = this.list.findIndex(
			(position) => position._id === orderList._id
		)
		this.list.splice(index, 1)
		this.calcPrice()
	}

	clear() {
        this.list = []
        this.price = 0
    }

	private calcPrice() {
		this.price = this.list.reduce((acc, item) => {
			return (acc += item.quantity * item.cost)
		}, 0)
	}
}
