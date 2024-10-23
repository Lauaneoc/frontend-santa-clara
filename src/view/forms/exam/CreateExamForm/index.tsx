import { useContext } from 'react';
import { ExamContext, ExamsContextProvider } from '../../../../@shared/contexts/Exams/ExamContext';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { useCreateExamForm } from './useCreateExamForm';

export const CreateExamForm = () => {
  const { register, handleSubmit, errors, onSubmit } = useCreateExamForm();

  

  return (
    <ExamsContextProvider>
    <div className="py-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">Cadastrar Exame</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("specialty")}
          label='Especialidade'
          error={errors.specialty?.message}
        />
        <Input
          {...register("category")}
          label='Categoria'
          error={errors.category?.message}
        />
        <Button type="submit" >
          Salvar
        </Button>
      </form>
    </div>
    </ExamsContextProvider>
  );
};
