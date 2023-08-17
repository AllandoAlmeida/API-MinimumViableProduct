import { sign } from "jsonwebtoken";
import { client } from "../../database";
import { AppError } from "../../errors/AppError.errors";
import {
  SessionCreate,
  SessionReturn,
} from "../../interfaces/session.interfaces/session.interfaces";
import {
  Users,
  UsersResult,
} from "../../interfaces/users.interfaces/users.interfaces";
import { compareSync } from "bcryptjs";


export const userLogin = async (
  userloginBody: SessionCreate
): Promise<SessionReturn> => {
  const query: UsersResult = await client.query(
    `SELECT * FROM "users" WHERE "email" = $1`,
    [userloginBody.email]
  );
 
  if (query.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const user: Users = query.rows[0];

  const passwordIsValid: boolean = compareSync(
    userloginBody.password,
    user.password
  );

  if (!passwordIsValid) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { username: user.name, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn:process.env.EXPIRES_IN!}
  );

  return { token };
};
