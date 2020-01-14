export const ADD_MODEL = 'ADD_MODEL';
export const ADD_MODELS = 'ADD_MODELS';
export const REMOVE_MODEL = 'REMOVE_MODEL';
export const UPDATE_MODEL = 'UPDATE_MODEL';

export function addModel(modelType, model) {
    return {
        type: ADD_MODEL,
        id: model.id,
        model,
        modelType,
    }
}

export function addModels(modelType, models) {
    return {
        type: ADD_MODELS,
        models,
        modelType,
    }
}

export function removeModel(modelType, id) {
    return {
        type: REMOVE_MODEL,
        id,
        modelType,
    }
}

export function updateModel(modelType, model) {
    return {
        type: UPDATE_MODEL,
        id: model.id,
        model,
        modelType,
    }
}

export function getModel(modelsState, modelType, id) {
    return modelsState[modelType][id];
}

export default function (state, action) {
    const { type } = action;
    switch (type) {
        case ADD_MODEL:
            return addModelReducer(state, action);
        case ADD_MODELS:
            return addModelsReducer(state, action);
        case REMOVE_MODEL:
            return removeModelReducer(state, action);
        case UPDATE_MODEL:
            return updateModelReducer(state, action);
        default:
    }
    return state;
};

function addModelReducer(state, action) {
    const {
        model, modelType, id,
    } = action;
    return {
        ...state,
        [modelType]: {
            ...state[modelType],
            [id]: model,
        },
    };
}

function addModelsReducer(state, action) {
    const {
        models, modelType,
    } = action;
    return {
        ...state,
        [modelType]: {
            ...state[modelType],
            ...createIdMap(models),
        },
    };
}

function removeModelReducer(state, action) {
    const {
        modelType, id,
    } = action;
    const modelsOfType = { ...state[modelType] };
    delete modelsOfType[id];
    return {
        ...state,
        [modelType]: modelsOfType,
    };
}

function updateModelReducer(state, action) {
    const { model, modelType, id } = action;
    return {
        ...state,
        [modelType]: {
            ...state[modelType],
            [id]: { ...state[modelType][id], ...model },
        },
    };
}