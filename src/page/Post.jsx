import { useRouter } from './../router'

export const Post = () => {
  const { goTo, goToWithPath, ROUTER_NAME } = useRouter()

  return (
    <>
      <h1>Post page</h1>

      <button onClick={() => goToWithPath(ROUTER_NAME.HOME)}>
        Go to Home with path
      </button>
    </>
  )
}

export default Post
