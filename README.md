# BTC-Shuffler
Bitcoin coinshuffling functions based on an asynchronous implementation of the BitcoinJS library, ensuring increased fiscal privacy. It is built entirely in javascript and is designed with interoperability in mind. This template can - and is intended - to be integrated into multiple platforms along with the final wallet software produced by the development team of ARCANE TECHNOLOGIES™.


# Diclaimer - APIs Used
#### This work was made possible and further facilitated via use of the following API services:
API Service       | Homepage URL                                    | API Documentation
----------------- | ----------------------------------------------- | ---------------------------------------------------------
Blockstream     | [blockstream.info](https://blockstream.info/)   | https://github.com/Blockstream/esplora/blob/master/API.md
Blockcypher     | [blockcypher.com](https://www.blockcypher.com/) | https://www.blockcypher.com/dev/bitcoin/
Blockchain.com  | [blockchain.info](https://blockchain.info/)     | https://api.blockchain.com/v3/
SoChain         | [chain.so](https://chain.so/)                   | https://chain.so/api/


# Brief Description
Bitcoin shuffling applies using protocols based on the structure of a "Partially Signed Bitcoin Transaction" (PSBT, for short). Partially Signed Bitcoin Transactions (PSBTs) are a data format that allows wallets to exchange information about a Bitcoin transaction and the signatures necessary to complete it.
This ultimately allows for a joint-transaction between users to take place, obfuscating the relations between spenders and receivers, and providing a degree of privacy in crypto-transactions proportional to the number of participants in it.

For a more detailed explanation, you may read the following articles:
* https://bitcoinexchangeguide.com/bitcoin-improvement-proposal-bip-174-for-partially-signed-bitcoin-transactions-psbt/
* https://river.com/learn/what-are-partially-signed-bitcoin-transactions-psbts/

, or you can even download the bitcoin-core client for a basic wallet, and try it yourself referencing this series of demos:
* https://www.youtube.com/playlist?list=PLOSubGrS2IuY6JEhTqBlqeFHHyti1CJdD

# Technical Documentation
Developers (and all else both interested and technically knowledgeable) are advised to personally examine the original proposals that first conceived and elaborated upon the ideas that are being implemented now in practice:
1. BIP-0174  - https://github.com/bitcoin/bips/blob/master/bip-0174.mediawiki
2. BIP-0370  - https://github.com/bitcoin/bips/blob/master/bip-0370.mediawiki
3. BitcoinJS - https://github.com/bitcoinjs/bitcoinjs-lib
