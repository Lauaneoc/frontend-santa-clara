import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Exam } from '../../../../@shared/interfaces/models/Exams';
import { ExamContext } from '../../../../@shared/contexts/Exams/ExamContext';
import { useContext } from 'react';

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

  const { updateExam } = context;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ExamFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      specialty: exam.specialty,
      category: exam.category,
    },
  });

  const onSubmit = (data: any) => {
    updateExam.mutate({ ...data, id: exam.id });
};

  return {
    register,
    handleSubmit: handleSubmit,
    onSubmit,
    errors,
  };
};
