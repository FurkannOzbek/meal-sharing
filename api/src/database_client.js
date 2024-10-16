import knex from "knex";

const connection = knex({
  client: "pg",
  connection: {
    host: "dpg-cs2kh3d6l47c73bk9640-a",
    port: "5432",
    user: "mealsharing_d3ug_user",
    password: "8JWqUaQ9ltWeL5cHKSgAHCgeC8WoqjJU",
    database: "mealsharing_d3ug",
  },
});

export default connection;
