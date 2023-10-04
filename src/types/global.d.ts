declare module '*.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.svg' {
    import React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';

declare module '*.woff';
declare module '*.woff2';

declare const __IS_DEV__: boolean;
