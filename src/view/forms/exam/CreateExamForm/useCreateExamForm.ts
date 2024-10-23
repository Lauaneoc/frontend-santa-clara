// src/forms/exam/useCreateExamForm.ts
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExamContext } from '../../../../@shared/contexts/Exams/ExamContext';
import { useContext } from 'react';

// Esquema de validação com Zod
const schema = z.object({
  specialty: z.string().min(1, "Especialidade é obrigatória"), 
  category: z.string().min(1, "Categoria é obrigatória"),
});

type ExamFormData = z.infer<typeof schema>;

export const useCreateExamForm = () => {
  const context = useContext(ExamContext);

  if (!context) {
    throw new Error("ExamContext must be used within an ExamProvider");
  }

  const { createExam } = context;
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExamFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ExamFormData) => {
    createExam.mutate(data);
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit
  };
};
