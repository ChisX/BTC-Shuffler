// Imports
const bitcoin = require('bitcoinjs-lib')
const webapi  = require('./api')
const getUTXO = require('coinselect')

// Settings
  // Customized Console Appearance(no functional role)
const log = require('../log')
  // First-Letter Prefix of Address by Network
const address_prefix = {'main': ['1'],'test': ['m','n'],'regt': ['m','n']}
  // Number of Satoshi/BTC
const SAT = 10**8
let API

// Maincode
class BitcoinWallet {
  constructor(net,prk=false) {
    this.net = net
    this.prk = prk
    this.api = new webapi(net)
  }

  genWallet(importKey=this.prk) {
    // PRELIMINARY STEP: Select Network
    let network,account
    switch (this.net) {
      case 'main':
        network = bitcoin.networks.bitcoin
        break
      case 'test':
        network = bitcoin.networks.testnet
        break
      case 'regt':
        network = bitcoin.networks.regtest
        break
      default:
        return `ERROR: Invalid Network. Select main/test/regtest)`;
        break
    }
  
    return new Promise((resolve,reject) => {
      // Import or Generate Account
      if (importKey) {
        try { account = bitcoin.ECPair.fromWIF(importKey,network) } catch(err) {
          reject(`ERROR: Invalid Key Format [${err.message}]`)
        }
      } else { account = bitcoin.ECPair.makeRandom({network}) }
  
      // Exact Address & Private Key from Account
      let Address = bitcoin.payments.p2pkh({pubkey: account.publicKey,network}).address
      let PrivKey = account.toWIF()
      let Result  = {PrivKey,Address}
  
      // Check for Errors and Resolve
      checkAddress(resolve,reject,this.net,Result)
    })
  }

  formatUTXO(utxo,net=this.net) {
    return new Promise((resolve,reject) => {
      (new webapi(net)).HEXbyID(utxo.hash).then((txhex) => resolve({
        hash: utxo.hash,
        index: utxo.index,
        value: utxo.value,
        nonWitnessUtxo: Buffer.from(txhex,'hex')
      })).catch(err => reject(err.message))
    })
  }
}

// Helper Functions
function checkAddress(resolve,reject,net,candidate) {
  if (!address_prefix[net].includes(candidate.Address.slice(0,1))) {
    reject('ERROR: Invalid Address Format')
  } else { resolve(candidate) }
}

function compareJSON(obj1,obj2) {
  return (JSON.stringify(obj1) === JSON.stringify(obj2));
}


// Exports
module.exports = BitcoinWallet