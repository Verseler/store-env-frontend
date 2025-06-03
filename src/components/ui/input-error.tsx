import type { PropsWithChildren } from "react";

export default function InputError({ children }: PropsWithChildren) {
  if (!children) return;

  return <p className="text-red-500 text-xs">{children}</p>;
}
