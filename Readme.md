# ManiacForum2

## Notes

### Database model

[dbdiagram.io](https://dbdiagram.io/d/613b3b03825b5b0146fc398d)

### State

#### FE

- there is none

#### BE (api)

- opens http server (express) on localhost:3000
- connects to postgres, mock db request

#### Postgres

- creates empty db 'maniacforum2' on startup if there is none already

### Accessing postgres db

- `docker exec -ti postgres psql -U postgres` to bash into postgres container as user `postgres`
- `psql -U postgres maniacforum2` to access database 'maniacforum2'
- dump all dbs:
  `` docker exec -t postgres pg_dumpall -c -U postgres > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql ``
- load from dump: `cat your_dump.sql | docker exec -i postgres psql -U postgres`

#### PGAdmin

- `localhost:5050`
- `admin@admin.com`
- `root`
- copy backup dump from pgadmin container: `docker cp pgadmin:/var/lib/pgadmin/storage/admin_admin.com/mehtsdump ~/mehtsdump`
