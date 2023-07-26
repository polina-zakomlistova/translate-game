import React, { FC, ReactNode } from 'react';
import styles from './index.module.scss';
import ContentBlock, { ContentBlockTheme } from 'atoms/ContentBlock';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface IpropsTextBlockList {
    className?: string;
    contentList?: string[] | number[] | boolean[];
    themeContent?: ContentBlockTheme;
    themeEmpty?: ContentBlockTheme;
    CellQuantity?: number;
}

const ContentBlockList: FC<IpropsTextBlockList> = (props) => {
    const { contentList, themeContent, themeEmpty, CellQuantity } = props;

    const contentBlocks = [];

    if (contentList) {
        const COLS = 6;
        const contentCellQuantity = contentList.length;
        const rows = Math.ceil(contentCellQuantity / COLS);
        const cells = COLS * rows;
        const cellsWithoutContent = cells - contentCellQuantity;

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

    if (CellQuantity) {
        for (let i = 0; i <= CellQuantity; i++) {
            contentBlocks.push(
                <ContentBlock
                    key={`empty-${i}`}
                    theme={themeEmpty || ContentBlockTheme.CLEAR}
                />
            );
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.wrapper}>{contentBlocks}</div>;
        </DndProvider>
    );
};

export default ContentBlockList;
