import { act, render, screen } from '@testing-library/react';
import Countdown from '.';
import {
  FIFTY_MINUTES_IN_MILISECONDS,
  ONE_SECOND_IN_MILISECONDS,
  TWENTY_FIVE_MINUTES_IN_MILISECONDS,
} from '../../utils/time';

describe('Countdown Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should not run the countdown', () => {
    render(
      <Countdown isRunning={false} initialTime={FIFTY_MINUTES_IN_MILISECONDS} />
    );

    screen.getByText('50 : 00');

    act(() => {
      jest.advanceTimersByTime(TWENTY_FIVE_MINUTES_IN_MILISECONDS);
    });

    expect(screen.getByText('50 : 00')).toBeInTheDocument();
  });

  it('should run the countdown', async () => {
    render(<Countdown isRunning initialTime={FIFTY_MINUTES_IN_MILISECONDS} />);

    expect(screen.getByText('50 : 00')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND_IN_MILISECONDS);
    });

    expect(screen.getByText('49 : 59')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    expect(screen.getByText('00 : 00')).toBeInTheDocument();
  });
});
