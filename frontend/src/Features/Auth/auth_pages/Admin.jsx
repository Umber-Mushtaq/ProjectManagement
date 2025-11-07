import { useState } from "react";
import FormButton from "../auth_components/FormButton";
import { useAdminLogin } from "../auth_hooks/useAdminLogin";

const Admin = () => {
  const { login } = useAdminLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      await login({ email, password });
    }
  };
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <div className='flex flex-col mb-5'>
        <h2 className='text-center tracking-widest font-semibold text-3xl text-rose-600'>
          Administrator Access
        </h2>
        <h2 className='text-center tracking-wide  text-purple-500 text-sm mt-2'>
          Log in to manage users and oversee the system.
        </h2>
      </div>

      <FormButton
        label='Email'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name='email'
        placeholder='Enter your email'
      />

      <FormButton
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name='password'
        placeholder='Enter your password'
      />

      <button
        type='submit'
        className='bg-rose-500 py-2 px-3 rounded-md text-white tracking-wide hover:cursor-pointer hover:bg-rose-400'
      >
        Submit
      </button>
    </form>
  );
};

export default Admin;
