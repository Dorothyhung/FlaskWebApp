drop table if exists User;
drop table if exists Notes;

create table User(
    UserID int primary key,
    FirstName string,
    Email string,
    Password string
);

create table Note(
    NoteID int primary key,
    Date date,
    Text string,
    foreign key (UserID) references User(UserID)
);