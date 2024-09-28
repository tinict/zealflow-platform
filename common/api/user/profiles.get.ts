"use client";

import axios from "axios";
import Cookies from "js-cookie";

type GetProfile = {
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

type Query = {
  repo: {
    offset: number;
    limit: number;
    q: string;
    include: string;
  };
};

export const getAllProfile = async (
  query: object,
): Promise<{ props: { repo: object } } | null> => {
  const authorization = Cookies.get("client_token");

  const res = await axios
    .get("http://localhost:5000/api/v1/user", {
      params: {
        ...query,
      },
      headers: { authorization },
    })
    .catch(function (error) {
      console.log(error);
    });

  if (!res) return null;

  const repo: object = {
    list: res.data,
  };

  return {
    props: {
      repo,
    },
  };
};
