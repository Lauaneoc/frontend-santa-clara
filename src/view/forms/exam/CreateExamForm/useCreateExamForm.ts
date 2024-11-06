// src/forms/exam/useCreateExamForm.ts
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExamContext } from '../../../../@shared/contexts/Exams/ExamContext';
import { useContext } from 'react';
import { AxiosError } from 'axios';
import { UsecaseError } from '../../../../@shared/services/@dto/useCaseError';
import ts from 'typescript';

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

  const { createExam, setOpenCreateExamModal } = context;
  
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ExamFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ExamFormData) => {
    try {
      await createExam.mutateAsync(data);
      setOpenCreateExamModal(false);
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
