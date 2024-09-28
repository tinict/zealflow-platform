import axios from "axios";
import Cookies from "js-cookie";

import { ProfileGetMapper } from "@/mapping";

type GetUserProfile = {
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

export const getUserProfile = async ({
  ...args
}): Promise<{ props: { repo: GetUserProfile } } | null> => {
  const authorization = Cookies.get("client_token");

  const { id } = args;

  const res = await axios
    .get(`http://localhost:5000/api/v1/user/${id}`, {
      headers: { authorization },
    })
    .catch(function (error) {
      console.log(error);
    });

  if (!res) return null;

  //Get profile
  console.log(res.data);
  const repo: GetUserProfile = ProfileGetMapper.toProfileGetMapper(res.data);

  return {
    props: {
      repo,
    },
  };
};
