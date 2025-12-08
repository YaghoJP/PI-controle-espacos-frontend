"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { handlerCreateReservation } from "../Service/service";

interface ReservationPopupProps {
  open: boolean;
  user_id?: number | null;
  space_id?: number;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ReservationPopup({
  user_id,
  space_id,
  open,
  onClose,
  onSuccess,
}: ReservationPopupProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    if (!startTime || !endTime) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha os horários de início e término.",
      });
      return;
    }

    if (!user_id || !space_id) {
      Swal.fire({
        icon: "error",
        title: "Erro interno",
        text: "Usuário ou espaço não informado.",
      });
      return;
    }

    if (new Date(endTime) <= new Date(startTime)) {
      Swal.fire({
        icon: "warning",
        title: "Horário inválido",
        text: "O horário de término deve ser depois do horário de início.",
      });
      return;
    }

    try {
      setIsLoading(true);

      const startDate = new Date(startTime);
      const endDate = new Date(endTime);
      const [datePart] = startTime.split("T");
      const reservationDate = new Date(`${datePart}T00:00:00`);

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

      Swal.fire({
        icon: "success",
        title: "Reserva criada!",
        text: "Sua reserva foi registrada com sucesso.",
        confirmButtonColor: "#2563eb",
      });

      setStartTime("");
      setEndTime("");

      if (onSuccess) onSuccess();
      onClose();

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Erro ao criar reserva",
        text: err?.message || "Ocorreu um erro. Tente novamente.",
        confirmButtonColor: "#dc2626",
      });
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
