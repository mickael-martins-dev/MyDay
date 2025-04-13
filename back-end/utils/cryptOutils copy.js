const crypto = require('crypto');
require('dotenv').config(); // pour charger le .env

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.SECRET_KEY, 'hex');

function encrypt(text) {
  // console.log("text encrypt : ",text)
  if (typeof text === 'number')
    text=text.toString()  
  if (typeof text === 'boolean')
    text=text.toString() 
  if (!text || typeof text !== 'string') return '';
    
  const iv = crypto.randomBytes(16); // IV de 16 octets
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  console.log("text ",text)
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // console.log("iv.toString('hex') + ':' + encrypted; ",iv.toString('hex') + ':' + encrypted)
  return iv.toString('hex') + ':' + encrypted; // On renvoie IV + data
}

// function decrypt(encryptedText) {
//   if (!encryptedText || typeof encryptedText !== 'string') return '';
//   console.log("--------------")
//   console.log("encryptedText : ",encryptedText)
//   console.log("--------------")

//   const [ivHex, data] = encryptedText.split(':');
//   const iv = Buffer.from(ivHex, 'hex');
//   const decipher = crypto.createDecipheriv(algorithm, key, iv);

//   let decrypted = decipher.update(data, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');

//   if (typeof  decrypted === 'string' && /^[0-9]+$/.test( decrypted)) {
//     // La chaîne est composée uniquement de chiffres, donc c'est un "number" en format string
//     decrypted = parseInt( decrypted, 10); // Convertir en nombre
// }
// if (typeof  decrypted === 'string' && (decrypted==="false" ||decrypted==="true")) {
//   console.log("dans la condition decryptage convertion bool")
//     decrypted = decrypted === "true";
// }

//   return decrypted;
// }

function decrypt(encryptedText) {

  // console.log("encryptedText ",encryptedText)

  if (!encryptedText || typeof encryptedText !== 'string') return '';

  const [ivHex, data] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  console.log("decrytped dans fonction decrypt ", decrypted)
  // D'abord les booléens
  if (decrypted === "true") decrypted = true;
  if (decrypted === "false") decrypted = false;
  console.log("decrytped dans fonction decrypt apres passage bool", decrypted)
  console.log("type of ---------  decrytped dans fonction decrypt apres passage bool", typeof decrypted)

  // Puis les nombres entiers
  if (/^-?\d+$/.test(decrypted)) {
    return parseInt(decrypted, 10);
  }
  return decrypted;
}

module.exports = { encrypt, decrypt };
