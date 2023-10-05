import React, { FC, useState } from 'react';
import styles from './index.module.scss';
import ContentBlockListDragAnDDrop from 'molecules/ContentBlockListDragAndDrop';
import { ContentBlockTheme } from 'atoms/ContentBlock';
import { observer } from 'mobx-react-lite';

interface IpropsTextBlockList {
    textsList: string[];
    className?: string;
    listId: string;
    isCorrect: boolean;
    moveItemInOtherList: (dragIndex: number, hoverIndex: number) => void;
    moveItemInOwmList: (dragIndex: number, hoverIndex: number) => void;
}

const QuestionOptions: FC<IpropsTextBlockList> = (props) => {
    const {
        textsList,
        className,
        moveItemInOtherList,
        moveItemInOwmList,
        listId,
        isCorrect,
    } = props;
    return (
        <ContentBlockListDragAnDDrop
            className={className}
            contentList={textsList}
            themeContent={
                isCorrect ? ContentBlockTheme.CORRECT : ContentBlockTheme.TEXT
            }
            themeEmpty={ContentBlockTheme.EMPTY}
            moveItemInOtherList={moveItemInOtherList}
            moveItemInOwmList={moveItemInOwmList}
            listId={listId}
        ></ContentBlockListDragAnDDrop>
    );
};

export default observer(QuestionOptions);
