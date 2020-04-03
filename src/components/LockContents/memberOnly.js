import React from 'react'


const MembersOnly = ()=>{
return(
    <div className="bg-light text-center d-flex flex-column p-3">
        <i className="fas fa-lock"></i>
        <span className="py-3">This content is available only to members</span>
    </div>
)
}
export default MembersOnly;