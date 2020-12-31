import { WorkContent } from '../../../lib/works'
import makeMasonry from '../../../lib/masonry'
import Item from './Items'

type Props = {
  items: WorkContent[]
}

const columnWidth = 300

const List: React.FC<Props> = (props) => {
  const columns = makeMasonry(props.items)

  return (
    <div
      className="flex justify-center max-h-full space-x-2"
      style={{ width: 300 * 5 }}
    >
      {columns.map((column, index) => (
        <div key={index} className="space-y-2 ">
          {column.map((work) => (
            <Item
              key={work.title}
              img={{ alt: work.title, src: work.thumbnail }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default List
