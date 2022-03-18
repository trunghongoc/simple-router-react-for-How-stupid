import { useRouter, findRoute, getAndFillDataToNewPath } from './index'

export const Link = ({
  children,
  to: name,
  params,
  query,
  noUrl,
  ...props
}) => {
  const { goTo, goToWithPath } = useRouter()
  const route = findRoute(name)
  const { newPath } = route
    ? getAndFillDataToNewPath(route.path, { params, query })
    : {
        isValidPath: false,
        newPath: '/'
      }

  const handleOnClick = event => {
    event.preventDefault()

    if (noUrl) {
      return goTo(name)
    }

    goToWithPath(name, {
      params,
      query
    })
  }

  return (
    <a onClick={handleOnClick} href={newPath} {...props}>
      {children}
    </a>
  )
}
