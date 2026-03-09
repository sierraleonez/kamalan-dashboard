import React from 'react';

interface CategoryCardProps {
    title: string;
    imageUrl: string;
    onClick: () => void;
}

export default function CategoryCard({ title, imageUrl, onClick }: CategoryCardProps) {
    return (
        <div 
            onClick={onClick}
            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] h-80 md:h-96"
        >
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                {/* Overlay for better text contrast */}
                <div className="absolute inset-0 bg-black opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
            </div>
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6">
                {/* Semi-transparent Button */}
                <button className="
                    bg-[#889966] bg-opacity-90 hover:bg-opacity-100 
                    text-[oklch(0.985_0_0)] 
                    px-6 py-3 
                    rounded-md 
                    font-serif text-lg font-medium
                    transition-all duration-300
                    backdrop-blur-sm
                    group-hover:transform group-hover:translate-y-[-2px]
                    shadow-lg
                ">
                    {title}
                </button>
            </div>
        </div>
    );
}