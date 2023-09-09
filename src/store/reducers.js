import {combineReducers} from "redux";

import {getReducers} from "state-generator";
import newsGen from "./news/gen";
import pokemonGen from "./pokemon/gen";
import miscGen from "./misc/gen";

const rootReducer = combineReducers({
  // old/legacy reducers go here

  // generated reducers here
  ...getReducers(newsGen, pokemonGen, miscGen),
});

export default rootReducer;
