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

function Page() {
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [openViewInfo, setOpenViewInfo] = useState(false);  // Estado para abrir o modal de visualização

    const context = useContext(PatientContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { 
        fetchPatients, 
        deletePatient, 
        setOpenCreatePatientModal, 
        setOpenUpdatePatientModal, 
        openCreatePatientModal, 
        openUpdatePatientModal 
    } = context;

    const patientsData = fetchPatients.data || [];

    const filteredPatients = searchTerm.trim() === ''
        ? patientsData
        : patientsData.filter((patient: { cpf: string; }) =>
            patient.cpf.includes(searchTerm.trim())
        );

    const renderOptions = (id: string) => (
        <TableOptions 
            options={[
                { label: 'Atualizar', onClick: () => { 
                    setSelectedPatient(id);
                    setOpenUpdatePatientModal(true); 
                }},
                { label: 'Visualizar', onClick: () => handleViewInfo(id) },  // Ação para visualização
                { label: 'Excluir', onClick: () => handleDeleteById(id) }
            ]}
        />
    );

    const handleViewInfo = (id: string) => {
        setSelectedPatient(id);
        setOpenViewInfo(true);  // Abre o modal de visualização
    };

    const handleDeleteById = (id: string) => {
        setIdToDelete(id);
        setOpenDelete(true);
    };

    const selectedPatientData = selectedPatient ? patientsData.find((patient: { id: string; }) => patient.id === selectedPatient) : null;

    return (
        <div className="h-[80vh] rounded-md bg-slate-50">
            <div className="flex items-end justify-between pt-6 px-6 lg:px-8">
                <div>
                    <h2 className="text-gray-900 text-lg font-semibold">Pacientes</h2>
                    <p className="text-gray-500 text-xs">Gerencie os pacientes cadastrados</p>
                    <div className="flex gap-2 items-end">
                        <Input 
                            placeholder="Pesquise pelo CPF" 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            value={searchTerm} 
                            className="w-96"
                        />
                    </div>
                </div>
                <Button onClick={() => setOpenCreatePatientModal(true)}>Cadastrar Paciente</Button>
            </div>
            <div>
                <Table 
                    columns={[
                        { header: 'Código do Paciente', key: 'id' },
                        { header: 'CPF', key: 'cpf' },
                        { header: 'Nome', key: 'name' },
                        { header: 'Data de aniversário', key: 'dateBirthday' },
                        { header: 'Email', key: 'email' },
                        { header: 'CEP', key: 'cep' },
                        { 
                            header: '', 
                            key: 'options',
                            render: (rowData) => renderOptions(rowData.id)
                        }
                    ]}
                    data={filteredPatients}  // Passa os pacientes filtrados
                />
            </div>

            <Modal open={openCreatePatientModal} onClose={() => setOpenCreatePatientModal(false)}>
                <CreatePatientForm />
            </Modal>

            <Modal open={openUpdatePatientModal} onClose={() => setOpenUpdatePatientModal(false)}>
                {selectedPatientData && <UpdatePatientForm patient={selectedPatientData} />}
            </Modal>

            <Modal position={'center'} open={openDelete} onClose={() => setOpenDelete(false)}>
                <div className="flex flex-col gap-4 mt-5 w-[35vw] justify-center">
                    <p className="font-semibold text-lg w-full text-center">Tem certeza que deseja excluir esse paciente?</p>
                    <Button onClick={() => { deletePatient(idToDelete); setOpenDelete(false); toast.success('Paciente excluído com sucesso!')}}>
                        Confirmar deleção
                    </Button>
                </div>
            </Modal>

            {/* Modal para visualização do paciente */}
            <Modal position={'center'} open={openViewInfo} onClose={() => setOpenViewInfo(false)}>
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
            </Modal>
        </div>
    );
}

export function PatientPage() {
    return (
        <PatientsContextProvider>
            <Page />
        </PatientsContextProvider>
    );
}
