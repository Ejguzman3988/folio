import styles from "./Folio.module.scss";
import Intro from "./Intro";
import Projects from "./Projects";

const Folio = () => {
  return (
    <div className={styles.folio}>
      <Intro />
      <Projects />
    </div>
  );
};

export default Folio;
