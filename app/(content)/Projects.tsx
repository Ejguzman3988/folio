import { projects } from "./lib_projects";
import styles from "./Projects.module.scss";

const Projects = () => {
  return (
    <section className={styles.projects}>
      {projects.map((p, idx) => (
        <div key={idx} className={styles.row}>
          <div>{p.name}</div>
          <div>{p.link.name}</div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
