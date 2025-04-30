'use client'
import { redirect } from "next/navigation"
import { useState } from "react"

export default function Test() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin(e) {
        e.preventDefault()

        const userCredentials = {
            email, 
            password
        }   
        
        const response = await fetch("http://localhost:3220/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userCredentials)
        })

        console.log(response.status)
        if(response.status == 200) {
            redirect("/")
        }
    }
    return (
        <>
        
            <div className="h-screen w-screen flex flex-col justify-center items-center">
            <h1 className="text-6xl">Login</h1>

                <div className="border w-1/2 h-1/2 flex flex-col items-center justify-center">
                    <form onSubmit={handleLogin} className="flex flex-col justify-center items-center">
                        <label htmlFor="email">Email</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="email" className="border"/>
                        <label htmlFor="password">password</label>
                        <input type="text" onChange={(e) => setPassword(e.target.value)} name="password" placeholder="password" className="border"/>
                        <button className="border mt-8 px-6 py-2" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}