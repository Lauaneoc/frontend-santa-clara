import React, { createContext, useReducer, ReactNode, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EnterpriseState, initialState, reducer } from "./reduce";
import { queryKeys } from "../../config/querKeys";
import EnterpriseService from "../../services/EnterpriseService";
import { Enterprise } from "../../interfaces/models/Enterprise";

interface EnterpriseContextType {
  fetchEnterprises: any;
  createEnterprise: any;
  updateEnterprise: any;
  deleteEnterprise: (id: string) => void;
  state: EnterpriseState;
  setQuery: (type: string, payload: any) => void;
  openCreateEnterpriseModal: boolean;
  openUpdateEnterpriseModal: boolean;
  setOpenCreateEnterpriseModal: (open: boolean) => void;
  setOpenUpdateEnterpriseModal: (open: boolean) => void;
}

export const EnterpriseContext = createContext<
  EnterpriseContextType | undefined
>(undefined);

interface EnterpriseContextProviderProps {
  children: ReactNode;
}

export const EnterprisesContextProvider: React.FC<
  EnterpriseContextProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openCreateEnterpriseModal, setOpenCreateEnterpriseModal] =
    useState(false);
  const [openUpdateEnterpriseModal, setOpenUpdateEnterpriseModal] =
    useState(false);
  const queryClient = useQueryClient();

  const fetchEnterprises = useQuery({
    queryKey: [
      queryKeys.ENTERPRISE.FIND_MANY,
      state[queryKeys.ENTERPRISE.FIND_MANY],
    ],
    queryFn: () => EnterpriseService.getEnterprises,
    staleTime: Infinity,
    enabled: true,
  });

  if (fetchEnterprises.isError) {
    toast.error("Erro ao carregar as empresas.");
    console.error(fetchEnterprises.error);
  }

  const createEnterprise = useMutation({
    mutationFn: (enterpriseData: Enterprise) =>
      EnterpriseService.createOne(enterpriseData),
    onSuccess: () => {
      toast.success("Empresa cadastrada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ENTERPRISE.FIND_MANY],
      });
    },
    onError: () => {
      toast.error("Erro ao cadastrar a empresa!");
    },
  });

  const updateEnterprise = useMutation({
    mutationFn: (enterpriseData: Enterprise) =>
      EnterpriseService.updateOne(enterpriseData),
    onSuccess: () => {
      toast.success("Empresa atualizada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ENTERPRISE.FIND_MANY],
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar Empresa!");
    },
  });

  const deleteEnterprise = useMutation({
    mutationFn: (id: string) => EnterpriseService.deleteOne(id),
    onSuccess: () => {
      toast.success("Empresa excluída com sucesso!");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ENTERPRISE.FIND_MANY],
      });
    },
    onError: () => {
      toast.error("Erro ao excluir a empresa!");
    },
  });

  const setQuery = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const contextValues = {
    fetchEnterprises,
    createEnterprise,
    deleteEnterprise: deleteEnterprise.mutate,
    state,
    updateEnterprise,
    setQuery,
    openCreateEnterpriseModal,
    openUpdateEnterpriseModal,
    setOpenCreateEnterpriseModal,
    setOpenUpdateEnterpriseModal,
  };

  return (
    <EnterpriseContext.Provider value={contextValues}>
      {children}
    </EnterpriseContext.Provider>
  );
};
