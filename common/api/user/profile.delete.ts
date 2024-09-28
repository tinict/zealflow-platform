import axios from "axios";
import Cookies from "js-cookie";

export const deleteUserProfile = async ({ ...args }) => {
  const authorization = Cookies.get("client_token");

  const { id } = args;

  await axios
    .delete(`http://localhost:5000/api/v1/user/${id}`, {
      headers: { authorization },
    })
    .catch(function (error) {
      console.log(error);
    });
};
