"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { ImagePathInput } from "../Componets/FileInput";
import Navbar from "../Componets/NavbarAdmin";
import { handlerCreateSpace } from "../Service/service";

export interface Space {
  id?: number;
  name: string;
  description: string;
  capacity: number;
  available: boolean;
  imageUrl?: string | null;
}

export default function CreateSpacePage() {
  const [form, setForm] = useState<Space>({
    name: "",
    description: "",
    capacity: 0,
    available: true,
    imageUrl: null,
  });

  const [loading, setLoading] = useState(false);
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

    const validationError = validate();
    if (validationError) {
      Swal.fire({
        icon: "warning",
        title: "Campos inválidos",
        text: validationError,
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...form,
        imageUrl: imagePath || null,
      };

      await handlerCreateSpace(payload);

      Swal.fire({
        icon: "success",
        title: "Espaço criado!",
        text: "O espaço foi cadastrado com sucesso.",
        confirmButtonColor: "#2563eb",
      });

      setForm({
        name: "",
        description: "",
        capacity: 0,
        available: true,
        imageUrl: null,
      });
      setImagePath("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

      Swal.fire({
        icon: "error",
        title: "Erro ao criar espaço",
        text: message || "Ocorreu um erro inesperado.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-slate-800">
          Criar Novo Espaço
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-6"
        >
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nome do Espaço
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Ex: Salão de Festas Principal"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Descrição
            </label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Descreva os detalhes do espaço..."
              required
            />
          </div>

          {/* Capacidade + Imagem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Capacidade (pessoas)
              </label>
              <input
                type="number"
                value={form.capacity}
                onChange={(e) =>
                  handleChange("capacity", Number(e.target.value))
                }
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                min={1}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Imagem do Espaço
              </label>
              <div className="border border-slate-300 rounded-xl p-1">
                <ImagePathInput
                  onImageSelect={setImagePath}
                  value={imagePath}
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Botões */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl shadow-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Criar Espaço"}
            </button>

            <button
              type="button"
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-all"
              onClick={() => {
                setForm({
                  name: "",
                  description: "",
                  capacity: 0,
                  available: true,
                  imageUrl: null,
                });
                setImagePath("");

                Swal.fire({
                  icon: "info",
                  title: "Formulário limpo",
                  text: "Os campos foram resetados.",
                });
              }}
              disabled={loading}
            >
              Limpar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
