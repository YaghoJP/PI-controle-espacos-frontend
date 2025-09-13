"use client"; // isso faz o componente ser Client e aceitar handlers

import HearderCreate from "../Componets/Header";
import { Buttons } from "../Componets/Buttons";
import { TermsOfService } from "../Componets/TermsOfService";
import PerfilSelector from "../Componets/PerfilSelector";
import { InputTextEmail } from "../Componets/InputTextEmail";
import { InputPassword } from "../Componets/InputPassword";

export default function Cadastro() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label style={{ color: "black" }}>Nome</label>
              <input
                style={{ color: "black" }}
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={undefined}
                onChange={undefined}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label style={{ color: "black" }}>Sobrenome</label>
              <input
                style={{ color: "black" }}
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={undefined}
                onChange={undefined}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label style={{ color: "black" }}>CPF</label>
              <input
                style={{ color: "black" }}
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                value={undefined}
                onChange={undefined}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label style={{color: "black"}}>Telefone</label>
              <input
                style={{ color: "black" }}
                type="text"
                name="telefone"
                placeholder="(00) 00000-0000"
                value={undefined}
                onChange={undefined}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
          </div>
          <InputTextEmail value="" setChange={() => {}} />
          <div className="flex flex-row gap-4 mt-4">
            <InputPassword value="12356" labelvalue="Senha" onChange={()=>{}}/>
            <InputPassword value="12356" labelvalue="Confirmar Senha" onChange={()=>{}}/>
          </div>
          
        </div>
        {/* Tipo de Perfil */}
        <PerfilSelector value="" onChange={() => {}} />
        {/* Termos de Serviço e Botões */}
        <TermsOfService />
        <Buttons onChangeBack={() => {}} onSubmit={() => {}} />
      </form>
    </div>
  );
}
