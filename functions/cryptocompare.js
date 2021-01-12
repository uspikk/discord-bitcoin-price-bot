const token = require('../config.js').config.cryptocomparetoken
global.fetch = require('node-fetch')
const cc = require('cryptocompare')

function cryptopricehead(){
  this.BTCprice = {
    'eur':0,
    'btc':0,
    'd1':0,
    'd7':0,
    'd30':0
  }
  this.HIVEprice = {
    'eur':0,
    'btc':0,
    'd1':0,
    'd7':0,
    'd30':0,
    'btc1':0,
    'btc7':0,
    'btc30':0
  }
  this.ETHprice = {
    'eur':0,
    'btc':0,
    '1d':0,
    '30d':0
  }
  collectdata()
}

let cryptocompare = new cryptopricehead();

function getprices(){
  return new Promise(function(resolve, reject){
    cc.priceMulti(['BTC', 'HIVE', 'ETH'], ['USD', 'EUR', 'BTC'])
    .then(prices => {
      resolve(prices)
    })
    .catch(console.error)
  })
}

function getHistorical(token, date){
  return new Promise(function(resolve, reject){
    var dateObj = new Date();
    dateObj.setDate(dateObj.getDate()-date);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newdate = year + "-" + month + "-" + day;
    cc.priceHistorical(token, ['USD', 'BTC'], new Date(newdate))
    .then(prices => {
      resolve(prices)
      // -> { BTC: { USD: 997, EUR: 948.17 } }
    })
    .catch(console.error)
  })
}

function collectdata(){
  getprices().then(function(result){
   cryptocompare.BTCprice.eur = result.BTC.USD;
   cryptocompare.HIVEprice.eur = result.HIVE.USD;
    let nosats = JSON.stringify(result.HIVE.BTC)
    let sats = '';
    let foundzero = false;
    for(var i=0;i<nosats.length;i++){
      if(nosats[i] === '0' || nosats[i] === '.' && foundzero === false) continue;
      else{
        foundzero = true;
        sats = sats + nosats[i];
      } 
    }
    sats = JSON.parse(sats)
   cryptocompare.HIVEprice.btc = sats;
   cryptocompare.ETHprice.eur = result.ETH.USD;
   cryptocompare.ETHprice.btc = result.ETH.BTC;
   getHistorical('BTC', 1).then(function(result){
    cryptocompare.BTCprice.d1 = ((cryptocompare.BTCprice.eur-result.USD)*100/cryptocompare.BTCprice.eur).toFixed(2);
    getHistorical('BTC', 30).then(function(result){
      cryptocompare.BTCprice.d30 = ((cryptocompare.BTCprice.eur-result.USD)*100/cryptocompare.BTCprice.eur).toFixed(2);
      getHistorical('BTC', 7).then(function(result){
        cryptocompare.BTCprice.d7 = ((cryptocompare.BTCprice.eur-result.USD)*100/cryptocompare.BTCprice.eur).toFixed(2);
        getHistorical('HIVE', 1).then(function(result){
          cryptocompare.HIVEprice.d1 = ((cryptocompare.HIVEprice.eur-result.USD)*100/cryptocompare.HIVEprice.eur).toFixed(2);
          let nosats = JSON.stringify(result.BTC)
          let sats = '';
          let foundzero = false;
          for(var i=0;i<nosats.length;i++){
            if(nosats[i] === '0' || nosats[i] === '.' && foundzero === false) continue;
            else{
              foundzero = true;
              sats = sats + nosats[i];
            } 
          }
          sats = JSON.parse(sats)
          cryptocompare.HIVEprice.btc1 = ((cryptocompare.HIVEprice.btc-sats)*100/cryptocompare.HIVEprice.btc).toFixed(2);
          getHistorical('HIVE', 7).then(function(result){
            cryptocompare.HIVEprice.d7 = ((cryptocompare.HIVEprice.eur-result.USD)*100/cryptocompare.HIVEprice.eur).toFixed(2);
            let nosats = JSON.stringify(result.BTC)
            let sats = '';
            let foundzero = false;
            for(var i=0;i<nosats.length;i++){
              if(nosats[i] === '0' || nosats[i] === '.' && foundzero === false) continue;
              else{
                foundzero = true;
                sats = sats + nosats[i];
              } 
            }
            sats = JSON.parse(sats)
            cryptocompare.HIVEprice.btc7 = ((cryptocompare.HIVEprice.btc-sats)*100/cryptocompare.HIVEprice.btc).toFixed(2);
            getHistorical('HIVE', 30).then(function(result){
            cryptocompare.HIVEprice.d30 = ((cryptocompare.HIVEprice.eur-result.USD)*100/cryptocompare.HIVEprice.eur).toFixed(2);
            let nosats = JSON.stringify(result.BTC)
            let sats = '';
            let foundzero = false;
            for(var i=0;i<nosats.length;i++){
              if(nosats[i] === '0' || nosats[i] === '.' && foundzero === false) continue;
              else{
                foundzero = true;
                sats = sats + nosats[i];
              } 
            }
            sats = JSON.parse(sats)
            cryptocompare.HIVEprice.btc30 = ((cryptocompare.HIVEprice.btc-sats)*100/cryptocompare.HIVEprice.btc).toFixed(2);
            return;
            })
          })
        })
      })
    })
   })
  })
}

function exportdata(){
  return cryptocompare.BTCprice
}

function exporthivedata(){
  return cryptocompare.HIVEprice
}


cc.setApiKey(token)

module.exports = {
  collectdata,
  exportdata,
  exporthivedata
}