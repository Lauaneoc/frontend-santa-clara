import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext } from 'react';
import toast from 'react-hot-toast';
import ExamService from '../../services/ExamService';
import { Exam } from '../../interfaces/models/Exams';

interface IExamContext {
    fetchExams: ReturnType<typeof useQuery>;
    createExam: (examData: Partial<Exam>) => void;
    updateExam: (examData: Exam) => void;
    deleteExam: (examId: string) => void;
    state: any;
}

export const ExamContext = createContext({} as IExamContext);

export const ExamsContextProvider = ({ children }: { children: React.ReactNode; }) => {
    const queryClient = useQueryClient();

    const fetchExams = useQuery({
        queryKey: ['exams'],
        queryFn: () => ExamService.getExams(),
        staleTime: Infinity,
    });

    const { mutate: createExam } = useMutation({
        mutationFn: (examData: Partial<Exam>) => ExamService.createOne(examData),
        onSuccess: () => {
            toast.success('Exame criado com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['exams'] }); 
        },
        onError: () => {
            toast.error('Erro ao criar exame!');
        },
    });

    const { mutate: updateExam } = useMutation({
        mutationFn: (examData: Exam) => ExamService.updateOne(examData),
        onSuccess: () => {
            toast.success('Exame atualizado com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['exams'] }); 

        },
        onError: () => {
            toast.error('Erro ao atualizar exame!');
        },
    });

    const { mutate: deleteExam } = useMutation({
        mutationFn: (examId: string) => ExamService.deleteOne(examId),
        onSuccess: () => {
            toast.success('Exame deletado com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['exams'] }); 

        },
        onError: () => {
            toast.error('Erro ao deletar exame!');
        },
    });

    const contextValues = {
        fetchExams,
        createExam,
        updateExam,
        deleteExam,
        state: {},
    };

    return (
        <ExamContext.Provider value={contextValues}>
            {children}
        </ExamContext.Provider>
    );
};
