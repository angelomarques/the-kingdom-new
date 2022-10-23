import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
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
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    jest.useFakeTimers();

    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    jest.useRealTimers();

    // cleanup on exiting
    unmountComponentAtNode(container!);
    container!.remove();
    container = null;
  });

  it('should be able to start the countdown', async () => {
    renderWithModal(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText('Stop')).toBeInTheDocument();
    });
    expect(screen.getByText('Session 1')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('49 : 59')).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND_IN_MILISECONDS);
    });

    expect(screen.getByText('49 : 58')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(ONE_SECOND_IN_MILISECONDS);
    });

    expect(screen.getByText('49 : 57')).toBeInTheDocument();
  });

  it('should be able to stop in the middle of the countdown', async () => {
    renderWithModal(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText('Stop')).toBeInTheDocument();
    });
    expect(screen.getByText('Session 1')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('49 : 59')).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(TWENTY_FIVE_MINUTES_IN_MILISECONDS);
    });

    const stopButton = screen.getByText('Stop');

    userEvent.click(stopButton);

    const modalTextContent =
      'Are you sure you want to stop in the middle of the session? It will not be counted!';
    await waitFor(() => {
      expect(screen.getByText(modalTextContent)).toBeInTheDocument();
    });

    const confirmStopButton = screen.getByText('Stop session');

    userEvent.click(confirmStopButton);

    await waitFor(() => {
      expect(screen.queryByText(modalTextContent)).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('50 : 00')).toBeInTheDocument();
    });
    expect(screen.getByText('Session 1')).toBeInTheDocument();
  });

  it('should be able to finish the countdown', async () => {
    renderWithModal(<Home />);

    const startButton = screen.getByText('Start');

    userEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByText('Stop')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('49 : 59')).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(FIFTY_MINUTES_IN_MILISECONDS);
    });

    await waitFor(() => {
      expect(screen.getByText('Session done!')).toBeInTheDocument();
    });
  });

  it('should be able to go to the next session', () => {
    renderWithModal(<Home />);

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
    renderWithModal(<Home />);

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
    renderWithModal(<Home />);

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
    renderWithModal(<Home />);

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
