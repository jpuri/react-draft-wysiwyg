export default {
  enable: false,
  counter: {
    word: {
      enable: true,
      className: '',
      limit: 0,
    },
    custom: {
      enable: true,
      className: '',
      limit: 0,
    },
    line: {
      enable: true,
      className: '',
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