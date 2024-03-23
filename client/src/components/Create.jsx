import { useState } from "react";
import { useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export default function Create()
{
    const url = `http://localhost:4000/api/v1`;
    const navigate = useNavigate();
    const[formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        salary:"",
        email:""
    })

    function handleChange(e)
    {
        const{name,value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name] : value
        }))
    }

    async function createUser(){
        try{
            const response = await fetch(`${url}/createUser`,{
                method:'POST',
                headers:{
                    'Content-type':'Application/json'
                },
                body:JSON.stringify(formData)
            });

            const data = await response.json();

            console.log(response);

            if(data.success)
            {
                toast.success('User created successfully');
                navigate('/')
            }

            else{
                toast.error('Please fill all the details');
            }

        }catch(error){
                console.log(error);
        }
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        createUser();
    }
    return(
        <div className="w-full">
            <div className="max-w-[1080px] w-11/12 mx-auto pt-16">
                <form className="w-[700px] mx-auto" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col gap-y-5">
                        <div className="flex gap-x-2 w-full">
                            <div className="flex flex-col gap-y-2 w-full">
                                <label htmlFor="firstName" className="text-white font-bold text-xl">First Name</label>
                                <input type='text' name='firstName' placeholder="Enter your first name" className="py-2 px-4 rounded-md" value={formData.firstName} onChange={handleChange}></input>
                            </div>

                            <div className="flex flex-col gap-y-2 w-full">
                                <label htmlFor="lastName" className="text-white font-bold text-xl">Last Name</label>
                                <input type='text' name='lastName' placeholder="Enter your last name" className="py-2 px-4 rounded-md" value={formData.lastName} onChange={handleChange}></input>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="email" className="text-white font-bold text-xl">Email</label>
                            <input type='email' name="email" placeholder="Enter your email" className="py-2 px-4 rounded-md" value={formData.email} onChange={handleChange}></input>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="salary" className="text-white font-bold text-xl">Salary</label>
                            <input type='text' name="salary" placeholder="Enter your salary" className="py-2 px-4 rounded-md" value={formData.salary} onChange={handleChange}></input>
                        </div>
                    </div>

                    <div className="w-full mt-7">
                        <button className="bg-yellow-500 py-2 px-6 rounded-md w-full text-lg">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}