import { useState } from 'react';
import CarList from './components/CarList/CarList';
import CarNavigate from './components/CarNavigate/CarNavigate';
import Pagination from './components/Pagination/Pagination';
import ModelList from './components/ModelList/ModelList';

function App() {
    const [queryConfig, setQueryConfig] = useState({
        page: 1,
        limit: 20,
        mark: '',
        models: [],
    });

    const handleClickMark = (mark) => {
        if (mark === queryConfig.mark) return;
        setQueryConfig((prev) => {
            if (prev.page !== 1) {
                prev.page = 1;
            }
            if(prev.models.length !== 0){
                prev.models = []
            }
            return { ...prev, mark: mark };
        });
    };

    const handlePageChange = (page) => {
        setQueryConfig((prev) => ({ ...prev, page }));
    };

    const handleChangeModel = (model, isDelete) => {
        if (isDelete) {
            setQueryConfig((prev) => ({
                ...prev,
                models: prev.models.filter((item) => item !== model),
            }));
            return;
        }
        setQueryConfig((prev) => ({ ...prev, models: [...prev.models, model] }));
    };

    return (
        <div className="dashboard">
            <CarNavigate handleClickMark={handleClickMark} />
            <ModelList queryConfig={queryConfig} handleChangeModel={handleChangeModel} />
            <CarList queryConfig={queryConfig} />
            <Pagination queryConfig={queryConfig} onPageChange={handlePageChange} />
        </div>
    );
}

export default App;
