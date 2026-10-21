import { toast } from "react-toastify";

const SignUpPage = () => {
    const handleSignUp = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const userSignUpInfo = Object.fromEntries(formData.entries())
       
        const username = userSignUpInfo.username;

        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

        if (!usernameRegex.test(username)) {
            toast.error("Username কমপক্ষে ৩ অক্ষরের হতে হবে এবং শুধু English letter, number ও underscore (_) ব্যবহার করুন।");
            return;
        }
        if (userSignUpInfo.password !== userSignUpInfo.password2) {
            toast.error(`পাসওয়ার্ড মিলে নি। অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন`)
            return
        }
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/;
       

        if (!strongPasswordRegex.test(userSignUpInfo.password)) {
            toast.info("অনুগ্রহ করে শক্তিশালী পাসওয়ার্ড ব্যবহার করুন");
            return
        }

        const res = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/register/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userSignUpInfo)
        })



        if (res.ok){
            toast.success('সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!')
        }
        if (!res.ok){
            toast.error('অ্যাকাউন্ট তৈরি হয় নি!')
        }


    }
    return (
        <div className="max-w-100 mx-auto my-10 px-2">
            <div>
                <div className="text-center my-5">
                    <h2 className="text-black font-bold text-2xl">নতুন অ্যাকাউন্ট তৈরি করুন</h2>
                </div>
                <form onSubmit={handleSignUp}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  max-w-100 border p-4">


                        <label className="label">ইউজারনেম</label>
                        <input name="username" type="name" className="input w-full" placeholder="khan_mahmud" required />
                        <label className="label">ইমেইল</label>
                        <input name="email" type="email" className="input w-full" placeholder="jsuddin@gmail.com" required />

                        <label className="label">Password</label>
                        <input name="password" type="password" className="input w-full" placeholder="পাসওয়ার্ড" required />
                        <label className="label">Password</label>
                        <input name="password2" type="password" className="input w-full" placeholder="পাসওয়ার্ড" required />

                        <button type="submit" className="btn bg-green-700 text-white font-bold mt-4">সাইন আপ</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;