import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { ExamContext, ExamsContextProvider } from "../../../@shared/contexts/Exams/ExamContext";
import { useContext, useState } from "react";
import { CreateExamForm } from "../../forms/exam/CreateExamForm";
import { Modal } from "../../components/Modal";
import TableOptions from "../../components/Table/TableOptions";
import { UpdateExamForm } from "../../forms/exam/UpdateExamForm";
import { Input } from "../../components/Input";
import { toast } from 'react-toastify';

function Page() {
    const [selectedExam, setSelectedExam] = useState<string | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [openViewInfo, setOpenViewInfo] = useState(false);

    const context = useContext(ExamContext);

    if (!context) {
        return <div>Loading...</div>; 
    }

    const { 
        fetchExams, 
        deleteExam, 
        openCreateExamModal,
        setOpenCreateExamModal, 
        setOpenUpdateExamModal, 
        openUpdateExamModal,
    } = context;

    const examsData = fetchExams.data || [];

    // Função que renderiza as opções do exame
    const renderOptions = (id: string) => (
        <TableOptions 
            options={[
                { label: 'Atualizar', onClick: () => { 
                    setSelectedExam(id);
                    setOpenUpdateExamModal(true); 
                }},
                { label: 'Visualizar', onClick: () => handleViewInfo(id) },
                { label: 'Excluir', onClick: () => handleDeleteById(id) },
            ]}
        />
    );

    const handleViewInfo = (id: string) => {
        setSelectedExam(id);
        setOpenViewInfo(true);
    }

    const handleDeleteById = (id: string) => {
        setIdToDelete(id);
        setOpenDelete(true);
    }

    const selectedExamData = selectedExam ? examsData.find((exam: { id: string; }) => exam.id === selectedExam) : null;

    const filteredExams = searchTerm.trim() === ''
        ? examsData
        : examsData.filter((exam: { specialty: string; }) => 
            exam.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="rounded-md bg-white">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between pt-6 px-6 lg:px-8 ">
                <div>
                    <h2 className="text-gray-900 text-lg font-semibold">Exames</h2>
                    <p className="text-gray-500 text-xs">Gerencie seus exames</p>
                    <div className="flex gap-2 items-end">
                        <Input 
                            placeholder="Pesquise pela especialidade" 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            value={searchTerm} 
                            className="w-auto  md:w-96"
                        />
                    </div>
                </div>
                <Button onClick={() => setOpenCreateExamModal(true)}>Cadastrar Exame</Button>
            </div>
            <div className="h-[55vh]">
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
                    data={filteredExams}
                />
            </div>

            <Modal open={openCreateExamModal} position={'center'} className="w-96" onClose={() => setOpenCreateExamModal(false)}>
                <CreateExamForm />
            </Modal>

            <Modal open={openUpdateExamModal} position={'center'} className="w-96" onClose={() => setOpenUpdateExamModal(false)}>
                {selectedExamData && <UpdateExamForm exam={selectedExamData} />}
            </Modal>

            <Modal position={'center'} open={openDelete} onClose={() => setOpenDelete(false)}>
                <div className="flex flex-col gap-4 mt-5 w-[20vw] justify-center">
                    <p className="font-semibold text-lg w-full text-center">Tem certeza que deseja excluir esse exame?</p>
                    <Button onClick={() => { deleteExam(idToDelete); setOpenDelete(false); toast.success('Exame excluído com sucesso!') }}>
                        Confirmar deleção
                    </Button>
                </div>
            </Modal>

            <Modal position={'center'} open={openViewInfo} onClose={() => setOpenViewInfo(false)}>
                <div className="flex flex-col gap-4 mt-5 w-[35vw]">
                    <Input label="Especialidade" disabled value={selectedExamData?.specialty}/>
                    <Input label="Categoria" disabled value={selectedExamData?.category}/>
                </div>
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
