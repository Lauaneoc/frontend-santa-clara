import React, { useState } from "react";

interface Appointment {
  id: number;
  patientName: string;
  specialty: string;
  date: string;
  status: string;
}

interface UpcomingAppointmentsTodayProps {
  appointments: Appointment[];
}

const UpcomingAppointmentsToday: React.FC<UpcomingAppointmentsTodayProps> = ({ appointments }) => {
  const today = new Date();
  const [appointmentsList, setAppointmentsList] = useState(appointments);

  // Filtrando os agendamentos de hoje
  const filteredAppointments = appointmentsList.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear()
    );
  });

  // Ordenando os agendamentos pela hora
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

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
    <div className="appointments-today p-4 rounded-lg bg-white shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center">Agendamentos de hoje</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Paciente</th>
            <th className="px-4 py-2 text-left">Especialidade</th>
            <th className="px-4 py-2 text-left">Hora</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedAppointments.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-2 text-center">
                Nenhum agendamento para hoje.
              </td>
            </tr>
          ) : (
            sortedAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{appointment.patientName}</td>
                <td className="px-4 py-2">{appointment.specialty}</td>
                <td className="px-4 py-2">
                  {new Date(appointment.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-2">{appointment.status}</td>
                <td className="px-4 py-2 text-center">
                  {appointment.status !== "Realizado" ? (
                    <button
                      className="px-4 py-2 text-white bg-green-500 rounded-md"
                      onClick={() => handleMarkAsDone(appointment.id)}
                    >
                      Marcar como Realizado
                    </button>
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
