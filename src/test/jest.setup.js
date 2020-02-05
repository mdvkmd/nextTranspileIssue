import 'raf/polyfill';
import '@testing-library/jest-dom/extend-expect';

require('jest-fetch-mock').enableMocks();

export default {
  collectCoverageFrom: [
    'src/components/commons/*.{js}'
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'html']
};
