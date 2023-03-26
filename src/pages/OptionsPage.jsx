import React from 'react';
import './styles/optionsPage.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OptionsPage = () => {
  const navigate = useNavigate();
  const { adminName } = useSelector((state) => state);

  const handleClickUsers = () => {
    navigate('/users');
  };

  const handleClickRepairs = () => {
    navigate('/repairs');
  };

  return (
    <div className="options-page">
      <header>
        <h2>
          Hi <span>{adminName}</span> select the databa you want to see
        </h2>
      </header>
      <div className="container-optionsPage">
        <div>
          <div className="box">
            <h2 onClick={handleClickUsers}>Click here to watch users</h2>
          </div>
          <div className="box">
            <h2 onClick={handleClickRepairs}>Click here to watch repairs</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsPage;
