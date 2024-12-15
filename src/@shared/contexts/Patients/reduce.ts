import { queryKeys } from "../../config/querKeys";

export interface PatientState {
    [queryKeys.PATIENT.FIND_MANY]: Record<string, any>;
}

export type PatientAction = {
    type: string;
    payload: any;
};

export const initialState: PatientState = {
    [queryKeys.PATIENT.FIND_MANY]: {},
}

export const reducer = (state: PatientState, action: PatientAction): PatientState => {
    switch (action.type) {
        case 'SET_PACIENT_QUERY':
            return {
                ...state,
                [queryKeys.PATIENT.FIND_MANY]: action.payload,
            };
        default:
            return state;
    }
};
