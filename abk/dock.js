/* Bottom navigation shared by the ABK pages. Include once per page with
   <script src="/abk/dock.js" defer></script> (path relative to the page). */
(function () {
  if (document.querySelector(".abk-dock")) return;
  var root = (document.currentScript && document.currentScript.src.replace(/abk\/dock\.js.*$/, "")) || "/";
  var here = location.pathname.replace(/index\.html$/, "");
  var items = [
    { label: "Home", href: root, match: function (p) { return p === new URL(root).pathname; } },
    { label: "Daily", href: root + "daily/", match: function (p) { return /\/daily\/$/.test(p); } },
    { label: "Week", href: root + "daily/week.html", match: function (p) { return /\/daily\/week\.html$/.test(p); }, opt: true },
    { label: "Celestial", href: root + "celestial/" },
    { label: "nnode.cc ↗", href: "https://nnode.cc", ext: true }
  ];
  var nav = document.createElement("nav");
  nav.className = "abk-dock";
  nav.setAttribute("aria-label", "Site");
  var links = document.createElement("div");
  links.className = "links";
  items.filter(function (it) { return !it.opt || /\/daily\//.test(here); }).forEach(function (it) {
    var a = document.createElement("a");
    a.href = it.href; a.textContent = it.label;
    if (it.ext) { a.target = "_blank"; a.rel = "noopener"; }
    if (it.match && it.match(here)) a.setAttribute("aria-current", "page");
    links.appendChild(a);
  });
  var cta = document.createElement("a");
  cta.className = "cta"; cta.href = root + "portfolio27/"; cta.textContent = "Portfolio";
  nav.appendChild(links); nav.appendChild(cta);
  document.body.appendChild(nav);
  document.body.classList.add("has-dock");
})();
