import { CreateUser } from "@/types/userTypes";


const createUser = async(user:CreateUser)=>{
    
    try {
        const res = await fetch('http://localhost:3000/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            cache: 'no-store'
        })
        const data = await res.json();
        return data
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
        }
    }
}

export const userService = {
    createUser
}