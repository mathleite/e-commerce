import Product from "../domain/Product";

export default class ProductRepository {
    private DATABASE_NAME = 'product';

    constructor(private readonly database: DatabaseConnector) {
    }

    create(product: Product) {
        return this.database.insert(this.DATABASE_NAME, product);
    }

    findByDescription(description: string): object | null {
        const product = this.database.select(this.DATABASE_NAME, 'description', description);
        if (!product) return null;
        return product;
    }
}