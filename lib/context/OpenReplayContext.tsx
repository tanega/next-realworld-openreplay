import { createContext } from "react";
import Tracker from "@openreplay/tracker/cjs";
import { v4 as uuidV4 } from "uuid";
import { useReducer } from "react";
export const TrackerContext = createContext<any>(undefined);
function defaultGetUserId() {
  return uuidV4();
}
function newTracker(config) {
  const getUserId =
    config?.userIdEnabled && config?.getUserId
      ? config.getUserId
      : defaultGetUserId;
  let userId = null;
  const trackerConfig = {
    projectKey:
      config?.projectKey || process.env.NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY,
  };
  const tracker = new Tracker(trackerConfig);
  if (config?.userIdEnabled) {
    userId = getUserId();
    tracker.setUserID(userId);
  }
  return tracker;
}
function reducer(state, action) {
  switch (action.type) {
    case "init": {
      if (!state.tracker) {
        console.log("Instantiaing the tracker for the first time...");
        return { ...state, tracker: newTracker(state.config) };
      }
      return state;
    }
    case "start": {
      console.log("Starting tracker...");
      state.tracker.start();
      return state;
    }
  }
}
export default function TrackerProvider({ children, config = {} }) {
  let [state, dispatch] = useReducer(reducer, { tracker: null, config });
  let value = {
    startTracking: () => dispatch({ type: "start" }),
    initTracker: () => dispatch({ type: "init" }),
  };
  return (
    <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
  );
}
