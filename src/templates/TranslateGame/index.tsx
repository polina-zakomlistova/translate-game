import React, { FC, useState, useEffect } from 'react';
import styles from './index.module.scss';
import AnswerOptions from 'organisms/AnswerOptions';
import AnswerUser from 'organisms/AnswerUser';
import QuestionBlock from 'organisms/QuestionBlock';
import { observer } from 'mobx-react-lite';
import useStore from 'hooks/useStore';

interface IpropsTextBlockList {}

const TranslateGame: FC<IpropsTextBlockList> = () => {
    const [translateStore] = useStore('translate');
    const {
        fetchSentences,
        currentSentenceRu,
        currentSentenceEn,
        sentenceToArray,
        shuffleArray,
        removePunctuation,
    } = translateStore;

    useEffect(() => {
        fetchSentences();
    }, []);

    const str = removePunctuation(currentSentenceEn); //удаляем пунктуацию
    const arraySentenceEn = sentenceToArray(str);
    const shuffleArraySentenceEn = shuffleArray(arraySentenceEn);

    return (
        <div className={styles.wrapper}>
            <QuestionBlock text={currentSentenceRu} />

            <AnswerUser
                className={styles.margin}
                quantityOptions={
                    shuffleArraySentenceEn.length > 0
                        ? shuffleArraySentenceEn.length - 1
                        : 0
                }
            />
            <AnswerOptions textsList={shuffleArraySentenceEn} />
        </div>
    );
};
export default observer(TranslateGame);
