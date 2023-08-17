AES Encryption/Decryption Tool

This is a simple command-line tool for encrypting and decrypting text using AES-256 encryption.

Usage Instructions:

1. Clone the repository or download the source code.
2. Open a terminal or command prompt.
3. Navigate to the directory where the source code is located.

To Encrypt:

1. Run the application by typing the following command:
   node main.js

2. You will be prompted to choose whether you want to encrypt or decrypt (Default: encrypt).
3. Choose "e" to encrypt.

4. You will be prompted to choose whether you want to input text or read from a file (Default: input text).
5. Choose "i" to input text.

6. Enter the text you want to encrypt.

7. Enter the desired name for the encrypted file (without extension).

8. Optionally, enter a secret salt for encryption (press Enter for no salt).

9. The encrypted text will be displayed in the console.

To Decrypt:

1. Run the application by typing the following command:
   node main.js

2. You will be prompted to choose whether you want to encrypt or decrypt (Default: encrypt).
3. Choose "d" to decrypt.

4. The application will automatically read the encrypted text from the file named "encrypted.txt".

5. Optionally, enter a secret salt for decryption (press Enter for no salt).

6. The decrypted text will be displayed in the console.

7. You will be asked if you want to export the decrypted text to a file (Default: no).
8. Choose "y" to export the decrypted text to a file.

9. A file named "decrypted-[timestamp].txt" will be created in the same directory.

Dependencies:

- Node.js (https://nodejs.org/)

Contributing:

Contributions are welcome! If you find any issues or want to add new features, please submit a pull request.

License:

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
