import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";

export const GameForm = () => {
  const history = useHistory();
  const { createGame, getGameTypes, gameTypes } = useContext(GameContext);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 1,
  });

  /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
  useEffect(() => {
    getGameTypes();
  }, []);

  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
  const changeGameTitleState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.title = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameMakerState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.maker = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGamePlayersState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.numberOfPlayers = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameSkillLevelState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.skillLevel = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameTypeState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.gameTypeId = event.target.value;
    setCurrentGame(newGameState);
  };
  /* REFACTOR CHALLENGE END */

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameTitleState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameTypeId">GameType: </label>
          <select
            type="text"
            name="gameTypeId"
            required
            autoFocus
            className="form-control"
            value={currentGame.gameTypeId}
            onChange={changeGameTypeState}
          >
            {gameTypes.map(gameType => <option value={gameType.id}>{gameType.label}</option>)}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameMaker">Maker: </label>
          <input
            type="text"
            name="maker"
            required
            autoFocus
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameMakerState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Players: </label>
          <input
            type="number"
            name="Players"
            required
            autoFocus
            className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={changeGamePlayersState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level: </label>
          <input
            type="number"
            name="SkillLevel"
            required
            autoFocus
            className="form-control"
            value={currentGame.skillLevel}
            onChange={changeGameSkillLevelState}
          />
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each game property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            skillLevel: parseInt(currentGame.skillLevel),
            gameTypeId: parseInt(currentGame.gameTypeId),
          };

          // Send POST request to your API
          createGame(game).then(() => history.push("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};