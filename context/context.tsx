import React, {createContext, useReducer} from 'react';
import {ACTION_LIST} from '../constants';
import {animationsListReducer} from '../reducers/reducers';

const initialState = {
  initialActions: ACTION_LIST,
  animations: [
    {id: 1, text: 'ACTION1'},
    {id: 2, text: 'ACTION2'},
  ],
};

const AppContext = createContext<{
  state: any;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
  const [state, dispatch] = useReducer(animationsListReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};
