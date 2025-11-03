"use client";
import React, { useState } from "react";
import { ImagePathInput } from "../Componets/FileInput";
import Navbar from "../Componets/Navbar";
export interface Space {
  id?: number;
  name: string;
  description: string;
  capacity: number;
  available: boolean;
}

export default function CreateSpacePage() {
  const [form, setForm] = useState<Space>({
    name: "",
    description: "",
    capacity: 0,
    available: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string>("");
  function handleChange<K extends keyof Space>(key: K, value: Space[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  function validate() {
    if (!form.name.trim()) return "Nome é obrigatório.";
    if (!form.description.trim()) return "Descrição é obrigatória.";
    if (!Number.isFinite(form.capacity) || form.capacity <= 0)
      return "Capacidade deve ser maior que 0.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    
    e.preventDefault();

    setError(null);
    setSuccess(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting form:", form);
      // Ajuste a URL da API conforme seu backend
      const res = await fetch("http://localhost:3001/spaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const created = await res.json();
      setSuccess("Espaço criado com sucesso.");
      // limpar o form (opcional)
      setForm({
        name: "",
        description: "",
        capacity: 0,
        available: true,
      });
      console.info("Created space:", created);
    } catch (err) {
      console.error(err);
      setError("Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
    
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4 ">Criar Espaço</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-2xl shadow"
        >
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "black", borderColor: "black" }}
            >
              Clube
            </label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              style={{ color: "black", borderColor: "black" }}
              className="w-full p-2 border rounded-lg"
              placeholder="Nome do espaço"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "black", borderColor: "black" }}
            >
              Descrição
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              style={{ color: "black", borderColor: "black" }}
              className="w-full p-2 border rounded-lg min-h-[100px]"
              placeholder="Descrição curta do espaço"
              required
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 rounded-2xl shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Criar Espaço"}
          </button>

          <div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: "black", borderColor: "black" }}
              >
                Capacidade
              </label>
              <input
                type="number"
                value={form.capacity}
                style={{ color: "black", borderColor: "black" }}
                onChange={(e) => handleChange("capacity", Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
                min={0}
                required
              />
            </div>
          </div>
          <ImagePathInput onImageSelect={setImagePath} value={imagePath} />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-2xl shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Criar Espaço"}
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-2xl border"
              style={{ backgroundColor: "gray" }}
              onClick={() =>
                setForm({
                  name: "",
                  description: "",
                  capacity: 0,
                  available: true,
                })
              }
              disabled={loading}
            >
              Limpar
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </form>
      </div>
    </>
  );
}
