CREATE TABLE "Conversations"(
    "id" serial PRIMARY KEY
);

CREATE TABLE "Conversations_to_Users" (
    participantId integer NOT NULL REFERENCES "Users"(id),
    conversationId integer NOT NULL REFERENCES "Conversations"(id),
    blackList boolean NOT NULL,
    favoriteList boolean NOT NULL,
    PRIMARY KEY (participantId, conversationId)
);


CREATE TABLE "Messages"(
    "id" serial PRIMARY KEY,
    sender integer NOT NULL REFERENCES "Users"(id),
    body varchar(200) NOT NULL,
    conversation integer NOT NULL REFERENCES "Conversations"(id)
);

CREATE TABLE "Catalogs"(
    "id" serial PRIMARY KEY,
    userId integer NOT NULL REFERENCES "Users"(id),
    catalogName varchar(200) NOT NULL
);

CREATE TABLE "Catalogs_to_Conversations" (
    catalogId integer NOT NULL REFERENCES "Catalogs"(id),
    conversationId integer NOT NULL REFERENCES "Conversations"(id),
    PRIMARY KEY (catalogId, conversationId)
);


