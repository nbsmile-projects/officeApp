import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../emloyees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "John S.",
          salary: 8000,
          increase: true,
          rise: true,
          id: uuidv4(),
        },
        {
          name: "Micle J.",
          salary: 3000,
          increase: false,
          rise: false,
          id: uuidv4(),
        },
        {
          name: "Carl M.",
          salary: 600,
          increase: false,
          rise: false,
          id: uuidv4(),
        },
      ],
      term: '',
      filter: 'all'
    };
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((elem) => elem.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name: name,
      salary: salary,
      increase: false,
      rise: false,
      id: uuidv4(),
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item
      })
    }))
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({
      term
    });
  }

  filterEmp = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({
      filter
    })
  }

  onUpdateSalary = (id, newSalary) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, salary: newSalary }
        }
        return item
      })
    }))
  }


  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterEmp(this.searchEmp(data, term), filter);
    return (
      <div className="app" >
        <AppInfo
          employees={employees}
          increased={increased}
        />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          onUpdateSalary={this.onUpdateSalary}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
export default App;
