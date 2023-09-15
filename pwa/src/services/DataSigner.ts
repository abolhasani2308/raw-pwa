//@ts-nocheck
import {RSAKeychain} from 'rn-crypto-module';

export const DataSigner = (data: any, certificate: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      let keyTag = 'parsiancbdcappprivatekey';
      let string_data = JSON.stringify(data);
      let sign = await RSAKeychain.signWithAlgorithm(
        string_data,
        keyTag,
        'SHA256withRSA',
      );
      sign = sign.replace(/[\r\n]/gm, '');
      let _certificate = certificate.replace(/[\r\n]/gm, '');
      resolve({
        data: string_data,
        sign: sign,
        certificate: _certificate,
      });
    } catch {
      reject(null);
    }
  });
};
