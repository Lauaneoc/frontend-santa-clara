import { useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modal";
import {
  DoctorContext,
  DoctorsContextProvider,
} from "../../../@shared/contexts/Doctor/DoctorContext";
import { CreateDoctorForm } from "../../forms/doctor/CreateDoctorForm";
import { Table } from "../../components/Table";
import { UpdateDoctorForm } from "../../forms/doctor/UpdateDoctorForm";
import TableOptions from "../../components/Table/TableOptions";
import toast from "react-hot-toast";

function Page() {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const context = useContext(DoctorContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openViewInfo, setOpenViewInfo] = useState(false);

  const handleDeleteById = (id: string) => {
    setIdToDelete(id);
    setOpenDelete(true);
  };

  const handleViewInfo = (id: string) => {
    setSelectedDoctor(id);
    setOpenViewInfo(true);
  };

  if (!context) {
    return <div>Loading...</div>;
  }

  const {
    fetchDoctors,
    deleteDoctor,
    setOpenCreateDoctorModal,
    setOpenUpdateDoctorModal,
    openCreateDoctorModal,
    openUpdateDoctorModal,
  } = context;

  const doctorsData = fetchDoctors.data || [];

  const filteredDoctor =
    searchTerm.trim() === ""
      ? doctorsData
      : doctorsData.filter((doctor: { crm: string }) =>
          doctor.crm.includes(searchTerm.trim())
        );

  const renderOptions = (id: string) => (
    <TableOptions
      options={[
        {
          label: "Atualizar",
          onClick: () => {
            setSelectedDoctor(id);
            setOpenUpdateDoctorModal(true);
          },
        },
        {
          label: "Visualizar",
          onClick: () => handleViewInfo(id),
        },
        {
          label: "Excluir",
          onClick: () => handleDeleteById(id),
        },
      ]}
    />
  );

  const selectedDoctorData = selectedDoctor
    ? doctorsData.find((doctor: { id: string }) => doctor.id === selectedDoctor)
    : null;
  return (
    <div className="h-[80vh] bg-white rounded-md">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between pt-6 px-6 lg:px-8">
        <div>
          <h2 className="text-gray-900 text-lg font-semibold">Médicos</h2>
          <p className="text-gray-500 text-xs">
            Gerencie os médicos cadastrados
          </p>
          <div className="flex gap-2 items-end">
            <Input
              placeholder="Pesquise pelo CRM"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className="w-auto md:w-96"
            />
          </div>
        </div>
        <Button onClick={() => setOpenCreateDoctorModal(true)}>
          Cadastrar Médico
        </Button>
      </div>
      <div>
        <Table
          columns={[
            { header: "Código de Médico", key: "id" },
            { header: "CRM", key: "crm" },
            { header: "Nome", key: "name" },
            { header: "Email", key: "email" },
            { header: "Telefone", key: "telephone" },
            {
              header: "",
              key: "options",
              render: (rowData) => renderOptions(rowData.id),
            },
          ]}
          data={filteredDoctor}
        />
      </div>

      <Modal
        open={openCreateDoctorModal}
        onClose={() => setOpenCreateDoctorModal(false)}
      >
        <CreateDoctorForm />
      </Modal>

      <Modal
        open={openUpdateDoctorModal}
        onClose={() => setOpenUpdateDoctorModal(false)}
      >
        {selectedDoctor && <UpdateDoctorForm doctor={selectedDoctorData} />}
      </Modal>
      <Modal
        position={"center"}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <div className="flex flex-col gap-4 mt-5 w-[20vw] justify-center">
          <p className="font-semibold text-lg w-full text-center">
            Tem certeza que deseja excluir esse médico?
          </p>
          <Button
            onClick={() => {
              deleteDoctor(idToDelete);
              setOpenDelete(false);
              toast.success("Paciente excluído com sucesso!");
            }}
          >
            Confirmar deleção
          </Button>
        </div>
      </Modal>

      <Modal
        position={"center"}
        open={openViewInfo}
        onClose={() => setOpenViewInfo(false)}
      >
        <div className="flex flex-col gap-4 mt-5 w-[35vw]">
          <div className="flex gap-4">
            <Input label="CRM" disabled value={selectedDoctorData?.crm} />
            <Input label="Nome" disabled value={selectedDoctorData?.name} />
          </div>
          <Input label="Email" disabled value={selectedDoctorData?.email} />
          <Input
            label="Telefone"
            disabled
            value={selectedDoctorData?.telephone}
          />
        </div>
      </Modal>
    </div>
  );
}

export function DoctorPage() {
  return (
    <DoctorsContextProvider>
      <Page />
    </DoctorsContextProvider>
  );
}
