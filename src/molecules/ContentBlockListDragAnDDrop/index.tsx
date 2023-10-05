import React, { FC } from 'react';
import styles from './index.module.scss';
import { classNames } from 'hooks/classNames';
import ContentBlock, { ContentBlockTheme } from 'atoms/ContentBlock';
import ContentBlockDragAndDrop from 'atoms/ContentBlockDragAndDrop';

export enum ContentBlockListTheme {
    LINE = 'line',
}

interface IpropsTextBlockList {
    className?: string;
    theme?: ContentBlockListTheme;
    themeContent?: ContentBlockTheme;
    themeEmpty?: ContentBlockTheme;
    contentList?: string[];
    indexStart?: number;
    listId: string;
    moveItemInOtherList: (dragIndex: number, hoverIndex: number) => void;
    moveItemInOwmList: (dragIndex: number, hoverIndex: number) => void;
}

const ContentBlockListDragAnDDrop: FC<IpropsTextBlockList> = (props) => {
    const {
        contentList,
        theme,
        className,
        themeContent,
        themeEmpty,
        moveItemInOtherList,
        listId,
        moveItemInOwmList,
    } = props;

    return (
        <div
            className={classNames(styles.wrapper, {}, [
                className,
                styles[theme],
            ])}
        >
            {contentList.map((content, index) => (
                <ContentBlockDragAndDrop
                    key={`${index}${content}`}
                    theme={
                        content
                            ? themeContent || ContentBlockTheme.TEXT
                            : themeEmpty || ContentBlockTheme.EMPTY
                    }
                    moveItemInOwmList={moveItemInOwmList}
                    moveItemInOtherList={moveItemInOtherList}
                    index={index}
                    listId={listId}
                >
                    {content}
                </ContentBlockDragAndDrop>
            ))}
        </div>
    );
};

export default ContentBlockListDragAnDDrop;
