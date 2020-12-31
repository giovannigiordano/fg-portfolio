import { WorkContent } from '../../../lib/works'
import {
  makeHorizontalMasonry,
  makeVerticalMasonry,
} from '../../../lib/masonry'
import Item from './Items'
import { useDevice } from '../../../contexts/device'
import makeDeviceClassName from '../../../lib/makeDeviceClassName'

type Props = {
  items: WorkContent[]
}

const columnWidth = 300

const List: React.FC<Props> = (props) => {
  const device = useDevice()
  const columns =
    device.value === 'desktop'
      ? makeHorizontalMasonry(props.items)
      : makeVerticalMasonry(props.items)

  return (
    <div
      className="flex justify-center max-h-full space-x-2"
      style={device.value === 'desktop' ? { width: 300 * 5 } : undefined}
    >
      {columns.map((column, index) => {
        const isOdd = (index + 1) % 2 === 0
        return (
          <div
            key={index}
            className={makeDeviceClassName(
              ['space-y-2', isOdd && 'mt-10'].join(' '),
              'flex-1 w-1/2',
              '',
              device.value
            )}
          >
            {column.map((work) => (
              <Item
                key={work.title}
                img={{ alt: work.title, src: work.thumbnail }}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default List
