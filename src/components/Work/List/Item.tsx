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
    <style jsx>{`
      img {
        cursor: pointer;
        transition: filter 200ms;
      }
      img:not(:hover) {
        filter: grayscale(1);
      }
    `}</style>
  </div>
)

export default Item
