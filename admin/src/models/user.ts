export interface UserDto {
  email: string
  first_name: string
  id: number
  last_name: string
}

export interface User {
  email: string
  firstName: string
  id: number
  lastName: string
}

export type UserFilters = {
  page?: number
}

export function toUser(dto: UserDto): User {
  return {
    email: dto.email,
    firstName: dto.first_name,
    id: dto.id,
    lastName: dto.last_name,
  }
}
