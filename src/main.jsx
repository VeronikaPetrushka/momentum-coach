import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
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
  UsersRound,
  X,
} from "lucide-react";
import "./styles.css";
import { copy, imgs } from "./content.js";


function Countdown({ labels }) {
  const [left, setLeft] = useState(232931);

  useEffect(() => {
    const id = setInterval(() => setLeft((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const vals = [
    Math.floor(left / 86400),
    Math.floor((left % 86400) / 3600),
    Math.floor((left % 3600) / 60),
    left % 60,
  ];

  return (
    <div className="countdown">
      {vals.map((v, i) => (
        <div key={labels[i]}>
          <strong>{String(v).padStart(2, "0")}</strong>
          <span>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Result({ item, image, t }) {
  const [s, setS] = useState(50);

  return (
    <article className="result">
      <div className="compare" style={{ "--split": `${s}%` }}>
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
        <span className="bl">{t.before}</span>
        <span className="al">{t.after}</span>
        <input
          type="range"
          min="10"
          max="90"
          value={s}
          onChange={(e) => setS(e.target.value)}
        />
      </div>
      <div className="result-copy">
        <div>
          <strong>{item[0]}</strong>
          <span>{item[2]}</span>
        </div>
        <b>{item[1]}</b>
        <p>“{item[3]}”</p>
      </div>
    </article>
  );
}

function App() {
  const [lang, setLang] = useState(localStorage.getItem("m-lang") || "en");
  const [dark, setDark] = useState(() => {
  const saved = localStorage.getItem("theme");

    if (saved !== null) {
      return saved === "dark";
    }

    return true;
  });
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [faq, setFaq] = useState(0);

  const t = copy[lang];

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("m-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("m-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  return (
    <>
      <header>
        <button className="brand" onClick={() => scroll("top")}>
          <span>MO</span>
          <b>MENTUM</b>
        </button>

        <nav id="mobile-navigation" className={menu ? "open" : ""}>
          {t.nav.map((n, i) => (
            <button key={n} onClick={() => scroll(["programs", "results", "guides", "about"][i])}>
              {n}
            </button>
          ))}
        </nav>

        <div className="actions">
          <label>
            <Globe2 size={16} />
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="en">EN</option>
              <option value="pl">PL</option>
              <option value="uk">UA</option>
            </select>
          </label>

          <button onClick={() => setDark((v) => !v)}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="menu"
            type="button"
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="intro">
            <span>{t.kicker}</span>
            <h1>{t.title}</h1>
            <p>{t.text}</p>
            <div className="hero-buttons">
              <button className="primary" onClick={() => setModal(true)}>
                {t.start}
                <ArrowRight size={18} />
              </button>
              <button className="secondary" onClick={() => scroll("results")}>
                <Play size={17} />
                {t.stories}
              </button>
            </div>
          </div>

          <div className="coach">
            <img
              src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1400&q=90"
              alt="trainer"
            />
            <div className="rating">
              4.9
              <br />
              <small>★★★★★</small>
            </div>
            <div className="active">
              <Flame />
              32
            </div>
          </div>

          <div className="stats">
            {["350+", "32", "14", "4.9★"].map((v, i) => (
              <article key={v}>
                <strong>{v}</strong>
                <span>{t.stats[i]}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="head">
            <div>
              <span>THE METHOD</span>
              <h2>{t.methodTitle}</h2>
            </div>
            <p>{t.methodText}</p>
          </div>

          <div className="steps">
            {t.steps.map((s) => (
              <article key={s[0]}>
                <span>{s[0]}</span>
                <h3>{s[1]}</h3>
                <p>{s[2]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="programs">
          <div className="head">
            <div>
              <span>PROGRAMS</span>
              <h2>{t.programTitle}</h2>
            </div>
            <p>{t.programText}</p>
          </div>

          <div className="programs">
            {t.programs.map((p, i) => (
              <article key={p[0]}>
                <span>0{i + 1}</span>
                <div>
                  <small>{p[1]}</small>
                  <h3>{p[0]}</h3>
                </div>
                <p>{p[2]}</p>
                <strong>{p[3]}</strong>
                <button onClick={() => setModal(true)}>
                  {p[4]}
                  <ArrowRight size={17} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="offer">
          <div>
            <span>{t.offer}</span>
            <h2>{t.discount}</h2>
            <p>{t.discountText}</p>
            <button onClick={() => setModal(true)}>
              {t.claim}
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="discount">
            25%
            <b>OFF</b>
          </div>
          <Countdown labels={t.timer} />
        </section>

        <section className="section" id="results">
          <div className="head">
            <div>
              <span>TRANSFORMATIONS</span>
              <h2>{t.resultsTitle}</h2>
            </div>
            <p>{t.resultsText}</p>
          </div>

          <div className="results">
            {t.storiesData.map((s, i) => (
              <Result key={s[0]} item={s} image={imgs[i]} t={t} />
            ))}
          </div>
        </section>

        <section className="section progress">
          <div>
            <span>YOUR ROADMAP</span>
            <h2>{t.progressTitle}</h2>
            <p>{t.progressText}</p>
          </div>

          <div className="progress-list">
            {t.progress.map((p) => (
              <article key={p[0]}>
                <div>
                  <strong>{p[0]}</strong>
                  <span>{p[1]}</span>
                </div>
                <div className="track">
                  <i style={{ width: `${p[2]}%` }} />
                </div>
                <b>{p[2]}%</b>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="guides">
          <div className="head">
            <div>
              <span>DIGITAL PRODUCTS</span>
              <h2>{t.guidesTitle}</h2>
            </div>
            <p>{t.guidesText}</p>
          </div>

          <div className="guides">
            {t.guides.map((g, i) => (
              <article key={g[0]}>
                <div className={`cover c${i + 1}`}>
                  {[<Dumbbell />, <UsersRound />, <Flame />][i]}
                  <span>GUIDE 0{i + 1}</span>
                </div>
                <div>
                  <h3>{g[0]}</h3>
                  <p>{g[1]}</p>
                  <strong>{g[2]}</strong>
                  <button onClick={() => setModal(true)}>
                    <ShoppingBag size={17} />
                    {t.programs[3][4]}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section about" id="about">
          <div className="about-img">
            <img
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1300&q=90"
              alt="coach"
            />
            <div>
              <UsersRound />
              350+
            </div>
          </div>

          <div>
            <span>COACH ALEX</span>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutText}</p>
            <div className="checks">
              <span>
                <Check />
                Strength & conditioning
              </span>
              <span>
                <Check />
                Nutrition guidance
              </span>
              <span>
                <Check />
                Habit coaching
              </span>
              <span>
                <Check />
                Online & in-person
              </span>
            </div>
            <button className="primary" onClick={() => setModal(true)}>
              {t.start}
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        <section className="section faq">
          <div className="head">
            <div>
              <span>FAQ</span>
              <h2>{t.faqTitle}</h2>
            </div>
          </div>

          <div className="faq-list">
            {t.faqs.map((f, i) => (
              <article className={faq === i ? "open" : ""} key={f[0]}>
                <button onClick={() => setFaq(faq === i ? -1 : i)}>
                  <span>0{i + 1}</span>
                  <b>{f[0]}</b>
                  <ChevronDown />
                </button>
                <div>
                  <p>{f[1]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <div className="sticky">
        <span>{t.sticky}</span>
        <button onClick={() => setModal(true)}>
          {t.stickyBtn}
          <ArrowRight size={17} />
        </button>
      </div>

      <footer>
        <div className="brand">
          <span>MO</span>
          <b>MENTUM</b>
        </div>
        <p>Personal coaching, group programs and practical fitness guides.</p>
        <div>
          <a href="#top">
            Instagram <Instagram size={16} />
          </a>
          <a href="#top">TikTok</a>
          <a href="#top">YouTube</a>
        </div>
      </footer>

      {modal && (
        <div className="backdrop" onMouseDown={() => setModal(false)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setModal(false)}>
              <X />
            </button>
            <span>FREE CONSULTATION</span>
            <h2>{t.modalTitle}</h2>
            <p>{t.modalText}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.currentTarget.querySelector("button[type=submit]").textContent = "✓";
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
              <button className="primary" type="submit">
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