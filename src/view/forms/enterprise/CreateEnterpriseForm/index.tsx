import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { useCreateEnterpriseForm } from './useCreateEnterpriseForm';

export const CreateEnterpriseForm = () => {
    const { register, handleSubmit, errors, onSubmit } = useCreateEnterpriseForm();
  
    return (
      <div className="py-6">
        <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">Cadastrar Empresa</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Identificação */}
          <div className="space-y-4">
            <Input {...register("cnpj")} label="CNPJ" error={errors?.cnpj?.message} />
            <Input {...register("legalName")} label="Razão Social" error={errors?.legalName?.message} />
          </div>
  
          {/* Contato */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input {...register("email")} label="Email" error={errors?.email?.message} />
            <Input {...register("phoneNumber")} label="Número de telefone" error={errors?.phoneNumber?.message} />
          </div>
  
          {/* Endereço */}
          <div className="space-y-4">
            <Input {...register("cep")} label="CEP" error={errors?.cep?.message} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input {...register("street")} label="Logradouro" error={errors?.street?.message} />
              <Input {...register("number")} label="Número" error={errors?.number?.message} />
              <Input {...register("complement")} label="Complemento" error={errors?.complement?.message} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input {...register("neighborhood")} label="Bairro" error={errors?.neighborhood?.message} />
              <Input {...register("city")} label="Cidade" error={errors?.city?.message} />
            </div>
            <Input {...register("state")} label="Estado (EX: SP)" error={errors?.state?.message} />
          </div>
  
          {/* Botão */}
          <div className="flex justify-end mt-4">
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    );
  };
  