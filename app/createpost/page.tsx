"use client";
import { useState,useEffect, use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Createpost() {
    const [title,settitle] = useState<string>("");
    const [content,setcontent] = useState<string>("");
    const [categoryid,setcategoryid] = useState<number>(1);
    const [categorylist,setcategorylist] = useState<any>([]);
    const router:any = useRouter();

    //!load data

    useEffect(() => {
        const abortcontroller:any = new AbortController();

        const loaddata = async () => {
            try{
                const response = await axios.get("/api/category",{signal:abortcontroller.signal});
                if (response.status === 200) {
                    setcategorylist(response.data);
                }
            }
            catch(err) {
                console.log(err);
            }
        }

        loaddata();

        return () => abortcontroller.abort();
    },[]);

    //!

    //!create post

    const createPost = async () => {
        const abortcontroller:any = new AbortController();

        try{
            if (title !== "") {
                const response = await axios.post("/api/posts",{signal:abortcontroller.signal,title:title,content:content,category_id:categoryid});
                if (response.status === 200) {
                    alert("Create a New Post Success");
                    router.push("/");
                }
            }
        }
        catch(err) {
            console.log(err);
        }

        return () => abortcontroller.abort();
    }

    //!

    return(
        <div className="p-[20px]">
            <h1 className="text-[30px] font-bold">Create a New Post</h1>
            <p className="mt-[20px]">Title:</p>
            <input onChange={(e:any) => settitle(e.target.value)} className="w-[100%] mt-1 border-b text-gray-500" type="text" placeholder="Title..." />
            <p className="mt-[20px]">Category:</p>
            <select onChange={(e:any) => setcategoryid(e.target.value)} className="mt-1" name="" id="">
                {categorylist.map((e:any,i:number) => (
                    <option key={i} value={e.id}>{e.name}</option>
                ))}
            </select>
            <p className="mt-[20px]">Content:</p>
            <textarea onChange={(e:any) => setcontent(e.target.value)} className="w-[100%] h-[100px] mt-1 border-b text-gray-500" placeholder="Content..."></textarea>
            <button onClick={() => createPost()} className="bg-blue-500 p-[10px] font-bold text-white rounded-[4px] mt-[20px]">Create Post</button>
        </div>
    );
}