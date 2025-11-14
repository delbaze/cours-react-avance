import type { Middleware } from "@reduxjs/toolkit";

export const timestampMiddlare: Middleware =
  (store) => (next) => (action: any) => {
    const actionWithTimestamp = {
      ...action,
      meta: {
        ...action.meta,
        timeStamp: Date.now(),
      },
    };

    return next(actionWithTimestamp);
  };
