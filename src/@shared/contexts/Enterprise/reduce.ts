import { queryKeys } from "../../config/querKeys";

export interface EnterpriseState {
  [queryKeys.ENTERPRISE.FIND_MANY]: Record<string, any>;
}

export type EnterpriseAction = {
  type: string;
  payload: any;
};

export const initialState: EnterpriseState = {
  [queryKeys.ENTERPRISE.FIND_MANY]: {},
};

export const reducer = (
  state: EnterpriseState,
  action: EnterpriseAction
): EnterpriseState => {
  switch (action.type) {
    case "SET_ENTERPRISE_QUERY":
      return {
        ...state,
        [queryKeys.ENTERPRISE.FIND_MANY]: action.payload,
      };
    default:
      return state;
  }
};
