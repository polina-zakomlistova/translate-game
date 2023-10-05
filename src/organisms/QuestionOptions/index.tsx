import React, { FC, useState } from 'react';
import styles from './index.module.scss';
import ContentBlockListDragAnDDrop from 'molecules/ContentBlockListDragAndDrop';
import { ContentBlockTheme } from 'atoms/ContentBlock';
import { observer } from 'mobx-react-lite';

interface IpropsTextBlockList {
    textsList: string[];
    className?: string;
    listId: string;
    moveItemInOtherList: (dragIndex: number, hoverIndex: number) => void;
    moveItemInOwmList: (dragIndex: number, hoverIndex: number) => void;
}

const AnswerOptions: FC<IpropsTextBlockList> = (props) => {
    const {
        textsList,
        className,
        moveItemInOtherList,
        moveItemInOwmList,
        listId,
    } = props;
    return (
        <ContentBlockListDragAnDDrop
            className={className}
            contentList={textsList}
            themeContent={ContentBlockTheme.TEXT}
            themeEmpty={ContentBlockTheme.EMPTY}
            moveItemInOtherList={moveItemInOtherList}
            listId={listId}
            moveItemInOwmList={moveItemInOwmList}
        ></ContentBlockListDragAnDDrop>
    );
};

export default observer(AnswerOptions);
