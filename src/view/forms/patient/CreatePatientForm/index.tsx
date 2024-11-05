import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { useCreatePatientForm } from './useCreatePatientForm';

export const CreatePatientForm = () => {
  const { register, handleSubmit, errors, onSubmit } = useCreatePatientForm();

  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">Cadastrar Paciente</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("cpf")}
          label="CPF"
          error={errors.cpf?.message}
        />
        <Input
          {...register("name")}
          label="Nome"
          error={errors.name?.message}
        />
        <Input
          {...register("dateBirthday")}
          label="Data de Nascimento"
          type="date"
          error={errors.dateBirthday?.message}
        />
        <Input
          {...register("email")}
          label="Email"
          type="email"
          error={errors.email?.message}
        />
        <Input
          {...register("phoneNumber")}
          label="Telefone"
          type="tel"
          error={errors.phoneNumber?.message}
        />
        <Input
          {...register("cep")}
          label="CEP"
          error={errors.cep?.message}
        />
        <Input
          {...register("street")}
          label="Rua"
          error={errors.street?.message}
        />
        <Input
          {...register("number")}
          label="Número"
          error={errors.number?.message}
        />
        <Input
          {...register("complement")}
          label="Complemento"
          error={errors.complement?.message}
        />
        <Input
          {...register("neighborhood")}
          label="Bairro"
          error={errors.neighborhood?.message}
        />
        <Input
          {...register("city")}
          label="Cidade"
          error={errors.city?.message}
        />
        <Input
          {...register("state")}
          label="Estado"
          error={errors.state?.message}
        />
        <Button type="submit">
          Salvar
        </Button>
      </form>
    </div>
  );
};
