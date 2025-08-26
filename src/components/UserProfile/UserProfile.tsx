import { useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import styles from './UserProfile.module.css';
import { useEffect, useState } from 'react';

const UserProfile = () => {
  const formData = useSelector((state: RootState) => state.form);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setIsUpdated(true);

    setTimeout(() => {
      setIsUpdated(false);
    }, 4000);
  }, [formData.name]);

  if (!formData.name) {
    return;
  }

  return (
    <div className={isUpdated ? styles.userProfileUpdated : styles.userProfile}>
      <h2>User Information</h2>
      <p className={styles.userInfo}>
        <strong>Name:</strong> {formData.name}
      </p>
      <p className={styles.userInfo}>
        <strong>Age:</strong> {formData.age}
      </p>
      <p className={styles.userInfo}>
        <strong>Email:</strong> {formData.eMail}
      </p>
      <p className={styles.userInfo}>
        <strong>Gender:</strong> {formData.gender}
      </p>
      <p className={styles.userInfo}>
        <strong>Country Short Code:</strong> {formData.country}
      </p>
      {formData.photo && (
        <p>
          <strong>Photo:</strong> {String(formData.photo)}
        </p>
      )}
      <p className={styles.userInfo}>
        <strong>Password:</strong> *** (hidden)
      </p>
    </div>
  );
};

export default UserProfile;
