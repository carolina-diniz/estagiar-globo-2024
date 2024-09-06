const { calcularValorDaCompra } = require("../store-checkout");

test('Should return "Item extra não pode ser pedido sem o principal"', () => {
  const resultado = calcularValorDaCompra("debito", ["soundbar,1"]);
  // Add assertions to validate the result
  expect(resultado).toBe("Item extra não pode ser pedido sem o principal")
});

test("Should return the correct amount for a TV with an accessory", () => {
  const resultado = calcularValorDaCompra("debito", ["tv32,1", "soundbar,1"]);
  // Add assertions to validate the result
  expect(resultado).toBe("R$ 1.650,00");
});

test('Should return "Forma de pagamento inválida!" for an invalid payment method', () => {
  const resultado = calcularValorDaCompra("cheque", ["tv32,1"]);
  expect(resultado).toBe("Forma de pagamento inválida!")
});

test('Should return "Forma de pagamento inválida!" for an empty payment method', () => {
  const resultado = calcularValorDaCompra("", ["tv32,1"]);
  expect(resultado).toBe("Forma de pagamento inválida!")
});

test('Should return "Não há itens no carrinho de compra!" for an empty items entry', () => {
  const resultado = calcularValorDaCompra("debito", []);
  expect(resultado).toBe("Não há itens no carrinho de compra!")
});

test('Should return "Quantidade inválida!" for an invalid formated items entry', () => {
  const resultado = calcularValorDaCompra("debito", ["tv32"]);
  expect(resultado).toBe("Quantidade inválida!")
});
