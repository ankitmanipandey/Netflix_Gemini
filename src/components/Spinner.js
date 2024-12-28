import { ColorRing } from 'react-loader-spinner'
export default function Spinner() {
    return (
        <div className='bg-black opacity-70 md:p-4 m-4 md:mx-8 rounded-xl md:absolute md:w-[95%] h-[100%] flex justify-center items-center'>
            < ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#f00', '#f00', '#f00', '#f00', '#f00']}
            />z
        </div>
    )
}