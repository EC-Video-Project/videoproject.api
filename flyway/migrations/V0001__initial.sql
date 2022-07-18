create TABLE if NOT exists AppUser (
    "id" uuid primary key,
    "cognitoUsername" text not null,
    "displayName" text not null,
    "email" text not null,
    "phone" text not null,
    "employerMode" boolean not null,
    "bio" text null,
    "signupDate" timestamp NOT null DEFAULT (now() at time zone 'utc'),
    "profileLinks" json null
);

create table if NOT exists Video (
    "id" serial primary key,
    "s3Id" uuid not null,
    "userId" uuid not null references AppUser(id),
    "createdDt" timestamp NOT null DEFAULT (now() at time zone 'utc'),
    "updatedDt" timestamp NOT null DEFAULT (now() at time zone 'utc'),
    "isDeleted" boolean not null default false
);

create table if NOT exists Posting (
    "id" serial primary key,
    "itemStatus" integer not null,
    "title" text not null,
    "videoId" integer not null references Video(id),
    "userId" uuid not null references AppUser(id),
    "createdDt" timestamp NOT null DEFAULT (now() at time zone 'utc'),
    "updatedDt" timestamp NOT null DEFAULT (now() at time zone 'utc')
);

create table if NOT exists Introduction (
    "id" serial primary key,
    "itemStatus" integer not null,
    "videoId" integer not null references Video(id),
    "userId" uuid not null references AppUser(id),
    "createdDt" timestamp NOT null DEFAULT (now() at time zone 'utc'),
    "updatedDt" timestamp NOT null DEFAULT (now() at time zone 'utc')
);

create table if NOT exists Application (
    "id" serial primary key,
    "postingId" integer not null references Posting(id),
    "itemStatus" integer not null,
    "videoId" integer not null references Video(id),
    "userId" uuid not null references AppUser(id),
    "createdDt" timestamp NOT null DEFAULT (now() at time zone 'utc'),
    "updatedDt" timestamp NOT null DEFAULT (now() at time zone 'utc')
);

create Table if NOT exists Tag (
    "id" serial primary key,
    "name" text not null,
    "type" text not null -- industry,skill,location,hours
);

create table if NOT exists PostingTag (
    "id" integer not null references Posting(id),
    "tag" integer not null references Tag(id),

    primary key ("id", "tag")
);

create table if NOT exists IntroductionTag (
    "id" integer not null references Introduction(id),
    "tag" integer not null references Tag(id),

    primary key ("id", "tag")
);


create table if NOT exists PostingStar (
    "id" integer not null references Posting(id),
    "userId" uuid not null references AppUser(id),
    
    primary key ("id", "userId")
);

create table if NOT exists PostingView (
    "id" integer not null references Posting(id),
    "userId" uuid not null references AppUser(id),

    primary key ("id", "userId")
);

create table if NOT exists IntroductionStar (
    "id" integer not null references Introduction(id),
    "userId" uuid not null references AppUser(id),
    
    primary key ("id", "userId")
);

create table if NOT exists IntroductionView (
    "id" integer not null references Introduction(id),
    "userId" uuid not null references AppUser(id),

    primary key ("id", "userId")
);

create table if NOT exists ApplicationStar (
    "id" integer not null references Application(id),
    "userId" uuid not null references AppUser(id),
    
    primary key ("id", "userId")
);

create table if NOT exists ApplicationView (
    "id" integer not null references Application(id),
    "userId" uuid not null references AppUser(id),

    primary key ("id", "userId")
);

create table if NOT exists Invitation (
    "id" serial primary key,
    "sender" uuid not null references AppUser(id),
    "recipient" uuid not null references AppUser(id),
    "accepted" boolean not null default false,
    "message" text null,
    "sentDt" timestamp NOT null DEFAULT (now() at time zone 'utc')
);
