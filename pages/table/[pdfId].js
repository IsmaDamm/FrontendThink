import React from 'react'
import InfoPdf from '@/components/InfoPdf'
import Layout from '@/components/layout'
import { useRouter } from 'next/router'

export default function pdfId() {
  const router = useRouter()
  const IdPdf = router.query.pdfId 
  console.log(IdPdf);
  return (
    <Layout>
    <div className='Centered'>
    <InfoPdf id={IdPdf}/>
    </div>
  </Layout>
  )
}
