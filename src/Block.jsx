import React from 'react';

const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

// value - вводимое значение
// currency - валюта
// onChangeValue - возврат значения при вводе в инпуте
// onChangeCurrency - возврат выбранной функции

export const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => (
  <div className="block">
    <ul className="currencies">
      {/* Вывод каждой валюты мапом */}
      {defaultCurrencies.map((curs) => (
        <li
          onClick={() => onChangeCurrency(curs)}
          className={currency === curs ? 'active' : ''}
          key={curs}>
          {curs}
        </li>
      ))}
      <li>
        <svg height="50px" viewBox="0 0 50 50" width="50px">
          <rect fill="none" height="50" width="50" />
          <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
        </svg>
      </li>
    </ul>
    <input
      onChange={(e) => onChangeValue(e.target.value)}
      value={value}
      type="number"
      placeholder={0}
    />
  </div>
);
