import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";

export function Exam() {
    return (
        <div className="h-[80vh] rounded-md bg-slate-50">
            <div className="flex items-start justify-between pt-6 px-6 lg:px-8">
                <div>
                    <h2 className="text-gray-900 text-lg font-semibold">Exames</h2>
                    <p className="text-gray-500 text-xs">Gerencie seus exames</p>
                </div>
                <Button>Cadastrar Exame</Button>
            </div>
            <div>
                <Table 
                    columns={[
                        {header: 'Código do exame', key: 'examCode'},
                        {header: 'Especialidade', key: 'specialty'},
                        {header: 'Categoria', key: 'category'},
                        { 
                            header: '', 
                            key: 'options',
                            render: (rowData) => (
                                <button>
                                    <EllipsisVerticalIcon className="w-5 h-5 text-gray-600" />
                                </button>
                            )
                        }
                    ]}
                    data={[
                        {examCode: '001', specialty: 'Glicemia', category: 'Laboratorial', options: ''},
                        {examCode: '002', specialty: 'Raio X', category: 'Imagem'},
                        {examCode: '003', specialty: 'Audiometria', category: 'Funcional'},
                        {examCode: '004', specialty: 'Toxicológico', category: 'Laboratorial'},
                        {examCode: '005', specialty: 'Oftalmológico', category: 'Clínico'},
                        {examCode: '006', specialty: 'Eletrocardiograma', category: 'Imagem'},
                        {examCode: '007', specialty: 'Exame de Sangue', category: 'Laboratorial'},
                        {examCode: '008', specialty: 'Ultrassom Abdominal', category: 'Imagem'},
                        {examCode: '009', specialty: 'Ressonância Magnética', category: 'Imagem'},
                        {examCode: '010', specialty: 'Endoscopia', category: 'Clínico'},
                    ]}
                />
            </div>
        </div>
    );
}
