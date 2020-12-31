import {
  flatten,
  pipe,
  splitEvery,
  sort,
  pick,
  map,
  comparator,
  filter,
  groupBy,
  path,
  transpose,
  insert,
  min,
  takeLast,
  take,
  slice,
  concat,
  nth,
  head,
  tail,
} from 'ramda'
import { WorkContent } from './works'

const sortWorks = comparator((a: WorkContent, b: WorkContent): boolean => {
  if (a.thumbnail_kind === 'big' && b.thumbnail_kind === 'big') {
    return false
  }
  if (a.thumbnail_kind === 'small' && b.thumbnail_kind === 'small') {
    return false
  }

  return true
})

export function chunks(items: any[], chunksCount: number) {
  const targetChunkSize = Math.floor(items.length / chunksCount)
  const restingItems = items.length % chunksCount

  function makeChunks(
    container: any[][],
    itemsToChunk: any[],
    index: number,
    rest: number
  ) {
    if (itemsToChunk.length === 0) {
      return container
    }

    /**
     * If there are resting items, make a chunk
     * of 1 item more to include all the starting items
     * and to have all chunks with a most similar possible size
     **/
    const chunkSize = rest > 0 ? targetChunkSize + 1 : targetChunkSize

    return makeChunks(
      insert(index, take(chunkSize, itemsToChunk), container),
      takeLast(itemsToChunk.length - chunkSize, itemsToChunk),
      index + 1,
      rest - 1
    )
  }

  return makeChunks([], items, 0, restingItems)
}

function makeMasonry(items: WorkContent[]): WorkContent[][] {
  const groupedWorks = groupBy<WorkContent>(path(['thumbnail_kind']), items)
  const bigThumbnailsWorks = groupedWorks.big
  const smallThumbnailWorks = groupedWorks.small
  const sortedWorks = flatten(
    transpose([bigThumbnailsWorks, smallThumbnailWorks])
  )

  return transpose([bigThumbnailsWorks, smallThumbnailWorks])
}

export default makeMasonry
