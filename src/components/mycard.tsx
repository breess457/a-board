import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MyCardCompnent({blogData,index,handleClickModel,handleDeleteBlog}:any){

    return(
        <div className="full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100" key={index}>
            <a className="w-full">
                <div className="flex items-center mb-3">{blogData?.users?.firstname}  {blogData?.users?.lastname}</div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{blogData?.title}</h2>
                <p className="text-sm text-gray-700 mb-4">
                    {blogData?.detail}
                </p>
                <div className="mt-4 flex">
                    <FontAwesomeIcon icon={faComment} className="w-4 h-5"/> 
                    <p>&nbsp;&nbsp; {blogData?.countComment} &nbsp; comment</p>
                    <div className="ml-auto">
                        <button 
                            className="bg-none b-none p-2"
                            onClick={()=>handleClickModel(blogData,true)}
                        ><FontAwesomeIcon icon={faPenToSquare}/></button>
                        <button 
                            className="bg-none b-none p-2"
                            onClick={()=>handleDeleteBlog(blogData)}
                        >
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                </div>
            </a>
        </div>
    )
}