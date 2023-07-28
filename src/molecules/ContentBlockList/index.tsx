import React, { FC } from 'react';
import styles from './index.module.scss';
import { classNames } from 'hooks/classNames';
import ContentBlock, { ContentBlockTheme } from 'atoms/ContentBlock';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export enum ContentBlockListTheme {
    LINE = 'line',
}

interface IpropsTextBlockList {
    className?: string;
    theme?: ContentBlockListTheme;
    themeContent?: ContentBlockTheme;
    themeEmpty?: ContentBlockTheme;
    contentList?: string[] | number[] | boolean[];
    cellQuantity?: number;
}

const ContentBlockList: FC<IpropsTextBlockList> = (props) => {
    const {
        contentList,
        theme,
        className,
        themeContent,
        themeEmpty,
        cellQuantity,
    } = props;

    const contentBlocks = [];

    if (contentList) {
        const COLS = 6;
        const contentCellQuantity = contentList.length;
        const cellsWithoutContent = COLS - (contentCellQuantity % COLS);

        contentList.map((content, index) =>
            contentBlocks.push(
                <ContentBlock
                    key={`${index}${content}`}
                    theme={themeContent || ContentBlockTheme.TEXT}
                >
                    {content}
                </ContentBlock>
            )
        );

        for (let i = 0; i < cellsWithoutContent; i++) {
            contentBlocks.push(
                <ContentBlock
                    key={`empty-${i}`}
                    theme={themeEmpty || ContentBlockTheme.EMPTY}
                />
            );
        }
    }

    if (cellQuantity) {
        for (let i = 0; i <= cellQuantity; i++) {
            contentBlocks.push(
                <ContentBlock
                    className={styles.lined}
                    key={`empty-${i}`}
                    theme={themeEmpty || ContentBlockTheme.CLEAR}
                />
            );
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                className={classNames(styles.wrapper, {}, [
                    className,
                    styles[theme],
                ])}
            >
                {contentBlocks}
            </div>
        </DndProvider>
    );
};

export default ContentBlockList;
