import { useRouter } from './../router'
import { Link } from './../router/Link'

export const Home = () => {
  const { goTo, goToWithPath, ROUTER_NAME } = useRouter()

  return (
    <>
      <h1>Home page</h1>
      <ul>
        <li>
          <Link to={ROUTER_NAME.REMEDIAL_ACTION_RESPONSE} noUrl>
            Remedial action response page, no params, no query, no url
          </Link>
        </li>

        <li>
          <Link
            to={ROUTER_NAME.REMEDIAL_ACTION_RESPONSE}
            query={{ greating: 'hello' }}
          >
            Remedial action response page, has url, no params, has query
          </Link>
        </li>

        <li>
          <Link
            to={ROUTER_NAME.REMEDIAL_ACTION_RESPONSE}
            params={{ id: 123456 }}
          >
            Remedial action response page, has url, has params (optional)
          </Link>
        </li>
      </ul>
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
              author: 'my kingdom'
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
        params={{ id: 10, author: 'my kingdom' }}
        query={{ page: 9 }}
      >
        Go to POST page with path (okela case) với thẻ Link
      </Link>
    </>
  )
}

export default Home
