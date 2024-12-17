import { Doctor } from "./Doctor";
import { Enterprise } from "./Enterprise";
import { Patient } from "./Patient";

export interface SchedulingCreate {
  dataAgendamento: string; 
  tipoExame: TypeExam;
  id_patient: number;   
  id_enterprise: number;
  exams: string[];
}

export interface Scheduling {
  dataAgendamento: string;
  dataAvaliacao: string | null;
  dataRealizacaoExame: string | null;
  dataSolicitacao: string;
  enterprise: Enterprise;
  id: number;
  observacoes: string | null;
  parecer: Opinion | null;
  patient: Patient;
  performedExams: PerformedExam[];
  status: SchedulingStatus;
  tipoExame: TypeExam;
  doctor: Doctor
}

export interface SchedulingUpdate {
  id?: number;
  dataAgendamento?: Date;
  dataAvaliacao?: Date;
  observacoes?: string;
  status?: SchedulingStatus;
  parecer?: Opinion;
  tipoExame?: TypeExam;
  id_patient?: number;
  id_enterprise?: number;
  id_doctor?: number;
  exams?: number[];
  updatePerfomedExamDTO?: UpdatePerfomedExam[];
}
export interface UpdatePerfomedExam {
  id_exam: number;
  laboratoryResultUrl: string;
  dataRealizaçãoExame: Date,
  dataResultadoExame: Date
}

export interface PerformedExam {
  id_exam: number;
  specialty: string;
  category: string;
  laboratoryResultUrl: string | null;
}

export interface UpdatePerfomedExamDTO {
  id_exam: number;
  laboratoryResultUrl: string;
}


export enum Opinion {
  APTO = 'APTO',
  INAPTO = 'INAPTO',
}

export enum SchedulingStatus {
  AGENDADO = 'AGENDADO',
  EXAMES_REALIZADOS = 'EXAMES_REALIZADOS',
  AGUARDANDO_RESULTADOS = 'AGUARDANDO_RESULTADOS',
  AGUARDANDO_PARECER_MÉDICO = 'AGUARDANDO_PARECER_MÉDICO',
  CANCELADO = 'CANCELADO',
  FINALIZADO = 'FINALIZADO',
}

export enum TypeExam {
  ADMISSIONAL = 'ADMISSIONAL',
  PERIÓDICO = 'PERIÓDICO',
  DEMISSIONAL = 'DEMISSIONAL',
}