import { Controller } from "react-hook-form";
import { Enterprise } from "../../../../@shared/interfaces/models/Enterprise";
import { Button } from "../../../components/Button";
import ComboBox from "../../../components/Combobox";
import { Input } from "../../../components/Input";
import { useCreateSchedulingForm } from "./useCreateSchedulingForm";
import { Patient } from "../../../../@shared/interfaces/models/Patient";
import { Exam } from "../../../../@shared/interfaces/models/Exams";
import MultiSelectComboBox from "../../../components/MultiSelectCombobox";
import { Doctor } from "../../../../@shared/interfaces/models/Doctor";

export const CreateSchedulingForm = () => {
  const {
    handleSubmit,
    onSubmit,
    enterprises,
    control,
    patients,
    exams,
    handleDateChange,
    id_enterprise,
    doctors,
    errors
  } = useCreateSchedulingForm();

  return (
    <div className="py-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">
        Cadastrar Agendamento
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="id_doctor"
          control={control}
          render={({ field }) => (
            <ComboBox
              label="Médico"
              options={doctors.data}
              getExtractorLabel={(option: Doctor) => option.name}
              getExtractorValue={(option: Doctor) => option.id}
              onChange={(selected) => field.onChange(selected)}
              value={field.value}
              error={errors.id_doctor?.message}
            />
          )}
        />
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
              error={errors.id_enterprise?.message}
            />
          )}
        />
        <Controller
          name="id_patient"
          control={control}
          render={({ field }) => (
            <ComboBox
              label="Paciente"
              options={patients.data.filter(
                (patient: any) =>
                  Number(patient.enterprise.id) === Number(id_enterprise)
              )}
              getExtractorLabel={(option: Patient) => option.name}
              getExtractorValue={(option: Patient) => option.id}
              onChange={(selected) => field.onChange(selected)}
              value={field.value}
              error={errors.id_patient?.message}
            />
          )}
        />
        <Controller
          name="exams"
          control={control}
          render={({ field }) => (
            <MultiSelectComboBox
              label="Exames"
              options={exams.data}
              getExtractorLabel={(option: Exam) => option.specialty}
              getExtractorValue={(option: Exam) => option.id}
              onChange={(selected) => {
                field.onChange(selected);
              }}
              values={field.value || []}
              error={errors.exams?.message}
            />
          )}
        />

        <Controller
          name="dataAgendamento"
          control={control}
          render={({ field }) => (
            <Input
              type="datetime-local"
              label="Data de Agendamento"
              value={field.value ? field.value.slice(0, 19) : ""}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                console.log(
                  "oooooooooooooooooooooooooooooooooooooooooooooooo" +
                    selectedDate
                );
                field.onChange(handleDateChange(selectedDate));
              }}
              error={errors.dataAgendamento?.message}
            />
          )}
        />

        <Controller
          name="tipoExame"
          control={control}
          render={({ field }) => (
            <ComboBox
              label="Tipo de Exame"
              options={["ADMISSIONAL", "DEMISSIONAL", "PERIÓDICO"]}
              getExtractorLabel={(option: any) => option}
              getExtractorValue={(option: any) => option}
              onChange={(selected) => field.onChange(selected)}
              value={field.value}
              error={errors.tipoExame?.message}
            />
          )}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
};
