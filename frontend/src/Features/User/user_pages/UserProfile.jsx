import { useRef, useState } from "react";
import FormButton from "../../Auth/auth_components/FormButton";
import { useUserProfile } from "../user_hooks/useUserProfile";

const UserProfile = ({ setprofilemodal }) => {
  const { userProfile } = useUserProfile();

  const data = JSON.parse(localStorage.getItem("User"));

  const [imageUrl, setImg] = useState(data.imageUrl);
  const [firstName, setfName] = useState(data.firstName);
  const [lastName, setlName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [speciality, setspeciality] = useState(data.speciality);
  const imageRef = useRef();

  const handleSelectedImage = (e) => {
    const selectedImg = e.target.files[0];
    const url = `/images/${selectedImg.name}`;
    setImg(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageUrl && firstName && lastName && speciality && email) {
      await userProfile({ imageUrl, firstName, lastName, speciality, email });
    }
    setprofilemodal(false);
  };

  return (
    <div
      className='fixed inset-0 z-50 p-3 w-full bg-black/50 opacity-bg-50 flex items-center justify-center'
      onClick={() => setprofilemodal(false)}
    >
      <div
        className='flex flex-col gap-3 w-auto items-center bg-white py-5 px-8 rounded-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='hover:cursor-pointer'
          onClick={() => imageRef.current.click()}
        >
          <img
            src={imageUrl ? imageUrl : "/images/img.png"}
            className='w-50 h-50 rounded-full'
          />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type='file'
            accept='image/*'
            ref={imageRef}
            onChange={handleSelectedImage}
            className='hidden'
          />
          <div className='flex flex-col gap-3'>
            <div className='flex-col md:flex md:flex-row items-center justify-between gap-2'>
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
            </div>
            <div className='flex-col md:flex md:flex-row items-center justify-between gap-2'>
              <FormButton
                label='Email'
                type='text'
                name='email'
                value={email}
                placeholder='Enter first name'
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormButton
                label='speciality'
                type='text'
                name='speciality'
                value={speciality}
                placeholder='Enter last name'
                onChange={(e) => setspeciality(e.target.value)}
              />
            </div>
          </div>
          <button
            type='submit'
            className='py-2 px-3 my-3 border-2 bg-rose-500 w-full rounded-lg text-white tracking-wider hover:cursor-pointer'
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
