"use client";

import { useState } from "react";
import { handlerCreateReservation } from "../Service/service";

interface ReservationPopupProps {
  open: boolean;
  user_id?: number | null;
  space_id?: number;
  onClose: () => void;
  onSuccess?: () => void; // opcional: recarregar lista, mostrar toast etc.
}

export default function ReservationPopup({
  user_id,
  space_id,
  open,
  onClose,
  onSuccess,
}: ReservationPopupProps) {
  const [startTime, setStartTime] = useState(""); // ex: "2025-12-11T14:00"
  const [endTime, setEndTime] = useState("");     // ex: "2025-12-11T16:00"
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null; // não renderiza se não estiver aberto

  const handleConfirm = async () => {
    if (!startTime || !endTime) {
      alert("Preencha os horários de início e término.");
      return;
    }

    if (!user_id || !space_id) {
      alert("Erro interno: usuário ou espaço não informado.");
      return;
    }

    // Validação básica: fim depois do início
    if (new Date(endTime) <= new Date(startTime)) {
      alert("O horário de término deve ser depois do horário de início.");
      return;
    }

    try {
      setIsLoading(true);

      // startTime e endTime vêm no formato "YYYY-MM-DDTHH:MM"
      const startDate = new Date(startTime);
      const endDate = new Date(endTime);

      // Extrair só a parte da data para usar como reservation_date
      // "2025-12-11T14:00" -> "2025-12-11"
      const [datePart] = startTime.split("T");
      const reservationDate = new Date(`${datePart}T00:00:00`);

      // Montar o payload exatamente como o backend espera
      await handlerCreateReservation({
        user_id,
        space_id,
        reservation_date: reservationDate.toISOString(),
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        status: "pending",
        approved_by: null,
        rejection_reason: null,
      });

      alert("Reserva criada com sucesso!");

      setStartTime("");
      setEndTime("");

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Erro ao criar reserva:", err);
      alert(err?.message || "Erro ao criar a reserva. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4 text-center text-black">
          Agendar Reserva
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium block text-black">
              Horário de Início
            </label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1 
                         focus:ring focus:ring-blue-400 outline-none text-black"
            />
          </div>

          <div>
            <label className="text-sm font-medium block text-black">
              Horário de Término
            </label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-1 
                         focus:ring focus:ring-blue-400 outline-none text-black"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isLoading ? "Salvando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
