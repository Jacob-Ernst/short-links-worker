// == External =============================================================
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';

// == Internal =============================================================
import handleTimeOfDay from '../time-of-day';

// == Static ===============================================================
import { morningOverride } from '../../../__fixtures__/override';

describe('handleTimeOfDay', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers();
  });

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers();
  });

  it('return redirect if true', () => {
    const date = new Date('11/12/2023, 6:15:24 AM');
    vi.setSystemTime(date);

    const resp = handleTimeOfDay(
      {
        cf: {
          timezone: 'America/Chicago',
        },
      },
      morningOverride,
    );
    expect(resp).not.toBeUndefined();
    expect(resp?.status).toBe(302);
    expect(resp?.headers.get('location')).toEqual(morningOverride.location);
  });
});
