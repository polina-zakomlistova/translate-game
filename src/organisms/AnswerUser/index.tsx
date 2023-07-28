import React, { FC } from 'react';
import styles from './index.module.scss';
import ContentBlockList, {
    ContentBlockListTheme,
} from 'molecules/ContentBlockList';
import { ContentBlockTheme } from 'atoms/ContentBlock';
import { observer } from 'mobx-react-lite';

interface IpropsTextBlockList {
    quantityOptions: number;
    className?: string;
}

const AnswerUser: FC<IpropsTextBlockList> = (props) => {
    const { quantityOptions, className } = props;
    return (
        <ContentBlockList
            className={className}
            cellQuantity={quantityOptions}
            themeEmpty={ContentBlockTheme.EMPTY}
            theme={ContentBlockListTheme.LINE}
        ></ContentBlockList>
    );
};

export default observer(AnswerUser);
