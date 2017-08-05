export default class FocusHandler {
  inputFocused = false;
  editorMouseDown = false;

  onEditorMouseDown = ():void => {
    this.editorFocused = true;
  }

  onInputMouseDown = ():void => {
    this.inputFocused = true;
  }

  isEditorBlur = (event):void => {
    if (event.target.tagName === 'INPUT' && !this.editorFocused) {
      this.inputFocused = false;
      return true;
    } else if (event.target.tagName !== 'INPUT' && !this.inputFocused) {
      this.editorFocused = false;
      return true;
    }
    return false;
  }

  isEditorFocused = ():void => {
    if (!this.inputFocused) {
      return true;
    }
    this.inputFocused = false;
    return false;
  }

  isToolbarFocused = ():void => {
    if (!this.editorFocused) {
      return true;
    }
    this.editorFocused = false;
    return false;
  }

  isInputFocused = ():void => this.inputFocused;
}
