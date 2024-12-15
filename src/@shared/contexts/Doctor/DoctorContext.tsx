import React, { createContext, useReducer, ReactNode, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { DoctorState, initialState, reducer } from './reduce';
import { queryKeys } from '../../config/querKeys';
import DoctorService from '../../services/DoctorService';
import { Doctor } from '../../interfaces/models/Doctor';

interface DoctorContextType {
    fetchDoctors: any;
    createDoctor: any;
    updateDoctor: any;
    deleteDoctor: (id: string) => void;
    state: DoctorState;
    setQuery: (type: string, payload: any) => void;
    openCreateDoctorModal: boolean;
    openUpdateDoctorModal: boolean;
    setOpenCreateDoctorModal: (open: boolean) => void;
    setOpenUpdateDoctorModal: (open: boolean) => void;
}

export const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

interface DoctorsContextProviderProps {
    children: ReactNode;
}

export const DoctorsContextProvider: React.FC<DoctorsContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [openCreateDoctorModal, setOpenCreateDoctorModal] = useState(false);
    const [openUpdateDoctorModal, setOpenUpdateDoctorModal] = useState(false);
    const queryClient = useQueryClient();

    const fetchDoctors = useQuery({
        queryKey: [queryKeys.DOCTOR.FIND_MANY, state[queryKeys.DOCTOR.FIND_MANY]],
        queryFn: () => DoctorService.getDoctors(),
        staleTime: Infinity,
        enabled: true,
    });

    const createDoctor = useMutation({
        mutationFn: (doctorData: Doctor) => DoctorService.createOne(doctorData),
        onSuccess: () => {
            toast.success('Médico cadastrado com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.DOCTOR.FIND_MANY] }); 
        },
        onError: () => {
            toast.error('Erro ao cadastrar o médico!');
        },
    });

    const updateDoctor = useMutation({
        mutationFn: (doctorData: Doctor) => DoctorService.updateOne(doctorData),
        onSuccess: () => {
            toast.success('Médico atualizado com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.DOCTOR.FIND_MANY] }); 
        },
        onError: () => {
            toast.error('Erro ao atualizar médico!');
        },
    });

    const deleteDoctor = useMutation({
        mutationFn: (id: string) => DoctorService.deleteOne(id),
        onSuccess: () => {
            toast.success('Médico excluído com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.DOCTOR.FIND_MANY] });
        },
        onError: () => {
            toast.error('Erro ao excluir o médico!');
        },
    });

    const setQuery = (type: string, payload: any) => {
        dispatch({ type, payload });
    };

    const contextValues = {
        fetchDoctors,
        createDoctor,
        deleteDoctor: deleteDoctor.mutate,
        state,
        updateDoctor,
        setQuery,
        openCreateDoctorModal,
        openUpdateDoctorModal,
        setOpenCreateDoctorModal,
        setOpenUpdateDoctorModal
    };

    return (
        <DoctorContext.Provider value={contextValues}>
            {children}
        </DoctorContext.Provider>
    );
};
