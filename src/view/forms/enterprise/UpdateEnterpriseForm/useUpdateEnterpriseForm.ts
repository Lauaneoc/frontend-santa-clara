import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnterpriseContext } from "../../../../@shared/contexts/Enterprise/EnterpriseContext";
import { useContext } from "react";
import { AxiosError } from "axios";
import { UsecaseError } from "../../../../@shared/services/@dto/useCaseError";
import { toast } from "react-toastify";
import { Enterprise } from "../../../../@shared/interfaces/models/Enterprise";

// Schema de validação
const schema = z.object({
  id: z.string().min(1, "ID da empresa é obrigatório"),
  cnpj: z
    .string()
    .min(14, "CNPJ é obrigatório e deve conter 14 caracteres")
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, "CNPJ inválido"),
  legalName: z.string().min(1, "Razão Social é obrigatória"),
  email: z.string().email("Formato de email inválido").optional(),
  phoneNumber: z.string().min(10, "Número de telefone inválido").optional(),
  cep: z.string().min(8, "CEP deve conter 8 dígitos").optional(),
  street: z.string().min(1, "Rua é obrigatória").optional(),
  number: z.string().min(1, "Número é obrigatório").optional(),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório").optional(),
  city: z.string().min(1, "Cidade é obrigatória").optional(),
  state: z
    .string()
    .min(2, "Estado é obrigatório")
    .max(2, "Estado deve conter 2 letras")
    .optional(),
});

type EnterpriseFormData = z.infer<typeof schema>;

export const useUpdateEnterpriseForm = (enterprise: Enterprise) => {
  const context = useContext(EnterpriseContext);

  if (!context) {
    throw new Error("EnterpriseContext must be used within an EnterpriseProvider");
  }

  const { updateEnterprise, setOpenUpdateEnterpriseModal } = context;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EnterpriseFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
        cep: enterprise.cep,
        cnpj: enterprise.cnpj,
        legalName: enterprise.legalName,
        email: enterprise.email,
        phoneNumber: enterprise.phoneNumber,
        street: enterprise.street,
        number: enterprise.number,
        complement: enterprise.complement,
        neighborhood: enterprise.neighborhood,
        city: enterprise.city,
        state: enterprise.state,
    },
  });

  const onSubmit = async (data: EnterpriseFormData) => {
    try {
      await updateEnterprise.mutateAsync({ ...data, id: data.id });
      setOpenUpdateEnterpriseModal(false);
      toast.success("Empresa atualizada com sucesso!");
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
    errors,
    onSubmit,
  };
};
