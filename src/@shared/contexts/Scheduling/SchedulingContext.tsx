import React, { createContext, useReducer, ReactNode, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { SchedulingState, initialState, reducer } from './reduce';
import { queryKeys } from '../../config/querKeys';
import PatientService from '../../services/PatientService';
import { Patient } from '../../interfaces/models/Patient';
import { PatientContext } from '../Patients/PatientContext';
import SchedulingService from '../../services/SchedulingService';

interface SchedulingContextType {
    fetchScheduling: any;
    createScheduling: any;
    updateScheduling: any;
    deleteScheduling: (id: string) => void;
    state: SchedulingState;
    setQuery: (type: string, payload: any) => void;
    openCreateSchedulingModal: boolean;
    openUpdateSchedulingModal: boolean;
    setOpenCreateSchedulingModal: (open: boolean) => void;
    setOpenUpdateSchedulingModal: (open: boolean) => void;
}

export const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

interface SchedulingsContextProviderProps {
    children: ReactNode;
}

export const PatientsContextProvider: React.FC<SchedulingsContextProviderProps> = ({ children }) => {
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

    const createPatient = useMutation({
        mutationFn: (patientData: Patient) => SchedulingService.createOne(patientData),
        onSuccess: () => {
            toast.success('Paciente cadastrado com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.PATIENT.FIND_MANY] }); 
        },
        onError: () => {
            toast.error('Erro ao cadastrar o paciente!');
        },
    });

    const updatePatient = useMutation({
        mutationFn: (patientData: Patient) => PatientService.updateOne(patientData),
        onSuccess: () => {
            toast.success('Paciente atualizado com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.PATIENT.FIND_MANY] }); 
        },
        onError: () => {
            toast.error('Erro ao atualizar paciente!');
        },
    });

    const deletePatient = useMutation({
        mutationFn: (id: string) => PatientService.deleteOne(id),
        onSuccess: () => {
            toast.success('Paciente excluído com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.PATIENT.FIND_MANY] });
        },
        onError: () => {
            toast.error('Erro ao excluir o paciente!');
        },
    });

    const setQuery = (type: string, payload: any) => {
        dispatch({ type, payload });
    };

    const contextValues = {
        fetchPatients,
        createPatient,
        deletePatient: deletePatient.mutate,
        state,
        updatePatient,
        setQuery,
        openCreatePatientModal,
        openUpdatePatientModal,
        setOpenCreatePatientModal,
        setOpenUpdatePatientModal
    };

    return (
        <PatientContext.Provider value={contextValues}>
            {children}
        </PatientContext.Provider>
    );
};
