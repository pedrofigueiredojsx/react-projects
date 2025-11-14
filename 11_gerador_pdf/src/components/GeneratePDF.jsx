import React from 'react'
import TextStyleConfig from './TextStyleConfig'
import ImageUpload from './ImageUpload'

import { useState } from 'react'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import styled from 'styled-components'

pdfMake.vfs = pdfFonts.vfs

const GeneratePDF = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fontSize, setFontSize] = useState('12')
  const [fontColor, setFontColor] = useState('#000')
  const [isBold, setIsBold] = useState(false)

  const generatePdf = () => {
    const customStyle = {
      fontSize: parseInt(fontSize),
      color: fontColor,
      bold: isBold,
    }

    const documentDefinition = {
      content: [
        { text: `Título: ${title}`, style: 'customStyle' },
        { text: `Descrição: ${description}`, style: 'customStyle' },
      ],
      styles: {
        customStyle: customStyle,
      },
    }

    pdfMake.createPdf(documentDefinition).download()
  }

  return (
    <div className='container'>
      <label className='label'>
        Título:
        <input
          type='text'
          className='input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className='label'>
        Descrição:
        <input
          type='text'
          className='input'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <TextStyleConfig
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontColor={fontColor}
        setFontColor={setFontColor}
        isBold={isBold}
        setIsBold={setIsBold}
      />
      <ImageUpload />
      <button className='button' onClick={generatePdf}>
        Gerar PDF
      </button>
    </div>
  )
}

export default GeneratePDF
