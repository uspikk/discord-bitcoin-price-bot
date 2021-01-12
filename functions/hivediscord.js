const Discord = require('discord.js');
const client = new Discord.Client();
var boot = 0;

const token = require('../config.js').config.hivediscordtoken

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //client.user.setActivity('prise')
   //bot.user.setStatus('available')
  client.user.setStatus('idle')
    //.then(console.log)
  .catch(console.error);
  setInterval(changestatus, 10000)
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
})

function changestatus(){
  const getdata = require('./cryptocompare.js').exporthivedata
  const data = getdata()
  let sats = JSON.stringify(data.btc)
  if(boot === 0){
    client.guilds.cache.get('344979212278431754').members.cache.get('798057739049369640').setNickname('/ ' + JSON.stringify(data.eur)+ ' USD')
    .then(function(result){
      client.user.setActivity('1päeva vahe: '+data.d1+'%')
      .then(function(result){
        boot++;
        return;
      })
      .catch(console.error)
    })
    .catch(console.error)
  }
  if(boot === 1){
    client.guilds.cache.get('344979212278431754').members.cache.get('798057739049369640').setNickname('/ ' + sats + ' SATOSHI')
    .then(function(result){
      client.user.setActivity('1päeva vahe: '+data.btc1+'%')
      .then(function(result){
        boot++;
        return;
      })
      .catch(console.error)
    })
    .catch(console.error)
  }
  if(boot === 2){
    client.guilds.cache.get('344979212278431754').members.cache.get('798057739049369640').setNickname('/ ' + JSON.stringify(data.eur)+ ' USD')
    .then(function(result){
      client.user.setActivity('7päeva vahe: '+data.d7+'%')
      .then(function(result){
        boot++;
        return;
      })
      .catch(console.error)
    })
    .catch(console.error)
  }
  if(boot === 3){
    client.guilds.cache.get('344979212278431754').members.cache.get('798057739049369640').setNickname('/ ' + sats + ' SATOSHI')
    .then(function(result){
      client.user.setActivity('7päeva vahe: '+data.btc7+'%')
      .then(function(result){
        boot++;
        return;
      })
      .catch(console.error)
    })
    .catch(console.error)
  }
  if(boot === 4){
    client.guilds.cache.get('344979212278431754').members.cache.get('798057739049369640').setNickname('/ ' + JSON.stringify(data.eur)+ ' USD')
    .then(function(result){
      client.user.setActivity('30päeva vahe: '+data.d30+'%')
      .then(function(result){
        boot++;
        return;
      })
      .catch(console.error)
    })
    .catch(console.error)
  }
  if(boot === 5){
    client.guilds.cache.get('344979212278431754').members.cache.get('798057739049369640').setNickname('/ ' + sats + ' SATOSHI')
    .then(function(result){
      client.user.setActivity('30päeva vahe: '+data.btc30+'%')
      .then(function(result){
        boot = 0;
        return;
      })
      .catch(console.error)
    })
    .catch(console.error)
  }
}


client.login(token);

module.exports = {
  boot,
  changestatus
} 