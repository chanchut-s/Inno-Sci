'use client';

export default function NotFound() {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
                    <h1 className="text-6xl font-bold text-red-500">404</h1>
                    <p className="mt-4 text-xl text-gray-700">ขออภัย, หน้าที่คุณค้นหาไม่พบ</p>
                    <a href="/" className="mt-6 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        กลับสู่หน้าหลัก
                    </a>
                </div>
            </body>
        </html>
    );
}