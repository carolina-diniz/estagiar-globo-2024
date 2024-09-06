const { calcularValorDaCompra } = require('./store-checkout');

// Example usage: calculate the total amount of a purchase
const formaDePagamento = 'dinheiro';
const itens = ["tv32,1"];

const resultado = calcularValorDaCompra(formaDePagamento, itens);
console.log(resultado);