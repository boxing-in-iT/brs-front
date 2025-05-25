import { FC, KeyboardEvent } from "react";
import cn from "classnames";
import { useField, useFormikContext } from "formik";

import { TEXT_INPUT_STYLE_VARIANTS } from "./constants";
import { FormFieldVariants } from "./types";
import { FormField } from ".";
import { IFormField } from "../../@types/form";
import PhoneInput from "react-phone-number-input/input";

export const TextInput: FC<IFormField> = ({
  className,
  fieldClassName,
  labelClassName,
  id,
  label,
  variant = FormFieldVariants.PRIMARY,
  placeholder,
  isTextArea = false,
  type,
  mask,
  rows,
  maxLength,
  minLength,
  required,
  autoComplete,
  disabled,
  ...props
}) => {
  const fieldId = id || props.name;
  const { handleSubmit } = useFormikContext();
  const [{ value, onChange, ...field }, { error, touched }, { setValue }] =
    useField(fieldId);
  const isShownError = Boolean((touched || value) && error);

  const onKeyDownEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !isTextArea) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const combinedClassNames = cn(
    "w-full outline-none",
    TEXT_INPUT_STYLE_VARIANTS[variant],
    className,
    {
      "resize-y min-h-[120px]": isTextArea,
      "!border-red-base": isShownError,
      "opacity-50 cursor-not-allowed": disabled,
    }
  );

  const isTelField = type === "tel";

  const onChangePhoneValue = (inputValue: string | undefined) => {
    setValue(inputValue || "");
  };

  const textareaProps = isTextArea
    ? {
        rows: rows || 4,
        style: { whiteSpace: "pre-wrap" as const },
        maxLength,
        minLength,
      }
    : {};

  const inputProps = {
    id: fieldId,
    className: combinedClassNames,
    value: value || "",
    placeholder,
    onChange: isTelField ? undefined : onChange,
    onKeyDown: onKeyDownEnter,
    maxLength: isTelField ? 20 : maxLength,
    minLength,
    required,
    autoComplete,
    disabled,
    ...field,
    ...props,
    ...textareaProps,
    ...(mask && { mask }),
  };

  const phoneInputProps = {
    id: fieldId,
    className: combinedClassNames,
    value: value || "",
    placeholder,
    onChange: onChangePhoneValue,
    onKeyDown: onKeyDownEnter,
    maxLength: 20,
    required,
    autoComplete,
    disabled,
    name: field.name,
  };

  return (
    <FormField
      className={fieldClassName}
      labelClassName={labelClassName}
      variant={variant}
      label={label}
      labelFor={fieldId}
      isShownError={isShownError}
      error={error}
    >
      {isTelField ? (
        <PhoneInput {...phoneInputProps} />
      ) : isTextArea ? (
        <textarea {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}
    </FormField>
  );
};
