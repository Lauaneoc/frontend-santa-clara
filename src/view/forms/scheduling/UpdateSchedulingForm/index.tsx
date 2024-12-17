import { Controller } from 'react-hook-form';
import { Enterprise } from '../../../../@shared/interfaces/models/Enterprise';
import { Button } from '../../../components/Button';
import ComboBox from '../../../components/Combobox';
import { Input } from '../../../components/Input';
import { useUpdateSchedulingForm } from './useUpdateSchedulingForm';
import { Patient } from '../../../../@shared/interfaces/models/Patient';
import MultiSelectComboBox from '../../../components/MultiSelectCombobox';
import { Doctor } from '../../../../@shared/interfaces/models/Doctor';
import { Exam } from '../../../../@shared/interfaces/models/Exams';
import { Opinion, Scheduling, SchedulingStatus } from '../../../../@shared/interfaces/models/Scheduling';
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/outline';
import Textarea from '../../../components/Textarea';

type Props = {
  scheduling: Scheduling;
}

const FieldGroup = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className={`${className} `}>{children}</div>
  </div>
);

export const UpdateSchedulingForm = ({ scheduling }: Props) => {
  const { handleSubmit, onSubmit, enterprises, control, patients, exams, handleDateChange, doctors } = useUpdateSchedulingForm(scheduling);

  return (
    <div className="py-6">
      <div className="flex gap-2 justify-between items-center">
        <h2 className="text-lg font-semibold mb-4 text-slate-700 font-inter">Atualizar Agendamento</h2>
        <div className="mb-4 px-2 py-1 border border-green-500 rounded-md bg-green-50 flex items-center">
          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-green-700 font-semibold text-sm">Data de Solicitação: </span>
          <span className="text-green-800 pl-2 text-sm">{scheduling.dataSolicitacao}</span>
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

            <div className="flex gap-2 items-end">
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
                <Button className=" flex items-center gap-2">
                    <PlusIcon className="h-5 w-5 text-white" />
                    Adicionar resultados
                </Button>
            </div>

        </FieldGroup>

        <FieldGroup title="Datas" className="flex gap-2">
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
                  field.onChange(handleDateChange(selectedDate));
                }}
              />
            )}
          />
          <Controller
            name="dataRealizacaoExame"
            control={control}
            render={({ field }) => (
              <Input
                type="datetime-local"
                label="Data Realização Exame"
                value={field.value ? field.value.slice(0, 19) : ""}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  field.onChange(handleDateChange(selectedDate));
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
                label="Data Avaliação"
                value={field.value ? field.value.slice(0, 19) : ""}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  field.onChange(handleDateChange(selectedDate));
                }}
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
                value={field.value as SchedulingStatus}
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
