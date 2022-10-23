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

const Home = () => {
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const modalTriggerButtonRef = useRef<HTMLButtonElement>(null);
  const [isBreakRunning, setIsBreakRunning] = useState(false);
  const [isSessionDone, setIsSessionDone] = useState(false);

  function handleClick() {
    setIsCountdownRunning((prev) => !prev);
  }

  function handleStartBreak() {
    setIsBreakRunning(true);
  }

  const handleFinishCountdown = useCallback(() => {
    modalTriggerButtonRef.current?.click();
    setIsSessionDone(true);
    setIsCountdownRunning(false);
  }, []);

  return (
    <div className="w-full bg-gray-900 flex flex-col items-center justify-center">
      <Dialog.Trigger ref={modalTriggerButtonRef} />
      <div className="max-w-2xl">
        <Header />

        <SessionCount />

        <Countdown
          isRunning={isCountdownRunning || isBreakRunning}
          initialTime={
            isBreakRunning
              ? TEN_MINUTES_IN_MILISECONDS
              : FIFTY_MINUTES_IN_MILISECONDS
          }
          onFinish={handleFinishCountdown}
        />

        {isCountdownRunning ? (
          <Dialog.Trigger asChild>
            <Button variant="warning" size="lg">
              Stop
            </Button>
          </Dialog.Trigger>
        ) : (
          <Button onClick={handleClick} size="lg">
            Start
          </Button>
        )}
      </div>

      {isSessionDone ? (
        <Modal content="Session done!">
          <Dialog.Close asChild>
            <Button variant="warning">Cancel</Button>
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
