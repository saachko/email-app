import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import { User, UserSelect } from 'utils/interfaces';

import { logInUser } from '../utils/api';

interface RecipientInputProps {
  users: User[];
}

function RecipientInput({ users }: RecipientInputProps) {
  const optionList: UserSelect[] = users.map((user) => ({
    value: user._id,
    label: user.username,
  }));

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<UserSelect[]>([]);
  const [value, setValue] = useState<UserSelect | null>();

  const createOption = async (username: string) => {
    const newUser = await logInUser({ username });
    return {
      value: newUser.currentUser?._id,
      label: newUser.currentUser?.username,
    };
  };

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(async () => {
      const newOption = await createOption(inputValue);
      setIsLoading(false);
      if (options.length) {
        setOptions((prev) => [...prev, newOption]);
      } else {
        setOptions((prev) => [...prev, ...optionList, newOption]);
      }
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
          options={options.length ? options : optionList}
          value={value}
        />
      </div>
    </div>
  );
}

export default RecipientInput;
