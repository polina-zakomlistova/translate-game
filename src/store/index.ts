import Translate from './translate';

export default class RootStore {
    translate: Translate;
    localStorage: Storage;

    constructor() {
        this.translate = new Translate(this);
        this.localStorage = window.localStorage;
    }
}
