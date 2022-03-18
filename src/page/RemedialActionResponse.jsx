import { useRouter } from './../router'

export const RemedialActionResponsee = () => {
  const { goTo, goToWithPath, ROUTER_NAME } = useRouter()

  return (
    <>
      <h1>Remedial action response page</h1>

      <button onClick={() => goTo(ROUTER_NAME.HOME)}>Go to Home</button>
      <button onClick={() => goToWithPath(ROUTER_NAME.HOME)}>
        Go to Home with path
      </button>
    </>
  )
}

export default RemedialActionResponsee
