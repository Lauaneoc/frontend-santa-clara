import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { Key, useContext, useState } from "react";
import { Modal } from "../../components/Modal";
import TableOptions from "../../components/Table/TableOptions";
import { UpdatePatientForm } from "../../forms/patient/UpdatePatientForm";
import { CreatePatientForm } from "../../forms/patient/CreatePatientForm";
import { PatientContext, PatientsContextProvider } from "../../../@shared/contexts/Patients/PatientContext";
import { Input } from "../../components/Input";
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { EnterprisesContextProvider } from "../../../@shared/contexts/Enterprise/EnterpriseContext";
import { SchedulingContext, SchedulingsContextProvider } from "../../../@shared/contexts/Scheduling/SchedulingContext";
import { CreateSchedulingForm } from "../../forms/scheduling/CreateSchedulingForm";
import { ExamsContextProvider } from "../../../@shared/contexts/Exams/ExamContext";
import { PerformedExam, Scheduling } from "../../../@shared/interfaces/models/Scheduling";
import { DoctorsContextProvider } from "../../../@shared/contexts/Doctor/DoctorContext";
import { UpdateSchedulingForm } from "../../forms/scheduling/UpdateSchedulingForm";

function Page() {
    const [selectedScheduling, setSelectedScheduling] = useState<string | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [openViewInfo, setOpenViewInfo] = useState(false);

    const context = useContext(SchedulingContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { 
        fetchSchedulings, 
        deleteScheduling, 
        setOpenCreateSchedulingModal, 
        setOpenUpdateSchedulingModal, 
        openCreateSchedulingModal, 
        openUpdateSchedulingModal 
    } = context;

    const schedulingsData = fetchSchedulings.data || [];

    const filteredSchedulings = searchTerm.trim() === ''
        ? schedulingsData
        : schedulingsData.filter((scheduling: { cpf: string; }) =>
            scheduling.cpf.includes(searchTerm.trim())
        );

    const renderOptions = (id: string) => (
        <TableOptions 
            options={[
                { label: 'Atualizar', onClick: () => { 
                    setSelectedScheduling(id);
                    setOpenUpdateSchedulingModal(true); 
                }},
                { label: 'Visualizar', onClick: () => handleViewInfo(id) },
                { label: 'Excluir', onClick: () => handleDeleteById(id) }
            ]}
        />
    );

    const handleViewInfo = (id: string) => {
        setSelectedScheduling(id);
        setOpenViewInfo(true);
    };

    const handleDeleteById = (id: string) => {
        setIdToDelete(id);
        setOpenDelete(true);
    };

    const selectedSchedulingData = selectedScheduling ? schedulingsData.find((scheduling: { id: string; }) => scheduling.id === selectedScheduling) : null;

    return (
        <div className="rounded-md bg-white">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between pt-6 px-6 lg:px-8 ">
                <div>
                    <h2 className="text-gray-900 text-lg font-semibold">Agendamentos</h2>
                    <p className="text-gray-500 text-xs">Gerencie os agendamentos cadastrados</p>
                    <div className="flex gap-2 items-end">
                        <Input 
                            placeholder="Pesquise pelo CPF" 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            value={searchTerm} 
                            className="w-auto  md:w-96"
                        />
                    </div>
                </div>
                <Button onClick={() => setOpenCreateSchedulingModal(true)}>Cadastrar Agendamento</Button>
            </div>
            <div className="h-full">
                <Table<Scheduling>
                    columns={[
                        { header: 'Data do Agendamento', key: 'dataAgendamento', render: (rowData) => format(new Date(rowData.dataAgendamento), 'dd/MM/yyyy')},
                        { 
                            header: 'Empresa', 
                            key: 'enterprise', 
                            render: (rowData) => rowData.enterprise.legalName 
                        },
                        { 
                            header: 'Paciente', 
                            key: 'patient', 
                            render: (rowData) => rowData.patient.name 
                        },
                        { 
                            header: 'Parecer', 
                            key: 'parecer',
                            render: (rowData) => rowData.parecer == null ? '---' : rowData.parecer
                        },
                        { header: 'Status', key: 'status' },
                        { header: 'Tipo de Exame', key: 'tipoExame' },
                        { 
                            header: '', 
                            // @ts-ignore
                            key: 'options',
                            // @ts-ignore
                            render: (rowData) => renderOptions(rowData.id)
                        }
                    ]}
                    data={filteredSchedulings}
                />
            </div>

            <Modal open={openCreateSchedulingModal} onClose={() => setOpenCreateSchedulingModal(false)}>
                <CreateSchedulingForm />
            </Modal>

            <Modal open={openUpdateSchedulingModal} onClose={() => setOpenUpdateSchedulingModal(false)}>
                {selectedSchedulingData && <UpdateSchedulingForm scheduling={selectedSchedulingData} />}
            </Modal>

            <Modal position={'center'} open={openDelete} onClose={() => setOpenDelete(false)}>
                <div className="flex flex-col gap-4 mt-5 w-[20vw] justify-center">
                    <p className="font-semibold text-lg w-full text-center">Tem certeza que deseja excluir esse agendamento?</p>
                    <Button onClick={() => { deleteScheduling(idToDelete); setOpenDelete(false); toast.success('Agendamento excluído com sucesso!')}}>
                        Confirmar deleção
                    </Button>
                </div>
            </Modal>

            <Modal position={'center'} open={openViewInfo} onClose={() => setOpenViewInfo(false)}>
                <div className="flex flex-col gap-4 mt-5 w-[35vw] max-h-[80vh] overflow-y-auto p-4 border rounded-md">
                    <div className="flex gap-4">
                        <Input label="CPF" disabled value={selectedSchedulingData?.patient?.cpf} />
                        <Input label="Nome" disabled value={selectedSchedulingData?.patient?.name} />
                    </div>
                    <Input label="Data de Nascimento" disabled value={selectedSchedulingData?.patient?.dateBirthday} />
                    <Input label="Email" disabled value={selectedSchedulingData?.patient?.email} />
                    <div className="flex gap-4">
                        <Input label="CEP" disabled value={selectedSchedulingData?.patient?.cep} />
                        <Input label="Rua" disabled value={selectedSchedulingData?.patient?.street} />
                    </div>
                    <div className="flex gap-4">
                        <Input label="Número" disabled value={selectedSchedulingData?.patient?.number} />
                        <Input label="Complemento" disabled value={selectedSchedulingData?.patient?.complement} />
                    </div>
                    <Input label="Bairro" disabled value={selectedSchedulingData?.patient?.neighborhood} />
                    <Input label="Cidade" disabled value={selectedSchedulingData?.patient?.city} />
                    <Input label="Estado" disabled value={selectedSchedulingData?.patient?.state} />
                    
                    <h3 className="text-gray-900 font-semibold mt-4">Exames Realizados</h3>
                    <div>
                    {selectedSchedulingData?.performedExams?.length ? (
                        <ul className="space-y-4">
                            {selectedSchedulingData.performedExams.map((exam: { specialty: any; category: any; dataRealizacaoExameLaboratorial: string | number | Date; dataResultadoExameLaboratorial: string | number | Date; laboratoryResultUrl: string | undefined; }, index: Key | null | undefined) => (
                                <li key={index} className="p-4 border rounded-md shadow-sm bg-white">
                                    <div className="flex flex-col">
                                        <span className="text-gray-700 font-semibold">Especialidade:</span>
                                        <span className="text-gray-900">{exam.specialty || '---'}</span>
                                    </div>
                                    <div className="flex flex-col mt-2">
                                        <span className="text-gray-700 font-semibold">Categoria:</span>
                                        <span className="text-gray-900">{exam.category || '---'}</span>
                                    </div>
                                    <div className="flex flex-col mt-2">
                                        <span className="text-gray-700 font-semibold">Data de Realização:</span>
                                        <span className="text-gray-900">
                                            {exam.dataRealizacaoExameLaboratorial
                                                ? format(new Date(exam.dataRealizacaoExameLaboratorial), 'dd/MM/yyyy')
                                                : '---'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-2">
                                        <span className="text-gray-700 font-semibold">Data do Resultado:</span>
                                        <span className="text-gray-900">
                                            {exam.dataResultadoExameLaboratorial
                                                ? format(new Date(exam.dataResultadoExameLaboratorial), 'dd/MM/yyyy')
                                                : '---'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col mt-2">
                                        <span className="text-gray-700 font-semibold">Resultado:</span>
                                        {exam.laboratoryResultUrl ? (
                                            <a
                                                href={exam.laboratoryResultUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                Ver Resultado
                                            </a>
                                        ) : (
                                            <span className="text-gray-900">---</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Nenhum exame realizado.</p>
                    )}
                </div>

                </div>
            </Modal>


        </div>
    );
}

export function SchedulingPage() {
    return (
        <SchedulingsContextProvider>
            <DoctorsContextProvider>
                <ExamsContextProvider>
                    <EnterprisesContextProvider>
                        <PatientsContextProvider>
                            <Page />
                        </PatientsContextProvider>
                    </EnterprisesContextProvider>
                </ExamsContextProvider>
            </DoctorsContextProvider>
        </SchedulingsContextProvider>
    );
}
