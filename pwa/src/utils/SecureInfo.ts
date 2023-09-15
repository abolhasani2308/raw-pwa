//@ts-nocheck
import * as Keychain from 'react-native-keychain';
import {UserInfoType} from '../services/api/ServerTypes';
import EncryptedStorage from 'react-native-encrypted-storage';
var CryptoJS = require('crypto-js');

export const saveUsernamePassword = async (
  username: string,
  password: string,
) => {
  try {
    var cipherUsername = CryptoJS.AES.encrypt(username, 'Username').toString();
    var cipherPassword = CryptoJS.AES.encrypt(password, 'Password').toString();
    await Keychain.setGenericPassword(cipherUsername, cipherPassword);
    console.log('Username & Password saved successfully.');
  } catch (error) {
    console.log(`Error saving username & password: ${error}`);
  }
};

export const readUsernamePassword = new Promise(async (resolve, reject) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      //username
      console.log(credentials?.username);
      var decodedUsername = CryptoJS.AES.decrypt(
        credentials?.username,
        'Username',
      );
      var originalUsername = decodedUsername.toString(CryptoJS.enc.Utf8);
      //password
      console.log(credentials?.password);
      var decodedPassword = CryptoJS.AES.decrypt(
        credentials?.password,
        'Password',
      );
      var originalPassword = decodedPassword.toString(CryptoJS.enc.Utf8);

      resolve({
        username: originalUsername,
        password: originalPassword,
      });

      console.log(originalUsername, originalPassword);
    } else {
      reject(null);
    }
  } catch (error) {
    console.log(`Error reading username: ${error}`);
    reject(error);
  }
});

export const saveUserInfo = async (user: UserInfoType) => {
  let stringUser = JSON.stringify(user);
  EncryptedStorage.setItem('USER', stringUser)
    .then(() => {
      console.log('User info saved successfully.');
    })
    .catch(error => {
      console.log(`Error saving user info: ${error}`);
    });
};

export const readUserInfo = new Promise(async (resolve, reject) => {
  try {
    const stringUser = await EncryptedStorage.getItem('USER');
    if (stringUser) {
      let objectUser = JSON.parse(stringUser);
      resolve(objectUser);
      console.log(objectUser);
    } else {
      reject(null);
    }
  } catch (error) {
    console.log(`Error reading user info: ${error}`);
    reject(error);
  }
});

export const saveCertificate = async (certificate: string) => {
  var cipherCertificate = CryptoJS.AES.encrypt(
    certificate,
    'Certificate',
  ).toString();
  EncryptedStorage.setItem('CERTIFICATE', cipherCertificate)
    .then(() => {
      console.log('Certificate saved successfully.');
    })
    .catch(error => {
      console.log(`Error saving Certificate: ${error}`);
    });
};

export const readCertificate = new Promise(async (resolve, reject) => {
  EncryptedStorage.getItem('CERTIFICATE')
    .then((certificate: String | undefined | null) => {
      if (certificate) {
        var decodedCertificate = CryptoJS.AES.decrypt(
          certificate,
          'Certificate',
        );
        var originalCertificate = decodedCertificate.toString(
          CryptoJS.enc.Utf8,
        );
        resolve(originalCertificate);
      } else {
        reject(null);
      }
    })
    .catch(error => {
      reject(error);
      console.log(`Error reading certificate: ${error}`);
    });
});
