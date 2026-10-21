import { toast } from "react-toastify";
import { saveToken, getAccessToken, getRefreshToken } from "../src/utils/auth";
import { useContext } from "react";
import { UserContext } from "../src/context/UserContext";
import { useNavigate } from "react-router-dom";



const LoginPage = () => {
    const { setUserName } = useContext(UserContext)
    const navigate = useNavigate()
    const handleSignIn = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const userSignInData = Object.fromEntries(formData.entries())
  

        const res = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/token/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(userSignInData),
        })

        if (!res.ok) {
            toast.error('পাসওয়ার্ড অথবা ইউজারনেম ভুল')
            return
        }


        const result = await res.json()
 

        saveToken(result)
        const accessToken = getAccessToken()

  
        const response = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/profile/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const profileData = await response.json()
   
   
        if (response.ok) {
            setUserName(profileData.username)
        }
   
        if (response.status === 401) {
    

            const refreshToken = getRefreshToken()
     
            const refreshResponse = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/token/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
            })

            if (!refreshResponse.ok) {
                toast.error('Session expired. Please log in again.')
                return
            }
            const refreshResult = await refreshResponse.json()

      
            const newAccessAndPreviousRefreshTokenToUpdate = { access: refreshResult.access, refresh: refreshToken }
            saveToken(newAccessAndPreviousRefreshTokenToUpdate)
            const updatedAccessToken = getAccessToken()


            const retryResponse = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/profile/`, {
                headers: {
                    Authorization: `Bearer ${updatedAccessToken}`
                }
            })
  
            const retryProfileData = await retryResponse.json()
       
            if (retryResponse.ok) {
                toast.success('সাইন ইন সফল হয়েছে')
                navigate('/')
            }
        }
        if (response.ok) {
            toast.success('সাইন ইন সফল হয়েছে')
            navigate('/')
        }


    }

    return (
        <div className="max-w-100 mx-auto px-2 my-5">
            <div>
                <h2 className="text-2xl font-bold text-center my-3">সাইন ইন করুন</h2>
            </div>
            <div>
                <form onSubmit={handleSignIn}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">


                        <label className="label">ইউজারনেম</label>
                        <input name="username" type="text" className="input w-full" placeholder="abc_user" required />

                        <label className="label">পাসওয়ার্ড</label>
                        <input name="password" type="password" className="input w-full" placeholder="পাসওয়ার্ড" required />

                        <button type="submit" className="btn btn-neutral mt-4">সাইন ইন</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;