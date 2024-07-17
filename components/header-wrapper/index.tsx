import { auth } from '@/config/auth';
import Header from '../header';

export default async function HeaderWrapper() {
  const session = await auth();
  console.log('USER',session?.user)
  console.log('TOKEN', session?.token)

  const user = {
    name: session?.user.firstName ?? '',
    email: session?.user.email ?? '',
  };

  return <Header user={user} />;
}