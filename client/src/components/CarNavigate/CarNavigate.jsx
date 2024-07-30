import React, { useEffect, useState } from 'react';
import styles from './CarNavigate.module.scss';
function CarNavigate({handleClickMark}) {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:3000/models')
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setCars(data);
            });
    }, []);
    return (
        <div className={styles.CarNavigate}>
            {loading
                ? 'Loading...'
                : cars.map(({ count, mark }) => (
                      <div onClick={() =>handleClickMark(mark)} key={mark} className={styles.item}>
                          <p className={styles.itemName}>{mark}</p>
                          <span className={styles.itemCount}>{count}</span>
                      </div>
                  ))}
        </div>
    );
}

export default CarNavigate;
