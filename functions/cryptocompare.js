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
    '1d':0,
    '30d':0
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
    cc.priceMulti(['BTC', 'HIVE', 'ETH'], ['EUR', 'BTC'])
    .then(prices => {
      resolve(prices)
    })
    .catch(console.error)
  })
}

function getHistorical(token, date){
  return new Promise(function(resolve, reject){
    var dateObj = new Date();
    dateObj.setDate(dateObj.getDate()-1);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newdate = year + "-" + month + "-" + day;
    cc.priceHistorical(token, ['EUR', 'BTC'], new Date(newdate))
    .then(prices => {
      resolve(prices)
      // -> { BTC: { USD: 997, EUR: 948.17 } }
    })
    .catch(console.error)
  })
}

function collectdata(){
  getprices().then(function(result){
   cryptocompare.BTCprice.eur = result.BTC.EUR;
   cryptocompare.HIVEprice.eur = result.HIVE.EUR;
   cryptocompare.HIVEprice.btc = result.HIVE.BTC;
   cryptocompare.ETHprice.eur = result.ETH.EUR;
   cryptocompare.ETHprice.btc = result.ETH.BTC;
   getHistorical('BTC', 1).then(function(result){
    cryptocompare.BTCprice.d1 = (100*result.EUR/cryptocompare.BTCprice.eur).toFixed(2);
    getHistorical('BTC', 30).then(function(result){
      cryptocompare.BTCprice.d30 = (100*result.EUR/cryptocompare.BTCprice.eur).toFixed(2);
      getHistorical('BTC', 7).then(function(result){
        cryptocompare.BTCprice.d7 = (100*result.EUR/cryptocompare.BTCprice.eur).toFixed(2);
      })
      return;
    })
   })
  })
}

function exportdata(){
  return cryptocompare.BTCprice
}


cc.setApiKey(token)

module.exports = {
  collectdata,
  exportdata
}