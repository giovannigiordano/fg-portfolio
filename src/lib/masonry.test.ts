import { chunks, makeVerticalMasonry, makeHorizontalMasonry } from './masonry'
import { WorkContent } from './works'

const makeWork = (kind: WorkContent['thumbnail_kind']): WorkContent => ({
  thumbnail_kind: kind,
  date: '',
  slug: '',
  title: '',
  thumbnail: '',
})

describe('helpers', () => {
  describe('masonry', () => {
    describe('chunks', () => {
      it('chunks correctly a list of arbitrary length', () => {
        expect(chunks(4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toStrictEqual([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8],
          [9, 10],
        ])
        expect(chunks(4, [1, 2, 3, 4, 5, 6, 7, 8])).toStrictEqual([
          [1, 2],
          [3, 4],
          [5, 6],
          [7, 8],
        ])
      })
    })

    describe('horizontal masonry', () => {
      it('chunks a list with an arbitrary length sorting items evenly on thumbnail_kind key', () => {
        expect(
          makeHorizontalMasonry(
            Array(4)
              .fill(makeWork('big'))
              .concat(Array(4).fill(makeWork('small')))
          )
        ).toMatchInlineSnapshot(`
          Array [
            Array [
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "big",
                "title": "",
              },
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "small",
                "title": "",
              },
            ],
            Array [
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "small",
                "title": "",
              },
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "big",
                "title": "",
              },
            ],
            Array [
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "big",
                "title": "",
              },
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "small",
                "title": "",
              },
            ],
            Array [
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "small",
                "title": "",
              },
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "big",
                "title": "",
              },
            ],
          ]
        `)
      })
    })
    describe('vertical masonry', () => {
      it('chunks a list with an arbitrary length sorting items evenly on thumbnail_kind key', () => {
        expect(
          makeVerticalMasonry(
            Array(4)
              .fill(makeWork('big'))
              .concat(Array(3).fill(makeWork('small')))
          )
        ).toMatchInlineSnapshot(`
          Array [
            Array [
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "big",
                "title": "",
              },
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "small",
                "title": "",
              },
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "big",
                "title": "",
              },
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "small",
                "title": "",
              },
            ],
            Array [
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "big",
                "title": "",
              },
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "small",
                "title": "",
              },
              Object {
                "date": "",
                "slug": "",
                "thumbnail": "",
                "thumbnail_kind": "big",
                "title": "",
              },
            ],
          ]
        `)
      })
    })
  })
})
