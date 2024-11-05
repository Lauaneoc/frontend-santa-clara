import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { PatientContext, PatientsContextProvider } from "../../../@shared/contexts/Patients/PatientContext";
import { useContext, useState } from "react";
import { Modal } from "../../components/Modal";
import TableOptions from "../../components/Table/TableOptions";
import { UpdatePatientForm } from "../../forms/patient/UpdatePatientForm";
import { CreatePatientForm } from "../../forms/patient/CreatePatientForm";

function Page() {
    const [createForm, setCreateForm] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
    const context = useContext(PatientContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { fetchPatients, deletePatient } = context;
    const patientsData = fetchPatients.data || [];

    const renderOptions = (id: string) => (
        <TableOptions 
            options={[
                { label: 'Atualizar', onClick: () => { 
                    setSelectedPatient(id);
                    setUpdateForm(true); 
                }},
                { label: 'Excluir', onClick: () => deletePatient(id) }
            ]}
        />
    );

    const selectedPatientData = selectedPatient ? patientsData.find((patient: { id: string; }) => patient.id === selectedPatient) : null;

    return (
        <div className="h-[80vh] rounded-md bg-slate-50">
            <div className="flex items-start justify-between pt-6 px-6 lg:px-8">
                <div>
                    <h2 className="text-gray-900 text-lg font-semibold">Pacientes</h2>
                    <p className="text-gray-500 text-xs">Gerencie os pacientes cadastrados</p>
                </div>
                <Button onClick={() => setCreateForm(true)}>Cadastrar Paciente</Button>
            </div>
            <div>
                <Table 
                    columns={[
                        { header: 'Código do Paciente', key: 'id' },
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
                    data={patientsData}
                />
            </div>

             <Modal open={createForm} onClose={() => setCreateForm(false)}>
                <CreatePatientForm />
            </Modal>

            <Modal open={updateForm} onClose={() => setUpdateForm(false)}>
                {selectedPatientData && <UpdatePatientForm patient={selectedPatientData} />}
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
