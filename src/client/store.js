import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import { composeWithDevTools } from 'redux-devtools-extension';
import createsocketMiddlemare from './creatSocketMiddleware';
import rootReducer from './reducers/index';

// let API_URL = process.env.API_URL; development should be http://localhost:8080
const apiUrl = process.env.API_URL;
console.log('testing11:::', apiUrl);
const mySocket = io.connect(apiUrl);

function saveToSessionStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromSessionStorage() {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromSessionStorage();
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(createsocketMiddlemare(mySocket)))
);
store.subscribe(() => saveToSessionStorage(store.getState()));
export default store;
