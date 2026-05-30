import React from 'react';
import styles from './Footer.module.scss';

export const FooterLinks: React.FC = () => {
  return (
    <div className={styles.links}>
      <a
        className={styles.link}
        href="https://github.com/Solodovsky"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a className={styles.link} href="#">
        Contacts
      </a>
      <a className={styles.link} href="#">
        Rights
      </a>
    </div>
  );
};

export default FooterLinks;
