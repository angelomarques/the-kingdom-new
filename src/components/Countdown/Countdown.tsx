import Head from 'next/head';
import React, { useEffect, useState } from 'react';

interface CountdownProps {
  isRunning: boolean;
  initialTime: number;
}

const Countdown = ({ isRunning, initialTime }: CountdownProps) => {
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [timeDateLimit, setTimeDateLimit] = useState(
    new Date().getTime() + initialTime
  );

  const formatTime = (timeInMiliseconds: number) => {
    const totalSeconds = timeInMiliseconds / 1000;
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, '0');

    return `${minutes} : ${seconds}`;
  };

  useEffect(() => {
    setTimeDateLimit(new Date().getTime() + initialTime);
  }, [isRunning, initialTime]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      setCurrentTime(timeDateLimit - new Date().getTime());

      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const currentTime = new Date().getTime();
          if (prev > 1000) return timeDateLimit - currentTime;
          clearInterval(interval);
          return 0;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, timeDateLimit]);

  return (
    <>
      <Head>
        <title>{formatTime(currentTime)}</title>
      </Head>
      <div className="bg-gray-700 py-20 px-24 rounded-lg mb-9">
        <span className="text-2xl font-semibold text-gray-100 block w-[460px] text-center">
          {formatTime(currentTime)}
        </span>
      </div>
    </>
  );
};

export default Countdown;
