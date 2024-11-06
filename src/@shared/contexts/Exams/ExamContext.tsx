// src/context/ExamContext.tsx
import React, { createContext, useReducer, ReactNode, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ExamState, initialState, reducer } from './reduces';
import { queryKeys } from '../../config/querKeys';
import ExamService from '../../services/ExamService';
import { Exam } from '../../interfaces/models/Exams';

interface ExamContextType {
    fetchExams: any;
    createExam: any;
    updateExam: any;
    state: ExamState;
    openCreateExamModal: boolean;
    openUpdateExamModal: boolean;
    deleteExam: (id: string) => void;
    setQuery: (type: string, payload: any) => void;
    setOpenCreateExamModal: (open: boolean) => void;
    setOpenUpdateExamModal: (open: boolean) => void;
}

export const ExamContext = createContext<ExamContextType | undefined>(undefined);

interface ExamsContextProviderProps {
    children: ReactNode;
}

export const ExamsContextProvider: React.FC<ExamsContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [openCreateExamModal, setOpenCreateExamModal] = useState(false);
    const [openUpdateExamModal, setOpenUpdateExamModal] = useState(false);
    const queryClient = useQueryClient();

    // Fetch exams
    const fetchExams = useQuery({
        queryKey: [queryKeys.EXAM.FIND_MANY, state[queryKeys.EXAM.FIND_MANY]],
        queryFn: () => ExamService.getExams(state[queryKeys.EXAM.FIND_MANY]),
        staleTime: Infinity,
        enabled: true,
    });

    // Create exam
    const createExam = useMutation({
        mutationFn: (examData: Exam) => ExamService.createOne(examData),
        onSuccess: () => {
            toast.success('Exame cadastrado com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.EXAM.FIND_MANY] }); 
        },
        onError: () => {
            toast.error('Erro ao cadastrar o exame!');
        },
    });

    // Update exam
    const updateExam = useMutation({
        mutationFn: (examData: Exam) => ExamService.updateOne(examData),
        onSuccess: () => {
            toast.success('Exame atualizado com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.EXAM.FIND_MANY] }); 
        },
        onError: () => {
            toast.error('Erro ao atualizado o exame!');
        },
    });

    // Delete exam
    const deleteExam = useMutation({
        mutationFn: (id: string) => ExamService.deleteOne(id),
        onSuccess: () => {
            toast.success('Exame excluído com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.EXAM.FIND_MANY] });
        },
        onError: () => {
            toast.error('Erro ao excluir o exame!');
        },
    });

    const setQuery = (type: string, payload: any) => {
        dispatch({ type, payload });
    };

    const contextValues = {
        fetchExams,
        createExam,
        deleteExam: deleteExam.mutate,
        state,
        updateExam,
        setQuery,
        openCreateExamModal,
        openUpdateExamModal,
        setOpenCreateExamModal,
        setOpenUpdateExamModal
    };

    return (
        <ExamContext.Provider value={contextValues}>
            {children}
        </ExamContext.Provider>
    );
}

