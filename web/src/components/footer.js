import React from "react"
import styles from "./footer.module.scss"

const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.copyright}>
      © {new Date().getFullYear()} Wing Luke Museum of the Asian Pacific
      American Experience
    </p>
  </footer>
)

export default Footer
