import { WorkContent } from '../../../lib/works'

type Props = {
  img: {
    alt: string
    src: string
  }
}

const Item: React.FC<Props> = (props) => (
  <div>
    <img alt={props.img.alt} src={props.img.src} />
  </div>
)

export default Item
