const callBacks = [];
let focus = false;

export default {
  closeModals: (event: Object): void => {
    if (!focus) {
      callBacks.forEach((callBack) => {
        callBack(event);
      });
    }
  },
  setFocusFlag: (): void => {
    focus = true;
  },
  resetFocusFlag: (): void => {
    focus = false;
  },
  registerCallBack: (callBack): void => {
    callBacks.push(callBack);
  },
};
