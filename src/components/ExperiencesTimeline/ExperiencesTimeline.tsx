import React, { CSSProperties } from 'react';
import { Experience as ExperienceType } from "../../types/Experience";
import { useRevealOnScroll } from '../../utils/useRevealOnScroll';
import './style.scss'


interface ExperiencesTimelineProps {
  experiences: ExperienceType[];
  /** BCP-47 locale for the date pill (e.g. "en-US", "pt-BR"). */
  locale?: string;
}

const ExperiencesTimeline: React.FC<ExperiencesTimelineProps> = ({ experiences, locale = 'en-US' }) => {
  const { ref: listRef, visible } = useRevealOnScroll<HTMLUListElement>(0.1);

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