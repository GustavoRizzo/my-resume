import React from 'react';
import { Experience as ExperienceType } from "../../types/Experience";
import './style.scss'


interface ExperiencesTimelineProps {
  experiences: ExperienceType[];
}

const ExperiencesTimeline: React.FC<ExperiencesTimelineProps> = ({ experiences }) => {
  const formattedDate = (str_date: string) => {
    const dateObj = new Date(str_date);
    const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = dateObj.getFullYear();
    return `${month} ${year}`;
  };
  return (
    <div className="rb-container">
      <ul className="rb">
        {experiences.map((experience) => (
          <li className="rb-item" key={`${experience.title}-${experience.initial_date}`}>
            <a className="company-logo"
              style={{ backgroundImage: `url(${experience.company_logo})` }}
              href={experience.company_url} target="_blank" rel="noreferrer"
              ></a>
            <div className="paragraph">
              <div className="title">{experience.title} - <span className='intial-date'>{formattedDate(experience.initial_date)}</span></div>
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