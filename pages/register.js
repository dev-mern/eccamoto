import { handleFormSubmit, handleInput } from 'dev-reactils';
import { useRouter } from 'next/router';
import NavLink from "next/link";
import React, { useEffect, useState } from 'react';
import Layout from '../client/components/layout/Layout';
import useAuth from '../client/hooks/useAuth';
import { fetchPost } from '../client/utils/fetchers';

const registerPageMeta = {
    title: "Register",
    content: ""
}

const formElements = [
    {name:"name", type:"text", placeholder:"Your Name", required: true, message:"Name is required"},
    {name:"email", type:"email", placeholder:"example@email.com", required: true,message:"Email is required"},
    {name:"password", type:"password", placeholder:"Your Password", required: true, message:"Password is required"},
    {name:"confirm_password", type:"password", placeholder:"Re-type your Password", required: true,message:"Password need to be confirmed"},
]

const Register = () => {
    const {user, setUser, isUserLoading, setIsUserLoading,  userError, setuserError} = useAuth();
    const [errors,setErrors] = useState({});
    const router = useRouter();

    useEffect(()=>{
        if (user.user_id) {
            router.push("/")
        }
    },[isUserLoading])

    const formSubmissionHandle = async(e) =>{
        e.preventDefault();
        setErrors({});
        
        const {data,errors,isError} = handleFormSubmit(e,null,null,{isFile:false});
        if (isError) {
            return;
        }
        // .. check if passowrds are same 
        if (data.password === data.confirm_password) {
            setUser({});
            setIsUserLoading(true);
            setuserError("");
            // send the server
            const newUser = await fetchPost("/api/v1/auth/register",data);
            if (newUser.status) {
                setUser(newUser.data);
                setuserError("");
                router.push("/");
            }else{
                setErrors(newUser.errors)
            }
            setIsUserLoading(false);
        }else{
            document.getElementById("err_confirm_password").innerText = "Password didn't matched";
        }
        
    }
    
    return (
        <Layout pageMeta={registerPageMeta}>
            <div style={{border:"1px solid",maxWidth:"450px", margin:"10rem auto", padding:"2rem"}}>
                <h2>Register Page</h2>
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
                                        isUserLoading ? <p>Loading......</p> : <button type="submit">Sign Up</button>
                                    }
                                </div>
                            </form>
                    }
                    
                </div>
                <div>
                    <p>Already Have an account ? <NavLink href={"/login"} legacyBehavior><a style={{textDecoration:"underline", color:"blue"}}>login here</a></NavLink> </p>
                </div>
            </div>
        </Layout>
    );
};

export default Register;


