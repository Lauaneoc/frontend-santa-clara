import React, { createContext, useReducer, ReactNode, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UserState, initialState, reducer } from './reduce';
import { queryKeys } from '../../config/querKeys';
import SchedulingService from '../../services/SchedulingService';
import { Scheduling, SchedulingCreate, SchedulingUpdate } from '../../interfaces/models/Scheduling';
import UserService from '../../services/UserService';
import { User } from '../../interfaces/models/User';

interface UserContextType {
    fetchUsers: any;
    createUser: any;
    updateUser: any;
    deleteUser: (id: string) => void;
    state: UserState;
    setQuery: (type: string, payload: any) => void;
    openCreateUserModal: boolean;
    openUpdateUserModal: boolean;
    setOpenCreateUserModal: (open: boolean) => void;
    setOpenUpdateUserModal: (open: boolean) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UsersContextProviderProps {
    children: ReactNode;
}

export const UsersContextProvider: React.FC<UsersContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState); 
    const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
    const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);
    const queryClient = useQueryClient();

    const fetchUsers = useQuery({
        queryKey: [queryKeys.USER.FIND_MANY, state[queryKeys.USER.FIND_MANY]],
        queryFn: () => UserService.getUsers(),
        staleTime: Infinity,
        enabled: true,
    });

    const createUser = useMutation({
        mutationFn: (userData: User) => UserService.createOne(userData),
        onSuccess: () => {
            toast.success('Usuário cadastrado com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.SCHEDULING.FIND_MANY] }); 
        },
        onError: () => {
            toast.error('Erro ao cadastrar usuário!');
        },
    });

    const updateUser = useMutation({
        mutationFn: (UserData: User) => UserService.updateOne(UserData),
        onSuccess: () => {
            toast.success('Usuário atualizado com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.USER.FIND_MANY] }); 
        },
        onError: () => {
            toast.error('Erro ao atualizar usuário!');
        },
    });

    const deleteUser = useMutation({
        mutationFn: (id: string) => UserService.deleteOne(id),
        onSuccess: () => {
            toast.success('Usuário excluído com sucesso!');
            queryClient.invalidateQueries({ queryKey: [queryKeys.USER.FIND_MANY] });
        },
        onError: () => {
            toast.error('Erro ao excluir usuário!');
        },
    });

    const setQuery = (type: string, payload: any) => {
        dispatch({ type, payload });
    };

    const contextValues = {
        fetchUsers,
        createUser,
        deleteUser: deleteUser.mutate,
        state,
        updateUser,
        setQuery,
        openCreateUserModal,
        openUpdateUserModal,
        setOpenCreateUserModal,
        setOpenUpdateUserModal,
    };

    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    );
};
