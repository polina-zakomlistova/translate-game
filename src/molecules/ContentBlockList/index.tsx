import React, { FC } from 'react';
import styles from './index.module.scss';
import { classNames } from 'hooks/classNames';
import ContentBlock, { ContentBlockTheme } from 'atoms/ContentBlock';

export enum ContentBlockListTheme {
    LINE = 'line',
}

interface IpropsTextBlockList {
    className?: string;
    theme?: ContentBlockListTheme;
    themeContent?: ContentBlockTheme;
    contentList?: string[];
}

const ContentBlockList: FC<IpropsTextBlockList> = (props) => {
    const { contentList, theme, className, themeContent } = props;

    return (
        <div
            className={classNames(styles.wrapper, {}, [
                className,
                styles[theme],
            ])}
        >
            {contentList.map((content, index) => (
                <ContentBlock
                    key={`${index}${content}`}
                    theme={themeContent || ContentBlockTheme.TEXT}
                >
                    {content}
                </ContentBlock>
            ))}
        </div>
    );
};

export default ContentBlockList;
