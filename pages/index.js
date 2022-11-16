import NavLink from "next/link";
import Layout from '../client/components/layout/Layout';
import useAuth from '../client/hooks/useAuth'

export default function Home() {
  const {user} = useAuth()
  
  return (
    <Layout>
      <div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center",height: 'calc(100vh - 115px + 5%)', marginTop:"5%", textAlign:"center"}}>
          {
            user.user_id 
            ?   <div>
                    <h2 style={{margin:0}}>Hello</h2>
                    <h1 style={{margin:0, color:"blue", fontSize:"2.5rem"}}>{user.name}</h1>
                    <h3 style={{margin:0}}>Welcome to Eccamoto</h3>
                </div>
            :   <div>
                    <h3 style={{margin:0}}>Join WIth Us</h3>
                    <NavLink href={"/login"} legacyBehavior passHref={true}>
                    <a style={{fontWeight:700, fontSize:"3rem", backgroundColor:"#D5DBDB", padding:"4px 40px", marginTop:"3rem",display:"block",borderRadius:"8px" ,margin:"30px 0", color:"#229954"}}>Login</a>

                    </NavLink>
                    <h1>Earn by Doing Survey</h1>
                </div>
          }
          
        </div>
      </div>
    </Layout>
  )
}
