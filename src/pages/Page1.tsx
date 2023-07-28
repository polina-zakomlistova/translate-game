import useStore from 'hooks/useStore';
import React, { FC, useEffect } from 'react';
import TranslateGame from 'templates/TranslateGame';

const Page1: FC = () => {
    const [translateStore] = useStore('translate');
    const { fetchSentences } = translateStore;

    //useEffect(() => fetchSentences, []);

    return (
        <>
            <h1>Translate this sentence</h1>

            <TranslateGame></TranslateGame>
        </>
    );
};

export default Page1;
