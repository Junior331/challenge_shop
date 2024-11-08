"use client";

import Image from "next/image";
import { useFormik } from "formik";
import signUpSchema from "./schema";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import { signUp } from "./services";
import { icons } from "@/app/assets/icons";
import { images } from "@/app/assets/images";
import { Button, Input } from "@/app/components/elements";
import { LayoutAbstract } from "@/app/components/organism";
import { SnackbarContext } from "@/app/contexts/Snackbar";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ email, name, password }) => {
      await signUp({
        name,
        email,
        router,
        password,
        setLoading,
        setSnackbar,
      });
    },
    validationSchema: signUpSchema,
  });
  const { values, touched, errors, handleSubmit, handleChange } = formik;

  return (
    <LayoutAbstract>
      <form className="w-full h-auto flex flex-col ga" onSubmit={handleSubmit}>
        <Image
          alt="Image logo"
          src={images.logoOutline}
          className="max-w-[70%] mx-auto my-0"
        />
        <div>
          <h2 className="w-auto text-[#5E5873] text-[20px] font-semibold">
            Create an account
          </h2>
          <p className="text-[#6E6B7B] max-w-72 text-[14px]">
            Please sign-up with your account and start the experience
          </p>
        </div>

        <Input
          type={"text"}
          name={"name"}
          label="Name"
          value={values.name}
          onChange={handleChange}
          helperText={errors.name}
          placeholder={"Type here..."}
          error={touched.name && Boolean(errors.name)}
        />
        <Input
          type={"text"}
          name={"email"}
          label="E-mail"
          value={values.email}
          onChange={handleChange}
          helperText={errors.email}
          placeholder={"Type here..."}
          error={touched.email && Boolean(errors.email)}
        />

        <Input
          label="Password"
          name={"password"}
          value={values.password}
          onChange={handleChange}
          helperText={errors.password}
          placeholder={"Type here..."}
          type={showPassword ? "text" : "password"}
          error={touched.password && Boolean(errors.password)}
        >
          <div>
            {showPassword ? (
              <Image
                alt="Image eye-slash"
                src={icons.eye_slash}
                className="size-5 cursor-pointer opacity-50"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <Image
                alt="Image eye"
                src={icons.eye}
                className="size-5 cursor-pointer opacity-50"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
        </Input>

        <Input
          label="Confirm Password"
          onChange={handleChange}
          name={"confirmPassword"}
          placeholder={"Type here..."}
          value={values.confirmPassword}
          helperText={errors.confirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
        >
          <div>
            {showConfirmPassword ? (
              <Image
                alt="Image eye-slash"
                src={icons.eye_slash}
                className="size-5 cursor-pointer opacity-50"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              />
            ) : (
              <Image
                alt="Image eye"
                src={icons.eye}
                className="size-5 cursor-pointer opacity-50"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              />
            )}
          </div>
        </Input>

        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          className="mt-5 btn-primary text-white"
        >
          Register
        </Button>

        <div className="flex items-center justify-center gap-1 mt-5">
          <p>Already have an account?</p>
          <p
            className="text-link cursor-pointer"
            onClick={() => router.push("/")}
          >
            Sign in
          </p>
        </div>
      </form>
    </LayoutAbstract>
  );
}
