import { useRenderPageByRouter } from './../router'

export const Index = () => {
  const currentPage = useRenderPageByRouter()

  return currentPage
}
