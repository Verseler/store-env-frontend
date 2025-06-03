import type { LoginForm } from "@/features/auth/auth.types";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/hooks/useAuth";
import InputError from "@/components/ui/input-error";
import axios from "@/api/axiosConfig";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [loginUrl, setLoginUrl] = useState(null);

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [serverErrors, setServerErrors] = useState<Partial<LoginForm>>({
    email: "",
    password: "",
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors = await login(form.email, form.password);

    if (errors) {
      setServerErrors(errors);
    }
  }

  async function loginWithGoogle() {
    await axios
      .get("/auth/google")
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => setLoginUrl(data.url))
      .catch((error) => console.error("loginWithGoogle", error));
  }

  useEffect(() => {
    loginWithGoogle();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 my-10 mx-auto">
      <h1 className="text-center text-xl font-bold">Login</h1>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          name="email"
          value={form.email}
          onChange={handleOnChange}
          invalid={!!serverErrors.email}
          disabled={loading}
        />
        <InputError>{serverErrors.email}</InputError>
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          name="password"
          value={form.password}
          onChange={handleOnChange}
          invalid={!!serverErrors.password}
          disabled={loading}
        />
        <InputError>{serverErrors.password}</InputError>
      </div>

      {loginUrl != null && (
        <a href={loginUrl} className="border py-2 px-4 rounded-md">
          Google Sign In
        </a>
      )}

      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </form>
  );
}
