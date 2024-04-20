
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateReviewInput {
    subjectId: string;
    rating: number;
    comment?: Nullable<string>;
    amountOfWorkRating?: Nullable<number>;
    teacherRating?: Nullable<number>;
    difficultyRating?: Nullable<number>;
}

export class Review {
    subjectId: string;
    createdOn: number;
    modifiedOn?: Nullable<number>;
    rating: number;
    comment?: Nullable<string>;
    amountOfWorkRating?: Nullable<number>;
    teacherRating?: Nullable<number>;
    difficultyRating?: Nullable<number>;
    subject?: Nullable<Subject>;
}

export abstract class IQuery {
    abstract reviews(): Nullable<Review>[] | Promise<Nullable<Review>[]>;

    abstract myReviews(): Nullable<Review>[] | Promise<Nullable<Review>[]>;

    abstract subjects(trackId?: Nullable<string>): Nullable<Subject>[] | Promise<Nullable<Subject>[]>;

    abstract tracks(): Nullable<Track>[] | Promise<Nullable<Track>[]>;
}

export abstract class IMutation {
    abstract createReview(createReviewInput: CreateReviewInput): Review | Promise<Review>;
}

export class Subject {
    id: string;
    name: string;
    reviews: Nullable<Review>[];
    nReviews: number;
    cumRating: number;
    nAmountOfWorkRatings: number;
    cumAmountOfWorkRating: number;
    nTeacherRatings: number;
    cumTeacherRating: number;
    nDifficultyRatings: number;
    cumDifficultyRating: number;
}

export class Track {
    id: string;
    name: string;
}

type Nullable<T> = T | null;
