import useStore from 'hooks/useStore';
import React, { FC, useEffect } from 'react';
import TranslateGame from 'templates/TranslateGame';
import style from './index.module.scss';
import { observer } from 'mobx-react-lite';

const Page1: FC = () => {
    const [translateStore] = useStore('translate');
    const { isVictory } = translateStore;

    return (
        <div className={style.wrapper}>
            <h2 className={isVictory ? 'visually-hidden' : style.header}>
                Translate this sentence
            </h2>

            <div className={style.content}>
                <TranslateGame />
            </div>
        </div>
    );
};

export default observer(Page1);
