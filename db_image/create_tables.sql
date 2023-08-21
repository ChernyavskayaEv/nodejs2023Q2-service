create table public.artist (
id uuid primary key,
name varchar(100) not null,
favorite boolean,
grammy boolean);

create table public.album (
id uuid primary key,
name varchar(100),
year integer,
artistId uuid,
favorite boolean,
foreign key(artistId) references artist (id) on delete set null);


create table public.user (
id uuid primary key,
login varchar(100) not null,
password varchar(50) not null,
version integer,
createdAt timestamp default now(),
updatedAt timestamp default now());

create table public.track (
id uuid primary key,
name varchar(100),
artistId uuid,
albumId uuid,
duration float,
favorite boolean,
foreign key(albumId) references album (id) on delete set null,
foreign key(artistId) references artist (id) on delete set null);

