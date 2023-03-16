export type InflowRouteType = 'instagram' | 'facebook' | 'directSearch' | 'etc';

export type User = {
    id?: number;
    password?: string;
    email?: string;
    name?: string;
    gender?: string;
    age?: string;
    inflowRoute?: InflowRouteType;
    isAdmin?: boolean;
    createdAt?: Date;
};
