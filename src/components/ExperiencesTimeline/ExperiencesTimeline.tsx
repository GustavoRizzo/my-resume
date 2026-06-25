import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Experience as ExperienceType } from "../../types/Experience";
import './style.scss'


interface ExperiencesTimelineProps {
  experiences: ExperienceType[];
  /** BCP-47 locale for the date pill (e.g. "en-US", "pt-BR"). */
  locale?: string;
}

const ExperiencesTimeline: React.FC<ExperiencesTimelineProps> = ({ experiences, locale = 'en-US' }) => {
  const listRef = useRef<HTMLUListElement>(null);
  // Fallback for environments without IntersectionObserver (e.g. jsdom): start revealed.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = listRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const formattedDate = (str_date: string) => {
    const dateObj = new Date(str_date);
    const month = dateObj.toLocaleString(locale, { month: 'short' }).toUpperCase();
    const year = dateObj.getFullYear();
    return `${month} ${year}`;
  };
  return (
    <div className="rb-container">
      <ul ref={listRef} className={`rb${visible ? ' is-visible' : ''}`}>
        {experiences.map((experience, index) => (
          <li
            className="rb-item"
            key={`${experience.title}-${experience.initial_date}`}
            style={{ '--reveal-delay': `${index * 200}ms` } as CSSProperties}
          >
            <a className="company-logo"
              style={{ backgroundImage: `url(${experience.company_logo})` }}
              href={experience.company_url} target="_blank" rel="noreferrer"
              ></a>
            <div className="paragraph">
              <span className="date-pill">{formattedDate(experience.initial_date)}</span>
              <div className="title">{experience.title}</div>
              <div className="sub-title">{experience.subtitle}</div>
              <div className="text">{experience.text}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperiencesTimeline;