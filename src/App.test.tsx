import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  const { baseElement } = render(<App tenantName='neosyn' />);
  expect(baseElement).toBeDefined();
});
