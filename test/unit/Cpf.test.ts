import Cpf from "../../src/domain/Cpf";
import InvalidCpfException from "../../src/domain/exceptions/InvalidCpfException";

test("Should throw Exception when given invalid value to CPF", function () {
    expect(() => new Cpf("")).toThrow(InvalidCpfException);
    expect(() => new Cpf("null")).toThrow("Invalid CPF");
});

test("Should throw Exception when given value with an invalid length", function () {
    expect(() => new Cpf("12")).toThrow(Error);
    expect(() => new Cpf("123.321.1")).toThrow("Invalid CPF");
    expect(() => new Cpf("123.321.134.4")).toThrow("Invalid CPF");
    expect(() => new Cpf("123.321.134.452")).toThrow("Invalid CPF");
    expect(() => new Cpf("123456789101")).toThrow("Invalid CPF");
});

test("Should throw Exception when given value with same characters", function () {
    expect(() => new Cpf("111.111.111-11")).toThrow(InvalidCpfException);
    expect(() => new Cpf("000.000.000-00")).toThrow("Invalid CPF");
});

test("Should throw Exception when given an invalid CPF", function () {
    expect(() => new Cpf("111.111.111-31")).toThrow("Invalid CPF");
    expect(() => new Cpf("00000000001")).toThrow("Invalid CPF");
});

test("Should create CPF instance with valid document", function () {
    const expectedCpf = '700.957.100-78';
    const document = new Cpf(expectedCpf);
    expect(document.get()).toBe(expectedCpf);
});

test("Should get unmasked document value when initialize CPF", function () {
    const document = new Cpf('700.957.100-78');
    expect('70095710078').toBe(document.get(false));
});