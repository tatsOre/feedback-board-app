import Image from 'next/image'
import { useUser } from '../../context/userContext'

export default function Login({ breakpoint }) {
  const { user } = useUser()
  return user ? (
    <div
      className={`login ${
        breakpoint == 'md' ? 'tablet' : ''
      } items-center p-3 mt-6 lg:mt-6 rounded-10 border border-blue-500`}
    >
      <div className="relative min-w-[32px] min-h-[32px] mr-3 rounded-full overflow-hidden">
        <Image
          src={`/${user?.image}`}
          layout="fill"
          objectFit="cover"
          alt={`${user?.name} profile pic`}
        />
      </div>
      <p className="text-blue-500 text-[13px]">
        For testing purposes you are logged in as: <b>{user?.name}</b>
      </p>
    </div>
  ) : null
}
