import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {logout as setLogout} from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function useLogout() {
    const router = useRouter();
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const handleLogout = async() => {
        logout(undefined)
        .unwrap()
        .then(()=>{
            dispatch(setLogout());
        })
        .finally(()=>{
            router.push("/auth/login");
        })
        .catch((error: any) => {
            console.log(error);
        });
    };

  return {
    handleLogout
  };
}
