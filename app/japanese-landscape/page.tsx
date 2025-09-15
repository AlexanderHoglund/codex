import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

const leafVariants = [
  styles.leafOne,
  styles.leafTwo,
  styles.leafThree,
  styles.leafFour,
  styles.leafFive,
  styles.leafSix,
];

const leaves = Array.from({ length: 12 }, (_, index) => ({
  id: `leaf-${index}`,
  className: leafVariants[index % leafVariants.length],
}));

export const metadata: Metadata = {
  title: "Stormy Kyoto Pixel Garden",
  description:
    "An animated pixel diorama of a Japanese garden with wind, rain, and drifting leaves.",
};

export default function JapaneseLandscapePage() {
  return (
    <main className={styles.page}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Stormy Kyoto Pixel Garden</h1>
        <p className={styles.subtitle}>
          A looping pixel diorama inspired by temple courtyards in Kyoto. Wind ripples through
          bonsai-like trees while sheets of rain streak past the torii gate and ceramic tiles.
          Falling leaves glide across the scene to emphasize the blustery weather.
        </p>
        <div
          className={styles.scene}
          role="img"
          aria-label="Animated pixel art landscape of a Japanese courtyard with rain, wind, and drifting leaves"
        >
          <div className={styles.sky} />
          <div className={styles.mountainRange}>
            <span className={`${styles.mountain} ${styles.mountainLeft}`} />
            <span className={`${styles.mountain} ${styles.mountainCenter}`} />
            <span className={`${styles.mountain} ${styles.mountainRight}`} />
          </div>
          <div className={styles.ground} />
          <div className={styles.path} />
          <div className={styles.torii}>
            <span className={styles.topBeam} />
            <span className={`${styles.pillar} ${styles.pillarLeft}`} />
            <span className={`${styles.pillar} ${styles.pillarRight}`} />
            <span className={styles.middleBeam} />
            <span className={styles.base} />
          </div>
          <div className={`${styles.treeWrapper} ${styles.treeFar}`}>
            <div className={styles.tree}>
              <span className={styles.canopy} />
              <span className={styles.trunk} />
            </div>
          </div>
          <div className={`${styles.treeWrapper} ${styles.treeLeft}`}>
            <div className={styles.tree}>
              <span className={styles.canopy} />
              <span className={styles.trunk} />
            </div>
          </div>
          <div className={`${styles.treeWrapper} ${styles.treeRight}`}>
            <div className={styles.tree}>
              <span className={styles.canopy} />
              <span className={styles.trunk} />
            </div>
          </div>
          <div className={`${styles.rain} ${styles.rainBack}`} />
          <div className={`${styles.rain} ${styles.rainFront}`} />
          <div className={styles.wind} />
          <div className={styles.leafStream}>
            {leaves.map((leaf) => (
              <span key={leaf.id} className={`${styles.leaf} ${leaf.className}`} />
            ))}
          </div>
        </div>
        <Link className={styles.backLink} href="/">
          <span aria-hidden>←</span> Back to the canvas sketch
        </Link>
      </div>
    </main>
  );
}
