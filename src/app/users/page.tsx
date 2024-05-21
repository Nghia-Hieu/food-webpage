"use client";
import UseProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Users(){
    const {loading, data} = UseProfile();
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetch('/api/users').then(response =>{
            response.json().then(users=>{
                setUsers(users);
            })
        })
    });

    if(loading){
        return 'Loading user info...';
    }

    if(!data.admin){
        return 'Not an admin';
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                {users?.length > 0  && users.map(user => (
                    // eslint-disable-next-line react/jsx-key
                    <div className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 grow gap-4">
                            <div className="text-gray-900">
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No name</span>)}
                            </div>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={'/users/'+user._id}>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}