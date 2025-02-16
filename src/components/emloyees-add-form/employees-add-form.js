import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: '',
            error: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.name !== '' && this.state.salary !== '') {
            this.props.onAdd(this.state.name, this.state.salary)
            this.setState({
                name: '',
                salary: '',
                error: ''
            })
        }
        else {
            this.setState({
                error: 'Пожалуйста заполните все поля!'
            })
            setTimeout(() => {
                this.setState({
                    error: ''
                })
            }, 2500)
        }
    }

    render() {
        const { name, salary, error } = this.state;

        return (
            <div className="app-add-form" >
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"
                        value={name}
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange} />

                    <button type="submit"
                        className="btn btn-outline-light">Добавить</button>
                </form>
                <h6 className='add-error'>{error}</h6>
            </div >
        )
    }
}

export default EmployeesAddForm;