import { render } from '@testing-library/react';
import SessionCount from '.';

describe('SessionCount Component', () => {
  it('should render the component', () => {
    render(<SessionCount currentSession={1} />);
  });
});
