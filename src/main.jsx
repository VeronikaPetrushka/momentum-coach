import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Dumbbell,
  Flame,
  Globe2,
  Instagram,
  Menu,
  Moon,
  Play,
  ShoppingBag,
  Sun,
  Timer,
  TrendingUp,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import "./styles.css";
import { copy, imgs } from "./content.js";

function Countdown({ labels }) {
  const [left, setLeft] = useState(232931);

  useEffect(() => {
    const id = setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const values = [
    Math.floor(left / 86400),
    Math.floor((left % 86400) / 3600),
    Math.floor((left % 3600) / 60),
    left % 60,
  ];

  return (
    <div className="countdown">
      {values.map((value, index) => (
        <div key={labels[index]}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}

function Result({ item, image, t }) {
  const [split, setSplit] = useState(50);

  return (
    <article className="result-card" data-reveal>
      <div className="compare" style={{ "--split": `${split}%` }}>
        <img
          src={`${import.meta.env.BASE_URL}${image[0].replace(/^\//, "")}`}
          alt={`${item[0]} before transformation`}
        />

        <div className="after">
          <img
            src={`${import.meta.env.BASE_URL}${image[1].replace(/^\//, "")}`}
            alt={`${item[0]} after transformation`}
          />
        </div>

        <i />
        <span className="compare-label compare-label--before">{t.before}</span>
        <span className="compare-label compare-label--after">{t.after}</span>

        <input
          type="range"
          min="10"
          max="90"
          value={split}
          onChange={(event) => setSplit(event.target.value)}
          aria-label={`${item[0]} before and after comparison`}
        />
      </div>

      <div className="result-card__body">
        <div>
          <span>{item[2]}</span>
          <h3>{item[0]}</h3>
        </div>
        <strong>{item[1]}</strong>
        <p>“{item[3]}”</p>
      </div>
    </article>
  );
}

function App() {
  const [lang, setLang] = useState(localStorage.getItem("m-lang") || "en");
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("m-theme");
    return saved ? saved === "dark" : true;
  });
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [faq, setFaq] = useState(0);
  const [activeProgram, setActiveProgram] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const heroRef = useRef(null);

  const t = copy[lang];

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("m-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("m-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element, index) => {
      element.style.setProperty("--delay", `${Math.min(index, 10) * 55}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [lang]);

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const handleHeroMove = (event) => {
    const box = heroRef.current?.getBoundingClientRect();
    if (!box) return;

    setSpotlight({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    });
  };

  const currentProgram = useMemo(
    () => t.programs[activeProgram],
    [activeProgram, t.programs]
  );

  return (
    <>
      <header className="site-header">
        <button className="brand" onClick={() => scroll("top")}>
          <span>MO</span>
          <div>
            <b>MENTUM</b>
            <small>PERFORMANCE LAB</small>
          </div>
        </button>

        <nav id="mobile-navigation" className={menu ? "open" : ""}>
          {t.nav.map((label, index) => (
            <button
              key={label}
              onClick={() =>
                scroll(["programs", "results", "guides", "about"][index])
              }
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="actions">
          <label>
            <Globe2 size={16} />
            <select value={lang} onChange={(event) => setLang(event.target.value)}>
              <option value="en">EN</option>
              <option value="pl">PL</option>
              <option value="uk">UA</option>
            </select>
          </label>

          <button onClick={() => setDark((value) => !value)} aria-label="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="menu"
            type="button"
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu((value) => !value)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="top">
        <section
          className="performance-hero"
          ref={heroRef}
          onMouseMove={handleHeroMove}
          style={{
            "--spot-x": `${spotlight.x}%`,
            "--spot-y": `${spotlight.y}%`,
          }}
        >
          <div className="performance-hero__grid" aria-hidden="true" />

          <div className="performance-hero__copy">
            <span className="eyebrow">{t.kicker}</span>
            <h1>{t.title}</h1>
            <p>{t.text}</p>

            <div className="hero-actions">
              <button className="button button--primary" onClick={() => setModal(true)}>
                {t.start}
                <ArrowRight size={18} />
              </button>

              <button className="button button--ghost" onClick={() => scroll("results")}>
                <Play size={17} />
                {t.stories}
              </button>
            </div>

            <div className="hero-metrics">
              {["350+", "32", "14", "4.9★"].map((value, index) => (
                <article key={value}>
                  <span>0{index + 1}</span>
                  <strong>{value}</strong>
                  <small>{t.stats[index]}</small>
                </article>
              ))}
            </div>
          </div>

          <div className="performance-hero__visual">
            <div className="trainer-frame">
              <img
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1500&q=90"
                alt="Personal trainer"
              />

              <div className="trainer-frame__scan" />

              <div className="data-card data-card--rating">
                <span>CLIENT SCORE</span>
                <strong>4.9</strong>
                <small>★★★★★</small>
              </div>

              <div className="data-card data-card--session">
                <Flame />
                <div>
                  <span>LIVE COACHING</span>
                  <strong>32 active</strong>
                </div>
              </div>

              <div className="pulse-ring" aria-hidden="true">
                <i />
                <span>LIVE</span>
              </div>
            </div>
          </div>

          <button className="scroll-cue" onClick={() => scroll("system")}>
            <span>SCROLL TO SYSTEM</span>
            <ArrowDown size={16} />
          </button>
        </section>

        <section className="system-console" id="system">
          <div className="system-console__intro" data-reveal>
            <span className="eyebrow">THE METHOD</span>
            <h2>{t.methodTitle}</h2>
            <p>{t.methodText}</p>
          </div>

          <div className="system-console__steps">
            {t.steps.map((step, index) => (
              <article key={step[0]} data-reveal>
                <div className="step-orbit">
                  <span>{step[0]}</span>
                  <i />
                </div>
                <div>
                  <small>PHASE {String(index + 1).padStart(2, "0")}</small>
                  <h3>{step[1]}</h3>
                  <p>{step[2]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="program-console" id="programs">
          <div className="program-console__rail" data-reveal>
            <span className="eyebrow">PROGRAM SELECTOR</span>
            <h2>{t.programTitle}</h2>

            <div className="program-tabs">
              {t.programs.map((program, index) => (
                <button
                  key={program[0]}
                  className={activeProgram === index ? "active" : ""}
                  onClick={() => setActiveProgram(index)}
                >
                  <span>0{index + 1}</span>
                  <strong>{program[0]}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="program-console__display" data-reveal>
            <div className="program-console__topline">
              <span>{currentProgram[1]}</span>
              <strong>{currentProgram[3]}</strong>
            </div>

            <h3>{currentProgram[0]}</h3>
            <p>{currentProgram[2]}</p>

            <div className="program-specs">
              <div><Zap /><span>Structured weekly progression</span></div>
              <div><Timer /><span>Clear schedule and check-ins</span></div>
              <div><TrendingUp /><span>Progress data and plan updates</span></div>
            </div>

            <button className="button button--primary" onClick={() => setModal(true)}>
              {currentProgram[4]}
              <ArrowRight size={18} />
            </button>
          </div>

          <aside className="program-console__index" data-reveal>
            <span>{String(activeProgram + 1).padStart(2, "0")}</span>
            <small>OF 04</small>
          </aside>
        </section>

        <section className="launch-window">
          <div className="launch-window__signal" data-reveal>
            <span>{t.offer}</span>
            <strong>25%</strong>
            <b>OFF</b>
          </div>

          <div className="launch-window__copy" data-reveal>
            <h2>{t.discount}</h2>
            <p>{t.discountText}</p>
            <button onClick={() => setModal(true)}>
              {t.claim}
              <ArrowRight size={18} />
            </button>
          </div>

          <Countdown labels={t.timer} />
        </section>

        <section className="results-lab" id="results">
          <header className="results-lab__head" data-reveal>
            <div>
              <span className="eyebrow">RESULTS LAB</span>
              <h2>{t.resultsTitle}</h2>
            </div>
            <p>{t.resultsText}</p>
          </header>

          <div className="results-track">
            {t.storiesData.map((story, index) => (
              <Result key={story[0]} item={story} image={imgs[index]} t={t} />
            ))}
          </div>
        </section>

        <section className="roadmap" data-reveal>
          <div className="roadmap__copy">
            <span className="eyebrow">YOUR ROADMAP</span>
            <h2>{t.progressTitle}</h2>
            <p>{t.progressText}</p>
          </div>

          <div className="roadmap__timeline">
            {t.progress.map((point, index) => (
              <article key={point[0]}>
                <div className="roadmap__marker">
                  <span>0{index + 1}</span>
                  <i />
                </div>

                <div>
                  <small>{point[0]}</small>
                  <h3>{point[1]}</h3>
                </div>

                <strong>{point[2]}%</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="guide-store" id="guides">
          <header data-reveal>
            <div>
              <span className="eyebrow">DIGITAL TOOLKIT</span>
              <h2>{t.guidesTitle}</h2>
            </div>
            <p>{t.guidesText}</p>
          </header>

          <div className="guide-store__grid">
            {t.guides.map((guide, index) => (
              <article key={guide[0]} data-reveal>
                <div className={`guide-cover guide-cover--${index + 1}`}>
                  <span>GUIDE 0{index + 1}</span>
                  {[<Dumbbell />, <UsersRound />, <Flame />][index]}
                  <b>MO</b>
                </div>

                <div className="guide-copy">
                  <span>{guide[2]}</span>
                  <h3>{guide[0]}</h3>
                  <p>{guide[1]}</p>

                  <button onClick={() => setModal(true)}>
                    <ShoppingBag size={17} />
                    {t.programs[3][4]}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="coach-dossier" id="about">
          <div className="coach-dossier__image" data-reveal>
            <img
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1400&q=90"
              alt="Coach Alex"
            />
            <div className="coach-dossier__badge">
              <UsersRound />
              <strong>350+</strong>
              <span>clients coached</span>
            </div>
          </div>

          <div className="coach-dossier__copy" data-reveal>
            <span className="eyebrow">COACH PROFILE</span>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutText}</p>

            <div className="credentials">
              {[
                "Strength & conditioning",
                "Nutrition guidance",
                "Habit coaching",
                "Online & in-person",
              ].map((item, index) => (
                <span key={item}>
                  <b>0{index + 1}</b>
                  <Check />
                  {item}
                </span>
              ))}
            </div>

            <button className="button button--primary" onClick={() => setModal(true)}>
              {t.start}
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-section__title" data-reveal>
            <span className="eyebrow">FAQ DATABASE</span>
            <h2>{t.faqTitle}</h2>
          </div>

          <div className="faq-list" data-reveal>
            {t.faqs.map((item, index) => (
              <article className={faq === index ? "open" : ""} key={item[0]}>
                <button onClick={() => setFaq(faq === index ? -1 : index)}>
                  <span>0{index + 1}</span>
                  <b>{item[0]}</b>
                  <ChevronDown />
                </button>
                <div>
                  <p>{item[1]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <div className="sticky-action">
        <div>
          <span>STATUS</span>
          <strong>{t.sticky}</strong>
        </div>

        <button onClick={() => setModal(true)}>
          {t.stickyBtn}
          <ArrowRight size={17} />
        </button>
      </div>

      <footer>
        <div className="brand">
          <span>MO</span>
          <div>
            <b>MENTUM</b>
            <small>PERFORMANCE LAB</small>
          </div>
        </div>

        <p>Personal coaching, group programs and practical fitness guides.</p>

        <div>
          <a href="#top">Instagram <Instagram size={16} /></a>
          <a href="#top">TikTok</a>
          <a href="#top">YouTube</a>
        </div>
      </footer>

      {modal && (
        <div className="backdrop" onMouseDown={() => setModal(false)}>
          <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
            <button className="close" onClick={() => setModal(false)}>
              <X />
            </button>

            <span className="eyebrow">FREE CONSULTATION</span>
            <h2>{t.modalTitle}</h2>
            <p>{t.modalText}</p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.currentTarget.querySelector("button[type=submit]").textContent = "✓";
              }}
            >
              <label>
                {t.name}
                <input required />
              </label>

              <label>
                {t.email}
                <input type="email" required />
              </label>

              <label>
                {t.goal}
                <textarea rows="4" required />
              </label>

              <button className="button button--primary" type="submit">
                {t.send}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
