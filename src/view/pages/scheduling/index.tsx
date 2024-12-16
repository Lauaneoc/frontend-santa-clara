import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { useContext, useState } from "react";
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
import { Scheduling } from "../../../@shared/interfaces/models/Scheduling";
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

            {/* <Modal position={'center'} open={openViewInfo} onClose={() => setOpenViewInfo(false)}>
                <div className="flex flex-col gap-4 mt-5 w-[35vw]">
                    <div className="flex gap-4">
                        <Input label="CPF" disabled value={selectedPatientData?.cpf} />
                        <Input label="Nome" disabled value={selectedPatientData?.name} />
                    </div>
                    <Input label="Data de Nascimento" disabled value={selectedPatientData?.dateBirthday} />
                    <Input label="Email" disabled value={selectedPatientData?.email} />
                    <div className="flex gap-4">
                        <Input label="CEP" disabled value={selectedPatientData?.cep} />
                        <Input label="Rua" disabled value={selectedPatientData?.street} />
                    </div>
                    <div className="flex gap-4">
                        <Input label="Número" disabled value={selectedPatientData?.number} />
                        <Input label="Complemento" disabled value={selectedPatientData?.complement} />
                    </div>
                    <Input label="Bairro" disabled value={selectedPatientData?.neighborhood} />
                    <Input label="Cidade" disabled value={selectedPatientData?.city} />
                    <Input label="Estado" disabled value={selectedPatientData?.state} />
                </div>
            </Modal> */}
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
