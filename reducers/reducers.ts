import {ACTION_LIST} from '../constants';

export const animationsListReducer = (
  state: any,
  action: Record<string, any>,
) => {
  switch (action.type) {
    case 'ADD_ACTIONS':
      return {
        ...state,
        animations: action.payload.zones,
        initialActions: action.payload.allUpdatedActions,
      };
    case 'RESET_ALL':
      return {
        ...state,
        animations: [
          {id: 1, text: 'ACTION1'},
          {id: 2, text: 'ACTION2'},
        ],
        initialActions: ACTION_LIST,
      };
    default:
      return state;
  }
};
