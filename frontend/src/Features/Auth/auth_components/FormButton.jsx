const FormButton = ({ label, type, name, value, placeholder, onChange }) => {
  return (
    <div className='w-full'>
      <label className='font-medium text-rose-600 tracking-wider'>
        *{label}
      </label>
      <input
        required
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className='border-2 border-rose-300 rounded-md outline-none py-2 px-3 text-gray-400 w-full'
      />
    </div>
  );
};

export default FormButton;
