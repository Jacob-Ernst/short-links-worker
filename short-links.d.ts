type OverrideType = {
  type: 'timeOfDay' | 'country';
  /** @example "morning" */
  condition: string;
  location: string;
};

type ShortLink = {
  /** Default location to redirect to. */
  location: string;
  /** Scenarios that may override the default redirect location. */
  overrides?: OverrideType[];
};
