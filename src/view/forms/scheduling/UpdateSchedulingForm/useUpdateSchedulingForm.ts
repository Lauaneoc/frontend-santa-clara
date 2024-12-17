import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext } from "react";
import { AxiosError } from "axios";
import { SchedulingContext } from "../../../../@shared/contexts/Scheduling/SchedulingContext";
import { toast } from "react-toastify";
import { Opinion, Scheduling } from "../../../../@shared/interfaces/models/Scheduling";
import { EnterpriseContext } from "../../../../@shared/contexts/Enterprise/EnterpriseContext";
import { PatientContext } from "../../../../@shared/contexts/Patients/PatientContext";
import { ExamContext } from "../../../../@shared/contexts/Exams/ExamContext";
import { DoctorContext } from "../../../../@shared/contexts/Doctor/DoctorContext";

const schema = z.object({
  id_enterprise: z.number().int(),
  id_patient: z.number().int(),
  id_doctor: z.number().int(),
  exams: z.array(z.number()),
  status: z.enum(['AGENDADO', 'EXAMES_REALIZADOS', 'AGUARDANDO_RESULTADOS', 'AGUARDANDO_PARECER_MÉDICO',
    'CANCELADO', 'FINALIZADO']).optional(),
  observacoes: z.string().optional(),
  parecer: z.enum(["APTO", "INAPTO"], {
    message: "O parecer deve ser APTO ou INAPTO.",
  }).optional(),
  dataRealizacaoExame: z.string().refine(
    (value) => !isNaN(Date.parse(value)),
    { message: "A data de realização de exame deve estar em um formato válido (ISO 8601)." }
  ).optional(),
  dataAvaliacao: z.string().refine(
    (value) => !isNaN(Date.parse(value)),
    { message: "A data de avaliação deve estar em um formato válido (ISO 8601)." }
  ).optional(),
  dataAgendamento: z.string().refine(
    (value) => !isNaN(Date.parse(value)),
    { message: "A data de agendamento deve estar em um formato válido (ISO 8601)." }
  ).optional(),
  tipoExame: z.enum(["ADMISSIONAL", "DEMISSIONAL", "PERIÓDICO"], {
    message: "O tipo de exame deve ser ADMISSIONAL, DEMISSIONAL ou PERIÓDICO.",
  }),
});

type SchedulingFormData = z.infer<typeof schema>;

export const useUpdateSchedulingForm = (scheduling: Scheduling) => {
  const context = useContext(SchedulingContext);
  const contextEnterprise = useContext(EnterpriseContext);
  const enterprises = contextEnterprise?.fetchEnterprises;

  const contextPatient = useContext(PatientContext);
  const patients = contextPatient?.fetchPatients;

  const contextExams = useContext(ExamContext);
  const exams = contextExams?.fetchExams;

  const contextDoctors = useContext(DoctorContext);
  const doctors = contextDoctors?.fetchDoctors;

  if (!context) {
    throw new Error("SchedulingContext must be used within a SchedulingProvider");
  }

  const { updateScheduling, setOpenUpdateSchedulingModal } = context;

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm<SchedulingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id_doctor: Number(scheduling.doctor.id),
      id_patient: Number(scheduling.patient.id),
      id_enterprise: Number(scheduling.enterprise.id),
      tipoExame: scheduling.tipoExame,
      observacoes: scheduling.observacoes ?? '',
      exams: scheduling.performedExams.map((exam) => Number(exam.id_exam)),
      parecer: scheduling.parecer as Opinion,
    },
  });

  const onSubmit = async (data: SchedulingFormData) => {
    try {  
      await updateScheduling.mutateAsync({
        ...data,
        id: scheduling.id,
      });
  
      toast.success("Agendamento atualizado com sucesso!");
      setOpenUpdateSchedulingModal(false);
    } catch (error) {
      if (error instanceof AxiosError) {
          const errors = error.response?.data.response ?? [];
        if (Array.isArray(errors)) {
          errors.forEach((err) => {
            setError(err.path, { message: err.message });
          });
        }
      }
    }
  };
  
  const handleDateChange = (date: Date) => {
    return date.toISOString();
  };
  

  return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    control,
    enterprises,
    patients,
    doctors,
    exams,
    handleDateChange
  };
};
