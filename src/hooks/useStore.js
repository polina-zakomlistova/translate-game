import { useContext } from 'react';
import StoreContext from './../context/store';

export default function (...list) {
    let stores = useContext(StoreContext);
    return list.map((name) => stores[name]);
}
