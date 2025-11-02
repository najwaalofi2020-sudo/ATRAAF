import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-800 text-white p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold">قيم وولاء</h1>
      </div>
    </header>
  );
};

export default Header;