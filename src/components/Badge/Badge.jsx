import React from 'react'

const Badge = (props) => {
  return (
   <span className={`inline-block  rounded-full py-1 px-4 capitalize  ${props.status === "pending" && 'bg-[#c86707] text-white' }
   ${props.status === "confirm" && 'bg-[#144a02] text-white' }
    ${props.status === "Decliend" && 'bg-[#c80707] text-white' }
    ${props.status === "delivered" && 'bg-[#144a02] text-white' }
   `}>
{props.status}
   </span>
  )
}

export default Badge


