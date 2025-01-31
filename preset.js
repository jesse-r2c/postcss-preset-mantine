const nested = require('postcss-nested');
const mixins = require('postcss-mixins');
const remEm = require('./postcss-rem-em');
const lightDark = require('./postcss-light-dark');

function colorSchemeMixin(colorScheme) {
  return {
    [`[data-mantine-color-scheme='${colorScheme}'] &`]: {
      '@mixin-content': {},
    },
  };
}

const hoverMixin = {
  '@media (hover: hover)': {
    '&:hover': {
      '@mixin-content': {},
    },
  },
  '@media (hover: none)': {
    '&:active': {
      '@mixin-content': {},
    },
  },
};

const rtlMixin = {
  '[dir="rtl"] &': {
    '@mixin-content': {},
  },
};

const notRtlMixin = {
  ':root:not([dir="rtl"]) &': {
    '@mixin-content': {},
  },
};

function creator() {
  return {
    postcssPlugin: 'postcss-preset-mantine',
    plugins: [
      lightDark(),
      nested(),
      remEm(),
      mixins({
        mixins: {
          light: colorSchemeMixin('light'),
          dark: colorSchemeMixin('dark'),
          hover: hoverMixin,
          rtl: rtlMixin,
          'not-rtl': notRtlMixin,
        },
      }),
    ],
  };
}

creator.postcss = true;

module.exports = creator;
