interface PersonalFormElementProps {
  label: string;
  data: string[];
  type: string;
  errors: any;
  register: any;
  setValue: any;
}

const PersonalFormElement = ({
  label,
  data,
  type,
  register,
  errors,
  setValue,
}: PersonalFormElementProps): JSX.Element => {
  const handleClick = (e: any, personal: string) => {
    setValue(personal as any, e.target.innerHTML);
  };
  return (
    <>
      <label htmlFor={type}>{label}</label>
      {data.map((trait: string) => (
        <p key={trait} onClick={(e) => handleClick(e, type)}>
          {trait}
        </p>
      ))}
      <textarea {...register(type)}></textarea>
      <p>{errors.traits?.message}</p>
    </>
  );
};

export default PersonalFormElement;
