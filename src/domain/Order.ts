import Product from "./Product";
import Cpf from "./Cpf";

export default class Order {
    private readonly products: Product[] = [];
    private discountPercent: number = 0;

    constructor(readonly document: Cpf) {}

    addProduct(product: Product): void {
        this.products.push(product);
    }

    getProducts(): Product[] {
        return this.products;
    }

    getTotal(): number {
        const total: number = this.products.reduce((accumulator, product) => accumulator + product.amount, 0);
        const discountAmount = this.discountPercent * total;
        if (this.discountPercent && discountAmount <= total) return total - discountAmount;
        return total;
    }

    addDiscount(discountPercent: number): void {
        if (this.discountPercent) throw new Error("Order can't has more than one discount");
        this.discountPercent += discountPercent;
    }
}