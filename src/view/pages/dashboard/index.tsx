import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { SchedulingContext } from "../../../@shared/contexts/Scheduling/SchedulingContext";
import SchedulingService from "../../../@shared/services/SchedulingService";
import { VerticalBarChart } from "../../components/Charts/VerticalBarChart";

export function DashboardPage() {
  const context = useContext(SchedulingContext);

  const { data: examsCount, isLoading: loadingExams } = useQuery({
    queryKey: ["countExamsByStatus"],
    queryFn: SchedulingService.countExamsByStatus,
  });

  const { data: topEnterprises, isLoading: loadingEnterprises } = useQuery({
    queryKey: ["topEnterprisesByScheduling"],
    queryFn: SchedulingService.getTopEnterprises,
  });

  const { data: topExams, isLoading: loadingTopExams } = useQuery({
    queryKey: ["top20Exams"],
    queryFn: SchedulingService.getTop20Exams,
  });

  const examLabels = topExams?.map((exam: any) => exam.specialty) || [];
  const examCounts = topExams?.map((exam: any) => exam.totalAgendamentos) || [];

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Cards Container */}
      <div
      >
        {/* Card: Contagem de Exames
        <Card title="Status dos Exames" isLoading={loadingExams}>
          {examsCount && Array.isArray(examsCount) && examsCount.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {examsCount.map((status: any) => (
                <li key={status.status} style={{ marginBottom: "0.5rem" }}>
                  <strong>{status.status}:</strong> {status.examCount} exames
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum dado encontrado.</p>
          )}
        </Card>

         Card: Top Empresas 
        <Card title="Top Empresas" isLoading={loadingEnterprises}>
          {topEnterprises ? (
            <ol style={{ paddingLeft: "1.2rem" }}>
              {topEnterprises.map((enterprise: any) => (
                <li key={enterprise.enterprise_id}>
                  <strong>{enterprise.enterprise_legalName}:</strong>{" "}
                  {enterprise.countScheduling} agendamentos
                </li>
              ))}
            </ol>
          ) : (
            <p>Nenhum dado encontrado.</p>
          )}
        </Card> */}

      </div>
      <div className="bg-white rounded-md p-6 w-[50%]">
        {/* Card: Top 20 Exames (Gráfico) */}
        {topExams ? (
            <VerticalBarChart
            labels={examLabels}
            datasetsOptions={examCounts} 
            labelDataset="Agendamentos"
            backgroundColor="red"
            borderColor="red"
            legendVisible={true}
            legendPosition="top"
            className="w-full h-64" 
            />
        ) : (
            <p>Nenhum dado encontrado.</p>
        )}
      </div>
    </div>
  );
}

type CardProps = {
    title: string;
    isLoading: boolean;
    children: React.ReactNode;
  };

function Card({ title, isLoading, children }: CardProps) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 min-h-[200px]">
        <h2 className="text-xl mb-4 text-center font-semibold">{title}</h2>
        {isLoading ? <p className="text-center">Carregando...</p> : children}
      </div>
    );
  }
