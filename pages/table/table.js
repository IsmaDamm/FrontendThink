import styles from '@/styles/Home.module.css'
import Layout from "../../components/layout";
import Tableinfo from '@/components/Tableinfo';

export default function Home() {
  return (
      <Layout>
        <div className='Bloque'>
        <Tableinfo />
        </div>
      </Layout>
  )
}
