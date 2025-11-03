"use client";

import { useState } from "react";
import { handlerCreateReservation } from "../Service/service";
interface ReservationPopupProps {
  open: boolean;
  user_id?: number;
  space_id?: number;
  onClose: () => void;
  onConfirm: (start: string, end: string) => void;
}

export default function ReservationPopup({
  user_id,
  space_id,
  open,
  onClose,
}: ReservationPopupProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dataReserva, setDataReserva] = useState("");
  if (!open) return null; // não renderiza se não estiver aberto

  const handleConfirm = () => {
    if (!startTime || !endTime) {
      return;
    }
    const startISO = new Date(startTime).toISOString();
    const endISO = new Date(endTime).toISOString();
    const horaAtual = new Date().toISOString();

    handlerCreateReservation(space_id, startISO, endISO, horaAtual);
    setStartTime("");
    setEndTime("");
    setDataReserva("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80">
        <h2
          className="text-lg font-semibold mb-4 text-center"
          style={{ color: "black" }}
        >
          Agendar Reserva
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <label
              className="text-sm font-medium block"
              style={{ color: "black" }}
            >
              Horário de Início
            </label>
            <input
              type="datetime-local"
              style={{ color: "black" }}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 w-full border border-black rounded-lg px-2 py-1 focus:ring focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium block"
              style={{ color: "black" }}
            >
              Horário de Término
            </label>
            <input
              style={{ color: "black" }}
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 w-full border border-black rounded-lg px-2 py-1 focus:ring focus:ring-blue-400 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            style={{ background: "#D1D5DB" }}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
