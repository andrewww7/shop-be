export class DatabaseConfig {
    public readonly pg_database = process.env.POSTGRES_DATABASE;

    public readonly pg_username = process.env.POSTGRES_USERNAME;

    public readonly pg_password = process.env.POSTGRES_PASSWORD;

    public readonly pg_host = process.env.POSTGRES_HOST;

    public readonly pg_port = parseInt(process.env.POSTGRES_HOST, 10);
}

const databaseConfig = new DatabaseConfig();
export { databaseConfig };

