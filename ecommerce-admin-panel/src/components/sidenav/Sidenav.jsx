import React from "react";

import { Link } from "react-router-dom";

import { navLinks } from "./navData";

const SideNav = ({ isNavOpen }) => {
  return (
    <>
      <section
        className={`side-nav shadow-lg shadow-indigo-500/40 h-[100vh] fixed top-[0] left-[0] flex flex-col ${
          isNavOpen ? "w-[20%]" : "w-[6.2%]"
        }`}
      >
        <div className="flex justify-center items-center py-[1rem]">
          <img className="w-[3rem] h-[3rem]" src="vite.svg" alt="" />
        </div>
        <div className="splitter h-[1px] w-[100%] bg-[#eee]"></div>
        <div className="user-info flex flex-col justify-center items-center py-[35px]">
          <img
            className={`rounded-[50%] ${isNavOpen ? "w-[4rem]" : "w-[3rem]"}`}
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.2.1326869177.1680443547&semt=sph"
            alt="name"
          />
          {isNavOpen && (
            <div className="user-name pt-[15px] text-[#616161] font-bold">
              Eslam Sobhi
            </div>
          )}
        </div>
        <div className="splitter h-[1px] w-[100%] bg-[#eee]"></div>
        <article
          className={`nav flex flex-col pt-[35px] ${
            !isNavOpen ? "justify-center items-center" : ""
          }`}
        >
          {navLinks.map((link) => {
            return (
              <Link
                to={link.url}
                className="link flex mb-[40px] group"
                key={link.id}
              >
                <div
                  title={`${isNavOpen ? "" : link.text}`}
                  className={`icon flex justify-center items-center hover:cursor-pointer ${
                    isNavOpen ? "pl-[30px]" : ""
                  }`}
                >
                  {<link.icon size={25} color="#b17a15" />}
                </div>
                {isNavOpen && (
                  <div className="text font-semibold text-[#757070] pl-[10px] group-hover:text-[#b17a15] hover:cursor-pointer">
                    {link.text}
                  </div>
                )}
              </Link>
            );
          })}
        </article>
      </section>
    </>
  );
};

export default SideNav;
