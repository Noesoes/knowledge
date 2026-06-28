import initSqlJs, { type Database } from "sql.js";
import { sqlSeed } from "./content/sqlSeed";

let sqlJsPromise: ReturnType<typeof initSqlJs> | null = null;
function loadSqlJs() {
  if (!sqlJsPromise) {
    sqlJsPromise = initSqlJs({
      locateFile: (file: string) => `${import.meta.env.BASE_URL}${file}`,
    });
  }
  return sqlJsPromise;
}

let dbInstance: Database | null = null;
let dbPromise: Promise<Database> | null = null;

export function getDb(): Promise<Database> {
  if (dbInstance) return Promise.resolve(dbInstance);
  if (!dbPromise) {
    dbPromise = loadSqlJs().then((SQL) => {
      const db = new SQL.Database();
      db.run(sqlSeed);
      dbInstance = db;
      return db;
    });
  }
  return dbPromise;
}

export function resetDb(): Promise<Database> {
  dbInstance?.close();
  dbInstance = null;
  dbPromise = null;
  return getDb();
}
