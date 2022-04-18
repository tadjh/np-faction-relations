export interface RequiredTextProps {
  label: string;
  isRequired?: boolean;
}

function RequiredText({ label, isRequired = true }: RequiredTextProps) {
  if (!isRequired) return <>{label}</>;
  return (
    <>
      <span>{label}</span>
      <span className="align-top text-[7px]">*</span>
    </>
  );
}

export default RequiredText;
