import { handleFormSubmit, handleInput } from 'dev-reactils';
import NavLink from "next/link";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../client/components/layout/Layout';
import { loggedInByEmailPass } from '../client/fetcherServices/userServices';
import useAuth from '../client/hooks/useAuth';


const loginPageMeta = {
    title: "Login",
    content: ""
}

const formElements = [
    {name:"email", type:"email", placeholder:"example@email.com", required: true,message:"Email is required"},
    {name:"password", type:"password", placeholder:"Your Password", required: true, message:"Password is required"},
]


const Login = () => {
    const {user, setUser, isUserLoading, setIsUserLoading,  userError, setuserError} = useAuth();
    const [errors,setErrors] = useState({});
    const router = useRouter();
    // if already loggedin, return to home page
    useEffect(()=>{
        if (user.user_id) {
            router.push("/");
        }
    },[isUserLoading])
    const formSubmissionHandle = async(e) =>{
        e.preventDefault();
        setErrors({});
        
        const {data,errors,isError} = handleFormSubmit(e,null,null,{isFile:false});
        if (isError) {
            return;
        }
        
        setUser({});
        setIsUserLoading(true);
        setuserError("");
        // send the server
        const user = await loggedInByEmailPass(data);
        if (user.status) {
            setUser(user.data);
            setuserError("");
            router.push("/");
        }else{
            setErrors(user.message);
        }
        setIsUserLoading(false);
        
    }

    return (
        <Layout pageMeta={loginPageMeta}>
            <div style={{border:"1px solid",maxWidth:"450px", margin:"10rem auto", padding:"2rem"}}>
                <h2>Login Page</h2>
                <div>
                    {
                        isUserLoading && !user.user_id
                        ? <p>Loading.............</p>
                        :   <form onSubmit={formSubmissionHandle}>
                                {
                                    formElements.map(field => <div style={{margin:"10px auto"}} key={field.name}>
                                        <div style={{display:"flex", justifyContent:"space-between",}}>
                                            <label htmlFor="">{field.name}</label>
                                            <input onBlur={handleInput} type={field.type} name={field.name} message={field.message} data-isrequired={field.required} placeholder={field.placeholder}  />
                                        </div>
                                        <output style={{display:"block", textAlign:"end", color:"red", fontSize:"14px", minHeight:"16px"}} id={`err_${field.name}`}>{errors? errors[field.name]:""}</output>
                                    </div>)
                                }
                                <div>
                                    {
                                        isUserLoading ? <p>Loading......</p> : <button type="submit">Login</button>
                                    }
                                </div>
                            </form>
                    }
                    
                </div>
                <div>
                    <p>Don't Have an account ? <NavLink href={"/register"} legacyBehavior><a style={{textDecoration:"underline", color:"blue"}}>register here</a></NavLink> </p>
                </div>
            </div>
        </Layout>
    );
};

export default Login;