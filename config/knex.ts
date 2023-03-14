import { Knex } from 'knex';

// declare module 'knex/types/tables' {
//     interface Run {
//         id: number;
//         name: string;
//         score: number;
//         submitted_at: number;
//     }

//     interface Tables {
//         runs: Run;
//     }
// };

export const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./test.db"
    },
    useNullAsDefault: true,
});