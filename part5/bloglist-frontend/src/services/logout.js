import axios from "axios";
const baseUrl = "/api/logout";

const logout = ({ setUser }) => {
  localStorage.removeItem("token");
  setUser(null);
};

export default { logout };
