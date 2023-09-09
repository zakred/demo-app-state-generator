import {all} from "redux-saga/effects";

import {getSagasFork} from "state-generator";
import newsGen from "./news/gen";
import pokemonGen from "./pokemon/gen";
import miscGen from "./misc/gen";

export default function* rootSaga() {
  yield all([
    // old/legacy sagas go here

    // generated sagas here
    ...getSagasFork(newsGen, pokemonGen, miscGen),
  ]);
}
