import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import { User, UserSelect } from 'utils/interfaces';

interface RecipientInputProps {
  users: User[];
}

function RecipientInput({ users }: RecipientInputProps) {
  const optionList: UserSelect[] = users.map((user) => ({
    value: user._id,
    label: user.username,
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<UserSelect[]>(optionList);
  const [value, setValue] = useState<UserSelect | null>();

  const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-container">
        <CreatableSelect
          isClearable
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={(newValue) => setValue(newValue)}
          onCreateOption={handleCreate}
          options={options}
          value={value}
        />
      </div>
    </div>
  );
}

export default RecipientInput;
