//@ts-nocheck
import {AxiosInstance, AxiosResponse} from 'axios';
import {
  OTPCreateBodyType,
  OTPCreateResponseType,
  OTPUpdateBodyType,
  OTPUpdateResponseType,
  RegisterBodyType,
  RegisterResponseType,
  Res,
  bankOTPCreateBodyType,
  bankOTPCreateResponseType,
  getTransferInfoBodyType,
  getTransferInfoResponseType,
  getUserWalletBodyType,
  getUserWalletResponseType,
  splashResponseType,
  transactionsBodyType,
  transactionsIndexResponseType,
  transferBodyType,
  transferResponseType,
  walletCreateBodyType,
  walletCreateResponseType,
  walletStoreBodyType,
  walletStoreResponseType,
  withdrawCreateResponseType,
  withdrawStoreBodyType,
  withdrawStoreResponseType,
} from './ServerTypes';

type Query = (p: any) => PromiseLike<any> | void;
type ApiType = {
  [key: string]: ApiType | Query;
};

const format = <T extends ApiType>(input: T) => input as T;

export const createApi = (axios: AxiosInstance) => {
  return format({
    async otpCreate(p?: OTPCreateBodyType) {
      const res = await axios.post('/login/otp', p);
      return handle<OTPCreateResponseType>(res);
    },
    async otpUpdate(p?: OTPUpdateBodyType) {
      const res = await axios.post('/login', p);
      return handle<OTPUpdateResponseType>(res);
    },
    async register(p?: RegisterBodyType) {
      const res = await axios.post('/register', p);
      return handle<RegisterResponseType>(res);
    },
    async getUserWallet(p?: getUserWalletBodyType) {
      const res = await axios.post('/user/wallet', p);
      return handle<getUserWalletResponseType>(res);
    },
    async walletCreate(p?: walletCreateBodyType) {
      const res = await axios.post('/wallets/create', p);
      return handle<walletCreateResponseType>(res);
    },
    async walletStore(p?: walletStoreBodyType) {
      const res = await axios.post('/wallets', p);
      return handle<walletStoreResponseType>(res);
    },
    async transactionsIndex(p?: transactionsBodyType) {
      const res = await axios.get(
        `/transactions?type=${p?.type}&page=${p?.page}`,
      );
      return handle<transactionsIndexResponseType>(res);
    },
    async withdrawCreate() {
      const res = await axios.get('/withdraw/create');
      return handle<withdrawCreateResponseType>(res);
    },
    async withdrawStore(p?: withdrawStoreBodyType) {
      const res = await axios.post('/withdraw', p);
      return handle<withdrawStoreResponseType>(res);
    },
    async chargeCreate() {
      const res = await axios.get('/charge/create');
      return handle<withdrawCreateResponseType>(res);
    },
    async chargeStore(p?: withdrawStoreBodyType) {
      const res = await axios.post('/charge', p);
      return handle<withdrawStoreResponseType>(res);
    },
    async transfer(p?: transferBodyType) {
      const res = await axios.post('/transfer', p);
      return handle<transferResponseType>(res);
    },
    async checkSign(p) {
      const res = await axios.post('/check-sign', p);
      return handle(res);
    },
    async splash() {
      const res = await axios.get('/splash');
      return handle<splashResponseType>(res);
    },
    async logout() {
      const res = await axios.get('/logout');
      return handle<splashResponseType>(res);
    },
    async bankOtpCreate(p?: bankOTPCreateBodyType) {
      const res = await axios.post('/bank/login/otp', p);
      return handle<bankOTPCreateResponseType>(res);
    },
    async bankOtpUpdate(p?: bankOTPCreateBodyType) {
      const res = await axios.post('/bank/login', p);
      return handle<bankOTPCreateResponseType>(res);
    },
    async getTransferInfo(p?: getTransferInfoBodyType) {
      const res = await axios.get(`/wallets/${p?.wallet_id}`);
      return handle<getTransferInfoResponseType>(res);
    },
  });
};

function handle<T>(res: AxiosResponse<Res<T>>) {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  }
  throw res.data;
}
