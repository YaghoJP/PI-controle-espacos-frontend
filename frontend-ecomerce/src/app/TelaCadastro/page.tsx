"use client";

import HearderCreate from "../Componets/Header";
import { Buttons } from "../Componets/Buttons";
import { TermsOfService } from "../Componets/TermsOfService";
import { InputTextEmail } from "../Componets/InputTextEmail";
import { InputPassword } from "../Componets/InputPassword";
import { handlerCreateUser } from "../Service/service";
import { useRouter } from "next/navigation";
import React from "react";
import NavbarAdmin from "../Componets/NavbarAdmin";

export default function Cadastro() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<{
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
    role: string;
  }>({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "ASSOCIADO",
  });

  const handlerBack = () => {
    router.back();
  };

const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
  if (e) e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmpassword ||
    formData.password.length < 6
  ) {
    alert("Por favor, preencha todos os campos corretamente (senha >= 6 caracteres).");
    return;
  }

  if (formData.password !== formData.confirmpassword) {
    alert("As senhas não coincidem.");
    return;
  }

  setIsLoading(true);
  try {
    const result = await handlerCreateUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });

    alert("Usuário cadastrado com sucesso!");

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      role: "ASSOCIADO",
    });

    router.push("/TelaLogin");
  } catch (err: any) {
    const message = err?.message ?? "Erro ao cadastrar usuário. Verifique os dados e tente novamente.";
    console.error("Erro ao criar usuário:", err);
    alert(message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <NavbarAdmin />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-12 w-full max-w-md"
        >
          <HearderCreate />

          <div className="mb-10">
            <h3 className="font-semibold mb-2 text-gray-900">Informações Pessoais</h3>

            <div className="flex flex-col mb-4">
              <label className="text-sm text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-gray-200 rounded px-3 py-2 w-full text-gray-900 placeholder-gray-600 bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white"
                required
              />
            </div>

            <InputTextEmail
              value={formData.email}
              setChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div className="flex flex-row gap-4 mt-4">
              <InputPassword
                value={formData.password}
                labelvalue="Senha"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <InputPassword
                value={formData.confirmpassword}
                labelvalue="Confirmar Senha"
                onChange={(e) =>
                  setFormData({ ...formData, confirmpassword: e.target.value })
                }
              />
            </div>
          )}

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

          <TermsOfService />
          <Buttons onChangeBack={handlerBack} onSubmit={handleSubmit} />
        </form>
      </div>
    </>
  );
}
