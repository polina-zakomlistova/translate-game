export enum SentensesActionTypes {
    FETCH__SENTENSES = 'FETCH__SENTENSES',
    FETCH__SENTENSES_SUCCESS = 'FETCH__SENTENSES_SUCCESS',
    FETCH__SENTENSES_ERROR = 'FETCH__SENTENSES_ERROR',
}

export interface ISentenceState {
    users: ISentence[];
    loading: boolean;
    error: null | string;
}

export interface ISentence {
    en: string;
    ru: string;
    isCorrect?: boolean | undefined;
}
