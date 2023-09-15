//@ts-nocheck
export const showModal = (payload: {id: string; modalProps?: {}}) => {
  return {
    type: 'MODAL__SET_ID',
    payload,
  };
};

export const hideModal = () => {
  return {
    type: 'MODAL__SET_ID',
    payload: {id: '', modalProps: {}},
  };
};
