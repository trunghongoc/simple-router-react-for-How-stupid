import { useRouter } from './../router'

export const Home = () => {
  const { goTo, ROUTER_NAME } = useRouter()

  return (
    <>
      <h1>Home page</h1>

      <button onClick={() => goTo(ROUTER_NAME.REMEDIAL_ACTION_RESPONSE)}>
        Go to Remedial action response page
      </button>
    </>
  )
}

export default Home
