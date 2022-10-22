import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';
import { FIFTY_MINUTES_IN_MILISECONDS, ONE_SECOND_IN_MILISECONDS } from '../../utils/time';

describe('Home Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be able to start the countdown', async () => {
    render(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    screen.getByText('Stop');

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND_IN_MILISECONDS);
    });

    expect(screen.getByText('49 : 59')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND_IN_MILISECONDS);
    });

    expect(screen.getByText('49 : 58')).toBeInTheDocument();
  });

  it('should be able to stop the countdown', async () => {
    render(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    expect(screen.getByText('Session done!')).toBeInTheDocument();
    expect(screen.getByText('00 : 00')).toBeInTheDocument();
  });
});
