# ManiacForum2

## TODO

- don't get `*` in `/msgs`

## Database model

- enter pgadmin (see PGAdmin)
- tools -> storage manager
- upload `/maniacforum2.pgerd`
- tools -> new erd project
- load `/maniacforum2.pgerd`

### DB structure vs API

| db     | Maniac                 | endpoints            |
| ------ | ---------------------- | -------------------- |
| boards | Boards                 | `/boards`            |
| msgs   | List of Threads        | `/threads/{boardId}` |
|        | List of Msgs in Thread | `/msgs/{threadId}`   |
|        | Indivual msg           | `/msg/{msgId}`       |
| users  | Individual user        | none, as of yet      |

## Docker

- `docker-compose up`

## State

### FE

- fresh angular project

### BE

- opens http server (express) on localhost:3000
- stub API for `/ping`
- swagger ui on `/docs`

### Postgres

- creates empty db 'maniacforum2' on startup if there is none already

#### setting up DB after first time run or losing containers

- access PGAdmin (see below)
- add new server
- name: maniacserver
- choose tab 'connection'
- host: postgres
- username: postgres
- password: mysecretpassword
- check save password
- click save
- rightclick 'maniacforum2'
- click Query Tool
- copy contents of `./initial_db_setup.sql`
- paste into Query Tool
- click play button in toolbar (will create tables 'boards' with content and 'msgs', 'threads', 'users')
- rightclick 'maniacforum2' -> refresh
- tables are in maniacforum2/schemas/tables

## Accessing postgres db

- `docker exec -ti postgres psql -U postgres` to bash into postgres container as user `postgres`
- `psql -U postgres maniacforum2` to access database 'maniacforum2'
- dump all dbs:
  `` docker exec -t postgres pg_dumpall -c -U postgres > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql ``
- load from dump: `cat your_dump.sql | docker exec -i postgres psql -U postgres`

## PGAdmin

- `localhost:5050`
- `admin@admin.com`
- `root`
- copy backup dump from pgadmin container: `docker cp pgadmin:/var/lib/pgadmin/storage/admin_admin.com/mehtsdump ~/mehtsdump`

## Generating tsoa routes

- `cd backend`
- `npx tsoa routes`

## Generating API service

- ensure containers are up
- `cd frontend`
- `npm run generate-api`
