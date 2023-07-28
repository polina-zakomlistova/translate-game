import React, { FC, useState } from 'react';
import styles from './index.module.scss';
import ContentBlockList from 'molecules/ContentBlockList';
import { ContentBlockTheme } from 'atoms/ContentBlock';
import { observer } from 'mobx-react-lite';

interface IpropsTextBlockList {
    textsList: string[];
    className?: string;
}

const AnswerOptions: FC<IpropsTextBlockList> = (props) => {
    const { textsList, className } = props;
    return (
        <ContentBlockList
            className={className}
            contentList={textsList}
            themeContent={ContentBlockTheme.TEXT}
            themeEmpty={ContentBlockTheme.EMPTY}
        ></ContentBlockList>
    );
};

export default observer(AnswerOptions);
