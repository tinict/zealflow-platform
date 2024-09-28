import axios from "axios";
import Cookies from "js-cookie";

import { ProfileGetMapper } from "@/mapping";

type GetProfile = {
  id: string;
  username: string;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  bio: string;
};

export const getProfile = async (): Promise<{
  props: { repo: GetProfile };
} | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .get("http://localhost:5000/api/v1/sso/google/me", {
      headers: { authorization },
    })
    .catch(function (error) {
      console.log(error);
    });

  if (!res) return null;

  const repo: GetProfile = ProfileGetMapper.toProfileGetMapper(res.data);

  return {
    props: {
      repo,
    },
  };
};
