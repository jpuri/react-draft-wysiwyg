export default class ModalHandler {

  callBacks = [];
  editorFlag = false;

  closeAllModals = (event: Object) => {
    this.callBacks.forEach((callBack) => {
      callBack(event);
    });
  };

  init = (wrapperId: string) => {
    const wrapper = document.getElementById(wrapperId); // eslint-disable-line no-undef
    wrapper.addEventListener('click', () => {
      this.editorFlag = true;
    });
    document.addEventListener('click', () => { // eslint-disable-line no-undef
      if (!this.editorFlag) {
        this.closeAllModals();
      } else {
        this.editorFlag = false;
      }
    });
  };

  closeModals = (event: Object): void => {
    this.closeAllModals(event);
  };

  registerCallBack = (callBack): void => {
    this.callBacks.push(callBack);
  };

  deregisterCallBack = (callBack): void => {
    this.callBacks = this.callBacks.filter(cb => cb !== callBack);
  };
}
