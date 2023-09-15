//@ts-nocheck
export interface Res<T> {
  data: T;
  error?: boolean;
  message?: string;
}

export interface RegisterResponseType {}
export interface RegisterBodyType {
  name: string;
  last_name: string;
  email?: string;
  mobile: string;
  national_code: string;
  father_name: string;
  customer_number?: string;
  is_parsian: boolean;
  avatar_url?: string;
}

export interface OTPCreateResponseType {
  expire_time?: string;
}
export interface OTPCreateBodyType {
  national_code?: string;
  mobile?: string;
}

export interface OTPUpdateResponseType {}
export interface OTPUpdateBodyType {
  mobile?: string;
  otp?: string;
  national_code?: string;
}
export interface LoginResponseType {
  token: string;
  user: {
    name: string;
    last_name: string;
    email?: string;
    mobile: string;
    national_code: string;
    father_name: string;
    customer_number?: string;
    is_parsian: boolean;
    avatar_url?: string;
  };
}
export interface LoginBodyType {
  mobile?: string;
  national_code?: string;
}

export interface getUserWalletBodyType {
  data?: string;
  sign?: string;
  certificate?: string;
}
export interface getUserWalletResponseType {
  has_wallet: boolean;
  wallet: {
    wallet_id: string;
    amount: number | string;
    state: 'NORMAL' | 'BAN' | 'INACTIVE';
    type: 'CUSTOMER' | 'CUSTOMER_ELEVATED' | 'BUSINESS' | 'BANK';
    qr_code: string;
  } | null;
}
export interface walletCreateResponseType {
  certificate: string;
}
export interface walletCreateBodyType {
  csr: string;
}

export interface walletStoreResponseType {
  wallet_id: string;
  amount: number | string;
  state: 'NORMAL' | 'BAN' | 'INACTIVE';
  type: 'CUSTOMER' | 'CUSTOMER_ELEVATED' | 'BUSINESS' | 'BANK';
  qr_code: string;
}

export interface walletStoreBodyType {
  mobile?: string;
  national_code?: string;
  data?: string;
  certificate?: string;
  sign?: string;
}

export interface transactionsBodyType {
  type: 'WITHDRAW' | 'CHARGE' | 'DEPOSIT' | '';
  page: number;
}
export interface transactionsIndexResponseType {
  group_type: 'out' | 'in';
  type: string;
  amount: number;
  amount_formatted: string;
  ago: string;
  from: string;
  from_title: string;
  to: string;
  to_title: string;
}
export interface transactionsIndexTotalResponseType {
  data: {
    group_type: 'out' | 'in';
    type: string;
    amount: number;
    amount_formatted: string;
    ago: string;
    from: string;
    from_title: string;
    to: string;
    to_title: string;
  }[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string | null;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface UserInfoType {
  name: string;
  last_name: string;
  email?: string;
  mobile: string;
  national_code: string;
  father_name: string;
  customer_number?: string;
  is_parsian: boolean;
  avatar_url?: string;
}

export interface withdrawCreateResponseType {
  data: {
    number: string;
    sheba: string;
  }[];
}
export interface withdrawCreateResponseType {
  data: {
    number: string;
    sheba: string;
  }[];
}
export interface withdrawStoreBodyType {
  amount?: string;
  deposit_number?: string;
  description?: string;
  withdraw_data?: string;
  withdraw_sign?: string;
  refund_data?: string;
  refund_sign?: string;
  certificate?: string;
}
export interface withdrawStoreResponseType {
  success: boolean;
  message: string;
  transaction: {
    group_type: 'out' | 'in';
    type: string;
    amount: number;
    amount_formatted: string;
    ago: string;
    from: string;
    from_title: string;
    to: string;
    to_title: string;
  };
}

export interface chargeCreateResponseType {
  data: {
    number: string;
    sheba: string;
  }[];
}
export interface chargeStoreBodyType {
  amount?: string;
  deposit_number?: string;
  data?: string;
  sign?: string;
  certificate?: string;
}
export interface chargeStoreResponseType {
  success: boolean;
  message: string;
  transaction: {
    group_type: 'out' | 'in';
    type: string;
    amount: number;
    amount_formatted: string;
    ago: string;
    from: string;
    from_title: string;
    to: string;
    to_title: string;
  };
}

export interface transferBodyType {
  amount?: string;
  wallet_id?: string;
  data?: string;
  sign?: string;
  certificate?: string;
}
export interface transferResponseType {
  success: boolean;
  message: string;
  transaction: {
    group_type: 'out' | 'in';
    type: string;
    amount: number;
    amount_formatted: string;
    ago: string;
    from: string;
    from_title: string;
    to: string;
    to_title: string;
  };
}

export interface splashResponseType {
  sign_required: boolean;
  bank_wallet_id: string;
}
export interface logoutResponseType {}

export interface bankOTPCreateResponseType {
  expire_time: string;
  receiver: string;
}
export interface bankOTPCreateBodyType {
  username?: string;
  password?: string;
}
export interface bankOTPUpdateResponseType {}
export interface bankOTPUpdateBodyType {
  username?: string;
  otp?: string;
}

export interface getTransferInfoResponseType {
  data: {
    key: string;
    value: string;
  }[];
}

export interface getTransferInfoBodyType {
  wallet_id: string;
}
