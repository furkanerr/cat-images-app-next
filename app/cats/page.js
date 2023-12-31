"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.scss"; // Import your SCSS module
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import checkIfLogin  from '@/libs/checkIfLoggedIn';
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
import { useGlobalContext } from '../context/store';
function ImageComponent() {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setIsLoggedIn, isLoggedIn } = useGlobalContext();
  const fetchRandomImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/cats", {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });

      const imageUrl = response.data.data[0]?.url || "";
      
      setImageSrc(imageUrl);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const checkSession  = async () =>{

    //const response = await checkIfLogin()
    if (isLoggedIn) {
      return true;
    }
    else{
      router.push("/");
    }

}
  useEffect(() => {
    const result = checkSession();
    if(result){
      fetchRandomImage();
    }
  
  }, []);

  return (
    <main>
      <div className={styles.imageContainer}>
        {loading ? (
          <div className={styles.Skeleton}>
            <Skeleton width={300} height={60} count={5} />
          </div>
        ) : (
          <div className={styles.image}>
            <img width={300} height={300} src={imageSrc} alt="Random Cat" />
          </div>
        )}
        <button
          className={styles.button}
          onClick={fetchRandomImage}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Another Image"}
        </button>
      </div>
    </main>
  );
}

export default ImageComponent;
