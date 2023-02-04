/*
    Given => Arrange,
    When  => Act,
    Then  => Assert
 */
import Order from "../../src/domain/Order";
import Product from "../../src/domain/Product";
import Cpf from "../../src/domain/Cpf";

test("Deve criar um Pedido com um Produto", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    order.addProduct(new Product("Clean Code Book", 1, 80));
    expect(1).toBe(order.getProducts().length);
});

test("Deve criar um Pedido vazio", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    expect(0).toBe(order.getProducts().length);
});

test("Deve calcular o total do pedido", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    order.addProduct(new Product("Clean Code Book", 1, 80));
    expect(80).toBe(order.getTotal());
});

test("Deve calcular o total do pedido com mais de 2 produtos", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    order.addProduct(new Product("Clean Code Book", 1, 80));
    order.addProduct(new Product("Clean Architecture Book", 1, 120));
    order.addProduct(new Product("DDD Book", 1, 100.65));
    expect(300.65).toBe(order.getTotal());
});

test("Deve calcular o total do pedido com desconto de 10%", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    order.addProduct(new Product("Clean Code Book", 1, 80));
    order.addProduct(new Product("Clean Architecture Book", 1, 120));
    order.addProduct(new Product("DDD Book", 1, 100.65));
    order.addDiscount(0.1);
    expect(270.585).toBe(order.getTotal());
});

test("Não Deve dar desconto se o mesmo for maior ou igual do que o total do Pedido", function () {
    const order = new Order(new Cpf('700.957.100-78'));
    order.addProduct(new Product("Clean Code Book", 1, 80));
    order.addProduct(new Product("Clean Architecture Book", 1, 120));
    order.addProduct(new Product("DDD Book", 1, 100.65));
    order.addDiscount(1.2);
    expect(300.65).toBe(order.getTotal());
});

test("Deve ocorrer uma Exception quando adicionar mais de 1 disconto no Pedido", function () {
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