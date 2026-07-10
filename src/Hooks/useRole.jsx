import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {

    // data load
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {isLoading, data : role = "user"} = useQuery({
        queryKey: ["user-role", user?.email], 
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user.email}/role`)
            return res.data
        }
    })

    return {role, isLoading}
};

export default useRole;