import axios from '../../core/axios'
//обавление роутов, по кторым будут получаться данные; запросы на получение, добаавление и удаление данных
export default {
    get: () => axios.get('/appointments'),
    remove: id => axios.delete('/appointments/' + id),
    add: values => axios.post('/appointments', values)
};

