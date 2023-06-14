interface PersonalFormElementProps {
  label: string;
  data: string[];
  type: string;
  register: any;
  setValue: any;
}

const PersonalFormElement = ({
  label,
  data,
  type,
  register,
  setValue,
}: PersonalFormElementProps): JSX.Element => {
  const handleClick = (e: any, personal: string) => {
    setValue(personal as any, e.target.innerHTML);
  };
  return (
    <>
      <h5>
        {label}
        <br />
        <span>
          (Click on one of the {label.toLowerCase()} in the list below or type
          one yourself)
        </span>
      </h5>
      <textarea {...register(type)}></textarea>
      <ul>
        {data.map((trait: string) => (
          <li key={trait} onClick={(e) => handleClick(e, type)}>
            {trait}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PersonalFormElement;
