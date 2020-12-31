import makeMasonry, {chunks} from "./masonry";
import {WorkContent} from "./works";

const makeWork = (kind: WorkContent["thumbnail_kind"]): WorkContent => ({
  thumbnail_kind: kind,
  date: "",
  slug: "",
  title: "",
  thumbnail: "",
});

describe("helpers", () => {
  describe("masonry", () => {
    it("chunks correctly a list of arbitrary length", () => {
      expect(chunks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4)).toStrictEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8],
        [9, 10],
      ]);
      expect(chunks([1, 2, 3, 4, 5, 6, 7, 8], 4)).toStrictEqual([
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ]);
    });

    it("chunks a list with an arbitrary lenth sorting items evenly on thumbnail_kind key", () => {
      expect(
        makeMasonry(
          Array(3)
            .fill(makeWork("big"))
            .concat(Array(3).fill(makeWork("small")))
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
          ],
          Array [
            Object {
              "date": "",
              "slug": "",
              "thumbnail": "",
              "thumbnail_kind": "small",
              "title": "",
            },
          ],
        ]
      `);
    });
  });
});
