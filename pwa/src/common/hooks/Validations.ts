//@ts-nocheck
import {fa} from '../../i18n/fa-IR';
import {Is} from '../../utils/ValidationTools';
import {useValidatedState} from './ValidatedState';

export const useNationalCode = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_the_national_code};
        }
      },
      str => {
        if (!Is.nationalCode(str)) {
          return {
            error: fa.validations.the_entered_national_code_is_not_correct,
          };
        }
      },
    ],
    disable,
  );
};

export const usePhoneNumber = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_the_mobile_phone_number};
        }
      },
      str => {
        if (!Is.phoneNumber(str)) {
          return {
            error: fa.validations.the_mobile_number_entered_is_not_valid,
          };
        }
      },
    ],
    disable,
  );
};

export const useName = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_name};
        }
      },
      str => {
        if (!Is.name(str)) {
          return {
            error: fa.validations.the_name_entered_is_not_correct,
          };
        }
      },
    ],
    disable,
  );
};

export const useLastName = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_last_name};
        }
      },
      str => {
        if (!Is.name(str)) {
          return {
            error: fa.validations.the_last_name_entered_is_not_correct,
          };
        }
      },
    ],
    disable,
  );
};

export const useFathersName = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_father_s_name};
        }
      },
      str => {
        if (!Is.name(str)) {
          return {
            error: fa.validations.the_entered_father_s_name_is_not_correct,
          };
        }
      },
    ],
    disable,
  );
};

export const useBirthday = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.select_the_date_of_birth};
        }
      },
    ],
    disable,
  );
};

export const useCharge = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_the_charge_amount};
        }
      },
      str => {
        if (!Is.number(str)) {
          return {
            error: fa.validations.the_charge_amount_entered_is_not_valid,
          };
        }
      },
    ],
    disable,
  );
};

export const useAccountSelect = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.select_the_account_number};
        }
      },
    ],
    disable,
  );
};

export const useWithdraw = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_the_withdrawal_amount};
        }
      },
      str => {
        if (!Is.number(str)) {
          return {
            error: fa.validations.the_withdrawal_amount_entered_is_not_valid,
          };
        }
      },
    ],
    disable,
  );
};

export const useSheba = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_the_destination_sheba_number};
        }
      },
      str => {
        if (!Is.sheba(str)) {
          return {
            error: fa.validations.entered_destination_sheba_number_is_not_valid,
          };
        }
      },
    ],
    disable,
  );
};

export const useShebaSelect = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.select_the_destination_account_number};
        }
      },
    ],
    disable,
  );
};

export const useTransfer = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_the_withdrawal_amount};
        }
      },
      str => {
        if (!Is.number(str)) {
          return {
            error: fa.validations.the_withdrawal_amount_entered_is_not_valid,
          };
        }
      },
    ],
    disable,
  );
};

export const useWalletAddress = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_the_destination_wallet_address};
        }
      },
    ],
    disable,
  );
};

export const usePassword = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_your_password};
        }
      },
    ],
    disable,
  );
};

export const useBankUsername = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_your_bank_username};
        }
      },
    ],
    disable,
  );
};

export const useBankPassword = (disable?: boolean) => {
  return useValidatedState(
    '',
    [
      str => {
        if (str?.length === 0) {
          return {error: fa.validations.enter_your_bank_password};
        }
      },
    ],
    disable,
  );
};
