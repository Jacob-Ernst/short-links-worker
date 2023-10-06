type OverrideType = {
  type: 'timeOfDay' | 'country';
  condition: string;
  location: string;
};

type ShortLink = {
  location: string;
  overrides?: OverrideType[];
};
