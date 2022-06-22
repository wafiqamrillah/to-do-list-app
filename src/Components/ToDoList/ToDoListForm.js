import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

class ToDoListForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputField : '',
            selectedIndexList : '',
            list : [],
        };

        this.insertList = this.insertList.bind(this);
        this.changeInputField = this.changeInputField.bind(this);
    }

    insertList(index = '') {
        try {
            let value = this.state.inputField;
            let list = this.state.list;
    
            if (value) {
                if (index || index === 0) {
                    let current_list = list.find((data, i) => i === index);
                    if (current_list) {
                        current_list.name = value;

                        list[index].name = value;
                    } else {
                        throw new Error("Cannot get data list.");
                    }
                } else {
                    list.push({
                        "name" : value,
                        "status" : "open",
                    });
                }
    
                this.setState({ inputField : '', selectedIndexList : '', list : list });
            } else {
                throw new Error("You have not entered text.");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    changeInputField(value) {
        this.setState({ inputField : value, selectedIndexList : this.state.selectedIndexList, list : this.state.list });
    }

    editList(index = null) {
        try {
            if (index || index === 0) {
                let list = this.state.list;
                let current_list = list.find((data, i) => i === index);
                if (current_list) {
                    let value = current_list.name;

                    this.setState({ inputField : value, selectedIndexList : index, list : list });
                } else {
                    throw new Error("Cannot get data list.");
                }
            } else {
                throw new Error("Cannot get data list.");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    changeStatus(toStatus, index = null) {
        try {
            if (index || index === 0) {
                let list = this.state.list;
                let current_list = list.find((data, i) => i === index);
                if (current_list) {
                    current_list.status = toStatus;
                    list[index] = current_list;

                    this.setState({ inputField : this.state.inputField, selectedIndexList : '', list : list });
                } else {
                    throw new Error("Cannot get data list.");
                }
            } else {
                throw new Error("Cannot get data list.");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    deleteList(index = null) {
        try {
            if (index || index === 0) {
                let list = this.state.list;
                let current_list = list.find((data, i) => i === index);
                if (current_list) {
                    list.splice(index, 1);

                    this.setState({ inputField : this.state.inputField, selectedIndexList : '', list : list });
                } else {
                    throw new Error("Cannot get data list.");
                }
            } else {
                throw new Error("Cannot get data list.");
            }
        } catch (error) {
            alert(error.message);
        }
    }

    renderList() {
        if(this.state.list.length > 0){
            return this.state.list.map((list, index) => {
                let status = '';
                switch (list.status) {
                    case 'failed':
                        status = (
                            <span className="font-bold uppercase inline-flex items-center justify-center px-2 py-1 text-font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                { list.status }
                            </span>
                        );
                        break;
                    case 'progress':
                        status = (
                            <span className="font-bold uppercase inline-flex items-center justify-center px-2 py-1 text-font-bold leading-none text-yellow-100 bg-yellow-600 rounded-full">
                                { list.status }
                            </span>
                        );
                        break;
                    case 'complete':
                        status = (
                            <span className="font-bold uppercase inline-flex items-center justify-center px-2 py-1 text-font-bold leading-none text-green-100 bg-green-600 rounded-full">
                                { list.status }
                            </span>
                        );
                        break;
                    case 'open':
                    default:
                        status = (
                            <span className="font-bold uppercase inline-flex items-center justify-center px-2 py-1 text-font-bold leading-none text-gray-100 bg-gray-600 rounded-full">
                                { list.status }
                            </span>
                        );
                        break;
                }

                let buttons = '';
                switch (list.status) {
                    case 'complete':
                        buttons = (
                            <>
                                <button onClick={ () => { this.changeStatus('open', index) } } className="text-gray-600">
                                    <FontAwesomeIcon icon="check" />
                                </button>
                            </>
                        );
                        break;
                    case 'open':
                    default:
                        buttons = (
                            <>
                                <button onClick={ () => { this.changeStatus('complete', index) } } className="text-green-600">
                                    <FontAwesomeIcon icon="check" />
                                </button>
                                <button onClick={ () => { this.editList(index) } } className="text-yellow-600">
                                    <FontAwesomeIcon icon="edit" />
                                </button>
                                <button onClick={ () => { this.deleteList(index) } } className="text-red-600">
                                    <FontAwesomeIcon icon="trash" />
                                </button>
                            </>
                        );
                        break;
                }
                return (
                    <tr key={ index }>
                        <td className="text-left text-sm">
                            { list.name }
                        </td>
                        <td className="text-sm">
                            { status }
                        </td>
                        <td className="text-sm">
                            <div className="flex items-center justify-center space-x-2">
                                { buttons }
                            </div>
                        </td>
                    </tr>
                );
            });
        } else {
            return (
                <tr>
                    <td colSpan={ 3 } className="text-center text-sm">
                        There is no data. Please insert new to do list.
                    </td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div className="w-full max-w-4xl border border-gray-400 shadow">
                <div className="bg-gradient-to-b from-gray-100 to-gray-400">
                    <div className="p-2 text-sm font-bold">
                        Form
                    </div>
                </div>
                <div className="py-6 px-6 md:px-4 md:py-4 bg-gray-200">
                    <div className="flex flex-col space-y-3">
                        <div>
                            <form className="flex flex-col space-y-1">
                                <label className="text-left font-bold text-sm">Input Text :</label>
                                <div className="relative grow">
                                    <input onChange={ (e) => this.changeInputField(e.target.value) } value={ this.state.inputField } className="w-full px-3 py-2 bg-gray-100 focus:bg-white disabled:bg-gray-200 readonly:bg-gray-200 border border-gray-400 focus:border-black disabled:border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-black focus:ring-opacity-25 transition ease-in-out duration-150 disabled:cursor-not-allowed"/>
                                    <div className="absolute inset-y-0 right-0">
                                        <button onClick={ () => this.insertList(this.state.selectedIndexList) } type="button" className="w-32 px-3 py-2 border border-black bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-50 hover:to-gray-300 active:from-gray-400 active:to-gray-200 focus:from-gray-400 focus:to-gray-200 focus:outline-none focus:shadow-outline-gray-500 transition ease-in-out duration-150 rounded-r-md tracking-normal focus:shadow-inner disabled:opacity-25">
                                            <FontAwesomeIcon icon="pencil-alt" /> Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <hr className="border border-gray-400"/>
                        <div className="flex flex-col space-y-1">
                            <label className="text-left font-bold text-sm">List</label>
                            <div className="relative bg-white border border-gray-400 overflow-auto rounded-md">
                                <table className="table border-seperate w-full text-sm border-spacing-0">
                                    <thead>
                                        <tr>
                                            <th>To Do</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.renderList() }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ToDoListForm;