import { createStore, applyMiddleware } from 'redux';
import io from 'socket.io-client';
import { composeWithDevTools } from 'redux-devtools-extension';
import createsocketMiddlemare from './creatSocketMiddleware';
import rootReducer from './reducers/index';

const apiUrl = process.env.API_URL;
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
