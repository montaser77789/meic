"use client";
import { IFormField } from "@/types/app";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { validationErrors } from "@/validation/auth";

interface Props extends IFormField {
  error: validationErrors;
}
interface IState {
  showPassword: boolean;
}

const INITIAL_STATE: IState = { showPassword: false };

const PasswordField = ({
  label,
  name,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
}: Props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { showPassword } = state;
  const handleClickShowPassword = () =>
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="capitalize text-black">
        {label}
      </Label>
      <div className="relative flex items-center">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          autoComplete="off"
          name={name}
          id={name}
          defaultValue={defaultValue}
        />

        <button
          type="button"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          className={`absolute left-3 "
            `}
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4" />
          ) : (
            <EyeIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && error[name] && (
        <p
          className={`text-accent mt-2 text-sm font-medium ${
            error[name] ? "text-destructive" : ""
          }`}
        >
          {error[name]}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
