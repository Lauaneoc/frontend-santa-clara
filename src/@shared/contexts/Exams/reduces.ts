import { queryKeys } from "../../config/querKeys";

export interface ExamState {
    [queryKeys.EXAM.FIND_MANY]: Record<string, any>;
}

export type ExamAction = {
    type: string;
    payload: any;
};

export const initialState: ExamState = {
    [queryKeys.EXAM.FIND_MANY]: {},
}

export const reducer = (state: ExamState, action: ExamAction): ExamState => {
    switch (action.type) {
        case 'SET_EXAM_QUERY':
            return {
                ...state,
                [queryKeys.EXAM.FIND_MANY]: action.payload,
            };
        default:
            return state;
    }
};
