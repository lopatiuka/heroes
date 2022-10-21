import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../features/hero/heroesSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../features/hero/sagas';

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
      heroes: heroesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
  }
});

sagaMiddleware.run(rootSaga);