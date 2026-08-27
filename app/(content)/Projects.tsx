import React from "react";
import styles from "./Projects.module.scss";
import { projects } from "./projects";

const Projects = (props: Props) => {
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
