export interface NotificationDto {
  id: number
  title: string
  body: string
}

export interface Notification {
  id: number
  title: string
  body: string
}

export function toNotification(dto: NotificationDto): Notification {
  return {
    id: dto.id,
    title: dto.title,
    body: dto.body,
  }
}
