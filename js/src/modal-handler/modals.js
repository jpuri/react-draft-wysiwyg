const callBacks = [];
let focus = 0;

export default {
  closeModals: (event: Object): void => {
    if (focus === 0) {
      callBacks.forEach((callBack) => {
        callBack(event);
      });
    }
  },
  setFocusFlag: (): void => {
    focus += 1;
  },
  resetFocusFlag: (): void => {
    focus = focus > 0 ? focus - 1 : 0;
  },
  registerCallBack: (callBack): void => {
    callBacks.push(callBack);
  },
};
