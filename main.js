let bootdiscord = require('./functions/btcdiscord.js').boot
const boothivediscord = require('./functions/hivediscord.js').boot
const collectdata = require('./functions/cryptocompare.js').collectdata
const exportdata = require('./functions/cryptocompare.js').exportdata
const changestatus = require('./functions/btcdiscord.js').changestatus

let displaystatus = 1;


function bootscript(){
 setInterval(changedisplay, 30000)//30000
 setInterval(collectdata, 300000)//300000
}

function changedisplay(){

  const data = exportdata()
  if(displaystatus===1){
    changestatus('1päeva vahe: '+data.d1+'%');
    displaystatus = 2;
    return;
  }
  if(displaystatus===2){
    changestatus('7päeva vahe: '+data.d7+'%');
    displaystatus = 3;
    return;
  }
  if(displaystatus===2){
    changestatus('30päeva vahe: '+data.d30+'%');
    displaystatus = 1;
    return;
  }
}

module.exports = {
  bootscript
}