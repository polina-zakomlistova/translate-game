import React, { FC, HTMLProps, ReactNode } from 'react';
import styles from './index.module.scss';
import { classNames } from 'hooks/classNames';

interface IpropsDialogBlock extends HTMLProps<HTMLDivElement> {
    className?: string;
}

const DialogBlock: FC<IpropsDialogBlock> = (props) => {
    const { className, children, ...otherProps } = props;
    return (
        <div className={classNames(styles.dialog, {}, [className])}>
            <div className={styles.triangle}></div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default DialogBlock;
