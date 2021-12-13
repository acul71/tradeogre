import axios from 'axios'

const formatPrice = (price, currency='USD') => {
  const [symbol, prec] = formatCurrency(currency) 
  return symbol + parseFloat(Number(price).toFixed(prec))
}

const formatCurrency = (currency) => {
  let symbol = ''
  let prec = 2
  switch (currency) {
    case 'USD':
      symbol = '$'
      prec = 2
      break
    case 'BTC':
      symbol = 'BTC '
      prec = 10
      break
    default:
      break
  }
  return [symbol, prec]
}

// curl https://api.covalenthq.com/v1/1/block/latest/ -u ckey_fc95e1ea34744fc98d7e55e55eb:
/*
const getBTC = (cur = 'USD') => {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=' + cur)
  .then(res => {
      console.log('getBTC: res=', res)
      let cryptos = 0
      try {
        cryptos = res.data.BTC.USD
      }
      catch {
        cryptos = 0
      }
      return cryptos

  })
  .catch(err => {
    console.log(err)
  })
}
*/

async function getBTC(cur = 'USD') {
  const res = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=' + cur)
  console.log('getBTC: res=', res)
  let cryptos = 0
  try {
    cryptos = res.data.BTC.USD
  }
  catch {
    cryptos = 0
  }
  return cryptos
}

const passwordExists = () => {
  const password = localStorage.getItem("password")
  console.log("password=", password)
  return password != null
}


export {formatPrice, formatCurrency, getBTC, passwordExists}

/*
const os = require('os')
//const fs = require('fs-extra')
const fs = require('fs')
const path = require('path')

const CONFIG_DIR = path.join(os.homedir(), '.tradeogre')
console.log('CONFIG_DIR='.CONFIG_DIR)

// Create config dir
function tradeOgreInit() {
  try {
    fs.mkdirSync(CONFIG_DIR)
  } catch(err) {
    console.error(err)
  }
  
}

// Check if password file exists
function checkPasswordFile(fileName = path.join(CONFIG_DIR, 'password')) {
  try {
    return fs.existsSync(fileName)
  } catch(err) {
    console.error(err)
  }
}
*/

/*
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
let config = { 
    val1: "test",
    val2: "2",
    val3: true
}
console.log(config)
const myJSON = JSON.stringify(config);
const encryptedString = cryptr.encrypt(myJSON);
const decryptedString = cryptr.decrypt(encryptedString);
 
console.log(encryptedString);  
console.log(decryptedString); 
config = JSON.parse(decryptedString)
console.log(config)


*/

/*
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(15);
var hash = bcrypt.hashSync("passtest", salt);
comp1 = bcrypt.compareSync("passtest", hash); // true
comp2 = bcrypt.compareSync("not_bacon", hash); // false
console.log('hash=', hash, 'comp1=', comp1, 'comp2=', comp2)
*/

/*
var taiPasswordStrength = require("tai-password-strength")
var strengthTester = new taiPasswordStrength.PasswordStrength();
var results = strengthTester.check("abcd1234");
console.log("results=",results)
// Add in extra files for additional checks and better results
strengthTester.addCommonPasswords(taiPasswordStrength.commonPasswords);
strengthTester.addTrigraphMap(taiPasswordStrength.trigraphs);
var betterResults = strengthTester.check("abcd1234");
console.log("betterResults=",betterResults)
if (betterResults.strengthCode.indexOf('WEAK') >= 0) {
    throw new Error("Your password is too weak");
}
*/


//export { checkPasswordFile, tradeOgreInit }