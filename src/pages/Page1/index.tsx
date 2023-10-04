import useStore from 'hooks/useStore';
import React, { FC, useEffect } from 'react';
import TranslateGame from 'templates/TranslateGame';
import style from './index.module.scss';

const Page1: FC = () => {
    const [translateStore] = useStore('translate');
    const { fetchSentences } = translateStore;

    //useEffect(() => fetchSentences, []);

    return (
        <>
            <h1 className={style.header}>Translate this sentence</h1>

            <TranslateGame></TranslateGame>
        </>
    );
};

export default Page1;
