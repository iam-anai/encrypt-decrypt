const crypto = require('crypto');
const fs = require('fs').promises;

const algorithm = 'aes-256-ctr';

function generateKey(salt) {
  return crypto.createHash('sha256').update(String(salt)).digest('base64').substr(0, 32);
}

function encrypt(text, salt) {
  const key = generateKey(salt);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text, salt) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = textParts.join(':');
  const key = generateKey(salt);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

async function writeEncryptedFile(fileName, encryptedData) {
  try {
    await fs.writeFile(`${fileName}.txt`, encryptedData);
    console.log(`Encrypted data written to ${fileName}.txt`);
  } catch (err) {
    console.error(`Error writing file: ${err}`);
  }
}

module.exports = { encrypt, decrypt, writeEncryptedFile };
