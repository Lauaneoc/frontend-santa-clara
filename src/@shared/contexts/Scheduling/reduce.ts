import { queryKeys } from "../../config/querKeys";

export interface SchedulingState {
    [queryKeys.SCHEDULING.FIND_MANY]: Record<string, any>;
}

export type SchedulingAction = {
    type: string;
    payload: any;
};

export const initialState: SchedulingState = {
    [queryKeys.SCHEDULING.FIND_MANY]: {},
}

export const reducer = (state: SchedulingState, action: SchedulingAction): SchedulingState => {
    switch (action.type) {
        case 'SET_SCHEDULING_QUERY':
            return {
                ...state,
                [queryKeys.SCHEDULING.FIND_MANY]: action.payload,
            };
        default:
            return state;
    }
};
