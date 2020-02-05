import React from 'react';
import {
  render, fireEvent
} from '@testing-library/react';
import { JInput } from 'components/commons/styled-components/jInput';
import { DemoNrInput } from './index';

test('should check if text shows', () => {
  const { getByText } = render(<DemoNrInput floatinglabel="label that floats" />);
  const entity = getByText('label that floats');
  expect(entity).toBeInTheDocument();
});

test('should render component', () => {
  const { getByTestId } = render(<DemoNrInput placeholderTextFont />);
  const entity = getByTestId('jInput-id');
  expect(entity).toBeInTheDocument();
});

test('should check input box functions ', () => {
  // onChange={onChange} onBlur={onBlur} onFocus={onFocus} value={props.value}
  const onChange = jest.fn();
  render(<JInput onChange={onChange} />);
  const inputField = document.querySelector('input');
  fireEvent.change(inputField, { target: { value: 'ABC' } });
  expect(onChange).toHaveBeenCalled();
  expect(inputField.value).toBe('ABC');
});
