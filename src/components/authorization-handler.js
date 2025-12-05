import { EndpointError } from "../api/errors/common.js";
import { userDao } from "../dao/user-dao.js";

class Unauthorized extends EndpointError {
  constructor(params) {
    super(
      "unauthorized",
      "This user is not authorized to run this use case.",
      403,
      params
    );
  }
}

export function authorizationHandler(profiles) {
  const profileSet = new Set(profiles);

  return async (req, res, next) => {
    /** @type {import("./jwt-handler").Identity}*/
    const identity = req.identity;
    const userId = identity.id;

    const user = await userDao.getById(userId);
    const userProfiles = user?.profiles ?? [];

    const hasValidProfiles = userProfiles.some((profile) =>
      profileSet.has(profile)
    );

    if (!hasValidProfiles) {
      throw new Unauthorized({
        userId: identity.id,
        userProfiles,
        useCaseProfiles: profiles,
      });
    }

    req.authorization = {
      userProfiles,
      useCaseProfiles: profiles
    };

    return next();
  };
}
