export enum UserActionTypes {
    FETCH__USERS = 'FETCH_USERS',
    FETCH__USERS_SUCCESS = 'FETCH__USERS_SUCCESS',
    FETCH__USERS_ERROR = 'FETCH__USERS_ERROR',
}

export interface IUser {
    name: string;
    id: string;
}

export interface IUserState {
    users: IUser[];
    loading: boolean;
    error: null | string;
}

export interface ICartItem {
    id: number;
    cnt: number;
}
export type ICartList = ICartItem[];
