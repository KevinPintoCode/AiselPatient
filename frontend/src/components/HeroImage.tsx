import Image from 'next/image';

export default function HeroImage() {
    return (
        <div className="relative w-full h-full rounded-3xl">
            {/* SVG hero */}
            <Image
                src="/Group1.png"
                alt="Healthcare hero"
                fill
                priority
                className="object-cover rounded-3xl"
            />
        </div>
    );
} 