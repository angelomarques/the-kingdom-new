import React, { useState } from 'react';
import Button from '../../components/Button';
import Countdown from '../../components/Countdown';
import Header from '../../components/Header';
import { FIFTY_MINUTES_IN_MILISECONDS } from '../../utils/time';

const Home = () => {
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  function handleClick() {
    setIsCountdownRunning((prev) => !prev);
  }

  return (
    <div className="w-full bg-gray-900 flex flex-col items-center justify-center">
      <div className="max-w-2xl">
        <Header />
        <Countdown
          isRunning={isCountdownRunning}
          initialTime={FIFTY_MINUTES_IN_MILISECONDS}
        />
        <Button
          onClick={handleClick}
          variant={isCountdownRunning ? 'warning' : 'default'}
        >
          {isCountdownRunning ? 'Stop' : 'Start'}
        </Button>
      </div>
    </div>
  );
};

export default Home;
