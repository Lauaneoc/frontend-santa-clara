import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientContext } from "../../../../@shared/contexts/Patients/PatientContext";
import { useContext } from "react";
import { AxiosError } from "axios";
import { UsecaseError } from "../../../../@shared/services/@dto/useCaseError";
import { parse, isValid, format } from "date-fns";
import { toast } from "react-toastify";
import { EnterpriseContext } from "../../../../@shared/contexts/Enterprise/EnterpriseContext";
import { SchedulingContext } from "../../../../@shared/contexts/Scheduling/SchedulingContext";
import { ExamContext } from "../../../../@shared/contexts/Exams/ExamContext";
import { DoctorContext } from "../../../../@shared/contexts/Doctor/DoctorContext";

const schema = z.object({
  id_enterprise: z
    .number({ required_error: "Empresa é obrigatório" })
    .int({ message: "Empresa deve ser um número inteiro" }),
  id_patient: z
    .number({ required_error: "Paciente é obrigatório" })
    .int({ message: "Paciente deve ser um número inteiro" }),
  id_doctor: z
    .number({ required_error: "Médico é obrigatório" })
    .int({ message: "Médico deve ser um número inteiro" }),
  exams: z.array(z.number()),
  dataAgendamento: z
    .string({ required_error: "A data de agendamento é obrigatória" })
    .refine((value) => !isNaN(Date.parse(value)), {
      message:
        "A data de agendamento deve estar em um formato válido (ISO 8601).",
    }),
  tipoExame: z.enum(["ADMISSIONAL", "DEMISSIONAL", "PERIÓDICO"], {
    message:
      "O tipo de exame deve ser ADMISSIONAL, DEMISSIONAL ou PERIÓDICO.",
  }),
});

type SchedulingFormData = z.infer<typeof schema>;

export const useCreateSchedulingForm = () => {
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
    throw new Error(
      "SchedulingContext must be used within an SchedulingProvider"
    );
  }

  const { createScheduling, setOpenCreateSchedulingModal } = context;

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm<SchedulingFormData>({
    resolver: zodResolver(schema),
  });

  const id_enterprise = watch("id_enterprise");
  console.log("pegueeeeeeeeeeeeeeeeeeeeeeeeeei", id_enterprise);

  const onSubmit = async (data: any) => {
    try {
      await createScheduling.mutateAsync(data);
      setOpenCreateSchedulingModal(false);
      toast.success("Agendamento cadastrado com sucesso");
    } catch (e) {
      if (e instanceof AxiosError) {
        const error = e as AxiosError<UsecaseError>;
        // @ts-ignore
        const errors = error.response?.data.response ?? [];

        if (Array.isArray(errors)) {
          errors.forEach((err) => {
            setError(err.path, { message: err.message });
          });
        } else if (errors.path) {
          setError(errors.path, { message: errors.message });
        }
      }
    }
  };

  const handleDateChange = (date: Date) => {
    const offsetDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return offsetDate.toISOString();
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    enterprises,
    patients,
    exams,
    doctors,
    control,
    handleDateChange,
    id_enterprise,
  };
};
