import styles from "./DeleteEvent.module.scss";
import { deleteEventsapi } from "../../../../../api/eventService";

interface Props {
  id: number | undefined;
}
export default function DeleteEvent({ id }: Props) {
  return (
    <div
      onClick={() => {
        deleteEventsapi({ id });
      }}
      className={styles.div_contaner}
    ></div>
  );
}
