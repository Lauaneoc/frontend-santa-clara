import { Controller, useFieldArray } from "react-hook-form";
import { Enterprise } from "../../../../@shared/interfaces/models/Enterprise";
import { Button } from "../../../components/Button";
import ComboBox from "../../../components/Combobox";
import { Input } from "../../../components/Input";
import { useUpdateSchedulingForm } from "./useUpdateSchedulingForm";
import { Patient } from "../../../../@shared/interfaces/models/Patient";
import MultiSelectComboBox from "../../../components/MultiSelectCombobox";
import { Doctor } from "../../../../@shared/interfaces/models/Doctor";
import { Exam } from "../../../../@shared/interfaces/models/Exams";
import {
  Opinion,
  Scheduling,
  SchedulingStatus,
} from "../../../../@shared/interfaces/models/Scheduling";
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import Textarea from "../../../components/Textarea";
import { dateLocal } from "../../../../@shared/utils/dateLocal";

type Props = {
  scheduling: Scheduling;
};

const FieldGroup = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className={`${className} `}>{children}</div>
  </div>
);

export const UpdateSchedulingForm = ({ scheduling }: Props) => {
  const {
    handleSubmit,
    onSubmit,
    enterprises,
    control,
    patients,
    exams,
    doctors,
    watchedExams,
    setOpenFormResults,
    openFormResults,
    errors,
    setValue,
  } = useUpdateSchedulingForm(scheduling);

  console.log({ errors });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "updatePerfomedExamDTO",
  });

  return (
    <div className="py-6">
      <div className="flex gap-2 justify-between items-center">
        <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">
          Atualizar Agendamento
        </h2>
        <div className="mb-4 px-2 py-1 border border-green-500 rounded-md bg-green-50 flex items-center">
          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-green-700 font-semibold text-sm">
            Data de Solicitação:{" "}
          </span>
          <span className="text-green-800 pl-2 text-sm">
            {scheduling.dataSolicitacao}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FieldGroup title="Informações Básicas">
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
              />
            )}
          />
        </FieldGroup>

        <FieldGroup title="Paciente e Exames">
          <Controller
            name="id_patient"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Paciente"
                options={patients.data}
                getExtractorLabel={(option: Patient) => option.name}
                getExtractorValue={(option: Patient) => option.id}
                onChange={(selected) => field.onChange(selected)}
                value={field.value}
              />
            )}
          />

          <div className="flex gap-2 items-end mb-2">
            <Controller
              name="exams"
              control={control}
              render={({ field }) => (
                <MultiSelectComboBox
                  label="Exames"
                  options={exams.data}
                  getExtractorLabel={(option: Exam) => option.specialty}
                  getExtractorValue={(option: Exam) => option.id}
                  onChange={(selected) => field.onChange(selected)}
                  values={field.value || []}
                />
              )}
            />
            <Button
              onClick={() => setOpenFormResults(true)}
              className=" flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5 text-white" />
              Adicionar resultados
            </Button>
          </div>
          {openFormResults && (
            <FieldGroup
              title="Resultados dos Exames"
              className="border px-6 py-4 rounded-md"
            >
              {watchedExams.map((item, index) => {
                setValue(`updatePerfomedExamDTO.${index}.id_exam`, item);
                return (
                  <div
                    key={item}
                    className="flex gap-2 border-b py-5 border-slate-400 last:border-b-0"
                  >
                    <Controller
                      name={`updatePerfomedExamDTO.${index}.laboratoryResultUrl`}
                      control={control}
                      rules={{ required: "URL do Resultado é obrigatória" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          label={`URL do Resultado de ${exams.data
                            .map((exam: { id: number; specialty: any }) =>
                              exam.id === item ? exam.specialty : ""
                            )
                            .join("") // Transforma o array em uma string
                            .replace(/[^\w\s]/gi, "") // Remove caracteres especiais
                            .replace(/\s+/g, "")}`} // Remove espaços extras
                          placeholder="Cole o link aqui"
                        />
                      )}
                    />

                    <Controller
                      name={`updatePerfomedExamDTO.${index}.dataRealizacaoExameLaboratorial`}
                      control={control}
                      rules={{ required: "Data de Realização é obrigatória" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="datetime-local"
                          label="Data de Realização"
                        />
                      )}
                    />
                  </div>
                );
              })}
            </FieldGroup>
          )}
        </FieldGroup>

        <FieldGroup title="Datas" className="flex gap-2">
          <Controller
            name="dataAgendamento"
            control={control}
            render={({ field }) => (
              <Input
                type="datetime-local"
                label="Data e Hora de Agendamento"
                value={field.value ? field.value.slice(0, 19) : ""}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value + "Z");
                  field.onChange(selectedDate.toISOString());
                }}
              />
            )}
          />

          <Controller
            name="dataAvaliacao"
            control={control}
            render={({ field }) => (
              <Input
                type="datetime-local"
                label="Data e Hora Avaliação"
                value={field.value ? field.value.slice(0, 19) : ""}
                onChange={field.onChange}
              />
            )}
          />
        </FieldGroup>

        <FieldGroup title="Detalhes do Exame">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <ComboBox<SchedulingStatus>
                label="Status"
                options={Object.values(SchedulingStatus)}
                getExtractorLabel={(option: SchedulingStatus) => option}
                getExtractorValue={(option: SchedulingStatus) => option}
                onChange={(selected) => field.onChange(selected)}
                value={field.value as SchedulingStatus || null}
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
              />
            )}
          />
          <Controller
            name="parecer"
            control={control}
            render={({ field }) => (
              <ComboBox
                label="Parecer"
                options={["APTO", "INAPTO"]}
                getExtractorLabel={(option: any) => option}
                getExtractorValue={(option: any) => option}
                onChange={(selected) => field.onChange(selected)}
                value={field.value as Opinion}
              />
            )}
          />
        </FieldGroup>

        <Controller
          name="observacoes"
          control={control}
          render={({ field }) => (
            <Textarea
              id="observacoes"
              label="Observações"
              name="observacoes"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="Digite suas observações aqui"
            />
          )}
        />

        <Button type="submit" className="flex flex-col w-fit">
          Salvar
        </Button>
      </form>
    </div>
  );
};
