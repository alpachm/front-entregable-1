import React, { useState } from 'react';
import './styles/homePage.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setAdminName } from '../store/slices/adminName.slice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const [hasError, setHasError] = useState('none');

  const submit = (data) => {
    dispatch(setAdminName(data.name));

    if (!data.name) {
      setHasError('block');
    } else {
      navigate('/options');
    }

    reset();
  };

  return (
    <div className="home-page">
      <div className="container-homePage">
        <h1>ACADEMLO MOTORS</h1>

        <form onSubmit={handleSubmit(submit)}>
          <input
            {...register('name')}
            type="text"
            placeholder="Ingrese su nombre..."
          />
          <p style={{ display: hasError }}>Debes ingresar tu nombre</p>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
