const readline = require('readline');
const fs = require('fs').promises;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const { encrypt, decrypt, writeEncryptedFile } = require('./encryptionUtils');
const { readEncryptedFile } = require('./decryptionUtils');

(async () => {
  try {
    const action = await new Promise((resolve) => {
      rl.question('Do you want to encrypt (e) or decrypt (d)? (Default: e) ', (input) => {
        resolve(input || 'e');
      });
    });

    if (action === 'e') {
      const inputChoice = await new Promise((resolve) => {
        rl.question('Do you want to input text (i) or read from a file (f)? (Default: i) ', (input) => {
          resolve(input || 'i');
        });
      });

      let text;
      if (inputChoice === 'i') {
        text = await new Promise((resolve) => {
          rl.question('Enter your text to encrypt: ', resolve);
        });
      } else if (inputChoice === 'f') {
        try {
          text = await fs.readFile('text.txt', 'utf8');
        } catch (err) {
          console.error(`Error reading file: ${err}`);
          rl.close();
          return;
        }
      } else {
        console.log('Invalid option. Please enter "i" to input text or "f" to read from a file.');
        rl.close();
        return;
      }

      const fileName = await new Promise((resolve) => {
        rl.question('Enter the desired name for the encrypted file (without extension): (Default: encrypted-aes-timestamp) ', (input) => {
          resolve(input || `encrypted-aes-${Date.now()}`);
        });
      });

      const salt = await new Promise((resolve) => {
        rl.question('Enter your secret salt (press Enter for no salt): ', (input) => {
          resolve(input || '');
        });
      });

      const encryptedData = encrypt(text, salt);
      console.log('Encrypted text: ', encryptedData);

      await writeEncryptedFile(fileName, encryptedData);

    } else if (action === 'd') {
      let encryptedText;
      try {
        encryptedText = await fs.readFile('encrypted.txt', 'utf8');
      } catch (err) {
        console.error(`Error reading file: ${err}`);
        rl.close();
        return;
      }

      const salt = await new Promise((resolve) => {
        rl.question('Enter your secret salt for decryption (press Enter for no salt): ', (input) => {
          resolve(input || '');
        });
      });

      const decryptedData = decrypt(encryptedText, salt);
      console.log('Decrypted text: ', decryptedData);

      const exportChoice = await new Promise((resolve) => {
        rl.question('Do you want to export the decrypted text to a file (y/n)? ', resolve);
      });

      if (exportChoice.toLowerCase() === 'y') {
        const now = new Date();
        const timestamp = `${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
        const fileName = `decrypted-${timestamp}`;
        try {
          await fs.writeFile(`${fileName}.txt`, decryptedData);
          console.log(`Decrypted data written to ${fileName}.txt`);
        } catch (err) {
          console.error(`Error writing file: ${err}`);
        }
      }

    } else {
      console.log('Invalid option. Please enter "e" to encrypt or "d" to decrypt.');
    }
    rl.close();
  } catch (error) {
    console.error('An error occurred:', error);
    rl.close();
  }
})();
