// @ts-ignore
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { SchedulingContext, SchedulingsContextProvider } from "../../../@shared/contexts/Scheduling/SchedulingContext";
import { PieChart } from "../../components/Charts/PieChart";
import { VerticalBarChart } from "../../components/Charts/VerticalBarChart";
import { PieChartCard, PieChartCardLabels } from "../../components/Cards/PieChartCard";
import { VerticalBarCard } from "../../components/Cards/VerticalBarCard";
import UpcomingAppointmentsToday from "../../components/UpcomingAppointmentsToday";

function Page() {
    const context = useContext(SchedulingContext);

    const { data: schedulingByDate, isLoading, isError } = useQuery(
        {
          queryKey: ['schedulingByDate', '2024-12-18'],
          queryFn: () => fetchSchedulingByDate('2024-12-18'),
        }
      );
  
    if (!context) {
      return <div>Carregando...</div>;
    }
  
    const { topExams, topEnterprises, examsCount, fetchSchedulingByDate } = context;
  
    if (isLoading) return <div>Carregando...</div>;
    if (isError) return <div>Erro ao carregar agendamentos por data.</div>;
    
    const examLabels = topExams?.map((exam: any) => exam.specialty) || [];
    const examCounts = topExams?.map((exam: any) => exam.totalAgendamentos) || [];
  
    const pieChartData = examsCount
      ? examsCount.map((status: any) => ({
          label: status.status,
          count: status.examCount,
        })).filter((data: { label: any; count: number }) => data.label && data.count > 0)
      : [];
  
    const pieChartDataEnterprise = topEnterprises
      ? topEnterprises.map((data: any) => ({
          label: data.enterprise_legalName,
          count: data.countScheduling,
        })).filter((data: { label: any; count: number }) => data.label && data.count > 0)
      : [];
  
    return (
      <div className="flex gap-4">
        {/* Cards Container */}
        <div className="flex flex-col gap-4 w-[60%] ">
          {/* Card: Top 20 Exames (Gráfico de Barras) */}
          <div className="rounded-md w-full">
            {topExams && topExams.length > 0 ? (
              <VerticalBarCard
                graph={
                  <VerticalBarChart
                    labels={examLabels}
                    datasetsOptions={examCounts}
                    labelDataset="Agendamentos"
                    backgroundColor="red"
                    borderColor="red"
                    legendVisible={true}
                    legendPosition="top"
                    className="w-full h-44"
                  />
                }
                title={"Especialidades com mais agendamentos"}
              />
            ) : (
              <p>Nenhum dado encontrado.</p>
            )}
          </div>
  
          {/* Card: Status dos Exames */}
          <div className="rounded-md w-full  flex gap-4">
            {examsCount && examsCount.length > 0 ? (
              <PieChartCard
                title="Exames por Status"
                subtitle="Distribuição dos exames agendados"
                graph={<PieChart chartData={pieChartData} color="red" />}
                labels={<PieChartCardLabels data={pieChartData} color="red" />}
              />
            ) : (
              <p>Nenhum dado encontrado.</p>
            )}
  
            {/* Card: Empresas com mais agendamentos */}
            {topEnterprises && topEnterprises.length > 0 ? (
              <PieChartCard
                title="Empresas com mais agendamentos"
                subtitle="Distribuição dos exames agendados por empresa"
                graph={<PieChart chartData={pieChartDataEnterprise} color="red" />}
                labels={<PieChartCardLabels data={pieChartDataEnterprise} color="red" />}
              />
            ) : (
              <p>Nenhum dado encontrado.</p>
            )}
          </div>
        </div>
  
        {/* Agendamentos de Hoje */}
        <div className="w-[50%] h-[78vh] rounded-lg bg-white shadow-md overflow-y-auto">
            <UpcomingAppointmentsToday appointments={schedulingByDate || []} />
        </div>
      </div>
    );
  }
  

export function DashboardPage() {
  return (
    <SchedulingsContextProvider>
      <Page />
    </SchedulingsContextProvider>
  );
}
