import { useRouter } from './../router'

export const Home = () => {
  const { goTo, goToWithPath, ROUTER_NAME } = useRouter()

  return (
    <>
      <h1>Home page</h1>

      <button onClick={() => goTo(ROUTER_NAME.REMEDIAL_ACTION_RESPONSE)}>
        Go to Remedial action response page
      </button>

      <button
        onClick={() => goToWithPath(ROUTER_NAME.REMEDIAL_ACTION_RESPONSE)}
      >
        Go to Remedial action response page with path
      </button>
    </>
  )
}

export default Home
