import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatientContext } from '../../../../@shared/contexts/Patients/PatientContext';
import { useContext } from 'react';
import { AxiosError } from 'axios';
import { UsecaseError } from '../../../../@shared/services/@dto/useCaseError';
import { parse, isValid, format } from 'date-fns';
import { toast } from 'react-toastify';

// Função para validar e formatar a data usando date-fns
const isValidDate = (dateString: string): boolean => {
  const parsedDate = parse(dateString, 'ddMMyyyy', new Date());
  return isValid(parsedDate);
};

const formatDate = (date: string): string => {
  const parsedDate = parse(date, 'ddMMyyyy', new Date());
  return format(parsedDate, 'yyyy-MM-dd');
};

const schema = z.object({
  cpf: z.string().min(1, "CPF é obrigatório").regex(/^\d{11}$/, "CPF deve conter 11 dígitos"),
  dateBirthday: z.string().refine((val) => isValidDate(val), {
    message: "Data de nascimento inválida. O formato correto é DDMMYYYY.",
  }),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Formato de email inválido").optional(),
  phoneNumber: z.string().min(10, "Número de telefone inválido").optional(),
  cep: z.string().min(8, "CEP deve conter 8 dígitos").optional(),
  street: z.string().min(1, "Rua é obrigatória").optional(),
  number: z.string().min(1, "Número é obrigatório").optional(),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório").optional(),
  city: z.string().min(1, "Cidade é obrigatória").optional(),
  state: z.string().min(2, "Estado é obrigatório").max(2, "Estado deve conter 2 letras").optional(),
});

type PatientFormData = z.infer<typeof schema>;

export const useCreatePatientForm = () => {
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error("PatientContext must be used within an ExamProvider");
  }

  const { createPatient, setOpenCreatePatientModal } = context;

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: PatientFormData) => {
    try {
      const formattedDate = formatDate(data.dateBirthday);
      console.log(formattedDate)
      await createPatient.mutateAsync({
        ...data,
        dateBirthday: formattedDate,
      });
      setOpenCreatePatientModal(false);
      toast.success('Paciente cadastrado com sucesso');
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
    onSubmit
  };
};
