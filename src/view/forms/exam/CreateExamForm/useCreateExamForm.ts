import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Esquema de validação com Zod
const schema = z.object({
  specialty: z.string(),
  category: z.string(),
});

type ExamFormData = z.infer<typeof schema>;

export const useCreateExamForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExamFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ExamFormData) => {
    console.log('Dados enviados:', data);
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit
  };
};
