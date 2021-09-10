-- create tables
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "firstname" varchar,
  "lastname" varchar,
  "email" varchar,
  "showname" boolean,
  "residence" varchar,
  "homepage" varchar,
  "firstgame" varchar,
  "genres" text,
  "systems" text,
  "classics" text,
  "hobbies" text,
  "id_xbox" varchar,
  "id_ps" varchar,
  "id_nintendo" varchar,
  "image" varchar
);

CREATE TABLE "boards" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar
);

CREATE TABLE "threads" (
  "board_id" int,
  "id" SERIAL PRIMARY KEY,
  "title" varchar
);

CREATE TABLE "msgs" (
  "thread_id" int,
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "parent_id" int,
  "parent_user_id" int,
  "timestamp" timestamp
);

-- create references
ALTER TABLE "msgs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "msgs" ADD FOREIGN KEY ("parent_user_id") REFERENCES "users" ("id");
ALTER TABLE "threads" ADD FOREIGN KEY ("board_id") REFERENCES "boards" ("id");
ALTER TABLE "msgs" ADD FOREIGN KEY ("thread_id") REFERENCES "threads" ("id");
ALTER TABLE "msgs" ADD FOREIGN KEY ("parent_id") REFERENCES "msgs" ("id");

-- create boards
INSERT INTO boards VALUES (DEFAULT, 'Smalltalk');
INSERT INTO boards VALUES (DEFAULT, 'For Sale');
INSERT INTO boards VALUES (DEFAULT, 'Tech''n''Cheats');
INSERT INTO boards VALUES (DEFAULT, 'OT');
INSERT INTO boards VALUES (DEFAULT, 'Filme & Serien');
INSERT INTO boards VALUES (DEFAULT, 'Corona');
INSERT INTO boards VALUES (DEFAULT, 'Online');