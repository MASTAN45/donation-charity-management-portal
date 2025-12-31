import { Pool } from 'mysql2/promise';
declare let pool: Pool | null;
export declare function initDatabase(): Promise<void>;
export declare function getPool(): Pool;
export { pool };
declare const _default: {
    getPool: typeof getPool;
    initDatabase: typeof initDatabase;
};
export default _default;
//# sourceMappingURL=database.d.ts.map