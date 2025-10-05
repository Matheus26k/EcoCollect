import { useState } from 'react';

export const usePhoneFormat = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const formatPhone = (input: string) => {
    const numbers = input.replace(/\D/g, '');
    
    const DDD_LENGTH = 2;
    const FIRST_PART_LENGTH = 7;
    const MAX_PHONE_LENGTH = 11;
    
    if (numbers.length <= DDD_LENGTH) {
      return numbers;
    } else if (numbers.length <= FIRST_PART_LENGTH) {
      return `(${numbers.slice(0, DDD_LENGTH)}) ${numbers.slice(DDD_LENGTH)}`;
    } else {
      return `(${numbers.slice(0, DDD_LENGTH)}) ${numbers.slice(DDD_LENGTH, FIRST_PART_LENGTH)}-${numbers.slice(FIRST_PART_LENGTH, MAX_PHONE_LENGTH)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue(formatted);
    return formatted;
  };

  return {
    value,
    onChange: handleChange,
    setValue
  };
};