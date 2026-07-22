import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import {
  Button,
  Card,
  FormField,
  Input,
} from "@/components/ui";

import {
  type LoginFormData,
  loginSchema,
} from "@/features/auth/validation";

import { useLoginMutation } from "@/api/auth/authApi";

import { useAppDispatch } from "@/store/hooks";

import { setCredentials } from "@/store/slices/authSlice";

function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [
    login,
    {
      isLoading,
      isSuccess,
      data,
      error,
    },
  ] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    values: LoginFormData
  ) => {
    try {
      await login(values).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setCredentials({
          token: data.token,
          user: data.user,
        })
      );

      toast.success("Login Successful");

      navigate("/");
    }
  }, [
    isSuccess,
    data,
    dispatch,
    navigate,
  ]);

  useEffect(() => {
    if (error) {
      toast.error("Invalid email or password");
    }
  }, [error]);

  return (
    <Card>
      <h1 className="mb-6 text-3xl font-bold">
        Login
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormField label="Email">
          <Input
            type="email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </FormField>

        <FormField label="Password">
          <Input
            type="password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </FormField>

        <Button
          type="submit"
          loading={isLoading}
          className="w-full"
        >
          Login
        </Button>
      </form>
    </Card>
  );
}

export default LoginPage;