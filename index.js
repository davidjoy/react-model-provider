import { createStore } from 'redux';

export { default as reducer } from './reducer';
export { default as ModelProvider, ModelContext } from './ModelProvider';

export default function createModelStore() {
    return createStore(reducer);
}

