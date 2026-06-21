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