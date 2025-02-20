"use client";
import { useState,useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Editpost({params}:{params:Promise<{id:string}>}) {
    const [title,settitle] = useState<string>("");
    const [content,setcontent] = useState<string>("");
    const [categoryid,setcategoryid] = useState<number>(1);
    const [categorylist,setcategorylist] = useState<any>([]);
    const {id} = use(params);
    const router:any = useRouter();

    //!load data
    
    useEffect(() => {
        const abortcontroller:any = new AbortController();
        const abortcontroller2:any = new AbortController();

        const loaddata = async () => {
            try{
                const response:any = await axios.get(`/api/posts/${id}`,{signal:abortcontroller.signal});
                if (response.status === 200) {
                    settitle(response.data.title);
                    setcontent(response.data.content);
                    setcategoryid(response.data.category_id);
                }

                const response2:any = await axios.get("/api/category",{signal:abortcontroller2.signal});
                if (response2.status === 200) {
                    setcategorylist(response2.data);
                }
            }
            catch(err) {
                console.log(err);
            }
        }

        loaddata();

        return () => {
            abortcontroller.abort();
            abortcontroller2.abort();
        }
    },[]);

    //!

    //!edit post

    const editPost = async () => {
        const abortcontroller:any = new AbortController();

        try{
            if (title !== "") {
                const response = await axios.put(`/api/posts/${id}`,{signal:abortcontroller.signal,title:title,content:content,categoryid:categoryid});
                if (response.status === 200) {
                    alert("Edit Post Success");
                    const getquery = sessionStorage.getItem("query") || "";
                    router.push("/?" + getquery);
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
            <h1 className="text-[30px] font-bold">Edit Post</h1>
            <p className="mt-[20px]">Title:</p>
            <input onChange={(e:any) => settitle(e.target.value)} className="w-[100%] mt-1 border-b text-gray-500" type="text" placeholder="Title..." value={title} />
            <p className="mt-[20px]">Category:</p>
            <select onChange={(e:any) => setcategoryid(e.target.value)} value={categoryid} className="mt-1" name="" id="">
                {categorylist.map((e:any,i:number) => (
                    <option key={i} value={e.id}>{e.name}</option>
                ))}
            </select>
            <p className="mt-[20px]">Content:</p>
            <textarea onChange={(e:any) => setcontent(e.target.value)} className="w-[100%] h-[100px] mt-1 border-b text-gray-500" placeholder="Content..." value={content}></textarea>
            <button onClick={() => editPost()} className="bg-blue-500 p-[10px] font-bold text-white rounded-[4px] mt-[20px]"><Link href={"#"}>Edit Post</Link></button>
        </div>
    );
}