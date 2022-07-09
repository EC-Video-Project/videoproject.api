create TABLE if NOT exists User (
    id int unsigned auto_increment primary key,
    authId binary(16) not null, -- research, is an aws provided guid a string or binary type?
    displayName varchar(50) not null,
    email varchar(50) not null,
    phone varchar(25) not null,
    employerMode bool not null,
    bio varchar(500) null,
    signupDate datetime not null,
    profileLinks json not null
);

create table if NOT exists Video (
    id int unsigned auto_increment primary key,
    s3Id binary(16) not null,
    userId int unsigned not null,
    createdDt datetime not null,
    updatedDt datetime not null,
    isDeleted BOOL default 0,
    
    foreign key (userId) references User(id)
);

create table if NOT exists Posting (
    id int unsigned auto_increment primary key,
    theStatus tinyint unsigned default 0,
    title varchar(50) not null,
    videoId int unsigned not null,
    userId int unsigned not null,
    createdDt datetime not null,
    updatedDt datetime not null,
    
    foreign key (videoId) references Video(id),
    foreign key (userId) references User(id)
);

create table if NOT exists Introduction (
    id int unsigned auto_increment primary key,
    theStatus tinyint unsigned default 0,
    videoId int unsigned not null,
    userId int unsigned not null,
    createdDt datetime not null,
    updatedDt datetime not null,
    
    foreign key (videoId) references Video(id),
    foreign key (userId) references User(id)
);

create table if NOT exists Application (
    id int unsigned auto_increment primary key,
    postingId int unsigned not null,
    theStatus tinyint unsigned default 0,
    videoId int unsigned not null,
    userId int unsigned not null,
    createdDt datetime not null,
    updatedDt datetime not null,
    
    foreign key (postingId) references Posting(id),
    foreign key (videoId) references Video(id),
    foreign key (userId) references User(id)
);

create Table if NOT exists Tag (
    id mediumint unsigned auto_increment primary key,
    name varchar(25) not null,
    type varchar(8) not null, -- industry,skill,location,hours
);

create table if NOT exists PostingTag (
    id int unsigned not null,
    tag mediumint unsigned not null,

    foreign key (id) references Posting(id),
    foreign key (tag) references Tag(id)
);

create table if NOT exists IntroductionTag (
    id int unsigned not null,
    tag mediumint unsigned not null,

    foreign key (id) references Introduction(id),
    foreign key (tag) references Tag(id)
);

create table if NOT exists Star (
    entityId int unsigned not null, -- how to index this
    userId int unsigned not null,
    
    foreign key (userId) references User(id)
);

create table if NOT exists View (
    entityId int unsigned not null,
    userId int unsigned not null,

    foreign key (userId) references User(id)
);

create table if NOT exists Invitation (
    id int unsigned auto_increment primary key,
    sender int unsigned not null,
    invitee int unsigned not null,
    accepted bool default 0,
    message varchar(150) null,
    
    foreign key (sender) references User(id),
    foreign key (invitee) references User(id)
);
