//@ts-nocheck
import React, {
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {StyleSheet, View} from 'react-native';

export interface ActionType {
  id: string;
  visible?: boolean;
  component?: ReactNode;
}

export interface ContextType {
  push(modal: ActionType): void;
  remove(id: string): void;
  update(modal: ActionType): void;
}

export interface ModalState extends Array<ActionType> {}

let MODAL_ID_REGISTRY = 1;

export const Portal = (props: PropsWithChildren<{visible?: boolean}>) => {
  const {push, remove, update} = useModal();
  const [currentModal] = useState(() => String(MODAL_ID_REGISTRY++));

  useEffect(() => {
    push({id: currentModal, visible: props.visible, component: props.children});
    return () => remove(currentModal);
  }, []);

  useEffect(() => {
    update({
      id: currentModal,
      visible: props.visible,
      component: props.children,
    });
  }, [props.children, props.visible]);

  return null;
};

const ModalContext = React.createContext<ContextType>({
  push() {},
  remove() {},
  update() {},
});

export const ModalProvider = (props: PropsWithChildren<any>) => {
  const [modals, dispatch] = useReducer((state: ModalState, action: any) => {
    switch (action.type) {
      case 'PUSH': {
        const array = [...state];
        array.push(action.payload);
        return array;
      }
      case 'REMOVE': {
        const array = [...state];
        const index = array.findIndex(item => item.id === action.payload.id);
        array.splice(index, 1);
        return array;
      }
      case 'UPDATE': {
        const array = [...state];
        const index = array.findIndex(item => item.id === action.payload.id);
        array[index] = action.payload;
        return array;
      }
      default:
        return state;
    }
  }, []);

  const value = useMemo(
    () => ({
      push(modal: ActionType) {
        dispatch({type: 'PUSH', payload: modal});
      },
      remove(id: string) {
        dispatch({type: 'REMOVE', payload: {id}});
      },
      update(modal: ActionType) {
        dispatch({type: 'UPDATE', payload: modal});
      },
    }),
    [dispatch],
  );

  return (
    <ModalContext.Provider value={value}>
      {props.children}
      {modals.map((item, index) => (
        <View key={String(index)} style={StyleSheet.absoluteFill}>
          {item.visible && item.component}
        </View>
      ))}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
