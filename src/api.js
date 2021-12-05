// Imports
let axios = require('axios').default

// Settings
const SAT = 10**8; // Satoshis in Bitcoin

// Maincode
class WebAPI {
  constructor(endpoint='main') {
    this.api = 'https://blockstream.info'
    this.end = (endpoint === 'main' ? '/api' : '/testnet/api')
    this.net = endpoint
  }

  // Choose Network(mainnet/testnet)
  NetworkSwitch(net) {
    switch (net) {
      case 'main':
        this.end = "/api";
        break;
      case 'test':
        this.end = "/testnet/api";
        break;
    }
  }

  LastBlockHash() {
    let url = this.api + this.end + "/blocks/tip/hash";
    return new Promise((resolve, reject) => {
      axios.get(url).then(({data}) => resolve(data)).catch(err => reject(err))
    })
  }

  BlockInfo(bhash) {
    let url = this.api + this.end + "/block/" + bhash;
    return new Promise((resolve, reject) => {
      axios.get(url).then(({data}) => {
        resolve({
          bhash: data.id,
          height: data.height,
          timestamp: data.timestamp,
          txno: data.tx_count,
          bsize: data.size,
          prevhash: data.previousblockhash
        })
      }).catch(err => reject(err))
    })
  }

  AddressBalance(address) {
    let url = this.api + this.end + "/address/" + address;
    return new Promise((resolve, reject) => {
      axios.get(url).then(({data}) => {
        let balance = (data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum);
        resolve(balance) // in SAT
      }).catch(err => reject(err))
    })
  }

  LockScript(txhash) {
    let url = this.api + this.end + "/tx/" + txhash
    return new Promise((resolve, reject) => {
      axios.get(url).then(({data}) => {
        let InputsData  = data.vin
        let OutputsData = data.vout
        
        // Lock-Script Array
        resolve([...OutputsData.map(out => out.scriptpubkey_asm)])
      }).catch(err => reject(err))
    })
  }

  AddressUTXO(address) {
    return new Promise((resolve, reject) => {
      let END = (this.end == "/api") ? 'main' : 'test3'
      let URL = `https://api.blockcypher.com/v1/btc/${END}/addrs/${address}?unspentOnly=true&includeScript=true`
      axios.get(URL).then(({data}) => {
        resolve(data.txrefs.map(utxo => {
          return {
            hash: utxo.tx_hash,
            index: utxo.tx_output_n,
            value: utxo.value,
            script: utxo.script
          }
        }))
      }).catch(err => reject(err))
    })
  }
  
  FetchRate() {
    // Query Current Bitcoin Rate in USD
    let url = "https://blockchain.info/ticker";
    return new Promise((resolve, reject) => {
      axios.get(url).then(({data}) => resolve(data.USD.last)).catch(err => reject(err))
    })
  }

  HEXbyID(txid,net) {
    return new Promise((resolve,reject) => {
      let end = (net === "main") ? 'BTC' : 'BTCTEST'
      let url = `https://chain.so/api/v2/get_tx/${end}/${txid}`
      axios.get(url).then(({data}) => resolve(data.data.tx_hex)).catch(err => reject('ERROR: ' + url))
    })
  }

  sendTx(txdata) {
    let net = (this.net === 'test' ? 'BTCTEST' : 'BTC')
    let url = `https://chain.so/api/v2/send_tx/${net}`
    
    return new Promise((resolve, reject) => {
      axios.post(url,{tx_hex: txdata}).then(res => resolve(res.data.txid)).catch(err => reject(err.message))
    })
  }
}

module.exports = WebAPI;