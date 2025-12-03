"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { API_BASE_URL } from "../Service/localhost";

interface Space {
  id: number;
  name: string;
  imageUrl?: string | null;
}

interface NewReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function NewReservationModal({
  isOpen,
  onClose,
  onCreated
}: NewReservationModalProps) {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [people, setPeople] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    fetchSpaces();
  }, [isOpen]);

  const fetchSpaces = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/spaces`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });

      const json = await res.json();
      const list = json.data ?? json;

      const normalized = list.map((s: any) => ({
        id: s.id,
        name: s.name ?? "Espaço",
        imageUrl: s.imageUrl ?? s.image_url ?? s.photo ?? null
      }));

      setSpaces(normalized);
    } catch (err) {
      console.log("Erro ao carregar espaços", err);
    }
  };

  const validateTimes = () => {
    if (!startTime || !endTime) return false;

    if (startTime >= endTime) {
      alert("A hora inicial não pode ser maior ou igual à final.");
      return false;
    }

    const [h1, m1] = startTime.split(":").map(Number);
    const [h2, m2] = endTime.split(":").map(Number);

    const ini = h1 * 60 + m1;
    const fim = h2 * 60 + m2;

    // Evento mínimo = 1 hora
    if (fim - ini < 60) {
      alert("A reserva precisa ter pelo menos 1 hora.");
      return false;
    }

    // Intervalos de 30 em 30 minutos
    if ((fim - ini) % 30 !== 0) {
      alert("Horários precisam obedecer intervalos de 30 minutos.");
      return false;
    }

    return true;
  };


  const handleSubmit = async () => {
    if (!selectedSpace || !date || !startTime || !endTime) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (!validateTimes()) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          space_id: selectedSpace,
          date,
          start_time: startTime,
          end_time: endTime,
          people: Number(people),
          description
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || "Erro ao criar reserva.");
        return;
      }

      alert("Reserva criada com sucesso!");
      onClose();
      onCreated && onCreated();
    } catch (err) {
      alert("Erro ao criar reserva.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-6 relative animate-fadeIn">

        {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-800 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold text-slate-900 mb-4">
          Nova Reserva
        </h2>

        {/* FORM */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Data *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Início *</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Fim *</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* LISTA DE ESPAÇOS */}
        <div className="mt-6 mb-4">
          <label className="text-sm font-medium text-slate-700">
            Espaços
          </label>

          {spaces.length === 0 ? (
            <p className="text-sm text-slate-500 mt-2">
              Nenhum espaço encontrado.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-3">
              {spaces.map((space) => (
                <button
                  key={space.id}
                  onClick={() => setSelectedSpace(space.id)}
                  className={`rounded-xl border overflow-hidden transition shadow-sm hover:shadow 
                    ${selectedSpace === space.id
                      ? "border-blue-600 ring-2 ring-blue-300"
                      : "border-slate-300"
                    }`}
                >
                  <div className="w-full h-28 bg-slate-200">
                    <Image
                      src={space.imageUrl || "/default_space.jpg"}
                      alt={space.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-2 text-sm font-medium text-slate-800 text-center">
                    {space.name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* BOTÃO */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all"
        >
          {isSubmitting ? "Enviando..." : "Criar Reserva"}
        </button>

      </div>
    </div>
  );
}
