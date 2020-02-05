const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  lng: 'en',
  defaultLanguage: 'en',
  otherLanguages: ['hi'],
  localePath: 'static/locales'
});
