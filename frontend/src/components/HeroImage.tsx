import Image from 'next/image';

export default function HeroImage() {
    return (
        <div className="w-full h-full relative rounded-3xl overflow-hidden">
            <Image
                src="/doctor-hero.jpg"
                alt="Doctor smiling"
                fill
                priority
                className="object-cover"
            />
        </div>
    );
} 