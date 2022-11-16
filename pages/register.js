import { handleFormSubmit, handleInput } from 'dev-reactils';
import { useRouter } from 'next/router';
import NavLink from "next/link";
import React, { useEffect, useState } from 'react';
import Layout from '../client/components/layout/Layout';
import useAuth from '../client/hooks/useAuth';
import { fetchPost } from '../client/utils/fetchers';
import logRegST from "../styles/LoginRegister.module.css";
import LoaderDotCut from '../client/components/common/Loaders/LoaderDotCut/LoaderDotCut';

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
    const {user, setUser, isUserLoading,  userError, setuserError} = useAuth();
    const [errors,setErrors] = useState({});
    const [isRegLoad,setIsRegLoad] = useState(false);
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
            setIsRegLoad(true);
            setuserError("");
            // send the server
            const newUser = await fetchPost("/api/v1/auth/register",data);
            console.log(newUser);
            
            if (newUser.status) {
                setUser(newUser.data);
                setuserError("");
                router.push("/");
            }else{
                console.log(newUser);
                setErrors(newUser.errors)
            }
            
            setIsRegLoad(false);
        }else{
            document.getElementById("err_confirm_password").innerText = "Password didn't matched";
        }
        
    }
    
    return (
        <Layout pageMeta={registerPageMeta}>
            <div className={logRegST.loginReg_container}>
                <h2>Register Here</h2>
                <div>
                    <form onSubmit={formSubmissionHandle}>
                        {
                            formElements.map(field => <div className={logRegST.loginReg_field} key={field.name}>
                                <div style={{display:"flex", justifyContent:"space-between",}}>
                                    <label htmlFor="">{field.name} :</label>
                                    <input onBlur={handleInput} type={field.type} name={field.name} message={field.message} data-isrequired={field.required} placeholder={field.placeholder}  />
                                </div>
                                <output className={logRegST.err_msg} id={`err_${field.name}`}>{errors? errors[field.name]:""}</output>
                            </div>)
                        }
                        <div>
                            {
                                errors.message && <p className={logRegST.err_msg}>{errors.message}</p>
                            }
                        </div>
                        <div>
                            {
                                isRegLoad ? <div style={{margin:"auto", width:"fit-content"}}><LoaderDotCut /></div> : <button className={logRegST.form_btn} type="submit">Sign Up</button>
                            }
                        </div>
                    </form>
                </div>
                <div>
                    <p>Already Have an account ? <NavLink href={"/login"} legacyBehavior><a style={{textDecoration:"underline", color:"blue"}}>login here</a></NavLink> </p>
                </div>
            </div>
        </Layout>
    );
};

export default Register;


