export interface ProductState {
    productList: Product[]
    product: Product | null
}

export interface Product {
    productId: number
    productName: string
    productPrice: string
    productDescription: string
    productImage: string
    registeredDate: string
    updatedDate: string
    viewCount: number
}

const state: ProductState = {
    productList: [],
    product: null,
}

export default state