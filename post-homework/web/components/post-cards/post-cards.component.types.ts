export type PostCardComponentTypes = {
   
}

export type PostType = {
    text: string;
    userRef: UserType;
    updatedAt: Date;
}

export type UserType = {
    _id: string;
    name: string;
    email: string;
    userRefId?: number;
}