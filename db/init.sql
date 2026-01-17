CREATE TABLE username (
	id UUID PRIMARY KEY,
	username VARCHAR(255),
	password VARCHAR(255)
);

CREATE TABLE calendar_event (
	id UUID PRIMARY KEY,
	creation_date TIMESTAMPTZ,
	dues_date TIMESTAMPTZ,
	name VARCHAR(255),
	username_id UUID REFERENCES username(id),
	data VARCHAR(255)
);

CREATE TABLE event_task (
	id UUID PRIMARY KEY,
	event UUID REFERENCES calendar_event(id),
	duration int,
	description VARCHAR(255),
	partner VARCHAR(255),
	date TIMESTAMPTZ
);

