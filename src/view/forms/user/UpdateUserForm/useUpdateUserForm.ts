import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../../../@shared/contexts/User/UserContext";
import { User } from "../../../../@shared/interfaces/models/User";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Formato de email inválido").optional(),
  senha: z.string().min(1, "Senha é obrigatória").optional(),
  tipo: z.string().min(1, "Tipo é obrigatório").optional(),
});

type UserFormData = z.infer<typeof schema>;

export const useUpdateUserForm = (user: User) => {
  const [openFormResults, setOpenFormResults] = useState(false);
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { updateUser, setOpenUpdateUserModal } = context;

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: UserFormData) => {
    try {
        await updateUser.mutateAsync({
            ...data,
            id: user.id,
        });
      toast.success("Usuário atualizado com sucesso!");
      setOpenUpdateUserModal(false);
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
    errors,
    onSubmit,
    control,
    setOpenFormResults,
    openFormResults,
  };
};
