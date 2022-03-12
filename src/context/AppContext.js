import React, {createContext} from 'react';

const defaultVal = {differDate: 0, isPlay: false};
export const AppContext = React.createContext(defaultVal);
export const Mycontext = createContext();