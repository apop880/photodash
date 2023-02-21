import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Focused on Photos',
    Svg: require('@site/static/img/album.svg').default,
    description: (
      <>
        Your pictures are front and center, whether stored locally or in Google Photos. Home controls pop up
        only when you need them to.
      </>
    ),
  },
  {
    title: 'Easy Configuration',
    Svg: require('@site/static/img/success.svg').default,
    description: (
      <>
        No fiddling with JSON or YAML files here! Everything is graphical, with tiles adjustable via drag-and-drop.
      </>
    ),
  },
  {
    title: 'Extra Features',
    Svg: require('@site/static/img/more.svg').default,
    description: (
      <>
        Actionable notifications (coming soon) and a background music player make Photodash even more useful.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
