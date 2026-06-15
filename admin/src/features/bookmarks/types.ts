export interface AdminBookmark {
  id: number
  title: string
  url: string
  favorited: boolean
  categoryId: number | null
  ownerId: number
  createdAt: Date
}

export interface AdminBookmarkQuery {
  search?: string
  categoryId?: number
  ownerId?: number
}
