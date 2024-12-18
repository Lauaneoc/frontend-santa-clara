import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { SchedulingContext } from "../../../@shared/contexts/Scheduling/SchedulingContext";
import SchedulingService from "../../../@shared/services/SchedulingService";
import { PieChart } from "../../components/Charts/PieChart"; // Importe o PieChart
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

  // Prepare os dados para o gráfico de pizza
  const pieChartData = examsCount
    ? examsCount.map((status: any) => ({
        label: status.status,
        count: status.examCount,
      }))
    : [];

  return (
    <div>
      {/* Cards Container */}
      <div className="flex gap-2">
        {/* Card: Top 20 Exames (Gráfico de Barras) */}
        <div className="bg-white rounded-md p-6 w-[50%]">
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
        {/* Card: Status dos Exames */}
        <div className="bg-white rounded-md p-6 w-[50%]">
          {examsCount ? (
            <PieChart chartData={pieChartData} color="blue" />
          ) : (
            <p>Nenhum dado encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
