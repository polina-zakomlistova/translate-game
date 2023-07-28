import { makeAutoObservable } from 'mobx';
import { getSentensesForTranslate } from 'apiServices/getSentensesForTranslate';
import RootStore from './index';

export interface ITranslateStore {
    currentSentenceIndex: number;
    sentences: Sentence[];
    rootStore: RootStore;
    currentSentenceRu: string;
    currentSentenceEn: string;
    sentenceToArray: (sentence: string) => string[];
    arrayToSentence: (arr: string[]) => string;
    fetchSentences: () => Promise<void>;
    shuffleArray: <T>(array: T[]) => T[];
    currentSentence: Sentence | undefined;
    nextSentence: () => void;
    resetSentences: () => void;
    removePunctuation: (str: string) => string;
}

interface Sentence {
    en: string;
    ru: string;
    isCorrect?: boolean | undefined;
}

export default class TranslateStore implements ITranslateStore {
    rootStore: RootStore;
    sentences: Sentence[] = [];
    currentSentenceIndex = 0;

    fetchSentences = async () => {
        this.sentences = await getSentensesForTranslate();
    };

    get currentSentence() {
        return this.sentences[this.currentSentenceIndex];
    }

    get currentSentenceRu() {
        return this.currentSentence ? this.currentSentence.ru : '';
    }

    get currentSentenceEn() {
        return this.currentSentence ? this.currentSentence.en : '';
    }

    nextSentence = () => {
        this.currentSentenceIndex += 1;
    };

    resetSentences = () => {
        this.currentSentenceIndex = 0;
        this.sentences.forEach((sentence) => {
            sentence.isCorrect = undefined;
        });
    };

    sentenceToArray = (sentence: string): string[] => {
        const words = sentence.split(' ');
        return words;
    };

    arrayToSentence = (arr: string[]): string => {
        const sentence = arr.join(' ');
        return sentence;
    };

    shuffleArray = <T>(array: T[]): T[] => {
        const shuffledArray = [...array];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
            ];
        }

        return shuffledArray;
    };

    removePunctuation = (str: string): string => {
        return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    };

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
