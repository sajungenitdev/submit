import Image from 'next/image';

export default function UserDashboard() {
    const festivals = [
        {
            id: 1,
            name: 'The 2026 Film and Video Poetry Symposium',
            logo: '/assets/download-1.webp', // Replace with your image path
        },
        {
            id: 2,
            name: 'Indie Vegas Film Festival',
            logo: '/assets/download-2.webp', // Replace with your image path
        },
        {
            id: 3,
            name: 'Peachtree Village International Film Festival',
            logo: '/assets/download-3.webp', // Replace with your image path
        },
        {
            id: 4,
            name: 'Santa Cruz Film Festival',
            logo: '/assets/download-4.webp', // Replace with your image path
        },
        {
            id: 5,
            name: 'New York International Screenplay Awards',
            logo: '/assets/download-1.webp', // Replace with your image path
        },
    ];

    return (
        <div className=" min-h-screen p-6 md:p-10 font-sans text-gray-700">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

                {/* === Left Sidebar (Column) === */}
                <aside className="md:w-1/3 flex flex-col gap-6">

                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="relative mb-6">
                            <Image
                                src="/assets/sazeduzzaman.jpg" // Replace with your image path
                                alt="Sazeduzzaman Saju"
                                width={300}
                                height={300}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                            <button className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1.5 rounded hover:bg-black transition font-medium">
                                Change Profile Picture
                            </button>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Sazeduzzaman Saju</h1>
                        <p className="text-sm text-gray-500 mb-5">Member since March 27, 2026</p>

                        <div className="flex flex-col gap-2.5">
                            <a href="#" className="text-sm text-[#0066CC] hover:underline font-medium">View Profile</a>
                            <a href="#" className="text-sm text-[#0066CC] hover:underline font-medium">Account Settings</a>
                        </div>
                    </div>

                    {/* Gold Status Card */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-center gap-5 hover:border-amber-200 transition">
                        <div className="border-2 border-amber-300 p-2 text-amber-500 font-bold text-lg rounded-sm tracking-widest px-4">
                            GOLD
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Upgrade to Gold</h3>
                            <p className="text-sm text-gray-600">Save 10% to 50% on submissions</p>
                        </div>
                    </div>

                </aside>

                {/* === Main Content (Column) === */}
                <main className="md:w-2/3 flex flex-col gap-6">

                    {/* Marketing Service Card */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-5">
                        <div className="flex items-center gap-5">
                            <div className="text-green-600 bg-green-50 p-3.5 rounded-full">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Marketing Service</h3>
                                <p className="text-sm text-gray-600">FilmFreeway can help promote your work to festivals.</p>
                            </div>
                        </div>
                        <button className="bg-[#1EB97A] text-white px-7 py-2.5 rounded hover:bg-[#189663] transition font-semibold text-sm w-full sm:w-auto">
                            Promote Work
                        </button>
                    </div>

                    {/* Submissions Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-[#F6F7F9] p-4.5 px-6 border-b border-gray-200 flex items-center gap-2">
                            <h2 className="text-lg font-semibold text-gray-900">Submissions</h2>
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" /></svg>
                        </div>
                        <div className="p-10 text-center">
                            <p className="text-base text-gray-600">
                                You have not yet submitted your work to any festivals. <a href="#" className="text-[#0066CC] hover:underline font-medium">Add a Project</a> to get started!
                            </p>
                        </div>
                    </div>

                    {/* Festivals You May Like Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-[#F6F7F9] p-4.5 px-6 border-b border-gray-200 flex items-center justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-900">Festivals You May Like</h2>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Sponsored</span>
                                <button className="bg-white border border-gray-200 text-gray-700 text-sm px-4.5 py-1.5 rounded hover:bg-gray-50 transition font-medium">
                                    View All
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                                {festivals.map((festival) => (
                                    <div key={festival.id} className="text-center group">
                                        <div className="bg-white aspect-square border border-gray-100 rounded-lg shadow-inner flex items-center justify-center p-3 mb-3.5 group-hover:border-gray-200 transition">
                                            <Image
                                                src={festival.logo}
                                                alt={festival.name}
                                                width={100}
                                                height={100}
                                                className="max-w-full h-auto object-contain"
                                            />
                                        </div>
                                        <p className="text-[13px] text-gray-800 leading-snug line-clamp-3 group-hover:text-[#0066CC] transition">
                                            {festival.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}