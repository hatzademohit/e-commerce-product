export default function Footer() {
    return (
        <footer className="bg-white py-4 dark:text-gray-400 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 fixed z-10 bottom-0 w-full">
            <p className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Product Explorer
            </p>
        </footer>
    );
}
