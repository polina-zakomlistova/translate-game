import React, { FC } from 'react';
import styles from './index.module.scss';
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
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 253.000000 256.000000"
                preserveAspectRatio="xMidYMid meet"
                width="50%"
            >
                <g
                    transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                >
                    <path
                        d="M1234 2550 c-95 -13 -142 -28 -239 -78 -153 -79 -275 -213 -337 -372
-77 -196 -58 -435 49 -620 49 -84 160 -195 246 -247 l69 -41 -69 -22 c-173
-57 -323 -148 -456 -279 -154 -149 -261 -334 -313 -539 -43 -166 -33 -230 40
-270 28 -16 114 -17 1056 -20 732 -2 1040 0 1077 8 59 13 98 50 108 103 12 63
-45 276 -107 402 -148 297 -406 511 -738 612 -8 2 12 19 50 40 39 22 99 70
151 123 70 70 95 103 128 171 22 46 48 116 57 154 23 92 23 249 0 335 -22 88
-84 213 -140 282 -146 182 -406 288 -632 258z"
                    />
                </g>
            </svg>
            <ContentBlock theme={ContentBlockTheme.MESSAGE}>
                {text}
            </ContentBlock>
        </div>
    );
};

export default observer(QuestionBlock);
