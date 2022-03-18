import { useRouter } from './../router'
import { Link } from './../router/Link'

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
      <button
        onClick={() =>
          goToWithPath(ROUTER_NAME.POST, {
            params: {
              id: 10
            },
            query: {
              keyword: 'ahi',
              page: 9
            }
          })
        }
      >
        Go to POST page with path (missed required params) (open console log to
        see detail)
      </button>
      <button
        onClick={() =>
          goToWithPath(ROUTER_NAME.POST, {
            params: {
              id: 10,
              autho: 'my kingdom'
            },
            query: {
              keyword: 'ahi',
              page: 9
            }
          })
        }
      >
        Go to POST page with path (okela case)
      </button>
      <Link to={ROUTER_NAME.POST}>
        Go to POST page with path (missed required params) với thẻ Link
      </Link>{' '}
      |{' '}
      <Link
        to={ROUTER_NAME.POST}
        params={{ id: 10, autho: 'my kingdom' }}
        query={{ page: 9 }}
      >
        Go to POST page with path (okela case) với thẻ Link
      </Link>
    </>
  )
}

export default Home
