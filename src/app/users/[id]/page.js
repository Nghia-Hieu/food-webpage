"use client";
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";
import UseProfile from "@/components/UseProfile";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";


export default function EditUserPage(){

    const {loading, data} = UseProfile();
    const {id} = useParams();
    const [user, setUser] = useState([]);

    useEffect(()=>{
        fetch('/api/profile?_id='+id).then(response =>{
            response.json().then(user=>{
                setUser(user);
            })
        })
    }, []);

    async function handleSaveButtonClick(ev, data){
        ev.preventDefault();

        const promise = new Promise(async(resolve, reject)=>{
            const res = await  fetch('/api/profile',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...data, _id:id})
            });
            if(res.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(promise,{
            loading: 'Saving user...',
            success: 'User saved',
            error: 'An error has occured while saving'
        })
       
    }

    if(loading){
        return 'Loading user info...';
    }

    if(!data.admin){
        return 'Not an admin';
    }

    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
        </section>
    )
}