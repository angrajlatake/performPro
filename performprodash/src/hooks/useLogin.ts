import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";
import {z} from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { useToast } from "@/components/ui/use-toast"

export default function useLogin() {
    const {toast} = useToast();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [login, {isLoading}] = useLoginMutation();

    const formSchema = z.object({
        username: z.string().min(3),
        password: z.string().min(3),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        login({ username: data.username, password: data.password })
        .unwrap()
        .then(()=>{
            dispatch(setAuth());
            toast({title: "Login Successful"});
            router.push("/admin");
        })
        .catch((error: any) => {
            toast({
                title: "Login Failed",
            })
        });
    };


  return {
    form,
    isLoading,
    onSubmit
  };
}