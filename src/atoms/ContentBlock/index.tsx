import React, { FC, HTMLProps, ReactNode, forwardRef } from 'react';
import styles from './index.module.scss';
import { classNames } from 'hooks/classNames';

export enum ContentBlockTheme {
    TEXT = 'text',
    CORRECT = 'correct',
    EMPTY = 'empty',
    CLEAR = 'clear',
    MESSAGE = 'message',
}

interface IpropsTextBlock extends HTMLProps<HTMLDivElement> {
    className?: string;
    theme?: ContentBlockTheme;
}

const ContentBlock: FC<IpropsTextBlock> = forwardRef<
    HTMLDivElement,
    IpropsTextBlock
>((props, ref) => {
    const { className, children, theme, ...otherProps } = props;

    return (
        <div
            ref={ref}
            className={classNames(styles.block, {}, [className, styles[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});

export default ContentBlock;
