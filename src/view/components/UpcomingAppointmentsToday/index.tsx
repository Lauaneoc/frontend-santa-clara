import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface Appointment {
  id: number;
  id_doctor: number;
  id_enterprise: number;
  id_patient: number;
  tipoExame: string;
  dataAgendamento: string;
  dataAvaliacao: string | null;
  dataRealizacaoExame: string | null;
  dataSolicitacao: string;
  status: string;
  observacoes: string | null;
  parecer: string | null;
}

interface UpcomingAppointmentsTodayProps {
  appointments: Appointment[];
}

const UpcomingAppointmentsToday: React.FC<UpcomingAppointmentsTodayProps> = ({ appointments }) => {
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>(appointments);

  // Função para marcar o agendamento como realizado
  const handleMarkAsDone = (appointmentId: number) => {
    setAppointmentsList((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "Realizado" }
          : appointment
      )
    );
  };

  return (
    <div className="appointments-today p-4 rounded-lg bg-white">
      <h3 className="text-xl font-semibold mb-4 text-center">Agendamentos de hoje</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Paciente</th>
            <th className="px-4 py-2 text-left">Especialidade</th>
            <th className="px-4 py-2 text-left">Hora</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {appointmentsList.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center">
                Nenhum agendamento para hoje.
              </td>
            </tr>
          ) : (
            appointmentsList.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{appointment.id_patient}</td>
                <td className="px-4 py-2">{appointment.tipoExame}</td>
                <td className="px-4 py-2">
                  {new Date(appointment.dataAgendamento).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-2">{appointment.status}</td>
                <td className="px-4 py-2 text-center">
                  {appointment.status !== "Realizado" ? (
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-500 cursor-pointer hover:scale-110"
                      onClick={() => handleMarkAsDone(appointment.id)}
                      title="Marcar como Realizado"
                    />
                  ) : (
                    <span className="text-green-500">Realizado</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingAppointmentsToday;
