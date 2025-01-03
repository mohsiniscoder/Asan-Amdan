import { createContext,useContext, useEffect, useState } from "react";
import axios from "axios";


const authContext=createContext();

const AuthProvider=({children})=>{
    const [userAuth,setUserAuth]=useState({
        user:{},
        token:null
    })


    useEffect(() => {
        const getData = async () => {
            try {
                const data =  localStorage.getItem('authToken');
                if (data) {
                    setUserAuth({
                        token: data
                    });
                }
            } catch (error) {
                console.log("error gettin data",error)
            }
        }
        getData();
    }, []);

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await axios.post("https://asan-amdan-py4u.vercel.app/api/v1/auth/checkuser", {},
                    {
                        headers: {
                            Authorization: userAuth?.token,
                        },
                    });
                    console.log("it is user data in authcontext",response.data.data);
                if (response.data.success) {
                    setUserAuth(
                        {
                            ...userAuth,
                            user: response.data.data,
                        }
                    )
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // localStorage.removeItem('lmsUserData');
                }
            }
        }

        if (userAuth?.token) {
            sendRequest();
        }
    }, [userAuth?.token]);

    return (
        <authContext.Provider value={{ userAuth, setUserAuth}}>
            {children}
        </authContext.Provider>
    );
}



const useAuth=()=>{
    return useContext(authContext);
}

export {useAuth,AuthProvider};
