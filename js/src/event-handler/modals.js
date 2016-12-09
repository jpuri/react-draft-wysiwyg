export default class ModalHandler {

  callBacks = [];
  suggestionCallback = undefined;
  editorFlag = false;
  suggestionFlag = false;

  closeAllModals = (event: Object) => {
    this.callBacks.forEach((callBack) => {
      callBack(event);
    });
  };

  init = () => {
    document.addEventListener('click', () => { // eslint-disable-line no-undef
      if (!this.editorFlag) {
        this.closeAllModals();
        if (this.suggestionCallback) {
          this.suggestionCallback();
        }
      } else {
        this.editorFlag = false;
      }
    });
  };

  onEditorClick = () => {
    this.editorFlag = true;
    this.closeModals();
    if (!this.suggestionFlag && this.suggestionCallback) {
      this.suggestionCallback();
    } else {
      this.suggestionFlag = false;
    }
  }

  closeModals = (event: Object): void => {
    this.closeAllModals(event);
  };

  registerCallBack = (callBack): void => {
    this.callBacks.push(callBack);
  };

  deregisterCallBack = (callBack): void => {
    this.callBacks = this.callBacks.filter(cb => cb !== callBack);
  };

  setSuggestionCallback = (callBack): void => {
    this.suggestionCallback = callBack;
  };

  removeSuggestionCallback = (): void => {
    this.suggestionCallback = undefined;
  };

  onSuggestionClick = ():void => {
    this.suggestionFlag = true;
  }
}
