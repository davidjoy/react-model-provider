export function normalizeChildModels(data, key, idKey) {
    const normalizedModels = [];
    const childModels = [];

    const models = Array.isArray(data) ? data : [data];
    for (let i = 0; i < models.length; i++) {
        const model = models[i];
        const ids = [];
        for (let j = 0; j < model[key].length; j++) {
            const childModel = model[key][j];
            const childId = childModel.id;
            ids.push(childId);
            childModels.push(childModel);
        }
        const normalizedModel = { ...model, [idKey]: ids };
        delete normalizedModel[key];
        normalizedModels.push(normalizedModel);
    }
    return { models: normalizedModels, childModels };
}

export function createIdMap(data) {
    const map = {};
    const models = Array.isArray(data) ? data : [data];
    for (let i = 0; i < models.length; i++) {
        map[models[i].id] = models[i];
    }
    return map;
}
