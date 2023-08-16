
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.module.scss"; // Import your SCSS module
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/navigation";
function ImageComponent() {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchRandomImage = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/cats",{
        headers:{
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      });

      const imageUrl = response.data.data[0]?.url || "";
      console.log(imageUrl)
      setImageSrc(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };
  const checkIfLogin = async () => {
    try {
      const response = await axios.get("/api/sessionControl");
      console.log("response", response);
      if (response.status == 200) {
        return true;
      }
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };
  useEffect(() => {
    checkIfLogin();
    fetchRandomImage();
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
