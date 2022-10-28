import React from 'react';

interface SessionCountProps {
  currentSession: number;
  isOnBreak?: boolean;
}

const SessionCount = ({ currentSession, isOnBreak }: SessionCountProps) => {
  return (
    <div className="w-full py-3 px-4 border-2 border-gray-700 rounded-lg mb-9 flex justify-center">
      <span className="text-gray-100 text-md">
        Session {currentSession} {isOnBreak ? ' (Break time!)' : ''}
      </span>
    </div>
  );
};

export default SessionCount;
