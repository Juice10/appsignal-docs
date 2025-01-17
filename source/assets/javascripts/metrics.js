// Script for plausible.io

!(function () {
  "use strict";
  var t,
    a = window.location,
    o = window.document,
    e = window.localStorage,
    r = o.currentScript,
    s = r.getAttribute("data-api") || new URL(r.src).origin + "/api/event",
    l = e && e.plausible_ignore;
  function w(t) {
    console.warn("Ignoring Event: " + t);
  }
  function i(t, e) {
    if (
      /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname) ||
      "file:" === a.protocol
    )
      return w("localhost");
    if (
      !(
        window.phantom ||
        window._phantom ||
        window.__nightmare ||
        window.navigator.webdriver ||
        window.Cypress
      )
    ) {
      if ("true" == l) return w("localStorage flag");
      var i = {};
      (i.n = t),
        (i.u = a.href),
        (i.d = r.getAttribute("data-domain")),
        (i.r = o.referrer || null),
        (i.w = window.innerWidth),
        e && e.meta && (i.m = JSON.stringify(e.meta)),
        e && e.props && (i.p = JSON.stringify(e.props));
      var n = new XMLHttpRequest();
      n.open("POST", s, !0),
        n.setRequestHeader("Content-Type", "text/plain"),
        n.send(JSON.stringify(i)),
        (n.onreadystatechange = function () {
          4 == n.readyState && e && e.callback && e.callback();
        });
    }
  }
  function n() {
    t !== a.pathname && ((t = a.pathname), i("pageview"));
  }
  var p,
    d = window.history;
  d.pushState &&
    ((p = d.pushState),
    (d.pushState = function () {
      p.apply(this, arguments), n();
    }),
    window.addEventListener("popstate", n));
  var u = (window.plausible && window.plausible.q) || [];
  window.plausible = i;
  for (var c = 0; c < u.length; c++) i.apply(this, u[c]);
  "prerender" === o.visibilityState
    ? o.addEventListener("visibilitychange", function () {
        t || "visible" !== o.visibilityState || n();
      })
    : n();
})();
