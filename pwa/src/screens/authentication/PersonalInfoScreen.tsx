//@ts-nocheck
import {CommonActions} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  AuthScreenWithFillButtonPropsType,
  BaseAuthScreenPropsType,
} from '../../Types';
import Assets from '../../assets/Assets';
import {
  useBirthday,
  useFathersName,
  useLastName,
  useName,
} from '../../common/hooks/Validations';
import AuthField from '../../components/fields/AuthField';
import DateField from '../../components/fields/DateField';
import {fa} from '../../i18n/fa-IR';
import {Screens} from '../../rout/types/RootStackTypes';
import AuthScreenWithFillButton from './AuthScreenWithFillButton';
import NetworkChecker, {netAlert} from '../../services/NetworkChecker';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';
import {useApi} from '../../providers/ApiProvider';
import {showModal} from '../../redux/actions/ModalActions';
import {
  RegisterBodyType,
  RegisterResponseType,
} from '../../services/api/ServerTypes';

const PersonalInfoScreen = (
  props: BaseAuthScreenPropsType & AuthScreenWithFillButtonPropsType,
) => {
  const {api} = useApi();
  const dispatch = useDispatch();
  const [validationEnabled, setValidationEnabled] = useState(false);
  const refNameInput = useRef(null);
  const refLastNameInput = useRef(null);
  const refFathersNameInput = useRef(null);
  const refBirthdayInput = useRef(null);
  const {
    value: name,
    setValue: setName,
    result: nameValidation,
    checkError: checkErrorName,
  } = useName(!validationEnabled);
  const {
    value: last_name,
    setValue: setLastName,
    result: lastNameValidation,
    checkError: checkErrorLastName,
  } = useLastName(!validationEnabled);
  const {
    value: father_name,
    setValue: setFathersName,
    result: fathersNameValidation,
    checkError: checkErrorFathersName,
  } = useFathersName(!validationEnabled);
  const {
    value: birthday,
    setValue: setBirthday,
    result: birthdayValidation,
    checkError: checkErrorBirthday,
  } = useBirthday(!validationEnabled);

  const submitMutaion = useMutation({
    mutationFn: async (body: RegisterBodyType) => {
      dispatch(showModal({id: 'Loading'}));
      return api?.register(body);
    },
    onSuccess: (data: RegisterResponseType) => {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: Screens.PINCodeScreen,
              params: {
                national_code: data?.user?.national_code,
                mobile: props?.route?.params?.mobile,
                user: data?.user,
                token: data?.token,
              },
            },
          ],
        }),
      );
      dispatch(
        showModal({
          id: 'Toast',
          modalProps: {
            message: data?.message,
          },
        }),
      );
    },
  });

  const onSubmitPress = () => {
    if (
      checkErrorName() ||
      checkErrorLastName() ||
      checkErrorFathersName() ||
      checkErrorBirthday()
    ) {
      setValidationEnabled(true);
    } else {
      NetworkChecker({
        onConnected: () => {
          submitMutaion.mutate({
            national_code: props?.route?.params?.national_code,
            name: name,
            last_name: last_name,
            father_name: father_name,
            birthday: birthday,
            mobile: props?.route?.params?.mobile,
          });
        },
        onDisConnected: () => {
          dispatch(netAlert);
        },
      });
    }
  };

  return (
    <AuthScreenWithFillButton
      screen_title={fa.screens.personal_info.personal_information}
      fill_button_title={fa.screens.personal_info.submit_information}
      on_fill_button_press={onSubmitPress}
      render_card_inside={
        <>
          <AuthField
            ref={refNameInput}
            label={fa.screens.personal_info.name}
            placeholder={
              fa.placeholder.according_to_the_national_card_information
            }
            icon={Assets.svg.user}
            textAlign={'right'}
            container_style={styles.firstInput}
            state={validationEnabled && checkErrorName() ? 'error' : 'normal'}
            value={name}
            onChangeText={setName}
            error={nameValidation.error}
            onSubmitEditing={() => {
              refLastNameInput.current.focus();
            }}
            returnKeyType="next"
          />
          <AuthField
            ref={refLastNameInput}
            label={fa.screens.personal_info.last_name}
            placeholder={
              fa.placeholder.according_to_the_national_card_information
            }
            icon={Assets.svg.user}
            textAlign={'right'}
            container_style={styles.nextInputs}
            state={
              validationEnabled && checkErrorLastName() ? 'error' : 'normal'
            }
            value={last_name}
            onChangeText={setLastName}
            error={lastNameValidation.error}
            onSubmitEditing={() => {
              refFathersNameInput.current.focus();
            }}
            returnKeyType="next"
          />
          <AuthField
            ref={refFathersNameInput}
            label={fa.screens.personal_info.father_s_name}
            placeholder={
              fa.placeholder.according_to_the_national_card_information
            }
            icon={Assets.svg.father}
            textAlign={'right'}
            container_style={styles.nextInputs}
            state={
              validationEnabled && checkErrorFathersName() ? 'error' : 'normal'
            }
            value={father_name}
            onChangeText={setFathersName}
            error={fathersNameValidation.error}
            onSubmitEditing={refBirthdayInput?.current?.focusPicker}
            returnKeyType="next"
          />
          <DateField
            ref={refBirthdayInput}
            label={fa.screens.personal_info.date_of_birth}
            placeholder={fa.placeholder.date_of_birth}
            value={birthday}
            icon={Assets.svg.birthday}
            textAlign={'right'}
            container_style={styles.lastInput}
            state={
              validationEnabled && checkErrorBirthday() ? 'error' : 'normal'
            }
            error={birthdayValidation.error}
            onSelectDate={(d, m, y) => {
              setBirthday(`${y}/${m}/${d}`);
            }}
            disabled={false}
          />
        </>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  firstInput: {
    marginTop: 1.5 * Assets.size.vertical_1,
  },
  nextInputs: {
    marginTop: Assets.size.vertical_2,
  },
  lastInput: {
    marginTop: Assets.size.vertical_2,
    marginBottom: Assets.size.vertical_1,
  },
});

export default PersonalInfoScreen;
