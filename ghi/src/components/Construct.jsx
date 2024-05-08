function Construct(props) {
    return (
        <div>
            <header className="bg-pink-500 py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome to US by Match Makers
                    </h1>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white shadow-md rounded-md p-4">
                        <h2 className="text-lg font-semibold mb-4 text-black">
                            About Us
                        </h2>
                        <p className="text-gray-700">
                            <i>US</i> is a revolutionary dating app designed to
                            help people find meaningful connections with others
                            who share their interests, values, and life goals.
                            Our app utilizes advanced matching algorithms to
                            connect users based on compatibility factors,
                            ensuring that every match has the potential for a
                            deep and fulfilling relationship.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-md p-4">
                        <h2 className="text-lg font-semibold mb-4 text-black">
                            Our Mission
                        </h2>
                        <p className="text-gray-700">
                            At <i>Match Makers</i>, we are committed to
                            providing our users with the best possible
                            experience on their journey to find love. Our
                            services include user-friendly interfaces, and a
                            supportive community to help you navigate the world
                            of online dating with ease and confidence.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Construct
