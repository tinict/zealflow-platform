import axios from "axios";
import Cookies from "js-cookie";

import { ProfileGetMapper } from "@/mapping";

type UpdateUserProfile = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  bio: string;
};

export const updateUserProfile = async ({
  ...args
}): Promise<{ props: { repo: UpdateUserProfile } } | null> => {
  const authorization = Cookies.get("client_token");

  const { id, body } = args;

  const res = await axios
    .put(`http://localhost:5000/api/v1/user/${id}`, body, {
      headers: { authorization },
    })
    .catch(function (error) {
      console.log(error);
    });

  if (!res) return null;

  //Get profile
  console.log(res.data);
  const repo: UpdateUserProfile = ProfileGetMapper.toProfileGetMapper(res.data);

  return {
    props: {
      repo,
    },
  };
};
