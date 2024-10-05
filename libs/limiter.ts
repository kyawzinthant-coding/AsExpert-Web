import { getIp } from "./get-ip";
import { RateLimitError } from "./errors";

const PRUNE_INTERVAL = 60 * 1000; //1 minute

interface IRateLimit {
  key?: string;
  limit?: number;
  window?: number;
}

const trackers: Record<
  string,
  {
    count: number;
    expiresAt: number;
  }
> = {};

function pruneTrackers() {
  const now = Date.now();

  for (const key in trackers) {
    if (trackers[key].expiresAt < now) {
      delete trackers[key];
    }
  }
}

setInterval(pruneTrackers, PRUNE_INTERVAL);

export async function rateLimitByIP({
  key = "global",
  limit = 1,
  window = 10000,
}: IRateLimit) {
  const ip = getIp();

  if (!ip) {
    throw new RateLimitError();
  }

  await rateLimitByKey({
    key: `${ip}-${key}`,
    limit,
    window,
  });
}

export async function rateLimitByKey({
  key = "global",
  limit = 1,
  window = 10000,
}: IRateLimit) {
  const tracker = trackers[key] || { count: 0, expiresAt: 0 };

  if (!trackers[key]) {
    trackers[key] = tracker;
  }

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count++;

  if (tracker.count > limit) {
    throw new RateLimitError();
  }
}
