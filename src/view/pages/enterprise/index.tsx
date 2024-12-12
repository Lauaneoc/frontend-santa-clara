import { useContext, useState } from "react";
import { Input } from "../../components/Input";

import {
  EnterpriseContext,
  EnterprisesContextProvider,
} from "../../../@shared/contexts/Enterprise/EnterpriseContext";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CreateEnterpriseForm } from "../../forms/enterprise/CreateEnterpriseForm";
import { UpdateEnterpriseForm } from "../../forms/enterprise/UpdateEnterpriseForm";
import toast from "react-hot-toast";
import TableOptions from "../../components/Table/TableOptions";

function Page() {
  const [selectedEnterprise, setSelectedEnterprise] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openDelete, setOpenDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>("");		
  const [openViewInfo, setOpenViewInfo] = useState(false);
  const context = useContext(EnterpriseContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const {
    fetchEnterprises,
    deleteEnterprise,
    setOpenCreateEnterpriseModal,
    setOpenUpdateEnterpriseModal,
    openCreateEnterpriseModal,
    openUpdateEnterpriseModal,
  } = context;

  
  const handleDeleteById = (id: string) => {
    setIdToDelete(id);
    setOpenDelete(true);
  };

  const handleViewInfo = (id: string) => {
    setSelectedEnterprise(id);
    setOpenViewInfo(true);
  };

  const enterpriseData = fetchEnterprises.data || [];
  console.log("aqui " + fetchEnterprises.data);

  const filteredEnterprise =
    searchTerm.trim() === ""
      ? enterpriseData
      : enterpriseData.filter((enterprise: { cnpj: string }) =>
          enterprise.cnpj.includes(searchTerm.trim())
        );

     const renderOptions = (id: string) => (
       <TableOptions
         options={[
           {
             label: "Atualizar",
             onClick: () => {
               setSelectedEnterprise(id);
               setOpenUpdateEnterpriseModal(true);
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

     const selectedEnterpriseData = selectedEnterprise
       ? enterpriseData.find((enterprise: { id: string }) => enterprise.id === selectedEnterprise)
       : null;

  return (
    <div className=" bg-white rounded-md">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between pt-6 px-6 lg:px-8">
        <div>
          <h2 className="text-gray-900 text-lg font-semibold">Empresa</h2>
          <p className="text-gray-500 text-xs">
            Gerencie as empresas cadastradas
          </p>
          <div className="flex gap-2 items-end">
            <Input
              placeholder="Pesquise pelo CNPJ"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className="w-auto md:w-96"
            />
          </div>
        </div>
        <Button onClick={() => setOpenCreateEnterpriseModal(true)}>
          Cadastrar Empresa
        </Button> 
      </div>
      <div className="h-[55vh]">
        <Table
          columns={[
            { header: "Código", key: "id" },
            { header: "CNPJ", key: "cnpj" },
            { header: "Razão Social", key: "legalName" },
            { header: "Email", key: "email" },
            {
              header: "",
              key: "options",
              render: (rowData) => renderOptions(rowData.id),
            },
          ]}
          data={filteredEnterprise}
        />
      </div>
      
      <Modal
        open={openCreateEnterpriseModal}
        onClose={() => setOpenCreateEnterpriseModal(false)}
      >
        <CreateEnterpriseForm />
      </Modal>

      <Modal
        open={openUpdateEnterpriseModal}
        onClose={() => setOpenUpdateEnterpriseModal(false)}
      >
        {selectedEnterprise && <UpdateEnterpriseForm enterprise={selectedEnterpriseData}  />}
      </Modal>
      <Modal
        position={"center"}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <div className="flex flex-col gap-4 mt-5 w-[20vw] justify-center">
          <p className="font-semibold text-lg w-full text-center">
            Tem certeza que deseja excluir essa empresa?
          </p>
          <Button
            onClick={() => {
              deleteEnterprise(idToDelete);
              setOpenDelete(false);
              toast.success("Empresa excluída com sucesso!");
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
          <p>visualização empresa</p>
        </div>
      </Modal>
    </div>
  );
}

export function EnterprisePage() {
  return (
    <EnterprisesContextProvider>
      <Page />
    </EnterprisesContextProvider>
  );
}
