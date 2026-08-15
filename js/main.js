/* ============================================================
   熊奕辉 · 个人博客  交互脚本
   粒子背景 / 打字机 / 滚动显现 / 数字跳动 / 导航
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. 粒子网络背景 ---------- */
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const COLORS = ["#22d3ee", "#34d399", "#a78bfa"];
  const MAX_PARTICLES = 70;
  const LINK_DIST = 130;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function makeParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.8 + 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }
  for (let i = 0; i < MAX_PARTICLES; i++) particles.push(makeParticle());

  let mouse = { x: null, y: null };
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.65;
      ctx.fill();

      // 与鼠标连线
      if (mouse.x !== null) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d < LINK_DIST * 1.4) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - d / (LINK_DIST * 1.4)) * 0.35;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // 粒子之间连线
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - d / LINK_DIST) * 0.18;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* ---------- 2. 首屏打字机 ---------- */
  const ROLES = [
    "采矿工程本科生",
    "院学生会副主席",
    "竞赛爱好者",
    "数据分析学习者",
    "博客作者",
  ];
  const typedEl = document.getElementById("typed");
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = ROLES[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1600);
        return;
      }
      setTimeout(type, 110);
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % ROLES.length;
        setTimeout(type, 350);
        return;
      }
      setTimeout(type, 55);
    }
  }
  if (typedEl) type();

  /* ---------- 3. 滚动显现动画 ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- 4. 数字跳动 ---------- */
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".stat-num[data-count]").forEach((el) => counterObserver.observe(el));

  /* ---------- 5. 技能条动画 ---------- */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".skill-fill").forEach((el) => skillObserver.observe(el));

  /* ---------- 6. 导航交互 ---------- */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  // 滚动进度条 + 导航背景
  const progressBar = document.getElementById("scroll-progress");
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight) * 100 + "%";
    navbar.classList.toggle("scrolled", scrollTop > 40);

    // 高亮当前版块
    let currentId = "home";
    document.querySelectorAll("section[id], header[id]").forEach((sec) => {
      if (scrollTop >= sec.offsetTop - 140) currentId = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 移动端菜单
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navMenu.classList.toggle("open");
    });
    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navMenu.classList.remove("open");
      })
    );
  }

  /* ---------- 7. 首屏鼠标视差（仅桌面端） ---------- */
  const heroName = document.querySelector(".hero-name");
  if (heroName && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 14;
      const dy = (e.clientY / window.innerHeight - 0.5) * 10;
      heroName.style.transform = "translate(" + dx + "px," + dy + "px)";
    });
  }
})();
