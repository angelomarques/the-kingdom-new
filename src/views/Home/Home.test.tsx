import { act, screen, fireEvent } from '@testing-library/react';
import Home from '.';
import { renderWithModal } from '../../utils/test/renderWithModal';
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
    renderWithModal(<Home />);

    const startButton = screen.getByText('Start');

    fireEvent.click(startButton);

    expect(screen.getByText('Session 1')).toBeInTheDocument();
    expect(screen.getByText('Stop')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND_IN_MILISECONDS);
    });

    expect(screen.getByText('49 : 59')).toBeInTheDocument();
  });

  it('should be able to stop in the middle of the countdown', () => {
    renderWithModal(<Home />);

    const startButton = screen.getByText('Start');

    fireEvent.click(startButton);

    expect(screen.getByText('Stop')).toBeInTheDocument();

    expect(screen.getByText('Session 1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(TWENTY_FIVE_MINUTES_IN_MILISECONDS);
    });

    const stopButton = screen.getByText('Stop');

    fireEvent.click(stopButton);

    const modalTextContent =
      'Are you sure you want to stop in the middle of the session? It will not be counted!';
    expect(screen.getByText(modalTextContent)).toBeInTheDocument();

    const confirmStopButton = screen.getByText('Stop session');

    fireEvent.click(confirmStopButton);

    expect(screen.queryByText(modalTextContent)).not.toBeInTheDocument();
    expect(screen.getByText('50 : 00')).toBeInTheDocument();
    expect(screen.getByText('Session 1')).toBeInTheDocument();
  });

  it('should be able to finish the countdown', () => {
    renderWithModal(<Home />);

    const startButton = screen.getByText('Start');

    fireEvent.click(startButton);

    expect(screen.getByText('Stop')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND_IN_MILISECONDS);
    });

    expect(screen.getByText('49 : 59')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    expect(screen.getByText('Session done!')).toBeInTheDocument();
  });

  it('should be able to go to the next session', () => {
    renderWithModal(<Home />);

    const startButton = screen.getByText('Start');

    fireEvent.click(startButton);

    expect(screen.getByText('Stop')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    expect(screen.getByText('Session done!')).toBeInTheDocument();

    const cancelBreakSessionButton = screen.getByText('Cancel');

    fireEvent.click(cancelBreakSessionButton);

    expect(screen.getByText('50 : 00')).toBeInTheDocument();
    expect(screen.getByText('Session 2')).toBeInTheDocument();
    expect(screen.getByText('Start'));
  });

  it('should be able to start the break session', () => {
    renderWithModal(<Home />);

    const startButton = screen.getByText('Start');

    fireEvent.click(startButton);

    expect(screen.getByText('Session 1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    const startBreakButton = screen.getByText('Start Break');

    fireEvent.click(startBreakButton);

    expect(screen.queryByText('Session done!')).not.toBeInTheDocument();
    expect(screen.getByText('Session 1 (Break time!)')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });

  it('should be able to skip the break session', () => {
    renderWithModal(<Home />);

    const startButton = screen.getByText('Start');

    fireEvent.click(startButton);

    expect(screen.getByText('Session 1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    const startBreakButton = screen.getByText('Start Break');

    fireEvent.click(startBreakButton);

    act(() => {
      jest.advanceTimersByTime(FIVE_MINUTES_IN_MILISECONDS);
    });

    const skipButton = screen.getByText('Skip');

    fireEvent.click(skipButton);

    expect(screen.getByText('50 : 00')).toBeInTheDocument();
    expect(screen.getByText('Session 2')).toBeInTheDocument();
    expect(screen.getByText('Start'));
  });

  it('should reset the countdown after the break session', () => {
    renderWithModal(<Home />);

    const startButton = screen.getByText('Start');

    fireEvent.click(startButton);

    expect(screen.getByText('Session 1')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    const startBreakButton = screen.getByText('Start Break');

    fireEvent.click(startBreakButton);

    act(() => {
      jest.advanceTimersByTime(TEN_MINUTES_IN_MILISECONDS);
    });

    expect(screen.getByText('50 : 00')).toBeInTheDocument();
    expect(screen.getByText('Session 2')).toBeInTheDocument();
    expect(screen.getByText('Start'));
  });
});
