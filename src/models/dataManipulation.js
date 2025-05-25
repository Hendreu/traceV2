import promptSync from 'prompt-sync';
const prompt = promptSync();

import sqlite3 from 'sqlite3';
import fs from 'fs';

const db = new sqlite3.Database('./mydb.db');

function runAsync(db, sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this); 
    });
  });
}

async function createDB() {
  await runAsync(db,"CREATE TABLE IF NOT EXISTS currency (billID INTEGER PRIMARY KEY AUTOINCREMENT, billValue REAL UNIQUE, billQuantity INTEGER)");
  await runAsync(db,`INSERT OR IGNORE INTO currency (billValue, billQuantity)
     VALUES (0.05, 0), (0.10, 0), (0.25, 0), 
     (0.50, 0), (1.00, 0), (2.00, 0), 
     (5.00, 0), (10.00, 0), (20.00, 0), 
     (50.00, 0), (100.00, 0), (200.00, 0)`);
}

async function updateDB(billID, quantity) {
  await runAsync(db,`UPDATE currency SET billQuantity = ${quantity} WHERE billID = ${billID}`);
}

async function deleteDB() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        fs.unlinkSync('./mydb.db');
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}

async function menu() {
  
  
  let select = Number(prompt(`\n=== Menu de Gerenciamento ===
  1. Atualizar quantidade de cédulas
  2. Recriar banco de dados
  3. Deletar banco de dados
  4. Sair 
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
      db.close();
      process.exit(0);
    default:
      console.log('Opção inválida, tente novamente');
      await menu();
  }
}

menu();

export { createDB, updateDB, deleteDB, menu };