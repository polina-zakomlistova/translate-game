import React, { FC, useState } from 'react';
import styles from './index.module.scss';
import AnswerOptions from 'organisms/AnswerOptions';
import AnswerUser from 'organisms/AnswerUser';

interface IpropsTextBlockList {
    textsList: string[];
}

const TranslateGame: FC<IpropsTextBlockList> = (props) => {
    const { textsList } = props;
    return (
        <div className={styles.wrapper}>
            <AnswerUser
                quantityOptions={
                    textsList.length > 0 ? textsList.length - 1 : 0
                }
            />
            <AnswerOptions textsList={textsList} />
        </div>
    );
};

export default TranslateGame;
