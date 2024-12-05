import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DoctorContext } from "../../../../@shared/contexts/Doctor/DoctorContext";
import { useContext } from "react";
import { AxiosError } from "axios";
import { UsecaseError } from "../../../../@shared/services/@dto/useCaseError";
import { toast } from "react-toastify";

const schema = z.object({
  crm: z.string().min(1, "CRM é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Formato de email inválido").optional(),
  telephone: z.string().min(10, "Número de telefone inválido").optional(),
});

type DoctorFormData = z.infer<typeof schema>;

export const useCreateDoctorForm = () => {
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error("DoctorContext must be used within an DoctorProvider");
  }

  const { createDoctor, setOpenCreateDoctorModal } = context;

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: DoctorFormData) => {
    try {
      await createDoctor.mutateAsync(data);
      setOpenCreateDoctorModal(false);
      toast.success("Médico cadastrado com sucesso");
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
    watch,
    errors,
    onSubmit,
  };
};
