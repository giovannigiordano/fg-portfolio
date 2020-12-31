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
  indexOf,
  addIndex,
  reverse,
  values,
  compose,
  curry,
} from 'ramda'
import { WorkContent } from './works'

export const chunks = curry((chunksCount: number, items: any[]) => {
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
})

const isOdd = (value: number): boolean => value % 2 === 0
const sortWorks = comparator((a: WorkContent, b: WorkContent): boolean => {
  if (a.thumbnail_kind === 'big' && b.thumbnail_kind === 'big') {
    return false
  }
  if (a.thumbnail_kind === 'small' && b.thumbnail_kind === 'small') {
    return false
  }

  return true
})
const groupByThumbnailKind = groupBy<WorkContent>(path(['thumbnail_kind']))
const indexedMap = addIndex<WorkContent[]>(map)
const reverseOdd = indexedMap((item, index) =>
  isOdd(index + 1) ? reverse(item) : item
)

const makeMasonry = compose(
  transpose as (list: WorkContent[][]) => WorkContent[][],
  values,
  groupByThumbnailKind
)

export const makeHorizontalMasonry = compose(reverseOdd, makeMasonry)

export const makeVerticalMasonry = compose(
  reverseOdd,
  chunks(3), // columns
  flatten,
  makeMasonry
)
