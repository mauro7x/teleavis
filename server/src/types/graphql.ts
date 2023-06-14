
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Option {
    id: string;
    name: string;
}

export abstract class IQuery {
    abstract public(): string | Promise<string>;

    abstract private(): string | Promise<string>;
}

type Nullable<T> = T | null;
