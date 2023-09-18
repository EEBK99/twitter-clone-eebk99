import jwt from "jsonwebtoken";
import { handleError } from "./error";

/**
 * create new user
 * @param req
 * @param res
 * @param next
 */
export const verifyToken = (
  req: {
    cookies: { access_token: any };
    user: string | jwt.JwtPayload | undefined;
  },
  res: any,
  next: any
) => {
  const token = req.cookies.access_token;

  if (!token) return next(handleError("401", "You are not authenticated"));

  jwt.verify(
    token,
    process.env.JWT || "",
    (err: any, user: string | jwt.JwtPayload | undefined) => {
      if (err) return next(handleError("403", "Token is invalid"));
      req.user = user;
      next();
    }
  );
};
