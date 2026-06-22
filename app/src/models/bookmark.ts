// ============================================================================
// ■ SECTION 1: BOOKMARK SUMMARY (LIST / INDEX PAYLOADS)
// ============================================================================

export interface RawApiBookmarkSummary {
  bookmark_id?: string;
  target_url?: string;
}

export interface BookmarkSummary {
  id: string;
  url: string;
}

export function toBookmarkSummary(raw: RawApiBookmarkSummary): BookmarkSummary {
  const data = raw || {};
  return {
    id: data.bookmark_id || '',
    url: data.target_url || '',
  };
}


// ============================================================================
// ■ SECTION 2: BOOKMARK DETAIL (SINGLE ITEM / EDIT PAYLOADS)
// ============================================================================

export interface RawApiBookmarkDetail {
  bookmark_id?: string;
  target_url?: string;
  html_snapshot?: string | null;
  meta_tags?: string[] | null;
}

export interface BookmarkDetail {
  id: string;
  url: string;
  htmlSnapshot: string;
  tags: string[];
  isSecure: boolean;
}

export function toBookmarkDetail(raw: RawApiBookmarkDetail): BookmarkDetail {
  const data = raw || {};
  return {
    id: data.bookmark_id || '',
    url: data.target_url || '',
    htmlSnapshot: data.html_snapshot || '',
    tags: Array.isArray(data.meta_tags) ? data.meta_tags : [],

    get isSecure() {
      return this.url.startsWith('https');
    }
  };
}
