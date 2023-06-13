
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CredentialsInput {
    username: string;
    password: string;
}

export class Session {
    accessToken: string;
}

export abstract class IQuery {
    abstract pepe(): string | Promise<string>;
}

export abstract class IMutation {
    abstract authenticate(credentialsInput: CredentialsInput): Session | Promise<Session>;
}

type Nullable<T> = T | null;
