import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({ data, onDelete, onToggleProp, onUpdateSalary }) => {

    const elem = data.map(item => {
        const { id, ...itemProps } = item
        return (
            <EmployeesListItem
                key={id}
                {...itemProps}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                onUpdateSalary={(e) => onUpdateSalary(id, e.currentTarget.value.slice(0, -1))} />
        )
    })

    return (
        <ul className="app-list list-group">
            {elem}
        </ul>
    )
}

export default EmployeesList;