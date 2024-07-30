import { useEffect, useState } from 'react';
import styles from './ModelList.module.scss';
function ModelList({ queryConfig, handleChangeModel }) {
    const [carModels, setCarModels] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/carModels?mark=${queryConfig.mark}`)
            .then((res) => res.json())
            .then((data) => {
                setCarModels(data);
            });
    }, [queryConfig.mark]);

    const handleActiveModel = (model) => {
        if (selectedItems.includes(model)) return;
        setSelectedItems((prev) => [...prev, model]);
        handleChangeModel(model);
    };

    const deleteSelectedModel = (model) => {
        setSelectedItems((prev) => prev.filter((item) => item !== model));
        handleChangeModel(model, true);
    };

    useEffect(() => {
        if(queryConfig.models.length === 0){
            setSelectedItems([])
        }
    },[queryConfig.models])
    return (
        <div className={styles.modelsList}>
            Модели:
            <div className={styles.selectedItems}>
                {selectedItems.map((model) => (
                    <div key={model} className={styles.selectedItem}>
                        {model}
                        <button
                            onClick={() => deleteSelectedModel(model)}
                            className={styles.deleteItem}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.models}>
                {carModels.map((model) => (
                    <label
                        key={model}
                        onChange={() => handleActiveModel(model)}
                        className={`${styles.model} ${
                            selectedItems.includes(model) ? styles.activeModel : ''
                        }`}
                    >
                        {model}
                        <input type="checkbox" name={model} />
                    </label>
                ))}
            </div>
        </div>
    );
}

export default ModelList;
