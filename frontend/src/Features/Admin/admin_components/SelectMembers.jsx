import { useEffect, useState } from "react";
import Select from "react-select";
import { useGetAllMembers } from "../admin_hooks/useGetAllMembers";
const customStyles = {
  control: (base, state) => ({
    ...base,
    borderColor: state ? "#ff9191" : "#e5e7eb",
    borderWidth: "2px",
    borderRadius: "0.5rem",
    padding: "2px",
    boxShadow: "none",
    "&:hover": { borderColor: "#f43f5e" },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#fda4af",
    color: "white",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#881337",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
  }),
};

const SelectMembers = ({
  setmemberList,
  text = "Select member of the team...",
}) => {
  const [users, setUsers] = useState([]);
  const { allMembers } = useGetAllMembers();
  const [selected, setSelected] = useState([]);

  const options = users.map((user) => ({
    value: user._id,
    label:
      user.firstName && user.speciality
        ? `${user.firstName} | ${user.speciality}`
        : "Loading...",
  }));

  const handleMultipleSelect = (selectedOptions) => {
    setSelected(selectedOptions);
    const ids = selectedOptions.map((opt) => opt.value);
    setmemberList(ids);
  };
  useEffect(() => {
    const fetchMembers = async () => {
      const res = await allMembers();
      console.log(res);
      if (res) setUsers(res);
    };
    fetchMembers();
  }, []);

  return (
    <Select
      isMulti
      options={options}
      value={selected}
      onChange={handleMultipleSelect}
      classNamePrefix='select'
      placeholder={text}
      styles={customStyles}
      className='w-full text-sm'
    />
  );
};

export default SelectMembers;
