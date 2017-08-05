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

  init = (wrapperId: string) => {
    const wrapper = document.getElementById(wrapperId); // eslint-disable-line no-undef
    if (wrapper) {
      wrapper.addEventListener('click', () => {
        this.editorFlag = true;
      });
    }
    if (document) {
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
      document.addEventListener('keydown', (event) => { // eslint-disable-line no-undef
        if (event.key === 'Escape') {
          this.closeAllModals();
        }
      });
    }
  };

  onEditorClick = () => {
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
