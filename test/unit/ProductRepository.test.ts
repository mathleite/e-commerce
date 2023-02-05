import ProductRepository from "../../src/database/ProductRepository";
import InMemoryDatabase from "../../src/database/InMemoryDatabase";
import Product from "../../src/domain/Product";

test('Should insert Product with valid fields', function () {
   const repository = new ProductRepository(new InMemoryDatabase);
   const product = new Product('Generic Book', 1, 20);
   expect(repository.create(product)).toBeTruthy();
});

test('Should select Product by description', function () {
   const repository = new ProductRepository(new InMemoryDatabase);
   const product = new Product('Gold Pencil', 1, 140);
   repository.create(product);
   const response = repository.findByDescription(product.description);
   expect(response).toHaveProperty('description');
   expect(response).toBeInstanceOf(Object);
});

test('Should not find Product with wrong description', function () {
   const repository = new ProductRepository(new InMemoryDatabase);
   const product = new Product('Gold Pencil', 1, 140);
   repository.create(product);
   const response = repository.findByDescription('Wrong description');
   expect(response).toBeNull();
});