import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { SignInButton } from '../components'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      4H20 is awesome!
      Check out the <Link href='/profile'>profile</Link> page!
    </div>
  )
}
export default Home
