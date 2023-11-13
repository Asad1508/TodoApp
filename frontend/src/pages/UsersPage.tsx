import React, { useState } from "react";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import NavBar from "../components/NavBar";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import { Switch, message } from "antd";
import axios from "axios";
import { RiDeleteBin5Fill } from "react-icons/ri";


interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  role: string;
}

const UsersPage = () => {
  const [users, setUsers] = React.useState<UserModel[]>([]);
  const [enabled,setEnabled]=useState(true)
  const [active,setActive]=useState()
  const [search, setSearch] = useState('');

  const [switchStates, setSwitchStates] = useState(users.map(user => false));

  const handleSwitchChange =async (id:any) => {
    // Update local state immediately for a responsive UI
    const updatedSwitchStates = [...switchStates];
    updatedSwitchStates[id] = !updatedSwitchStates[id];
    setSwitchStates(updatedSwitchStates);    
    setEnabled(!enabled)
    // setUsers(users => users.map(user => {
    //   if (user.id === id) {
    //     setEnabled(!enabled)
    //     return { ...user };
    //   }
      // return user;
  
    try {
      const response = await axios.put(
        `http://localhost:3000/admin/${id}`,
        {enabled},  // PUT request usually doesn't have a request payload in the body, so you can send null or an empty object
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
  
      console.log('Response:', response);
      setActive(response.data.enabled)
    } catch (error) {
      console.error('Error:', error);
    }
  
  }
  const getAllUsers = async () => {
    const role = getLoginInfo()?.role;
    if (role != null && role == "ADMIN") {
      const response = await custom_axios.get(ApiConstants.USER.FIND_ALL, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      setUsers(response.data);
    } else {
      toast.info("Forbidden Resource");
    }
  };

  React.useEffect(() => {
    if (users.length == 0) getAllUsers();
  }, []);
  
  return (
    <div>
      <NavBar></NavBar>
      <h1 className="text-2xl text-black text-center p-4">Users({users.length})</h1>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col">
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search user'
              className="mb-5 text-center pt-3 pb-3 custom_search"
              
            />
          <div className="overflow-x-auto shadow-md sm:rounded-lg custom_bg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        First Name
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Last Name
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Email
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Action
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {users?.filter((item) => {
              return search.toLowerCase() === ''
                ? item
                : item.firstName.toLowerCase().includes(search);
            }).map((user) => {
                      return (
                        <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.firstName}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user.lastName}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.email}</td>
                          <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
                            <button
                              hidden={user.role == "ADMIN" ? true : false}
                              onClick={async () => {
                                const response = await custom_axios.delete(ApiConstants.USER.DELETE(user.id), { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
                                 console.log("this is res",response);
                                 
                                getAllUsers();
                                toast.success("User Deleted Sucessfully!!");
                              }}
                            >
                              <RiDeleteBin5Fill className="icon_set"/>
                            </button>
                          </td>
                          <td  hidden={user.role == "ADMIN" ? true : false}>
                          <Switch checked={switchStates[user.id]} onChange={() => handleSwitchChange(user.id)} />

                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
