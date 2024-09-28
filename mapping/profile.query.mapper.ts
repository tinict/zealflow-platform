import * as _ from "lodash";

export class QueryMapper {
  static toQueryMapper = (entity: any) => {
    return {
      id: _.get(entity, "Id"),
      firstname: _.get(entity, "Firstname"),
      lastname: _.get(entity, "Lastname"),
      username: _.get(entity, "Username"),
      gender: _.get(entity, "Gender"),
      dob: _.get(entity, "Dob"),
      phone: _.get(entity, "Phone"),
      picture: _.get(entity, "Picture"),
      email: _.get(entity, "Email"),
      bio: _.get(entity, "Bio"),
    };
  };
}
