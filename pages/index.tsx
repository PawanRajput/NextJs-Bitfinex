import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Book from '../components/book'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Book />
    </div>
  )
}

export default Home
