import { makeAutoObservable } from 'mobx';
import { getSentensesForTranslate } from 'apiServices/getSentensesForTranslate';
import RootStore from './index';

interface Sentence {
    en: string;
    ru: string;
    isCorrect?: boolean | undefined;
}
interface ITranslateStore {
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
    checkSentense: (sentense: string) => boolean;
    checkSentensesEqual: (sentenseOne: string, sentenseTwo: string) => boolean;
    shuffleSourseTextList: string[];
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

    get quantytySentences() {
        return this.sentences.length;
    }
    get quantytyCorrectSentences() {
        return this.sentences.filter((sentence) => sentence.isCorrect === true)
            .length;
    }

    get currentSentenceRu() {
        return this.currentSentence ? this.currentSentence.ru : '';
    }

    get currentSentenceEn() {
        return this.currentSentence ? this.currentSentence.en : '';
    }

    get shuffleSourseTextList() {
        const str = this.removePunctuation(this.currentSentenceEn);
        const arraySentenceEn = this.sentenceToArray(str);
        const shuffleArraySentenceEn = this.shuffleArray(arraySentenceEn);
        return shuffleArraySentenceEn;
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
        arr = arr.filter((entry) => entry.trim() != '');
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

    get isCurrentCorrect() {
        return this.sentences[this.currentSentenceIndex].isCorrect;
    }

    setIsCorrectValue = (
        indexSentense: number = this.currentSentenceIndex,
        isCorrect: boolean
    ) => {
        this.sentences[indexSentense].isCorrect = isCorrect;
    };

    checkSentensesEqual = (
        sentenseOne: string,
        sentenseTwo: string
    ): boolean => {
        return (
            this.removePunctuation(sentenseOne.toLocaleLowerCase()) ==
            this.removePunctuation(sentenseTwo.toLocaleLowerCase())
        );
    };

    checkSentense = (sentense: string): boolean => {
        return this.checkSentensesEqual(sentense, this.currentSentenceEn);
    };

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
