// == External =============================================================
import { IRequest } from 'itty-router';

// == Internal =============================================================
import handleTimeOfDay from './time-of-day';

// == Static ===============================================================

export type OverrideHandler = (request: IRequest, override: OverrideType) => Response | undefined;

type handlersType = {
  [i: string]: OverrideHandler;
};
const handlers: handlersType = {
  timeOfDay: handleTimeOfDay,
};

function handleOverrides(request: IRequest, overrides: OverrideType[]) {
  for (const override of overrides) {
    const handler = handlers[override.type];
    const response = handler(request, override);
    if (response) {
      return response;
    }
  }
}

export default handleOverrides;
