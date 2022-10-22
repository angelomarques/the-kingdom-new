import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      <Image
        src="/images/logo.svg"
        width={112}
        height={112}
        alt="The Kingdom"
      />
      <h1 className="text-gray-100 text-xl font-semibold">The Kingdom</h1>
    </div>
  );
};

export default Header;
