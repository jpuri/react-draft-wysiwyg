const callBacks = [];

export default {
  closeModals: (event: Object): void => {
    callBacks.forEach((callBack) => {
      callBack(event);
    });
  },
  registerCallBack: (callBack): void => {
    callBacks.push(callBack);
  },
};
