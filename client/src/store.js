import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { weatherReducer } from './reducers/weatherReducers.js';


const intitialState = { weather: { loading: true } };

const reducer = combineReducers({
    weather: weatherReducer
});


const store = createStore(reducer, intitialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;