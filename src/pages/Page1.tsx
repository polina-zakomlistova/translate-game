import React, { FC } from 'react';
import TranslateGame from 'templates/TranslateGame';

const Page1: FC = () => {
    const texts = [
        'ffff',
        'dddddd',
        'ddddgggg',
        'gggdfgdfg',
        'dgdfgdfg',
        'dv',
        'vrdf',
    ];
    return (
        <>
            <h1>Page1</h1>

            <TranslateGame textsList={texts}></TranslateGame>
        </>
    );
};

export default Page1;
