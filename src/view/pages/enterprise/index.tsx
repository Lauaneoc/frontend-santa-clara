import { useContext, useState } from "react";
import { Input } from "../../components/Input";

import {
  EnterpriseContext,
  EnterprisesContextProvider,
} from "../../../@shared/contexts/Enterprise/EnterpriseContext";
import { Table } from "../../components/Table";

function Page() {
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const mockData = [
    {
      cnpj: "12345678901234",
      legalName: "Empresa X",
      email: "email@empresa.com",
      telephone: "123456789",
    },
    {
      cnpj: "98765432109876",
      legalName: "Empresa Y",
      email: "contato@empresa.com",
      telephone: "987654321",
    },
  ];

  const enterpriseData = fetchEnterprises.data || [];
  console.log("aqui " + fetchEnterprises.data);

  const filteredEnterprise =
    searchTerm.trim() === ""
      ? enterpriseData
      : enterpriseData.filter((enterprise: { cnpj: string }) =>
          enterprise.cnpj.includes(searchTerm.trim())
        );

  //   const renderOptions = (id: string) => (
  //     <TableOptions
  //       options={[
  //         {
  //           label: "Atualizar",
  //           onClick: () => {
  //             setSelectedDoctor(id);
  //             setOpenUpdateDoctorModal(true);
  //           },
  //         },
  //         {
  //           label: "Visualizar",
  //           onClick: () => handleViewInfo(id),
  //         },
  //         {
  //           label: "Excluir",
  //           onClick: () => handleDeleteById(id),
  //         },
  //       ]}
  //     />
  //   );

  //   const selectedDoctorData = selectedDoctor
  //     ? doctorsData.find((doctor: { id: string }) => doctor.id === selectedDoctor)
  //     : null;

  return (
    <div className="h-[80vh] bg-white rounded-md">
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
        {/* <Button onClick={() => setOpenCreateDoctorModal(true)}>
          Cadastrar Empresa
        </Button> */}
      </div>
      <div>
        <Table
          columns={[
            { header: "CNPJ", key: "cnpj" },
            { header: "Razão Social", key: "legalName" },
            { header: "Email", key: "email" },
            // {
            //   header: "",
            //   key: "options",
            //   render: (rowData) => renderOptions(rowData.id),
            // },
          ]}
          data={mockData}
        />
      </div>
      {/* 
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
      </Modal> */}
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
