import axios from "axios";

const checkIfLogin = async () => {
  try {
    const response = await axios.get("/api/sessionControl");
    return true;
  } catch (error) {
    return false;
  }
};

export default checkIfLogin;