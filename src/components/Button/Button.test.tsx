import { render } from '@testing-library/react';
import Button from '.';

describe('Button Component', () => {
  it('should render the component', () => {
    render(<Button>Start</Button>);
  });
});
