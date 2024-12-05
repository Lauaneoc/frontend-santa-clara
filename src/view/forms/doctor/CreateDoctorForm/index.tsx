import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useCreateDoctorForm } from "./useCreateDoctorForm";

export const CreateDoctorForm = () => {
  const { register, handleSubmit, errors, onSubmit } = useCreateDoctorForm();
  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">
        Cadastrar Médico
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("crm")} label="CRM" error={errors.crm?.message} />

        <Input
          {...register("name")}
          label="Nome"
          error={errors.name?.message}
        />

        <Input
          {...register("email")}
          label="Email"
          type="email"
          error={errors.email?.message}
        />
        <Input
          {...register("telephone")}
          label="Telefone"
          type="tel"
          error={errors.telephone?.message}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
};
