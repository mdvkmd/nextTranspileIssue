import { render } from '@testing-library/react';
import { matchers } from 'jest-emotion';
import { StickyButton } from '../stickyButton';

expect.extend(matchers);

test('renders with correct  styles', () => {
  const { container } = render(<StickyButton />);

  expect(container.firstChild).toHaveStyleRule('color', '#fff !important');
});
