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
  try {

    await runAsync(db, "CREATE TABLE IF NOT EXISTS currency (billID INTEGER PRIMARY KEY AUTOINCREMENT, billValue REAL UNIQUE, billQuantity INTEGER)");
    

    await runAsync(db, `INSERT OR IGNORE INTO currency (billValue, billQuantity)
      VALUES (0.05, 0), (0.10, 0), (0.25, 0), 
      (0.50, 0), (1.00, 0), (2.00, 0), 
      (5.00, 0), (10.00, 0), (20.00, 0), 
      (50.00, 0), (100.00, 0), (200.00, 0)`);
    
    return true;
  } catch (error) {
    console.error("Erro ao criar banco de dados:", error);
    throw error;
  }
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

async function checkDB() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM currency WHERE billQuantity > 0 ORDER BY billValue DESC", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export { createDB, updateDB, deleteDB, checkDB };