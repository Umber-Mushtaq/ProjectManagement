import { useState } from "react";
import { useAddMember } from "../admin_hooks/useAddMember";
import FormButton from "../../Auth/auth_components/FormButton";

const AddUserForm = ({ setMemberMode }) => {
  const [firstName, setfName] = useState("");
  const [lastName, setlName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const { addMember } = useAddMember();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstName && lastName && speciality && email && password) {
      await addMember({ firstName, lastName, speciality, email, password });
    }
  };
  return (
    <div
      className='fixed inset-0 z-50 p-3 w-full bg-black/50 shadow-2xl flex items-center justify-center'
      onClick={() => setMemberMode(false)}
    >
      <div
        className=' bg-white w-fit py-5 px-8 rounded-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col items-center justify-between w-full gap-4'>
            <FormButton
              label='First Name'
              type='text'
              name='firstName'
              value={firstName}
              placeholder='Enter first name'
              onChange={(e) => setfName(e.target.value)}
            />
            <FormButton
              label='Last Name'
              type='text'
              name='lastName'
              value={lastName}
              placeholder='Enter last name'
              onChange={(e) => setlName(e.target.value)}
            />
            <FormButton
              label='Speciality'
              type='text'
              name='speciality'
              value={speciality}
              placeholder='Enter speciality'
              onChange={(e) => setSpeciality(e.target.value)}
            />

            <FormButton
              label='Email'
              type='email'
              name='email'
              value={email}
              placeholder='Enter first name'
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormButton
              label='Password'
              type='password'
              name='password'
              value={password}
              placeholder='Enter Password'
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='py-2 px-3 my-3 border-2 bg-rose-500 w-full rounded-lg text-white tracking-wider hover:cursor-pointer'
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
