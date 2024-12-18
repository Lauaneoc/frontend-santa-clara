import { queryKeys } from "../../config/querKeys";

export interface UserState {
    [queryKeys.USER.FIND_MANY]: Record<string, any>;
}

export type UserAction = {
    type: string;
    payload: any;
};

export const initialState: UserState = {
    [queryKeys.USER.FIND_MANY]: {},
}

export const reducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'SET_USER_QUERY':
            return {
                ...state,
                [queryKeys.USER.FIND_MANY]: action.payload,
            };
        default:
            return state;
    }
};
