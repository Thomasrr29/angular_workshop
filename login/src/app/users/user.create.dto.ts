export interface UserDto {
    username: string,
    email: string,
    country: string
}; 


export interface UpdateUser {
    username?: string,
    email?: string,
    country?: string
}