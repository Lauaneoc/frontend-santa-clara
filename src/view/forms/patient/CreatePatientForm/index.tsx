import { Controller } from 'react-hook-form';
import { Enterprise } from '../../../../@shared/interfaces/models/Enterprise';
import { Button } from '../../../components/Button';
import ComboBox from '../../../components/Combobox';
import { Input } from '../../../components/Input';
import { useCreatePatientForm } from './useCreatePatientForm';

export const CreatePatientForm = () => {
  const { register, handleSubmit, errors, onSubmit, enterprises, control} = useCreatePatientForm();

  console.log({enterprises})

  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">Cadastrar Paciente</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="id_enterprise"
          control={control}
          render={({ field }) => (
            <ComboBox
              label="Empresa"
              options={enterprises.data}
              getExtractorLabel={(option: Enterprise) => option.legalName}
              getExtractorValue={(option: Enterprise) => option.id}
              onChange={(selected) => field.onChange(selected)}
              value={field.value}
            />
          )}
        />
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
          type="string"
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

        <div className="flex gap-4 my-2">
          <div className="w-1/2">
            <Input
              {...register("cep")}
              label="CEP"
              error={errors.cep?.message}
            />
          </div>
          <div className="w-1/2">
            <Input
              {...register("street")}
              label="Rua"
              error={errors.street?.message}
            />
          </div>
        </div>

        <div className="flex gap-4 my-2">
          <div className="w-1/2">
            <Input
              {...register("number")}
              label="Número"
              error={errors.number?.message}
            />
          </div>
          <div className="w-1/2">
            <Input
              {...register("complement")}
              label="Complemento"
              error={errors.complement?.message}
            />
          </div>
        </div>

        <div className="flex gap-4 my-2">
          <div className="w-1/2">
            <Input
              {...register("neighborhood")}
              label="Bairro"
              error={errors.neighborhood?.message}
            />
          </div>
          <div className="w-1/2">
            <Input
              {...register("city")}
              label="Cidade"
              error={errors.city?.message}
            />
          </div>
        </div>

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
