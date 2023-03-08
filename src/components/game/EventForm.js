import React, { useContext, useState, useEffect } from "react";
import { EventContext } from "./EventProvider.js";
import { useHistory } from "react-router-dom";
import { GameContext } from "./GameProvider.js";

export const EventForm = () => {
  const history = useHistory();
  const { createEvent } = useContext(EventContext)
  const { getGames, games } = useContext(GameContext)

  const [currentEvent, setCurrentEvent] = useState({
      organizer: "",
      description: "",
      gameId: 1,
      date: "",
      time: "",
  });

  useEffect(() => {
    // Get all existing games from API
    getGames();
  }, []);

  const changeEventState = (event) => {
    const newEventState ={...currentEvent };
    newEventState.gameId = event.target.value;
    setCurrentEvent(newEventState)
  };

  const changeEventOrganizerState = (event) => {
      const newEventState = {...currentEvent };
      newEventState.organizer = event.target.value;
      setCurrentEvent(newEventState);
  };

  const changeEventDescriptionState = (event) => {
      const newEventState = {...currentEvent };
      newEventState.description = event.target.value;
      setCurrentEvent(newEventState);
  };

  const changeEventDateState = (event) => {
      const newEventState = {...currentEvent };
      newEventState.date = event.target.value;
      setCurrentEvent(newEventState);
  };

  const changeEventTimeState = (event) => {
      const newEventState = {...currentEvent };
      newEventState.time = event.target.value;
      setCurrentEvent(newEventState);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select
            type="text"
            name="gameId"
            required
            autoFocus
            className="form-control"
            value={currentEvent.gameId}
            onChange={changeEventState}
          >
            <option value="0">Select a game...</option>
            {games.map(game => <option value={game.id}>{game.title}</option>)}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventOrganizer">Organizer: </label>
          <input
            type="text"
            name="Organizer"
            required
            autoFocus
            className="form-control"
            value={currentEvent.organizer}
            onChange={changeEventOrganizerState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventDescription">Description: </label>
          <input
            type="text"
            name="Description"
            required
            autoFocus
            className="form-control"
            value={currentEvent.description}
            onChange={changeEventDescriptionState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventDate">Date: </label>
          <input
            type="date"
            name="Date"
            required
            autoFocus
            className="form-control"
            value={currentEvent.date}
            onChange={changeEventDateState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventTime">Time: </label>
          <input
            type="time"
            name="Time"
            required
            autoFocus
            className="form-control"
            value={currentEvent.time}
            onChange={changeEventTimeState}
          />
        </div>
      </fieldset>
    
      {/* Create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          // Create the event
          const event = {
            organizer: currentEvent.organizer,
            description: currentEvent.description,
            gameId: parseInt(currentEvent.gameId),
            date: (currentEvent.date),
            time: (currentEvent.time),
          };

          // Once event is created, redirect user to event list
          createEvent(event).then(() => history.push("/events"))
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};