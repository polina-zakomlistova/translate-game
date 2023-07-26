import { makeAutoObservable } from 'mobx';
import { ICartItem, ICartList } from '../types/users';
import RootStore from './index';

export interface ICartStore {
    rootStore: RootStore;
    items: ICartList;
    getById?: (id: number) => ICartItem | undefined;
    change?: (id: number, cnt: number) => void;
}

export default class Cart implements ICartStore {
    rootStore: RootStore;

    items: ICartList = [
        { id: 100, cnt: 3 },
        { id: 101, cnt: 1 },
        { id: 102, cnt: 2 },
    ];

    get getById() {
        return (id: number) => this.items.find((pr) => pr.id == id);
    }

    change = (id: number, cnt: number) => {
        let item = this.items.find((pr) => pr.id === id);
    };

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }
}
