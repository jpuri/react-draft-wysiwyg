const customCounter = (EditorState) => 0;

export default {
  enable: false,
  counter: {
    char: {
      enable: true,
      className: 'char-counter',
    },
    word: {
      enable: true,
      className: 'word-counter',
    },
    custom: {
      enable: true,
      className: 'custom-counter',
    },
    line: {
      enable: true,
      className: 'line-counter',
    }
  },
  order: [
    'char',
    'word',
    'line',
    'custom',
  ],
}

export { customCounter }