import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { ExamContext, ExamsContextProvider } from "../../../@shared/contexts/Exams/ExamContext";
import { useContext, useState } from "react";
import { CreateExamForm } from "../../forms/exam/CreateExamForm";
import { Modal } from "../../components/Modal";
import TableOptions from "../../components/Table/TableOptions";
import { UpdateExamForm } from "../../forms/exam/UpdateExamForm";

function Page() {
    const [createForm, setCreateForm] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    const [selectedExam, setSelectedExam] = useState<string | null>(null);
    const context = useContext(ExamContext);

    if (!context) {
        return <div>Loading...</div>; 
    }

    const { fetchExams, deleteExam } = context;
    const examsData = fetchExams.data || [];

    const renderOptions = (id: string) => (
        <TableOptions 
            options={[
                { label: 'Atualizar', onClick: () => { 
                    setSelectedExam(id);
                    setUpdateForm(true); 
                }},
                { label: 'Excluir', onClick: () => deleteExam(id) }
            ]}
        />
    );

    // Obtendo o exame selecionado
    const selectedExamData = selectedExam ? examsData.find((exam: { id: string; }) => exam.id === selectedExam) : null;

    return (
        <div className="h-[80vh] rounded-md bg-slate-50">
            <div className="flex items-start justify-between pt-6 px-6 lg:px-8">
                <div>
                    <h2 className="text-gray-900 text-lg font-semibold">Exames</h2>
                    <p className="text-gray-500 text-xs">Gerencie seus exames</p>
                </div>
                <Button onClick={() => setCreateForm(true)}>Cadastrar Exame</Button>
            </div>
            <div>
                <Table 
                    columns={[
                        { header: 'Código do exame', key: 'id' },
                        { header: 'Especialidade', key: 'specialty' },
                        { header: 'Categoria', key: 'category' },
                        { 
                            header: '', 
                            key: 'options',
                            render: (rowData) => renderOptions(rowData.id)
                        }
                    ]}
                    data={examsData}
                />
            </div>

            <Modal open={createForm} onClose={() => setCreateForm(false)}>
                <CreateExamForm />
            </Modal>

            <Modal open={updateForm} onClose={() => setUpdateForm(false)}>
                {selectedExamData && <UpdateExamForm exam={selectedExamData} />}
            </Modal>
        </div>
    );
}

export function ExamPage() {
    return (
        <ExamsContextProvider>
            <Page />
        </ExamsContextProvider>
    );
}
