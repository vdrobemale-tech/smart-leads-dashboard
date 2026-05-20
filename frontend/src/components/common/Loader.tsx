import { Loader2 } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const Loader = ({ size = 'md', text }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <Loader2 className={`${sizeMap[size]} animate-spin text-primary-600`} />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );
};

export default Loader;