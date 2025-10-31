import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CurrencyConverter.css'

const CurrencyConverter = () => {
  const [rates, setRates] = useState(null)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [amount, setAmount] = useState(1)
  const [convertedAmount, setConvertedAmount] = useState(null)

  // Buscar taxas de câmbio
  useEffect(() => {
    axios
      .get(
        'https://v6.exchangerate-api.com/v6/9abcef4da54b4cce0b604154/latest/USD'
      )
      .then((response) => {
        setRates(response.data.conversion_rates)
      })
      .catch((error) => {
        console.log('Ocorreu um erro: ', error)
      })
  }, [])

  // Calcular conversão quando houver mudanças
  useEffect(() => {
    if (rates) {
      const fromRate = rates[fromCurrency] || 0
      const toRate = rates[toCurrency] || 0
      const result = (amount / fromRate) * toRate
      setConvertedAmount(result.toFixed(2))
    }
  }, [amount, fromCurrency, toCurrency, rates])

  if (!rates) {
    return <h1>Carregando...</h1>
  }

  return (
    <div className='converter'>
      <h2>Conversor de Moedas</h2>

      <input
        type='number'
        placeholder='Digite o valor...'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <span>Selecione as moedas</span>

      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {rates &&
          Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
      </select>

      <span>para</span>

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {rates &&
          Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
      </select>

      {convertedAmount && (
        <>
          <h3>
            {convertedAmount} {toCurrency}
          </h3>
          <p>
            {amount} {fromCurrency} valem {convertedAmount} {toCurrency}
          </p>
        </>
      )}
    </div>
  )
}

export default CurrencyConverter
