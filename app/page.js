import  React from "react";
import styles from '../styles/styles.module.css';
import Search from "../components/home/Search";
export default function Home() {
  return (
    <div className={styles.homeMainContainer}>
        <Search/>
    </div>
  );
}
