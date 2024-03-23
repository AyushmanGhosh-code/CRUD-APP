import { useEffect, useState } from "react"
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { NavLink} from "react-router-dom";
import toast from "react-hot-toast";

export default function Home()
{
 const[users,setUsers] = useState([]);
 const[searchParams,setSearchParams] = useState('');
 const url = `http://localhost:4000/api/v1`;

 async function getUser()
 {
  try{
      const response = await fetch(`${url}/getUser`,{
        method:'GET',
        headers:{
          'Content-type':'Application/json'
        }
      })

      const result = await response.json();

      console.log(result);
      setUsers(result.data);
  }catch(error){
    console.error(error);
  }
 }

  useEffect(() => {
    getUser();
  },[]);

  async function deleteUser(id)
  {
    try{
        const response = await fetch(`${url}/deleteUser/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'Application/json'
            }
        })

        console.log(response);
        toast.success('Deleted successfully')

    }catch(error){
            console.log(error);
    }
  }

  async function handleDelete(id){
   try{
    await deleteUser(id);
    const filteredUser = users.filter((user) => user._id !== id);
    setUsers(filteredUser);
   }catch(error){
        console.log(error);
   }

  }
    return(
        <div className="w-full">
        <div className="max-w-[1080px] mx-auto w-11/12 py-11">
        <div className="mb-5">
          <h1 className="text-white text-3xl font-bold text-center">CRUD App</h1>
            <div className="flex justify-between items-center">
                  <NavLink to='/create'>
                <button className="bg-yellow-500 text-black py-2 px-4 rounded-md mt-5">Create</button>
                </NavLink>
                <div>
                <input type="screen" placeholder="Search" className="py-1 px-4 w-[400px] mt-5 rounded-md" onChange={(e) => setSearchParams(e.target.value)}></input>
                </div>
            </div>
        </div>

        <div className="border mb-8 mt-3"></div>
        <table class="table-auto" className="w-full">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-4 px-5 text-lg">First Name</th>
                  <th className="py-4 px-5 text-lg">Last Name</th>
                  <th className="py-4 px-5 text-lg">Email</th>
                  <th className="py-4 px-5 text-lg">Salary</th>
                  <th className="py-4 px-5 text-lg">Actions</th>
                  </tr>
              </thead>

              <tbody>
              {
              users.filter((val) =>{
                if(searchParams === "")
                {
                  return val;
                }

                else if(val.firstName.includes(searchParams))
                {
                  return val;
                }
              }).map((user) => (
                <tr className="text-white">
                  <th className="mt-4 text-lg">{user.firstName}</th>
                  <th className="mt-4 text-lg">{user.lastName}</th>
                  <th className="mt-4 text-lg">{user.email}</th>
                  <th className="mt-4 text-lg">{user.salary}</th>
                  <th className="flex gap-x-3 ml-12 mt-2">
                  
                    <NavLink to={`/update/${user._id}`}>
                      <button className="bg-yellow-500 text-black py-2 px-4 rounded-md font-normal flex justify-center items-center gap-x-2">
                        <span><MdEditNote/></span>
                        <span>Edit</span>
                      </button>
                    </NavLink>

                   <button className="bg-red-500 font-normal rounded-md py-2 px-4 flex justify-center items-center gap-x-2" onClick={() => handleDelete(user._id)}>
                    <span><MdDelete/></span>
                    <span>Delete</span>
                    </button>
                  </th>
                </tr>
              ))
            }
              </tbody>
        </table>

          

      </div>
     </div>
    )
}