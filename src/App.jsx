import React from 'react';
import Gallery from './components/Gallery.jsx';
import { photoUrl } from './gallery.js';
import { researchProjects, publications, milestones } from './data.js';

const email = 's20502004834@nu.ac.bd';

const navigation = [
  ['about', 'About'],
  ['publications', 'Publications'],
  ['research', 'Research'],
  ['experience', 'Experience'],
  ['gallery', 'Photos'],
  ['contact', 'Contact'],
];

function Header() {
  return (
    <header className="site-header" id="top">
      <div className="site-shell header-inner">
        <a className="site-name" href="#top">Md Sazzad Hossain</a>
        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
      </div>
    </header>
  );
}

function Introduction() {
  const portrait = photoUrl('about') || photoUrl('portrait') || 'https://avatars.githubusercontent.com/u/183905160?v=4';
  return (
    <section className="intro" id="about" aria-labelledby="page-title">
      <div className="intro-copy">
        <p className="role-label">Computer Science &amp; Engineering · Research</p>
        <h1 id="page-title">Md Sazzad Hossain</h1>
        <p className="affiliation">Institute of Science &amp; Technology (IST)<br />National University, Bangladesh</p>
        <p>
          I am an early-career researcher interested in <strong>computer vision, deep learning,
          and reliable machine learning</strong>. My work has included underwater image recognition
          and evaluation of image classification systems. I am currently developing a research
          interest in <strong>thermal infrared satellite remote sensing</strong> and land surface temperature.
        </p>
        <p>
          I have completed the academic requirements for a B.Sc. in Computer Science and
          Engineering; my final results are pending. Alongside research, I have been active
          in competitive programming, teaching, and student-led technical activities.
        </p>
        <div className="profile-links" aria-label="Profile links">
          <a href={`mailto:${email}`}>Email</a>
          <a href="https://github.com/1sazzad" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/m-sazzad-h/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <figure className="profile-portrait">
        <img src={portrait} alt="Portrait of Md Sazzad Hossain" />
      </figure>
    </section>
  );
}

function Publications() {
  return (
    <section className="content-section" id="publications" aria-labelledby="publications-title">
      <h2 id="publications-title">Publications &amp; preprints</h2>
      <p className="section-lead">Selected research works. Conference acceptances are listed separately from journal or proceedings publication.</p>
      <ol className="publication-list">
        {publications.map((item) => (
          <li key={item.venue} className="publication-item">
            <span className="item-year">{item.year}</span>
            <div>
              <p className="publication-subject">{item.subject}</p>
              <p className="item-meta">{item.venue} <span aria-hidden="true">·</span> <span className="status-text">{item.status}</span></p>
            </div>
          </li>
        ))}
      </ol>
      <p className="editorial-note">Full bibliographic details and publication links will be added when confirmed. “Accepted” does not mean the proceedings paper has already appeared online.</p>
    </section>
  );
}

function Research() {
  return (
    <section className="content-section" id="research" aria-labelledby="research-title">
      <h2 id="research-title">Research</h2>
      <p className="section-lead">My main interests are computer vision, model evaluation, and the application of machine learning to Earth observation.</p>
      <div className="research-list">
        {researchProjects.map((project) => (
          <article className="research-item" key={project.id}>
            <h3>{project.title}</h3>
            <p className="item-meta">{project.categoryLabel} <span aria-hidden="true">·</span> {project.status}</p>
            <p>{project.summary}</p>
            <details>
              <summary>Research question and methods</summary>
              <div className="research-details">
                <p><strong>Question:</strong> {project.question}</p>
                <p><strong>Methods:</strong> {project.approach.join(' · ')}</p>
              </div>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="content-section" id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Academic activities &amp; experience</h2>
      <div className="experience-list">
        {milestones.map((item) => (
          <article className="experience-item" key={item.heading}>
            <span className="item-year">{item.year}</span>
            <div><h3>{item.heading}</h3><p>{item.body}</p></div>
          </article>
        ))}
      </div>
      <h3 className="subsection-title">Selected recognition</h3>
      <ul className="recognition-list">
        <li>Two-time ICPC Dhaka Regional participant</li>
        <li>Programming Combat champion (2022)</li>
        <li>Battle of Brains, second runner-up (2024)</li>
        <li>Poster presentation championship</li>
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section className="content-section contact-section" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact</h2>
      <p>I welcome academic discussions and inquiries about research collaboration.</p>
      <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
      <p><a href="https://github.com/1sazzad" target="_blank" rel="noopener noreferrer">GitHub</a> <span className="link-divider">/</span> <a href="https://www.linkedin.com/in/m-sazzad-h/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" className="site-shell">
        <Introduction />
        <Publications />
        <Research />
        <Experience />
        <Gallery />
        <Contact />
      </main>
      <footer className="site-shell site-footer">
        <span>© {new Date().getFullYear()} Md Sazzad Hossain</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
