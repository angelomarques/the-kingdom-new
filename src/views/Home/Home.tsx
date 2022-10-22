import React from 'react';
import Countdown from '../../components/Countdown';
import Header from '../../components/Header';
import { FIFTY_MINUTES_IN_MILISECONDS } from '../../utils/time';

const Home = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col gap-12 items-center justify-center">
      <Header />
      <Countdown isRunning initialTime={FIFTY_MINUTES_IN_MILISECONDS} />
    </div>
  );
};

export default Home;
