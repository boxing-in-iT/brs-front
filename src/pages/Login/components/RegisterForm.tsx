import { FC } from "react";
import useAuthStore from "../../../store/auth-store";

import { Form, FormikConfig, FormikProvider, useFormik } from "formik";
import { IRegisterFormikValues } from "./types";
import { REGISTER_FORM_FIELDS, REGISTER_INITIAL_VALUES } from "./constants";
import { RenderFormFields } from "../../../components/RenderFormFields";
import { Button } from "../../../components/Button";
import { ButtonVariants } from "../../../components/Button/types";
import { Sizes } from "../../../@types/sizes";

interface Props {
  setActiveForm: (form: "login" | "register") => void;
}

export const RegistrationForm: FC<Props> = ({ setActiveForm }) => {
  const register = useAuthStore((state) => state.register);

  const formikProps: FormikConfig<IRegisterFormikValues> = {
    initialValues: REGISTER_INITIAL_VALUES,
    // validationSchema: AUTH_FORM_VALIDATION_SCHEMA,
    onSubmit: async (values) => {
      try {
        const fullValues = {
          ...values,
        };

        const response = await register(fullValues, () => {
          setActiveForm("login");
        });

        console.log(response);

        // formik.resetForm();
      } catch (err) {
        console.error("Registration failed:", err);
      }
    },
  };

  const formik = useFormik(formikProps);

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center mt-10">
      <h1 className="font-manrope font-semibold text-3xl leading-[130%] tracking-normal">
        Welcome!
      </h1>
      {/* <AuthGoogleButton /> */}
      <div className="relative w-[400px] lg:w-[500px] flex items-center">
        <div
          className="w-full border-t-3 border-dashed border-gray-400"
          style={{ borderSpacing: "4px" }}
        ></div>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-gray-500 text-sm">
          Or, Sign in with email
        </span>
      </div>
      <FormikProvider value={formik}>
        <Form className="w-[400px] lg:w-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {REGISTER_FORM_FIELDS.map((field) => (
              <div
                key={field.name}
                className={
                  field.name === "email" || field.name === "phone_number"
                    ? "col-span-2"
                    : "md:col-span-2"
                }
              >
                <RenderFormFields fields={[field]} />
              </div>
            ))}
          </div>

          <Button
            variant={ButtonVariants.SECONDARY}
            size={Sizes.M}
            className="w-full mt-5"
            type="submit"
          >
            Sign In
          </Button>
          <p
            className="font-poppins font-normal text-sm leading-[150%] tracking-normal text-center"
            onClick={() => setActiveForm("login")}
          >
            Already have an account?
            <span className="font-poppins font-semibold text-sm leading-[150%] tracking-normal text-center text-[#4e9ee9] mt-2 cursor-pointer">
              Log in
            </span>
          </p>
        </Form>
      </FormikProvider>
    </div>
  );
};
