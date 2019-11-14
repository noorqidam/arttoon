//combine all reducer
import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigator from './../../navigator/RootNavigator'
import reducerTodos from './reducerTodos';
import reducerUsers from './reducerUsers';
import reducerWebtoons from './reducerWebtoons';
import reducerEpisodes from './reducerEpisodes';
import reducerImages from './reducerImages';
import reducerFavorites from './reducerFavorites';


import reducerMyWebtoons from './reducerMyWebtoons';
import reducerMyEpisodes from './reducerMyEpisodes';
import reducerMyImages from './reducerMyImage';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  todos: reducerTodos,
  users: reducerUsers,
  webtoons: reducerWebtoons,
  episodes: reducerEpisodes,
  images: reducerImages,
  favorites: reducerFavorites,
  myWebtoons: reducerMyWebtoons,
  myEpisodes: reducerMyEpisodes,
  myImages: reducerMyImages
})

export default appReducer