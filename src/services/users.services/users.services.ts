import format from "pg-format";
import {
  Users,
  UsersCreate,
  UsersResult,
} from "../../interfaces/users.interfaces/users.interfaces";
import { client } from "../../database";
import { hash } from "bcryptjs";

export const addNewUser = async (userBody: UsersCreate): Promise<Users> => {
  userBody.password = await hash(userBody.password, 12);
  const queryString: string = format(
    `
        INSERT INTO "users"
        (%I)
        VALUES
        (%L)
        RETURNING *;
        `,
    Object.keys(userBody),
    Object.values(userBody)
  );
  const queryResult: UsersResult = await client.query(queryString);
  const newUser: Users = queryResult.rows[0];

  return newUser;
};

export const searchAllUsers = async (): Promise<Array<Users>> => {
  const queryString: string = `
  SELECT * FROM "users"  
  `;
  const queryResult: UsersResult = await client.query(queryString);
  const listUsers: Array<Users> = queryResult.rows;
  return listUsers;
};
