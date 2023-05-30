'use client'

import Docxtemplater from 'docxtemplater'
import React, { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
// import { getcurriculum } from '../api/get-content-from-cv/route'

import * as pdfjs from 'pdfjs-dist'
// import Mammoth from 'mammoth'

const baseStyle = {
  flex: 1,
  display: 'flex',
  // flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const focusedStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

export function FileUpload () {
  const [content, setContent] = useState<string>('')

  const handleFileUpload = async (files: File[]): Promise<void> => {
    const file = files[0]
    const { name } = file

    if (name.endsWith('.pdf')) {
      const pdfData = await file.arrayBuffer()
      const pdf = await pdfjs.getDocument(new Uint8Array(pdfData)).promise
      const page = await pdf.getPage(1)
      const textContent = await page.getTextContent()
      // const extractedContent = textContent.items.map((item) => item.str).join(' ')
      console.log(textContent)
      // setContent(extractedContent)
    }

    // if (name.endsWith('.docx')) {
    //   const reader = new FileReader()
    //   reader.onload = function (e: ProgressEvent<FileReader>) {
    //     const content = e.target?.result
    //     console.log('Content:', content)
    //     void Mammoth.extractRawText({ arrayBuffer: content }).then((result) => {
    //       const extractedContent = result.value
    //       console.log('Extracted Content:', extractedContent)
    //       setContent(extractedContent)
    //     })
    //   }
    //   reader.readAsArrayBuffer(file)
    // }

    if (name.endsWith('.doc')) {
      const reader = new FileReader()
      reader.onload = function (e: ProgressEvent<FileReader>) {
        const content = e.target?.result
        const doc = new Docxtemplater(content)
        doc.setData({})
        doc.render()
        const extractedContent = doc.getFullText()
        setContent(extractedContent)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  // useEffect(() => {
  //   if (content) {
  //     const res = await fetch('/api/check-description?id=', {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })

  //     const json = await res.json()
  //   }
  // }, [content])
  const {
    getRootProps, getInputProps, isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop: handleFileUpload })

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ])

  return (
    <section className='dropzone'>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <section>
        {content}

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Generar Carta de presentación</button>
      </section>
    </section>

  )
}
