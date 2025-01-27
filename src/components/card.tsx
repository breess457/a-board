import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function CardCompnent({blogData,index}:any){
    const truncateTextBySentence = (text:any, maxkength:number)=>{
        if(text.length <= maxkength) return text
        const truncated = text.slice(0, maxkength)
        const lastSentenceEnd = truncated.lastIndexOf('.');
        const lastQuestionMark = truncated.lastIndexOf('?');
        const lastExclamationMark = truncated.lastIndexOf('!')
        const endIndex = Math.max(lastSentenceEnd, lastQuestionMark, lastExclamationMark)
        if(endIndex !== -1){
            return truncated.slice(0, endIndex + 1)
        }
        return truncated + '...'
    }

    return(
        <div className="full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100" key={index}>
            <Link href={`pages/details?blogid=${blogData?._id}`} className="w-full">
                <div className="flex items-center my-4">
                    <img src="/image/profile.jpg" className="w-10 h-10 rounded-full object-cover" alt="profile" /> 
                    <div className="flex items-center mb-3 ml-5 font-bold">{blogData?.users?.firstname}  {blogData?.users?.lastname}</div>
                </div>
                <div className="text-sm text-gray-500 mb-2 flex">
                      <p className='w-auto bg-gray-100 px-6 py-2 rounded-full'>{blogData?.category}</p>
                    </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{blogData?.title}</h2>
                <p className="text-sm text-gray-700 mb-4">
                    {truncateTextBySentence(blogData?.detail,300)}
                </p>
                <div className="mt-4 flex">
                        <FontAwesomeIcon icon={faComment} className="w-4 h-5"/> 
                        <p>&nbsp;&nbsp; {blogData?.countComment} &nbsp; comment</p>
                </div>
            </Link>
        </div>
    )
}