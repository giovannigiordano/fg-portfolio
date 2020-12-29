import {format, formatISO} from "date-fns";

type Props = {
  date: Date;
};
const Date: React.FC<Props> = props => (
  <time dateTime={formatISO(props.date)}>
    <span>{format(props.date, "LLLL d, yyyy")}</span>
    <style jsx>
      {`
          span {
            color: #9b9b9b;
          }
        `}
    </style>
  </time>
);

export default Date
