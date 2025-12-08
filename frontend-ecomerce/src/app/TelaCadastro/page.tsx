"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handlerCreateUser } from "../Service/service";
import NavbarAdmin from "../Componets/NavbarAdmin";
import Swal from "sweetalert2";

export default function Cadastro() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ASSOCIADO",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  function validate() {
    if (!formData.name.trim()) return "O nome é obrigatório.";
    if (!formData.email.includes("@")) return "Digite um e-mail válido.";
    if (formData.password.length < 6) return "A senha deve ter no mínimo 6 caracteres.";
    if (formData.password !== formData.confirmPassword)
      return "As senhas não coincidem.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const msg = validate();
    if (msg) {
      Swal.fire({
        icon: "error",
        title: "Erro no formulário",
        text: msg,
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    setIsLoading(true);

    try {
      await handlerCreateUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      Swal.fire({
        icon: "success",
        title: "Conta criada!",
        text: "O usuário foi cadastrado com sucesso.",
        confirmButtonColor: "#2563eb",
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "ASSOCIADO",
      });

      setTimeout(() => router.push("/TelaLogin"), 1500);

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar",
        text: err?.message || "Tente novamente mais tarde.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* NAVBAR ADICIONADO */}
      <NavbarAdmin />

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">Criar Usuário</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-6"
        >
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Ex: João da Silva"
              required
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="email@exemplo.com"
              required
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Senha
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Crie uma senha"
              required
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-blue-600 text-sm mt-1"
            >
              {showPassword ? "Ocultar senha" : "Mostrar senha"}
            </button>
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Confirmar Senha
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Repita a senha"
              required
              className={`w-full p-3 border rounded-xl outline-none transition
                ${
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                    ? "border-red-300 focus:ring-red-200 focus:border-red-500"
                    : "border-slate-300 focus:ring-blue-500"
                }
              `}
            />
          </div>

          <hr className="border-slate-100" />

          {/* Botões */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 rounded-xl shadow-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold transition disabled:opacity-50"
            >
              {isLoading ? "Cadastrando..." : "Criar Conta"}
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() =>
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  role: "ASSOCIADO",
                })
              }
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold transition"
            >
              Limpar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
