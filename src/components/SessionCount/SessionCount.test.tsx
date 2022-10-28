import { render, screen } from '@testing-library/react';
import SessionCount from '.';

describe('SessionCount Component', () => {
  it('should render the component', () => {
    render(<SessionCount currentSession={1} />);
  });

  it('should render the break session label', () => {
    render(<SessionCount currentSession={1} isOnBreak />);

    expect(screen.getByText('Session 1 (Break time!)')).toBeInTheDocument();
  });
});
