

interface BlogCardProps{
    authername:string,
    title:string,
    content:string,
    publishedDate:string

}

function BlogCard({authername,title,content,publishedDate}:BlogCardProps) {
  return (
    <div className="border-b-2 border-slate-200 p-4">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <UserAvatar name={authername}/> 
            </div>
            <div className="font-extralight text-md px-2 flex justify-center flex-col">
                {authername}
            </div>
            <div className="flex justify-center flex-col text-xs pr-1">
                &#9679;
            </div>
            <div className="flex justify-center flex-col font-thin text-slate-500"> 
                {publishedDate}
            </div>

        </div>
       
        <div className="text-xl font-semibold">
            {title}
        </div>

        <div className="text-md font-thin">
            {content.slice(0,300)+"...."}
        </div>

        <div className="text-slate-400 text-md font-thin">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
        
    </div>
  )
}

function UserAvatar({name}:{name:string}){
    return(
        
        <div className="relative inline-flex border-2 items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>

    )
}

export default BlogCard