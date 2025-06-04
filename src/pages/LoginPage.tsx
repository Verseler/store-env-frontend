import type { LoginForm } from "@/features/auth/auth.types";
import React, { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/ui/input-error";
import { useLogin } from "@/features/auth/api/useLogin";
import { useGoogleLogin } from "@/features/auth/api/useGoogleLogin";

export default function LoginPage() {
  const { data } = useGoogleLogin();
  const { mutate, error, isPending } = useLogin();
  const serverErrors = (error as Partial<LoginForm>) || {
    email: "",
    password: "",
  };

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  }

  async function onLogin(e: FormEvent) {
    e.preventDefault();

    mutate(form);
  }

  return (
    <form onSubmit={onLogin} className="max-w-md space-y-4 my-10 mx-auto">
      <h1 className="text-center text-xl font-bold">Login</h1>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          name="email"
          value={form.email}
          onChange={handleOnChange}
          invalid={!!serverErrors?.email}
          disabled={isPending}
        />
        <InputError>{serverErrors?.email}</InputError>
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          name="password"
          value={form.password}
          onChange={handleOnChange}
          invalid={!!serverErrors?.password}
          disabled={isPending}
        />
        <InputError>{serverErrors?.password}</InputError>
      </div>

      {data?.url != null && (
        <a href={data.url} className="border py-2 px-4 rounded-md">
          Google Sign In
        </a>
      )}

      <Button type="submit" disabled={isPending}>
        Submit
      </Button>
    </form>
  );
}
