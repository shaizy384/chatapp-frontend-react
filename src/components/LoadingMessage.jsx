import React from 'react'
const LoadingMessage = () => {
    return (
        <>
            <div className="flex gap-x-4 mb-2 pb- pt- mx-3">
                <div className={"p-  w-[57px] rounded-xl ml-[62px] bg-sky-509"}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className='px-[9px] text-white' viewBox="0 0 200 200"><circle fill="currentColor" stroke="currentColor" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="currentColor" stroke="currentColor" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="currentColor" stroke="currentColor" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg> */}
                    <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-11 28 75 40" enable-background="new 0 0 0 0" xmlSpace="preserve">
                        <circle fill="#fff" stroke="none" cx="6" cy="50" r="6"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" /></circle>
                        <circle fill="#fff" stroke="none" cx="26" cy="50" r="6"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" /></circle>
                        <circle fill="#fff" stroke="none" cx="46" cy="50" r="6"><animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" /></circle>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default LoadingMessage