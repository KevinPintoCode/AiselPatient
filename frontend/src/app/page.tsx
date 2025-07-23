import LoginForm from '@/components/LoginForm';
import HeroImage from '@/components/HeroImage';

export default function Home() {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen p-4 lg:p-0 bg-[#211F54]">
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
      <div className="hidden lg:block">
        <HeroImage />
      </div>
    </div>
  );
}
