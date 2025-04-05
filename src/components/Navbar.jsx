import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/src/assets/CMON.svg"
            alt="CMON logo"
            className="h-24 mt-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
