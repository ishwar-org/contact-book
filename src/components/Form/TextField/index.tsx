import classNames from "classnames";
import {
  ChangeEventHandler,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useId,
  useRef,
} from "react";

interface TextFieldProps {
  value: string;
  name: string;
  placeholder: string;
  className?: string;
  label?: ReactNode;
  type?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export interface TextFieldRefProps extends HTMLInputElement {
  focus: () => void;
  clear?: () => void;
}

const TextField = forwardRef<TextFieldRefProps, TextFieldProps>(
  (
    {
      value = "",
      name,
      placeholder = "",
      className,
      label,
      type = "text",
      disabled = false,
      readonly = false,
      error = false,
      helperText = "",
      onChange,
    },
    ref
  ) => {
    const textFieldId = useId();
    const textFieldRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () =>
        ({
          ...textFieldRef.current,
          focus: () => textFieldRef.current?.focus(),
          clear: () => {
            if (textFieldRef.current) {
              textFieldRef.current.value = "";
            }
          },
        } as TextFieldRefProps),
      []
    );

    return (
      <div className={classNames("flex flex-col", className)}>
        {label && (
          <label htmlFor={textFieldId} className="text-gray-600 text-sm">
            {label}
          </label>
        )}
        <input
          className={classNames(
            "border transition-all border-gray-300 hover:border-amber-500 rounded-md py-4 px-4 text-sm focus:border-amber-500 focus-visible:outline-0 focus-visible:outline-yellow-500",
            {
              "border-red-500": error,
            }
          )}
          ref={textFieldRef}
          type={type}
          id={textFieldId}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          readOnly={readonly}
        />
        {helperText && (
          <span
            className={classNames("text-sm", {
              "text-red-500": error,
            })}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);
TextField.displayName = "TextField";
export default TextField;
