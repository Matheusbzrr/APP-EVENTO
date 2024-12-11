export const config = {
    HOST: "localhost",
    PORT: 3306,
    USER: "root", // seu user do mysql
    PASSWORD: "root", //sua senha do mysql
    DB: "AppEvento", // nome do schemamudar se preciso
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export const dialect = "mysql";