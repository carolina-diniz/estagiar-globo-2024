// Nome social: Carolina da Silva diniz
// Menu with products and their prices
const menu = {
  tv32: { description: 'Smart TV 32"', price: 1200.0 },
  tv43: { description: 'Smart TV 43"', price: 1800.0 },
  tv50: { description: 'Smart TV 50"', price: 2500.0 },
  tv55: { description: 'Smart TV 55"', price: 3200.0 },
  soundbar: { description: "Soundbar", price: 450.0 },
  wallMount: { description: "Wall Mount", price: 150.0 },
  combo1: { description: '1 Smart TV 32" and 1 Soundbar', price: 1500.0 },
  combo2: { description: '1 Smart TV 43" and 1 Wall Mount', price: 1900.0 },
};

// Function to calculate the total amount of the purchase
function calcularValorDaCompra(formaDePagamento, itens) {
  // Inicializa as variaveis
  let valorTotal = 0;
  let valorFinal = 0;
  let quantItemPrincipal = 0;
  let messageDeErro = "";
  let valido = true;

  const formaDePagamentoPermitido = ["debito", "credito", "dinheiro"];
  const itensPrincipais = ["tv32", "tv42", "tv50", "tv55"];

  // Implement logic to calculate the total based on items and payment method
  // Remember to apply any necessary discounts or surcharges
  if (!formaDePagamentoPermitido.includes(formaDePagamento)) {
    return "Forma de pagamento inválida!";
  }

  // verifica se carrinho está vazio
  if (itens.length === 0) {
    return "Não há itens no carrinho de compra!";
  }

  for (let i = 0; i < itens.length; i++) {
    // separa o código do item e a quantidade do item no carrinho de compra
    let [codigo, quantidade] = itens[i].split(",");
    quantidade = parseInt(quantidade);

    // verifica se código e quantidade são validos
    const isValid = checarSeItemValido(codigo, quantidade);
    if (!isValid.valido) {
      messageDeErro = isValid.mensagem;
      valido = false;
      break;
    }

    // verifica se item é um item principal
    if (itensPrincipais.includes(codigo)) {
      quantItemPrincipal += quantidade;
    }

    // Calcula o valor do item e soma ao total do carrinho de compra
    const item = menu[codigo];
    valorTotal += item.price * quantidade;
  }

  // verifica se item é válido
  if (!valido) {
    return messageDeErro;
  }

  // verifica se item principal existe
  if (quantItemPrincipal === 0) {
    return "Item extra não pode ser pedido sem o principal";
  }

  // Aplica os descontos e acrescimos conforme a forma de pagamento
  valorFinal = descontosEAcressimos(formaDePagamento, valorTotal);

  // retorna o valor total formatado para real brasileiro.
  return valorFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function checarSeItemValido(codigo, quantidade) {
  let isValid = true;
  let message = "";

  // verifica se item existe no menu
  if (!menu.hasOwnProperty(codigo)) {
    message = "Item inválido!";
    isValid = false;
  }

  // verifica se quantidade é inválido
  if (quantidade <= 0 || isNaN(quantidade)) {
    message = "Quantidade inválida!";
    isValid = false;
  }
  return { valido: isValid, mensagem: message };
}

// Função para aplicar descontos e acrescimos conforme a forma de pagamento
function descontosEAcressimos(formaDePagamento, valorTotal) {
  const desconto = 0.05;
  const acrescimo = 0.03;

  if (formaDePagamento === "dinheiro") {
    valorTotal -= valorTotal * desconto;
  } else if (formaDePagamento === "credito") {
    valorTotal += valorTotal * acrescimo;
  }
  return valorTotal;
}

module.exports = { calcularValorDaCompra };
