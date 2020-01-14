import React, {
    useCallback, useReducer, useState,
} from 'react';
import PropTypes from 'prop-types';

import reducer from './reducers';
import { createModelStore } from '.';
import { removeModel, addModel, addModels, updateModel, getModel } from './reducer';

export const ModelContext = React.createContext({});

export default function ModelProvider({ store: existingStore, customStoreKey = 'models', children }) {
    const [store, setStore] = useState(null);
    const [storeKey, setStoreKey] = useState(customStoreKey);
    useEffect(() => {
        if (existingStore !== null) {
            setStoreKey(customStoreKey);
        }
        setStore(existingStore !== null ? existingStore : createModelStore(reducer));
    }, [store, customStoreKey])

    const _addModel = useCallback((modelType, model) => {
        store.dispatch(addModel(modelType, model));
    }, [store]);

    const _addModels = useCallback((modelType, models) => {
        store.dispatch(addModels(modelType, models));
    }, [store]);

    const _removeModel = useCallback((modelType, id) => {
        store.dispatch(removeModel(modelType, id));
    }, [store]);

    const _updateModel = useCallback((modelType, model) => {
        store.dispatch(updateModel(modelType, model));
    }, [store]);

    const _getModel = useCallback((modelType, id) => {
        return getModel(state[storeKey], modelType, id);
    }, [store]);

    const context = {
        addModel: _addModel,
        addModels: _addModels,
        removeModel: _removeModel,
        updateModel: _updateModel,
        getModel: _getModel,
    };

    return (
        <ModelContext.Provider value={context}>
            {children}
        </ModelContext.Provider>
    );
}

ModelProvider.propTypes = {
    children: PropTypes.node.isRequired,
};