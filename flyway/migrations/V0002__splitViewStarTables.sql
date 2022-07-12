-- follow-up update to initial schema, after dev review

drop table Star;
drop table View;

create table if NOT exists PostingStar (
    id int unsigned not null,
    userId int unsigned not null,
    
    primary key (id, userId),
    foreign key (id) references Posting(id),
    foreign key (userId) references User(id)
);

create table if NOT exists PostingView (
    id int unsigned not null,
    userId int unsigned not null,

    primary key (id, userId),
    foreign key (id) references Posting(id),
    foreign key (userId) references User(id)
);

create table if NOT exists IntroductionStar (
    id int unsigned not null,
    userId int unsigned not null,
    
    primary key (id, userId),
    foreign key (id) references Introduction(id),
    foreign key (userId) references User(id)
);

create table if NOT exists IntroductionView (
    id int unsigned not null,
    userId int unsigned not null,

    primary key (id, userId),
    foreign key (id) references Introduction(id),
    foreign key (userId) references User(id)
);

create table if NOT exists ApplicationStar (
    id int unsigned not null,
    userId int unsigned not null,
    
    primary key (id, userId),
    foreign key (id) references Application(id),
    foreign key (userId) references User(id)
);

create table if NOT exists ApplicationView (
    id int unsigned not null,
    userId int unsigned not null,

    primary key (id, userId),
    foreign key (id) references Application(id),
    foreign key (userId) references User(id)
);
