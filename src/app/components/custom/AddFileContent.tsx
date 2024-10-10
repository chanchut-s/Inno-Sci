import React from 'react'

interface AddFileContents {
    addFile: any
}

function AddFileContent({addFile} : AddFileContents) {
    if (!addFile || addFile.length === 0) return null;

    return addFile.map((item: any, index: number) => (
        <div key={index} className='flex flex-col gap-4 mt-6'>
            {item.file && item.file.data && (
                <div className='flex'>
                    <a href={`http://localhost:1337${item.file.data?.attributes?.url}`}
                        target="_blank"
                        className='bg-blue-900 h-[50px] min-w-[200px] flex items-center justify-between text-gray-100 px-2 '
                    >
                        <p className="line-clamp-1">{item.file_name}</p>
  
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='h-6 w-6 text-gray-100 ml-2' fill="currentColor">
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                    </a>
                </div>
            )}
        </div>
    ));
}

export default AddFileContent