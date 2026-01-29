import { resolveComponent as un, createElementBlock as z, openBlock as Y, createVNode as ve, createTextVNode as Ze, toDisplayString as j, onMounted as tt, nextTick as cn, readonly as Qa, watch as _e, getCurrentScope as Za, onScopeDispose as fs, getCurrentInstance as St, toRef as ds, ref as oe, customRef as ms, shallowRef as Ee, isRef as er, shallowReadonly as _s, hasInjectionContext as tr, inject as nr, toValue as ye, computed as J, unref as le, watchEffect as ar, reactive as ia, createElementVNode as W, normalizeStyle as vt, normalizeClass as fn, renderSlot as vs, useTemplateRef as pt, createCommentVNode as Le, Fragment as Ie, renderList as ht, createBlock as De, resolveDynamicComponent as Mn, withCtx as zn, defineComponent as dn, h as Pt, onBeforeUnmount as ps, mergeModels as rr, useModel as sr, withDirectives as xn, vModelText as Pn, effectScope as hs, onUnmounted as gs, Text as As } from "vue";
import { defineStore as ys, createPinia as Es, getActivePinia as bs } from "pinia";
import { parse as Ts, create as Ns, all as Os } from "mathjs";
import or from "katex";
const ke = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, Cs = { class: "header-box" }, ks = {
  __name: "index",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  emits: ["more-click"],
  setup(e, { emit: t }) {
    const n = t;
    return (r, o) => {
      const s = un("SvgIcon");
      return Y(), z("div", Cs, [
        ve(s, {
          onClick: o[0] || (o[0] = (a) => n("more-click", !0)),
          class: "svg-box",
          name: "more",
          size: 14,
          color: "var(--text-color)",
          style: { padding: "10px 12px" }
        }),
        Ze(" " + j(r.$t(e.name || "")), 1)
      ]);
    };
  }
}, Ss = /* @__PURE__ */ ke(ks, [["__scopeId", "data-v-776b3fc1"]]);
function Ls(e, t) {
  if (e == null) return;
  let n = e;
  for (let r = 0; r < t.length; r++) {
    if (n === void 0 || n[t[r]] === void 0) return;
    if (n === null || n[t[r]] === null) return null;
    n = n[t[r]];
  }
  return n;
}
function Jn(e, t, n) {
  if (n.length === 0) return t;
  const r = n[0];
  return n.length > 1 && (t = Jn(typeof e != "object" || e === null || !Object.prototype.hasOwnProperty.call(e, r) ? Number.isInteger(Number(n[1])) ? [] : {} : e[r], t, Array.prototype.slice.call(n, 1))), Number.isInteger(Number(r)) && Array.isArray(e) ? e.slice()[r] : Object.assign({}, e, { [r]: t });
}
function lr(e, t) {
  if (e == null || t.length === 0) return e;
  if (t.length === 1) {
    if (e == null) return e;
    if (Number.isInteger(t[0]) && Array.isArray(e)) return Array.prototype.slice.call(e, 0).splice(t[0], 1);
    const n = {};
    for (const r in e) n[r] = e[r];
    return delete n[t[0]], n;
  }
  if (e[t[0]] == null) {
    if (Number.isInteger(t[0]) && Array.isArray(e)) return Array.prototype.concat.call([], e);
    const n = {};
    for (const r in e) n[r] = e[r];
    return n;
  }
  return Jn(e, lr(e[t[0]], Array.prototype.slice.call(t, 1)), [t[0]]);
}
function ir(e, t) {
  return t.map((n) => n.split(".")).map((n) => [n, Ls(e, n)]).filter((n) => n[1] !== void 0).reduce((n, r) => Jn(n, r[1], r[0]), {});
}
function ur(e, t) {
  return t.map((n) => n.split(".")).reduce((n, r) => lr(n, r), e);
}
function ua(e, { storage: t, serializer: n, key: r, debug: o, pick: s, omit: a, beforeHydrate: l, afterHydrate: i }, f, p = !0) {
  try {
    p && (l == null || l(f));
    const m = t.getItem(r);
    if (m) {
      const _ = n.deserialize(m), T = s ? ir(_, s) : _, N = a ? ur(T, a) : T;
      e.$patch(N);
    }
    p && (i == null || i(f));
  } catch (m) {
    o && console.error("[pinia-plugin-persistedstate]", m);
  }
}
function ca(e, { storage: t, serializer: n, key: r, debug: o, pick: s, omit: a }) {
  try {
    const l = s ? ir(e, s) : e, i = a ? ur(l, a) : l, f = n.serialize(i);
    t.setItem(r, f);
  } catch (l) {
    o && console.error("[pinia-plugin-persistedstate]", l);
  }
}
function Is(e, t) {
  return typeof e == "function" ? e(t) : typeof e == "string" ? e : t;
}
function ws(e, t, n) {
  const { pinia: r, store: o, options: { persist: s = n } } = e;
  if (!s) return;
  // v8 ignore if -- @preserve
  if (!(o.$id in r.state.value)) {
    const l = r._s.get(o.$id.replace("__hot:", ""));
    l && Promise.resolve().then(() => l.$persist());
    return;
  }
  const a = (Array.isArray(s) ? s : s === !0 ? [{}] : [s]).map(t);
  o.$hydrate = ({ runHooks: l = !0 } = {}) => {
    a.forEach((i) => {
      ua(o, i, e, l);
    });
  }, o.$persist = () => {
    a.forEach((l) => {
      ca(o.$state, l);
    });
  }, a.forEach((l) => {
    ua(o, l, e), o.$subscribe((i, f) => ca(f, l), { detached: !0 });
  });
}
function Ds(e = {}) {
  return function(t) {
    ws(t, (n) => {
      const r = Is(n.key, t.store.$id);
      return {
        key: (e.key ? e.key : (o) => o)(r),
        debug: n.debug ?? e.debug ?? !1,
        serializer: n.serializer ?? e.serializer ?? {
          serialize: (o) => JSON.stringify(o),
          deserialize: (o) => JSON.parse(o)
        },
        storage: n.storage ?? e.storage ?? window.localStorage,
        beforeHydrate: n.beforeHydrate ?? e.beforeHydrate,
        afterHydrate: n.afterHydrate ?? e.afterHydrate,
        pick: n.pick,
        omit: n.omit
      };
    }, e.auto ?? !1);
  };
}
var Ms = Ds();
function Rt(e) {
  return Za() ? (fs(e), !0) : !1;
}
const On = /* @__PURE__ */ new WeakMap(), xs = /* @__NO_SIDE_EFFECTS__ */ (...e) => {
  var t;
  const n = e[0], r = (t = St()) == null ? void 0 : t.proxy;
  if (r == null && !tr())
    throw new Error("injectLocal must be called in setup");
  return r && On.has(r) && n in On.get(r) ? On.get(r)[n] : nr(...e);
}, $t = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Ps = (e) => e != null, Rs = Object.prototype.toString, $s = (e) => Rs.call(e) === "[object Object]", ot = () => {
}, Us = /* @__PURE__ */ Fs();
function Fs() {
  var e, t;
  return $t && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function mn(...e) {
  if (e.length !== 1)
    return ds(...e);
  const t = e[0];
  return typeof t == "function" ? Qa(ms(() => ({ get: t, set: ot }))) : oe(t);
}
function Vs(e, t) {
  function n(...r) {
    return new Promise((o, s) => {
      Promise.resolve(e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })).then(o).catch(s);
    });
  }
  return n;
}
const cr = (e) => e();
function Ys(e = cr, t = {}) {
  const {
    initialState: n = "active"
  } = t, r = mn(n === "active");
  function o() {
    r.value = !1;
  }
  function s() {
    r.value = !0;
  }
  const a = (...l) => {
    r.value && e(...l);
  };
  return { isActive: Qa(r), pause: o, resume: s, eventFilter: a };
}
function fa(e) {
  return e.endsWith("rem") ? Number.parseFloat(e) * 16 : Number.parseFloat(e);
}
function Xt(e) {
  return Array.isArray(e) ? e : [e];
}
function Ws(e) {
  return St();
}
function Hs(e, t, n = {}) {
  const {
    eventFilter: r = cr,
    ...o
  } = n;
  return _e(
    e,
    Vs(
      r,
      t
    ),
    o
  );
}
function Bs(e, t, n = {}) {
  const {
    eventFilter: r,
    initialState: o = "active",
    ...s
  } = n, { eventFilter: a, pause: l, resume: i, isActive: f } = Ys(r, { initialState: o });
  return { stop: Hs(
    e,
    t,
    {
      ...s,
      eventFilter: a
    }
  ), pause: l, resume: i, isActive: f };
}
function qn(e, t = !0, n) {
  Ws() ? tt(e, n) : t ? e() : cn(e);
}
function Gs(e, t = 1e3, n = {}) {
  const {
    immediate: r = !0,
    immediateCallback: o = !1
  } = n;
  let s = null;
  const a = Ee(!1);
  function l() {
    s && (clearInterval(s), s = null);
  }
  function i() {
    a.value = !1, l();
  }
  function f() {
    const p = ye(t);
    p <= 0 || (a.value = !0, o && e(), l(), a.value && (s = setInterval(e, p)));
  }
  if (r && $t && f(), er(t) || typeof t == "function") {
    const p = _e(t, () => {
      a.value && $t && f();
    });
    Rt(p);
  }
  return Rt(i), {
    isActive: _s(a),
    pause: i,
    resume: f
  };
}
function js(e, t, n) {
  return _e(
    e,
    t,
    {
      ...n,
      immediate: !0
    }
  );
}
const et = $t ? window : void 0, Ks = $t ? window.navigator : void 0;
function Ye(e) {
  var t;
  const n = ye(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
function Pe(...e) {
  const t = [], n = () => {
    t.forEach((l) => l()), t.length = 0;
  }, r = (l, i, f, p) => (l.addEventListener(i, f, p), () => l.removeEventListener(i, f, p)), o = J(() => {
    const l = Xt(ye(e[0])).filter((i) => i != null);
    return l.every((i) => typeof i != "string") ? l : void 0;
  }), s = js(
    () => {
      var l, i;
      return [
        (i = (l = o.value) == null ? void 0 : l.map((f) => Ye(f))) != null ? i : [et].filter((f) => f != null),
        Xt(ye(o.value ? e[1] : e[0])),
        Xt(le(o.value ? e[2] : e[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        ye(o.value ? e[3] : e[2])
      ];
    },
    ([l, i, f, p]) => {
      if (n(), !(l != null && l.length) || !(i != null && i.length) || !(f != null && f.length))
        return;
      const m = $s(p) ? { ...p } : p;
      t.push(
        ...l.flatMap(
          (_) => i.flatMap(
            (T) => f.map((N) => r(_, T, N, m))
          )
        )
      );
    },
    { flush: "post" }
  ), a = () => {
    s(), n();
  };
  return Rt(n), a;
}
let da = !1;
function _n(e, t, n = {}) {
  const { window: r = et, ignore: o = [], capture: s = !0, detectIframe: a = !1, controls: l = !1 } = n;
  if (!r)
    return l ? { stop: ot, cancel: ot, trigger: ot } : ot;
  if (Us && !da) {
    da = !0;
    const A = { passive: !0 };
    Array.from(r.document.body.children).forEach((E) => E.addEventListener("click", ot, A)), r.document.documentElement.addEventListener("click", ot, A);
  }
  let i = !0;
  const f = (A) => ye(o).some((E) => {
    if (typeof E == "string")
      return Array.from(r.document.querySelectorAll(E)).some((k) => k === A.target || A.composedPath().includes(k));
    {
      const k = Ye(E);
      return k && (A.target === k || A.composedPath().includes(k));
    }
  });
  function p(A) {
    const E = ye(A);
    return E && E.$.subTree.shapeFlag === 16;
  }
  function m(A, E) {
    const k = ye(A), g = k.$.subTree && k.$.subTree.children;
    return g == null || !Array.isArray(g) ? !1 : g.some((y) => y.el === E.target || E.composedPath().includes(y.el));
  }
  const _ = (A) => {
    const E = Ye(e);
    if (A.target != null && !(!(E instanceof Element) && p(e) && m(e, A)) && !(!E || E === A.target || A.composedPath().includes(E))) {
      if ("detail" in A && A.detail === 0 && (i = !f(A)), !i) {
        i = !0;
        return;
      }
      t(A);
    }
  };
  let T = !1;
  const N = [
    Pe(r, "click", (A) => {
      T || (T = !0, setTimeout(() => {
        T = !1;
      }, 0), _(A));
    }, { passive: !0, capture: s }),
    Pe(r, "pointerdown", (A) => {
      const E = Ye(e);
      i = !f(A) && !!(E && !A.composedPath().includes(E));
    }, { passive: !0 }),
    a && Pe(r, "blur", (A) => {
      setTimeout(() => {
        var E;
        const k = Ye(e);
        ((E = r.document.activeElement) == null ? void 0 : E.tagName) === "IFRAME" && !(k != null && k.contains(r.document.activeElement)) && t(A);
      }, 0);
    }, { passive: !0 })
  ].filter(Boolean), C = () => N.forEach((A) => A());
  return l ? {
    stop: C,
    cancel: () => {
      i = !1;
    },
    trigger: (A) => {
      i = !0, _(A), i = !1;
    }
  } : C;
}
// @__NO_SIDE_EFFECTS__
function Xs() {
  const e = Ee(!1), t = St();
  return t && tt(() => {
    e.value = !0;
  }, t), e;
}
// @__NO_SIDE_EFFECTS__
function vn(e) {
  const t = /* @__PURE__ */ Xs();
  return J(() => (t.value, !!e()));
}
function zs(e, t, n = {}) {
  const { window: r = et, ...o } = n;
  let s;
  const a = /* @__PURE__ */ vn(() => r && "MutationObserver" in r), l = () => {
    s && (s.disconnect(), s = void 0);
  }, i = J(() => {
    const _ = ye(e), T = Xt(_).map(Ye).filter(Ps);
    return new Set(T);
  }), f = _e(
    i,
    (_) => {
      l(), a.value && _.size && (s = new MutationObserver(t), _.forEach((T) => s.observe(T, o)));
    },
    { immediate: !0, flush: "post" }
  ), p = () => s == null ? void 0 : s.takeRecords(), m = () => {
    f(), l();
  };
  return Rt(m), {
    isSupported: a,
    stop: m,
    takeRecords: p
  };
}
const Js = Symbol("vueuse-ssr-width");
// @__NO_SIDE_EFFECTS__
function qs() {
  const e = tr() ? /* @__PURE__ */ xs(Js, null) : null;
  return typeof e == "number" ? e : void 0;
}
function Qs(e, t = {}) {
  const { window: n = et, ssrWidth: r = /* @__PURE__ */ qs() } = t, o = /* @__PURE__ */ vn(() => n && "matchMedia" in n && typeof n.matchMedia == "function"), s = Ee(typeof r == "number"), a = Ee(), l = Ee(!1), i = (f) => {
    l.value = f.matches;
  };
  return ar(() => {
    if (s.value) {
      s.value = !o.value;
      const f = ye(e).split(",");
      l.value = f.some((p) => {
        const m = p.includes("not all"), _ = p.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/), T = p.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let N = !!(_ || T);
        return _ && N && (N = r >= fa(_[1])), T && N && (N = r <= fa(T[1])), m ? !N : N;
      });
      return;
    }
    o.value && (a.value = n.matchMedia(ye(e)), l.value = a.value.matches);
  }), Pe(a, "change", i, { passive: !0 }), J(() => l.value);
}
const Bt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Gt = "__vueuse_ssr_handlers__", Zs = /* @__PURE__ */ eo();
function eo() {
  return Gt in Bt || (Bt[Gt] = Bt[Gt] || {}), Bt[Gt];
}
function fr(e, t) {
  return Zs[e] || t;
}
// @__NO_SIDE_EFFECTS__
function to(e) {
  return Qs("(prefers-color-scheme: dark)", e);
}
function no(e) {
  return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number";
}
const ao = {
  boolean: {
    read: (e) => e === "true",
    write: (e) => String(e)
  },
  object: {
    read: (e) => JSON.parse(e),
    write: (e) => JSON.stringify(e)
  },
  number: {
    read: (e) => Number.parseFloat(e),
    write: (e) => String(e)
  },
  any: {
    read: (e) => e,
    write: (e) => String(e)
  },
  string: {
    read: (e) => e,
    write: (e) => String(e)
  },
  map: {
    read: (e) => new Map(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e.entries()))
  },
  set: {
    read: (e) => new Set(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e))
  },
  date: {
    read: (e) => new Date(e),
    write: (e) => e.toISOString()
  }
}, ma = "vueuse-storage";
function zt(e, t, n, r = {}) {
  var o;
  const {
    flush: s = "pre",
    deep: a = !0,
    listenToStorageChanges: l = !0,
    writeDefaults: i = !0,
    mergeDefaults: f = !1,
    shallow: p,
    window: m = et,
    eventFilter: _,
    onError: T = (I) => {
      console.error(I);
    },
    initOnMounted: N
  } = r, C = (p ? Ee : oe)(typeof t == "function" ? t() : t), A = J(() => ye(e));
  if (!n)
    try {
      n = fr("getDefaultStorage", () => {
        var I;
        return (I = et) == null ? void 0 : I.localStorage;
      })();
    } catch (I) {
      T(I);
    }
  if (!n)
    return C;
  const E = ye(t), k = no(E), g = (o = r.serializer) != null ? o : ao[k], { pause: y, resume: h } = Bs(
    C,
    (I) => P(I),
    { flush: s, deep: a, eventFilter: _ }
  );
  _e(A, () => U(), { flush: s });
  let c = !1;
  const u = (I) => {
    N && !c || U(I);
  }, b = (I) => {
    N && !c || K(I);
  };
  m && l && (n instanceof Storage ? Pe(m, "storage", u, { passive: !0 }) : Pe(m, ma, b)), N ? qn(() => {
    c = !0, U();
  }) : U();
  function S(I, w) {
    if (m) {
      const D = {
        key: A.value,
        oldValue: I,
        newValue: w,
        storageArea: n
      };
      m.dispatchEvent(n instanceof Storage ? new StorageEvent("storage", D) : new CustomEvent(ma, {
        detail: D
      }));
    }
  }
  function P(I) {
    try {
      const w = n.getItem(A.value);
      if (I == null)
        S(w, null), n.removeItem(A.value);
      else {
        const D = g.write(I);
        w !== D && (n.setItem(A.value, D), S(w, D));
      }
    } catch (w) {
      T(w);
    }
  }
  function R(I) {
    const w = I ? I.newValue : n.getItem(A.value);
    if (w == null)
      return i && E != null && n.setItem(A.value, g.write(E)), E;
    if (!I && f) {
      const D = g.read(w);
      return typeof f == "function" ? f(D, E) : k === "object" && !Array.isArray(D) ? { ...E, ...D } : D;
    } else return typeof w != "string" ? w : g.read(w);
  }
  function U(I) {
    if (!(I && I.storageArea !== n)) {
      if (I && I.key == null) {
        C.value = E;
        return;
      }
      if (!(I && I.key !== A.value)) {
        y();
        try {
          const w = g.write(C.value);
          (I === void 0 || (I == null ? void 0 : I.newValue) !== w) && (C.value = R(I));
        } catch (w) {
          T(w);
        } finally {
          I ? cn(h) : h();
        }
      }
    }
  }
  function K(I) {
    U(I.detail);
  }
  return C;
}
const ro = "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function dr(e = {}) {
  const {
    selector: t = "html",
    attribute: n = "class",
    initialValue: r = "auto",
    window: o = et,
    storage: s,
    storageKey: a = "vueuse-color-scheme",
    listenToStorageChanges: l = !0,
    storageRef: i,
    emitAuto: f,
    disableTransition: p = !0
  } = e, m = {
    auto: "",
    light: "light",
    dark: "dark",
    ...e.modes || {}
  }, _ = /* @__PURE__ */ to({ window: o }), T = J(() => _.value ? "dark" : "light"), N = i || (a == null ? mn(r) : zt(a, r, s, { window: o, listenToStorageChanges: l })), C = J(() => N.value === "auto" ? T.value : N.value), A = fr(
    "updateHTMLAttrs",
    (y, h, c) => {
      const u = typeof y == "string" ? o == null ? void 0 : o.document.querySelector(y) : Ye(y);
      if (!u)
        return;
      const b = /* @__PURE__ */ new Set(), S = /* @__PURE__ */ new Set();
      let P = null;
      if (h === "class") {
        const U = c.split(/\s/g);
        Object.values(m).flatMap((K) => (K || "").split(/\s/g)).filter(Boolean).forEach((K) => {
          U.includes(K) ? b.add(K) : S.add(K);
        });
      } else
        P = { key: h, value: c };
      if (b.size === 0 && S.size === 0 && P === null)
        return;
      let R;
      p && (R = o.document.createElement("style"), R.appendChild(document.createTextNode(ro)), o.document.head.appendChild(R));
      for (const U of b)
        u.classList.add(U);
      for (const U of S)
        u.classList.remove(U);
      P && u.setAttribute(P.key, P.value), p && (o.getComputedStyle(R).opacity, document.head.removeChild(R));
    }
  );
  function E(y) {
    var h;
    A(t, n, (h = m[y]) != null ? h : y);
  }
  function k(y) {
    e.onChanged ? e.onChanged(y, E) : E(y);
  }
  _e(C, k, { flush: "post", immediate: !0 }), qn(() => k(C.value));
  const g = J({
    get() {
      return f ? N.value : C.value;
    },
    set(y) {
      N.value = y;
    }
  });
  return Object.assign(g, { store: N, system: T, state: C });
}
function so(e, t) {
  const n = Ee(f()), r = mn(e), o = J({
    get() {
      var p;
      let _ = r.value.indexOf(n.value);
      return _ < 0 && (_ = (p = void 0) != null ? p : 0), _;
    },
    set(p) {
      s(p);
    }
  });
  function s(p) {
    const m = r.value, _ = m.length, T = (p % _ + _) % _, N = m[T];
    return n.value = N, N;
  }
  function a(p = 1) {
    return s(o.value + p);
  }
  function l(p = 1) {
    return a(p);
  }
  function i(p = 1) {
    return a(-p);
  }
  function f() {
    var p, m;
    return (m = ye((p = void 0) != null ? p : ye(e)[0])) != null ? m : void 0;
  }
  return _e(r, () => s(o.value)), {
    state: n,
    index: o,
    next: l,
    prev: i,
    go: s
  };
}
function oo(e, t, n = {}) {
  const { window: r = et, ...o } = n;
  let s;
  const a = /* @__PURE__ */ vn(() => r && "ResizeObserver" in r), l = () => {
    s && (s.disconnect(), s = void 0);
  }, i = J(() => {
    const m = ye(e);
    return Array.isArray(m) ? m.map((_) => Ye(_)) : [Ye(m)];
  }), f = _e(
    i,
    (m) => {
      if (l(), a.value && r) {
        s = new ResizeObserver(t);
        for (const _ of m)
          _ && s.observe(_, o);
      }
    },
    { immediate: !0, flush: "post" }
  ), p = () => {
    l(), f();
  };
  return Rt(p), {
    isSupported: a,
    stop: p
  };
}
function tn(e, t = {}) {
  const {
    reset: n = !0,
    windowResize: r = !0,
    windowScroll: o = !0,
    immediate: s = !0,
    updateTiming: a = "sync"
  } = t, l = Ee(0), i = Ee(0), f = Ee(0), p = Ee(0), m = Ee(0), _ = Ee(0), T = Ee(0), N = Ee(0);
  function C() {
    const E = Ye(e);
    if (!E) {
      n && (l.value = 0, i.value = 0, f.value = 0, p.value = 0, m.value = 0, _.value = 0, T.value = 0, N.value = 0);
      return;
    }
    const k = E.getBoundingClientRect();
    l.value = k.height, i.value = k.bottom, f.value = k.left, p.value = k.right, m.value = k.top, _.value = k.width, T.value = k.x, N.value = k.y;
  }
  function A() {
    a === "sync" ? C() : a === "next-frame" && requestAnimationFrame(() => C());
  }
  return oo(e, A), _e(() => Ye(e), (E) => !E && A()), zs(e, A, {
    attributeFilter: ["style", "class"]
  }), o && Pe("scroll", A, { capture: !0, passive: !0 }), r && Pe("resize", A, { passive: !0 }), qn(() => {
    s && A();
  }), {
    height: l,
    bottom: i,
    left: f,
    right: p,
    top: m,
    width: _,
    x: T,
    y: N,
    update: A
  };
}
const Mt = /* @__PURE__ */ new Map();
// @__NO_SIDE_EFFECTS__
function lo(e) {
  const t = Za();
  function n(l) {
    var i;
    const f = Mt.get(e) || /* @__PURE__ */ new Set();
    f.add(l), Mt.set(e, f);
    const p = () => o(l);
    return (i = t == null ? void 0 : t.cleanups) == null || i.push(p), p;
  }
  function r(l) {
    function i(...f) {
      o(i), l(...f);
    }
    return n(i);
  }
  function o(l) {
    const i = Mt.get(e);
    i && (i.delete(l), i.size || s());
  }
  function s() {
    Mt.delete(e);
  }
  function a(l, i) {
    var f;
    (f = Mt.get(e)) == null || f.forEach((p) => p(l, i));
  }
  return { on: n, once: r, off: o, emit: a, reset: s };
}
const io = {
  ctrl: "control",
  command: "meta",
  cmd: "meta",
  option: "alt",
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright"
};
function uo(e = {}) {
  const {
    reactive: t = !1,
    target: n = et,
    aliasMap: r = io,
    passive: o = !0,
    onEventFired: s = ot
  } = e, a = ia(/* @__PURE__ */ new Set()), l = {
    toJSON() {
      return {};
    },
    current: a
  }, i = t ? ia(l) : l, f = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set();
  function _(A, E) {
    A in i && (t ? i[A] = E : i[A].value = E);
  }
  function T() {
    a.clear();
    for (const A of m)
      _(A, !1);
  }
  function N(A, E) {
    var k, g;
    const y = (k = A.key) == null ? void 0 : k.toLowerCase(), c = [(g = A.code) == null ? void 0 : g.toLowerCase(), y].filter(Boolean);
    y && (E ? a.add(y) : a.delete(y));
    for (const u of c)
      m.add(u), _(u, E);
    if (y === "shift" && !E) {
      const u = Array.from(p), b = u.indexOf("shift");
      u.forEach((S, P) => {
        P >= b && (a.delete(S), _(S, !1));
      }), p.clear();
    } else typeof A.getModifierState == "function" && A.getModifierState("Shift") && E && [...a, ...c].forEach((u) => p.add(u));
    y === "meta" && !E ? (f.forEach((u) => {
      a.delete(u), _(u, !1);
    }), f.clear()) : typeof A.getModifierState == "function" && A.getModifierState("Meta") && E && [...a, ...c].forEach((u) => f.add(u));
  }
  Pe(n, "keydown", (A) => (N(A, !0), s(A)), { passive: o }), Pe(n, "keyup", (A) => (N(A, !1), s(A)), { passive: o }), Pe("blur", T, { passive: o }), Pe("focus", T, { passive: o });
  const C = new Proxy(
    i,
    {
      get(A, E, k) {
        if (typeof E != "string")
          return Reflect.get(A, E, k);
        if (E = E.toLowerCase(), E in r && (E = r[E]), !(E in i))
          if (/[+_-]/.test(E)) {
            const y = E.split(/[+_-]/g).map((h) => h.trim());
            i[E] = J(() => y.map((h) => ye(C[h])).every(Boolean));
          } else
            i[E] = Ee(!1);
        const g = Reflect.get(A, E, k);
        return t ? ye(g) : g;
      }
    }
  );
  return C;
}
// @__NO_SIDE_EFFECTS__
function co(e) {
  const {
    pattern: t = [],
    interval: n = 0,
    navigator: r = Ks
  } = e || {}, o = /* @__PURE__ */ vn(() => typeof r < "u" && "vibrate" in r), s = mn(t);
  let a;
  const l = (f = s.value) => {
    o.value && r.vibrate(f);
  }, i = () => {
    o.value && r.vibrate(0), a == null || a.pause();
  };
  return n > 0 && (a = Gs(
    l,
    n,
    {
      immediate: !1,
      immediateCallback: !1
    }
  )), {
    isSupported: o,
    pattern: t,
    intervalControls: a,
    vibrate: l,
    stop: i
  };
}
const Ke = ys("calculator", {
  state: () => ({
    data: {
      currentText: "0",
      calculationText: "",
      activeMenu: zt("calculator-active-menu", { key: "standard", name: "calculator.standard" }),
      angleUnit: zt("calculator-angle-unit", "DEG"),
      //DEG,RAD,GRAD
      version: "1.1.7",
      language: zt("calculator-language", "en")
    }
  }),
  getters: {
    currentText() {
      return this.data.currentText;
    },
    calculationText() {
      return this.data.calculationText;
    },
    activeMenu() {
      return this.data.activeMenu;
    },
    angleUnit() {
      return this.data.angleUnit;
    },
    version() {
      return this.data.version;
    },
    language() {
      return this.data.language;
    }
  },
  actions: {
    setCurrentText(e) {
      this.data.currentText = e;
    },
    setCalculationText(e) {
      this.data.calculationText = e;
    },
    setActiveMenu(e) {
      this.data.activeMenu = e;
    },
    setAngleUnit(e) {
      this.data.angleUnit = e;
    },
    setLanguage(e) {
      this.data.language = e;
    }
  }
});
function fo(e) {
  const t = Es();
  t.use(Ms), e.use(t);
}
const mo = { class: "display-box" }, _o = { class: "calculation-text" }, vo = { class: "current-text" }, po = {
  __name: "index",
  setup(e) {
    const t = Ke(), n = J({
      get: () => t.calculationText,
      set: (o) => {
        t.setCalculationText(o);
      }
    }), r = J({
      get: () => t.currentText,
      set: (o) => {
        t.setCurrentText(o);
      }
    });
    return J(() => {
      if (n.value)
        try {
          return or.renderToString(Ts("1 / 2").toTex(), { throwOnError: !1 });
        } catch (o) {
          return console.error(o), n.value;
        }
      else
        return "";
    }), tt(() => {
    }), (o, s) => (Y(), z("div", mo, [
      W("div", _o, j(n.value), 1),
      W("div", vo, j(r.value), 1)
    ]));
  }
}, ho = /* @__PURE__ */ ke(po, [["__scopeId", "data-v-2648043c"]]), go = { class: "memory-capability-box" }, Ao = {
  __name: "index",
  setup(e) {
    const t = Ke(), { state: n, next: r } = so([
      "DEG",
      "RAD",
      "GRAD"
    ]), o = J({
      get: () => t.angleUnit,
      set: (s) => {
        t.setAngleUnit(s);
      }
    });
    return _e(n, (s) => {
      o.value = s;
    }), tt(() => {
      n.value = o.value;
    }), (s, a) => (Y(), z("div", go, [
      W("div", {
        class: "item-box",
        onClick: a[0] || (a[0] = (l) => le(r)())
      }, j(le(n)), 1)
    ]));
  }
}, yo = /* @__PURE__ */ ke(Ao, [["__scopeId", "data-v-9bcd84d8"]]), Eo = {
  __name: "keyboardButton",
  props: {
    isHover: {
      type: Boolean,
      default: !1
    },
    isActive: {
      type: Boolean,
      default: !1
    },
    showBeforeBorder: {
      type: Boolean,
      default: !1
    },
    backgroundColor: {
      type: String,
      default: "var(--btn-bg)"
    },
    hoverBackgroundColor: {
      type: String,
      default: "var(--btn-hover)"
    },
    activeKeyboardColor: {
      type: String,
      default: "var(--active-keyboard-color)"
    }
  },
  setup(e) {
    const t = e;
    return (n, r) => (Y(), z("div", {
      class: fn(["keyboard-button-box", [t.isHover ? "hover" : "", t.isActive ? "active" : "", t.showBeforeBorder && t.isActive ? "show-before-border" : ""]]),
      style: vt({
        "--backgroundColor": e.backgroundColor,
        "--hoverBackgroundColor": e.hoverBackgroundColor,
        "--activeBackgroundColor": e.activeKeyboardColor
      })
    }, [
      vs(n.$slots, "default", {}, void 0, !0)
    ], 6));
  }
}, Qn = /* @__PURE__ */ ke(Eo, [["__scopeId", "data-v-d1f168df"]]), Qe = Ns(Os), bo = Qe.unaryMinus;
Qe.import({
  negate: function(e) {
    return bo(e);
  },
  sqr: function(e) {
    return Qe.pow(e, 2);
  },
  fact: function(e) {
    return Qe.factorial(e);
  },
  ln: function(e) {
    return Qe.log(e);
  },
  cuberoot: function(e) {
    return Qe.cbrt(e);
  }
});
function To() {
  return Qe.random() + "";
}
function No(e) {
  const t = e < 0 ? -1 : 1, n = Math.abs(e), r = Math.floor(n), o = Math.floor((n - r) * 60), s = Math.round((n - r - o / 60) * 3600);
  return ((r + o / 100 + s / 1e4) * t).toFixed(4);
}
function Oo(e) {
  const t = e < 0 ? -1 : 1, n = Math.abs(e), r = Math.floor(n), o = Math.floor((n - r) * 100 + 1e-4), s = Math.round(((n - r) * 100 - o) * 100);
  return (r + o / 60 + s / 3600) * t + "";
}
function Co(e) {
  return typeof e == "string" ? e.slice(0, -1) : "";
}
function ko(e) {
  return e && e.toString().endsWith("=") ? mr() : { calculationText: e, currentText: "0" };
}
function mr() {
  return { calculationText: "", currentText: "0" };
}
function So(e) {
  return lt(e + "/100");
}
function Lo(e, t) {
  return e.endsWith("=") ? (e = "negate(" + e.slice(0, -1) + ")", t = lt(e)) : e.endsWith(")") ? (e = "negate(" + e + ")", t = lt(e)) : t.startsWith("-") ? t = t.slice(1) : t = "-" + t, { calculationText: e, currentText: t };
}
function Io(e, t) {
  return e && e.includes("{_}") && (e = e.replace("{_}", t)), e.endsWith("=") || (e.endsWith(")") ? e = e + "=" : e = e + t + "="), t = lt(e), { calculationText: e, currentText: t };
}
function wo(e) {
  return e.includes(".") || e.length < 16 && (e += "."), e;
}
function Do(e, t) {
  return X("1/(", e, t);
}
function Mo(e, t) {
  return X("sqr(", e, t);
}
function xo(e, t) {
  return X("sqrt(", e, t);
}
function Po(e, t) {
  return X("abs(", e, t);
}
function X(e, t, n, r = ")") {
  let o = t.slice(-1);
  return t.endsWith("=") ? (t = e + t.slice(0, -1) + r, n = lt(t)) : t.endsWith(")") ? (t = e + t + r, n = lt(t)) : an.includes(o) ? (t = t + e + n + r, n = lt(t)) : t || (t = e + n + r, n = lt(t)), { calculationText: t, currentText: n };
}
function Cn(e, t, n, r = !1, o = !0) {
  return t = t + (r ? n : "") + (o ? " " : "") + e.join(" ") + (o ? " " : ""), n = "", { calculationText: t, currentText: n };
}
function lt(e) {
  const t = Ke();
  if (e = e.replace(/sin\(([^)]+)\)/g, `sin($1 ${Et[t.angleUnit]})`), e = e.replace(/cos\(([^)]+)\)/g, `cos($1 ${Et[t.angleUnit]})`), e = e.replace(/tan\(([^)]+)\)/g, `tan($1 ${Et[t.angleUnit]})`), e = e.replace(/sec\(([^)]+)\)/g, `sec($1 ${Et[t.angleUnit]})`), e = e.replace(/csc\(([^)]+)\)/g, `csc($1 ${Et[t.angleUnit]})`), e = e.replace(/cot\(([^)]+)\)/g, `cot($1 ${Et[t.angleUnit]})`), console.log("expression", e), e && e.includes("{_}"))
    return "";
  e.endsWith("=") && (e = e.replace("=", ""));
  try {
    return Ro(Qe.evaluate(e)) + "";
  } catch (n) {
    return console.error("表达式错误", e, n), "error";
  }
}
const Ro = (e) => Qe.format(e, {
  precision: 14,
  upperExp: 16,
  // 超过 10^10 才使用科学计数法
  lowerExp: -16
  // 小于 10^-10 才使用科学计数法
});
function $o(e, t, n, r) {
  let o = e.slice(-1);
  return e.endsWith("=") ? e = t + n : e.endsWith(")") ? e = e + n : (console.log(an.includes(o) && !r, r), an.includes(o) && !r ? e = e.slice(0, -1) + n : e + t + n);
}
function Rn(e, t = {}) {
  let n = Object.assign({}, e);
  Object.keys(t).forEach((o) => {
    t[o] && n[o] && (n = Object.assign({}, n[o]));
  });
  let r = Zn(t);
  return e[r.join("")] && (n = Object.assign({}, e[r.join("")])), n.latex ? or.renderToString(n.latex, { throwOnError: !1 }) : n.label || "未设置label";
}
function nn(e, t = {}) {
  let n = Object.assign({}, e);
  Object.keys(t).forEach((o) => {
    t[o] && n[o] && (n = Object.assign({}, n[o]));
  });
  let r = Zn(t);
  return console.log(r, n), e[r.join("")] && (n = Object.assign({}, e[r.join("")])), n.component;
}
function Zn(e) {
  return Object.keys(e).filter((t) => e[t]);
}
const an = ["+", "-", "*", "/", "^"], Et = {
  DEG: "deg",
  RAD: "",
  GRAD: "grad"
}, Uo = ["onClick"], Fo = { class: "icon-box" }, Vo = ["innerHTML"], Yo = ["innerHTML"], Wo = {
  __name: "customToolbar",
  props: {
    customToolbar: {
      type: Array,
      default: () => []
    },
    popoverHeight: {
      type: String,
      default: "100px"
    }
  },
  emits: ["handle-key-press"],
  setup(e, { emit: t }) {
    const n = t, r = e, o = pt("itemsRef"), s = pt("toolbarRef"), a = oe({}), l = oe({
      top: "0px"
    }), i = oe(!1), f = oe({});
    _n(s, (_) => {
      i.value = !1;
    });
    const p = (_, T) => {
      if (i.value = !1, _.key == f.value.key) {
        f.value = {};
        return;
      }
      f.value = _, cn(() => {
        f.value.keyboardList.forEach((E) => {
          E.isActiveButton && (a.value[E.key || E.label] = !1);
        });
        const { x: N, y: C, height: A } = tn(o.value[T]);
        l.value = {
          left: "0px",
          top: C.value + A.value + "px",
          "--row-number": f.value.rowNumber || 4,
          "--column-number": f.value.columnNumber || 4,
          height: r.popoverHeight
        }, console.log(l.value), console.log(o.value[T], N.value, C.value, A.value), i.value = !0;
      });
    }, m = (_, T) => {
      let { label: N, key: C } = _;
      Object.keys(a.value).forEach((k) => {
        a.value[k] && _[k] && (N = _[k].label, C = _[k].key);
      });
      let A = Zn(a.value);
      _[A.join("")] && (N = _[A.join("")].label, C = _[A.join("")].key);
      const E = C || N;
      Object.keys(a.value).includes(E) && (a.value[E] = !a.value[E]), n("handle-key-press", { label: N, key: E, prefix: "custom-toolbar-" + f.value.key });
    };
    return (_, T) => (Y(), z("div", {
      class: "custom-toolbar",
      ref_key: "toolbarRef",
      ref: s
    }, [
      (Y(!0), z(Ie, null, ht(e.customToolbar, (N, C) => (Y(), z("div", {
        class: "item-box",
        key: N.key || N.name,
        ref_for: !0,
        ref_key: "itemsRef",
        ref: o,
        onClick: (A) => p(N, C)
      }, [
        W("div", Fo, [
          N.iconComponent ? (Y(), De(Mn(N.iconComponent), { key: 0 })) : Le("", !0),
          N.latex ? (Y(), z("span", {
            key: 1,
            innerHTML: le(Rn)(N)
          }, null, 8, Vo)) : Le("", !0)
        ]),
        Ze(" " + j(_.$t(N.name)), 1)
      ], 8, Uo))), 128)),
      i.value ? (Y(), z("div", {
        key: 0,
        class: "button-list",
        style: vt([l.value, { position: "fixed" }])
      }, [
        f.value.keyboardList && f.value.keyboardList.length > 0 ? (Y(!0), z(Ie, { key: 0 }, ht(f.value.keyboardList, (N, C) => (Y(), De(Qn, {
          "is-active": a.value[N.key],
          key: C,
          onClick: (A) => m(N, _.index)
        }, {
          default: zn(() => [
            le(nn)(N, a.value) ? (Y(), De(Mn(le(nn)(N, a.value)), { key: 0 })) : (Y(), z("div", {
              key: 1,
              innerHTML: le(Rn)(N, a.value)
            }, null, 8, Yo))
          ]),
          _: 2
        }, 1032, ["is-active", "onClick"]))), 128)) : Le("", !0)
      ], 4)) : Le("", !0)
    ], 512));
  }
}, Ho = /* @__PURE__ */ ke(Wo, [["__scopeId", "data-v-488b470f"]]);
function Bo(e, { volume: t = 1, playbackRate: n = 1, soundEnabled: r = !0, interrupt: o = !1, autoplay: s = !1, onload: a, ...l } = {}) {
  const i = oe(null), f = oe(!1), p = oe(null), m = oe(null);
  function _(E) {
    var k;
    typeof a == "function" && a.call(this, E), p.value = (p.value || ((k = m.value) == null ? void 0 : k.duration()) || 0) * 1e3, s === !0 && (f.value = !0);
  }
  return tt(async () => {
    await import("howler"), i.value = Howl, m.value = new i.value({
      src: le(e),
      volume: le(t),
      rate: le(n),
      onload: _,
      ...l
    });
  }), _e(
    () => [le(e)],
    () => {
      i.value && i.value && m && m.value && (m.value = new i.value({
        src: le(e),
        volume: le(t),
        rate: le(n),
        onload: _,
        ...l
      }));
    }
  ), _e(
    () => [le(t), le(n)],
    () => {
      m.value && (m.value.volume(le(t)), m.value.rate(le(n)));
    }
  ), {
    play: (E) => {
      typeof E > "u" && (E = {}), !(!m.value || !r && !E.forceSoundEnabled) && (o && m.value.stop(), E.playbackRate && m.value.rate(E.playbackRate), m.value.play(E.id), m.value.once("end", () => {
        m.value && m.value && !m.value.playing() && (f.value = !1);
      }), f.value = !0);
    },
    sound: m,
    isPlaying: f,
    duration: p,
    pause: (E) => {
      m.value && (m.value.pause(typeof E == "number" ? E : void 0), f.value = !1);
    },
    stop: (E) => {
      m.value && (m.value.stop(typeof E == "number" ? E : void 0), f.value = !1);
    }
  };
}
const Go = dn({
  name: "SvgIcon",
  props: {
    prefix: {
      type: String,
      default: "icon"
    },
    name: {
      type: String,
      required: !0
    },
    color: {
      type: String,
      default: "var(--text-color)"
    },
    size: {
      type: String,
      default: "20px"
    }
  },
  setup(e) {
    return { symbolId: J(() => `#${e.prefix}-${e.name}`) };
  }
}), jo = ["xlink:href", "fill"];
function Ko(e, t, n, r, o, s) {
  return Y(), z("svg", {
    "aria-hidden": "true",
    style: vt({
      width: e.size,
      height: e.size,
      "box-sizing": "content-box"
    })
  }, [
    W("use", {
      "xlink:href": e.symbolId,
      fill: e.color
    }, null, 8, jo)
  ], 4);
}
const Jt = /* @__PURE__ */ ke(Go, [["render", Ko]]), pn = {
  moreMenuList: [
    {
      name: "calculator.calculator",
      children: [
        {
          name: "calculator.standard",
          key: "standard"
        },
        {
          name: "calculator.scientific",
          key: "scientific"
        },
        {
          name: "calculator.graphing",
          disabled: !0
        },
        {
          name: "calculator.programmer",
          disabled: !0
        },
        {
          name: "calculator.dateCalculation",
          key: "dateCalculation"
        }
      ]
    },
    {
      name: "calculator.converter",
      children: [
        {
          name: "calculator.currency",
          disabled: !0
        },
        {
          name: "calculator.volume",
          disabled: !0
        },
        {
          name: "calculator.length",
          disabled: !0
        },
        {
          name: "calculator.weightAndMass",
          disabled: !0
        },
        {
          name: "calculator.temperature",
          disabled: !0
        },
        {
          name: "calculator.energy",
          disabled: !0
        },
        {
          name: "calculator.area",
          disabled: !0
        },
        {
          name: "calculator.speed",
          disabled: !0
        },
        {
          name: "calculator.time",
          disabled: !0
        },
        {
          name: "calculator.power",
          disabled: !0
        },
        {
          name: "calculator.data",
          disabled: !0
        },
        {
          name: "calculator.pressure",
          disabled: !0
        },
        {
          name: "calculator.angle",
          disabled: !0
        }
      ]
    }
  ],
  standard: {
    keyboardList: [
      {
        label: "%",
        keyboard: "Digit5"
      },
      {
        label: "CE",
        key: "Delete"
      },
      {
        label: "C",
        key: "Clear"
      },
      {
        latex: "⌫",
        keyboard: "Backspace",
        key: "Backspace",
        component: Pt(
          Jt,
          {
            size: "16px",
            name: "back",
            color: "var(--text-color)",
            style: "padding: 10px 12px"
          },
          {}
        )
      },
      {
        latex: "^{1}\\!/\\!_{x}",
        key: "Reciprocal"
      },
      {
        latex: "x^{2} ",
        key: "Sqr"
      },
      {
        latex: "\\sqrt[2]{x} ",
        key: "Sqrt"
      },
      {
        latex: "{\\div}",
        key: "/",
        keyboard: "NumpadDivide,Slash"
      },
      {
        label: "7",
        keyboard: "Numpad7"
      },
      {
        label: "8",
        keyboard: "Numpad8"
      },
      {
        label: "9",
        keyboard: "Numpad9"
      },
      {
        key: "*",
        latex: "\\times",
        keyboard: "NumpadMultiply,shift_digit8"
      },
      {
        label: "4",
        keyboard: "Numpad4"
      },
      {
        label: "5",
        keyboard: "Numpad5"
      },
      {
        label: "6",
        keyboard: "Numpad6"
      },
      {
        label: "-",
        keyboard: "NumpadSubtract,Minus"
      },
      {
        label: "1",
        keyboard: "Numpad1"
      },
      {
        label: "2",
        keyboard: "Numpad2"
      },
      {
        label: "3",
        keyboard: "Numpad3"
      },
      {
        label: "+",
        keyboard: "NumpadAdd,shift_equal"
      },
      {
        latex: "^{+}\\!/\\!_{-}",
        key: "Negate"
      },
      {
        label: "0",
        keyboard: "Numpad0"
      },
      {
        label: ".",
        keyboard: "Period,NumpadDecimal"
      },
      {
        label: "=",
        key: "Enter",
        keyboard: "Enter"
      }
    ],
    rowNumber: 6,
    columnNumber: 4
  },
  scientific: {
    keyboardList: [
      {
        latex: "2^{nd}",
        key: "2nd",
        isActiveButton: !0
      },
      {
        latex: "\\pi",
        key: "ConstantPI"
      },
      {
        label: "e",
        key: "ConstantE"
      },
      {
        label: "C",
        key: "Clear"
      },
      {
        latex: "⌫",
        keyboard: "Backspace",
        key: "Backspace",
        component: Pt(
          Jt,
          {
            size: "16px",
            name: "back",
            color: "var(--text-color)",
            style: "padding: 10px 12px"
          },
          {}
        )
      },
      {
        latex: "x^{2} ",
        key: "Sqr"
      },
      {
        latex: "^{1}\\!/\\!_{x}",
        key: "Reciprocal"
      },
      {
        latex: "\\left |x\\right|",
        key: "Abs"
      },
      {
        label: "exp",
        key: "Exp",
        keyboard: "e"
      },
      {
        label: "mod",
        key: "Mod"
      },
      {
        latex: "\\sqrt[2]{x} ",
        key: "Sqrt",
        "2nd": {
          latex: "\\sqrt[3]{x} ",
          key: "Cuberoot"
        }
      },
      {
        label: "(",
        key: "(",
        keyboard: "Digit9"
      },
      {
        label: ")",
        key: ")",
        keyboard: "Digit0"
      },
      {
        latex: "n!",
        key: "Fact"
      },
      {
        latex: "{\\div}",
        key: "/",
        keyboard: "NumpadDivide,Slash"
      },
      {
        latex: "x^{y} ",
        key: "^",
        keyboard: "Digit6",
        "2nd": {
          latex: "\\sqrt[y]{x} ",
          key: "Yroot"
        }
      },
      {
        label: "7",
        keyboard: "Numpad7"
      },
      {
        label: "8",
        keyboard: "Numpad8"
      },
      {
        label: "9",
        keyboard: "Numpad9"
      },
      {
        key: "*",
        latex: "\\times",
        keyboard: "NumpadMultiply,shift_digit8"
      },
      {
        latex: "10^{x} ",
        key: "10^",
        "2nd": {
          latex: "2^{x}",
          key: "2^{x}"
        }
      },
      {
        label: "4",
        keyboard: "Numpad4"
      },
      {
        label: "5",
        keyboard: "Numpad5"
      },
      {
        label: "6",
        keyboard: "Numpad6"
      },
      {
        label: "-",
        keyboard: "NumpadSubtract,Minus"
      },
      {
        latex: "\\log",
        key: "l",
        keyboard: "KeyL",
        "2nd": {
          latex: "\\log_{y}{x}",
          key: "log_{y}{x}"
        }
      },
      {
        label: "1",
        keyboard: "Numpad1"
      },
      {
        label: "2",
        keyboard: "Numpad2"
      },
      {
        label: "3",
        keyboard: "Numpad3"
      },
      {
        label: "+",
        keyboard: "NumpadAdd,shift_equal"
      },
      {
        latex: "\\ln",
        keyboard: "KeyN",
        key: "n",
        "2nd": {
          latex: "e^{x}",
          key: "e^{x}"
        }
      },
      {
        latex: "^{+}\\!/\\!_{-}",
        key: "Negate"
      },
      {
        label: "0",
        keyboard: "Numpad0"
      },
      {
        label: ".",
        keyboard: "Period,NumpadDecimal"
      },
      {
        label: "=",
        key: "Enter",
        keyboard: "Enter"
      }
    ],
    customToolbar: [
      {
        name: "scientific.trigonometry",
        key: "trigonometry",
        iconComponent: Pt(
          Jt,
          {
            size: "18px",
            name: "trigonometry",
            color: "var(--text-color)",
            style: "padding: 4px"
          },
          {}
        ),
        rowNumber: 2,
        columnNumber: 4,
        keyboardList: [
          {
            latex: "2^{nd}",
            isActiveButton: !0,
            key: "2nd"
          },
          {
            latex: "sin",
            key: "Sin",
            "2nd": {
              latex: "sin^{-1}",
              key: "Asin"
            },
            Hyp: {
              latex: "sinh",
              key: "Sinh"
            },
            "2ndHyp": {
              latex: "sinh^{-1}",
              key: "Asinh"
            }
          },
          {
            latex: "cos",
            key: "Cos",
            "2nd": {
              latex: "cos^{-1}",
              key: "Acos"
            },
            Hyp: {
              latex: "cosh",
              key: "Cosh"
            },
            "2ndHyp": {
              latex: "cosh^{-1}",
              key: "Acosh"
            }
          },
          {
            latex: "tan",
            key: "Tan",
            "2nd": {
              latex: "tan^{-1}",
              key: "Atan"
            },
            Hyp: {
              latex: "tanh",
              key: "Tanh"
            },
            "2ndHyp": {
              latex: "tanh^{-1}",
              key: "Atanh"
            }
          },
          {
            label: "hyp",
            isActiveButton: !0,
            key: "Hyp"
          },
          {
            latex: "sec",
            key: "Sec",
            "2nd": {
              latex: "sec^{-1}",
              key: "Asec"
            },
            Hyp: {
              latex: "sech",
              key: "Sech"
            },
            "2ndHyp": {
              latex: "sech^{-1}",
              key: "Asech"
            }
          },
          {
            latex: "csc",
            key: "Csc",
            "2nd": {
              latex: "csc^{-1}",
              key: "Acsc"
            },
            Hyp: {
              latex: "csch",
              key: "Csch"
            },
            "2ndHyp": {
              latex: "csch^{-1}",
              key: "Acsch"
            }
          },
          {
            latex: "cot",
            key: "Cot",
            "2nd": {
              latex: "cot^{-1}",
              key: "Acot"
            },
            Hyp: {
              latex: "coth",
              key: "Coth"
            },
            "2ndHyp": {
              latex: "coth^{-1}",
              key: "Acoth"
            }
          }
        ]
      },
      {
        name: "scientific.function",
        key: "function",
        latex: "\\int",
        rowNumber: 2,
        columnNumber: 3,
        keyboardList: [
          {
            latex: "\\begin{vmatrix} x \\end{vmatrix}",
            key: "Abs"
          },
          {
            latex: "\\left \\lfloor x \\right \\rfloor ",
            key: "Floor"
          },
          {
            latex: "\\left \\lceil x \\right \\rceil ",
            key: "Ceil"
          },
          {
            label: "rand",
            key: "Rand"
          },
          {
            latex: "\\longrightarrow dms",
            key: "ToDms"
          },
          {
            latex: "\\longrightarrow deg",
            key: "ToDeg"
          }
        ]
      }
    ],
    rowNumber: 7,
    columnNumber: 5
  },
  dateCalculation: {
    keyboardList: [
      {
        label: "dateCalculation.differenceBetweenDates",
        key: "DiffDates"
      },
      {
        label: "dateCalculation.addSubDays",
        key: "AddSubDays"
      }
    ]
  }
}, Xo = "data:audio/mpeg;base64,SUQzAwAAAAAAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+7BgAAAG0WjNZT8gCAAACXCgAAEaeXdl+P2AAAAAJcMAAACyFElJrUoQua0XwehGG+h6Hqur9jT6jV8dsQxYdMdQeFI2GIUZxgQYFyzquOpwHMMbRXTDgepjGJZunp6fPUocuH78ofx/JZjG3IdyWXZXDcbtzD/w/3k21td7T3gQlphuvclmMrn4g5cP5SiWY08vyjdvVJY3T26j/v/L8pRGIcnJtyH8sbz1SWNxiWczz/DDeGGH509Pbwjcvt//591nnn+sMOfhhh/7z7rPPP9YYfnSWN59qSiWY0lJSYfnnnnhzeeffwwz/WH50+eqenqcUOcH/8McRn+cyBNBHBCRCKGZCKLZTSSiVbZLDvG8ZZJyCtIxyWo0sI+gWAQQvg3j/KQCBRWDVSsVdNTUysfOkYgcmGhGIMHAQCAUUMEGxpVp37bg0xypLRacyta1QTMPzMjuZb3Vy/mtRhg70K4a8XclOOsssf/H/9WBKgtovRl9qWQy7UPWrsts73///3909mV27tP3v45dlNbKZ3397/9dlcvwl+WHcOc7uls1cd6/W8df+u///r9a5nSWM4pE5/lTCpU3q1+sqbuNarGbwl9KJQ/eQ7iYWQ39kqdWtASxAAAGlAAACr6qQCckkkZdcvW6zhQLMuLKJp+xoqGy/Wqq2us6UAzbJpcwVUEvRtBLEsi+jXn3CxU1VhYZ9rTlP1dwiNFqamce2saX+XZBhMztNn2W2ZTKsn2v2sY5FZb96Zd2TVq+Ebzwp61NTXLVXKU45XJVD3KbKxarbyypddl1NLsNW7/eXs7s7hyxdjMetUErprWeN3DX/ruuZf/7sGBLAAZOaNRXYwAEAAAJcOAAARp5oz+n4Y2QAAAlwAAABJ/jc3VrZZ2O93Kb1bLfO481/7x/dnG5V1Q1KtSu4LOYdi0SeZ5d1m4wmeitJuT3bGuarVpIkSSAE3JJIH8nTCV53qEoxQMieO40R9G8r4JiCRUCK+YmpqwF7ZCqxca7jBMEHOkUjFmKXqPZR5QJ82eSZ+ZLB3YdZc/VaBZVnDUWlsCDrhyPsO0Oz3VpWR8Qh0Nko5Hw8kW5ODofwOpVBahPgWPYj4qtLYx6jaBq6ZHNDJf2LzFKeH0ZNmA5gquSzQnWQ3lGnxyDUsD4fTey+iejq6NmFEZcrOn1tJbWurjno3aMtXjd6ON2cs0hbAZLlyvFqU5JpeMkzYkk3KgWB8dSAOzC8bhskN9vrWQbtbbbNO0w5Y0ugMCBWYY7HbqEBa50RUhrE19QEEJLvM3BAy0KmJd1SIVMXSbElckaYBgbINcRLQGl9lqsbNTwhLRkwpfYnoagtdryyqHqbK7DTvU8MzuoanpmGr/NzPw4olst203crapyKP7bNGqBsJblVTm1rmz/SX3tVPM1yMVPYGgkSJU8ybW/zPp6r+nzzXmWqqeiWz/2Oyt9U8zTzMtVU3bSKMtwURoob/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////uwYKMAD/lpSmsYM3JGgAlwAAABAAABLgAAACAAACXAAAAE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+P//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7BApwAP/ABLgAAACE6ACXAAAAEAAAEuAAAAIAAAJcAAAAT/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==", _r = /* @__PURE__ */ lo("calculation-result-event"), zo = { class: "keyboard-list" }, Jo = ["innerHTML"], qo = {
  __name: "index",
  setup(e) {
    const t = Bo(Xo, { volume: 0.25 }), n = Ke(), { vibrate: r, isSupported: o } = /* @__PURE__ */ co({ pattern: [200] }), s = J({
      get: () => n.calculationText,
      set: (k) => {
        n.setCalculationText(k);
      }
    }), a = J({
      get: () => n.currentText,
      set: (k) => {
        n.setCurrentText(k.trim());
      }
    }), l = oe(!1);
    _e(() => a.value, (k, g) => {
      g && k == 0 || (l.value = !0);
    });
    const i = J(() => pn[n.activeMenu.key] || {});
    _e(() => n.activeMenu, () => {
      A();
    });
    const f = uo(), p = J(() => i.value.keyboardList || []), m = J(() => i.value.rowNumber || 0), _ = J(() => i.value.columnNumber || 0), T = J(() => i.value.customToolbar || []), N = oe({}), C = oe({});
    ar(() => {
      p.value.forEach((k) => {
        k.keyboard && typeof k.keyboard == "string" && k.keyboard.split(",").length > 0 && (k.keyboard.split(",").some((y) => f[y].value) ? N.value[k.keyboard] = !0 : N.value[k.keyboard] = !1);
      });
    }), tt(() => {
      document.addEventListener("keydown", E), A();
    }), ps(() => {
      document.removeEventListener("keydown", E);
    });
    const A = () => {
      i.value.keyboardList.forEach((k) => {
        k.isActiveButton && (C.value[k.key || k.label] = !1);
      });
    }, E = (k) => {
      t.play(), o.value && r(), console.log(k);
      let { label: g, key: y } = k;
      Object.keys(C.value).forEach((c) => {
        C.value[c] && k[c] && (g = k[c].label, y = k[c].key);
      });
      const h = y || g;
      if (an.includes(h))
        s.value = $o(s.value, a.value, h, l.value), a.value = "", l.value = !1;
      else if (h == "Enter") {
        const { calculationText: c, currentText: u } = Io(s.value, a.value);
        s.value = c, a.value = u, _r.emit({ expression: c, result: u });
      } else if (h == ".")
        a.value = wo(a.value);
      else if (h == "Backspace")
        a.value = Co(a.value);
      else if (h == "Negate") {
        const { calculationText: c, currentText: u } = Lo(s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "Delete") {
        const { calculationText: c, currentText: u } = ko(s.value);
        s.value = c, a.value = u;
      } else if (h == "Clear") {
        const { calculationText: c, currentText: u } = mr(s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "%")
        a.value = So(a.value);
      else if (h == "Reciprocal") {
        const { calculationText: c, currentText: u } = Do(s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "Sqr") {
        const { calculationText: c, currentText: u } = Mo(s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "Sqrt") {
        const { calculationText: c, currentText: u } = xo(s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "ConstantPI")
        a.value = "3.1415926535897932384626433832795";
      else if (h == "ConstantE")
        a.value = "2.7182818284590452353602874713527";
      else if (h == "Abs") {
        const { calculationText: c, currentText: u } = Po(s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "Exp")
        s.value || (a.value = a.value + ".e+0");
      else if (h == "Mod") {
        const { calculationText: c, currentText: u } = Cn(["mod"], s.value, a.value, l.value, !0);
        s.value = c, a.value = u;
      } else if (h == "(") {
        const { calculationText: c, currentText: u } = Cn(["("], s.value, a.value, l.value, !1);
        s.value = c, a.value = u;
      } else if (h == ")") {
        const { calculationText: c, currentText: u } = Cn([")"], s.value, a.value, l.value, !1);
        s.value = c, a.value = u, l.value = !1;
      } else if (h == "Fact") {
        const { calculationText: c, currentText: u } = X("fact(", s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "10^") {
        const { calculationText: c, currentText: u } = X("10^(", s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "l") {
        const { calculationText: c, currentText: u } = X("log10(", s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "n") {
        const { calculationText: c, currentText: u } = X("ln(", s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "Cuberoot") {
        const { calculationText: c, currentText: u } = X("cuberoot(", s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "Yroot") {
        const { calculationText: c, currentText: u } = X("nthRoot(", s.value, a.value, ",{_})");
        s.value = c, a.value = u;
      } else if (h == "2^{x}") {
        const { calculationText: c, currentText: u } = X("2^(", s.value, a.value);
        s.value = c, a.value = u;
      } else if (h == "log_{y}{x}") {
        const { calculationText: c, currentText: u } = X("log(", s.value, a.value, ",{_})");
        s.value = c, a.value = u;
      } else if (h == "e^{x}") {
        const { calculationText: c, currentText: u } = X("e^(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Sin") {
        const { calculationText: c, currentText: u } = X("sin(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Cos") {
        const { calculationText: c, currentText: u } = X("cos(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Tan") {
        const { calculationText: c, currentText: u } = X("tan(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Sec") {
        const { calculationText: c, currentText: u } = X("sec(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Csc") {
        const { calculationText: c, currentText: u } = X("csc(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Cot") {
        const { calculationText: c, currentText: u } = X("cot(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Asin") {
        const { calculationText: c, currentText: u } = X("asin(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Acos") {
        const { calculationText: c, currentText: u } = X("acos(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Atan") {
        const { calculationText: c, currentText: u } = X("atan(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Asec") {
        const { calculationText: c, currentText: u } = X("asec(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Acsc") {
        const { calculationText: c, currentText: u } = X("acsc(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Acot") {
        const { calculationText: c, currentText: u } = X("acot(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Sinh") {
        const { calculationText: c, currentText: u } = X("sinh(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Cosh") {
        const { calculationText: c, currentText: u } = X("cosh(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Tanh") {
        const { calculationText: c, currentText: u } = X("tanh(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Sech") {
        const { calculationText: c, currentText: u } = X("sech(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Csch") {
        const { calculationText: c, currentText: u } = X("csch(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Coth") {
        const { calculationText: c, currentText: u } = X("coth(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Asinh") {
        const { calculationText: c, currentText: u } = X("asinh(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Acosh") {
        const { calculationText: c, currentText: u } = X("acosh(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Atanh") {
        const { calculationText: c, currentText: u } = X("atanh(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Asech") {
        const { calculationText: c, currentText: u } = X("asech(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Acsch") {
        const { calculationText: c, currentText: u } = X("acsch(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Acoth") {
        const { calculationText: c, currentText: u } = X("acoth(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Floor") {
        const { calculationText: c, currentText: u } = X("floor(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else if (h == "Ceil") {
        const { calculationText: c, currentText: u } = X("ceil(", s.value, a.value, ")");
        s.value = c, a.value = u;
      } else h == "Rand" ? a.value = To() : h == "ToDms" ? a.value = No(a.value) : h == "ToDeg" ? a.value = Oo(a.value) : Object.keys(C.value).includes(h) && !k.prefix ? C.value[h] = !C.value[h] : !isNaN(Number(h)) && typeof Number(h) == "number" && (a.value === "0" ? (a.value = h, l.value = !0) : a.value === "Error" || a.value == "Infinity" ? (s.value = "", a.value = h) : a.value.length < 16 && (a.value += h));
      (!a.value || a.value.length == 0) && (a.value = "0");
    };
    return (k, g) => (Y(), z("div", {
      class: "keyboard-box",
      style: vt({ "--row-number": m.value, "--column-number": _.value })
    }, [
      T.value && T.value.length > 0 ? (Y(), De(Ho, {
        key: 0,
        class: "custom-toolbar-box",
        "custom-toolbar": T.value,
        onHandleKeyPress: E
      }, null, 8, ["custom-toolbar"])) : Le("", !0),
      W("div", zo, [
        (Y(!0), z(Ie, null, ht(p.value, (y) => (Y(), De(Qn, {
          "is-hover": N.value[y.keyboard],
          key: y.key,
          "is-active": C.value[y.key],
          onClick: (h) => E(y)
        }, {
          default: zn(() => [
            le(nn)(y, C.value) ? (Y(), De(Mn(le(nn)(y, C.value)), { key: 0 })) : (Y(), z("div", {
              key: 1,
              innerHTML: le(Rn)(y, C.value)
            }, null, 8, Jo))
          ]),
          _: 2
        }, 1032, ["is-hover", "is-active", "onClick"]))), 128))
      ])
    ], 4));
  }
}, Qo = /* @__PURE__ */ ke(qo, [["__scopeId", "data-v-3d06e570"]]), Zo = { class: "menu-list" }, el = { class: "menu-item group-name" }, tl = ["onClick"], nl = { class: "setting-box" }, al = {
  __name: "index",
  props: {
    activeMenu: {},
    activeMenuModifiers: {}
  },
  emits: /* @__PURE__ */ rr(["more-click"], ["update:activeMenu"]),
  setup(e, { emit: t }) {
    Ke();
    const n = t, r = sr(e, "activeMenu"), o = pt("moreRef"), s = J(() => pn.moreMenuList);
    _n(o, (i) => {
      n("more-click", !1);
    });
    const a = (i) => [r.value.key == (i.key || i.name) ? "active" : "", i.disabled ? "disabled" : "menu-item-content"], l = (i) => {
      i.disabled || (r.value = i, n("more-click", !1));
    };
    return (i, f) => {
      const p = un("SvgIcon");
      return Y(), z("div", {
        class: "more-box",
        ref_key: "moreRef",
        ref: o
      }, [
        ve(p, {
          class: "svg-box",
          name: "more",
          onClick: f[0] || (f[0] = (m) => n("more-click", !1)),
          size: 14,
          color: "var(--text-color)",
          style: { padding: "10px 12px" }
        }),
        W("div", Zo, [
          (Y(!0), z(Ie, null, ht(s.value, (m) => (Y(), z("div", {
            class: "sub-menu",
            key: m.name
          }, [
            W("div", el, j(i.$t(m.name)), 1),
            (Y(!0), z(Ie, null, ht(m.children, (_) => (Y(), z("div", {
              class: fn(["menu-item", a(_)]),
              key: _.name,
              onClick: (T) => l(_)
            }, j(i.$t(_.name)), 11, tl))), 128))
          ]))), 128))
        ]),
        W("div", nl, [
          W("div", {
            class: "button",
            onClick: f[1] || (f[1] = (m) => l({ name: "calculator.settings", key: "settings" }))
          }, [
            ve(p, {
              class: "svg-box",
              name: "setting",
              size: 14,
              color: "var(--text-color)",
              style: { padding: "2px 8px" }
            }),
            W("div", null, j(i.$t("calculator.settings")), 1)
          ])
        ])
      ], 512);
    };
  }
}, rl = /* @__PURE__ */ ke(al, [["__scopeId", "data-v-8fe85238"]]), sl = ["onClick"], ol = {
  __name: "index",
  props: /* @__PURE__ */ rr({
    options: {
      type: Array,
      default: () => []
    },
    popoverHeight: {
      type: String,
      default: "200px"
    },
    zIndex: {
      type: String,
      default: "var(--z-index)"
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = e, n = pt("selectBoxRef"), r = pt("popoverBoxRef"), o = sr(e, "modelValue"), s = oe(!1), a = oe({});
    _n(n, (f) => {
      s.value = !1;
    });
    const l = () => {
      if (s.value) {
        s.value = !1;
        return;
      }
      const { x: f, y: p, width: m, height: _ } = tn(n.value);
      a.value = {
        left: f.value + "px",
        top: p.value + _.value + 2 + "px",
        height: t.popoverHeight,
        width: m.value + "px"
      }, s.value = !0, cn(() => {
        let T = window.innerHeight;
        const { y: N, height: C } = tn(r.value);
        N.value + C.value > T && (T - p.value + 2 + C.value > T ? a.value = {
          ...a.value,
          height: T - N.value + "px"
        } : a.value = {
          ...a.value,
          top: void 0,
          bottom: T - p.value + 2 + "px"
        });
      });
    }, i = (f) => {
      o.value = f.value;
    };
    return (f, p) => {
      const m = un("SvgIcon");
      return Y(), z("div", {
        class: "select-box",
        onClick: p[0] || (p[0] = (_) => l()),
        ref_key: "selectBoxRef",
        ref: n,
        style: vt({ "--zIndex": t.zIndex })
      }, [
        Ze(j(o.value) + " ", 1),
        ve(m, {
          name: "downwardArrow",
          size: "12px",
          style: { "margin-left": "4px" }
        }),
        s.value ? (Y(), z("div", {
          key: 0,
          class: "popover-box",
          ref_key: "popoverBoxRef",
          ref: r,
          style: vt(a.value)
        }, [
          (Y(!0), z(Ie, null, ht(t.options, (_) => (Y(), z("div", {
            class: fn(["popover-item", { active: _.value == o.value }]),
            key: _.key,
            onClick: (T) => i(_)
          }, j(_.label), 11, sl))), 128))
        ], 4)) : Le("", !0)
      ], 4);
    };
  }
}, kn = /* @__PURE__ */ ke(ol, [["__scopeId", "data-v-0918ff99"]]), ll = {
  __name: "index",
  props: {
    value: {
      ype: [String, Number, Boolean],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    checked: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = t, r = e, o = () => {
      n("change", r.value);
    };
    return (s, a) => (Y(), z("div", {
      class: fn(["radio-box", [e.checked ? "checked" : ""]]),
      onClick: o
    }, [
      a[0] || (a[0] = W("div", { class: "custom-radio" }, null, -1)),
      Ze(" " + j(s.$t(r.label)), 1)
    ], 2));
  }
}, _t = /* @__PURE__ */ ke(ll, [["__scopeId", "data-v-8c4ddc0c"]]);
function vr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qt = { exports: {} }, il = qt.exports, _a;
function pr() {
  return _a || (_a = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(il, (function() {
      var n = 1e3, r = 6e4, o = 36e5, s = "millisecond", a = "second", l = "minute", i = "hour", f = "day", p = "week", m = "month", _ = "quarter", T = "year", N = "date", C = "Invalid Date", A = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, E = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, k = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(I) {
        var w = ["th", "st", "nd", "rd"], D = I % 100;
        return "[" + I + (w[(D - 20) % 10] || w[D] || w[0]) + "]";
      } }, g = function(I, w, D) {
        var F = String(I);
        return !F || F.length >= w ? I : "" + Array(w + 1 - F.length).join(D) + I;
      }, y = { s: g, z: function(I) {
        var w = -I.utcOffset(), D = Math.abs(w), F = Math.floor(D / 60), x = D % 60;
        return (w <= 0 ? "+" : "-") + g(F, 2, "0") + ":" + g(x, 2, "0");
      }, m: function I(w, D) {
        if (w.date() < D.date()) return -I(D, w);
        var F = 12 * (D.year() - w.year()) + (D.month() - w.month()), x = w.clone().add(F, m), B = D - x < 0, G = w.clone().add(F + (B ? -1 : 1), m);
        return +(-(F + (D - x) / (B ? x - G : G - x)) || 0);
      }, a: function(I) {
        return I < 0 ? Math.ceil(I) || 0 : Math.floor(I);
      }, p: function(I) {
        return { M: m, y: T, w: p, d: f, D: N, h: i, m: l, s: a, ms: s, Q: _ }[I] || String(I || "").toLowerCase().replace(/s$/, "");
      }, u: function(I) {
        return I === void 0;
      } }, h = "en", c = {};
      c[h] = k;
      var u = "$isDayjsObject", b = function(I) {
        return I instanceof U || !(!I || !I[u]);
      }, S = function I(w, D, F) {
        var x;
        if (!w) return h;
        if (typeof w == "string") {
          var B = w.toLowerCase();
          c[B] && (x = B), D && (c[B] = D, x = B);
          var G = w.split("-");
          if (!x && G.length > 1) return I(G[0]);
        } else {
          var te = w.name;
          c[te] = w, x = te;
        }
        return !F && x && (h = x), x || !F && h;
      }, P = function(I, w) {
        if (b(I)) return I.clone();
        var D = typeof w == "object" ? w : {};
        return D.date = I, D.args = arguments, new U(D);
      }, R = y;
      R.l = S, R.i = b, R.w = function(I, w) {
        return P(I, { locale: w.$L, utc: w.$u, x: w.$x, $offset: w.$offset });
      };
      var U = (function() {
        function I(D) {
          this.$L = S(D.locale, null, !0), this.parse(D), this.$x = this.$x || D.x || {}, this[u] = !0;
        }
        var w = I.prototype;
        return w.parse = function(D) {
          this.$d = (function(F) {
            var x = F.date, B = F.utc;
            if (x === null) return /* @__PURE__ */ new Date(NaN);
            if (R.u(x)) return /* @__PURE__ */ new Date();
            if (x instanceof Date) return new Date(x);
            if (typeof x == "string" && !/Z$/i.test(x)) {
              var G = x.match(A);
              if (G) {
                var te = G[2] - 1 || 0, Z = (G[7] || "0").substring(0, 3);
                return B ? new Date(Date.UTC(G[1], te, G[3] || 1, G[4] || 0, G[5] || 0, G[6] || 0, Z)) : new Date(G[1], te, G[3] || 1, G[4] || 0, G[5] || 0, G[6] || 0, Z);
              }
            }
            return new Date(x);
          })(D), this.init();
        }, w.init = function() {
          var D = this.$d;
          this.$y = D.getFullYear(), this.$M = D.getMonth(), this.$D = D.getDate(), this.$W = D.getDay(), this.$H = D.getHours(), this.$m = D.getMinutes(), this.$s = D.getSeconds(), this.$ms = D.getMilliseconds();
        }, w.$utils = function() {
          return R;
        }, w.isValid = function() {
          return this.$d.toString() !== C;
        }, w.isSame = function(D, F) {
          var x = P(D);
          return this.startOf(F) <= x && x <= this.endOf(F);
        }, w.isAfter = function(D, F) {
          return P(D) < this.startOf(F);
        }, w.isBefore = function(D, F) {
          return this.endOf(F) < P(D);
        }, w.$g = function(D, F, x) {
          return R.u(D) ? this[F] : this.set(x, D);
        }, w.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, w.valueOf = function() {
          return this.$d.getTime();
        }, w.startOf = function(D, F) {
          var x = this, B = !!R.u(F) || F, G = R.p(D), te = function(Fe, ge) {
            var Me = R.w(x.$u ? Date.UTC(x.$y, ge, Fe) : new Date(x.$y, ge, Fe), x);
            return B ? Me : Me.endOf(f);
          }, Z = function(Fe, ge) {
            return R.w(x.toDate()[Fe].apply(x.toDate("s"), (B ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ge)), x);
          }, fe = this.$W, de = this.$M, be = this.$D, Ge = "set" + (this.$u ? "UTC" : "");
          switch (G) {
            case T:
              return B ? te(1, 0) : te(31, 11);
            case m:
              return B ? te(1, de) : te(0, de + 1);
            case p:
              var Ue = this.$locale().weekStart || 0, nt = (fe < Ue ? fe + 7 : fe) - Ue;
              return te(B ? be - nt : be + (6 - nt), de);
            case f:
            case N:
              return Z(Ge + "Hours", 0);
            case i:
              return Z(Ge + "Minutes", 1);
            case l:
              return Z(Ge + "Seconds", 2);
            case a:
              return Z(Ge + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, w.endOf = function(D) {
          return this.startOf(D, !1);
        }, w.$set = function(D, F) {
          var x, B = R.p(D), G = "set" + (this.$u ? "UTC" : ""), te = (x = {}, x[f] = G + "Date", x[N] = G + "Date", x[m] = G + "Month", x[T] = G + "FullYear", x[i] = G + "Hours", x[l] = G + "Minutes", x[a] = G + "Seconds", x[s] = G + "Milliseconds", x)[B], Z = B === f ? this.$D + (F - this.$W) : F;
          if (B === m || B === T) {
            var fe = this.clone().set(N, 1);
            fe.$d[te](Z), fe.init(), this.$d = fe.set(N, Math.min(this.$D, fe.daysInMonth())).$d;
          } else te && this.$d[te](Z);
          return this.init(), this;
        }, w.set = function(D, F) {
          return this.clone().$set(D, F);
        }, w.get = function(D) {
          return this[R.p(D)]();
        }, w.add = function(D, F) {
          var x, B = this;
          D = Number(D);
          var G = R.p(F), te = function(de) {
            var be = P(B);
            return R.w(be.date(be.date() + Math.round(de * D)), B);
          };
          if (G === m) return this.set(m, this.$M + D);
          if (G === T) return this.set(T, this.$y + D);
          if (G === f) return te(1);
          if (G === p) return te(7);
          var Z = (x = {}, x[l] = r, x[i] = o, x[a] = n, x)[G] || 1, fe = this.$d.getTime() + D * Z;
          return R.w(fe, this);
        }, w.subtract = function(D, F) {
          return this.add(-1 * D, F);
        }, w.format = function(D) {
          var F = this, x = this.$locale();
          if (!this.isValid()) return x.invalidDate || C;
          var B = D || "YYYY-MM-DDTHH:mm:ssZ", G = R.z(this), te = this.$H, Z = this.$m, fe = this.$M, de = x.weekdays, be = x.months, Ge = x.meridiem, Ue = function(ge, Me, ze, at) {
            return ge && (ge[Me] || ge(F, B)) || ze[Me].slice(0, at);
          }, nt = function(ge) {
            return R.s(te % 12 || 12, ge, "0");
          }, Fe = Ge || function(ge, Me, ze) {
            var at = ge < 12 ? "AM" : "PM";
            return ze ? at.toLowerCase() : at;
          };
          return B.replace(E, (function(ge, Me) {
            return Me || (function(ze) {
              switch (ze) {
                case "YY":
                  return String(F.$y).slice(-2);
                case "YYYY":
                  return R.s(F.$y, 4, "0");
                case "M":
                  return fe + 1;
                case "MM":
                  return R.s(fe + 1, 2, "0");
                case "MMM":
                  return Ue(x.monthsShort, fe, be, 3);
                case "MMMM":
                  return Ue(be, fe);
                case "D":
                  return F.$D;
                case "DD":
                  return R.s(F.$D, 2, "0");
                case "d":
                  return String(F.$W);
                case "dd":
                  return Ue(x.weekdaysMin, F.$W, de, 2);
                case "ddd":
                  return Ue(x.weekdaysShort, F.$W, de, 3);
                case "dddd":
                  return de[F.$W];
                case "H":
                  return String(te);
                case "HH":
                  return R.s(te, 2, "0");
                case "h":
                  return nt(1);
                case "hh":
                  return nt(2);
                case "a":
                  return Fe(te, Z, !0);
                case "A":
                  return Fe(te, Z, !1);
                case "m":
                  return String(Z);
                case "mm":
                  return R.s(Z, 2, "0");
                case "s":
                  return String(F.$s);
                case "ss":
                  return R.s(F.$s, 2, "0");
                case "SSS":
                  return R.s(F.$ms, 3, "0");
                case "Z":
                  return G;
              }
              return null;
            })(ge) || G.replace(":", "");
          }));
        }, w.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, w.diff = function(D, F, x) {
          var B, G = this, te = R.p(F), Z = P(D), fe = (Z.utcOffset() - this.utcOffset()) * r, de = this - Z, be = function() {
            return R.m(G, Z);
          };
          switch (te) {
            case T:
              B = be() / 12;
              break;
            case m:
              B = be();
              break;
            case _:
              B = be() / 3;
              break;
            case p:
              B = (de - fe) / 6048e5;
              break;
            case f:
              B = (de - fe) / 864e5;
              break;
            case i:
              B = de / o;
              break;
            case l:
              B = de / r;
              break;
            case a:
              B = de / n;
              break;
            default:
              B = de;
          }
          return x ? B : R.a(B);
        }, w.daysInMonth = function() {
          return this.endOf(m).$D;
        }, w.$locale = function() {
          return c[this.$L];
        }, w.locale = function(D, F) {
          if (!D) return this.$L;
          var x = this.clone(), B = S(D, F, !0);
          return B && (x.$L = B), x;
        }, w.clone = function() {
          return R.w(this.$d, this);
        }, w.toDate = function() {
          return new Date(this.valueOf());
        }, w.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, w.toISOString = function() {
          return this.$d.toISOString();
        }, w.toString = function() {
          return this.$d.toUTCString();
        }, I;
      })(), K = U.prototype;
      return P.prototype = K, [["$ms", s], ["$s", a], ["$m", l], ["$H", i], ["$W", f], ["$M", m], ["$y", T], ["$D", N]].forEach((function(I) {
        K[I[1]] = function(w) {
          return this.$g(w, I[0], I[1]);
        };
      })), P.extend = function(I, w) {
        return I.$i || (I(w, U, P), I.$i = !0), P;
      }, P.locale = S, P.isDayjs = b, P.unix = function(I) {
        return P(1e3 * I);
      }, P.en = c[h], P.Ls = c, P.p = {}, P;
    }));
  })(qt)), qt.exports;
}
var ul = pr();
const Nt = /* @__PURE__ */ vr(ul);
var Qt = { exports: {} }, cl = Qt.exports, va;
function fl() {
  return va || (va = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r(pr());
    })(cl, (function(n) {
      function r(a) {
        return a && typeof a == "object" && "default" in a ? a : { default: a };
      }
      var o = r(n), s = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(a, l) {
        return l === "W" ? a + "周" : a + "日";
      }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(a, l) {
        var i = 100 * a + l;
        return i < 600 ? "凌晨" : i < 900 ? "早上" : i < 1100 ? "上午" : i < 1300 ? "中午" : i < 1800 ? "下午" : "晚上";
      } };
      return o.default.locale(s, null, !0), s;
    }));
  })(Qt)), Qt.exports;
}
fl();
const dl = { class: "add-sub-days" }, ml = { class: "tips-box" }, _l = { class: "radio-group" }, vl = { class: "tips-group" }, pl = {
  class: "tips-box",
  style: { width: "88px" }
}, hl = {
  class: "tips-box",
  style: { width: "88px" }
}, gl = {
  class: "tips-box",
  style: { width: "88px" }
}, Al = { class: "select-group" }, yl = { class: "tips-box" }, El = {
  __name: "addSubDays",
  setup(e) {
    const t = Ke();
    _e(() => t.language, (p) => {
      Nt.locale(p);
    }, { immediate: !0 });
    const n = oe("2026-03-17"), r = oe("add"), o = oe("1"), s = oe("2"), a = oe("3"), l = J(() => {
      let p = [];
      for (let m = 0; m < 1e3; m++)
        p.push({
          label: m,
          value: m
        });
      return p;
    }), i = J(() => {
      let p = Nt(n.value), m = "add";
      r.value == "sub" && (m = "subtract");
      let _ = p;
      return o.value > 0 && (_ = _[m](o.value, "year")), s.value > 0 && (_ = _[m](s.value, "month")), a.value > 0 && (_ = _[m](a.value, "day")), _.format("YYYY-MM-DD dddd");
    }), f = (p) => {
      r.value = p;
    };
    return (p, m) => (Y(), z("div", dl, [
      W("div", ml, j(p.$t("dateCalculation.from")), 1),
      xn(W("input", {
        "onUpdate:modelValue": m[0] || (m[0] = (_) => n.value = _),
        type: "text"
      }, null, 512), [
        [Pn, n.value]
      ]),
      W("div", _l, [
        ve(_t, {
          value: "add",
          label: "dateCalculation.add",
          checked: r.value == "add",
          onChange: f
        }, null, 8, ["checked"]),
        ve(_t, {
          value: "sub",
          label: "dateCalculation.subtract",
          checked: r.value == "sub",
          onChange: f
        }, null, 8, ["checked"])
      ]),
      W("div", vl, [
        W("div", pl, j(p.$t("dateCalculation.year")), 1),
        W("div", hl, j(p.$t("dateCalculation.month")), 1),
        W("div", gl, j(p.$t("dateCalculation.day")), 1)
      ]),
      W("div", Al, [
        ve(kn, {
          class: "select-box",
          modelValue: o.value,
          "onUpdate:modelValue": m[1] || (m[1] = (_) => o.value = _),
          options: l.value
        }, null, 8, ["modelValue", "options"]),
        ve(kn, {
          class: "select-box",
          modelValue: s.value,
          "onUpdate:modelValue": m[2] || (m[2] = (_) => s.value = _),
          options: l.value
        }, null, 8, ["modelValue", "options"]),
        ve(kn, {
          class: "select-box",
          modelValue: a.value,
          "onUpdate:modelValue": m[3] || (m[3] = (_) => a.value = _),
          options: l.value
        }, null, 8, ["modelValue", "options"])
      ]),
      W("div", yl, j(p.$t("dateCalculation.date")), 1),
      W("div", null, j(i.value), 1)
    ]));
  }
}, bl = /* @__PURE__ */ ke(El, [["__scopeId", "data-v-102e904a"]]);
var Zt = { exports: {} }, Tl = Zt.exports, pa;
function Nl() {
  return pa || (pa = 1, (function(e, t) {
    (function(n, r) {
      e.exports = r();
    })(Tl, (function() {
      var n, r, o = 1e3, s = 6e4, a = 36e5, l = 864e5, i = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, f = 31536e6, p = 2628e6, m = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, _ = { years: f, months: p, days: l, hours: a, minutes: s, seconds: o, milliseconds: 1, weeks: 6048e5 }, T = function(c) {
        return c instanceof y;
      }, N = function(c, u, b) {
        return new y(c, b, u.$l);
      }, C = function(c) {
        return r.p(c) + "s";
      }, A = function(c) {
        return c < 0;
      }, E = function(c) {
        return A(c) ? Math.ceil(c) : Math.floor(c);
      }, k = function(c) {
        return Math.abs(c);
      }, g = function(c, u) {
        return c ? A(c) ? { negative: !0, format: "" + k(c) + u } : { negative: !1, format: "" + c + u } : { negative: !1, format: "" };
      }, y = (function() {
        function c(b, S, P) {
          var R = this;
          if (this.$d = {}, this.$l = P, b === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), S) return N(b * _[C(S)], this);
          if (typeof b == "number") return this.$ms = b, this.parseFromMilliseconds(), this;
          if (typeof b == "object") return Object.keys(b).forEach((function(I) {
            R.$d[C(I)] = b[I];
          })), this.calMilliseconds(), this;
          if (typeof b == "string") {
            var U = b.match(m);
            if (U) {
              var K = U.slice(2).map((function(I) {
                return I != null ? Number(I) : 0;
              }));
              return this.$d.years = K[0], this.$d.months = K[1], this.$d.weeks = K[2], this.$d.days = K[3], this.$d.hours = K[4], this.$d.minutes = K[5], this.$d.seconds = K[6], this.calMilliseconds(), this;
            }
          }
          return this;
        }
        var u = c.prototype;
        return u.calMilliseconds = function() {
          var b = this;
          this.$ms = Object.keys(this.$d).reduce((function(S, P) {
            return S + (b.$d[P] || 0) * _[P];
          }), 0);
        }, u.parseFromMilliseconds = function() {
          var b = this.$ms;
          this.$d.years = E(b / f), b %= f, this.$d.months = E(b / p), b %= p, this.$d.days = E(b / l), b %= l, this.$d.hours = E(b / a), b %= a, this.$d.minutes = E(b / s), b %= s, this.$d.seconds = E(b / o), b %= o, this.$d.milliseconds = b;
        }, u.toISOString = function() {
          var b = g(this.$d.years, "Y"), S = g(this.$d.months, "M"), P = +this.$d.days || 0;
          this.$d.weeks && (P += 7 * this.$d.weeks);
          var R = g(P, "D"), U = g(this.$d.hours, "H"), K = g(this.$d.minutes, "M"), I = this.$d.seconds || 0;
          this.$d.milliseconds && (I += this.$d.milliseconds / 1e3, I = Math.round(1e3 * I) / 1e3);
          var w = g(I, "S"), D = b.negative || S.negative || R.negative || U.negative || K.negative || w.negative, F = U.format || K.format || w.format ? "T" : "", x = (D ? "-" : "") + "P" + b.format + S.format + R.format + F + U.format + K.format + w.format;
          return x === "P" || x === "-P" ? "P0D" : x;
        }, u.toJSON = function() {
          return this.toISOString();
        }, u.format = function(b) {
          var S = b || "YYYY-MM-DDTHH:mm:ss", P = { Y: this.$d.years, YY: r.s(this.$d.years, 2, "0"), YYYY: r.s(this.$d.years, 4, "0"), M: this.$d.months, MM: r.s(this.$d.months, 2, "0"), D: this.$d.days, DD: r.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: r.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: r.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: r.s(this.$d.seconds, 2, "0"), SSS: r.s(this.$d.milliseconds, 3, "0") };
          return S.replace(i, (function(R, U) {
            return U || String(P[R]);
          }));
        }, u.as = function(b) {
          return this.$ms / _[C(b)];
        }, u.get = function(b) {
          var S = this.$ms, P = C(b);
          return P === "milliseconds" ? S %= 1e3 : S = P === "weeks" ? E(S / _[P]) : this.$d[P], S || 0;
        }, u.add = function(b, S, P) {
          var R;
          return R = S ? b * _[C(S)] : T(b) ? b.$ms : N(b, this).$ms, N(this.$ms + R * (P ? -1 : 1), this);
        }, u.subtract = function(b, S) {
          return this.add(b, S, !0);
        }, u.locale = function(b) {
          var S = this.clone();
          return S.$l = b, S;
        }, u.clone = function() {
          return N(this.$ms, this);
        }, u.humanize = function(b) {
          return n().add(this.$ms, "ms").locale(this.$l).fromNow(!b);
        }, u.valueOf = function() {
          return this.asMilliseconds();
        }, u.milliseconds = function() {
          return this.get("milliseconds");
        }, u.asMilliseconds = function() {
          return this.as("milliseconds");
        }, u.seconds = function() {
          return this.get("seconds");
        }, u.asSeconds = function() {
          return this.as("seconds");
        }, u.minutes = function() {
          return this.get("minutes");
        }, u.asMinutes = function() {
          return this.as("minutes");
        }, u.hours = function() {
          return this.get("hours");
        }, u.asHours = function() {
          return this.as("hours");
        }, u.days = function() {
          return this.get("days");
        }, u.asDays = function() {
          return this.as("days");
        }, u.weeks = function() {
          return this.get("weeks");
        }, u.asWeeks = function() {
          return this.as("weeks");
        }, u.months = function() {
          return this.get("months");
        }, u.asMonths = function() {
          return this.as("months");
        }, u.years = function() {
          return this.get("years");
        }, u.asYears = function() {
          return this.as("years");
        }, c;
      })(), h = function(c, u, b) {
        return c.add(u.years() * b, "y").add(u.months() * b, "M").add(u.days() * b, "d").add(u.hours() * b, "h").add(u.minutes() * b, "m").add(u.seconds() * b, "s").add(u.milliseconds() * b, "ms");
      };
      return function(c, u, b) {
        n = b, r = b().$utils(), b.duration = function(R, U) {
          var K = b.locale();
          return N(R, { $l: K }, U);
        }, b.isDuration = T;
        var S = u.prototype.add, P = u.prototype.subtract;
        u.prototype.add = function(R, U) {
          return T(R) ? h(this, R, 1) : S.bind(this)(R, U);
        }, u.prototype.subtract = function(R, U) {
          return T(R) ? h(this, R, -1) : P.bind(this)(R, U);
        };
      };
    }));
  })(Zt)), Zt.exports;
}
var Ol = Nl();
const Cl = /* @__PURE__ */ vr(Ol), kl = { class: "diff-dates" }, Sl = { class: "tips-box" }, Ll = { class: "tips-box" }, Il = { class: "tips-box" }, wl = { class: "tips-box" }, Dl = {
  __name: "diffDates",
  setup(e) {
    const t = oe("2026-01-28"), n = oe("2026-05-01"), r = J(() => {
      if (Nt.extend(Cl), t.value && n.value) {
        let o = Nt(t.value), s = Nt(n.value);
        const a = Nt.duration(s.diff(o)), l = s.diff(o, "month"), i = o.add(l, "month"), f = s.diff(i, "day");
        return {
          years: Math.abs(a.years()),
          months: Math.abs(a.months()),
          weeks: Math.floor(f / 7),
          days: f % 7,
          totalDays: Math.abs(s.diff(o, "day"))
        };
      } else
        console.log("值为空");
    });
    return (o, s) => (Y(), z("div", kl, [
      W("div", Sl, j(o.$t("dateCalculation.from")), 1),
      xn(W("input", {
        "onUpdate:modelValue": s[0] || (s[0] = (a) => t.value = a),
        type: "text"
      }, null, 512), [
        [Pn, t.value]
      ]),
      W("div", Ll, j(o.$t("dateCalculation.to")), 1),
      xn(W("input", {
        "onUpdate:modelValue": s[1] || (s[1] = (a) => n.value = a),
        type: "text"
      }, null, 512), [
        [Pn, n.value]
      ]),
      W("div", Il, j(o.$t("dateCalculation.difference")), 1),
      W("div", null, [
        r.value.years > 0 ? (Y(), z(Ie, { key: 0 }, [
          Ze(j(r.value.years) + " " + j(o.$t("dateCalculation.year")) + "; ", 1)
        ], 64)) : Le("", !0),
        r.value.months > 0 ? (Y(), z(Ie, { key: 1 }, [
          Ze(j(r.value.months) + " " + j(o.$t("dateCalculation.month")) + "; ", 1)
        ], 64)) : Le("", !0),
        r.value.weeks > 0 ? (Y(), z(Ie, { key: 2 }, [
          Ze(j(r.value.weeks) + " " + j(o.$t("dateCalculation.week")) + "; ", 1)
        ], 64)) : Le("", !0),
        r.value.days > 0 ? (Y(), z(Ie, { key: 3 }, [
          Ze(j(r.value.days) + " " + j(o.$t("dateCalculation.day")), 1)
        ], 64)) : Le("", !0)
      ]),
      W("div", wl, j(r.value.totalDays) + " " + j(o.$t("dateCalculation.day")), 1)
    ]));
  }
}, Ml = /* @__PURE__ */ ke(Dl, [["__scopeId", "data-v-8d13fa17"]]), xl = { class: "date-calculation" }, Pl = { class: "content-box" }, Rl = {
  __name: "index",
  setup(e) {
    const t = Ke(), n = pt("popoverButtonRef"), r = pt("popoverRef"), o = oe({}), s = oe(!1), a = oe({
      label: ""
    }), l = J(() => pn[t.activeMenu.key] || {}), i = J(() => l.value.keyboardList || []);
    _n(r, (m) => {
      s.value = !1;
    }), tt(() => {
      o.value = i.value[0] || {};
    });
    const f = () => {
      const { y: m } = tn(n);
      a.value = {
        left: "0px",
        top: m.value + "px"
      }, s.value = !0;
    }, p = (m, _) => {
      o.value = m, s.value = !1;
    };
    return (m, _) => {
      const T = un("SvgIcon");
      return Y(), z("div", xl, [
        W("div", {
          class: "popover-box",
          ref_key: "popoverRef",
          ref: r
        }, [
          W("div", {
            class: "popover-button",
            ref_key: "popoverButtonRef",
            ref: n,
            onClick: _[0] || (_[0] = (N) => f())
          }, [
            Ze(j(m.$t(o.value.label || "") || o.value.label), 1),
            ve(T, {
              name: "downwardArrow",
              size: "14px",
              style: { "margin-left": "4px" }
            })
          ], 512),
          s.value ? (Y(), z("div", {
            key: 0,
            class: "button-list",
            style: vt([a.value, { position: "fixed" }])
          }, [
            (Y(!0), z(Ie, null, ht(i.value, (N, C) => (Y(), De(Qn, {
              "active-keyboard-color": "var(--btn-hover)",
              "is-active": o.value.key == (N.key || N.label),
              key: C,
              onClick: (A) => p(N, m.index),
              style: { padding: "4px 8px" },
              "show-before-border": !0
            }, {
              default: zn(() => [
                W("div", null, j(m.$t(N.label)), 1)
              ]),
              _: 2
            }, 1032, ["is-active", "onClick"]))), 128))
          ], 4)) : Le("", !0)
        ], 512),
        W("div", Pl, [
          o.value.key == "AddSubDays" ? (Y(), De(bl, { key: 0 })) : Le("", !0),
          o.value.key == "DiffDates" ? (Y(), De(Ml, { key: 1 })) : Le("", !0)
        ])
      ]);
    };
  }
}, $l = /* @__PURE__ */ ke(Rl, [["__scopeId", "data-v-aec03ce2"]]), Ul = { class: "settings-box" }, Fl = { class: "title" }, Vl = { class: "item-box" }, Yl = { class: "item-title" }, Wl = { class: "title-tips" }, Hl = { class: "item-content-box radio-group" }, Bl = { class: "item-box" }, Gl = { class: "item-title" }, jl = { class: "title-tips" }, Kl = { class: "item-content-box radio-group" }, Xl = { class: "title" }, zl = { class: "item-box" }, Jl = { class: "item-title" }, ql = { class: "title-tips" }, Ql = { class: "item-content-box" }, Zl = ["innerHTML"], ei = {
  __name: "index",
  setup(e) {
    const t = Ke(), n = dr({
      emitAuto: !0
    }), r = J({
      get: () => t.language,
      set: (a) => {
        t.setLanguage(a);
      }
    }), o = (a) => {
      n.value = a;
    }, s = (a) => {
      r.value = a;
    };
    return (a, l) => (Y(), z("div", Ul, [
      W("div", Fl, j(a.$t("settings.appearance")), 1),
      W("div", Vl, [
        W("div", Yl, j(a.$t("settings.appTheme")), 1),
        W("div", Wl, j(a.$t("settings.appThemeTips")), 1)
      ]),
      W("div", Hl, [
        ve(_t, {
          value: "light",
          label: "settings.appThemeOptions.light",
          checked: le(n) == "light",
          onChange: o
        }, null, 8, ["checked"]),
        ve(_t, {
          value: "dark",
          label: "settings.appThemeOptions.dark",
          checked: le(n) == "dark",
          onChange: o
        }, null, 8, ["checked"]),
        ve(_t, {
          value: "auto",
          label: "settings.appThemeOptions.useSystemSetting",
          checked: le(n) == "auto",
          onChange: o
        }, null, 8, ["checked"])
      ]),
      W("div", Bl, [
        W("div", Gl, j(a.$t("settings.language")), 1),
        W("div", jl, j(a.$t("settings.languageTips")), 1)
      ]),
      W("div", Kl, [
        ve(_t, {
          value: "en",
          label: "English",
          checked: r.value == "en",
          onChange: s
        }, null, 8, ["checked"]),
        ve(_t, {
          value: "zh-cn",
          label: "中文",
          checked: r.value == "zh-cn",
          onChange: s
        }, null, 8, ["checked"])
      ]),
      W("div", Xl, j(a.$t("settings.about")), 1),
      W("div", zl, [
        W("div", Jl, j(a.$t("calculator.calculator")), 1),
        W("div", ql, j(a.$t("settings.aboutTips")), 1)
      ]),
      W("div", Ql, [
        W("div", null, j(le(t).version), 1),
        W("div", {
          style: { "font-size": "12px" },
          innerHTML: a.$t("settings.githubTips")
        }, null, 8, Zl)
      ])
    ]));
  }
}, ti = /* @__PURE__ */ ke(ei, [["__scopeId", "data-v-710e9ac9"]]), ni = { class: "main-box" }, ai = {
  __name: "main",
  setup(e) {
    const t = Ke(), n = oe(!1), r = J({
      get: () => t.activeMenu,
      set: (s) => {
        t.setActiveMenu(s);
      }
    }), o = (s) => {
      n.value = s;
    };
    return (s, a) => (Y(), z("div", ni, [
      ve(Ss, {
        onMoreClick: o,
        name: r.value.name
      }, null, 8, ["name"]),
      r.value.key == "dateCalculation" ? (Y(), De($l, {
        key: 0,
        style: { flex: "1", height: "1px" }
      })) : r.value.key == "settings" ? (Y(), De(ti, { key: 1 })) : (Y(), z(Ie, { key: 2 }, [
        ve(ho, { style: { flex: "1", height: "1px" } }),
        ve(yo),
        ve(Qo, { style: { flex: "4", height: "1px" } })
      ], 64)),
      n.value ? (Y(), De(rl, {
        key: 3,
        class: "more-box",
        "active-menu": r.value,
        "onUpdate:activeMenu": a[0] || (a[0] = (l) => r.value = l),
        onMoreClick: o
      }, null, 8, ["active-menu"])) : Le("", !0)
    ]));
  }
}, ri = /* @__PURE__ */ ke(ai, [["__scopeId", "data-v-df5a8920"]]);
/*!
  * shared v9.14.4
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const He = typeof window < "u";
let we, gt;
if (process.env.NODE_ENV !== "production") {
  const e = He && window.performance;
  e && e.mark && e.measure && e.clearMarks && // @ts-ignore browser compat
  e.clearMeasures && (we = (t) => {
    e.mark(t);
  }, gt = (t, n, r) => {
    e.measure(t, n, r), e.clearMarks(n), e.clearMarks(r);
  });
}
const si = /\{([0-9a-zA-Z]+)\}/g;
function ea(e, ...t) {
  return t.length === 1 && Q(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(si, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const Xe = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), oi = (e, t, n) => li({ l: e, k: t, s: n }), li = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), pe = (e) => typeof e == "number" && isFinite(e), ii = (e) => gr(e) === "[object Date]", rn = (e) => gr(e) === "[object RegExp]", hn = (e) => q(e) && Object.keys(e).length === 0, Ne = Object.assign, ui = Object.create, ae = (e = null) => ui(e);
let ha;
const Ut = () => ha || (ha = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : ae());
function ga(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const ci = Object.prototype.hasOwnProperty;
function We(e, t) {
  return ci.call(e, t);
}
const he = Array.isArray, ce = (e) => typeof e == "function", $ = (e) => typeof e == "string", ie = (e) => typeof e == "boolean", Q = (e) => e !== null && typeof e == "object", fi = (e) => Q(e) && ce(e.then) && ce(e.catch), hr = Object.prototype.toString, gr = (e) => hr.call(e), q = (e) => {
  if (!Q(e))
    return !1;
  const t = Object.getPrototypeOf(e);
  return t === null || t.constructor === Object;
}, di = (e) => e == null ? "" : he(e) || q(e) && e.toString === hr ? JSON.stringify(e, null, 2) : String(e);
function mi(e, t = "") {
  return e.reduce((n, r, o) => o === 0 ? n + r : n + t + r, "");
}
const Aa = 2;
function _i(e, t = 0, n = e.length) {
  const r = e.split(/\r?\n/);
  let o = 0;
  const s = [];
  for (let a = 0; a < r.length; a++)
    if (o += r[a].length + 1, o >= t) {
      for (let l = a - Aa; l <= a + Aa || n > o; l++) {
        if (l < 0 || l >= r.length)
          continue;
        const i = l + 1;
        s.push(`${i}${" ".repeat(3 - String(i).length)}|  ${r[l]}`);
        const f = r[l].length;
        if (l === a) {
          const p = t - (o - f) + 1, m = Math.max(1, n > o ? f - p : n - t);
          s.push("   |  " + " ".repeat(p) + "^".repeat(m));
        } else if (l > a) {
          if (n > o) {
            const p = Math.max(Math.min(n - o, f), 1);
            s.push("   |  " + "^".repeat(p));
          }
          o += f + 1;
        }
      }
      break;
    }
  return s.join(`
`);
}
function gn(e) {
  let t = e;
  return () => ++t;
}
function Be(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const ya = {};
function Ar(e) {
  ya[e] || (ya[e] = !0, Be(e));
}
function yr() {
  const e = /* @__PURE__ */ new Map();
  return {
    events: e,
    on(n, r) {
      const o = e.get(n);
      o && o.push(r) || e.set(n, [r]);
    },
    off(n, r) {
      const o = e.get(n);
      o && o.splice(o.indexOf(r) >>> 0, 1);
    },
    emit(n, r) {
      (e.get(n) || []).slice().map((o) => o(r)), (e.get("*") || []).slice().map((o) => o(n, r));
    }
  };
}
const jt = (e) => !Q(e) || he(e);
function en(e, t) {
  if (jt(e) || jt(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: o } = n.pop();
    Object.keys(r).forEach((s) => {
      s !== "__proto__" && (Q(r[s]) && !Q(o[s]) && (o[s] = Array.isArray(r[s]) ? [] : ae()), jt(o[s]) || jt(r[s]) ? o[s] = r[s] : n.push({ src: r[s], des: o[s] }));
    });
  }
}
/*!
  * message-compiler v9.14.4
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function vi(e, t, n) {
  return { line: e, column: t, offset: n };
}
function sn(e, t, n) {
  return { start: e, end: t };
}
const pi = /\{([0-9a-zA-Z]+)\}/g;
function Er(e, ...t) {
  return t.length === 1 && hi(t[0]) && (t = t[0]), (!t || !t.hasOwnProperty) && (t = {}), e.replace(pi, (n, r) => t.hasOwnProperty(r) ? t[r] : "");
}
const br = Object.assign, Ea = (e) => typeof e == "string", hi = (e) => e !== null && typeof e == "object";
function Tr(e, t = "") {
  return e.reduce((n, r, o) => o === 0 ? n + r : n + t + r, "");
}
const An = {
  USE_MODULO_SYNTAX: 1,
  __EXTEND_POINT__: 2
}, gi = {
  [An.USE_MODULO_SYNTAX]: "Use modulo before '{{0}}'."
};
function Ai(e, t, ...n) {
  const r = Er(gi[e], ...n || []), o = { message: String(r), code: e };
  return t && (o.location = t), o;
}
const H = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 17
}, yi = {
  // tokenizer error messages
  [H.EXPECTED_TOKEN]: "Expected token: '{0}'",
  [H.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
  [H.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
  [H.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
  [H.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
  [H.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
  [H.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
  [H.EMPTY_PLACEHOLDER]: "Empty placeholder",
  [H.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
  [H.INVALID_LINKED_FORMAT]: "Invalid linked format",
  // parser error messages
  [H.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
  [H.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
  [H.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
  [H.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'",
  // generator error messages
  [H.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
  // minimizer error messages
  [H.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'"
};
function Lt(e, t, n = {}) {
  const { domain: r, messages: o, args: s } = n, a = Er((o || yi)[e] || "", ...s || []), l = new SyntaxError(String(a));
  return l.code = e, t && (l.location = t), l.domain = r, l;
}
function Ei(e) {
  throw e;
}
const bi = /<\/?[\w\s="/.':;#-\/]+>/, Ti = (e) => bi.test(e), Je = " ", Ni = "\r", Oe = `
`, Oi = "\u2028", Ci = "\u2029";
function ki(e) {
  const t = e;
  let n = 0, r = 1, o = 1, s = 0;
  const a = (u) => t[u] === Ni && t[u + 1] === Oe, l = (u) => t[u] === Oe, i = (u) => t[u] === Ci, f = (u) => t[u] === Oi, p = (u) => a(u) || l(u) || i(u) || f(u), m = () => n, _ = () => r, T = () => o, N = () => s, C = (u) => a(u) || i(u) || f(u) ? Oe : t[u], A = () => C(n), E = () => C(n + s);
  function k() {
    return s = 0, p(n) && (r++, o = 0), a(n) && n++, n++, o++, t[n];
  }
  function g() {
    return a(n + s) && s++, s++, t[n + s];
  }
  function y() {
    n = 0, r = 1, o = 1, s = 0;
  }
  function h(u = 0) {
    s = u;
  }
  function c() {
    const u = n + s;
    for (; u !== n; )
      k();
    s = 0;
  }
  return {
    index: m,
    line: _,
    column: T,
    peekOffset: N,
    charAt: C,
    currentChar: A,
    currentPeek: E,
    next: k,
    peek: g,
    reset: y,
    resetPeek: h,
    skipToPeek: c
  };
}
const st = void 0, Si = ".", ba = "'", Li = "tokenizer";
function Ii(e, t = {}) {
  const n = t.location !== !1, r = ki(e), o = () => r.index(), s = () => vi(r.line(), r.column(), r.index()), a = s(), l = o(), i = {
    currentType: 14,
    offset: l,
    startLoc: a,
    endLoc: a,
    lastType: 14,
    lastOffset: l,
    lastStartLoc: a,
    lastEndLoc: a,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, f = () => i, { onError: p } = t;
  function m(d, v, L, ...V) {
    const ue = f();
    if (v.column += L, v.offset += L, p) {
      const re = n ? sn(ue.startLoc, v) : null, ne = Lt(d, re, {
        domain: Li,
        args: V
      });
      p(ne);
    }
  }
  function _(d, v, L) {
    d.endLoc = s(), d.currentType = v;
    const V = { type: v };
    return n && (V.loc = sn(d.startLoc, d.endLoc)), L != null && (V.value = L), V;
  }
  const T = (d) => _(
    d,
    14
    /* TokenTypes.EOF */
  );
  function N(d, v) {
    return d.currentChar() === v ? (d.next(), v) : (m(H.EXPECTED_TOKEN, s(), 0, v), "");
  }
  function C(d) {
    let v = "";
    for (; d.currentPeek() === Je || d.currentPeek() === Oe; )
      v += d.currentPeek(), d.peek();
    return v;
  }
  function A(d) {
    const v = C(d);
    return d.skipToPeek(), v;
  }
  function E(d) {
    if (d === st)
      return !1;
    const v = d.charCodeAt(0);
    return v >= 97 && v <= 122 || // a-z
    v >= 65 && v <= 90 || // A-Z
    v === 95;
  }
  function k(d) {
    if (d === st)
      return !1;
    const v = d.charCodeAt(0);
    return v >= 48 && v <= 57;
  }
  function g(d, v) {
    const { currentType: L } = v;
    if (L !== 2)
      return !1;
    C(d);
    const V = E(d.currentPeek());
    return d.resetPeek(), V;
  }
  function y(d, v) {
    const { currentType: L } = v;
    if (L !== 2)
      return !1;
    C(d);
    const V = d.currentPeek() === "-" ? d.peek() : d.currentPeek(), ue = k(V);
    return d.resetPeek(), ue;
  }
  function h(d, v) {
    const { currentType: L } = v;
    if (L !== 2)
      return !1;
    C(d);
    const V = d.currentPeek() === ba;
    return d.resetPeek(), V;
  }
  function c(d, v) {
    const { currentType: L } = v;
    if (L !== 8)
      return !1;
    C(d);
    const V = d.currentPeek() === ".";
    return d.resetPeek(), V;
  }
  function u(d, v) {
    const { currentType: L } = v;
    if (L !== 9)
      return !1;
    C(d);
    const V = E(d.currentPeek());
    return d.resetPeek(), V;
  }
  function b(d, v) {
    const { currentType: L } = v;
    if (!(L === 8 || L === 12))
      return !1;
    C(d);
    const V = d.currentPeek() === ":";
    return d.resetPeek(), V;
  }
  function S(d, v) {
    const { currentType: L } = v;
    if (L !== 10)
      return !1;
    const V = () => {
      const re = d.currentPeek();
      return re === "{" ? E(d.peek()) : re === "@" || re === "%" || re === "|" || re === ":" || re === "." || re === Je || !re ? !1 : re === Oe ? (d.peek(), V()) : U(d, !1);
    }, ue = V();
    return d.resetPeek(), ue;
  }
  function P(d) {
    C(d);
    const v = d.currentPeek() === "|";
    return d.resetPeek(), v;
  }
  function R(d) {
    const v = C(d), L = d.currentPeek() === "%" && d.peek() === "{";
    return d.resetPeek(), {
      isModulo: L,
      hasSpace: v.length > 0
    };
  }
  function U(d, v = !0) {
    const L = (ue = !1, re = "", ne = !1) => {
      const O = d.currentPeek();
      return O === "{" ? re === "%" ? !1 : ue : O === "@" || !O ? re === "%" ? !0 : ue : O === "%" ? (d.peek(), L(ue, "%", !0)) : O === "|" ? re === "%" || ne ? !0 : !(re === Je || re === Oe) : O === Je ? (d.peek(), L(!0, Je, ne)) : O === Oe ? (d.peek(), L(!0, Oe, ne)) : !0;
    }, V = L();
    return v && d.resetPeek(), V;
  }
  function K(d, v) {
    const L = d.currentChar();
    return L === st ? st : v(L) ? (d.next(), L) : null;
  }
  function I(d) {
    const v = d.charCodeAt(0);
    return v >= 97 && v <= 122 || // a-z
    v >= 65 && v <= 90 || // A-Z
    v >= 48 && v <= 57 || // 0-9
    v === 95 || // _
    v === 36;
  }
  function w(d) {
    return K(d, I);
  }
  function D(d) {
    const v = d.charCodeAt(0);
    return v >= 97 && v <= 122 || // a-z
    v >= 65 && v <= 90 || // A-Z
    v >= 48 && v <= 57 || // 0-9
    v === 95 || // _
    v === 36 || // $
    v === 45;
  }
  function F(d) {
    return K(d, D);
  }
  function x(d) {
    const v = d.charCodeAt(0);
    return v >= 48 && v <= 57;
  }
  function B(d) {
    return K(d, x);
  }
  function G(d) {
    const v = d.charCodeAt(0);
    return v >= 48 && v <= 57 || // 0-9
    v >= 65 && v <= 70 || // A-F
    v >= 97 && v <= 102;
  }
  function te(d) {
    return K(d, G);
  }
  function Z(d) {
    let v = "", L = "";
    for (; v = B(d); )
      L += v;
    return L;
  }
  function fe(d) {
    A(d);
    const v = d.currentChar();
    return v !== "%" && m(H.EXPECTED_TOKEN, s(), 0, v), d.next(), "%";
  }
  function de(d) {
    let v = "";
    for (; ; ) {
      const L = d.currentChar();
      if (L === "{" || L === "}" || L === "@" || L === "|" || !L)
        break;
      if (L === "%")
        if (U(d))
          v += L, d.next();
        else
          break;
      else if (L === Je || L === Oe)
        if (U(d))
          v += L, d.next();
        else {
          if (P(d))
            break;
          v += L, d.next();
        }
      else
        v += L, d.next();
    }
    return v;
  }
  function be(d) {
    A(d);
    let v = "", L = "";
    for (; v = F(d); )
      L += v;
    return d.currentChar() === st && m(H.UNTERMINATED_CLOSING_BRACE, s(), 0), L;
  }
  function Ge(d) {
    A(d);
    let v = "";
    return d.currentChar() === "-" ? (d.next(), v += `-${Z(d)}`) : v += Z(d), d.currentChar() === st && m(H.UNTERMINATED_CLOSING_BRACE, s(), 0), v;
  }
  function Ue(d) {
    return d !== ba && d !== Oe;
  }
  function nt(d) {
    A(d), N(d, "'");
    let v = "", L = "";
    for (; v = K(d, Ue); )
      v === "\\" ? L += Fe(d) : L += v;
    const V = d.currentChar();
    return V === Oe || V === st ? (m(H.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, s(), 0), V === Oe && (d.next(), N(d, "'")), L) : (N(d, "'"), L);
  }
  function Fe(d) {
    const v = d.currentChar();
    switch (v) {
      case "\\":
      case "'":
        return d.next(), `\\${v}`;
      case "u":
        return ge(d, v, 4);
      case "U":
        return ge(d, v, 6);
      default:
        return m(H.UNKNOWN_ESCAPE_SEQUENCE, s(), 0, v), "";
    }
  }
  function ge(d, v, L) {
    N(d, v);
    let V = "";
    for (let ue = 0; ue < L; ue++) {
      const re = te(d);
      if (!re) {
        m(H.INVALID_UNICODE_ESCAPE_SEQUENCE, s(), 0, `\\${v}${V}${d.currentChar()}`);
        break;
      }
      V += re;
    }
    return `\\${v}${V}`;
  }
  function Me(d) {
    return d !== "{" && d !== "}" && d !== Je && d !== Oe;
  }
  function ze(d) {
    A(d);
    let v = "", L = "";
    for (; v = K(d, Me); )
      L += v;
    return L;
  }
  function at(d) {
    let v = "", L = "";
    for (; v = w(d); )
      L += v;
    return L;
  }
  function Tn(d) {
    const v = (L) => {
      const V = d.currentChar();
      return V === "{" || V === "%" || V === "@" || V === "|" || V === "(" || V === ")" || !V || V === Je ? L : (L += V, d.next(), v(L));
    };
    return v("");
  }
  function It(d) {
    A(d);
    const v = N(
      d,
      "|"
      /* TokenChars.Pipe */
    );
    return A(d), v;
  }
  function wt(d, v) {
    let L = null;
    switch (d.currentChar()) {
      case "{":
        return v.braceNest >= 1 && m(H.NOT_ALLOW_NEST_PLACEHOLDER, s(), 0), d.next(), L = _(
          v,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), A(d), v.braceNest++, L;
      case "}":
        return v.braceNest > 0 && v.currentType === 2 && m(H.EMPTY_PLACEHOLDER, s(), 0), d.next(), L = _(
          v,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), v.braceNest--, v.braceNest > 0 && A(d), v.inLinked && v.braceNest === 0 && (v.inLinked = !1), L;
      case "@":
        return v.braceNest > 0 && m(H.UNTERMINATED_CLOSING_BRACE, s(), 0), L = ct(d, v) || T(v), v.braceNest = 0, L;
      default: {
        let ue = !0, re = !0, ne = !0;
        if (P(d))
          return v.braceNest > 0 && m(H.UNTERMINATED_CLOSING_BRACE, s(), 0), L = _(v, 1, It(d)), v.braceNest = 0, v.inLinked = !1, L;
        if (v.braceNest > 0 && (v.currentType === 5 || v.currentType === 6 || v.currentType === 7))
          return m(H.UNTERMINATED_CLOSING_BRACE, s(), 0), v.braceNest = 0, Dt(d, v);
        if (ue = g(d, v))
          return L = _(v, 5, be(d)), A(d), L;
        if (re = y(d, v))
          return L = _(v, 6, Ge(d)), A(d), L;
        if (ne = h(d, v))
          return L = _(v, 7, nt(d)), A(d), L;
        if (!ue && !re && !ne)
          return L = _(v, 13, ze(d)), m(H.INVALID_TOKEN_IN_PLACEHOLDER, s(), 0, L.value), A(d), L;
        break;
      }
    }
    return L;
  }
  function ct(d, v) {
    const { currentType: L } = v;
    let V = null;
    const ue = d.currentChar();
    switch ((L === 8 || L === 9 || L === 12 || L === 10) && (ue === Oe || ue === Je) && m(H.INVALID_LINKED_FORMAT, s(), 0), ue) {
      case "@":
        return d.next(), V = _(
          v,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        ), v.inLinked = !0, V;
      case ".":
        return A(d), d.next(), _(
          v,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return A(d), d.next(), _(
          v,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return P(d) ? (V = _(v, 1, It(d)), v.braceNest = 0, v.inLinked = !1, V) : c(d, v) || b(d, v) ? (A(d), ct(d, v)) : u(d, v) ? (A(d), _(v, 12, at(d))) : S(d, v) ? (A(d), ue === "{" ? wt(d, v) || V : _(v, 11, Tn(d))) : (L === 8 && m(H.INVALID_LINKED_FORMAT, s(), 0), v.braceNest = 0, v.inLinked = !1, Dt(d, v));
    }
  }
  function Dt(d, v) {
    let L = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (v.braceNest > 0)
      return wt(d, v) || T(v);
    if (v.inLinked)
      return ct(d, v) || T(v);
    switch (d.currentChar()) {
      case "{":
        return wt(d, v) || T(v);
      case "}":
        return m(H.UNBALANCED_CLOSING_BRACE, s(), 0), d.next(), _(
          v,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return ct(d, v) || T(v);
      default: {
        if (P(d))
          return L = _(v, 1, It(d)), v.braceNest = 0, v.inLinked = !1, L;
        const { isModulo: ue, hasSpace: re } = R(d);
        if (ue)
          return re ? _(v, 0, de(d)) : _(v, 4, fe(d));
        if (U(d))
          return _(v, 0, de(d));
        break;
      }
    }
    return L;
  }
  function Nn() {
    const { currentType: d, offset: v, startLoc: L, endLoc: V } = i;
    return i.lastType = d, i.lastOffset = v, i.lastStartLoc = L, i.lastEndLoc = V, i.offset = o(), i.startLoc = s(), r.currentChar() === st ? _(
      i,
      14
      /* TokenTypes.EOF */
    ) : Dt(r, i);
  }
  return {
    nextToken: Nn,
    currentOffset: o,
    currentPosition: s,
    context: f
  };
}
const wi = "parser", Di = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Mi(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    // eslint-disable-next-line no-useless-escape
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "�";
    }
  }
}
function xi(e = {}) {
  const t = e.location !== !1, { onError: n, onWarn: r } = e;
  function o(g, y, h, c, ...u) {
    const b = g.currentPosition();
    if (b.offset += c, b.column += c, n) {
      const S = t ? sn(h, b) : null, P = Lt(y, S, {
        domain: wi,
        args: u
      });
      n(P);
    }
  }
  function s(g, y, h, c, ...u) {
    const b = g.currentPosition();
    if (b.offset += c, b.column += c, r) {
      const S = t ? sn(h, b) : null;
      r(Ai(y, S, u));
    }
  }
  function a(g, y, h) {
    const c = { type: g };
    return t && (c.start = y, c.end = y, c.loc = { start: h, end: h }), c;
  }
  function l(g, y, h, c) {
    t && (g.end = y, g.loc && (g.loc.end = h));
  }
  function i(g, y) {
    const h = g.context(), c = a(3, h.offset, h.startLoc);
    return c.value = y, l(c, g.currentOffset(), g.currentPosition()), c;
  }
  function f(g, y) {
    const h = g.context(), { lastOffset: c, lastStartLoc: u } = h, b = a(5, c, u);
    return b.index = parseInt(y, 10), g.nextToken(), l(b, g.currentOffset(), g.currentPosition()), b;
  }
  function p(g, y, h) {
    const c = g.context(), { lastOffset: u, lastStartLoc: b } = c, S = a(4, u, b);
    return S.key = y, h === !0 && (S.modulo = !0), g.nextToken(), l(S, g.currentOffset(), g.currentPosition()), S;
  }
  function m(g, y) {
    const h = g.context(), { lastOffset: c, lastStartLoc: u } = h, b = a(9, c, u);
    return b.value = y.replace(Di, Mi), g.nextToken(), l(b, g.currentOffset(), g.currentPosition()), b;
  }
  function _(g) {
    const y = g.nextToken(), h = g.context(), { lastOffset: c, lastStartLoc: u } = h, b = a(8, c, u);
    return y.type !== 12 ? (o(g, H.UNEXPECTED_EMPTY_LINKED_MODIFIER, h.lastStartLoc, 0), b.value = "", l(b, c, u), {
      nextConsumeToken: y,
      node: b
    }) : (y.value == null && o(g, H.UNEXPECTED_LEXICAL_ANALYSIS, h.lastStartLoc, 0, Ve(y)), b.value = y.value || "", l(b, g.currentOffset(), g.currentPosition()), {
      node: b
    });
  }
  function T(g, y) {
    const h = g.context(), c = a(7, h.offset, h.startLoc);
    return c.value = y, l(c, g.currentOffset(), g.currentPosition()), c;
  }
  function N(g) {
    const y = g.context(), h = a(6, y.offset, y.startLoc);
    let c = g.nextToken();
    if (c.type === 9) {
      const u = _(g);
      h.modifier = u.node, c = u.nextConsumeToken || g.nextToken();
    }
    switch (c.type !== 10 && o(g, H.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ve(c)), c = g.nextToken(), c.type === 2 && (c = g.nextToken()), c.type) {
      case 11:
        c.value == null && o(g, H.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ve(c)), h.key = T(g, c.value || "");
        break;
      case 5:
        c.value == null && o(g, H.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ve(c)), h.key = p(g, c.value || "");
        break;
      case 6:
        c.value == null && o(g, H.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ve(c)), h.key = f(g, c.value || "");
        break;
      case 7:
        c.value == null && o(g, H.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ve(c)), h.key = m(g, c.value || "");
        break;
      default: {
        o(g, H.UNEXPECTED_EMPTY_LINKED_KEY, y.lastStartLoc, 0);
        const u = g.context(), b = a(7, u.offset, u.startLoc);
        return b.value = "", l(b, u.offset, u.startLoc), h.key = b, l(h, u.offset, u.startLoc), {
          nextConsumeToken: c,
          node: h
        };
      }
    }
    return l(h, g.currentOffset(), g.currentPosition()), {
      node: h
    };
  }
  function C(g) {
    const y = g.context(), h = y.currentType === 1 ? g.currentOffset() : y.offset, c = y.currentType === 1 ? y.endLoc : y.startLoc, u = a(2, h, c);
    u.items = [];
    let b = null, S = null;
    do {
      const U = b || g.nextToken();
      switch (b = null, U.type) {
        case 0:
          U.value == null && o(g, H.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ve(U)), u.items.push(i(g, U.value || ""));
          break;
        case 6:
          U.value == null && o(g, H.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ve(U)), u.items.push(f(g, U.value || ""));
          break;
        case 4:
          S = !0;
          break;
        case 5:
          U.value == null && o(g, H.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ve(U)), u.items.push(p(g, U.value || "", !!S)), S && (s(g, An.USE_MODULO_SYNTAX, y.lastStartLoc, 0, Ve(U)), S = null);
          break;
        case 7:
          U.value == null && o(g, H.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ve(U)), u.items.push(m(g, U.value || ""));
          break;
        case 8: {
          const K = N(g);
          u.items.push(K.node), b = K.nextConsumeToken || null;
          break;
        }
      }
    } while (y.currentType !== 14 && y.currentType !== 1);
    const P = y.currentType === 1 ? y.lastOffset : g.currentOffset(), R = y.currentType === 1 ? y.lastEndLoc : g.currentPosition();
    return l(u, P, R), u;
  }
  function A(g, y, h, c) {
    const u = g.context();
    let b = c.items.length === 0;
    const S = a(1, y, h);
    S.cases = [], S.cases.push(c);
    do {
      const P = C(g);
      b || (b = P.items.length === 0), S.cases.push(P);
    } while (u.currentType !== 14);
    return b && o(g, H.MUST_HAVE_MESSAGES_IN_PLURAL, h, 0), l(S, g.currentOffset(), g.currentPosition()), S;
  }
  function E(g) {
    const y = g.context(), { offset: h, startLoc: c } = y, u = C(g);
    return y.currentType === 14 ? u : A(g, h, c, u);
  }
  function k(g) {
    const y = Ii(g, br({}, e)), h = y.context(), c = a(0, h.offset, h.startLoc);
    return t && c.loc && (c.loc.source = g), c.body = E(y), e.onCacheKey && (c.cacheKey = e.onCacheKey(g)), h.currentType !== 14 && o(y, H.UNEXPECTED_LEXICAL_ANALYSIS, h.lastStartLoc, 0, g[h.offset] || ""), l(c, y.currentOffset(), y.currentPosition()), c;
  }
  return { parse: k };
}
function Ve(e) {
  if (e.type === 14)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Pi(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (s) => (n.helpers.add(s), s) };
}
function Ta(e, t) {
  for (let n = 0; n < e.length; n++)
    ta(e[n], t);
}
function ta(e, t) {
  switch (e.type) {
    case 1:
      Ta(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Ta(e.items, t);
      break;
    case 6: {
      ta(e.key, t), t.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), t.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function Ri(e, t = {}) {
  const n = Pi(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && ta(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function $i(e) {
  const t = e.body;
  return t.type === 2 ? Na(t) : t.cases.forEach((n) => Na(n)), e;
}
function Na(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const r = e.items[n];
      if (!(r.type === 3 || r.type === 9) || r.value == null)
        break;
      t.push(r.value);
    }
    if (t.length === e.items.length) {
      e.static = Tr(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
const Ui = "minifier";
function Tt(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      Tt(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        Tt(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        Tt(n[r]);
      t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const t = e;
      t.value && (t.v = t.value, delete t.value);
      break;
    }
    case 6: {
      const t = e;
      Tt(t.key), t.k = t.key, delete t.key, t.modifier && (Tt(t.modifier), t.m = t.modifier, delete t.modifier);
      break;
    }
    case 5: {
      const t = e;
      t.i = t.index, delete t.index;
      break;
    }
    case 4: {
      const t = e;
      t.k = t.key, delete t.key;
      break;
    }
    default:
      throw Lt(H.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: Ui,
        args: [e.type]
      });
  }
  delete e.type;
}
const Fi = "parser";
function Vi(e, t) {
  const { filename: n, breakLineCode: r, needIndent: o } = t, s = t.location !== !1, a = {
    filename: n,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: r,
    needIndent: o,
    indentLevel: 0
  };
  s && e.loc && (a.source = e.loc.source);
  const l = () => a;
  function i(C, A) {
    a.code += C;
  }
  function f(C, A = !0) {
    const E = A ? r : "";
    i(o ? E + "  ".repeat(C) : E);
  }
  function p(C = !0) {
    const A = ++a.indentLevel;
    C && f(A);
  }
  function m(C = !0) {
    const A = --a.indentLevel;
    C && f(A);
  }
  function _() {
    f(a.indentLevel);
  }
  return {
    context: l,
    push: i,
    indent: p,
    deindent: m,
    newline: _,
    helper: (C) => `_${C}`,
    needIndent: () => a.needIndent
  };
}
function Yi(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Ct(e, t.key), t.modifier ? (e.push(", "), Ct(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Wi(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const o = t.items.length;
  for (let s = 0; s < o && (Ct(e, t.items[s]), s !== o - 1); s++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function Hi(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const o = t.cases.length;
    for (let s = 0; s < o && (Ct(e, t.cases[s]), s !== o - 1); s++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function Bi(e, t) {
  t.body ? Ct(e, t.body) : e.push("null");
}
function Ct(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Bi(e, t);
      break;
    case 1:
      Hi(e, t);
      break;
    case 2:
      Wi(e, t);
      break;
    case 6:
      Yi(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "list"
        /* HelperNameMap.LIST */
      )}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
    default:
      throw Lt(H.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: Fi,
        args: [t.type]
      });
  }
}
const Gi = (e, t = {}) => {
  const n = Ea(t.mode) ? t.mode : "normal", r = Ea(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const o = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, s = t.needIndent ? t.needIndent : n !== "arrow", a = e.helpers || [], l = Vi(e, {
    filename: r,
    breakLineCode: o,
    needIndent: s
  });
  l.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), l.indent(s), a.length > 0 && (l.push(`const { ${Tr(a.map((p) => `${p}: _${p}`), ", ")} } = ctx`), l.newline()), l.push("return "), Ct(l, e), l.deindent(s), l.push("}"), delete e.helpers;
  const { code: i, map: f } = l.context();
  return {
    ast: e,
    code: i,
    map: f ? f.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function ji(e, t = {}) {
  const n = br({}, t), r = !!n.jit, o = !!n.minify, s = n.optimize == null ? !0 : n.optimize, l = xi(n).parse(e);
  return r ? (s && $i(l), o && Tt(l), { ast: l, code: "" }) : (Ri(l, n), Gi(l, n));
}
/*!
  * core-base v9.14.4
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ki() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Ut().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (Ut().__INTLIFY_JIT_COMPILATION__ = !1);
}
function Re(e) {
  return Q(e) && na(e) === 0 && (We(e, "b") || We(e, "body"));
}
const Nr = ["b", "body"];
function Xi(e) {
  return it(e, Nr);
}
const Or = ["c", "cases"];
function zi(e) {
  return it(e, Or, []);
}
const Cr = ["s", "static"];
function Ji(e) {
  return it(e, Cr);
}
const kr = ["i", "items"];
function qi(e) {
  return it(e, kr, []);
}
const Sr = ["t", "type"];
function na(e) {
  return it(e, Sr);
}
const Lr = ["v", "value"];
function Kt(e, t) {
  const n = it(e, Lr);
  if (n != null)
    return n;
  throw Ft(t);
}
const Ir = ["m", "modifier"];
function Qi(e) {
  return it(e, Ir);
}
const wr = ["k", "key"];
function Zi(e) {
  const t = it(e, wr);
  if (t)
    return t;
  throw Ft(
    6
    /* NodeTypes.Linked */
  );
}
function it(e, t, n) {
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    if (We(e, o) && e[o] != null)
      return e[o];
  }
  return n;
}
const Dr = [
  ...Nr,
  ...Or,
  ...Cr,
  ...kr,
  ...wr,
  ...Ir,
  ...Lr,
  ...Sr
];
function Ft(e) {
  return new Error(`unhandled node type: ${e}`);
}
const ut = [];
ut[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
ut[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
ut[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
ut[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
ut[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
ut[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
ut[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const eu = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function tu(e) {
  return eu.test(e);
}
function nu(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function au(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    // [
    case 93:
    // ]
    case 46:
    // .
    case 34:
    // "
    case 39:
      return e;
    case 95:
    // _
    case 36:
    // $
    case 45:
      return "i";
    case 9:
    // Tab (HT)
    case 10:
    // Newline (LF)
    case 13:
    // Return (CR)
    case 160:
    // No-break space (NBSP)
    case 65279:
    // Byte Order Mark (BOM)
    case 8232:
    // Line Separator (LS)
    case 8233:
      return "w";
  }
  return "i";
}
function ru(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : tu(t) ? nu(t) : "*" + t;
}
function su(e) {
  const t = [];
  let n = -1, r = 0, o = 0, s, a, l, i, f, p, m;
  const _ = [];
  _[
    0
    /* Actions.APPEND */
  ] = () => {
    a === void 0 ? a = l : a += l;
  }, _[
    1
    /* Actions.PUSH */
  ] = () => {
    a !== void 0 && (t.push(a), a = void 0);
  }, _[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    _[
      0
      /* Actions.APPEND */
    ](), o++;
  }, _[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (o > 0)
      o--, r = 4, _[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (o = 0, a === void 0 || (a = ru(a), a === !1))
        return !1;
      _[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function T() {
    const N = e[n + 1];
    if (r === 5 && N === "'" || r === 6 && N === '"')
      return n++, l = "\\" + N, _[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; r !== null; )
    if (n++, s = e[n], !(s === "\\" && T())) {
      if (i = au(s), m = ut[r], f = m[i] || m.l || 8, f === 8 || (r = f[0], f[1] !== void 0 && (p = _[f[1]], p && (l = s, p() === !1))))
        return;
      if (r === 7)
        return t;
    }
}
const Oa = /* @__PURE__ */ new Map();
function ou(e, t) {
  return Q(e) ? e[t] : null;
}
function lu(e, t) {
  if (!Q(e))
    return null;
  let n = Oa.get(t);
  if (n || (n = su(t), n && Oa.set(t, n)), !n)
    return null;
  const r = n.length;
  let o = e, s = 0;
  for (; s < r; ) {
    const a = n[s];
    if (Dr.includes(a) && Re(o))
      return null;
    const l = o[a];
    if (l === void 0 || ce(o))
      return null;
    o = l, s++;
  }
  return o;
}
const iu = (e) => e, uu = (e) => "", cu = "text", fu = (e) => e.length === 0 ? "" : mi(e), du = di;
function Ca(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function mu(e) {
  const t = pe(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (pe(e.named.count) || pe(e.named.n)) ? pe(e.named.count) ? e.named.count : pe(e.named.n) ? e.named.n : t : t;
}
function _u(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function vu(e = {}) {
  const t = e.locale, n = mu(e), r = Q(e.pluralRules) && $(t) && ce(e.pluralRules[t]) ? e.pluralRules[t] : Ca, o = Q(e.pluralRules) && $(t) && ce(e.pluralRules[t]) ? Ca : void 0, s = (E) => E[r(n, E.length, o)], a = e.list || [], l = (E) => a[E], i = e.named || ae();
  pe(e.pluralIndex) && _u(n, i);
  const f = (E) => i[E];
  function p(E) {
    const k = ce(e.messages) ? e.messages(E) : Q(e.messages) ? e.messages[E] : !1;
    return k || (e.parent ? e.parent.message(E) : uu);
  }
  const m = (E) => e.modifiers ? e.modifiers[E] : iu, _ = q(e.processor) && ce(e.processor.normalize) ? e.processor.normalize : fu, T = q(e.processor) && ce(e.processor.interpolate) ? e.processor.interpolate : du, N = q(e.processor) && $(e.processor.type) ? e.processor.type : cu, A = {
    list: l,
    named: f,
    plural: s,
    linked: (E, ...k) => {
      const [g, y] = k;
      let h = "text", c = "";
      k.length === 1 ? Q(g) ? (c = g.modifier || c, h = g.type || h) : $(g) && (c = g || c) : k.length === 2 && ($(g) && (c = g || c), $(y) && (h = y || h));
      const u = p(E)(A), b = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        h === "vnode" && he(u) && c ? u[0] : u
      );
      return c ? m(c)(b, h) : b;
    },
    message: p,
    type: N,
    interpolate: T,
    normalize: _,
    values: Ne(ae(), a, i)
  };
  return A;
}
let Vt = null;
function pu(e) {
  Vt = e;
}
function hu(e, t, n) {
  Vt && Vt.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const gu = /* @__PURE__ */ Au(
  "function:translate"
  /* IntlifyDevToolsHooks.FunctionTranslate */
);
function Au(e) {
  return (t) => Vt && Vt.emit(e, t);
}
const Mr = An.__EXTEND_POINT__, dt = gn(Mr), Ce = {
  NOT_FOUND_KEY: Mr,
  // 2
  FALLBACK_TO_TRANSLATE: dt(),
  // 3
  CANNOT_FORMAT_NUMBER: dt(),
  // 4
  FALLBACK_TO_NUMBER_FORMAT: dt(),
  // 5
  CANNOT_FORMAT_DATE: dt(),
  // 6
  FALLBACK_TO_DATE_FORMAT: dt(),
  // 7
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: dt(),
  // 8
  __EXTEND_POINT__: dt()
  // 9
}, yu = {
  [Ce.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
  [Ce.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
  [Ce.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
  [Ce.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
  [Ce.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
  [Ce.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale.",
  [Ce.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER]: "This project is using Custom Message Compiler, which is an experimental feature. It may receive breaking changes or be removed in the future."
};
function At(e, ...t) {
  return ea(yu[e], ...t);
}
const xr = H.__EXTEND_POINT__, mt = gn(xr), Ae = {
  INVALID_ARGUMENT: xr,
  // 17
  INVALID_DATE_ARGUMENT: mt(),
  // 18
  INVALID_ISO_DATE_ARGUMENT: mt(),
  // 19
  NOT_SUPPORT_NON_STRING_MESSAGE: mt(),
  // 20
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: mt(),
  // 21
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: mt(),
  // 22
  NOT_SUPPORT_LOCALE_TYPE: mt(),
  // 23
  __EXTEND_POINT__: mt()
  // 24
};
function je(e) {
  return Lt(e, null, process.env.NODE_ENV !== "production" ? { messages: Eu } : void 0);
}
const Eu = {
  [Ae.INVALID_ARGUMENT]: "Invalid arguments",
  [Ae.INVALID_DATE_ARGUMENT]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [Ae.INVALID_ISO_DATE_ARGUMENT]: "The argument provided is not a valid ISO date string",
  [Ae.NOT_SUPPORT_NON_STRING_MESSAGE]: "Not support non-string message",
  [Ae.NOT_SUPPORT_LOCALE_PROMISE_VALUE]: "cannot support promise value",
  [Ae.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION]: "cannot support async function",
  [Ae.NOT_SUPPORT_LOCALE_TYPE]: "cannot support locale type"
};
function aa(e, t) {
  return t.locale != null ? ka(t.locale) : ka(e.locale);
}
let Sn;
function ka(e) {
  if ($(e))
    return e;
  if (ce(e)) {
    if (e.resolvedOnce && Sn != null)
      return Sn;
    if (e.constructor.name === "Function") {
      const t = e();
      if (fi(t))
        throw je(Ae.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Sn = t;
    } else
      throw je(Ae.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw je(Ae.NOT_SUPPORT_LOCALE_TYPE);
}
function bu(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...he(t) ? t : Q(t) ? Object.keys(t) : $(t) ? [t] : [n]
  ])];
}
function Pr(e, t, n) {
  const r = $(n) ? n : on, o = e;
  o.__localeChainCache || (o.__localeChainCache = /* @__PURE__ */ new Map());
  let s = o.__localeChainCache.get(r);
  if (!s) {
    s = [];
    let a = [n];
    for (; he(a); )
      a = Sa(s, a, t);
    const l = he(t) || !q(t) ? t : t.default ? t.default : null;
    a = $(l) ? [l] : l, he(a) && Sa(s, a, !1), o.__localeChainCache.set(r, s);
  }
  return s;
}
function Sa(e, t, n) {
  let r = !0;
  for (let o = 0; o < t.length && ie(r); o++) {
    const s = t[o];
    $(s) && (r = Tu(e, t[o], n));
  }
  return r;
}
function Tu(e, t, n) {
  let r;
  const o = t.split("-");
  do {
    const s = o.join("-");
    r = Nu(e, s, n), o.splice(-1, 1);
  } while (o.length && r === !0);
  return r;
}
function Nu(e, t, n) {
  let r = !1;
  if (!e.includes(t) && (r = !0, t)) {
    r = t[t.length - 1] !== "!";
    const o = t.replace(/!/g, "");
    e.push(o), (he(n) || q(n)) && n[o] && (r = n[o]);
  }
  return r;
}
const Ou = "9.14.4", yn = -1, on = "en-US", ln = "", La = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Cu() {
  return {
    upper: (e, t) => t === "text" && $(e) ? e.toUpperCase() : t === "vnode" && Q(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && $(e) ? e.toLowerCase() : t === "vnode" && Q(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && $(e) ? La(e) : t === "vnode" && Q(e) && "__v_isVNode" in e ? La(e.children) : e
  };
}
let Rr;
function Ia(e) {
  Rr = e;
}
let $r;
function ku(e) {
  $r = e;
}
let Ur;
function Su(e) {
  Ur = e;
}
let Fr = null;
const Lu = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  Fr = e;
}, Iu = /* @__NO_SIDE_EFFECTS__ */ () => Fr;
let Vr = null;
const wa = (e) => {
  Vr = e;
}, wu = () => Vr;
let Da = 0;
function Du(e = {}) {
  const t = ce(e.onWarn) ? e.onWarn : Be, n = $(e.version) ? e.version : Ou, r = $(e.locale) || ce(e.locale) ? e.locale : on, o = ce(r) ? on : r, s = he(e.fallbackLocale) || q(e.fallbackLocale) || $(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : o, a = q(e.messages) ? e.messages : Ln(o), l = q(e.datetimeFormats) ? e.datetimeFormats : Ln(o), i = q(e.numberFormats) ? e.numberFormats : Ln(o), f = Ne(ae(), e.modifiers, Cu()), p = e.pluralRules || ae(), m = ce(e.missing) ? e.missing : null, _ = ie(e.missingWarn) || rn(e.missingWarn) ? e.missingWarn : !0, T = ie(e.fallbackWarn) || rn(e.fallbackWarn) ? e.fallbackWarn : !0, N = !!e.fallbackFormat, C = !!e.unresolving, A = ce(e.postTranslation) ? e.postTranslation : null, E = q(e.processor) ? e.processor : null, k = ie(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, g = !!e.escapeParameter, y = ce(e.messageCompiler) ? e.messageCompiler : Rr;
  process.env.NODE_ENV !== "production" && ce(e.messageCompiler) && Ar(At(Ce.EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER));
  const h = ce(e.messageResolver) ? e.messageResolver : $r || ou, c = ce(e.localeFallbacker) ? e.localeFallbacker : Ur || bu, u = Q(e.fallbackContext) ? e.fallbackContext : void 0, b = e, S = Q(b.__datetimeFormatters) ? b.__datetimeFormatters : /* @__PURE__ */ new Map(), P = Q(b.__numberFormatters) ? b.__numberFormatters : /* @__PURE__ */ new Map(), R = Q(b.__meta) ? b.__meta : {};
  Da++;
  const U = {
    version: n,
    cid: Da,
    locale: r,
    fallbackLocale: s,
    messages: a,
    modifiers: f,
    pluralRules: p,
    missing: m,
    missingWarn: _,
    fallbackWarn: T,
    fallbackFormat: N,
    unresolving: C,
    postTranslation: A,
    processor: E,
    warnHtmlMessage: k,
    escapeParameter: g,
    messageCompiler: y,
    messageResolver: h,
    localeFallbacker: c,
    fallbackContext: u,
    onWarn: t,
    __meta: R
  };
  return U.datetimeFormats = l, U.numberFormats = i, U.__datetimeFormatters = S, U.__numberFormatters = P, process.env.NODE_ENV !== "production" && (U.__v_emitter = b.__v_emitter != null ? b.__v_emitter : void 0), (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) && hu(U, n, R), U;
}
const Ln = (e) => ({ [e]: ae() });
function En(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function Yr(e, t) {
  return e instanceof RegExp ? e.test(t) : e;
}
function ra(e, t, n, r, o) {
  const { missing: s, onWarn: a } = e;
  if (process.env.NODE_ENV !== "production") {
    const l = e.__v_emitter;
    l && l.emit("missing", {
      locale: n,
      key: t,
      type: o,
      groupId: `${o}:${t}`
    });
  }
  if (s !== null) {
    const l = s(e, n, t, o);
    return $(l) ? l : t;
  } else
    return process.env.NODE_ENV !== "production" && Yr(r, t) && a(At(Ce.NOT_FOUND_KEY, { key: t, locale: n })), t;
}
function xt(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Wr(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function Mu(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let r = n + 1; r < t.length; r++)
    if (Wr(e, t[r]))
      return !0;
  return !1;
}
function In(e) {
  return (n) => xu(n, e);
}
function xu(e, t) {
  const n = Xi(t);
  if (n == null)
    throw Ft(
      0
      /* NodeTypes.Resource */
    );
  if (na(n) === 1) {
    const s = zi(n);
    return e.plural(s.reduce((a, l) => [
      ...a,
      Ma(e, l)
    ], []));
  } else
    return Ma(e, n);
}
function Ma(e, t) {
  const n = Ji(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const r = qi(t).reduce((o, s) => [...o, $n(e, s)], []);
    return e.normalize(r);
  }
}
function $n(e, t) {
  const n = na(t);
  switch (n) {
    case 3:
      return Kt(t, n);
    case 9:
      return Kt(t, n);
    case 4: {
      const r = t;
      if (We(r, "k") && r.k)
        return e.interpolate(e.named(r.k));
      if (We(r, "key") && r.key)
        return e.interpolate(e.named(r.key));
      throw Ft(n);
    }
    case 5: {
      const r = t;
      if (We(r, "i") && pe(r.i))
        return e.interpolate(e.list(r.i));
      if (We(r, "index") && pe(r.index))
        return e.interpolate(e.list(r.index));
      throw Ft(n);
    }
    case 6: {
      const r = t, o = Qi(r), s = Zi(r);
      return e.linked($n(e, s), o ? $n(e, o) : void 0, e.type);
    }
    case 7:
      return Kt(t, n);
    case 8:
      return Kt(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const Pu = "Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.";
function Hr(e, t) {
  t && Ti(e) && Be(ea(Pu, { source: e }));
}
const Br = (e) => e;
let Ot = ae();
function Gr(e) {
  e.code === An.USE_MODULO_SYNTAX && Be(`The use of named interpolation with modulo syntax is deprecated. It will be removed in v10.
reference: https://vue-i18n.intlify.dev/guide/essentials/syntax#rails-i18n-format 
(message compiler warning message: ${e.message})`);
}
function jr(e, t = {}) {
  let n = !1;
  const r = t.onError || Ei;
  return t.onError = (o) => {
    n = !0, r(o);
  }, { ...ji(e, t), detectError: n };
}
const Ru = /* @__NO_SIDE_EFFECTS__ */ (e, t) => {
  if (!$(e))
    throw je(Ae.NOT_SUPPORT_NON_STRING_MESSAGE);
  process.env.NODE_ENV !== "production" && (t.onWarn = Gr);
  {
    const n = ie(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
    process.env.NODE_ENV !== "production" && Hr(e, n);
    const o = (t.onCacheKey || Br)(e), s = Ot[o];
    if (s)
      return s;
    const { code: a, detectError: l } = jr(e, t), i = new Function(`return ${a}`)();
    return l ? i : Ot[o] = i;
  }
};
function $u(e, t) {
  if (process.env.NODE_ENV !== "production" && (t.onWarn = Gr), __INTLIFY_JIT_COMPILATION__ && $(e)) {
    const n = ie(t.warnHtmlMessage) ? t.warnHtmlMessage : !0;
    process.env.NODE_ENV !== "production" && Hr(e, n);
    const o = (t.onCacheKey || Br)(e), s = Ot[o];
    if (s)
      return s;
    const { ast: a, detectError: l } = jr(e, {
      ...t,
      location: process.env.NODE_ENV !== "production",
      jit: !0
    }), i = In(a);
    return l ? i : Ot[o] = i;
  } else {
    if (process.env.NODE_ENV !== "production" && !Re(e))
      return Be(`the message that is resolve with key '${t.key}' is not supported for jit compilation`), (() => e);
    const n = e.cacheKey;
    if (n) {
      const r = Ot[n];
      return r || (Ot[n] = In(e));
    } else
      return In(e);
  }
}
const xa = () => "", xe = (e) => ce(e);
function Pa(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: o, messageCompiler: s, fallbackLocale: a, messages: l } = e, [i, f] = Un(...t), p = ie(f.missingWarn) ? f.missingWarn : e.missingWarn, m = ie(f.fallbackWarn) ? f.fallbackWarn : e.fallbackWarn, _ = ie(f.escapeParameter) ? f.escapeParameter : e.escapeParameter, T = !!f.resolvedMessage, N = $(f.default) || ie(f.default) ? ie(f.default) ? s ? i : () => i : f.default : n ? s ? i : () => i : "", C = n || N !== "", A = aa(e, f);
  _ && Uu(f);
  let [E, k, g] = T ? [
    i,
    A,
    l[A] || ae()
  ] : Kr(e, i, A, a, m, p), y = E, h = i;
  if (!T && !($(y) || Re(y) || xe(y)) && C && (y = N, h = y), !T && (!($(y) || Re(y) || xe(y)) || !$(k)))
    return o ? yn : i;
  if (process.env.NODE_ENV !== "production" && $(y) && e.messageCompiler == null)
    return Be(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${i}'.`), i;
  let c = !1;
  const u = () => {
    c = !0;
  }, b = xe(y) ? y : Xr(e, i, k, y, h, u);
  if (c)
    return y;
  const S = Wu(e, k, g, f), P = vu(S), R = Fu(e, b, P), U = r ? r(R, i) : R;
  if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
    const K = {
      timestamp: Date.now(),
      key: $(i) ? i : xe(y) ? y.key : "",
      locale: k || (xe(y) ? y.locale : ""),
      format: $(y) ? y : xe(y) ? y.source : "",
      message: U
    };
    K.meta = Ne({}, e.__meta, /* @__PURE__ */ Iu() || {}), gu(K);
  }
  return U;
}
function Uu(e) {
  he(e.list) ? e.list = e.list.map((t) => $(t) ? ga(t) : t) : Q(e.named) && Object.keys(e.named).forEach((t) => {
    $(e.named[t]) && (e.named[t] = ga(e.named[t]));
  });
}
function Kr(e, t, n, r, o, s) {
  const { messages: a, onWarn: l, messageResolver: i, localeFallbacker: f } = e, p = f(e, r, n);
  let m = ae(), _, T = null, N = n, C = null;
  const A = "translate";
  for (let E = 0; E < p.length; E++) {
    if (_ = C = p[E], process.env.NODE_ENV !== "production" && n !== _ && !Wr(n, _) && En(o, t) && l(At(Ce.FALLBACK_TO_TRANSLATE, {
      key: t,
      target: _
    })), process.env.NODE_ENV !== "production" && n !== _) {
      const h = e.__v_emitter;
      h && h.emit("fallback", {
        type: A,
        key: t,
        from: N,
        to: C,
        groupId: `${A}:${t}`
      });
    }
    m = a[_] || ae();
    let k = null, g, y;
    if (process.env.NODE_ENV !== "production" && He && (k = window.performance.now(), g = "intlify-message-resolve-start", y = "intlify-message-resolve-end", we && we(g)), (T = i(m, t)) === null && (T = m[t]), process.env.NODE_ENV !== "production" && He) {
      const h = window.performance.now(), c = e.__v_emitter;
      c && k && T && c.emit("message-resolve", {
        type: "message-resolve",
        key: t,
        message: T,
        time: h - k,
        groupId: `${A}:${t}`
      }), g && y && we && gt && (we(y), gt("intlify message resolve", g, y));
    }
    if ($(T) || Re(T) || xe(T))
      break;
    if (!Mu(_, p)) {
      const h = ra(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        _,
        s,
        A
      );
      h !== t && (T = h);
    }
    N = C;
  }
  return [T, _, m];
}
function Xr(e, t, n, r, o, s) {
  const { messageCompiler: a, warnHtmlMessage: l } = e;
  if (xe(r)) {
    const _ = r;
    return _.locale = _.locale || n, _.key = _.key || t, _;
  }
  if (a == null) {
    const _ = (() => r);
    return _.locale = n, _.key = t, _;
  }
  let i = null, f, p;
  process.env.NODE_ENV !== "production" && He && (i = window.performance.now(), f = "intlify-message-compilation-start", p = "intlify-message-compilation-end", we && we(f));
  const m = a(r, Vu(e, n, o, r, l, s));
  if (process.env.NODE_ENV !== "production" && He) {
    const _ = window.performance.now(), T = e.__v_emitter;
    T && i && T.emit("message-compilation", {
      type: "message-compilation",
      message: r,
      time: _ - i,
      groupId: `translate:${t}`
    }), f && p && we && gt && (we(p), gt("intlify message compilation", f, p));
  }
  return m.locale = n, m.key = t, m.source = r, m;
}
function Fu(e, t, n) {
  let r = null, o, s;
  process.env.NODE_ENV !== "production" && He && (r = window.performance.now(), o = "intlify-message-evaluation-start", s = "intlify-message-evaluation-end", we && we(o));
  const a = t(n);
  if (process.env.NODE_ENV !== "production" && He) {
    const l = window.performance.now(), i = e.__v_emitter;
    i && r && i.emit("message-evaluation", {
      type: "message-evaluation",
      value: a,
      time: l - r,
      groupId: `translate:${t.key}`
    }), o && s && we && gt && (we(s), gt("intlify message evaluation", o, s));
  }
  return a;
}
function Un(...e) {
  const [t, n, r] = e, o = ae();
  if (!$(t) && !pe(t) && !xe(t) && !Re(t))
    throw je(Ae.INVALID_ARGUMENT);
  const s = pe(t) ? String(t) : (xe(t), t);
  return pe(n) ? o.plural = n : $(n) ? o.default = n : q(n) && !hn(n) ? o.named = n : he(n) && (o.list = n), pe(r) ? o.plural = r : $(r) ? o.default = r : q(r) && Ne(o, r), [s, o];
}
function Vu(e, t, n, r, o, s) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: o,
    onError: (a) => {
      if (s && s(a), process.env.NODE_ENV !== "production") {
        const l = Yu(r), i = `Message compilation error: ${a.message}`, f = a.location && l && _i(l, a.location.start.offset, a.location.end.offset), p = e.__v_emitter;
        p && l && p.emit("compile-error", {
          message: l,
          error: a.message,
          start: a.location && a.location.start.offset,
          end: a.location && a.location.end.offset,
          groupId: `translate:${n}`
        }), console.error(f ? `${i}
${f}` : i);
      } else
        throw a;
    },
    onCacheKey: (a) => oi(t, n, a)
  };
}
function Yu(e) {
  if ($(e))
    return e;
  if (e.loc && e.loc.source)
    return e.loc.source;
}
function Wu(e, t, n, r) {
  const { modifiers: o, pluralRules: s, messageResolver: a, fallbackLocale: l, fallbackWarn: i, missingWarn: f, fallbackContext: p } = e, _ = {
    locale: t,
    modifiers: o,
    pluralRules: s,
    messages: (T) => {
      let N = a(n, T);
      if (N == null && p) {
        const [, , C] = Kr(p, T, t, l, i, f);
        N = a(C, T);
      }
      if ($(N) || Re(N)) {
        let C = !1;
        const E = Xr(e, T, t, N, T, () => {
          C = !0;
        });
        return C ? xa : E;
      } else return xe(N) ? N : xa;
    }
  };
  return e.processor && (_.processor = e.processor), r.list && (_.list = r.list), r.named && (_.named = r.named), pe(r.plural) && (_.pluralIndex = r.plural), _;
}
const Ra = typeof Intl < "u", zr = {
  dateTimeFormat: Ra && typeof Intl.DateTimeFormat < "u",
  numberFormat: Ra && typeof Intl.NumberFormat < "u"
};
function $a(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: o, onWarn: s, localeFallbacker: a } = e, { __datetimeFormatters: l } = e;
  if (process.env.NODE_ENV !== "production" && !zr.dateTimeFormat)
    return s(At(Ce.CANNOT_FORMAT_DATE)), ln;
  const [i, f, p, m] = Fn(...t), _ = ie(p.missingWarn) ? p.missingWarn : e.missingWarn, T = ie(p.fallbackWarn) ? p.fallbackWarn : e.fallbackWarn, N = !!p.part, C = aa(e, p), A = a(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    C
  );
  if (!$(i) || i === "")
    return new Intl.DateTimeFormat(C, m).format(f);
  let E = {}, k, g = null, y = C, h = null;
  const c = "datetime format";
  for (let S = 0; S < A.length; S++) {
    if (k = h = A[S], process.env.NODE_ENV !== "production" && C !== k && En(T, i) && s(At(Ce.FALLBACK_TO_DATE_FORMAT, {
      key: i,
      target: k
    })), process.env.NODE_ENV !== "production" && C !== k) {
      const P = e.__v_emitter;
      P && P.emit("fallback", {
        type: c,
        key: i,
        from: y,
        to: h,
        groupId: `${c}:${i}`
      });
    }
    if (E = n[k] || {}, g = E[i], q(g))
      break;
    ra(e, i, k, _, c), y = h;
  }
  if (!q(g) || !$(k))
    return r ? yn : i;
  let u = `${k}__${i}`;
  hn(m) || (u = `${u}__${JSON.stringify(m)}`);
  let b = l.get(u);
  return b || (b = new Intl.DateTimeFormat(k, Ne({}, g, m)), l.set(u, b)), N ? b.formatToParts(f) : b.format(f);
}
const Jr = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function Fn(...e) {
  const [t, n, r, o] = e, s = ae();
  let a = ae(), l;
  if ($(t)) {
    const i = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!i)
      throw je(Ae.INVALID_ISO_DATE_ARGUMENT);
    const f = i[3] ? i[3].trim().startsWith("T") ? `${i[1].trim()}${i[3].trim()}` : `${i[1].trim()}T${i[3].trim()}` : i[1].trim();
    l = new Date(f);
    try {
      l.toISOString();
    } catch {
      throw je(Ae.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (ii(t)) {
    if (isNaN(t.getTime()))
      throw je(Ae.INVALID_DATE_ARGUMENT);
    l = t;
  } else if (pe(t))
    l = t;
  else
    throw je(Ae.INVALID_ARGUMENT);
  return $(n) ? s.key = n : q(n) && Object.keys(n).forEach((i) => {
    Jr.includes(i) ? a[i] = n[i] : s[i] = n[i];
  }), $(r) ? s.locale = r : q(r) && (a = r), q(o) && (a = o), [s.key || "", l, s, a];
}
function Ua(e, t, n) {
  const r = e;
  for (const o in n) {
    const s = `${t}__${o}`;
    r.__datetimeFormatters.has(s) && r.__datetimeFormatters.delete(s);
  }
}
function Fa(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: o, onWarn: s, localeFallbacker: a } = e, { __numberFormatters: l } = e;
  if (process.env.NODE_ENV !== "production" && !zr.numberFormat)
    return s(At(Ce.CANNOT_FORMAT_NUMBER)), ln;
  const [i, f, p, m] = Vn(...t), _ = ie(p.missingWarn) ? p.missingWarn : e.missingWarn, T = ie(p.fallbackWarn) ? p.fallbackWarn : e.fallbackWarn, N = !!p.part, C = aa(e, p), A = a(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    C
  );
  if (!$(i) || i === "")
    return new Intl.NumberFormat(C, m).format(f);
  let E = {}, k, g = null, y = C, h = null;
  const c = "number format";
  for (let S = 0; S < A.length; S++) {
    if (k = h = A[S], process.env.NODE_ENV !== "production" && C !== k && En(T, i) && s(At(Ce.FALLBACK_TO_NUMBER_FORMAT, {
      key: i,
      target: k
    })), process.env.NODE_ENV !== "production" && C !== k) {
      const P = e.__v_emitter;
      P && P.emit("fallback", {
        type: c,
        key: i,
        from: y,
        to: h,
        groupId: `${c}:${i}`
      });
    }
    if (E = n[k] || {}, g = E[i], q(g))
      break;
    ra(e, i, k, _, c), y = h;
  }
  if (!q(g) || !$(k))
    return r ? yn : i;
  let u = `${k}__${i}`;
  hn(m) || (u = `${u}__${JSON.stringify(m)}`);
  let b = l.get(u);
  return b || (b = new Intl.NumberFormat(k, Ne({}, g, m)), l.set(u, b)), N ? b.formatToParts(f) : b.format(f);
}
const qr = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function Vn(...e) {
  const [t, n, r, o] = e, s = ae();
  let a = ae();
  if (!pe(t))
    throw je(Ae.INVALID_ARGUMENT);
  const l = t;
  return $(n) ? s.key = n : q(n) && Object.keys(n).forEach((i) => {
    qr.includes(i) ? a[i] = n[i] : s[i] = n[i];
  }), $(r) ? s.locale = r : q(r) && (a = r), q(o) && (a = o), [s.key || "", l, s, a];
}
function Va(e, t, n) {
  const r = e;
  for (const o in n) {
    const s = `${t}__${o}`;
    r.__numberFormatters.has(s) && r.__numberFormatters.delete(s);
  }
}
Ki();
function Hu() {
  return Qr().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Qr() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Bu = typeof Proxy == "function", Gu = "devtools-plugin:setup", ju = "plugin:settings:set";
let bt, Yn;
function Ku() {
  var e;
  return bt !== void 0 || (typeof window < "u" && window.performance ? (bt = !0, Yn = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (bt = !0, Yn = globalThis.perf_hooks.performance) : bt = !1), bt;
}
function Xu() {
  return Ku() ? Yn.now() : Date.now();
}
class zu {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const r = {};
    if (t.settings)
      for (const a in t.settings) {
        const l = t.settings[a];
        r[a] = l.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, r);
    try {
      const a = localStorage.getItem(o), l = JSON.parse(a);
      Object.assign(s, l);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return s;
      },
      setSettings(a) {
        try {
          localStorage.setItem(o, JSON.stringify(a));
        } catch {
        }
        s = a;
      },
      now() {
        return Xu();
      }
    }, n && n.on(ju, (a, l) => {
      a === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (a, l) => this.target ? this.target.on[l] : (...i) => {
        this.onQueue.push({
          method: l,
          args: i
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (a, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...i) => (this.targetQueue.push({
        method: l,
        args: i,
        resolve: () => {
        }
      }), this.fallbacks[l](...i)) : (...i) => new Promise((f) => {
        this.targetQueue.push({
          method: l,
          args: i,
          resolve: f
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Ju(e, t) {
  const n = e, r = Qr(), o = Hu(), s = Bu && n.enableEarlyProxy;
  if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    o.emit(Gu, e, t);
  else {
    const a = s ? new zu(n, o) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: a
    }), a && t(a.proxiedTarget);
  }
}
/*!
  * vue-i18n v9.14.4
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const qu = "9.14.4";
function Qu() {
  typeof __INTLIFY_JIT_COMPILATION__ != "boolean" && (Ut().__INTLIFY_JIT_COMPILATION__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (Ut().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Zr = Ce.__EXTEND_POINT__, qe = gn(Zr), Te = {
  FALLBACK_TO_ROOT: Zr,
  // 9
  NOT_SUPPORTED_PRESERVE: qe(),
  // 10
  NOT_SUPPORTED_FORMATTER: qe(),
  // 11
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: qe(),
  // 12
  NOT_SUPPORTED_GET_CHOICE_INDEX: qe(),
  // 13
  COMPONENT_NAME_LEGACY_COMPATIBLE: qe(),
  // 14
  NOT_FOUND_PARENT_SCOPE: qe(),
  // 15
  IGNORE_OBJ_FLATTEN: qe(),
  // 16
  NOTICE_DROP_ALLOW_COMPOSITION: qe(),
  // 17
  NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: qe()
  // 18
}, Zu = {
  [Te.FALLBACK_TO_ROOT]: "Fall back to {type} '{key}' with root locale.",
  [Te.NOT_SUPPORTED_PRESERVE]: "Not supported 'preserve'.",
  [Te.NOT_SUPPORTED_FORMATTER]: "Not supported 'formatter'.",
  [Te.NOT_SUPPORTED_PRESERVE_DIRECTIVE]: "Not supported 'preserveDirectiveContent'.",
  [Te.NOT_SUPPORTED_GET_CHOICE_INDEX]: "Not supported 'getChoiceIndex'.",
  [Te.COMPONENT_NAME_LEGACY_COMPATIBLE]: "Component name legacy compatible: '{name}' -> 'i18n'",
  [Te.NOT_FOUND_PARENT_SCOPE]: "Not found parent scope. use the global scope.",
  [Te.IGNORE_OBJ_FLATTEN]: "Ignore object flatten: '{key}' key has an string value",
  [Te.NOTICE_DROP_ALLOW_COMPOSITION]: "'allowComposition' option will be dropped in the next major version. For more information, please see 👉 https://tinyurl.com/2p97mcze",
  [Te.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG]: "'translateExistCompatible' option will be dropped in the next major version."
};
function kt(e, ...t) {
  return ea(Zu[e], ...t);
}
const es = Ae.__EXTEND_POINT__, Se = gn(es), se = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: es,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: Se(),
  // 25
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: Se(),
  // 26
  NOT_INSTALLED: Se(),
  // 27
  NOT_AVAILABLE_IN_LEGACY_MODE: Se(),
  // 28
  // directive module errors
  REQUIRED_VALUE: Se(),
  // 29
  INVALID_VALUE: Se(),
  // 30
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Se(),
  // 31
  NOT_INSTALLED_WITH_PROVIDE: Se(),
  // 32
  // unexpected error
  UNEXPECTED_ERROR: Se(),
  // 33
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: Se(),
  // 34
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: Se(),
  // 35
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: Se(),
  // 36
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Se(),
  // 37
  // for enhancement
  __EXTEND_POINT__: Se()
  // 38
};
function $e(e, ...t) {
  return Lt(e, null, process.env.NODE_ENV !== "production" ? { messages: ec, args: t } : void 0);
}
const ec = {
  [se.UNEXPECTED_RETURN_TYPE]: "Unexpected return type in composer",
  [se.INVALID_ARGUMENT]: "Invalid argument",
  [se.MUST_BE_CALL_SETUP_TOP]: "Must be called at the top of a `setup` function",
  [se.NOT_INSTALLED]: "Need to install with `app.use` function",
  [se.UNEXPECTED_ERROR]: "Unexpected error",
  [se.NOT_AVAILABLE_IN_LEGACY_MODE]: "Not available in legacy mode",
  [se.REQUIRED_VALUE]: "Required in value: {0}",
  [se.INVALID_VALUE]: "Invalid value",
  [se.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN]: "Cannot setup vue-devtools plugin",
  [se.NOT_INSTALLED_WITH_PROVIDE]: "Need to install with `provide` function",
  [se.NOT_COMPATIBLE_LEGACY_VUE_I18N]: "Not compatible legacy VueI18n.",
  [se.BRIDGE_SUPPORT_VUE_2_ONLY]: "vue-i18n-bridge support Vue 2.x only",
  [se.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION]: "Must define ‘i18n’ option or custom block in Composition API with using local scope in Legacy API mode",
  [se.NOT_AVAILABLE_COMPOSITION_IN_LEGACY]: "Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly"
}, Wn = /* @__PURE__ */ Xe("__translateVNode"), Hn = /* @__PURE__ */ Xe("__datetimeParts"), Bn = /* @__PURE__ */ Xe("__numberParts"), Yt = /* @__PURE__ */ Xe("__enableEmitter"), Gn = /* @__PURE__ */ Xe("__disableEmitter"), tc = Xe("__setPluralRules"), nc = /* @__PURE__ */ Xe("__injectWithOption"), jn = /* @__PURE__ */ Xe("__dispose");
function Wt(e) {
  if (!Q(e) || Re(e))
    return e;
  for (const t in e)
    if (We(e, t))
      if (!t.includes("."))
        Q(e[t]) && Wt(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let o = e, s = !1;
        for (let a = 0; a < r; a++) {
          if (n[a] === "__proto__")
            throw new Error(`unsafe key: ${n[a]}`);
          if (n[a] in o || (o[n[a]] = ae()), !Q(o[n[a]])) {
            process.env.NODE_ENV !== "production" && Be(kt(Te.IGNORE_OBJ_FLATTEN, {
              key: n[a]
            })), s = !0;
            break;
          }
          o = o[n[a]];
        }
        if (s || (Re(o) ? Dr.includes(n[r]) || delete e[t] : (o[n[r]] = e[t], delete e[t])), !Re(o)) {
          const a = o[n[r]];
          Q(a) && Wt(a);
        }
      }
  return e;
}
function ts(e, t) {
  const { messages: n, __i18n: r, messageResolver: o, flatJson: s } = t, a = q(n) ? n : he(r) ? ae() : { [e]: ae() };
  if (he(r) && r.forEach((l) => {
    if ("locale" in l && "resource" in l) {
      const { locale: i, resource: f } = l;
      i ? (a[i] = a[i] || ae(), en(f, a[i])) : en(f, a);
    } else
      $(l) && en(JSON.parse(l), a);
  }), o == null && s)
    for (const l in a)
      We(a, l) && Wt(a[l]);
  return a;
}
function ns(e) {
  return e.type;
}
function ac(e, t, n) {
  let r = Q(t.messages) ? t.messages : ae();
  "__i18nGlobal" in n && (r = ts(e.locale.value, {
    messages: r,
    __i18n: n.__i18nGlobal
  }));
  const o = Object.keys(r);
  o.length && o.forEach((s) => {
    e.mergeLocaleMessage(s, r[s]);
  });
  {
    if (Q(t.datetimeFormats)) {
      const s = Object.keys(t.datetimeFormats);
      s.length && s.forEach((a) => {
        e.mergeDateTimeFormat(a, t.datetimeFormats[a]);
      });
    }
    if (Q(t.numberFormats)) {
      const s = Object.keys(t.numberFormats);
      s.length && s.forEach((a) => {
        e.mergeNumberFormat(a, t.numberFormats[a]);
      });
    }
  }
}
function Ya(e) {
  return ve(As, null, e, 0);
}
const Wa = "__INTLIFY_META__", Ha = () => [], rc = () => !1;
let Ba = 0;
function Ga(e) {
  return ((t, n, r, o) => e(n, r, St() || void 0, o));
}
const sc = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = St();
  let t = null;
  return e && (t = ns(e)[Wa]) ? { [Wa]: t } : null;
};
function as(e = {}, t) {
  const { __root: n, __injectWithOption: r } = e, o = n === void 0, s = e.flatJson, a = He ? oe : Ee, l = !!e.translateExistCompatible;
  process.env.NODE_ENV !== "production" && l && Ar(kt(Te.NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG));
  let i = ie(e.inheritLocale) ? e.inheritLocale : !0;
  const f = a(
    // prettier-ignore
    n && i ? n.locale.value : $(e.locale) ? e.locale : on
  ), p = a(
    // prettier-ignore
    n && i ? n.fallbackLocale.value : $(e.fallbackLocale) || he(e.fallbackLocale) || q(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : f.value
  ), m = a(ts(f.value, e)), _ = a(q(e.datetimeFormats) ? e.datetimeFormats : { [f.value]: {} }), T = a(q(e.numberFormats) ? e.numberFormats : { [f.value]: {} });
  let N = n ? n.missingWarn : ie(e.missingWarn) || rn(e.missingWarn) ? e.missingWarn : !0, C = n ? n.fallbackWarn : ie(e.fallbackWarn) || rn(e.fallbackWarn) ? e.fallbackWarn : !0, A = n ? n.fallbackRoot : ie(e.fallbackRoot) ? e.fallbackRoot : !0, E = !!e.fallbackFormat, k = ce(e.missing) ? e.missing : null, g = ce(e.missing) ? Ga(e.missing) : null, y = ce(e.postTranslation) ? e.postTranslation : null, h = n ? n.warnHtmlMessage : ie(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, c = !!e.escapeParameter;
  const u = n ? n.modifiers : q(e.modifiers) ? e.modifiers : {};
  let b = e.pluralRules || n && n.pluralRules, S;
  S = (() => {
    o && wa(null);
    const O = {
      version: qu,
      locale: f.value,
      fallbackLocale: p.value,
      messages: m.value,
      modifiers: u,
      pluralRules: b,
      missing: g === null ? void 0 : g,
      missingWarn: N,
      fallbackWarn: C,
      fallbackFormat: E,
      unresolving: !0,
      postTranslation: y === null ? void 0 : y,
      warnHtmlMessage: h,
      escapeParameter: c,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    O.datetimeFormats = _.value, O.numberFormats = T.value, O.__datetimeFormatters = q(S) ? S.__datetimeFormatters : void 0, O.__numberFormatters = q(S) ? S.__numberFormatters : void 0, process.env.NODE_ENV !== "production" && (O.__v_emitter = q(S) ? S.__v_emitter : void 0);
    const M = Du(O);
    return o && wa(M), M;
  })(), xt(S, f.value, p.value);
  function R() {
    return [
      f.value,
      p.value,
      m.value,
      _.value,
      T.value
    ];
  }
  const U = J({
    get: () => f.value,
    set: (O) => {
      f.value = O, S.locale = f.value;
    }
  }), K = J({
    get: () => p.value,
    set: (O) => {
      p.value = O, S.fallbackLocale = p.value, xt(S, f.value, O);
    }
  }), I = J(() => m.value), w = /* @__PURE__ */ J(() => _.value), D = /* @__PURE__ */ J(() => T.value);
  function F() {
    return ce(y) ? y : null;
  }
  function x(O) {
    y = O, S.postTranslation = O;
  }
  function B() {
    return k;
  }
  function G(O) {
    O !== null && (g = Ga(O)), k = O, S.missing = g;
  }
  function te(O, M) {
    return O !== "translate" || !M.resolvedMessage;
  }
  const Z = (O, M, ee, me, rt, Ht) => {
    R();
    let yt;
    try {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (S.fallbackContext = n ? wu() : void 0), yt = O(S);
    } finally {
      process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__, o || (S.fallbackContext = void 0);
    }
    if (ee !== "translate exists" && // for not `te` (e.g `t`)
    pe(yt) && yt === yn || ee === "translate exists" && !yt) {
      const [ft, cs] = M();
      if (process.env.NODE_ENV !== "production" && n && $(ft) && te(ee, cs) && (A && (En(C, ft) || Yr(N, ft)) && Be(kt(Te.FALLBACK_TO_ROOT, {
        key: ft,
        type: ee
      })), process.env.NODE_ENV !== "production")) {
        const { __v_emitter: la } = S;
        la && A && la.emit("fallback", {
          type: ee,
          key: ft,
          to: "global",
          groupId: `${ee}:${ft}`
        });
      }
      return n && A ? me(n) : rt(ft);
    } else {
      if (Ht(yt))
        return yt;
      throw $e(se.UNEXPECTED_RETURN_TYPE);
    }
  };
  function fe(...O) {
    return Z((M) => Reflect.apply(Pa, null, [M, ...O]), () => Un(...O), "translate", (M) => Reflect.apply(M.t, M, [...O]), (M) => M, (M) => $(M));
  }
  function de(...O) {
    const [M, ee, me] = O;
    if (me && !Q(me))
      throw $e(se.INVALID_ARGUMENT);
    return fe(M, ee, Ne({ resolvedMessage: !0 }, me || {}));
  }
  function be(...O) {
    return Z((M) => Reflect.apply($a, null, [M, ...O]), () => Fn(...O), "datetime format", (M) => Reflect.apply(M.d, M, [...O]), () => ln, (M) => $(M));
  }
  function Ge(...O) {
    return Z((M) => Reflect.apply(Fa, null, [M, ...O]), () => Vn(...O), "number format", (M) => Reflect.apply(M.n, M, [...O]), () => ln, (M) => $(M));
  }
  function Ue(O) {
    return O.map((M) => $(M) || pe(M) || ie(M) ? Ya(String(M)) : M);
  }
  const Fe = {
    normalize: Ue,
    interpolate: (O) => O,
    type: "vnode"
  };
  function ge(...O) {
    return Z(
      (M) => {
        let ee;
        const me = M;
        try {
          me.processor = Fe, ee = Reflect.apply(Pa, null, [me, ...O]);
        } finally {
          me.processor = null;
        }
        return ee;
      },
      () => Un(...O),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (M) => M[Wn](...O),
      (M) => [Ya(M)],
      (M) => he(M)
    );
  }
  function Me(...O) {
    return Z(
      (M) => Reflect.apply(Fa, null, [M, ...O]),
      () => Vn(...O),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (M) => M[Bn](...O),
      Ha,
      (M) => $(M) || he(M)
    );
  }
  function ze(...O) {
    return Z(
      (M) => Reflect.apply($a, null, [M, ...O]),
      () => Fn(...O),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (M) => M[Hn](...O),
      Ha,
      (M) => $(M) || he(M)
    );
  }
  function at(O) {
    b = O, S.pluralRules = b;
  }
  function Tn(O, M) {
    return Z(() => {
      if (!O)
        return !1;
      const ee = $(M) ? M : f.value, me = ct(ee), rt = S.messageResolver(me, O);
      return l ? rt != null : Re(rt) || xe(rt) || $(rt);
    }, () => [O], "translate exists", (ee) => Reflect.apply(ee.te, ee, [O, M]), rc, (ee) => ie(ee));
  }
  function It(O) {
    let M = null;
    const ee = Pr(S, p.value, f.value);
    for (let me = 0; me < ee.length; me++) {
      const rt = m.value[ee[me]] || {}, Ht = S.messageResolver(rt, O);
      if (Ht != null) {
        M = Ht;
        break;
      }
    }
    return M;
  }
  function wt(O) {
    const M = It(O);
    return M ?? (n ? n.tm(O) || {} : {});
  }
  function ct(O) {
    return m.value[O] || {};
  }
  function Dt(O, M) {
    if (s) {
      const ee = { [O]: M };
      for (const me in ee)
        We(ee, me) && Wt(ee[me]);
      M = ee[O];
    }
    m.value[O] = M, S.messages = m.value;
  }
  function Nn(O, M) {
    m.value[O] = m.value[O] || {};
    const ee = { [O]: M };
    if (s)
      for (const me in ee)
        We(ee, me) && Wt(ee[me]);
    M = ee[O], en(M, m.value[O]), S.messages = m.value;
  }
  function d(O) {
    return _.value[O] || {};
  }
  function v(O, M) {
    _.value[O] = M, S.datetimeFormats = _.value, Ua(S, O, M);
  }
  function L(O, M) {
    _.value[O] = Ne(_.value[O] || {}, M), S.datetimeFormats = _.value, Ua(S, O, M);
  }
  function V(O) {
    return T.value[O] || {};
  }
  function ue(O, M) {
    T.value[O] = M, S.numberFormats = T.value, Va(S, O, M);
  }
  function re(O, M) {
    T.value[O] = Ne(T.value[O] || {}, M), S.numberFormats = T.value, Va(S, O, M);
  }
  Ba++, n && He && (_e(n.locale, (O) => {
    i && (f.value = O, S.locale = O, xt(S, f.value, p.value));
  }), _e(n.fallbackLocale, (O) => {
    i && (p.value = O, S.fallbackLocale = O, xt(S, f.value, p.value));
  }));
  const ne = {
    id: Ba,
    locale: U,
    fallbackLocale: K,
    get inheritLocale() {
      return i;
    },
    set inheritLocale(O) {
      i = O, O && n && (f.value = n.locale.value, p.value = n.fallbackLocale.value, xt(S, f.value, p.value));
    },
    get availableLocales() {
      return Object.keys(m.value).sort();
    },
    messages: I,
    get modifiers() {
      return u;
    },
    get pluralRules() {
      return b || {};
    },
    get isGlobal() {
      return o;
    },
    get missingWarn() {
      return N;
    },
    set missingWarn(O) {
      N = O, S.missingWarn = N;
    },
    get fallbackWarn() {
      return C;
    },
    set fallbackWarn(O) {
      C = O, S.fallbackWarn = C;
    },
    get fallbackRoot() {
      return A;
    },
    set fallbackRoot(O) {
      A = O;
    },
    get fallbackFormat() {
      return E;
    },
    set fallbackFormat(O) {
      E = O, S.fallbackFormat = E;
    },
    get warnHtmlMessage() {
      return h;
    },
    set warnHtmlMessage(O) {
      h = O, S.warnHtmlMessage = O;
    },
    get escapeParameter() {
      return c;
    },
    set escapeParameter(O) {
      c = O, S.escapeParameter = O;
    },
    t: fe,
    getLocaleMessage: ct,
    setLocaleMessage: Dt,
    mergeLocaleMessage: Nn,
    getPostTranslationHandler: F,
    setPostTranslationHandler: x,
    getMissingHandler: B,
    setMissingHandler: G,
    [tc]: at
  };
  return ne.datetimeFormats = w, ne.numberFormats = D, ne.rt = de, ne.te = Tn, ne.tm = wt, ne.d = be, ne.n = Ge, ne.getDateTimeFormat = d, ne.setDateTimeFormat = v, ne.mergeDateTimeFormat = L, ne.getNumberFormat = V, ne.setNumberFormat = ue, ne.mergeNumberFormat = re, ne[nc] = r, ne[Wn] = ge, ne[Hn] = ze, ne[Bn] = Me, process.env.NODE_ENV !== "production" && (ne[Yt] = (O) => {
    S.__v_emitter = O;
  }, ne[Gn] = () => {
    S.__v_emitter = void 0;
  }), ne;
}
const sa = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function oc({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((r, o) => [
    ...r,
    // prettier-ignore
    ...o.type === Ie ? o.children : [o]
  ], []) : t.reduce((n, r) => {
    const o = e[r];
    return o && (n[r] = o()), n;
  }, ae());
}
function rs(e) {
  return Ie;
}
const lc = /* @__PURE__ */ dn({
  /* eslint-disable */
  name: "i18n-t",
  props: Ne({
    keypath: {
      type: String,
      required: !0
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (e) => pe(e) || !isNaN(e)
    }
  }, sa),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const { slots: n, attrs: r } = t, o = e.i18n || bn({
      useScope: e.scope,
      __useComponent: !0
    });
    return () => {
      const s = Object.keys(n).filter((m) => m !== "_"), a = ae();
      e.locale && (a.locale = e.locale), e.plural !== void 0 && (a.plural = $(e.plural) ? +e.plural : e.plural);
      const l = oc(t, s), i = o[Wn](e.keypath, l, a), f = Ne(ae(), r), p = $(e.tag) || Q(e.tag) ? e.tag : rs();
      return Pt(p, f, i);
    };
  }
}), wn = lc;
function ic(e) {
  return he(e) && !$(e[0]);
}
function ss(e, t, n, r) {
  const { slots: o, attrs: s } = t;
  return () => {
    const a = { part: !0 };
    let l = ae();
    e.locale && (a.locale = e.locale), $(e.format) ? a.key = e.format : Q(e.format) && ($(e.format.key) && (a.key = e.format.key), l = Object.keys(e.format).reduce((_, T) => n.includes(T) ? Ne(ae(), _, { [T]: e.format[T] }) : _, ae()));
    const i = r(e.value, a, l);
    let f = [a.key];
    he(i) ? f = i.map((_, T) => {
      const N = o[_.type], C = N ? N({ [_.type]: _.value, index: T, parts: i }) : [_.value];
      return ic(C) && (C[0].key = `${_.type}-${T}`), C;
    }) : $(i) && (f = [i]);
    const p = Ne(ae(), s), m = $(e.tag) || Q(e.tag) ? e.tag : rs();
    return Pt(m, p, f);
  };
}
const uc = /* @__PURE__ */ dn({
  /* eslint-disable */
  name: "i18n-n",
  props: Ne({
    value: {
      type: Number,
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, sa),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || bn({
      useScope: e.scope,
      __useComponent: !0
    });
    return ss(e, t, qr, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Bn](...r)
    ));
  }
}), ja = uc, cc = /* @__PURE__ */ dn({
  /* eslint-disable */
  name: "i18n-d",
  props: Ne({
    value: {
      type: [Number, Date],
      required: !0
    },
    format: {
      type: [String, Object]
    }
  }, sa),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(e, t) {
    const n = e.i18n || bn({
      useScope: e.scope,
      __useComponent: !0
    });
    return ss(e, t, Jr, (...r) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      n[Hn](...r)
    ));
  }
}), Ka = cc;
function fc(e, t) {
  const n = e;
  if (e.mode === "composition")
    return n.__getInstance(t) || e.global;
  {
    const r = n.__getInstance(t);
    return r != null ? r.__composer : e.global.__composer;
  }
}
function dc(e) {
  const t = (a) => {
    const { instance: l, modifiers: i, value: f } = a;
    if (!l || !l.$)
      throw $e(se.UNEXPECTED_ERROR);
    const p = fc(e, l.$);
    process.env.NODE_ENV !== "production" && i.preserve && Be(kt(Te.NOT_SUPPORTED_PRESERVE));
    const m = Xa(f);
    return [
      Reflect.apply(p.t, p, [...za(m)]),
      p
    ];
  };
  return {
    created: (a, l) => {
      const [i, f] = t(l);
      He && e.global === f && (a.__i18nWatcher = _e(f.locale, () => {
        l.instance && l.instance.$forceUpdate();
      })), a.__composer = f, a.textContent = i;
    },
    unmounted: (a) => {
      He && a.__i18nWatcher && (a.__i18nWatcher(), a.__i18nWatcher = void 0, delete a.__i18nWatcher), a.__composer && (a.__composer = void 0, delete a.__composer);
    },
    beforeUpdate: (a, { value: l }) => {
      if (a.__composer) {
        const i = a.__composer, f = Xa(l);
        a.textContent = Reflect.apply(i.t, i, [
          ...za(f)
        ]);
      }
    },
    getSSRProps: (a) => {
      const [l] = t(a);
      return { textContent: l };
    }
  };
}
function Xa(e) {
  if ($(e))
    return { path: e };
  if (q(e)) {
    if (!("path" in e))
      throw $e(se.REQUIRED_VALUE, "path");
    return e;
  } else
    throw $e(se.INVALID_VALUE);
}
function za(e) {
  const { path: t, locale: n, args: r, choice: o, plural: s } = e, a = {}, l = r || {};
  return $(n) && (a.locale = n), pe(o) && (a.plural = o), pe(s) && (a.plural = s), [t, l, a];
}
function mc(e, t, ...n) {
  const r = q(n[0]) ? n[0] : {}, o = !!r.useI18nComponentName, s = ie(r.globalInstall) ? r.globalInstall : !0;
  process.env.NODE_ENV !== "production" && s && o && Be(kt(Te.COMPONENT_NAME_LEGACY_COMPATIBLE, {
    name: wn.name
  })), s && ([o ? "i18n" : wn.name, "I18nT"].forEach((a) => e.component(a, wn)), [ja.name, "I18nN"].forEach((a) => e.component(a, ja)), [Ka.name, "I18nD"].forEach((a) => e.component(a, Ka))), e.directive("t", dc(t));
}
const Dn = {
  "vue-devtools-plugin-vue-i18n": "Vue I18n devtools",
  "vue-i18n-resource-inspector": "I18n Resources",
  "vue-i18n-timeline": "Vue I18n"
}, _c = {
  "vue-i18n-resource-inspector": "Search for scopes ..."
}, vc = {
  "vue-i18n-timeline": 16764185
}, os = "vue-i18n: composer properties";
let Kn;
async function pc(e, t) {
  return new Promise((n, r) => {
    try {
      Ju({
        id: "vue-devtools-plugin-vue-i18n",
        label: Dn[
          "vue-devtools-plugin-vue-i18n"
          /* VueDevToolsIDs.PLUGIN */
        ],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [os],
        app: e
        // eslint-disable-line @typescript-eslint/no-explicit-any
      }, (o) => {
        Kn = o, o.on.visitComponentTree(({ componentInstance: a, treeNode: l }) => {
          hc(a, l, t);
        }), o.on.inspectComponent(({ componentInstance: a, instanceData: l }) => {
          a.vnode.el && a.vnode.el.__VUE_I18N__ && l && (t.mode === "legacy" ? a.vnode.el.__VUE_I18N__ !== t.global.__composer && Ja(l, a.vnode.el.__VUE_I18N__) : Ja(l, a.vnode.el.__VUE_I18N__));
        }), o.addInspector({
          id: "vue-i18n-resource-inspector",
          label: Dn[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ],
          icon: "language",
          treeFilterPlaceholder: _c[
            "vue-i18n-resource-inspector"
            /* VueDevToolsIDs.CUSTOM_INSPECTOR */
          ]
        }), o.on.getInspectorTree((a) => {
          a.app === e && a.inspectorId === "vue-i18n-resource-inspector" && bc(a, t);
        });
        const s = /* @__PURE__ */ new Map();
        o.on.getInspectorState(async (a) => {
          if (a.app === e && a.inspectorId === "vue-i18n-resource-inspector")
            if (o.unhighlightElement(), Nc(a, t), a.nodeId === "global") {
              if (!s.has(a.app)) {
                const [l] = await o.getComponentInstances(a.app);
                s.set(a.app, l);
              }
              o.highlightElement(s.get(a.app));
            } else {
              const l = Tc(a.nodeId, t);
              l && o.highlightElement(l);
            }
        }), o.on.editInspectorState((a) => {
          a.app === e && a.inspectorId === "vue-i18n-resource-inspector" && Cc(a, t);
        }), o.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: Dn[
            "vue-i18n-timeline"
            /* VueDevToolsIDs.TIMELINE */
          ],
          color: vc[
            "vue-i18n-timeline"
            /* VueDevToolsIDs.TIMELINE */
          ]
        }), n(!0);
      });
    } catch (o) {
      console.error(o), r(!1);
    }
  });
}
function ls(e) {
  return e.type.name || e.type.displayName || e.type.__file || "Anonymous";
}
function hc(e, t, n) {
  const r = n.mode === "composition" ? n.global : n.global.__composer;
  if (e && e.vnode.el && e.vnode.el.__VUE_I18N__ && e.vnode.el.__VUE_I18N__ !== r) {
    const o = {
      label: `i18n (${ls(e)} Scope)`,
      textColor: 0,
      backgroundColor: 16764185
    };
    t.tags.push(o);
  }
}
function Ja(e, t) {
  const n = os;
  e.state.push({
    type: n,
    key: "locale",
    editable: !0,
    value: t.locale.value
  }), e.state.push({
    type: n,
    key: "availableLocales",
    editable: !1,
    value: t.availableLocales
  }), e.state.push({
    type: n,
    key: "fallbackLocale",
    editable: !0,
    value: t.fallbackLocale.value
  }), e.state.push({
    type: n,
    key: "inheritLocale",
    editable: !0,
    value: t.inheritLocale
  }), e.state.push({
    type: n,
    key: "messages",
    editable: !1,
    value: oa(t.messages.value)
  }), e.state.push({
    type: n,
    key: "datetimeFormats",
    editable: !1,
    value: t.datetimeFormats.value
  }), e.state.push({
    type: n,
    key: "numberFormats",
    editable: !1,
    value: t.numberFormats.value
  });
}
function oa(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    const r = e[n];
    ce(r) && "source" in r ? t[n] = Ec(r) : Re(r) && r.loc && r.loc.source ? t[n] = r.loc.source : Q(r) ? t[n] = oa(r) : t[n] = r;
  }), t;
}
const gc = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function Ac(e) {
  return e.replace(/[<>"&]/g, yc);
}
function yc(e) {
  return gc[e] || e;
}
function Ec(e) {
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${e.source ? `("${Ac(e.source)}")` : "(?)"}`
    }
  };
}
function bc(e, t) {
  e.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const n = t.mode === "composition" ? t.global : t.global.__composer;
  for (const [r, o] of t.__instances) {
    const s = t.mode === "composition" ? o : o.__composer;
    n !== s && e.rootNodes.push({
      id: s.id.toString(),
      label: `${ls(r)} Scope`
    });
  }
}
function Tc(e, t) {
  let n = null;
  if (e !== "global") {
    for (const [r, o] of t.__instances.entries())
      if (o.id.toString() === e) {
        n = r;
        break;
      }
  }
  return n;
}
function is(e, t) {
  if (e === "global")
    return t.mode === "composition" ? t.global : t.global.__composer;
  {
    const n = Array.from(t.__instances.values()).find((r) => r.id.toString() === e);
    return n ? t.mode === "composition" ? n : n.__composer : null;
  }
}
function Nc(e, t) {
  const n = is(e.nodeId, t);
  return n && (e.state = Oc(n)), null;
}
function Oc(e) {
  const t = {}, n = "Locale related info", r = [
    {
      type: n,
      key: "locale",
      editable: !0,
      value: e.locale.value
    },
    {
      type: n,
      key: "fallbackLocale",
      editable: !0,
      value: e.fallbackLocale.value
    },
    {
      type: n,
      key: "availableLocales",
      editable: !1,
      value: e.availableLocales
    },
    {
      type: n,
      key: "inheritLocale",
      editable: !0,
      value: e.inheritLocale
    }
  ];
  t[n] = r;
  const o = "Locale messages info", s = [
    {
      type: o,
      key: "messages",
      editable: !1,
      value: oa(e.messages.value)
    }
  ];
  t[o] = s;
  {
    const a = "Datetime formats info", l = [
      {
        type: a,
        key: "datetimeFormats",
        editable: !1,
        value: e.datetimeFormats.value
      }
    ];
    t[a] = l;
    const i = "Datetime formats info", f = [
      {
        type: i,
        key: "numberFormats",
        editable: !1,
        value: e.numberFormats.value
      }
    ];
    t[i] = f;
  }
  return t;
}
function Xn(e, t) {
  if (Kn) {
    let n;
    t && "groupId" in t && (n = t.groupId, delete t.groupId), Kn.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: e,
        groupId: n,
        time: Date.now(),
        meta: {},
        data: t || {},
        logType: e === "compile-error" ? "error" : e === "fallback" || e === "missing" ? "warning" : "default"
      }
    });
  }
}
function Cc(e, t) {
  const n = is(e.nodeId, t);
  if (n) {
    const [r] = e.path;
    r === "locale" && $(e.state.value) ? n.locale.value = e.state.value : r === "fallbackLocale" && ($(e.state.value) || he(e.state.value) || Q(e.state.value)) ? n.fallbackLocale.value = e.state.value : r === "inheritLocale" && ie(e.state.value) && (n.inheritLocale = e.state.value);
  }
}
const kc = /* @__PURE__ */ Xe("global-vue-i18n");
function Sc(e = {}, t) {
  const n = ie(e.globalInjection) ? e.globalInjection : !0, r = !0, o = /* @__PURE__ */ new Map(), [s, a] = Lc(e), l = /* @__PURE__ */ Xe(process.env.NODE_ENV !== "production" ? "vue-i18n" : "");
  process.env.NODE_ENV;
  function i(m) {
    return o.get(m) || null;
  }
  function f(m, _) {
    o.set(m, _);
  }
  function p(m) {
    o.delete(m);
  }
  {
    const m = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return r;
      },
      // install plugin
      async install(_, ...T) {
        if (process.env.NODE_ENV !== "production" && (_.__VUE_I18N__ = m), _.__VUE_I18N_SYMBOL__ = l, _.provide(_.__VUE_I18N_SYMBOL__, m), q(T[0])) {
          const A = T[0];
          m.__composerExtend = A.__composerExtend, m.__vueI18nExtend = A.__vueI18nExtend;
        }
        let N = null;
        n && (N = $c(_, m.global)), mc(_, m, ...T);
        const C = _.unmount;
        if (_.unmount = () => {
          N && N(), m.dispose(), C();
        }, process.env.NODE_ENV !== "production") {
          if (!await pc(_, m))
            throw $e(se.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          const E = yr();
          {
            const k = a;
            k[Yt] && k[Yt](E);
          }
          E.on("*", Xn);
        }
      },
      // global accessor
      get global() {
        return a;
      },
      dispose() {
        s.stop();
      },
      // @internal
      __instances: o,
      // @internal
      __getInstance: i,
      // @internal
      __setInstance: f,
      // @internal
      __deleteInstance: p
    };
    return m;
  }
}
function bn(e = {}) {
  const t = St();
  if (t == null)
    throw $e(se.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw $e(se.NOT_INSTALLED);
  const n = Ic(t), r = Dc(n), o = ns(t), s = wc(e, o);
  if (s === "global")
    return ac(r, e, o), r;
  if (s === "parent") {
    let i = Mc(n, t, e.__useComponent);
    return i == null && (process.env.NODE_ENV !== "production" && Be(kt(Te.NOT_FOUND_PARENT_SCOPE)), i = r), i;
  }
  const a = n;
  let l = a.__getInstance(t);
  if (l == null) {
    const i = Ne({}, e);
    "__i18n" in o && (i.__i18n = o.__i18n), r && (i.__root = r), l = as(i), a.__composerExtend && (l[jn] = a.__composerExtend(l)), Pc(a, t, l), a.__setInstance(t, l);
  }
  return l;
}
function Lc(e, t, n) {
  const r = hs();
  {
    const o = r.run(() => as(e));
    if (o == null)
      throw $e(se.UNEXPECTED_ERROR);
    return [r, o];
  }
}
function Ic(e) {
  {
    const t = nr(e.isCE ? kc : e.appContext.app.__VUE_I18N_SYMBOL__);
    if (!t)
      throw $e(e.isCE ? se.NOT_INSTALLED_WITH_PROVIDE : se.UNEXPECTED_ERROR);
    return t;
  }
}
function wc(e, t) {
  return hn(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function Dc(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function Mc(e, t, n = !1) {
  let r = null;
  const o = t.root;
  let s = xc(t, n);
  for (; s != null; ) {
    const a = e;
    if (e.mode === "composition" && (r = a.__getInstance(s)), r != null || o === s)
      break;
    s = s.parent;
  }
  return r;
}
function xc(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function Pc(e, t, n) {
  let r = null;
  tt(() => {
    if (process.env.NODE_ENV !== "production" && t.vnode.el) {
      t.vnode.el.__VUE_I18N__ = n, r = yr();
      const o = n;
      o[Yt] && o[Yt](r), r.on("*", Xn);
    }
  }, t), gs(() => {
    const o = n;
    process.env.NODE_ENV !== "production" && t.vnode.el && t.vnode.el.__VUE_I18N__ && (r && r.off("*", Xn), o[Gn] && o[Gn](), delete t.vnode.el.__VUE_I18N__), e.__deleteInstance(t);
    const s = o[jn];
    s && (s(), delete o[jn]);
  }, t);
}
const Rc = [
  "locale",
  "fallbackLocale",
  "availableLocales"
], qa = ["t", "rt", "d", "n", "tm", "te"];
function $c(e, t) {
  const n = /* @__PURE__ */ Object.create(null);
  return Rc.forEach((o) => {
    const s = Object.getOwnPropertyDescriptor(t, o);
    if (!s)
      throw $e(se.UNEXPECTED_ERROR);
    const a = er(s.value) ? {
      get() {
        return s.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(l) {
        s.value.value = l;
      }
    } : {
      get() {
        return s.get && s.get();
      }
    };
    Object.defineProperty(n, o, a);
  }), e.config.globalProperties.$i18n = n, qa.forEach((o) => {
    const s = Object.getOwnPropertyDescriptor(t, o);
    if (!s || !s.value)
      throw $e(se.UNEXPECTED_ERROR);
    Object.defineProperty(e.config.globalProperties, `$${o}`, s);
  }), () => {
    delete e.config.globalProperties.$i18n, qa.forEach((o) => {
      delete e.config.globalProperties[`$${o}`];
    });
  };
}
Qu();
__INTLIFY_JIT_COMPILATION__ ? Ia($u) : Ia(Ru);
ku(lu);
Su(Pr);
if (process.env.NODE_ENV !== "production" || __INTLIFY_PROD_DEVTOOLS__) {
  const e = Ut();
  e.__INTLIFY__ = !0, pu(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
process.env.NODE_ENV;
function Uc(e) {
  let t = [];
  function n(r) {
    const o = { ...r };
    delete o.children, t.push(o), r.children && r.children.forEach(n);
  }
  return e.forEach(n), t;
}
const Fc = {
  __name: "App",
  props: {
    language: {
      type: String,
      default: void 0
    },
    theme: {
      type: String,
      default: void 0
    },
    angleUnit: {
      type: String,
      default: void 0
    },
    initialMode: {
      type: String,
      default: void 0
    }
  },
  emits: [
    "mode-change",
    "language-change",
    "theme-change",
    "calculation"
  ],
  setup(e, { emit: t }) {
    const { locale: n } = bn(), r = t, o = e, s = Ke(), a = dr({
      emitAuto: !0
    });
    return _e(
      () => s.language,
      (l) => {
        r("language-change", l), n.value = l;
      },
      { immediate: !0 }
    ), _e(
      () => s.activeMenu,
      (l) => {
        r("mode-change", l);
      }
    ), _e(a, (l) => {
      r("theme-change", l);
    }), _r.on(({ expression: l, result: i }) => {
      r("calculation", { expression: l, result: i });
    }), tt(() => {
      if (o.initialMode) {
        let i = Uc(pn.moreMenuList).find((f) => f.key == o.initialMode);
        !i && o.initialMode == "settings" && (i = { name: "calculator.settings", key: "settings" }), i && s.setActiveMenu(i);
      }
      o.language && s.setLanguage(o.language), o.theme && (a.value = o.theme), o.angleUnit && s.setAngleUnit(o.angleUnit);
    }), (l, i) => (Y(), De(ri));
  }
};
if (typeof window < "u") {
  let e = function() {
    var t = document.body, n = document.getElementById("__svg__icons__dom__");
    n || (n = document.createElementNS("http://www.w3.org/2000/svg", "svg"), n.style.position = "absolute", n.style.width = "0", n.style.height = "0", n.id = "__svg__icons__dom__", n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), n.setAttribute("xmlns:link", "http://www.w3.org/1999/xlink")), n.innerHTML = '<symbol class="icon" viewBox="0 0 1024 1024"  id="icon-back"><path d="m494.48 673.68 113.136-113.152 113.152 113.136 56.56-56.56-113.136-113.12 113.136-113.152-56.56-56.56-113.152 113.136L494.48 334.272l-56.56 56.56 113.136 113.136L437.92 617.104l56.56 56.56zM324.912 160 22.576 508.64 325.264 848H1008V160H324.912zM928 768H361.2L128.928 507.904 361.536 240H928v528z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-downwardArrow"><path d="M558.305 756.481c-13.668 13.668-32.216 26.36-49.789 22.455-17.572 2.928-34.169-10.74-47.835-22.455L37.969 331.816c-21.478-21.476-21.478-56.622 0-78.1s56.622-21.476 78.098 0l393.426 404.165 394.402-404.163c21.476-21.478 56.622-21.478 78.098 0s21.478 56.622 0 78.098L558.305 756.481z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-more"><path d="M66.489 211.782H957.51c28.199 0 50.98-22.239 50.98-49.649 0-27.397-22.768-49.648-50.98-49.648H66.49c-28.147 0-50.98 22.238-50.98 49.648s22.833 49.649 50.98 49.649zm891.01 248.242H66.488c-28.212 0-50.98 22.239-50.98 49.649s22.768 49.648 50.98 49.648H957.51c28.199 0 50.98-22.238 50.98-49.648-.013-27.41-22.923-49.649-50.993-49.649zm0 351.638H66.488c-28.134 0-50.98 22.239-50.98 49.649s22.833 49.648 50.98 49.648H957.51c28.199 0 50.98-22.238 50.98-49.648-.013-27.397-22.781-49.649-50.993-49.649zm0 0" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-setting"><path d="M380.122.7h208.621c24.601 0 64.063-4.421 75.227 8.99a74.327 74.327 0 0 1 8.392 49.128v95.257c16.783 7.792 33.542 16.558 49.152 25.75a90.836 90.836 0 0 1 20.38 12.287l83.618-51.524a57.444 57.444 0 0 1 39.262-15.885c25.85 4.696 33.267 32.469 44.656 51.525l86.915 151.277 25.775 45.83a32.468 32.468 0 0 1 .3 21.58 73.528 73.528 0 0 1-33.268 24.55l-86.615 54.522v76.4l82.72 51.8a60.89 60.89 0 0 1 33.267 29.671 52.449 52.449 0 0 1-11.09 44.631l-11.388 20.68-84.493 147.007c-9.99 16.758-19.806 46.354-39.561 52.448a50.3 50.3 0 0 1-45.556-12.487l-84.517-52.174-17.683 11.988a140.837 140.837 0 0 1-51.85 26.05v95.556a80.471 80.471 0 0 1-7.792 48.228c-11.139 13.911-45.206 9.59-69.931 9.59h-164.84c-22.702 0-53.797 3.522-66.834-6.593-11.689-9.066-10.79-26.324-10.79-47.454v-99.452l-18.282-9.291c-9.366-5.445-19.356-9.616-28.472-14.986a104.323 104.323 0 0 1-23.077-13.786l-86.316 53.323a47.853 47.853 0 0 1-41.36 13.162c-21.03-6.32-31.144-36.19-41.66-53.898L28.117 696.72 2.34 651.164a33.467 33.467 0 0 1-1.499-19.156 56.844 56.844 0 0 1 31.47-25.775l89.612-55.995v-76.7l-91.11-56.92A53.223 53.223 0 0 1 .841 391.643a32.993 32.993 0 0 1 1.2-18.283l24.975-44.331 83.319-144.984c8.391-14.036 22.852-48.677 36.863-54.521a48.852 48.852 0 0 1 45.256 13.187l89.313 55.72 16.184-11.089a232.273 232.273 0 0 1 54.347-26.999V60.616a107.57 107.57 0 0 1 4.196-45.556A30.47 30.47 0 0 1 372.68 2.198zm36.265 64.087v85.99a80.047 80.047 0 0 1-6.594 44.332 60.84 60.84 0 0 1-27.273 16.46 327.805 327.805 0 0 0-40.46 21.578l-20.38 13.187a47.304 47.304 0 0 1-41.36 14.361 117.51 117.51 0 0 1-31.77-15.26l-49.151-25.65a152.876 152.876 0 0 0-26.375-13.761L77.717 371.662l81.82 49.127a52.074 52.074 0 0 1 28.473 23.977 46.23 46.23 0 0 1-2.098 21.853 304.078 304.078 0 0 0-5.994 60.516 106.271 106.271 0 0 0 2.697 23.677 43.757 43.757 0 0 1 2.997 34.142 85.966 85.966 0 0 1-30.57 21.254l-77.425 46.73L173.224 818.6l71.93-42.834a120.357 120.357 0 0 1 34.766-18.581 45.306 45.306 0 0 1 39.561 12.887l21.58 14.086a321.511 321.511 0 0 0 40.16 21.554 62.864 62.864 0 0 1 28.472 17.083 85.492 85.492 0 0 1 6.594 46.13v90.462h191.538v-84.767a81.695 81.695 0 0 1 7.193-46.13 63.063 63.063 0 0 1 27.473-16.184 320.237 320.237 0 0 0 39.261-20.955l22.179-14.386a46.28 46.28 0 0 1 41.06-13.187 99.178 99.178 0 0 1 27.873 14.686l78.223 46.43 95.307-165.963-29.97-17.958-40.461-24.276a79.198 79.198 0 0 1-38.363-32.643 30.345 30.345 0 0 1 .3-20.38l.9-13.762 5.519-30.42a138.215 138.215 0 0 0-2.098-43.733 47.454 47.454 0 0 1-3.297-23.951 54.122 54.122 0 0 1 9.99-20.98 76.525 76.525 0 0 1 19.98-12.488l46.455-27.847 31.47-18.882-95.907-165.938-69.032 41.26a133.894 133.894 0 0 1-37.164 19.98c-23.827 5.77-46.83-18.032-61.44-26.948l-35.665-19.481a63.963 63.963 0 0 1-28.472-17.658 57.844 57.844 0 0 1-10.19-20.68 190.839 190.839 0 0 1-.9-39.536v-77.9H416.387zm84.917 255.525c98.903-1.423 160.343 47.928 188.54 116.836a202.752 202.752 0 0 1 11.69 109.893 235.52 235.52 0 0 1-12.888 43.732A184.295 184.295 0 0 1 568.763 696.22a320.537 320.537 0 0 1-44.357 7.493h-15.984l-19.182-.9a240.99 240.99 0 0 1-47.653-11.663 182.572 182.572 0 0 1-113.59-123.73 198.556 198.556 0 0 1-5.694-85.665 219.536 219.536 0 0 1 9.591-38.338 186.718 186.718 0 0 1 111.192-111.441 223.157 223.157 0 0 1 37.463-9.59zm4.196 64.113-13.787 1.498a153.625 153.625 0 0 0-26.074 7.193 127.376 127.376 0 0 0-2.098 236.644 117.385 117.385 0 0 0 56.345 9.99 222.732 222.732 0 0 0 28.771-4.995 128.075 128.075 0 0 0 81.52-73.103 133.12 133.12 0 0 0-.299-98.554 125.128 125.128 0 0 0-124.453-78.673z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-trigonometry"><path d="M874.667 422.4v-25.6h25.6v25.6z" /><path d="M900.267 140.8v230.4h-25.6V171.712L175.966 870.4h698.7V448h25.6v435.2a12.8 12.8 0 0 1-12.8 12.8h-742.4a12.826 12.826 0 0 1-9.049-21.85l742.4-742.4a12.8 12.8 0 0 1 21.85 9.05z" /><path d="M733.867 652.8v-25.6h25.6v25.6z" /><path d="M759.467 512v89.6h-25.6v-58.7L547.166 729.6h186.7v-51.2h25.6v64a12.8 12.8 0 0 1-12.8 12.8h-230.4a12.826 12.826 0 0 1-9.049-21.85l230.4-230.4a12.8 12.8 0 0 1 21.85 9.05zm-486.4 371.2V832h25.6v51.2zm102.4 0v-76.8h25.6v76.8zm102.4 0V832h25.6v51.2zm102.4 0v-76.8h25.6v76.8zm102.4 0V832h25.6v51.2zm102.4 0v-76.8h25.6v76.8zm-521.05-118.95 18.1-18.1 38.4 38.4-18.1 18.112zm64-64 18.1-18.1 38.4 38.4-18.1 18.112zm64-64 18.1-18.1 38.4 38.4-18.1 18.112zm64-64 18.1-18.1 38.4 38.4-18.1 18.112zm64-64 18.1-18.1 38.4 38.4-18.1 18.112zm64-64 18.1-18.1 38.4 38.4-18.1 18.112zm64-64 18.1-18.1 38.4 38.4-18.1 18.112zm63.987-64 18.112-18.1 38.4 38.4-18.099 18.112zm64-64 18.112-18.1 38.4 38.4-18.099 18.112z" /></symbol><symbol  aria-hidden="true" class="iconify iconify--logos" viewBox="0 0 256 198" id="icon-vue"><path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z" /><path fill="#41B883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z" /><path fill="#35495E" d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z" /></symbol>', t.insertBefore(n, t.lastChild);
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
}
const Vc = { settings: "设置", calculator: "计算器", standard: "标准", scientific: "科学", graphing: "绘图", programmer: "程序员", dateCalculation: "日期计算", converter: "转换器", currency: "货币", volume: "体积", length: "长度", weightAndMass: "重量", temperature: "温度", energy: "能量", area: "面积", speed: "速度", time: "时间", power: "功率", data: "数据", pressure: "压强", angle: "角度" }, Yc = { from: "开始日期", to: "结束日期", year: "年", month: "月", week: "周", day: "天", differenceBetweenDates: "日期之间的相隔时间", addSubDays: "添加或减去天数", add: "添加", subtract: "减去", date: "日期", difference: "差值" }, Wc = { trigonometry: "三角学", function: "函数" }, Hc = { appearance: "外观", appTheme: "应用程序主题", appThemeTips: "选择要显示的应用主题", about: "关于", aboutTips: "Vue3 + Vite + MathJS", githubTips: "若要了解如何参与 web 计算器, 请在<a href='https://github.com/1245040330/vue3-calculator' target='_blank'>GitHub</a>上查看该项目。", language: "语言", languageTips: "计算器将使用此语言", appThemeOptions: { light: "浅色", dark: "深色", useSystemSetting: "使用系统设置" } }, us = {
  calculator: Vc,
  dateCalculation: Yc,
  scientific: Wc,
  settings: Hc
}, Bc = { settings: "Settings", calculator: "Calculator", standard: "Standard", scientific: "Scientific", graphing: "Graphing", programmer: "Programmer", dateCalculation: "DateCalculation", converter: "Converter", currency: "Currency", volume: "Volume", length: "Length", weightAndMass: "Weight and Mass", temperature: "Temperature", energy: "Energy", area: "Area", speed: "Speed", time: "Time", power: "Power", data: "Data", pressure: "Pressure", angle: "Angle" }, Gc = { from: "From", to: "To", year: "years", month: "months", week: "weeks", day: "days", differenceBetweenDates: "Difference between dates", addSubDays: "Add or subtract days", add: "Add", subtract: "Subtract", date: "Date", difference: "Difference" }, jc = { trigonometry: "Trigonometry", function: "Function" }, Kc = { appearance: "Appearance", appTheme: "App theme", appThemeTips: "Select which app theme to display", about: "About", aboutTips: "Vue3 + Vite + MathJS", githubTips: "To learn how you can contribute to Web Calculator, check out the project on <a href='https://github.com/1245040330/vue3-calculator'  target='_blank'>GitHub</a>.", language: "Language", languageTips: "The calculator will use this language", appThemeOptions: { light: "Light", dark: "Dark", useSystemSetting: "Use system setting" } }, Xc = {
  calculator: Bc,
  dateCalculation: Gc,
  scientific: jc,
  settings: Kc
};
console.log(us);
const zc = Sc({
  globalInjection: !0,
  // 2. 必须为 true，才能全局使用 $t
  locale: "zh-cn",
  // 默认语言
  fallbackLocale: "en",
  // 备用语言
  messages: {
    "zh-cn": us,
    en: Xc
  }
}), ef = {
  install: (e) => {
    window.__LIB_APP__ = e, bs() || (fo(e), console.log("Pinia: 宿主未发现实例，已自动初始化。")), e.component("SvgIcon", Jt), e.use(zc), e.component("Calculator", Fc);
  }
};
export {
  ef as default
};
