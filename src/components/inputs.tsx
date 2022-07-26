import { useEffect, useState } from "react";

interface ToggleableInputProps { value: string; onChangeValue: (value: string) => void; onDelete: () => void; }

export function ToggleableInput({ value, onChangeValue, onDelete }: ToggleableInputProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value);
  };

  const handleOpen = () => {
    setIsEditing(true);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === "Escape") {
      setIsEditing(false);
    } else if ((e.key === "Backspace" || e.key === "Delete") && e.currentTarget.value === "") {
      onDelete();
    }
  };

  useEffect(() => {
    if (value === "") {
      handleOpen();
    }
  }, [value]);

  if (isEditing) {
    return <input className="px-2 flex border-2 rounded-lg w-full input input-sm input-bordered" onKeyUp={handleKeyUp} value={value} onChange={handleChange} autoFocus />;
  }

  return <span className="w-full h-full min-h-6" onClick={handleOpen}>{value}</span>;
}
