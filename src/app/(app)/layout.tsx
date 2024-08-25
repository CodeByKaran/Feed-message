import React,{FC,ReactNode} from 'react'
import NavBar from "@/components/nav-bar"
import SwitchButton from "@/components/switchButton"
import PublicUrl from "@/components/public-url"



interface PropType {
   children: ReactNode
}


const AppLayout:FC<PropType> = ({children}) => {
  return (
    <div>
     <NavBar />
     <div className="flex flex-col items-start justify-center md:flex-row md:justify-between md:items-center max-w-[800px] mx-auto w-[96%] my-5 space-y-4 md:space-y-0 ">
      <PublicUrl />
      <SwitchButton />
     </div>
     {children}
    </div>
  )
}

export default AppLayout