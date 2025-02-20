"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Createcategory() {
    const [inputcategory,setinputcategory] = useState<string>("");
    const router:any = useRouter();

    //!create category

    const createCategory = async () => {
        const abortcontroller:any = new AbortController();

        try{
            if (inputcategory !== "") {
                const response:any = await axios.post("/api/category",{signal:abortcontroller.signal,category:inputcategory});
                if (response.status === 200) {
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
            <h1 className="text-[30px] font-bold">Create a New Category</h1>
            <p className="mt-[20px]">Category:</p>
            <input onChange={(e) => setinputcategory(e.target.value)} className="w-[100%] mt-1 border-b text-gray-500" type="text" placeholder="Category..." />
            <button onClick={() => createCategory()} className="bg-blue-500 p-[10px] font-bold text-white rounded-[4px] mt-[20px]">Create Category</button>
        </div>
    );
}