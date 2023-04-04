function PreviewProfile() {
    return (
        <div className='container pb-5 my-5 w-4/12 '>
            <div
                className='relative bg-center bg-cover w-32 h-32 lg:w-64 md:w-52 sm:w-48 md:h-52 lg:h-64 sm:h-48 '
                style={{ backgroundImage: "url(/profile-icon.png)" }}
            >
                <div className='absolute w-10 h-10 lg:w-16 md:w-16 sm:w-12 md:h-16 lg:h-16 sm:h-12 lg:left-24 lg:top-56 md:left-20 md:top-44  sm:left-20 sm:top-40 left-12 top-28 bg-white border-2 border-black rounded-full'>
                    <div
                        className='absolute bg-center bg-cover w-6 h-6  md:w-12 md:h-12 lg:w-12 lg:h-12 top-2 left-2'
                        style={{
                            backgroundImage: "url(/edit_profile_icon.png)",
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default PreviewProfile;
