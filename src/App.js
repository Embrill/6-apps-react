import React, { useEffect, useState } from 'react';
import Collection from './components/Collection';
import './index.scss';

const categories = [{ name: 'Все' }, { name: 'Море' }, { name: 'Горы' }, { name: 'Архитектура' }, { name: 'Города' }];

function App() {
  // Категории фото
  const [categoryId, setCategoryId] = useState(0);
  // Пагинация
  const [page, setPage] = useState(1);
  // Состояние загрузки категорий
  const [isLoading, setIsLoading] = useState(true);
  // Контролируемый input
  const [searchValue, setSearchValue] = useState('');
  // Запрос к БД
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    setIsLoading(true); // !!!

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://633e73820dbc3309f3b5d032.mockapi.io/gallery_paginations?page=${page}&limit=3&${category}`) // Повторный запрос к БД для обновления коллекции
      .then((res) => res.json())
      .then((json) => {
        setGallery(json);
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка при получении галереи');
      })
      .finally(() => setIsLoading(false)); // !!!
  }, [categoryId, page]);

  console.log(gallery);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((elem, index) => (
            <li onClick={() => setCategoryId(index)} className={categoryId === index ? 'active' : ''} key={index}>
              {elem.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>

      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          gallery
            .filter((elem) => elem.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((elem, index) => <Collection key={index} name={elem.name} images={elem.photos} />)
        )}
      </div>

      {/* Пагинация */}
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li onClick={() => setPage(index + 1)} className={page === index + 1 ? 'active' : ''}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
