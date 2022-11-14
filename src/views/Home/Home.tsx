import React, { useCallback, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import Button from '../../components/Button';
import Countdown from '../../components/Countdown';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import SessionCount from '../../components/SessionCount';

import {
  FIFTY_MINUTES_IN_MILISECONDS,
  TEN_MINUTES_IN_MILISECONDS,
} from '../../utils/time';
import AuthButton from '../../components/AuthButton';

const Home = () => {
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const modalTriggerButtonRef = useRef<HTMLButtonElement>(null);
  const [isBreakRunning, setIsBreakRunning] = useState(false);
  const [isSessionDone, setIsSessionDone] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  function handleClick() {
    setIsCountdownRunning((prev) => !prev);
  }

  function handleStartBreak() {
    setIsBreakRunning(true);
  }

  function handleGoToNextSession() {
    setCompletedSessions((prev) => prev + 1);
    setIsBreakRunning(false);
    setIsSessionDone(false);
  }

  // TO-DO: check the real need for this useCallback use
  const handleFinishCountdown = useCallback(
    (shouldGoToNextSession: boolean) => {
      if (shouldGoToNextSession) {
        handleGoToNextSession();
      } else {
        modalTriggerButtonRef.current?.click();
        setIsSessionDone(true);
        setIsCountdownRunning(false);
      }
    },
    []
  );

  return (
    <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center justify-center py-6 px-6">
      <Dialog.Trigger ref={modalTriggerButtonRef} />
      <nav className='self-end mb-auto w-40'>
        <AuthButton />
      </nav>
      <div className="max-w-2xl">
        <Header />

        <SessionCount
          currentSession={completedSessions + 1}
          isOnBreak={isBreakRunning}
        />

        <Countdown
          isRunning={isCountdownRunning || isBreakRunning}
          initialTime={
            isBreakRunning
              ? TEN_MINUTES_IN_MILISECONDS
              : FIFTY_MINUTES_IN_MILISECONDS
          }
          onFinish={() => handleFinishCountdown(isBreakRunning)}
        />

        {isCountdownRunning && (
          <Dialog.Trigger asChild>
            <Button variant="warning" size="lg">
              Stop
            </Button>
          </Dialog.Trigger>
        )}

        {!isCountdownRunning && !isBreakRunning && (
          <Button onClick={handleClick} size="lg">
            Start
          </Button>
        )}

        {isBreakRunning && (
          <Button variant="info" onClick={handleGoToNextSession} size="lg">
            Skip
          </Button>
        )}
      </div>

      {isSessionDone ? (
        <Modal content="Session done!">
          <Dialog.Close asChild>
            <Button variant="warning" onClick={handleGoToNextSession}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild onClick={handleStartBreak}>
            <Button variant="success">Start Break</Button>
          </Dialog.Close>
        </Modal>
      ) : (
        <Modal
          content="Are you sure you want to stop in the middle of the session? It will
            not be counted!"
        >
          <Dialog.Close asChild>
            <Button variant="warning" onClick={handleClick}>
              Stop session
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button variant="success">Cancel</Button>
          </Dialog.Close>
        </Modal>
      )}
    </div>
  );
};

export default Home;
