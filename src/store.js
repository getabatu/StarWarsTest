import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native

import rootReducers from './reducers'// where reducers is a object of reducers

console.log(rootReducers);
const config = {
    key: 'root',
    storage,
    //debug: true //to get useful logging
};
const middleware = [];

middleware.push(ReduxThunk);
const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const initialState = {};
const persistConfig = { enhancers };

const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
    //console.log(store.getState());
});
const configureStore = () => {
    return { persistor, store };
}

export default configureStore;
