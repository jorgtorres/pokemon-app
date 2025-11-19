import React from "react";
import * as styles from "./TextInput.module.scss";
import Close from "../../../assets/close.svg";

interface TextInputProps {
  id: string;
  name: string;
  placeholder: string;
  dataTestId?: string;
  handleUpdate?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: React.ComponentType<any>;
  type?: string;
  isClosable?: boolean;
  onClose?: () => void;
  value?: string;
}

const TextInput = ({
  id,
  name,
  placeholder,
  dataTestId,
  handleUpdate,
  Icon,
  type,
  isClosable,
  onClose,
  value,
}: TextInputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {Icon && <Icon className={styles.icon} />}
      <input
        id={id}
        data-testid={dataTestId}
        placeholder={placeholder}
        type={type ?? "text"}
        name={name}
        value={value}
        onChange={handleUpdate}
      />
      {isClosable && <Close className={styles.closeIcon} onClick={onClose} />}
    </div>
  );
};

export default TextInput;
