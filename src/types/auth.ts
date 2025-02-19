export interface Login {
    email: string;
    password: string;
}

export interface RegisterUserDto {
    name: string;
    email: string;
    passwordHash: string;
}