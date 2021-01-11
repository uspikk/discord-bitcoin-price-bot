const Discord = require('discord.js');
const client = new Discord.Client();
var boot;

const token = require('../config.js').config.btcdiscordtoken

client.on('ready', () => {
  const bootscript = require('../main.js').bootscript
  console.log(`Logged in as ${client.user.tag}!`);
  bootscript()
  function changename(){
    const getdata = require('./cryptocompare.js').exportdata
    const data = getdata()
    client.guilds.cache.get('344979212278431754').members.cache.get('796480631060037642').setNickname(JSON.stringify(data.eur)+ ' USD');
  }
  setInterval(changename, 60000)
  client.user.setStatus('idle')
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
})

function changestatus(newstatus){
  console.log(newstatus)
  client.user.setActivity(newstatus);
  console.log('done')
}



client.login(token);

module.exports = {
  boot,
  changestatus
} 