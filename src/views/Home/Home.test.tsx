import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';
import {
  FIFTY_MINUTES_IN_MILISECONDS,
  FIVE_MINUTES_IN_MILISECONDS,
  ONE_SECOND_IN_MILISECONDS,
  TEN_MINUTES_IN_MILISECONDS,
  TWENTY_FIVE_MINUTES_IN_MILISECONDS,
} from '../../utils/time';

describe('Home Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be able to start the countdown', () => {
    render(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    expect(screen.getByText('Stop')).toBeInTheDocument();
    expect(screen.getByText('Session 1')).toBeInTheDocument();
    expect(screen.getByText('50 : 00')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND_IN_MILISECONDS);
    });

    expect(screen.getByText('49 : 59')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND_IN_MILISECONDS);
    });

    expect(screen.getByText('49 : 58')).toBeInTheDocument();
  });

  it('should be able to stop in the middle of the countdown', () => {
    render(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    expect(screen.getByText('Session 1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(TWENTY_FIVE_MINUTES_IN_MILISECONDS);
    });

    const stopButton = screen.getByText('Stop');

    userEvent.click(stopButton);

    const modalTextContent =
      'Are you sure you want to stop in the middle of the session? It will not be counted!';
    expect(screen.getByText(modalTextContent)).toBeInTheDocument();

    const confirmStopButton = screen.getByText('Stop session');

    userEvent.click(confirmStopButton);

    expect(screen.queryByText(modalTextContent)).not.toBeInTheDocument();
    expect(screen.getByText('00 : 00')).toBeInTheDocument();
    expect(screen.getByText('Session 1')).toBeInTheDocument();
  });

  it('should be able to finish the countdown', () => {
    render(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    expect(screen.getByText('Session done!')).toBeInTheDocument();
    expect(screen.getByText('00 : 00')).toBeInTheDocument();
  });

  it('should be able to go to the next session', () => {
    render(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    expect(screen.getByText('Session 1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    const cancelBreakSessionButton = screen.getByText('Cancel');

    userEvent.click(cancelBreakSessionButton);

    expect(screen.getByText('50 : 00')).toBeInTheDocument();
    expect(screen.getByText('Session 2')).toBeInTheDocument();
    expect(screen.getByText('Start'));
  });

  it('should be able to start the break session', () => {
    render(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    expect(screen.getByText('Session 1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    const startBreakButton = screen.getByText('Start Break');

    userEvent.click(startBreakButton);

    expect(screen.queryByText('Session done!')).not.toBeInTheDocument();
    expect(screen.getByText('Session 1 (Break time!)')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });

  it('should be able to skip the break session', () => {
    render(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    expect(screen.getByText('Session 1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    const startBreakButton = screen.getByText('Start Break');

    userEvent.click(startBreakButton);

    act(() => {
      jest.advanceTimersByTime(FIVE_MINUTES_IN_MILISECONDS);
    });

    const skipButton = screen.getByText('Skip');

    userEvent.click(skipButton);

    expect(screen.getByText('50 : 00')).toBeInTheDocument();
    expect(screen.getByText('Session 2')).toBeInTheDocument();
    expect(screen.getByText('Start'));
  });

  it('should reset the countdown after the break session', () => {
    render(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    expect(screen.getByText('Session 1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    const startBreakButton = screen.getByText('Start Break');

    userEvent.click(startBreakButton);

    act(() => {
      jest.advanceTimersByTime(TEN_MINUTES_IN_MILISECONDS);
    });

    expect(screen.getByText('50 : 00')).toBeInTheDocument();
    expect(screen.getByText('Session 2')).toBeInTheDocument();
    expect(screen.getByText('Start'));
  });
});
