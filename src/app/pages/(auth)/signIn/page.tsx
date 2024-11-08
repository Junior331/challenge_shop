"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import signInSchema from "./schema";
import { icons } from "@/app/assets/icons";
import { images } from "@/app/assets/images";
import { Button, Input } from "@/app/components/elements";
import { SnackbarContext } from "@/app/contexts/Snackbar";
import { LayoutAbstract } from "@/app/components/organism";
import { signIn } from "./services";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      await signIn({
        email,
        router,
        password,
        setLoading,
        setSnackbar,
      });
    },
    validationSchema: signInSchema,
  });
  const { values, touched, errors, handleSubmit, handleChange } = formik;

  return (
    <LayoutAbstract>
      <form className="w-full h-auto flex flex-col" onSubmit={handleSubmit}>
        <Image
          alt="Image logo"
          src={images.logoOutline}
          className="max-w-[70%] mx-auto my-0"
        />
        <div>
          <h2 className="w-auto text-[#5E5873] text-[20px] font-semibold">
            Welcome to Shop
          </h2>
          <p className="text-[#6E6B7B] max-w-72 text-[14px]">
            Please sign-in to your account and start the experience
          </p>
        </div>

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
          name={"password"}
          label="Password"
          value={values.password}
          onChange={handleChange}
          helperText={errors.password}
          placeholder={"Type here..."}
          type={passwordShow ? "text" : "password"}
          error={touched.password && Boolean(errors.password)}
        >
          <div>
            {passwordShow ? (
              <Image
                alt="Image eye-slash"
                src={icons.eye_slash}
                className="size-5 cursor-pointer opacity-50"
                onClick={() => setPasswordShow((prev) => !prev)}
              />
            ) : (
              <Image
                alt="Image eye"
                src={icons.eye}
                className="size-5 cursor-pointer opacity-50"
                onClick={() => setPasswordShow((prev) => !prev)}
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
          Login
        </Button>

        <div className="flex items-center justify-center gap-1 mt-5">
          <p>Não tem uma conta?</p>
          <p
            className="text-link cursor-pointer"
            onClick={() => router.push("/pages/signUp")}
          >
            Cadastrar-se
          </p>
        </div>
      </form>
    </LayoutAbstract>
  );
}
