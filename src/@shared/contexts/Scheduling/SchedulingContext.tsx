import React, { createContext, useReducer, ReactNode, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { SchedulingState, initialState, reducer } from './reduce';
import { queryKeys } from '../../config/querKeys';
import SchedulingService from '../../services/SchedulingService';
import { Scheduling, SchedulingCreate, SchedulingUpdate } from '../../interfaces/models/Scheduling';

interface SchedulingContextType {
    fetchSchedulings: any;
    createScheduling: any;
    updateScheduling: any;
    deleteScheduling: (id: string) => void;
    fetchSchedulingByDate: (date: string) => void;
    state: SchedulingState;
    setQuery: (type: string, payload: any) => void;
    openCreateSchedulingModal: boolean;
    openUpdateSchedulingModal: boolean;
    setOpenCreateSchedulingModal: (open: boolean) => void;
    setOpenUpdateSchedulingModal: (open: boolean) => void;
    topExams: any;
    topEnterprises: any;
    examsCount: any;
}

export const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

interface SchedulingsContextProviderProps {
    children: ReactNode;
}

export const SchedulingsContextProvider: React.FC<SchedulingsContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [openCreateSchedulingModal, setOpenCreateSchedulingModal] = useState(false);
    const [openUpdateSchedulingModal, setOpenUpdateSchedulingModal] = useState(false);
    const queryClient = useQueryClient();

    const fetchSchedulings = useQuery({
        queryKey: [queryKeys.SCHEDULING.FIND_MANY, state[queryKeys.SCHEDULING.FIND_MANY]],
        queryFn: () => SchedulingService.getSchedulings(),
        staleTime: Infinity,
        enabled: true,
    });

    const createScheduling = useMutation({
        mutationFn: (schedulingData: SchedulingCreate) => SchedulingService.createOne(schedulingData),
        onSuccess: () => {
            toast.success('Agendamento cadastrado com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.SCHEDULING.FIND_MANY] });
        },
        onError: () => {
            toast.error('Erro ao cadastrar o agendamento!');
        },
    });

    const updateScheduling = useMutation({
        mutationFn: (schedulingData: SchedulingUpdate) => SchedulingService.updateOne(schedulingData),
        onSuccess: () => {
            toast.success('Agendamento atualizado com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.SCHEDULING.FIND_MANY] });
        },
        onError: () => {
            toast.error('Erro ao atualizar agendamento!');
        },
    });

    const deleteScheduling = useMutation({
        mutationFn: (id: string) => SchedulingService.deleteOne(id),
        onSuccess: () => {
            toast.success('Agendamento excluído com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.SCHEDULING.FIND_MANY] });
        },
        onError: () => {
            toast.error('Erro ao excluir o agendamento!');
        },
    });

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

    const fetchSchedulingByDate = async (date: string) => {
        try {
            const schedulingData = await SchedulingService.getSchedulingByDate(date);
            return schedulingData;
        } catch (error) {
            toast.error('Erro ao buscar agendamento para a data fornecida');
            console.error(error);
        }
    };

    const setQuery = (type: string, payload: any) => {
        dispatch({ type, payload });
    };

    const contextValues = {
        fetchSchedulings,
        createScheduling,
        deleteScheduling: deleteScheduling.mutate,
        state,
        updateScheduling,
        setQuery,
        openCreateSchedulingModal,
        openUpdateSchedulingModal,
        setOpenCreateSchedulingModal,
        setOpenUpdateSchedulingModal,
        examsCount,
        topEnterprises,
        topExams,
        fetchSchedulingByDate,
    };

    return (
        <SchedulingContext.Provider value={contextValues}>
            {children}
        </SchedulingContext.Provider>
    );
};
