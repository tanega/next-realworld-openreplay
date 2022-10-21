import React from "react";

import PageContext from "./PageContext";
import PageCountContext from "./PageCountContext";
import TrackerProvider from "./OpenReplayContext";

const ContextProvider = ({ children }) => (
  <PageContext>
    <PageCountContext>
      <TrackerProvider>{children}</TrackerProvider>
    </PageCountContext>
  </PageContext>
);

export default ContextProvider;
