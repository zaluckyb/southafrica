import { LuUser2 } from 'react-icons/lu';
import { fetchProfileImage } from '@/utils/actions';
import Image from 'next/image';

async function UserIcon() {
  const profileImage = await fetchProfileImage();
  if (profileImage) {
    return (
      <div className='relative w-6 h-6'>
        <Image
          src={profileImage}
          alt="User profile"
          fill
          className='rounded-full object-cover'
        />
      </div>
    );
  }
  return <LuUser2 className='w-6 h-6 bg-primary rounded-full text-white' />;
}
export default UserIcon;
