import { FC, ReactNode } from "react";
import cn from "classnames";

import { FORM_FIELD_STYLE_VARIANTS } from "./constants";

import { FormFieldVariants } from "./types";
import { Label } from "./Label";

interface Props {
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  variant?: FormFieldVariants;
  label?: string;
  labelFor: string;
  isShownError?: boolean;
  error?: string;
}

export const FormField: FC<Props> = ({
  children,
  className,
  labelClassName,
  variant,
  label,
  labelFor,
}) => {
  const combinedClassNames = cn(
    "relative w-full",
    variant ? FORM_FIELD_STYLE_VARIANTS[variant] : "", // Fallback to empty string if undefined
    className,
    { "flex flex-col gap-1.5": label }
  );
  return (
    <div className={combinedClassNames}>
      {label && (
        <Label className={labelClassName} variant={variant} htmlFor={labelFor}>
          {label}
        </Label>
      )}
      {children}
      {/* <Error isShownError={isShownError}>{error}</Error> */}
    </div>
  );
};
