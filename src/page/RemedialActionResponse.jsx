import { useRouter } from './../router'

export const RemedialActionResponsee = () => {
  const { goTo, ROUTER_NAME } = useRouter()

  return (
    <>
      <h1>Remedial action response page</h1>

      <button onClick={() => goTo(ROUTER_NAME.HOME)}>Go to Home</button>
    </>
  )
}

export default RemedialActionResponsee
