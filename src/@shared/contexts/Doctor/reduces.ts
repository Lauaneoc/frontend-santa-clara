import { queryKeys } from "../../config/querKeys";

export interface DoctorState {
  [queryKeys.DOCTOR.FIND_MANY]: Record<string, any>;
}

export type DoctorAction = {
  type: string;
  payload: any;
};

export const initialState: DoctorState = {
  [queryKeys.DOCTOR.FIND_MANY]: {},
};

export const reducer = (
  state: DoctorState,
  action: DoctorAction
): DoctorState => {
  switch (action.type) {
    case "SET_DOCTOR_QUERY":
      return {
        ...state,
        [queryKeys.DOCTOR.FIND_MANY]: action.payload,
      };
    default:
      return state;
  }
};
