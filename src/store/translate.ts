import { makeAutoObservable } from 'mobx';
import { getSentensesForTranslate } from 'apiServices/getSentensesForTranslate';
import RootStore from './index';
import { ISentence } from 'types/translateGame';

export default class TranslateStore {
    rootStore: RootStore;
    sentences: ISentence[] = [];
    currentSentenceIndex = 0;

    get isVictory() {
        let result = false;
        if (this.quantytySentences > 0) {
            result = this.quantytyCorrectSentences == this.quantytySentences;
        }
        return result;
    }

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
        if (this.sentences[indexSentense]) {
            this.sentences[indexSentense].isCorrect = isCorrect;
        }
    };

    setNewCurrentSentense = () => {
        const indexFirstUnCorrect = this.sentences.findIndex(
            (sentence) => sentence.isCorrect == false
        );

        console.log(indexFirstUnCorrect);
        this.currentSentenceIndex =
            indexFirstUnCorrect || this.currentSentenceIndex;
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
