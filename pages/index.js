
import Layout from '../client/components/layout/Layout';
import useAuth from '../client/hooks/useAuth'

export default function Home() {
  const {user} = useAuth()
  
  return (
    <Layout>
      <h1>Home Survey Management</h1>
      <p>{user.name}</p>
    </Layout>
  )
}
