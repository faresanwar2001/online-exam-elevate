declare interface User {
    "username": string;
    "firstName": string;
    "lastName": string;
    "email": string;
    "phone": number;
    "role": string;
    "isVerified": boolean;
    "createdAt": string;
    "passwordResetCode": string;
    "passwordResetExpires": string;
    "resetCodeVerified": boolean;

 
}
declare type LoginResponse ={
    token: string;
    user:User;
 
}