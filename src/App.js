import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]); // Список пользователей
  const [isLoading, setLoading] = useState(true); // Состояние загрузки скелета 
  const [searchValue, setSearchValue] = useState(''); // Состояние поиска пользователй
  const [invites, setInvites] = useState([]); // Массив добавленных пользователей
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Запрос к базе данных
    fetch("https://reqres.in/api/users")
      .then(res => res.json())
      .then(json => {
        setUsers(json.data) // fetch - запрос | json - полученные данные 
      }).catch(err => {
        console.log(err);
        alert("Ошибка при получении пользователей")
      }).finally(() => setLoading(false)); // отключение скелетона при получении данных с сервера
  }, [])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  };

  // Добавление пользователя в приглашения
  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  };

  const onClickSendInvates = () => {
    setSuccess(true)
  };

  return (
    <div className="App">
      {
        success ? (
          <Success
            count={invites.length}
          />
        ) : (
          <Users
            items={users}
            isLoading={isLoading}
            searchValue={searchValue}
            onChangeSearchValue={onChangeSearchValue}

            invites={invites}
            onClickInvite={onClickInvite}

            onClickSendInvates={onClickSendInvates}
          />
        )
      }

    </div>
  );
}

export default App;
