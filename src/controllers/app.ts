const promptSync = require('prompt-sync')();


function changeCalc(){
    let value = promptSync("de quanto foi a compra? \n")

    let payment = promptSync("quanto foi pago \n")

    let change = (value - payment) * -1

    if(change <0){
        change = change * -1
        console.log(`Pagamento insuficiente, Faltam ${change} R$!`)
    }else if(change === 0){
        console.log("não existe troco nessa compra!")
    }else{
    console.log(`o troco é de ${change}!`)
    }
}

function paymentCalc(){

    const moneyValue = {
     coin5: 0.05,
     coin10: 0.10,
     coin25: 0.25,
     coin50: 0.50,
     coin1: 1.00,
     bill2: 2.0,
     bill5: 5.0,
     bill10: 10.0,
     bill20: 20.0,
     bill50: 50.0,
     bill100: 100.0,
     bill200: 200.0
    }

    let total = 0;

    for(const i in moneyValue){
        const quantity = Number(promptSync(`Quantas cedulas de ${i}(R$${moneyValue[i].toFixed(2)})?`))
    }
}


changeCalc()