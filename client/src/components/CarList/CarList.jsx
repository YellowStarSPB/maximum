import { useEffect, useState } from 'react';
import styles from './CarList.module.scss';

function CarList({ queryConfig }) {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            `http://localhost:3000/cars?page=${queryConfig.page}&limit=${queryConfig.limit}&mark=${queryConfig.mark}&models=${queryConfig.models}`,
        )
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setCars(data);
            });
    }, [queryConfig]);

    return (
        <div className={styles.carList}>
            <div className={styles.carListHeader}>
                <span className={styles.id}>ID</span>
                <span className={styles.mark}>Марка/модель</span>
                <span className={styles.modification}>Модификация</span>
                <span className={styles.equipmentName}>Комплектация</span>
                <span className={styles.price}>Стоимость</span>
                <span className={styles.date}>Дата создания</span>
            </div>
            {loading ? (
                'Loading...'
            ) : (
                <ul className={styles.carListItems}>
                    {cars.map((item) => {
                        let { power, transmission, volume } = item.engine;
                        if (volume === 2) {
                            volume = volume + '.0';
                        }
                        const modification = `${volume} ${transmission.replace(
                            /[^A-Za-zА-Яа-яёЁ]/g,
                            '',
                        )} (${power}л.с.) ${item.drive}`;
                        const date = new Date(item.createdAt);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');

                        const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
                        return (
                            <li key={item._id} className={styles.carListItem}>
                                <span className={styles.itemId}>{item._id}</span>
                                <span className={styles.itemMark}>{`${item.mark} ${
                                    item.model ? item.model : ''
                                }`}</span>
                                <span className={styles.itemModification}>
                                    {modification}
                                </span>
                                <span className={styles.itemEquipmentName}>
                                    {item.equipmentName}
                                </span>
                                <span className={styles.itemPrice}>
                                    {item.price.toLocaleString('ru-RU')} ₽
                                </span>
                                <span className={styles.itemDate}>{formattedDate}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default CarList;
