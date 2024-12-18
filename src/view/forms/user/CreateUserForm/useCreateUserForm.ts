import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../../../@shared/contexts/User/UserContext";

const schema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Formato de email inválido"),
    senha: z.string().min(1, "Senha é obrigatória"),
    tipo: z.string().min(1, "Tipo é obrigatório"),
  });

type SchedulingFormData = z.infer<typeof schema>;

export const useCreateUserForm = () => {
    const [openFormResults, setOpenFormResults] = useState(false);
     const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { createUser, setOpenCreateUserModal } = context;

  const {
    register,
    handleSubmit,
    watch,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<SchedulingFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SchedulingFormData) => {
    console.log(data);
    try {  
        await createUser.mutateAsync(data);
      toast.success("Usuário criado com sucesso!");
      setOpenCreateUserModal(false);
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

  return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    control,
    setOpenFormResults,
    openFormResults,
    setValue
  };
};
