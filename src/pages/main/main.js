import React, {useEffect, useState} from "react";
import {on} from "state-generator";
import {GET_NEWS} from "../../store/news/gen";
import {GET_POKEMON} from "../../store/pokemon/gen";
import {Button, Col, Input, Row, Spinner} from "reactstrap";
import {DO_ASYNC_OP, FAILURE_SAMPLE, RETRY_SAMPLE} from "../../store/misc/gen";

const Main = () => {
  // Declare events

  const onGetNews = on(GET_NEWS);
  const onGetPokemon = on(GET_POKEMON);
  const onFailureSample = on(FAILURE_SAMPLE);
  const onRetrySample = on(RETRY_SAMPLE);
  const onDoAsyncOperation = on(DO_ASYNC_OP);

  // Value from range slider will be stored here

  const [pokemonId, setPokemonId] = useState(1);

  // Trigger/Start polling news

  useEffect(() => {
    if (onGetNews.isNotTriggeredAtLeastOnce()) {
      onGetNews.trigger();
    }
  }, [onGetNews.status()]);

  /**
   * Trigger GET_POKEMON event with a payload, which will execute our worker in src/store/pokemon/gen.js
   */
  const getPokemon = () => {
    onGetPokemon.trigger({number: pokemonId});
  };

  return (
    <React.Fragment>
      <div className="App">
        {/* Reddit News - section*/}

        <h2>Reddit news</h2>
        {onGetNews.isLoading && <Spinner color="primary" />}
        {onGetNews.isSuccess &&
          onGetNews
            .data()
            .data.children.map((news, index) => (
              <div key={index}>{news.data.title}</div>
            ))}

        {/* Pokemon Selection - section */}

        <div>
          <h2>Select a pokemon</h2>
          <input
            id="pokemonid"
            type="range"
            min="1"
            max="1000"
            value={pokemonId}
            onChange={(e) => setPokemonId(e.target.value)}
            step="1"
          />
          <Button onClick={() => getPokemon()}>Get Pokemon</Button>
          {onGetPokemon.isLoading && <Spinner color="primary" />}
          {!onGetPokemon.isLoading && onGetPokemon.data() && (
            <div>
              <h4>{onGetPokemon.data().name}</h4>
              <img
                alt="pokemon"
                src={onGetPokemon.data().sprites.front_default}
              />
            </div>
          )}
        </div>

        {/* Failure - section */}

        <Row>
          <Col style={{paddingTop: 20}} sm={12}>
            <Button onClick={() => onFailureSample.trigger()}>
              Trigger Failure
            </Button>
            <Button onClick={() => onFailureSample.reset()}>Reset</Button>
          </Col>
          <Col>
            {onFailureSample.isFail && (
              <span>Error: {JSON.stringify(onFailureSample.error())}</span>
            )}
          </Col>
        </Row>

        {/* Retry - section */}

        <Row>
          <Col style={{paddingTop: 20}} sm={12}>
            <Button onClick={() => onRetrySample.trigger()}>
              Trigger Retry Operation
            </Button>
            <Button onClick={() => onRetrySample.reset()}>Reset</Button>
          </Col>
          <Col>
            {onRetrySample.isLoading && <Spinner color="primary" />}
            {onRetrySample.isRetrying && (
              <div>
                <Spinner color="warning" />
                Retrying... attempt: {onRetrySample.retryAttempt()}
              </div>
            )}
            {onRetrySample.isFail && (
              <span>Error: {JSON.stringify(onRetrySample.error())}</span>
            )}
            {onRetrySample.isSuccess && (
              <span>Success: {JSON.stringify(onRetrySample.data())}</span>
            )}
          </Col>
        </Row>

        {/* Async - section */}

        <Row>
          <Col style={{paddingTop: 20}} sm={12}>
            <Button onClick={() => onDoAsyncOperation.trigger()}>
              Trigger Async Worker
            </Button>
            <Button onClick={() => onDoAsyncOperation.reset()}>Reset</Button>
          </Col>
          <Col>
            {onDoAsyncOperation.isLoading && (
              <div>
                <Spinner color="primary" />
                Loading...
              </div>
            )}
            {onDoAsyncOperation.isSuccess && (
              <span>
                Success, result is: {JSON.stringify(onDoAsyncOperation.data())}
              </span>
            )}
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {};

export default Main;
