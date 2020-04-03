import React from 'react'

import Loader from "react-loader-spinner";

const MutatingDots = ()=>{
    return (
        <Loader
        type="TailSpin"
        color="#fd7e14"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    )
}
export default MutatingDots;