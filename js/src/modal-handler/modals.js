const callBacks = [];
let editorFlag = false;

const closeAllModals = (event): void => {
  callBacks.forEach((callBack) => {
    callBack(event);
  });
};

export default {
  init: () => {
    const wrapper = document.getElementById('rdw-wrapper');
    wrapper.addEventListener('mousedown', () => {
      editorFlag = true;
    });
    document.addEventListener('mousedown', () => {
      if (!editorFlag) {
        closeAllModals();
      } else {
        editorFlag = false;
      }
    });
  },
  closeModals: (event: Object): void => {
    closeAllModals(event);
  },
  registerCallBack: (callBack): void => {
    callBacks.push(callBack);
  },
};
