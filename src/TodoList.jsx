import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';
import ok from './images/ok.webp'

const TodoList = () => {

    //State block
    const [saldoinicial, setSaldoInicial] = useState(''); //Estado del saldo inicial (almacenar) (modificar)
    const [saldoGuardado, setSaldoGuardado] = useState(0); //Almacena el saldo inicial para modificar su estado
    const [active, setActive] = useState(false); //Inactivar o activar el campo saldo inicial

    const [arrayTodo, setArrayTodo] = useState([]);//Más importante, almacena los movimientos

    const [controllerForm, setControllerForm] = useState({ id: '', titulo: '', valor: '', estado: 'Ingreso' });//Controlar los eventos del formulario.

    const [arrayEdit, setArrayEdit] = useState(null);
    //console.log(arrayEdit);

    const desc = ['Juego', 'Diversión', 'Comida', 'Servicios', 'Deudas', 'Vicio']
    const aleatoriodesc = Math.floor(Math.random() * desc.length);

    //Handle block

    const handleSubmitList = (e) => {
        e.preventDefault();
        if (saldoGuardado !== 0) {
            //Editar movimientos
            if (controllerForm.estado === 'Gasto') {
                const lastMov = parseFloat(controllerForm.valor);
                if (lastMov > saldoGuardado) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El saldo inicial es menor al gasto',
                        confirmButtonText: 'Aceptar'
                    });
                    return; // No agregar el gasto si el saldo es insuficiente
                }
            } else
                if (arrayEdit !== null) {
                    const originalArrayEdit = [...arrayTodo] // almacena el array
                    const todo = originalArrayEdit.find(todo => todo.id === arrayEdit); //filtra 
                    todo.estado = controllerForm.estado;
                    todo.titulo = controllerForm.titulo;
                    todo.valor = controllerForm.valor;
                    setArrayTodo(originalArrayEdit);//capturamos el array modificado
                    setArrayEdit(null);
                    setControllerForm({ titulo: '', valor: '', estado: '' });
                } else {
                    if (controllerForm.titulo !== '' && controllerForm.valor > 0) {
                        //Agregar movimiento
                        const list = controllerForm;
                        list.id = uuidv4();
                        const lastState = controllerForm.estado //capturamos el último estado enviado
                        const lastMov = parseFloat(controllerForm.valor);
                        console.log(lastMov, lastState);
                        if (lastState === 'Gasto') {
                            const saldo = parseFloat(saldoGuardado);
                            const newSaldo = saldo - lastMov;
                            setSaldoGuardado(newSaldo);

                        } else {
                            const saldo = parseFloat(saldoGuardado);
                            const newSaldo = saldo + lastMov;
                            setSaldoGuardado(newSaldo);
                        }

                        //console.log(lastState);
                        Swal.fire({
                            icon: 'success',
                            title: 'Guardado',
                            text: 'Movimiento guardado con éxito. <3',
                            html: `
                        <div>
                        <img style="width: 50%; height: 50%;" src=${ok} alt="Ok" />
                        </div>
                        `,
                            confirmButtonText: 'Aceptar'
                        });
                        setArrayTodo([...arrayTodo, list]);
                        setControllerForm({ titulo: desc[aleatoriodesc], valor: Math.floor(Math.random() * 10000000), estado: lastState });
                        console.log(list)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: `Verifique los valores ingresados`,
                            confirmButtonText: 'Aceptar'
                        });
                    }
                }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Ingrese un valor inicial`,
                confirmButtonText: 'Aceptar'
            });
        }
    }

    const handleSubmitDelete = (id) => {
        const updateListTodo = arrayTodo.filter(todo => todo.id !== id);
        setArrayTodo(updateListTodo);
        //console.log(updateListTodo);
    }

    const handleSubmitEdit = (id) => {
        const todo = arrayTodo.find(todo => todo.id === id);
        setControllerForm({ titulo: todo.titulo, valor: todo.valor, estado: todo.estado });
        setArrayEdit(id);
        //const lastMov = parseFloat(todo.valor);
    }

    const handleChangeIngreso = ({ target }) => {
        setControllerForm({ ...controllerForm, [target.name]: target.value });
        //console.log(controllerForm);
        //console.log(target.value)
    }

    const handleSubmitSaldo = (e) => {
        e.preventDefault();
        if (saldoinicial > 0) {
            setSaldoGuardado(saldoinicial);
            Swal.fire({
                icon: 'success',
                title: 'Guardado',
                text: 'Movimiento guardado con éxito. <3',
                html: `
                <div>
                <img style="width: 50%; height: 50%;" src=${ok} alt="Ok" />
                </div>
                `,
                confirmButtonText: 'Aceptar'
            });
            setSaldoInicial('');
            setActive(true);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Verifique el saldo ingresado `,
                confirmButtonText: 'Aceptar'
            });
        }
    }
    const handleChangeSald = (e) => {
        setSaldoInicial(e.target.value);
    }

    const handleSubmitSerach = (e) => {
        e.preventDefault();
    }

    // const totalTodogasto = arrayTodo.filter(todo => todo.estado === false).length
    // const totalTodoIngreso = arrayTodo.filter(todo => todo.estado === true).length

    //console block
    //console.log(arrayTodo);
    // console.log(totalTodoIngreso);
    // console.log(totalTodogasto);
    return (
        <>
            <div className="container-fluid vh-100 p-3">
                <form className="p-3 form-control shadow rounded mb-4" onSubmit={handleSubmitSaldo}>
                    <div className="d-flex w-auto justify-content-start"> <h3>Ingrese su saldo inicial</h3> </div>
                    <hr />
                    <div className="container d-flex justify-content-between">
                        <div className="form-floating w-25">
                            <input className="form-control" id="floatingInputValue" type="number" placeholder="Saldo inicial" onChange={handleChangeSald} value={saldoinicial} disabled={active} />
                            <label htmlFor="floatingInput">Saldo inicial</label>
                        </div>
                        <div className="form-floating w-25">
                            <input className="form-control " disabled id="floatingInputValue2" placeholder="Saldo final" value={Math.trunc(saldoGuardado).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} />
                            <label htmlFor="floatingInput2">Saldo final</label>
                        </div>
                        <input className="btn btn-success w-25" type="submit" value="Submit" />
                    </div>
                </form>
                <hr />
                <div className="d-flex p-3">
                    <form className="container form-control w-50 h-auto shadow rounded" onSubmit={handleSubmitList} onChange={handleChangeIngreso}>
                        <br />
                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex w-auto justify-content-center"> <h4> Tipo Movimiento: </h4> </div>
                            <select className="form-control w-50" name="estado">
                                <option value="Ingreso">Ingreso</option>
                                <option value="Gasto"> Gasto</option>
                            </select>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex w-auto justify-content-center"> <h4> Nombre: </h4> </div>
                            <input className="form-control w-50" type="text" placeholder="Nombre" name="titulo" value={controllerForm.titulo} />
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex w-auto justify-content-center"> <h4> Cantidad: </h4> </div>
                            <input className="form-control w-50" type="number" placeholder="$ Cantidad" name="valor" value={controllerForm.valor} />
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between w-100">
                            <input className="btn btn-primary w-auto m-auto" type="submit" value="Guardar" />
                        </div>
                    </form>
                    <div className="ms-1 me-1"></div>
                    <form className="container form-control shadow rounded w-50">
                        <br />
                        <form className="container d-flex justify-content-around align-items-center">
                            <div className="d-flex w-50">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit" onClick={handleSubmitSerach}>Search</button>
                            </div>
                            <br />
                            <div className="d-flex justify-content-around w-50">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Todos
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        Ingresos
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                    <label className="form-check-label" for="flexRadioDefault3">
                                        Gastos
                                    </label>
                                </div>
                            </div>
                        </form>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <h3> Movimientos </h3>
                            <span className="d-flex bagde bg-primary rounded-pill align-items-center justify-content-center w-auto p-2 text-light">{arrayTodo.length}</span>
                        </div>
                        <hr />
                        {
                            arrayTodo.length === 0 ? (
                                <p className="d-flex w-auto text-center text-secondary fs-1">No hay movimientos disponibles</p>
                            ) :
                                arrayTodo.map((mov) => (
                                    <div key={mov.id} className="d-flex col-12 mb-2">
                                        <div className="d-flex col-4 justify-content-around">
                                            <input type="submit" className="btn btn-danger h-auto" value="Eliminar" onClick={() => handleSubmitDelete(mov.id)} />
                                            <input type="button" className="btn btn-warning h-auto" value="Editar" onClick={() => handleSubmitEdit(mov.id)} />
                                        </div>
                                        <div className="col-5"><h5> {mov.titulo} </h5></div>
                                        <div className="w-100">
                                            <span className={`d-flex bagde ${mov.estado === 'Gasto' ? 'bg-danger' : 'bg-success'} rounded-pill align-items-center justify-content-center w-auto p-2 text-light`}>
                                                {Math.trunc(mov.valor).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                                            </span>
                                        </div>
                                    </div>
                                ))
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default TodoList;