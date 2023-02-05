/*
    Given => Arrange,
    When  => Act,
    Then  => Assert
 */
import Order from "../../src/domain/Order";
import Product from "../../src/domain/Product";
import Cpf from "../../src/domain/Cpf";
import ProductRepository from "../../src/database/ProductRepository";
import InMemoryDatabase from "../../src/database/InMemoryDatabase";

const repository = new ProductRepository(new InMemoryDatabase);
beforeEach(() => {
    repository.create(new Product("Clean Code Book", 1, 80));
    repository.create(new Product("Clean Architecture Book", 1, 120));
    repository.create(new Product("DDD Book", 1, 100.65));
    return repository;
})
test("Should create a Order with one Product", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    // @ts-ignore
    order.addProduct(repository.findByDescription("Clean Code Book"));
    expect(1).toBe(order.getProducts().length);
});

test("Should create a Order without Products", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    expect(0).toBe(order.getProducts().length);
});

test("Should calc the Order total", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    // @ts-ignore
    order.addProduct(repository.findByDescription("Clean Code Book"));
    expect(80).toBe(order.getTotal());
});

test("Should cal the Order total with more than one Product", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    // @ts-ignore
    order.addProduct(repository.findByDescription("Clean Code Book"));
    // @ts-ignore
    order.addProduct(repository.findByDescription("Clean Architecture Book"));
    // @ts-ignore
    order.addProduct(repository.findByDescription("DDD Book"));
    expect(300.65).toBe(order.getTotal());
});

test("Should calc the Order total using a 10% coupon", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    // @ts-ignore
    order.addProduct(repository.findByDescription("Clean Code Book"));
    // @ts-ignore
    order.addProduct(repository.findByDescription("Clean Architecture Book"));
    // @ts-ignore
    order.addProduct(repository.findByDescription("DDD Book"));
    order.addDiscount(0.1);
    expect(270.585).toBe(order.getTotal());
});

test("Should not apply a discount that is more than 100%", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    // @ts-ignore
    order.addProduct(repository.findByDescription("Clean Code Book"));
    // @ts-ignore
    order.addProduct(repository.findByDescription("Clean Architecture Book"));
    // @ts-ignore
    order.addProduct(repository.findByDescription("DDD Book"));
    order.addDiscount(1.2);
    expect(300.65).toBe(order.getTotal());
});

test("Should not apply more than one discount", function () {
    const order = new Order(new Cpf('700.957.100-78'));

    expect(() => {
        order.addDiscount(0.1);
        order.addDiscount(0.5);
    }).toThrow("Order can't has more than one discount");
});

test("Should get Order document when initialize", function () {
    const expectedDocument = '700.957.100-78';
    const order = new Order(new Cpf(expectedDocument));
    expect(order.document.get()).toBe(expectedDocument);
});