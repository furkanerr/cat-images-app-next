"use client";

import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import checkIfLogin from "@/libs/checkIfLoggedIn";
import { useGlobalContext } from './context/store';
export default function Home() {
  const pathname = usePathname();
  const { setIsLoggedIn, isLoggedIn } = useGlobalContext();
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
      
    
      const req = {
        username: values.username,
        password: values.password,
      };
      try {
        const result = await axios.post("/api/login", req);
      
        if (result.status === 200) {
          setIsLoggedIn(true)
          router.push("/cats");
        }
      } catch (error) {
        setError(error.response.data.errorMessage);
      }
    },
  });

 
  const checkSession  = async () =>{

   // const response = await checkIfLogin()

    if (isLoggedIn) {
      router.push("/cats");
    }
   

}

  useEffect(() => {
    checkSession();
  }, [pathname,isLoggedIn]);

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
