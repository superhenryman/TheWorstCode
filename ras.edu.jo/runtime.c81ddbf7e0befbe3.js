(() => {
	"use strict";
	var e, i = {},
		s = {};

	function a(e) {
		var n = s[e];
		if (void 0 !== n) return n.exports;
		var r = s[e] = {
			exports: {}
		};
		return i[e].call(r.exports, r, r.exports, a), r.exports
	}
	a.m = i, e = [], a.O = (n, r, u, t) => {
		if (!r) {
			var c = 1 / 0;
			for (l = 0; l < e.length; l++) {
				for (var [r, u, t] = e[l], d = !0, o = 0; o < r.length; o++)(!1 & t || c >= t) && Object.keys(a.O).every(p => a.O[p](r[o])) ? r.splice(o--, 1) : (d = !1, t < c && (c = t));
				if (d) {
					e.splice(l--, 1);
					var f = u();
					void 0 !== f && (n = f)
				}
			}
			return n
		}
		t = t || 0;
		for (var l = e.length; l > 0 && e[l - 1][2] > t; l--) e[l] = e[l - 1];
		e[l] = [r, u, t]
	}, a.n = e => {
		var n = e && e.__esModule ? () => e.default : () => e;
		return a.d(n, {
			a: n
		}), n
	}, a.d = (e, n) => {
		for (var r in n) a.o(n, r) && !a.o(e, r) && Object.defineProperty(e, r, {
			enumerable: !0,
			get: n[r]
		})
	}, a.o = (e, n) => Object.prototype.hasOwnProperty.call(e, n), a.r = e => {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, (() => {
		var e = {
			666: 0
		};
		a.O.j = u => 0 === e[u];
		var n = (u, t) => {
				var o, f, [l, c, d] = t,
					_ = 0;
				if (l.some(b => 0 !== e[b])) {
					for (o in c) a.o(c, o) && (a.m[o] = c[o]);
					if (d) var v = d(a)
				}
				for (u && u(t); _ < l.length; _++) a.o(e, f = l[_]) && e[f] && e[f][0](), e[f] = 0;
				return a.O(v)
			},
			r = self.webpackChunkangular_dynamic_demo = self.webpackChunkangular_dynamic_demo || [];
		r.forEach(n.bind(null, 0)), r.push = n.bind(null, r.push.bind(r))
	})()
})();