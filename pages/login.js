import { handleFormSubmit, handleInput } from 'dev-reactils';
import NavLink from "next/link";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LoaderDotCut from '../client/components/common/Loaders/LoaderDotCut/LoaderDotCut';
import Layout from '../client/components/layout/Layout';
import { loggedInByEmailPass } from '../client/fetcherServices/userServices';
import useAuth from '../client/hooks/useAuth';
import logRegST from "../styles/LoginRegister.module.css";


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
        console.log(user);
        if (user.status) {
            setUser(user.data);
            setuserError("");
            router.push("/");
        }else{
            if (user.message instanceof Object) {
                setErrors(user.message);
            }else{
                setErrors({common:user.message})
            }
        }
        setIsUserLoading(false);
    }

    return (
        <Layout pageMeta={loginPageMeta}>
            <div className={logRegST.loginReg_container}>
                <h2>Login Here</h2>
                <div>  
                    <form onSubmit={formSubmissionHandle}>
                        {
                            formElements.map(field => <div  className={logRegST.loginReg_field} key={field.name}>
                                <div style={{display:"flex", justifyContent:"space-between",}}>
                                    <label htmlFor="">{field.name}</label>
                                    <input onBlur={handleInput} type={field.type} name={field.name} message={field.message} data-isrequired={field.required} placeholder={field.placeholder}  />
                                </div>
                                <output className={logRegST.err_msg} id={`err_${field.name}`}>{errors? errors[field.name]:""}</output>
                            </div>)
                        }
                        <div>
                            <output  className={logRegST.err_msg} >{errors.common}</output>
                        </div>
                        <div>
                            {
                                isUserLoading ? <div style={{margin:"auto", width:"fit-content"}}><LoaderDotCut /></div> : <button  className={logRegST.form_btn} type="submit">Login</button>
                            }
                        </div>
                    </form>
                </div>
                <div>
                    <p>Don't Have an account ? <NavLink href={"/register"} legacyBehavior><a style={{textDecoration:"underline", color:"blue"}}>register here</a></NavLink> </p>
                </div>
            </div>
        </Layout>
    );
};

export default Login;