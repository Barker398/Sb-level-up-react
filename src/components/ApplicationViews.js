import React from "react";
import { Route } from "react-router-dom";
import { GameList } from "./game/GameList.js";
import { GameProvider } from "./game/GameProvider.js";
import { EventProvider } from "./game/EventProvider.js";
import { EventList } from "./game/EventList.js";
import { GameForm } from "./game/GameForm.js";
import { EventForm } from "./game/EventForm.js";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <GameProvider>
          <EventProvider>
            <Route exact path="/">
              <GameList />
            </Route>
            <Route exact path="/games/new">
              <GameForm />
            </Route>
            <Route exact path="/events">
              <EventList />
            </Route>
            <Route exact path="/events/new">
              <EventForm />
            </Route>
          </EventProvider>
        </GameProvider>
      </main>
    </>
  );
};

// import React from "react"
// import { Route } from "react-router-dom"

// export const ApplicationViews = () => {
//     return <>
//         <main style={{
//             margin: "5rem 2rem",
//             backgroundColor: "lightgoldenrodyellow"
//         }}>
//             Application views
//         </main>
//     </>
// }
