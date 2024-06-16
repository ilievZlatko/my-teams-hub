import { CheckCircledIcon } from '@radix-ui/react-icons';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 text-sm text-emerald-800 bg-emerald-500/15 p-3 rounded-md">
      <CheckCircledIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};