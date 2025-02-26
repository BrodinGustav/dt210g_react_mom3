//Strukturerar data för användare i backend
export interface User {
    id: string,
    username: string;
}

//Interface om data som skickas till backend
export interface LoginCredentials {
    userName: string,
    password: string
}

//Interface om vad som hämtas från backend
export interface AuthResponse {
    user: User,
    token: string
} 

//Definierar context-filen (vilka states,metoder den ska innehålla)
export interface AuthContextType {
    user: User | null //Om användare inte finns blir det null
    login: (credentials: LoginCredentials) => Promise<void>;    //Görs asynkron
    logout: () => void;     //Rensar localStorage (User och token). Görs i klientsidan.
}

