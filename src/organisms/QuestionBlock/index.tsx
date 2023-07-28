import React, { FC } from 'react';
import styles from './index.module.scss';
import DialogBlock from 'atoms/DialogBlock';
import ContentBlock, { ContentBlockTheme } from 'atoms/ContentBlock';
import UserLogo from 'assets/icons/userLogo.svg';

import { classNames } from 'hooks/classNames';
import { observer } from 'mobx-react-lite';

interface IpropsQuestionBlock {
    className?: string;
    text: string;
}

const QuestionBlock: FC<IpropsQuestionBlock> = (props) => {
    const { className, text } = props;
    return (
        <div className={classNames(styles.wrapper, {}, [className])}>
            <ContentBlock theme={ContentBlockTheme.MESSAGE}>
                {text}
            </ContentBlock>
        </div>
    );
};

export default observer(QuestionBlock);
