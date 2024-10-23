import { Exam } from '../../../../@shared/interfaces/models/Exams';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { useUpdateExamForm } from './useUpdateExameForm';

interface UpdateExamFormProps {
  exam: Exam;
}

export const UpdateExamForm = ({ exam }: UpdateExamFormProps) => {
  const { register, handleSubmit, errors, onSubmit } = useUpdateExamForm(exam);

  return (
    <div className="p-4 bg-white rounded-md shadow h-full">
      <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">Atualizar Exame</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("specialty")}
          label="Especialidade"
          error={errors.specialty?.message}
        />
        <Input
          {...register("category")}
          label="Categoria"
          error={errors.category?.message}
        />
        <Button type="submit">Atualizar</Button>
      </form>
    </div>
  );
};
