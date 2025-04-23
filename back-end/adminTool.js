const {decrypt} = require('./utils/cryptOutils')

const toDecrypt= process.argv[2];

const clearText = decrypt(toDecrypt)
console.log(" text decrypté : ",clearText)