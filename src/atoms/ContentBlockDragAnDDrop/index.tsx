import React, { FC, useRef, HTMLProps } from 'react';
import styles from './index.module.scss';

import ContentBlock, { ContentBlockTheme } from 'atoms/ContentBlock';
import {
    DropTargetMonitor,
    MonitorEventEmitter,
    useDrag,
    useDrop,
} from 'react-dnd';

interface IpropsTextBlock extends HTMLProps<HTMLDivElement> {
    className?: string;
    theme?: ContentBlockTheme;
    moveItemInOwmList: (dragIndex: number, hoverIndex: number) => void;
    moveItemInOtherList: (dragIndex: number, hoverIndex: number) => void;
    index: number;
    listId: string;
}

const ContentBlockDragAndDrop: FC<IpropsTextBlock> = (props) => {
    const {
        className,
        theme,
        moveItemInOwmList,
        moveItemInOtherList,
        index,
        children,
        listId,
    } = props;

    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index, listId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const ref = useRef<HTMLDivElement>(null);

    interface Item {
        index: number;
        listId: string;
    }

    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item: Item, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = index;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY =
                monitor.getClientOffset().y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            if (item.listId !== listId) {
                moveItemInOtherList(dragIndex, hoverIndex);
            } else {
                moveItemInOwmList(dragIndex, hoverIndex);
            }

            item.index = hoverIndex;
            item.listId = listId;
        },
    });

    const dragDropRef = (node: HTMLDivElement) => {
        dragRef(dropRef(node));
        ref.current = node;
    };

    const opacity = isDragging ? 0.5 : 1;

    return (
        <ContentBlock
            className={className}
            theme={theme}
            ref={dragDropRef}
            style={{ opacity }}
        >
            {children}
        </ContentBlock>
    );
};

export default ContentBlockDragAndDrop;
