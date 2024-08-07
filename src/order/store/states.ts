export interface OrderState {
    orderList: Orders[];
    order: OrderItem | null
    currentPageNumber: number
    totalPageNumber: number
}

export interface Orders {
    orderId: number
    orderName: string
    orderDate: string
    orderSize: number
    ordersItemTotalPrice: number
}

export interface OrderItem {
    orderId: number
    cartItemId: number
    quantity: number
    price: number
    size: number
}

const state: OrderState = {
    orderList: [],
    order: null,
    currentPageNumber: 1,
    totalPageNumber: 1,
}

export default state