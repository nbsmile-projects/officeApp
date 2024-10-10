import './app-info.css';

const AppInfo = ({ increased, employees }) => {
    return (
        <div className="app-info">
            <h1>Учёт сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Получат премию: {increased}</h2>
        </div>
    )
}

export default AppInfo;