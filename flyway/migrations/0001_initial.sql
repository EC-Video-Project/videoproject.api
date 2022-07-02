create table UserVideo (
    id int unsigned auto_increment primary key,
    title varchar(100) null,
    videoId binary(16) not null,
    active bool 1,
    createdDt datetime not null,
    updatedDt datetime not null,
    userId int unsigned not null,
    isDeleted bool 0,
    foreign key (userId) references User(id)
);

create table Posting (
    id int unsigned auto_increment primary key,
    title varchar(100) null,
    videoId binary(16) not null,
    active bool 1,
    createdDt datetime not null,
    updatedDt datetime not null,
    userId int unsigned not null,
    isDeleted bool 0,
    foreign key (userId) references User(id)
);

create table Application (
    id int unsigned auto_increment primary key,
    postingId int unsigned not null,
    videoId binary(16) not null,
    retracted bool 0,
    createdDt datetime not null,
    updatedDt datetime not null,
    userId int unsigned not null,
    isDeleted bool 0,
    foreign key (postingId) references Posting(id),
    foreign key (userId) references User(id)
);

-- needs work
create table EntityTag (
    entityId int unsigned not null,
    tagId mediumint unsigned not null,
    foreign key (tagId) references Tag(id)
);

create table Tag (
    id mediumint auto_increment primary key,
    name varchar(25) not null,
    type varchar(8) not null, -- industry,skill,location,hours
);

create table Star (
    entityId int unsigned not null,
    userId int unsigned not null,
    primary key(entityId, userId)
);

create table View (
    entityId int unsigned not null,
    userId int unsigned not null,
    primary key(entityId, userId)
);

create table User (
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

create table Invitations (
    id int unsigned auto_increment primary key,
    sender int unsigned not null,
    invitee int unsigned not null,
    accepted bool 0,
    foreign key (sender) references User(id),
    foreign key (invitee) references User(id)
);
