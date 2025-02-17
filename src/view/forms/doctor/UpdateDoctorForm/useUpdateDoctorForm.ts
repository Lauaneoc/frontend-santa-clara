import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AxiosError } from "axios";
import { UsecaseError } from "../../../../@shared/services/@dto/useCaseError";
import { toast } from "react-toastify";
import { Doctor } from "../../../../@shared/interfaces/models/Doctor";
import { DoctorContext } from "../../../../@shared/contexts/Doctor/DoctorContext";

// Define o esquema de validação com Zod
const schema = z.object({
  crm: z.string().min(1, "CRM é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Formato de email inválido").optional(),
  telephone: z.string().min(10, "Número de telefone inválido").optional(),
});

type DoctorFormData = z.infer<typeof schema>;

export const useUpdateDoctorForm = (doctor: Doctor) => {
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error("DoctorContext must be used within an DoctorProvider");
  }

  const { updateDoctor, setOpenUpdateDoctorModal } = context;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<DoctorFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      crm: doctor.crm,
      email: doctor.email,
      name: doctor.name,
      telephone: doctor.telephone,
    },
  });

  const onSubmit = async (data: DoctorFormData) => {
    try {
      await updateDoctor.mutateAsync({ ...data, id: doctor.id });
      setOpenUpdateDoctorModal(false);
      toast.success("Médico atualizado com sucesso");
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

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
