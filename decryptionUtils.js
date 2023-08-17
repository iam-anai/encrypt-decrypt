const fs = require('fs').promises;

async function readEncryptedFile(filePath) {
  try {
    const encryptedText = await fs.readFile(filePath, 'utf8');
    return encryptedText;
  } catch (err) {
    throw new Error(`Error reading file: ${err}`);
  }
}

module.exports = { readEncryptedFile };
