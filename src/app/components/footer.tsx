export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} My Application. All rights reserved.</p>
                <nav className="mt-2">
                    <ul className="flex justify-center space-x-4">
                        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};