import { Controller } from 'react-hook-form';
import { Button } from '../../../components/Button';
import ComboBox from '../../../components/Combobox';
import { Input } from '../../../components/Input';
import { useCreateUserForm } from './useCreateUserForm';

export const CreateUserForm = () => {
  const {handleSubmit, onSubmit, register, errors, control} = useCreateUserForm();

  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">Cadastrar Usuário</h2>
      <form onSubmit={(handleSubmit(onSubmit))}>
        <Input
          {...register("nome")}
          label="Nome do Usuário"
          error={errors.nome?.message}
        />
        <Input
          {...register("email")}
          label="Email"
          error={errors.email?.message}
        />
        <Input
          {...register("senha")}
          label="Senha"
          error={errors.senha?.message}
        />
          <Controller
            name="tipo"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Tipo de usuários"
                options={["administrador", "funcionario"]}
                getExtractorLabel={(option: any) => option}
                getExtractorValue={(option: any) => option}
                onChange={(selected) => field.onChange(selected)}
                value={field.value}
              />
            )}
          />
        <Button type="submit">
          Salvar
        </Button>
      </form>
    </div>
  );
};
