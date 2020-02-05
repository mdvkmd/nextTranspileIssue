import React from 'react';
import { render } from '@testing-library/react';
import { matchers } from 'jest-emotion';
import { RechargeItems } from './index';

expect.extend(matchers);

test('it renders', () => {
  const selectServiceType = jest.fn();
  const { getByTestId } = render(<RechargeItems selectServiceType={selectServiceType} selectedType="MOBILITY" />);
  const target = getByTestId('rechargeCategories-id');
  expect(target).toBeInTheDocument();
  expect(target.childElementCount).toBe(3);
});

test('check attribute of children', () => {
  const selectServiceType = jest.fn();
  const { getByTestId } = render(<RechargeItems selectServiceType={selectServiceType} selectedType="MOBILITY" />);
  const target = getByTestId('rechargeCategories-id');
  expect(target).toBeInTheDocument();
  expect(target.childNodes[0].textContent).toMatch(/mobileAndWifi/i);
});
