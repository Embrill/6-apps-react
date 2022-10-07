import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  // Выбор валюты
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("RUB");

  // Вводимые данные в инпут
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  // Взятие данных с бэка
  // const [rates, setRates] = useState({});
  const ratesRef = useRef({});

  // Запрос к БД
  useEffect(() => {
    fetch("https://cdn.cur.su/api/latest.json")
      .then(res => res.json())
      .then(json => {
        // setRates(json.rates)
        ratesRef.current = json.rates;
        onChangeFromPrice(1) // Установка значения при получении БД
      }).catch(err => {
        console.log(err);
        alert("Ошибка при получении данных валют")
      })
  }, []);

  // Конвертация валюты
  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3))
    setFromPrice(value)
  };

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3))
    setToPrice(value)
  };

  // Динамическая конвертация валют
  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency]);


  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
