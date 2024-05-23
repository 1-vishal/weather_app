import React from 'react'

const Header = () => {
  return (
    <header className="bg-gradient-to-tr from-blue-100 to-yellow-300 p-4 flex justify-between items-center">
      <div className="w-100 flex items-center justify-self-center">
        <img src="/logo.png" alt="Logo" className="" width={120} height={50} />
      </div>
    </header>
  );
};

export default Header;