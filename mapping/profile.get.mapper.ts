import * as _ from "lodash";

export class ProfileGetMapper {
  static toProfileGetMapper = (entity: any) => {
    return {
      id: _.get(entity, "id"),
      firstname: _.get(entity, "firstname"),
      lastname: _.get(entity, "lastname"),
      username: _.get(entity, "username"),
      gender: _.get(entity, "gender"),
      dob: _.get(entity, "dob"),
      phone: _.get(entity, "phone"),
      picture: _.get(entity, "picture"),
      email: _.get(entity, "email"),
      bio: _.get(entity, "bio"),
    };
  };
}
