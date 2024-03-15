import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

type dataType ={
  email:string,
  password:string
}
const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("required")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
});
const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data:dataType, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usercredentials = {
      email: data.email,
      password:data.password
    };
    localStorage.setItem("userCredentials", JSON.stringify(usercredentials))
    navigate("/")
  };
  return (
    <>
    
      <Card className="max-w-sm text-left w-96">
        <form
          className="flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="name@example.com"
                  autoComplete="email"
                />
              )}
            />
            <span className="text-red-500 text-sm italic">{errors?.email?.message}</span>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="password"
                  autoComplete="password"
                />
              )}
            />
            <span className="text-red-500 text-sm italic">{errors?.password?.message}</span>

          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <Button type="submit" className="w-fit" disabled={isSubmitting}>
              {isSubmitting && (
                <svg
                  className="animate-spin h-5 w-5 mr-3 bg-white"
                  viewBox="0 0 24 24"
                ></svg>
              )}
              Submit
            </Button>
            <Link to="/register" className="text-sky-700/100 italic text-sm">
              Register Now
            </Link>
          </div>
        </form>
        <DevTool control={control}/>
      </Card>
    </>
  );
};
export default Login;
