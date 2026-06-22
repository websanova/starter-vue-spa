import { useBookmarkIndex } from '@/composables/api/useBookmarkIndex';
import { createPoller } from 'shared/composables/adapter/usePolling';

let instance: ReturnType<typeof createPoller> | null = null;

export function useBookmarkPoller(options = { intervalMs: 15000 }) {
  if (!instance) {
    const fetcher = useBookmarkIndex();
    instance = createPoller(fetcher, options);
  }
  return instance();
}

// This only gives the instance though. Need to wokr out how to start/stop (the polling comopsable was to handle that). Could definitely get messy though if it's included in more than one spot the uonUn/mounted hoooks are fucked and will trigger twice.
// Maybe indeed wire up with on/off required as I was originall thinking. then can check in "on" function to see if it's already running and return an error, "hey you already started this poller".