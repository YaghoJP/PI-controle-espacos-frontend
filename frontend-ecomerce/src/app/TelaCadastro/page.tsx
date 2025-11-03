"use client"; // isso faz o componente ser Client e aceitar handlers

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
  const handlerBack = () => {
    router.push("/TelaLogin");
  };
  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmpassword ||
      formData.password.length < 6
    ) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    } else if (formData.password !== formData.password) {
      alert("As senhas não coincidem.");
      return;
    } else {
      handlerCreateUser({
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
    }
  };
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
  return (
    <>
      <NavbarAdmin />
      <div
        className="flex justify-center items-center min-h-screen bg-gray-100"
        style={{ backgroundColor: "black" }}
      >
        <form
          onSubmit={undefined}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <HearderCreate />
          {/* Informações Pessoais */}
          <div className="mb-10">
            <h3 className="font-semibold mb-2" style={{ color: "black" }}>
              Informações Pessoais
            </h3>
            <div className="flex flex-col">
              <label style={{ color: "black" }}>Nome</label>
              <input
                style={{ color: "black" }}
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border rounded px-3 py-2 w-full h-fu"
                required
              />
            </div>

            <InputTextEmail
              value={formData.email}
              setChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <div className="flex flex-row gap-4 mt-4">
              <InputPassword
                value={formData.password}
                labelvalue="Senha"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <InputPassword
                value={formData.confirmpassword}
                labelvalue="Confirmar Senha"
                onChange={(e) =>
                  setFormData({ ...formData, confirmpassword: e.target.value })
                }
              />
            </div>
          </div>
          {/* Termos de Serviço e Botões */}
          <TermsOfService />
          <Buttons onChangeBack={handlerBack} onSubmit={handleSubmit} />
        </form>
      </div>
    </>
  );
}
