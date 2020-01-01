import React from "react";
import * as styles from "./TextInput.module.scss";

interface TextInputProps {
  name: string;
  placeholder: string;
  handleUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: React.ComponentType<any>;
}

const TextInput = ({
  name,
  placeholder,
  handleUpdate,
  Icon,
}: TextInputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {Icon && <Icon className={styles.icon} />}
      <input
        placeholder={placeholder}
        type="text"
        name={name}
        onChange={handleUpdate}
      />
    </div>
  );
};

export default TextInput;
