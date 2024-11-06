import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Exam } from '../../../../@shared/interfaces/models/Exams';
import { ExamContext } from '../../../../@shared/contexts/Exams/ExamContext';
import { useContext } from 'react';
import { AxiosError } from 'axios';
import { UsecaseError } from '../../../../@shared/services/@dto/useCaseError';
import { toast } from 'react-toastify';

// Define o esquema de validação com Zod
const schema = z.object({
  specialty: z.string().min(1, 'Especialidade é obrigatória'),
  category: z.string().min(1, 'Categoria é obrigatória'),
});

type ExamFormData = z.infer<typeof schema>;

export const useUpdateExamForm = (exam: Exam) => {
  const context = useContext(ExamContext);

  if (!context) {
    throw new Error("ExamContext must be used within an ExamProvider");
  }

  const { updateExam, setOpenUpdateExamModal } = context;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ExamFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      specialty: exam.specialty,
      category: exam.category,
    },
  });

  const onSubmit = async (data: ExamFormData) => {
    try {
      await updateExam.mutateAsync({ ...data, id: exam.id });
      setOpenUpdateExamModal(false);
      toast.success('Exame atualizado com sucesso');
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
