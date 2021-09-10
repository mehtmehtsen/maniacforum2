# ManiacForum2

## Notes

### State

#### FE

- there is none

#### BE (api)

- opens http server (express) on localhost:3000
- connects to postgres, mock db request

#### Postgres

- creates empty db 'boards' on startup if there is none already

### Accessing postgres db

- `docker exec -ti postgres psql -U postgres` to bash into postgres container as user `postgres`
- `psql -U postgres boards` to access database 'boards'
- dump all dbs:
  `` docker exec -t postgres pg_dumpall -c -U postgres > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql ``
- load from dump: `cat your_dump.sql | docker exec -i postgres psql -U postgres`

#### PGAdmin

- `localhost:5050`
- `admin@admin.com`
- `root`
