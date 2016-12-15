const customCounter = (EditorState) => 0;

export default {
  enable: false,
  counter: {
    char: {
      enable: true,
      className: 'char-counter',
      limit: 0,
    },
    word: {
      enable: true,
      className: 'word-counter',
      limit: 0,
    },
    custom: {
      enable: true,
      className: 'custom-counter',
      limit: 0,
    },
    line: {
      enable: true,
      className: 'line-counter',
      limit: 0,
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