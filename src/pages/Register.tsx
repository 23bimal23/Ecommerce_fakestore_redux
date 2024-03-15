import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import Model from "../components/Model";
import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";

type FormInput = {
  email: string;
  password: string;
  repeatPassword: string;
  isChecked: boolean;
};

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};
const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("required")
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    repeatPassword: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    isChecked: yup
      .boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required("required"),
  })
  .required();

const Register = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (
    data: FormInput,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(data);
    navigate("/");
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-md flex-col gap-4 border-2 shadow-lg px-6 py-8 rounded-md text-left w-96"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="email@example.com"
                  autoComplete="email"
                />
              )}
            />
            <span className="text-red-500 text-sm italic">{errors.email?.message}</span>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="password"
                  autoComplete="current-password"
                />
              )}
            />
            <span className="text-red-500 text-sm italic">{errors.password?.message}</span>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirm-password" value="Confirm Password" />
            </div>
            <Controller
              name="repeatPassword"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="confirm password"
                  autoComplete="new-password"
                />
              )}
            />
            <span className="text-red-500 text-sm italic">
              {errors.repeatPassword?.message}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Controller
              name="isChecked"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Checkbox {...field} value={field.value ? "true" : "false"} />
              )}
            />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <p
                className="text-cyan-600 hover:underline dark:text-cyan-500"
                onClick={showModal}
              >
                terms and conditions
              </p>
              <Model isOpenModal={isOpenModal} handleCancel={handleCancel} />
            </Label>
            <span className="text-red-500">{errors.isChecked?.message}</span>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 mr-3 bg-white"
                viewBox="0 0 24 24"
              ></svg>
            )}
            Register
          </Button>
        </form>
      </div>
      <DevTool control={control} />
    </>
  );
};

export default Register;
