import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../features/hero/heroesSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../features/hero/sagas';
import { sagaActions } from '../features/hero/sagaActions';

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
      heroes: heroesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({       
      serializableCheck: {
      ignoredActions: [sagaActions.CREATE_HERO, sagaActions.EDIT_HERO],
    },
    thunk: false }).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga);