import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import Button from '../../components/Button';
import Countdown from '../../components/Countdown';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import SessionCount from '../../components/SessionCount';

import { FIFTY_MINUTES_IN_MILISECONDS } from '../../utils/test/time';

const Home = () => {
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  function handleClick() {
    setIsCountdownRunning((prev) => !prev);
  }

  return (
    <div className="w-full bg-gray-900 flex flex-col items-center justify-center">
      <div className="max-w-2xl">
        <Header />

        <SessionCount />

        <Countdown
          isRunning={isCountdownRunning}
          initialTime={FIFTY_MINUTES_IN_MILISECONDS}
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
    </div>
  );
};

export default Home;
