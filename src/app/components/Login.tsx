import { signIn, useSession, signOut } from 'next-auth/react'

export default function Login() {

const { data: session, status } = useSession()
console.log(session, status)

return (
  <main className='flex flex-col items-center justify-around md:flex-row'>

    { session ? (
      <>
      Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
      </>
    ):(

    <section className='w-full mt-4'>
      <form className='flex flex-col items-center justify-center'>
        <button
          onClick={(e) => {
            e.preventDefault()
            // signIn('infojobs', { callbackUrl: '/resume' })
            async () => await signIn('infojobs')
          }}
          className='flex flex-row rounded-lg bg-[#2088c2] px-5 py-2 text-white items-center hover:bg-[#16628b]'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 138 136.054'
            className='w-8 h-8'
          >
            <path
              d='M57.905 89.323c-.083.749-.748 1.247-1.493 1.247H45.344c-.664 0-1.251-.416-1.251-1.082l.082-.166 7.052-59.253c.085-.666.217-1.004.968-1.087h12.098c.581 0 .914.415.914.997v.166l-7.302 59.178zm28.264 1.975c-1.58 12.898-9.654 15.892-19.39 15.892-5.741 0-6.491-.249-7.988-.415-.748-.085-1.497-.167-1.497-1.332v-.415l.582-4.825c.166-1.415.748-1.662 1.996-1.662 1.165-.083 2.748-.083 4.493-.167 4.325-.248 7.323-.582 8.072-6.743l7.569-61.603c.086-.665.668-1.081 1.416-1.163l11.314.119h.168c.664 0 1.001.415 1.001.998'
              fill='#fff'
            />
          </svg>            
          Sign in with Infojobs
        </button>
      </form>
    </section>
    )}
  </main>
)
}