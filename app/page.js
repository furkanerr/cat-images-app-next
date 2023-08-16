
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle login logic here, e.g., sending data to the server
      console.log("Username:", values.username);
      console.log("Password:", values.password);
      const req = {
        username: values.username,
        password: values.password,
      };
      try {
        const result = await axios.post("/api/login", req);
        console.log(result);
        if (result.status === 200) {
          router.push("/cats");
        }
      } catch (error) {
        setError(error.response.data.errorMessage);
      }
    },
  });

  const checkIfLogin = async () => {
    const response = await axios.get("/api/sessionControl");
    console.log(response);
    if (response.status === 200) {
      router.push("/cats");
    }
  };

  useEffect(() => {
    checkIfLogin();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className={styles["text-input"]}
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className={styles["text-input"]}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          {error && <div>{error}</div>}
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
