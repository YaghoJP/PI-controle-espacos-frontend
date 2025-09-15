import { ChangeEvent } from "react";

interface InputTextProps{
    value: string;
    setChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export function InputTextEmail({value , setChange}:InputTextProps) {
  return (
    <div className="flex flex-col mt-4">
      <label style={{ color: "black" }}>Email</label>
      <input
        style={{ color: "black" }}
        type="email"
        name="email"
        placeholder="seu@email.com"
        value={value}
        onChange={setChange}
        className="border rounded px-3 py-2 w-full"
        required
      />
    </div>
  );
}
