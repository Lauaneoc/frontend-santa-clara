import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { SchedulingContext } from "../../../@shared/contexts/Scheduling/SchedulingContext";
import { dateLocal } from "../../../@shared/utils/dateLocal";

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
  compareceu: boolean; // Alterado para boolean
}

interface UpcomingAppointmentsTodayProps {
  appointments: Appointment[];
}

const UpcomingAppointmentsToday: React.FC<UpcomingAppointmentsTodayProps> = ({
  appointments,
}) => {
  const [appointmentsList, setAppointmentsList] =
    useState<Appointment[]>(appointments);
  const context = useContext(SchedulingContext);

  if (!context) {
    return <div>Contexto não disponível</div>;
  }

  const { updateComparecer } = context;

  const handleMarkAsDone = (appointmentId: number) => {
    setAppointmentsList((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "Realizado", compareceu: true } // Atualiza o compareceu para true
          : appointment
      )
    );
    updateComparecer(appointmentId.toString()); // Atualiza o comparecer através da função
  };

  return (
    <div className="appointments-today p-4 rounded-lg bg-white">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Agendamentos de hoje
      </h3>
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
                  {(() => {
                    const date = new Date(appointment.dataAgendamento);
                    date.setHours(date.getHours() + 3);

                    console.log("dsdsdsdsds", appointment.dataAgendamento);
                    console.log(dateLocal(date));

                    const hours = date.getHours().toString().padStart(2, "0");
                    const minutes = date
                      .getMinutes()
                      .toString()
                      .padStart(2, "0");
                    return `${hours}:${minutes}`;
                  })()}
                </td>
                <td className="px-4 py-2">{appointment.status}</td>
                <td className="px-4 py-2 text-center">
                  {appointment.compareceu ? (
                    <CheckCircleIconSolid
                      className="h-6 w-6 text-green-500 cursor-pointer hover:scale-110"
                      title="Marcar como Realizado"
                    />
                  ) : (
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-500 cursor-pointer hover:scale-110"
                      onClick={() => handleMarkAsDone(appointment.id)}
                      title="Marcar como Realizado"
                    />
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
