import { useState } from 'react'
import TaxForm from './comonents/TaxForm'
import TaxReport from './comonents/TaxReport'

import { Container, Typography } from '@mui/material'

function App() {
  const [taxData, setTaxData] = useState(null)

  return (
    <>
      <Container style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Typography
          variant='h3'
          align='center'
          style={{ marginBottom: '16px' }}
        >
          Calculadora de Impostos
        </Typography>
        <TaxForm />
        {taxData && <TaxReport />}
      </Container>
    </>
  )
}
export default App
