export interface SyncDto {
  notifications_unread: number
}

export interface Sync {
  notificationsUnread: number
}

export function toSync(dto: SyncDto): Sync {
  return {
    notificationsUnread: dto.notifications_unread,
  }
}
