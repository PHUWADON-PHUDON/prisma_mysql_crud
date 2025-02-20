"use client";
import { useState,useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [posts,setposts] = useState<any>([]);
  const [search,setsearch] = useState<string>(useSearchParams().get("search") || "");
  const [category,setcategory] = useState<string>(useSearchParams().get("category") || "");
  const [sort,setsort] = useState<string>(useSearchParams().get("sort") || "");
  const [categorylist,setcategorylist] = useState<any>([]);
  const router:any = useRouter();

  //!load data

  const loadposts = async () => {
    const abortcontroller:any = new AbortController();
    const abortcontroller2:any = new AbortController();

    try{
      const query:string = new URLSearchParams({search,category,sort}).toString();
    
      const response:any = await axios.get(`/api/posts?${query}`,{signal:abortcontroller.signal});
      if (response.status === 200) {
        setposts(response.data);
        sessionStorage.setItem("query",query);
        router.push("?" + query);
      }

      const response2:any = await axios.get("/api/category",{signal:abortcontroller2.signal});
      if (response2.status === 200) {
        setcategorylist(response2.data);
      }
    }
    catch(err) {
      console.log(err);
    }

    return () => {
      abortcontroller.abort();
      abortcontroller2.abort();
    };
  }

  useEffect(() => {
    loadposts();
  },[]);

  //!

  //!delete post

  const deletePost = async (id:string) => {
    const abortcontroller:any = new AbortController();

    try{
      const response:any = await axios.delete(`/api/posts/${id}`,{signal:abortcontroller.signal});
      if (response.status === 200) {
        alert("Delete Posts Success");
        loadposts();
      }
    }
    catch(err) {
      console.log(err);
    }

    return () => abortcontroller.abort();
  }

  //!

  //!filter posts

  const filterPost = () => {
    loadposts();
  }

  //!
  
  return (
    <div className="p-[20px]">
      <h1 className="text-[30px] font-bold">Blog Posts</h1>
      <div className="mt-6">
        <input onChange={(e:any) => setsearch(e.target.value)} className="p-[5px]" type="search" value={search} placeholder="Search..." />
        <select onChange={(e:any) => setcategory(e.target.value)} value={category} name="" id="">
          <option value="">All</option>
          {categorylist.map((e:any,i:number) => (
          <option key={i} value={e.id}>{e.name}</option>
          ))}
        </select>
        <select onChange={(e:any) => setsort(e.target.value)} value={sort} name="" id="">
          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </select>
        <button onClick={() => filterPost()} className="bg-blue-500 p-[5px_15px] font-bold text-white rounded-[4px] mt-[20px] inline-block ml-10" >Filter</button>
      </div>
      <table className="w-[100%] mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="w-[33%] text-left p-[10px]">Title</th>
            <th className="w-[33%] text-left p-[10px]">Category</th>
            <th className="w-[33%] text-left p-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((e:any,i:number) => (
          <tr key={i} className="border-b">
            <td className="p-[10px]">{e.title}</td>
            <td>{e.category.name}</td>
            <td className="p-[10px]">
              <Link className="text-yellow-500" href={`/editpost/${e.id}`}>Edit</Link>
              <Link onClick={() => deletePost(e.id)} className="text-red-500 ml-5" href={"#"}>Delete</Link>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <Link className="bg-blue-500 p-[10px] font-bold text-white rounded-[4px] mt-[20px] inline-block" href={"/createpost"}>Cleate New Post</Link>
      <Link className="bg-blue-500 p-[10px] font-bold text-white rounded-[4px] mt-[20px] inline-block ml-[20px]" href={"/createcategory"}>Cleate New Category</Link>
    </div>
  );
}