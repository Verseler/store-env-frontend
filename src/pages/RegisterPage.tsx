import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(form);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 my-10 mx-auto">
      <h1 className="text-center text-xl font-bold">Register</h1>
      <div className="space-y-2">
        <Label>Display Name</Label>
        <Input
          value={form.name}
          onChange={(e) =>
            setForm((prevForm) => ({ ...prevForm, name: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          value={form.email}
          onChange={(e) =>
            setForm((prevForm) => ({ ...prevForm, email: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          value={form.password}
          onChange={(e) =>
            setForm((prevForm) => ({ ...prevForm, password: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Confirm Password</Label>
        <Input
          value={form.password_confirmation}
          onChange={(e) =>
            setForm((prevForm) => ({
              ...prevForm,
              password_confirmation: e.target.value,
            }))
          }
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
