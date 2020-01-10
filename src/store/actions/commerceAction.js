import * as stateActionType from '../actionType/commerceActionType';

export const seStateAction = req => ({
    type: stateActionType.SET_STATE,
    payload: req
});