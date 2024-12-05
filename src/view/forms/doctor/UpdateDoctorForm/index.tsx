import { Doctor } from "../../../../@shared/interfaces/models/Doctor";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useUpdateDoctorForm } from "./useUpdateDoctorForm";

interface UpdateDoctorFormProps {
  doctor: Doctor;
}

export const UpdateDoctorForm = ({ doctor }: UpdateDoctorFormProps) => {
  const { register, handleSubmit, errors, onSubmit } =
    useUpdateDoctorForm(doctor);

  return (
    <div className="p-4 bg-white rounded-md shadow h-full">
      <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">
        Atualizar Médico
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
        <Button type="submit">Atualizar</Button>
      </form>
    </div>
  );
};
