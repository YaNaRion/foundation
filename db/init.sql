CREATE TABLE username (
	id UUID PRIMARY KEY,
	username VARCHAR(255)
);

CREATE TABLE link (
	id UUID PRIMARY KEY,
	event_id UUID REFERENCES event(id), 
	link VARCHAR(255)
);

CREATE TABLE calendar_event (
	id UUID PRIMARY KEY,
	creation_date TIMESTAMPTZ,
	dues_date TIMESTAMPTZ,
	name VARCHAR(255),
	user UUID REFERENCES user(id),
	data VARCHAR(255)
);

CREATE TABLE event_task (
	id UUID PRIMARY KEY,
	event UUID REFERENCES event(id),
	date TIMESTAMPTZ
);

