const momentJS = require("moment")
const Order = require("../models/Order")
const errorHandler = require("../utils/errorHandler")

module.exports.overview = async function (request, response) {
	try {
		const orders = await Order.find({ user: request.user.id }).sort({ date: 1 })
		const ordersMap = getOrdersMap(orders)
		const ordersTheDayBefore =
			ordersMap[momentJS().add(-1, "d").format("DD.MM.YYYY")] || []

		//Numbers of orders the day before

		const ordersTheDayBeforeNumber = ordersTheDayBefore.length

		//Number of orders

		const totalOrdersNumber = orders.length

		// Number of days

		const totalDaysNumber = Object.keys(ordersMap).length

		//Orders per day

		const ordersPerDay = (totalOrdersNumber / totalDaysNumber).toFixed(0)

		//Percent of order's number

		const ordersPercent = (
			(ordersTheDayBeforeNumber / ordersPerDay - 1) *
			100
		).toFixed(2)

		//Total revenue

		const totalRevenue = calcRevenue(orders)

		//Revenue per day

		const revenuePerDay = totalRevenue / totalDaysNumber

		//Revenue for the day before

		const revenueTheDayBefore = calcRevenue(ordersTheDayBefore)

		//Revenue's percent

		const revenuePercent = (
			(revenueTheDayBefore / revenuePerDay - 1) *
			100
		).toFixed(2)

		//Compare revenue

		const compareRevenue = (revenueTheDayBefore - revenuePerDay).toFixed(2)

		//Compare number of orders

		const compareNumber = (ordersTheDayBeforeNumber - ordersPerDay).toFixed(2)

		response.status(200).json({
			revenue: {
				percent: Math.abs(+revenuePercent),
				compare: Math.abs(+compareRevenue),
				yesterday: +revenueTheDayBefore,
				isHigher: +revenuePercent > 0,
			},
			orders: {
				percent: Math.abs(+ordersPercent),
				compare: Math.abs(+compareNumber),
				yesterday: +ordersTheDayBefore,
				isHigher: +ordersPercent > 0,
			},
		})
	} catch (error) {
		errorHandler(response, error)
	}
}

module.exports.analytics = async function (request, response) {
	try {
		const orders = await Order.find({ user: request.user.id }).sort({ date: 1 })
		const ordersMap = getOrdersMap(orders)

		const average = +(
			calcRevenue(orders) / Object.keys(ordersMap).length
		).toFixed(2)

		const chart = Object.keys(ordersMap).map((label) => {
			const revenue = calcRevenue(ordersMap[label])
			const order = ordersMap[label].length
			return {
				label,
				order,
				revenue,
			}
		})

		response.status(200).json({
			average,
			chart,
		})
	} catch (error) {
		errorHandler(response, error)
	}
}

function getOrdersMap(orders = []) {
	const dayAndOrders = {}
	orders.forEach((order) => {
		const date = momentJS(order.date).format("DD.MM.YYYY")

		if (date === momentJS().format("DD.MM.YYYY")) {
			return
		}

		if (!dayAndOrders[date]) {
			dayAndOrders[date] = []
		}

		dayAndOrders[date].push(order)
	})
	return dayAndOrders
}

function calcRevenue(orders = []) {
	return orders.reduce((acc, order) => {
		const orderPrice = order.list.reduce((acc2, item) => {
			return (acc2 += item.cost * item.quantity)
		}, 0)
		return (acc += orderPrice)
	}, 0)
}
