//@ts-nocheck
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {RSAKeychain} from 'rn-crypto-module';
import {
  BigButtonCreateWalletScreenPropsType,
  CreateWalletScreenPropsType,
} from '../Types';
import Assets from '../assets/Assets';
import {Colors} from '../configs/Colors';
import {fa} from '../i18n/fa-IR';
import {useApi} from '../providers/ApiProvider';
import {setCertificate, setPrivateKey} from '../redux/actions/AuthActions';
import {showModal} from '../redux/actions/ModalActions';
import {createWallet, setWalletId} from '../redux/actions/WalletActions';
import {useConfig} from '../redux/selectors/ConfigSelector';
import {useUser} from '../redux/selectors/UserSelector';
import {Screens} from '../rout/types/RootStackTypes';
import {DataSigner} from '../services/DataSigner';
import {
  walletCreateResponseType,
  walletStoreBodyType,
  walletStoreResponseType,
} from '../services/api/ServerTypes';
import {
  customResponsiveHeight,
  customResponsiveWidth,
} from '../utils/CustomResponsive';
import {readUsernamePassword, saveCertificate} from '../utils/SecureInfo';
import ScreenWrapper from './ScreenWrapper';

const Message = () => {
  return (
    <Text style={styles.message}>
      {
        fa.screens.dashboard_new
          .dear_user_you_need_to_create_a_wallet_to_start_working
      }
    </Text>
  );
};

const BigButton = (props: BigButtonCreateWalletScreenPropsType) => {
  return (
    <TouchableOpacity
      activeOpacity={Assets.size.active_opacity}
      style={styles.button}
      {...props}>
      <Text style={styles.buttonText}>
        {fa.screens.dashboard_new.create_a_dedicated_wallet}
      </Text>
    </TouchableOpacity>
  );
};

const CreateWalletScreen = (props: CreateWalletScreenPropsType) => {
  const dispatch = useDispatch();
  const {api} = useApi();
  const {national_code} = useUser();
  const {sign_required} = useConfig();

  const walletCreateMutaion = useMutation({
    mutationFn: async (body: {csr: string}) => {
      return api?.walletCreate(body);
    },
    onSuccess: (data: walletCreateResponseType) => {
      saveCertificate(data?.certificate);
      setCertificate()(dispatch, data?.certificate);
      let params_national_code = props?.route?.params?.national_code;
      let params_mobile = props?.route?.params?.mobile;
      if (params_national_code && params_mobile) {
        if (sign_required) {
          if (data?.certificate) {
            let params_data = {
              mobileNo: params_mobile,
              identificationNumber: params_national_code,
              identificationType: 'nationalCode',
            };
            DataSigner(params_data, data?.certificate).then(signData => {
              walletStoreMutaion.mutate({
                data: signData?.data,
                sign: signData?.sign,
                certificate: signData?.certificate,
                mobile: params_mobile,
                national_code: params_national_code,
              });
            });
          } else {
            dispatch(
              showModal({
                id: 'AlertBox',
                modalProps: {
                  message: fa.client_error.error_creating_wallet,
                },
              }),
            );
          }
        } else {
          walletStoreMutaion.mutate({
            mobile: params_mobile,
            national_code: params_national_code,
          });
        }
      } else {
        readUsernamePassword
          .then((info: {username: string; password: string}) => {
            let storage_mobile = info?.username?.split('-')?.[1];
            let storage_national_code = info?.username?.split('-')?.[0];
            if (sign_required) {
              if (data?.certificate) {
                let storage_data = {
                  mobileNo: storage_mobile,
                  identificationNumber: storage_national_code,
                  identificationType: 'nationalCode',
                };
                DataSigner(storage_data, data?.certificate).then(signData => {
                  walletStoreMutaion.mutate({
                    data: signData?.data,
                    sign: signData?.sign,
                    certificate: signData?.certificate,
                    mobile: storage_mobile,
                    national_code: storage_national_code,
                  });
                });
              } else {
                dispatch(
                  showModal({
                    id: 'AlertBox',
                    modalProps: {
                      message: fa.client_error.error_creating_wallet,
                    },
                  }),
                );
              }
            } else {
              walletStoreMutaion.mutate({
                mobile: storage_mobile,
                national_code: storage_national_code,
              });
            }
          })
          .catch(() => {
            dispatch(
              showModal({
                id: 'AlertBox',
                modalProps: {
                  message: fa.client_error.error_reading_user_information,
                },
              }),
            );
          });
      }
    },
  });

  const walletStoreMutaion = useMutation({
    mutationFn: async (body: walletStoreBodyType) => {
      return api?.walletStore(body);
    },
    onSuccess: (data: walletStoreResponseType) => {
      console.log('data', data);
      createWallet()(dispatch, data);
      setWalletId()(dispatch, data?.wallet_id);
      setPrivateKey()(dispatch);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: Screens.TabScreen}],
        }),
      );
    },
  });

  const generateKeyPair = async (keyTag: string) => {
    let keys = await RSAKeychain.generate(keyTag);

    return keys.public;
  };

  const onCreateButtonPress = () => {
    dispatch(showModal({id: 'Loading'}));
    let keyTag = 'parsiancbdcappprivatekey';
    generateKeyPair(keyTag);
    let params_national_code = props?.route?.params?.national_code;
    if (params_national_code) {
      RSAKeychain.generateCSR(
        keyTag,
        {
          commonName: params_national_code,
          organizationName: 'Parsian',
          organizationUnitName: 'IT',
          countryName: 'IR',
          stateOrProvinceName: 'Tehran',
          localityName: 'Tehran',
        },
        'SHA256withRSA',
      ).then(csr => {
        walletCreateMutaion.mutate({csr: csr.csr});
      });
    } else {
      readUsernamePassword
        .then((info: {username: string; password: string}) => {
          let storage_national_code = info?.username?.split('-')?.[0];
          RSAKeychain.generateCSR(
            keyTag,
            {
              commonName: storage_national_code,
              organizationName: 'Parsian',
              organizationUnitName: 'IT',
              countryName: 'IR',
              stateOrProvinceName: 'Tehran',
              localityName: 'Tehran',
            },
            'SHA256withRSA',
          ).then(csr => {
            walletCreateMutaion.mutate({csr: csr.csr});
          });
        })
        .catch(() => {
          dispatch(
            showModal({
              id: 'AlertBox',
              modalProps: {
                message: fa.client_error.error_reading_user_information,
              },
            }),
          );
        });
    }
  };

  return (
    <ScreenWrapper
      screen_style={styles.areaContainer}
      navigation={props.navigation}>
      <Assets.svg.pattern_1
        height={customResponsiveHeight(32)}
        width={customResponsiveHeight(32)}
        style={styles.pattern1}
      />
      <Assets.svg.pattern_2
        height={customResponsiveHeight(30)}
        width={customResponsiveHeight(30)}
        style={styles.pattern2}
      />
      <Assets.svg.pattern_3
        height={customResponsiveHeight(20)}
        width={customResponsiveHeight(20)}
        style={styles.pattern3}
      />
      <Message />
      <BigButton onPress={onCreateButtonPress} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontFamily: Assets.font.regular,
    fontSize: Assets.font.h6,
    color: Colors.alt_bg,
    marginHorizontal: Assets.size.horizontal_1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.secondary,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: Assets.size.horizontal_1,
    paddingVertical: Assets.size.vertical_1,
    borderRadius: 1.2 * Assets.size.border_1,
    marginTop: Assets.size.vertical_1,
  },
  buttonText: {
    fontFamily: Assets.font.bold,
    fontSize: Assets.font.h3,
    color: Colors.alt_bg,
  },
  pattern1: {
    position: 'absolute',
    top: customResponsiveHeight(5),
    right: -customResponsiveWidth(2),
  },
  pattern2: {
    position: 'absolute',
    bottom: -customResponsiveHeight(1),
    left: -customResponsiveWidth(1),
  },
  pattern3: {
    position: 'absolute',
    bottom: customResponsiveHeight(8),
    right: -customResponsiveWidth(8),
  },
});

export default CreateWalletScreen;

// signs a certificate using SHA-256 instead of SHA-1
// cert.sign(privateKey, forge.md.sha256.create());
