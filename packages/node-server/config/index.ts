import { getIPAddress } from "./../src/utils/index";
export const port = "9000";
export const host = getIPAddress();
// export const host = 'localhost';
export const dbConfig = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "19980518",
  database: "iconServer",
  synchronize: true,
};
