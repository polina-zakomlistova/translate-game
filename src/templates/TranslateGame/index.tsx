import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import AnswerOptions from 'organisms/AnswerOptions';
import QuestionOptions from 'organisms/QuestionOptions';
import QuestionBlock from 'organisms/QuestionBlock';
import { observer } from 'mobx-react-lite';
import useStore from 'hooks/useStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { type } from 'os';
import { ContentBlockTheme } from 'atoms/ContentBlock';

interface IpropsTextBlockList {}

export enum ListType {
    SOURCE = 'source',
    DESTINATION = 'destination',
}

const COLS = 6;

const TranslateGame: FC<IpropsTextBlockList> = () => {
    const [translateStore] = useStore('translate');
    const {
        fetchSentences,
        shuffleSourseTextList,
        currentSentenceRu,
        currentSentenceEn,
        arrayToSentence,
        checkSentense,
        quantytySentences,
        quantytyCorrectSentences,
    } = translateStore;

    useEffect(() => {
        fetchSentences();
    }, []);

    const [sourceList, setSourceList] = useState<string[]>([]);
    const [destinationList, setDestinationList] = useState<string[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean>();

    useEffect(() => {
        setIsCorrect(checkSentense(arrayToSentence(destinationList)));
    }, [destinationList]);

    useEffect(() => {
        //Добавляем пустые значения для вывода контента с заполнеными строками
        const sourse = shuffleSourseTextList;
        const textsLength = sourse.length;
        const cellsWithoutContent = COLS - (textsLength % COLS);
        const cellsAdd = cellsWithoutContent == 0 ? 1 : cellsWithoutContent;

        for (let i = 0; i < cellsAdd; i++) {
            sourse.push('');
        }

        //Устанавливаем список для вопроса
        setSourceList(sourse);
        //Устанавливаем список для ответа, изначально пустой
        const newDestinationList: string[] = [];
        for (let i = 0; i < sourse.length; i++) {
            newDestinationList.push('');
        }
        setDestinationList(newDestinationList);
    }, [shuffleSourseTextList]);

    //добавить элемент в массив
    const getArrayWithAddedElement = (
        array: string[],
        indexAdded: number,
        itemAdd: string
    ) => {
        const newArray = [...array];
        const isEmptyItem = newArray[indexAdded] == '';

        if (isEmptyItem) {
            newArray.splice(indexAdded, 1, itemAdd); //если перемешаем на пустую ячейку
        } else {
            const indexEmpty = newArray.lastIndexOf('');
            newArray.splice(indexEmpty, 1); //если перемешаем на заполненную, нужно удалить ближашую пустую
            newArray.splice(indexAdded, 0, itemAdd);
        }

        return newArray;
    };
    //удалить элемент из массива
    const getArrayWithoutElement = (array: string[], indexToDelete: number) => {
        const newArray = [...array];
        newArray.splice(indexToDelete, 1);
        return newArray;
    };
    //заменить элемент из массива на пустой
    const getArrayWithEmptyElement = (
        array: string[],
        indexToDelete: number
    ) => {
        const newArray = [...array];
        newArray.splice(indexToDelete, 1, '');
        return newArray;
    };
    //поменять два элемента в массиве местами
    const getArrayWithReplacedElements = (
        array: string[],
        indexOld: number,
        indexNew: number
    ) => {
        const itemDrag = array[indexOld];
        const itemDrop = array[indexNew];
        const newArray = [...array];
        newArray.splice(indexOld, 1, itemDrop);
        newArray.splice(indexNew, 1, itemDrag);
        return newArray;
    };

    const moveItemToDestination = (dragIndex: number, hoverIndex: number) => {
        const itemMoved = sourceList[dragIndex];
        setSourceList((prevList) => {
            return getArrayWithEmptyElement(prevList, dragIndex);
        });
        setDestinationList((prevList) => {
            return getArrayWithAddedElement(prevList, hoverIndex, itemMoved);
        });
    };

    const moveItemToSource = (dragIndex: number, hoverIndex: number) => {
        const itemMoved = destinationList[dragIndex];
        setDestinationList((prevList) => {
            return getArrayWithEmptyElement(prevList, dragIndex);
        });
        setSourceList((prevList) => {
            return getArrayWithAddedElement(prevList, hoverIndex, itemMoved);
        });
    };

    //для перемещеменя между блоками
    const moveItem = useCallback(
        (dragIndex: number, hoverIndex: number, listType: ListType) => {
            if (listType === ListType.SOURCE) {
                moveItemToSource(dragIndex, hoverIndex);
            } else if (listType === ListType.DESTINATION) {
                moveItemToDestination(dragIndex, hoverIndex);
            }
        },
        [moveItemToDestination, moveItemToSource]
    );

    const moveItemInSource = (dragIndex: number, hoverIndex: number) => {
        setSourceList((prevList) => {
            return getArrayWithReplacedElements(
                prevList,
                dragIndex,
                hoverIndex
            );
        });
    };

    const moveItemInDestination = (dragIndex: number, hoverIndex: number) => {
        setDestinationList((prevList) => {
            return getArrayWithReplacedElements(
                prevList,
                dragIndex,
                hoverIndex
            );
        });
    };

    //для перемещения внутри блока
    const moveItemInOwnList = useCallback(
        (dragIndex: number, hoverIndex: number, listType: ListType) => {
            if (listType === ListType.SOURCE) {
                moveItemInSource(dragIndex, hoverIndex);
            } else if (listType === ListType.DESTINATION) {
                moveItemInDestination(dragIndex, hoverIndex);
            }
        },
        [moveItemInDestination, moveItemInSource]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.wrapper}>
                <h3>{`${quantytyCorrectSentences}/${quantytySentences}`}</h3>
                <QuestionBlock text={currentSentenceRu} />
                <AnswerOptions
                    isCorrect={isCorrect}
                    className={styles.margin}
                    listId={ListType.DESTINATION}
                    textsList={destinationList}
                    moveItemInOtherList={(
                        dragIndex: number,
                        hoverIndex: number
                    ) => moveItem(dragIndex, hoverIndex, ListType.DESTINATION)}
                    moveItemInOwmList={(dragIndex, hoverIndex) =>
                        moveItemInOwnList(
                            dragIndex,
                            hoverIndex,
                            ListType.DESTINATION
                        )
                    }
                />
                <QuestionOptions
                    textsList={sourceList}
                    listId={ListType.SOURCE}
                    moveItemInOtherList={(
                        dragIndex: number,
                        hoverIndex: number
                    ) => moveItem(dragIndex, hoverIndex, ListType.SOURCE)}
                    moveItemInOwmList={(dragIndex, hoverIndex) =>
                        moveItemInOwnList(
                            dragIndex,
                            hoverIndex,
                            ListType.SOURCE
                        )
                    }
                />
            </div>
        </DndProvider>
    );
};

export default observer(TranslateGame);
