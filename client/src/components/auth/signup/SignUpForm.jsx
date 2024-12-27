import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpFormSchema } from "../../../Schemas/signUpFormSchema";
import { loginUser, signUpUser } from "../../../services/authService";
import { toast } from "react-toastify";
import { useState } from "react";
import { LuLoader as Loader} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";


const SignUpForm = () => {
	const [isLoading,setIsloading] = useState (false)
	const dispatch = useDispatch()
	// 1. Define your form.
	const form = useForm({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	const navigate = useNavigate()
	async function onSubmit(userData) {
		setIsloading(true)
		console.log(userData);
		let response = null;
		const signUpToast = toast.loading("Trying to create an account");
		let logInToast

		try {
			response = await signUpUser(userData);
            console.log(response)
			if (!response.success) {
                throw new Error(response.data.message || "Failed to create an acount, Please try again")
			}
			toast.update(signUpToast, {
				render: response.message,
				type: "success",
				isLoading: false,
                autoClose: 3000,
			});


			
			//slogin the user and redirect to home page
			logInToast = toast.loading("Trying to login")

			const loginResponse = await loginUser({email: userData.email, password: userData.password})

			console.log(loginResponse)
			
			if(!loginResponse.success){
				navigate('/login')
				throw new Error("Failed to login,Please try again")

			}
			toast.update(logInToast,{
				render:loginResponse.message,
				type: 'success',
				isLoading: false,
				autoClose: 3000,
			})

			//update the auth status in redux
			dispatch(setUser({userData:loginResponse.data,isAuthenticated:true, status: "authenticated" }))

			//navigate to home
			navigate('/')
	
            
		} catch (error) {
			console.log("Failed to get the respnse in signUpForm::: ", error);
            const errorMessage =
            error?.response?.data?.message || error?.message || "An unexpected error occurred. Please try again later.";

			toast.update(signUpToast, {
				render:errorMessage,
				type: "error",
				isLoading: false,
                autoClose: 3000,
			});
			toast.update(logInToast, {
				render:errorMessage,
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
					name='firstname'
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input
									type='text'
									placeholder='Enter your first name'
									{...field}
									className='bg-input h-11'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='lastname'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input
									className='bg-input h-11'
									type='text'
									placeholder='Enter your last name'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Eamil</FormLabel>
							<FormControl>
								<Input
									className='bg-input h-11'
									type='email'
									placeholder='Enter your email'
									{...field}
								/>
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
								<Input
									className='bg-input h-11'
									autoComplete='new-password'
									type='password'
									placeholder='Set a password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isLoading} className=' w-full h-11'>{isLoading? (<><Loader className=" animate-spin"/><span className=" animate-pulse">Loading</span></>):("Sign Up")}
				</Button>
			</form>
		</Form>
	);
};

export default SignUpForm;
