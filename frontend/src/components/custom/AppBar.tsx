import { UserAvatar } from './BlogCard'

function AppBar() {
  return (
    
    <div className="top-0 left-0 right-0 flex justify-between h-12 bg-slate-50 shadow-md ">

        <div className="flex flex-col justify-center h-full font-semibold text-xl mt-1.5 ml-4 pl-2">
         BlogCode
        </div>

        <div className="flex"> 

            <div className="flex flex-col justify-center h-full font-medium text-xl mr-4">
             <UserAvatar name='indrajit'/>
            </div>

            
        </div>
    </div>

   
  )
}

export default AppBar