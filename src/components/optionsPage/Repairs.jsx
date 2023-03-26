import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Repairs = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(true);
  const [repairs, setRepairs] = useState();
  const [idRepair, setIdRepair] = useState();

  const getAllRepairs = () => {
    const url = `http://localhost:3005/api/v1/repairs`;

    axios
      .get(url)
      .then((res) => {
        setRepairs(res.data), console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const editUser = (e) => {
    e.preventDefault();

    const url = `http://localhost:3005/api/v1/repairs/${idRepair}`;

    const data = {
      status: e.target.statusRepair.value,
    };

    axios
      .patch(url, data)
      .then((res) => {
        getAllRepairs(), console.log(res.data);
      })
      .catch((err) => console.log(err));

    setIsEdit(false);
    e.target.statusRepair.value = '';
  };

  const createRepair = (data) => {
    const url = `http://localhost:3005/api/v1/repairs`;

    axios
      .post(url, data)
      .then((res) => {
        getAllRepairs(), console.log(res.data);
      })
      .catch((err) => console.log(err));

    setIsCreate(false);
    reset(
      (data = {
        date: '',
        userId: '',
      })
    );
  };

  const deleteRepair = () => {
    const url = `http://localhost:3005/api/v1/repairs/${idRepair}`;

    axios
      .delete(url)
      .then((res) => {
        getAllRepairs(), console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllRepairs();
  }, []);

  const back = () => {
    navigate('/options');
  };

  return (
    <div className="users-page">
      <header>
        <i onClick={back} className="bx bxs-left-arrow-alt"></i>
        <h2>Repairs</h2>
      </header>

      <div className="container-usersPage">
        <button onClick={() => setIsCreate(true)} className="btn-create">
          Create new repair
        </button>

        <div className="users-box">
          {repairs?.repairs.map((repair) => (
            <div
              key={repair.id}
              onClick={() => setIdRepair(repair.id)}
              className="user-card"
            >
              <p>
                <span>ID:</span> {repair.id}
              </p>
              <p>
                <span>Date:</span> {repair.date.split('T')[0]}
              </p>
              <p>
                <span>Status:</span> {repair.status}
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

        <div className={`form-edit ${isEdit && 'show-formEdit'}`}>
          <h3>Edit repair</h3>

          <form onSubmit={editUser}>
            <input
              id="statusRepair"
              name="status"
              type="text"
              placeholder="Change status"
            />
            <button>Change</button>
          </form>

          <i
            onClick={() => {
              setIsEdit(false);
            }}
            className="bx bx-x"
          ></i>
        </div>

        <div className={`form-create ${isCreate && 'show-formCreate'}`}>
          <h3>Create new repair</h3>

          <form onSubmit={handleSubmit(createRepair)}>
            <input {...register('date')} type="date" />
            <input
              {...register('userId')}
              type="number"
              placeholder="Write ID User"
            />
            <button>Create new repair</button>
          </form>

          <i
            onClick={() => {
              setIsCreate(false), setHasErrorForm(false);
            }}
            className="bx bx-x"
          ></i>
        </div>

        <div className={`alertDeleteUser ${isDelete && 'show-alertDelete'}`}>
          <h3>Are you sure to cancelled this repair</h3>

          <div className="buttons">
            <button
              onClick={() => {
                deleteRepair(), setIsDelete(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => setIsDelete(false)}>No, cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repairs;
