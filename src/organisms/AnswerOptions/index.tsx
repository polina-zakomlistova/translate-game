import React, { FC, useState } from 'react';
import styles from './index.module.scss';
import ContentBlockList from 'molecules/ContentBlockList';
import { ContentBlockTheme } from 'atoms/ContentBlock';

interface IpropsTextBlockList {
    textsList: string[];
}

const AnswerOptions: FC<IpropsTextBlockList> = (props) => {
    const { textsList } = props;
    return (
        <ContentBlockList
            contentList={textsList}
            themeContent={ContentBlockTheme.TEXT}
            themeEmpty={ContentBlockTheme.EMPTY}
        ></ContentBlockList>
    );
};

export default AnswerOptions;
