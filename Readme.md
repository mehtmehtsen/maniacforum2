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

`docker exec -ti postgres sh` to bash into postgres container
`psql -U postgres boards` to access database 'boards'
