import { useState } from "react";

interface InputPasswordProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelvalue: string;
}

export function InputPassword({ value, onChange, labelvalue }: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col mt-4 relative">
      <label style={{ color: "black" }}>{labelvalue}</label>
      <input
        style={{ color: "black" }}
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Sua senha"
        className="border rounded px-3 py-2 w-full pr-10"
        value={value}
        onChange={onChange}
        required
      />
      {/* Botão para mostrar/ocultar senha */}
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-9 text-gray-600"
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>
  );
}
