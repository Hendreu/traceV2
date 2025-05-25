import promptSync from 'prompt-sync';

const prompt = promptSync();

import { createDB, updateDB, deleteDB, checkDB } from '../models/dataManipulation.js';

import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./mydb.db');

async function initializeDB() {
  try {
    await createDB();
    console.log("Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error.message);
    process.exit(1);
  }
}

function calcChange() {
  let totalBill = parseFloat(prompt('Qual o valor da conta? R$ '));
  let payment = parseFloat(prompt('Qual o valor do pagamento? R$ '));
  
  if (isNaN(totalBill) || isNaN(payment)) {
    throw new Error("Por favor, digite valores numéricos válidos");
  }
  
  if (payment < totalBill) {
    throw new Error("O valor pago é menor que o valor da conta!");
  }
  
  let change = payment - totalBill;
  return change;
}

async function sortChange() {
  try {
    let change = calcChange();
    console.log(`\nValor do troco: R$ ${change.toFixed(2)}`);
    
    let bills = await checkDB();
    if (!bills || bills.length === 0) {
      console.log("Não há notas/moedas disponíveis no caixa!");
      return;
    }

    console.log("\nNotas/Moedas do troco:");
    let remainingChange = change;
    
    for (let i = 0; i < bills.length; i++) {
      let bill = bills[i];
      let quantity = Math.floor(remainingChange / bill.billValue);
      
      if (quantity > 0 && quantity <= bill.billQuantity) {
        remainingChange -= quantity * bill.billValue;
        await updateDB(bill.billID, bill.billQuantity - quantity);
        console.log(`${quantity}x R$ ${bill.billValue.toFixed(2)}`);
      }
    }
    
    if (remainingChange > 0) {
      console.log(`\nNão foi possível dar o troco exato!`);
      console.log(`Faltou: R$ ${remainingChange.toFixed(2)}`);
    }
    
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

async function menu() {
  try {
    let select = Number(prompt(`\n=== Menu de Gerenciamento ===
    1. Atualizar quantidade de cédulas
    2. Recriar banco de dados
    3. Deletar banco de dados
    4. Calcular troco
    5. Sair 
    escolha uma opção: `));
  
    switch (select) {
      case 1:
        let billID = prompt(`Deseja atualizar qual valor do caixa?
           1 para moedas de 5 centavos, 
           2 para moedas de 10 centavos, 
           3 para moedas de 25 centavos, 
           4 para moedas de 50 centavos, 
           5 para moedas de 1 real, 
           6 para moedas de 2 reais, 
           7 para moedas de 5 reais, 
           8 para moedas de 10 reais, 
           9 para moedas de 20 reais, 
           10 para moedas de 50 reais, 
           11 para moedas de 100 reais, 
           12 para moedas de 200 reais`);
  
        let quantity = prompt('Quantas notas deseja adicionar? ');
        await updateDB(billID, quantity);
        console.log("Quantidade atualizada com sucesso!");
        break;
      case 2:
        await createDB();
        console.log('Banco de dados recriado com sucesso!');
        break;
      case 3:
        await deleteDB();
        console.log('Banco de dados deletado com sucesso!');
        break;
      case 4:
        await sortChange();
        break;
      case 5:
        db.close();
        process.exit(0);
      default:
        console.log('Opção inválida, tente novamente');
        await menu();
    }
  } catch (error) {
    console.error("Erro:", error.message);
    await menu();
  }
}


initializeDB().then(() => {
  menu();
});
