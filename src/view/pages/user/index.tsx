import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { useContext, useState } from "react";
import { Modal } from "../../components/Modal";
import TableOptions from "../../components/Table/TableOptions";
import { Input } from "../../components/Input";
import { toast } from 'react-toastify';
import { UpdateSchedulingForm } from "../../forms/scheduling/UpdateSchedulingForm";
import { UserContext, UsersContextProvider } from "../../../@shared/contexts/User/UserContext";
import { CreateUserForm } from "../../forms/user/CreateUserForm";
import { User } from "../../../@shared/interfaces/models/User";
import { UpdateUserForm } from "../../forms/user/UpdateUserForm";

function Page() {
    const [selectedScheduling, setSelectedScheduling] = useState<string | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [openViewInfo, setOpenViewInfo] = useState(false);

    const context = useContext(UserContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { 
        fetchUsers, 
        deleteUser, 
        setOpenCreateUserModal, 
        setOpenUpdateUserModal, 
        openCreateUserModal, 
        openUpdateUserModal 
    } = context;

    const usersData = fetchUsers.data || [];

    console.log({ usersData }); 

    const filteredUsers = searchTerm.trim() === ''
        ? usersData
        : usersData.filter((user: { nome: string; }) =>
            user.nome.includes(searchTerm.trim())
        );

    const renderOptions = (id: string) => (
        <TableOptions 
            options={[
                { label: 'Atualizar', onClick: () => { 
                    setSelectedScheduling(id);
                    setOpenUpdateUserModal(true); 
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

    const selectedUserData = selectedScheduling ? usersData.find((user: { id: string; }) => user.id === selectedUserData) : null;

    return (
        <div className="rounded-md bg-white">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between pt-6 px-6 lg:px-8 ">
                <div>
                    <h2 className="text-gray-900 text-lg font-semibold">Usuários</h2>
                    <p className="text-gray-500 text-xs">Gerencie os usuários cadastrados</p>
                    <div className="flex gap-2 items-end">
                        <Input 
                            placeholder="Pesquise pelo nome do usuário" 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            value={searchTerm} 
                            className="w-auto  md:w-96"
                        />
                    </div>
                </div>
                <Button onClick={() => setOpenCreateUserModal(true)}>Cadastrar Usuário</Button>
            </div>
            <div className="h-full">
                <Table<User>
                    columns={[
                        { 
                            header: 'Nome', 
                            key: 'nome', 
                            render: (rowData) => rowData.nome
                        },
                        { 
                            header: 'Email', 
                            key: 'email', 
                            render: (rowData) => rowData.email 
                        },
                        { 
                            header: 'Tipo de Usuário', 
                            key: 'tipo',
                        },
                        { 
                            header: '', 
                            // @ts-ignore
                            key: 'options',
                            // @ts-ignore
                            render: (rowData) => renderOptions(rowData.id)
                        }
                    ]}
                    data={filteredUsers}
                /> 
            </div>

            <Modal open={openCreateUserModal} onClose={() => setOpenCreateUserModal(false)}>
                <CreateUserForm />
            </Modal>

            <Modal open={openUpdateUserModal} onClose={() => setOpenUpdateUserModal(false)}>
                {selectedUserData && <UpdateUserForm user={selectedUserData} />}
            </Modal>

            <Modal position={'center'} open={openDelete} onClose={() => setOpenDelete(false)}>
                <div className="flex flex-col gap-4 mt-5 w-[20vw] justify-center">
                    <p className="font-semibold text-lg w-full text-center">Tem certeza que deseja excluir esse usuário?</p>
                    <Button onClick={() => { deleteUser(idToDelete); setOpenDelete(false); toast.success('Usuário excluído com sucesso!')}}>
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

export function UserPage() {
    return (
        <UsersContextProvider>
            <Page />
        </UsersContextProvider>
    );
}
