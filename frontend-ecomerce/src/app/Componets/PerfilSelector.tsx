import React from "react";

interface PerfilSelectorProps{
    value: string;
    onChange: (value: string)=> void;
}

export default function PerfilSelector({ value, onChange }:PerfilSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2" style={{ color: "black" }}>
        Tipo de Perfil
      </h3>
      <div className="flex gap-8">
        <label className="flex items-center gap-1" style={{ color: "black" }}>
          <input
            style={{ color: "gray" }}
            type="radio"
            name="perfil"
            value="Associado"
            checked={value === "Associado"}
            onChange={(e) => onChange(e.target.value)}
          />
          Associado
        </label>

        <label className="flex items-center gap-1" style={{ color: "black" }}>
          <input
            style={{ color: "gray" }}
            type="radio"
            name="perfil"
            value="Dependente"
            checked={value === "Dependente"}
            onChange={(e) => onChange(e.target.value)}
          />
          Dependente
        </label>
      </div>
    </div>
  );
}
