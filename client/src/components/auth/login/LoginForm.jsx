import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LuLoader as Loader} from "react-icons/lu";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "../../../Schemas/loginFormSchema";
import { loginUser } from "../../../services/authService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";

const LoginForm = () => {
	// 1. Define your form.
	const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

	// 2. Define a submit handler.
	const [isLoading,setIsloading] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	async function onSubmit(userData) {
		const logInToast = toast.loading("Trying to login")
		
		setIsloading(true)
		let response = null
		try {
			response = await loginUser(userData)
			console.log(response)


			if(!response.success){
				throw new Error(response.data.message || "Failed to login, Please try again")
			}

			toast.update(logInToast, {
				render: response.message || "Login successfully!",
				type: "success",
				isLoading: false,
				autoClose: 3000,
			});

			//update the auth state in redux
			dispatch(setUser({userData:response.data.user, isAuthenticated:true, status: "authenticated"}))

			//navigate to home
			navigate('/')

		} catch (error) {
			console.log(error)
			
			toast.update(logInToast, {
				render: error.message || "An unexpected error occured, Please try again",
				type: "error",
				isLoading: false,
				autoClose: 3000,
			});
		}finally{
			setIsloading(false)
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
			
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Eamil</FormLabel>
							<FormControl>
								<Input className = "bg-input h-11" type="email" placeholder='Enter your email' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input className = "bg-input h-11" autoComplete="off" type = "password" placeholder='Set a password' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isLoading} type='submit' className = " w-full h-11 flex  justify-center items-center gap-4">{isLoading?(<><Loader className=" animate-spin text-5xl mr-4 "/> <span>Loading...</span></>):("Login")}</Button> 
				
				

			</form>
		</Form>
	);
};

export default LoginForm;
