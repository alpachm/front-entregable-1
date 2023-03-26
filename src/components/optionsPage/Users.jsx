import axios from 'axios';
import './styles/users.css';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import defaultValues from '../../utils/defaultValues';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [hasErrorForm, setHasErrorForm] = useState(false);
  const [idUser, setIdUser] = useState();

  const getAllUsers = () => {
    const url = `http://localhost:3005/api/v1/users`;

    axios
      .get(url)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const deleteUser = () => {
    const url = `http://localhost:3005/api/v1/users/${idUser}`;

    axios.delete(url).then((res) => {
      getAllUsers(), console.log(res.data);
    });
  };

  const submitEdit = (e) => {
    e.preventDefault();

    const url = `http://localhost:3005/api/v1/users/${idUser}`;

    const data = {
      name: e.target.nameEdit.value,
      email: e.target.emailEdit.value,
    };

    if (!data.name || !data.email) {
      setHasErrorForm(true);
      return;
    }

    axios
      .patch(url, data)
      .then((res) => {
        getAllUsers(), console.log(res.data);
      })
      .catch((err) => console.log(err));

    setHasErrorForm(false);
    setIsEdit(false);
    reset(
      (data = {
        name: '',
        email: '',
      })
    );
  };

  const submitCreate = (data) => {
    const url = `http://localhost:3005/api/v1/users`;

    if (!data.name || !data.email || !data.password) {
      setHasErrorForm(true);
      return;
    }

    axios
      .post(url, data)
      .then((res) => {
        getAllUsers(), console.log(res.data);
      })
      .catch((err) => console.log(err));

    setIsCreate(false);
    setHasErrorForm(false);
    reset(defaultValues);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const back = () => {
    navigate('/options');
  };

  return (
    <div className="users-page">
      <header>
        <i onClick={back} className="bx bxs-left-arrow-alt"></i>
        <h2>Users</h2>
      </header>

      <div className="container-usersPage">
        <button onClick={() => setIsCreate(true)} className="btn-create">
          Create new user
        </button>
        <div className="users-box">
          {users?.users.map((user) => (
            <div
              onClick={() => setIdUser(user.id)}
              key={user.id}
              className="user-card"
            >
              <p id="userId">
                <span>ID:</span> {user.id}
              </p>
              <p>
                <span>Name:</span> {user.name}
              </p>
              <p>
                <span>Email:</span> {user.email}
              </p>
              <p>
                <span>Password:</span> {user.password}
              </p>

              <div className="buttons">
                <i onClick={() => setIsEdit(true)} className="bx bxs-edit"></i>
                <i
                  onClick={() => setIsDelete(true)}
                  className="bx bx-trash"
                ></i>
              </div>
            </div>
          ))}
        </div>

        <div className={`alertDeleteUser ${isDelete && 'show-alertDelete'}`}>
          <h3>Are you sure to disabled this user?</h3>

          <div className="buttons">
            <button
              onClick={() => {
                deleteUser(), setIsDelete(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setIsDelete(false)}>No, cancel</button>
          </div>
        </div>

        <div className={`form-create ${isCreate && 'show-formCreate'}`}>
          <h3>Create new user</h3>

          <form onSubmit={handleSubmit(submitCreate)}>
            <input
              {...register('name')}
              type="text"
              placeholder="Write your name"
            />
            <input
              {...register('email')}
              type="text"
              placeholder="Write your email"
            />
            <input
              {...register('password')}
              type="password"
              placeholder="Write your password"
            />
            <button onClick={() => submitCreate()}>Create</button>
            <p className={`${hasErrorForm && 'showTextError'}`}>
              You must must fill in all fields
            </p>
          </form>

          <i
            onClick={() => {
              setIsCreate(false), setHasErrorForm(false);
            }}
            className="bx bx-x"
          ></i>
        </div>

        <div className={`form-edit ${isEdit && 'show-formEdit'}`}>
          <h3>Edit user</h3>

          <form onSubmit={submitEdit}>
            <input id="nameEdit" type="text" placeholder="Write the name" />
            <input id="emailEdit" type="text" placeholder="Write email" />
            <button>Change</button>
            <p className={` ${hasErrorForm && 'showTextError'}`}>
              You must fill in one of the 2 fields
            </p>
          </form>

          <i
            onClick={() => {
              setIsEdit(false), setHasErrorForm(false);
            }}
            className="bx bx-x"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Users;
