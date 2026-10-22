import React, { useEffect, useState } from 'react';
import TopicCarousel from './components/TopicCarousel.jsx';
import Gallery from './components/Gallery.jsx';
import { photoUrl } from './gallery.js';
import { researchProjects, publications, milestones } from './data.js';
import { pages, pageFromHash, pageHref } from './routes.js';

function Navigation({ page }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onEscape(event) { if (event.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);
  useEffect(() => { setOpen(false); }, [page]);
  const menuLinks = pages.filter((item) => item.id !== 'contact');
  return <header className={'site-header page-site-header ' + (open ? 'menu-open' : '')} id="top"><div className="container nav-inner"><a className="wordmark" href={pageHref('home')} onClick={() => setOpen(false)}>sazzad<span className="wordmark-dot">.</span></a><nav className="desktop-nav" aria-label="Primary navigation">{menuLinks.map((item) => <a key={item.id} href={pageHref(item.id)} aria-current={page === item.id ? 'page' : undefined}>{item.label}</a>)}</nav><div className="nav-actions"><a className="nav-contact" href={pageHref('contact')} aria-current={page === 'contact' ? 'page' : undefined}>Let's connect <span aria-hidden="true">↗</span></a><button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><span></span><span></span></button></div></div><nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden={!open}>{pages.map((item) => <a key={item.id} href={pageHref(item.id)} aria-current={page === item.id ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">↗</span></a>)}</nav></header>;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let scheduled = false;
    const update = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(distance > 0 ? Math.min(100, window.scrollY / distance * 100) : 0);
        scheduled = false;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <div className="page-progress" style={{ width: progress + '%' }} aria-hidden="true" />;
}

function Hero() {
  const portrait = photoUrl('portrait');
  return <section className="hero section-dark" aria-labelledby="hero-heading"><div className="container hero-grid"><div className="hero-copy"><div className="availability"><span className="pulse-dot" aria-hidden="true"></span> Open to research collaborations</div><p className="eyebrow hero-eyebrow">Researcher <span className="slash">/</span> Builder <span className="slash">/</span> Lifelong learner</p><h1 id="hero-heading">Driven by<br /><em>curiosity.</em><br />Built with <span className="outline-word">purpose.</span></h1><p className="hero-intro">I'm <strong>Md Sazzad Hossain</strong> — exploring how intelligent systems can see, understand, and make sense of our world.</p><div className="hero-buttons"><a className="button button-lime" href={pageHref('research')}>Explore my work <span aria-hidden="true">↗</span></a><a className="text-link hero-link" href={pageHref('about')}>More about me <span aria-hidden="true">↗</span></a></div></div><div className="hero-visual" aria-label="Portrait and research identity"><div className="hero-visual-lines" aria-hidden="true"><span></span><span></span><span></span></div><div className="hero-portrait-frame"><img className="hero-portrait" src={portrait || 'https://avatars.githubusercontent.com/u/183905160?v=4'} alt="Md Sazzad Hossain" />{!portrait && <div className="portrait-replace-note">PHOTO SLOT <strong>portrait.jpg</strong></div>}</div><div className="hero-visual-label"><span className="tiny-cross">✳</span> Bangladesh <span className="label-spacer"></span> Research · Code · Community</div><div className="orbit orbit-one" aria-hidden="true"></div><div className="orbit orbit-two" aria-hidden="true"></div><div className="hero-sticker"><span>Always<br />in motion</span>↗</div></div></div><div className="hero-foot container"><span>01 / INTRODUCTION</span><span className="scroll-note">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div></section>;
}

function Marquee() {
  const labels = ['COMPUTER VISION', 'DEEP LEARNING', 'THERMAL INFRARED', 'REMOTE SENSING', 'RESEARCH'];
  return <div className="discipline-strip"><div className="strip-track" aria-hidden="true">{[...labels, ...labels].map((label, index) => <React.Fragment key={label + index}><span>{label}</span><b>✳</b></React.Fragment>)}</div></div>;
}

const pageIntroductions = {
  about: { number: '01', label: 'The person', title: 'More than the work.', detail: 'The curiosity, education, and communities shaping my path.' },
  research: { number: '02', label: 'Research & publications', title: 'Following the questions.', detail: 'A closer look at my computer vision research and new directions in Earth observation.' },
  journey: { number: '03', label: 'Experience & milestones', title: 'Learning by doing.', detail: 'Competitive programming, community leadership, teaching, and the moments in between.' },
  gallery: { number: '04', label: 'The photo archive', title: 'Stories in frames.', detail: 'Browse event collections, read photo descriptions, and explore each image up close.' },
  contact: { number: '05', label: 'Get in touch', title: 'Start a conversation.', detail: 'Research collaborations, learning opportunities, or an idea you would like to explore together.' },
};

function PageIntroduction({ page }) {
  const content = pageIntroductions[page];
  return <section className="page-introduction section-dark" aria-label={content.label}><div className="container page-intro-inner"><div><p className="eyebrow"><span className="intro-number">{content.number}</span> / {content.label}</p><h1>{content.title}</h1></div><p>{content.detail}</p></div><div className="page-intro-line container"><span>MD SAZZAD HOSSAIN</span><span>EXPLORE <span aria-hidden="true">↓</span></span></div></section>;
}

const homeFeatures = [
  { page: 'research', kicker: '01 / THE QUESTIONS', title: 'Research & discovery', copy: 'Computer vision, robust recognition, and the growing possibilities of satellite thermal infrared.' },
  { page: 'journey', kicker: '02 / THE EXPERIENCE', title: 'People & progress', copy: 'From the ICPC regional stage to teaching and leading a campus programming community.' },
  { page: 'gallery', kicker: '03 / THE MOMENTS', title: 'The visual journal', copy: 'Photographs, event collections, and the stories behind the milestones.' },
];

function HomeOverview() {
  return <section className="section home-overview" aria-labelledby="home-overview-heading"><div className="container"><div className="home-overview-top"><div><p className="section-kicker">A LITTLE OF EVERYTHING</p><h2 id="home-overview-heading">Different paths.<br /><em>One curiosity.</em></h2></div><p>Explore the work, experiences, and photographs in their own spaces. Every part of this portfolio has a story to tell.</p></div><div className="home-feature-grid">{homeFeatures.map((item) => <a key={item.page} className={'home-feature-card home-feature-' + item.page} href={pageHref(item.page)}><span className="home-feature-kicker">{item.kicker}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><span className="home-feature-link">Explore {item.page} <span aria-hidden="true">↗</span></span></a>)}</div><div className="home-closer"><p>Currently exploring thermal infrared Earth observation and welcoming thoughtful research collaborations.</p><a href={pageHref('contact')}>Let's talk <span aria-hidden="true">↗</span></a></div></div></section>;
}

function About() {
  return <section className="section about-section" id="about" aria-labelledby="about-heading"><div className="container about-grid"><div className="section-label"><span className="index-bubble">01</span> THE PERSON BEHIND THE WORK</div><div className="about-main"><h2 id="about-heading">A researcher at heart.<br /><span className="muted-heading">A maker by instinct.</span></h2><p className="large-copy">I work at the intersection of <strong>computer vision, machine learning, and scientific discovery</strong>. My journey has taken me from underwater imagery and model reliability to a growing focus on thermal infrared Earth observation.</p><p>I've completed the academic requirements for my B.Sc. in Computer Science and Engineering at the Institute of Science & Technology (IST), affiliated with National University, Bangladesh. My final results are pending.</p><p>Beyond research, I enjoy teaching, competitive programming, and building communities where people learn by doing.</p><div className="quick-facts"><div><span className="fact-number">02<span>×</span></span><span className="fact-caption">ICPC Dhaka<br />Regional participant</span></div><div><span className="fact-number">03<span>+</span></span><span className="fact-caption">Accepted conference<br />research works*</span></div><div><span className="fact-number">01<span>→</span></span><span className="fact-caption">Continuing journey<br />of discovery</span></div></div><p className="fact-note">*Accepted work at AII 2026, ITT 2026, and CoMeSySo 2026. Final publication details to be verified.</p></div></div></section>;
}

function Research() {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const filters = [{ id: 'all', label: 'All research' }, { id: 'vision', label: 'Computer vision' }, { id: 'earth', label: 'Earth observation' }];
  const visible = researchProjects.filter((project) => filter === 'all' || project.category === filter);
  return <section className="section research-section" id="research" aria-labelledby="research-heading"><div className="container"><div className="section-top"><div><p className="section-kicker"><span className="index-bubble">02</span> SELECTED AREAS</p><h2 id="research-heading">Questions worth<br /><em>exploring.</em></h2></div><p className="section-intro">Choose a research area, expand a project, and see the question behind the experiments.</p></div><div className="research-tabs" role="group" aria-label="Filter research projects">{filters.map((item) => <button key={item.id} type="button" className={filter === item.id ? 'active' : ''} aria-pressed={filter === item.id} onClick={() => { setFilter(item.id); setExpanded(null); }}>{item.label}</button>)}</div><div className="research-grid react-research-grid">{visible.map((project) => <article key={project.id} className={'research-card react-research-card theme-' + project.id}><div className="research-card-top"><span>{project.number} / {project.categoryLabel.toUpperCase()}</span><span className="card-arrow" aria-hidden="true">↗</span></div><TopicCarousel stem={project.image} title={project.categoryLabel + ' image'} className={'research-illustration research-photo ' + project.id + '-art'} /><div className="research-content"><span className="research-state">{project.status}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button type="button" className="project-detail-trigger" aria-expanded={expanded === project.id} aria-controls={'project-details-' + project.id} onClick={() => setExpanded(expanded === project.id ? null : project.id)}>{expanded === project.id ? 'Hide research approach' : 'Explore research approach'} <span aria-hidden="true">{expanded === project.id ? '−' : '+'}</span></button>{expanded === project.id && <div id={'project-details-' + project.id} className="project-detail"><span>RESEARCH QUESTION</span><p>{project.question}</p><span>APPROACH</span><ul>{project.approach.map((part) => <li key={part}>{part}</li>)}</ul></div>}</div></article>)}</div><div className="publication-panel"><div><p className="mini-label">RESEARCH RECORD</p><h3>Publications &<br />scholarly work<span className="accent-dot">.</span></h3><p className="pub-aside">Accepted conference work and an independently posted preprint.</p></div><div className="publication-list">{publications.map((item) => <div className="publication-row" key={item.venue}><div><span className="pub-year">{item.year}</span><h4>{item.venue}</h4><p>{item.subject}</p></div><span className={'status-pill ' + (item.status === 'Preprint' ? 'status-outline' : '')}>{item.status}</span></div>)}<p className="pub-note">Final titles, DOIs, and proceedings links will be included when publication metadata is confirmed.</p></div></div></div></section>;
}

function Journey() {
  return <section className="section journey-section" id="journey" aria-labelledby="journey-heading"><div className="container"><div className="section-top journey-top"><div><p className="section-kicker"><span className="index-bubble">03</span> BEYOND THE LAB</p><h2 id="journey-heading">Learning. Leading.<br /><em>Showing up.</em></h2></div><p className="section-intro">Each milestone can now hold a collection of photographs. Visitors can explore the slides without leaving the page.</p></div><div className="journey-photo-grid">{milestones.map((item, index) => <article key={item.photo} className="journey-photo-card"><TopicCarousel stem={item.photo} title={item.heading} className="journey-photo" /><div className="journey-photo-copy"><span>{String(index + 1).padStart(2, '0')} / {item.year}</span><h3>{item.heading}</h3><p>{item.body}</p></div></article>)}</div><div className="awards-strip"><p className="eyebrow">SELECTED MILESTONES</p><div><strong>2022</strong><span>Programming Combat champion</span></div><div><strong>2024</strong><span>Battle of Brains second runner-up</span></div><div><strong>2025–26</strong><span>Programming Club president</span></div><div><strong>2×</strong><span>ICPC Dhaka Regionalist</span></div></div></div></section>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 's20502004834@nu.ac.bd';
  async function copy() {
    try { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 2500); }
    catch { setCopied(false); }
  }
  return <section className="contact-section section-dark" id="contact" aria-labelledby="contact-heading"><div className="container contact-grid"><div><p className="section-kicker"><span className="index-bubble">05</span> WHAT'S NEXT?</p><h2 id="contact-heading">Let's make<br /><em>something matter.</em></h2><p>Open to meaningful research collaborations, internship opportunities, and conversations about ideas worth pursuing.</p></div><div className="contact-action"><span className="contact-small">HAVE A QUESTION OR AN IDEA?</span><a className="email-link" href={'mailto:' + email}>Say hello <span aria-hidden="true">↗</span></a><button className="copy-email" type="button" onClick={copy}>{email} <span aria-live="polite">{copied ? 'Copied ✓' : 'Copy email ↗'}</span></button><div className="contact-socials"><a href="https://github.com/1sazzad" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/m-sazzad-h/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div></div></section>;
}

function SiteFooter({ page }) {
  return <footer className="global-footer section-dark"><div className="site-footer container"><span>© {new Date().getFullYear()} Md Sazzad Hossain</span><span>MADE WITH CURIOSITY <span className="asterisk">✳</span></span><a href={pageHref(page)} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</a></div></footer>;
}

function CurrentPage({ page }) {
  if (page === 'home') return <><Hero /><Marquee /><HomeOverview /></>;
  return <><PageIntroduction page={page} />{page === 'about' && <About />}{page === 'research' && <Research />}{page === 'journey' && <Journey />}{page === 'gallery' && <Gallery />}{page === 'contact' && <Contact />}</>;
}

export default function App() {
  const [page, setPage] = useState(() => pageFromHash(window.location.hash));
  useEffect(() => {
    const onNavigation = () => setPage(pageFromHash(window.location.hash));
    window.addEventListener('hashchange', onNavigation);
    return () => window.removeEventListener('hashchange', onNavigation);
  }, []);
  useEffect(() => {
    const current = pages.find((item) => item.id === page);
    document.title = `Md Sazzad Hossain — ${current?.title || 'Home'}`;
    window.scrollTo(0, 0);
  }, [page]);
  return <><ScrollProgress key={page} /><a className="skip-link" href="#main" onClick={(event) => { event.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a><Navigation page={page} /><main id="main" key={page} tabIndex="-1"><CurrentPage page={page} /></main><SiteFooter page={page} /></>;
}
