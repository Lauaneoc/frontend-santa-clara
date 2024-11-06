import React, { createContext, useReducer, ReactNode, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PatientState, initialState, reducer } from './reduces';
import { queryKeys } from '../../config/querKeys';
import PatientService from '../../services/PatientService';
import { Patient } from '../../interfaces/models/Patient';

interface PatientContextType {
    fetchPatients: any;
    createPatient: any;
    updatePatient: any;
    deletePatient: (id: string) => void;
    state: PatientState;
    setQuery: (type: string, payload: any) => void;
    openCreatePatientModal: boolean;
    openUpdatePatientModal: boolean;
    setOpenCreatePatientModal: (open: boolean) => void;
    setOpenUpdatePatientModal: (open: boolean) => void;
}

export const PatientContext = createContext<PatientContextType | undefined>(undefined);

interface PatientsContextProviderProps {
    children: ReactNode;
}

export const PatientsContextProvider: React.FC<PatientsContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [openCreatePatientModal, setOpenCreatePatientModal] = useState(false);
    const [openUpdatePatientModal, setOpenUpdatePatientModal] = useState(false);
    const queryClient = useQueryClient();

    const fetchPatients = useQuery({
        queryKey: [queryKeys.PATIENT.FIND_MANY, state[queryKeys.PATIENT.FIND_MANY]],
        queryFn: () => PatientService.getPatients(),
        staleTime: Infinity,
        enabled: true,
    });

    const createPatient = useMutation({
        mutationFn: (patientData: Patient) => PatientService.createOne(patientData),
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
