import { useState } from "react";
import Login from "./Login";
import Admin from "./Admin";

const AuthenticationPage = () => {
  const [mode, setMode] = useState("Login");
  const component = {
    Login: <Login />,
    Admin: <Admin />,
  };
  return (
    <main className="bg-[url('/images/bg2.jpg')] bg-cover bg-center bg-no-repeat h-screen ">
      <div className='flex items-center justify-center w-full h-screen'>
        <div className='flex'>
          {/* Left Side */}
          <div className='hidden md:block w-100 border-white border-8 bg-black/50 opacity-bg-40 rounded-l-2xl'>
            <div className='flex flex-col justify-between w-full h-full rounded-l-2xl py-3 px-5'>
              <span></span>
              <div className='flex flex-col gap-3'>
                <h1 className='font-medium text-5xl tracking-wider text-white'>
                  Your Project, Your Team
                </h1>
                <h2 className='text-white tracking-widest mt-5 shadow-rose-100'>
                  Organize, Track, Deliver with Ease
                </h2>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className='w-100 bg-white rounded-r-2xl flex flex-col justify-between py-5 px-5'>
            <div>{component[mode]}</div>
            <div className='flex items-center justify-center gap-2 w-full mt-2'>
              <button
                onClick={() => setMode("Admin")}
                className={`text-sm text-purple-500 tracking-wide hover:cursor-pointer hover:text-rose-500`}
              >
                Admin?
              </button>
              <button
                onClick={() => setMode("Login")}
                className={`text-sm text-purple-500 tracking-wide hover:cursor-pointer hover:text-rose-500`}
              >
                User?
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthenticationPage;
