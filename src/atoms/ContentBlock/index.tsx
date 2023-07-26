import React, { FC, HTMLProps, ReactNode } from 'react';
import styles from './index.module.scss';
import { classNames } from 'hooks/classNames';

export enum ContentBlockTheme {
    TEXT = 'text',
    EMPTY = 'empty',
    CLEAR = 'clear',
}

interface IpropsTextBlock extends HTMLProps<HTMLDivElement> {
    className?: string;
    theme?: ContentBlockTheme;
}

const ContentBlock: FC<IpropsTextBlock> = (props) => {
    const { className, children, theme, ...otherProps } = props;
    return (
        <div
            className={classNames(styles.block, {}, [className, styles[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
};

export default ContentBlock;
