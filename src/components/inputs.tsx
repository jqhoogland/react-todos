import React, { useRef, useState } from 'react';

interface ToggleableInputProps { value: string; onChangeValue: (value: string) => void; onDelete: () => void; }

export function ToggleableInput({ value, onChangeValue, onDelete }: ToggleableInputProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'Escape') {
      setIsEditing(false);
    } else if ((e.code === 'Backspace' || e.code === "Delete") && e.target.value === '') {
      onDelete();
    }
  };
  const handleOpen = () => {
    setIsEditing(true);
  };

  React.useEffect(() => {
    if (value === "") {
      handleOpen();
    }
  }, [value]);

  React.useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  if (isEditing) {
    return <input ref={ref} className="input input-bordered input-sm w-full" defaultValue={value} onChange={handleChange} onKeyDown={handleKeyDown} />;
  }

  return <span className="w-full h-full min-h-6" onClick={handleOpen}>{value}</span>;
}
