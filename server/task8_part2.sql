CREATE TABLE "Conversations"(
    "id" serial PRIMARY KEY,
    participant1 integer NOT NULL REFERENCES "Users"(id),
    participant2 integer NOT NULL REFERENCES "Users"(id),
    blackList boolean[] NOT NULL,
    favoriteList boolean[] NOT NULL
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



--Оскільки в нашому застосунку в чаті завжди лише два користувачі, я вирішила не створювати додаткову сутність 
--Conversations_to_Users, залишивши майже не змінною структуру no-sql «Conversations», 
--прописавши учасників чатів як два посилання на сутність «Users» - participant1, participant2
--Це значно полегшило роботу зі списками «улюблених» та «блокованих» користувачів, 
--полегшило структуру та вкладеність запитів, 
--і завдяки цьому я практично не переробляла супутню логіку на клієнті, просто привівши відповіді сервера до тих, які вже «навчився бачити» клієнт

--Тож, при реалізації пункту завдання 15 - 
--Було додано лише 3 моделі та 4 міграції до існуючої Sequelize структури

