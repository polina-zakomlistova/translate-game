import React, { FC } from 'react';
import styles from './index.module.scss';
import ContentBlockList from 'molecules/ContentBlockList';
import { ContentBlockTheme } from 'atoms/ContentBlock';

interface IpropsTextBlockList {
    quantityOptions: number;
}

const AnswerUser: FC<IpropsTextBlockList> = (props) => {
    const { quantityOptions } = props;
    return (
        <ContentBlockList
            CellQuantity={quantityOptions}
            themeEmpty={ContentBlockTheme.EMPTY}
        ></ContentBlockList>
    );
};

export default AnswerUser;
