import Image from 'next/image'
import useUser from 'hooks/useUser'

export default function Login({ breakpoint }) {
  const { loadingUser, user } = useUser()

  return (
    <div
      className={`login ${
        breakpoint == 'md' ? 'tablet' : ''
      } items-center p-3 mt-6 lg:mt-6 rounded-10 border border-blue-500 text-blue-500 text-[13px]`}
    >
      {user ? (
        <>
          <div className="relative min-w-[32px] min-h-[32px] mr-3 rounded-full overflow-hidden">
            <Image
              src={`/${user?.image}`}
              layout="fill"
              objectFit="cover"
              alt={`${user?.name} profile pic`}
            />
          </div>
          <p>
            For testing purposes you are logged in as: <b>{user?.name}</b>
          </p>
        </>
      ) : loadingUser ? (
        <p>Loading...</p>
      ) : (
        <p>Something happened...</p>
      )}
    </div>
  )
}
