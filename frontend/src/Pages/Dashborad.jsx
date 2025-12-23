import { Navbar } from "../Components/Navbar"

export const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-gray-900 to-black p-6">
                <div className="place-items-center mt-2.5 text-green-700">
                    <div className=" text-8xl font-extrabold">
                        YOUR DREAMS
                    </div>
                    <div className=" text-8xl font-extrabold ml-8">
                        OUR GOALS
                    </div>
                    <div className="place-items-center mt-12 mb-3 text-2xl text-gray-400 border-2 border-gray-500 rounded-xl p-4">
                        <h3 className="text-3xl font-semibold text-gray-300" >Together, We Achieve More</h3>
                        <p className="">-Your aspirations fuel our success. When your personal dreams align with our  </p>
                        collective goals, we create extraordinary outcomes. We're committed to helping you 
                         <p> reach your full potential while building something meaningful together
                        </p>
                    </div>
                    <div className="text-2xl font-bold ml-120 ">
                        -DEEPENDRA SINGH RATHORE
                    </div>
                </div>
            </div>
        </>
    )
}