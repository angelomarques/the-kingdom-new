import Head from 'next/head';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ONE_SECOND_IN_MILISECONDS } from '../../utils/time';

interface CountdownProps {
  isRunning: boolean;
  initialTime: number;
  onFinish?: () => void;
}

const Countdown = ({ isRunning, initialTime, onFinish }: CountdownProps) => {
  const [currentTime, setCurrentTime] = useState(initialTime);
  const timeDateLimit = useMemo(
    () => new Date().getTime() + initialTime,
    [isRunning, initialTime]
  );

  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (timeInMiliseconds: number) => {
    const totalSeconds = timeInMiliseconds / 1000;
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, '0');

    return `${minutes} : ${seconds}`;
  };

  const finishCountdown = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play();
    }
    onFinish && onFinish();
  };

  const shouldFinishCountdown = currentTime < ONE_SECOND_IN_MILISECONDS;
  useEffect(() => {
    if (shouldFinishCountdown) finishCountdown();
  }, [shouldFinishCountdown]);

  useEffect(() => {
    setCurrentTime(initialTime);
  }, [isRunning, initialTime]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    const shouldStartCountdown =
      timeDateLimit - new Date().getTime() > ONE_SECOND_IN_MILISECONDS;
    if (isRunning && shouldStartCountdown) {
      setCurrentTime(timeDateLimit - new Date().getTime());

      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const currentTime = new Date().getTime();
          if (prev > ONE_SECOND_IN_MILISECONDS)
            return timeDateLimit - currentTime;
          clearInterval(interval);
          return 0;
        });
      }, ONE_SECOND_IN_MILISECONDS);
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
      <audio ref={audioRef}>
        <source src="/sounds/alarm.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <div className="bg-gray-700 py-20 px-24 rounded-lg mb-9">
        <span className="text-2xl font-semibold text-gray-100 block w-[460px] text-center">
          {formatTime(currentTime)}
        </span>
      </div>
    </>
  );
};

export default Countdown;
