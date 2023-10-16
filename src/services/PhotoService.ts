import { createApi, SearchOrderBy } from 'unsplash-js'
import { getPhoto, Photo } from '../models/Photo'
import { Result } from '../models/Result'

const api = createApi({
  accessKey: `${process.env.REACT_APP_ACCESS_KEY}`,
})
const PER_PAGE = 16

export const searchPhotos = async (
  query: string,
  criteria: string,
  page: number
) => {
  const result = await api.search.getPhotos({
    query,
    page,
    perPage: PER_PAGE,
    //orientation: 'landscape',
    orderBy: criteria as SearchOrderBy,
  })

  //if(result.type === 'success')
  if (result.status === 200) {
    const { response } = result

    if (response) {
      const { total_pages, results } = response
      const photos: Photo[] = results.map((r: any) => {
        // Passe as dimensões corretas da foto para getPhoto
        return getPhoto(r, { width: r.width, height: r.height });
      });
      const result: Result = { photos, totalPages: total_pages }
      return result
    }
  }

  const searchResult: Result = { photos: [], totalPages: 0 }
  return searchResult
}
