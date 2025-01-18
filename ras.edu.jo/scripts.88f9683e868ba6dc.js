(function() {
	const et = "undefined" != typeof self,
		ot = "undefined" != typeof document,
		Lt = et ? self : global;
	let rt;
	if (ot) {
		const j = document.querySelector("base[href]");
		j && (rt = j.href)
	}
	if (!rt && "undefined" != typeof location) {
		rt = location.href.split("#")[0].split("?")[0];
		const j = rt.lastIndexOf("/"); - 1 !== j && (rt = rt.slice(0, j + 1))
	}
	const c = /\\/g;

	function nt(j, _) {
		if (-1 !== j.indexOf("\\") && (j = j.replace(c, "/")), "/" === j[0] && "/" === j[1]) return _.slice(0, _.indexOf(":") + 1) + j;
		if ("." === j[0] && ("/" === j[1] || "." === j[1] && ("/" === j[2] || 2 === j.length && (j += "/")) || 1 === j.length && (j += "/")) || "/" === j[0]) {
			const pt = _.slice(0, _.indexOf(":") + 1);
			let U;
			if ("/" === _[pt.length + 1] ? "file:" !== pt ? (U = _.slice(pt.length + 2), U = U.slice(U.indexOf("/") + 1)) : U = _.slice(8) : U = _.slice(pt.length + ("/" === _[pt.length])), "/" === j[0]) return _.slice(0, _.length - U.length - 1) + j;
			const V = U.slice(0, U.lastIndexOf("/") + 1) + j,
				G = [];
			let mt = -1;
			for (let gt = 0; gt < V.length; gt++) - 1 !== mt ? "/" === V[gt] && (G.push(V.slice(mt, gt + 1)), mt = -1) : "." === V[gt] ? "." !== V[gt + 1] || "/" !== V[gt + 2] && gt + 2 !== V.length ? "/" === V[gt + 1] || gt + 1 === V.length ? gt += 1 : mt = gt : (G.pop(), gt += 2) : mt = gt;
			return -1 !== mt && G.push(V.slice(mt)), _.slice(0, _.length - U.length) + G.join("")
		}
	}
	const ft = "undefined" != typeof Symbol,
		ct = ft && Symbol.toStringTag,
		jt = ft ? Symbol() : "@";

	function St() {
		this[jt] = {}
	}
	const F = St.prototype;
	let bt;

	function Tt(j, _, pt) {
		let U = j[jt][_];
		if (U) return U;
		const V = [],
			G = Object.create(null);
		ct && Object.defineProperty(G, ct, {
			value: "Module"
		});
		let mt = Promise.resolve().then(function() {
			return j.instantiate(_, pt)
		}).then(function(Vt) {
			if (!Vt) throw Error("Module " + _ + " did not instantiate");
			const ee = Vt[1](function Xt(Ot, Bt) {
				U.h = !0;
				let zt = !1;
				if ("object" != typeof Ot)(!(Ot in G) || G[Ot] !== Bt) && (G[Ot] = Bt, zt = !0);
				else {
					for (let de in Ot) {
						let yt = Ot[de];
						(!(de in G) || G[de] !== yt) && (G[de] = yt, zt = !0)
					}
					Ot.__esModule && (G.__esModule = Ot.__esModule)
				}
				if (zt)
					for (let de = 0; de < V.length; de++) V[de](G);
				return Bt
			}, 2 === Vt[1].length ? {
				import: function(Ot) {
					return j.import(Ot, _)
				},
				meta: j.createContext(_)
			} : void 0);
			return U.e = ee.execute || function() {}, [Vt[0], ee.setters || []]
		});
		const gt = mt.then(function(Vt) {
			return Promise.all(Vt[0].map(function(Xt, ee) {
				const Ot = Vt[1][ee];
				return Promise.resolve(j.resolve(Xt, _)).then(function(Bt) {
					const zt = Tt(j, Bt, _);
					return Promise.resolve(zt.I).then(function() {
						return Ot && (zt.i.push(Ot), (zt.h || !zt.I) && Ot(zt.n)), zt
					})
				})
			})).then(function(Xt) {
				U.d = Xt
			})
		});
		return gt.catch(function(Vt) {
			U.e = null, U.er = Vt
		}), U = j[jt][_] = {
			id: _,
			i: V,
			n: G,
			I: mt,
			L: gt,
			h: !1,
			d: void 0,
			e: void 0,
			er: void 0,
			E: void 0,
			C: void 0
		}
	}

	function Mt(j, _, pt) {
		if (!pt[_.id]) return pt[_.id] = !0, Promise.resolve(_.L).then(function() {
			return Promise.all(_.d.map(function(U) {
				return Mt(j, U, pt)
			}))
		})
	}
	F.prepareImport = function() {}, F.import = function(j, _) {
		const pt = this;
		return Promise.resolve(pt.prepareImport()).then(function() {
			return pt.resolve(j, _)
		}).then(function(U) {
			const V = Tt(pt, U);
			return V.C || function Wt(j, _) {
				return _.C = Mt(j, _, {}).then(function() {
					return at(j, _, {})
				}).then(function() {
					return _.n
				})
			}(pt, V)
		})
	}, F.createContext = function(j) {
		return {
			url: j
		}
	}, F.register = function(j, _) {
		bt = [j, _]
	}, F.getRegister = function() {
		const j = bt;
		return bt = void 0, j
	};
	const wt = Object.freeze(Object.create(null));

	function at(j, _, pt) {
		if (pt[_.id]) return;
		if (pt[_.id] = !0, !_.e) {
			if (_.er) throw _.er;
			return _.E ? _.E : void 0
		}
		let U;
		return _.d.forEach(function(G) {
			{
				const mt = at(j, G, pt);
				mt && (U = U || []).push(mt)
			}
		}), U ? Promise.all(U).then(V) : V();

		function V() {
			try {
				let G = _.e.call(wt);
				if (G) return G = G.then(function() {
					_.C = _.n, _.E = null
				}), _.E = _.E || G;
				_.C = _.n
			} catch (G) {
				throw _.er = G, G
			} finally {
				_.L = _.I = void 0, _.e = null
			}
		}
	}
	Lt.System = new St;
	const X = F.register;
	let Nt, Kt;

	function Rt() {
		Array.prototype.forEach.call(document.querySelectorAll("script[type=systemjs-module]"), function(j) {
			j.src && System.import("import:" === j.src.slice(0, 7) ? j.src.slice(7) : function v(j, _) {
				return nt(j, _) || (-1 !== j.indexOf(":") ? j : nt("./" + j, _))
			}(j.src, rt))
		})
	}
	F.register = function(j, _) {
		X.call(this, j, _)
	}, F.createScript = function(j) {
		const _ = document.createElement("script");
		return _.charset = "utf-8", _.async = !0, _.crossOrigin = "anonymous", _.src = j, _
	}, ot && window.addEventListener("error", function(j) {
		Nt = j.filename, Kt = j.error
	}), F.instantiate = function(j, _) {
		const pt = this;
		return new Promise(function(U, V) {
			const G = F.createScript(j);
			G.addEventListener("error", function() {
				V(Error("Error loading " + j + (_ ? " from " + _ : "")))
			}), G.addEventListener("load", function() {
				document.head.removeChild(G), Nt === j ? V(Kt) : U(pt.getRegister())
			}), document.head.appendChild(G)
		})
	}, ot && (window.addEventListener("DOMContentLoaded", Rt), Rt()), et && "function" == typeof importScripts && (F.instantiate = function(j) {
		const _ = this;
		return new Promise(function(pt, U) {
			try {
				importScripts(j)
			} catch (V) {
				U(V)
			}
			pt(_.getRegister())
		})
	}), F.resolve = function(j, _) {
		const pt = nt(j, _ || rt);
		if (!pt) {
			if (-1 !== j.indexOf(":")) return Promise.resolve(j);
			throw Error('Cannot resolve "' + j + (_ ? '" from ' + _ : '"'))
		}
		return Promise.resolve(pt)
	}
})(),
function(et) {
	const ot = ("undefined" != typeof self ? self : global).System;
	v(ot);
	const Lt = ot.constructor.prototype,
		rt = ot.constructor,
		c = function() {
			rt.call(this), v(this)
		};
	let nt;

	function v(F) {
		F.registerRegistry = Object.create(null)
	}
	c.prototype = Lt, ot.constructor = c;
	const ft = Lt.register;
	Lt.register = function(F, bt, Tt) {
		if ("string" != typeof F) return ft.apply(this, arguments);
		const Mt = [bt, Tt];
		return this.registerRegistry[F] = Mt, nt || (nt = Mt, setTimeout(function() {
			nt = null
		})), ft.apply(this, arguments)
	};
	const ct = Lt.resolve;
	Lt.resolve = function(F, bt) {
		try {
			return ct.call(this, F, bt)
		} catch (Tt) {
			if (F in this.registerRegistry) return F;
			throw Tt
		}
	};
	const jt = Lt.instantiate;
	Lt.instantiate = function(F, bt) {
		return this.registerRegistry[F] || jt.call(this, F, bt)
	};
	const St = Lt.getRegister;
	Lt.getRegister = function() {
		const F = St.call(this),
			bt = nt || F;
		return nt = null, bt
	}
}(),
function(et) {
	const ot = et.System.constructor.prototype,
		Lt = [
			[],
			function() {
				return {}
			}
		];

	function rt() {
		throw Error("AMD require not supported.")
	}
	let c, nt;

	function v() {}
	const ft = ["require", "exports", "module"];

	function ct(at, X) {
		const Nt = {},
			Kt = {
				exports: Nt
			},
			Rt = [],
			j = [];
		let _ = 0;
		for (let U = 0; U < at.length; U++) {
			const V = at[U],
				G = j.length;
			if ("require" === V) Rt[U] = rt, _++;
			else if ("module" === V) Rt[U] = Kt, _++;
			else if ("exports" === V) Rt[U] = Nt, _++;
			else {
				const mt = U;
				j.push(function(gt) {
					Rt[mt] = gt.__useDefault ? gt.default : gt
				})
			}
			_ && (at[G] = V)
		}
		_ && (at.length -= _);
		const pt = X;
		return [at, function(U) {
			return U({
				default: Nt,
				__useDefault: !0
			}), {
				setters: j,
				execute: function() {
					Kt.exports = pt.apply(Nt, Rt) || Kt.exports, Nt !== Kt.exports && U("default", Kt.exports)
				}
			}
		}]
	}
	let jt;
	const St = ot.register;
	ot.register = function(at, X, Nt) {
		jt = "string" == typeof at ? Nt : X, St.apply(this, arguments)
	};
	const F = ot.instantiate;
	ot.instantiate = function() {
		return Tt = null, F.apply(this, arguments)
	};
	const bt = ot.getRegister;
	let Tt, Mt;

	function Wt(at, X) {
		return at instanceof Array ? [at, X] : "object" == typeof at ? [
			[],
			function() {
				return at
			}
		] : "function" == typeof at ? [ft, at] : void 0
	}

	function wt(at, X) {
		nt || (nt = X, setTimeout(function() {
			nt = null
		})), c = X, System.registerRegistry[at] = System.getRegister(), c = null
	}
	ot.getRegister = function() {
		if (c) return c;
		const at = nt;
		nt = null;
		const X = bt.call(this);
		if (X && X[1] === jt) return X;
		const Nt = Tt;
		return Tt = null, at || (Nt ? ct(Nt, Mt) : X || Lt)
	}, et.define = function(at, X, Nt) {
		if ("string" == typeof at) {
			const Rt = Wt(X, Nt);
			if (Tt) {
				if (!System.registerRegistry) throw Error("Include the named register extension for SystemJS named AMD support.");
				return wt(at, ct(Rt[0], Rt[1])), Tt = [], void(Mt = v)
			}
			System.registerRegistry && wt(at, ct([].concat(Rt[0]), Rt[1])), at = X, X = Nt
		}
		const Kt = Wt(at, X);
		Tt = Kt[0], Mt = Kt[1]
	}, et.define.amd = {}
}("undefined" != typeof self ? self : global),
function() {
	"use strict";
	var et = window.Document.prototype.createElement,
		ot = window.Document.prototype.createElementNS,
		Lt = window.Document.prototype.importNode,
		rt = window.Document.prototype.prepend,
		c = window.Document.prototype.append,
		nt = window.DocumentFragment.prototype.prepend,
		v = window.DocumentFragment.prototype.append,
		ft = window.Node.prototype.cloneNode,
		ct = window.Node.prototype.appendChild,
		jt = window.Node.prototype.insertBefore,
		St = window.Node.prototype.removeChild,
		F = window.Node.prototype.replaceChild,
		bt = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
		Tt = window.Element.prototype.attachShadow,
		Mt = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
		Wt = window.Element.prototype.getAttribute,
		wt = window.Element.prototype.setAttribute,
		at = window.Element.prototype.removeAttribute,
		X = window.Element.prototype.toggleAttribute,
		Nt = window.Element.prototype.getAttributeNS,
		Kt = window.Element.prototype.setAttributeNS,
		Rt = window.Element.prototype.removeAttributeNS,
		j = window.Element.prototype.insertAdjacentElement,
		_ = window.Element.prototype.insertAdjacentHTML,
		pt = window.Element.prototype.prepend,
		U = window.Element.prototype.append,
		V = window.Element.prototype.before,
		G = window.Element.prototype.after,
		mt = window.Element.prototype.replaceWith,
		gt = window.Element.prototype.remove,
		Vt = window.HTMLElement,
		Xt = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
		ee = window.HTMLElement.prototype.insertAdjacentElement,
		Ot = window.HTMLElement.prototype.insertAdjacentHTML,
		Bt = new Set;

	function zt(y) {
		var C = Bt.has(y);
		return y = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(y), !C && y
	}
	"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function(y) {
		return Bt.add(y)
	});
	var de = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);

	function yt(y) {
		var C = y.isConnected;
		if (void 0 !== C) return C;
		if (de(y)) return !0;
		for (; y && !(y.__CE_isImportDocument || y instanceof Document);) y = y.parentNode || (window.ShadowRoot && y instanceof ShadowRoot ? y.host : void 0);
		return !(!y || !(y.__CE_isImportDocument || y instanceof Document))
	}

	function Ne(y) {
		var C = y.children;
		if (C) return Array.prototype.slice.call(C);
		for (C = [], y = y.firstChild; y; y = y.nextSibling) y.nodeType === Node.ELEMENT_NODE && C.push(y);
		return C
	}

	function we(y, C) {
		for (; C && C !== y && !C.nextSibling;) C = C.parentNode;
		return C && C !== y ? C.nextSibling : null
	}

	function Ee(y, C, S) {
		for (var L = y; L;) {
			if (L.nodeType === Node.ELEMENT_NODE) {
				var T = L;
				C(T);
				var D = T.localName;
				if ("link" === D && "import" === T.getAttribute("rel")) {
					if (L = T.import, void 0 === S && (S = new Set), L instanceof Node && !S.has(L))
						for (S.add(L), L = L.firstChild; L; L = L.nextSibling) Ee(L, C, S);
					L = we(y, T);
					continue
				}
				if ("template" === D) {
					L = we(y, T);
					continue
				}
				if (T = T.__CE_shadowRoot)
					for (T = T.firstChild; T; T = T.nextSibling) Ee(T, C, S)
			}
			L = L.firstChild ? L.firstChild : we(y, L)
		}
	}

	function Oe() {
		var y = !(null == oe || !oe.noDocumentConstructionObserver),
			C = !(null == oe || !oe.shadyDomFastWalk);
		this.m = [], this.g = [], this.j = !1, this.shadyDomFastWalk = C, this.I = !y
	}

	function ke(y, C, S, L) {
		var T = window.ShadyDOM;
		if (y.shadyDomFastWalk && T && T.inUse) {
			if (C.nodeType === Node.ELEMENT_NODE && S(C), C.querySelectorAll)
				for (y = T.nativeMethods.querySelectorAll.call(C, "*"), C = 0; C < y.length; C++) S(y[C])
		} else Ee(C, S, L)
	}

	function pe(y, C) {
		y.j && ke(y, C, function(S) {
			return Zt(y, S)
		})
	}

	function Zt(y, C) {
		if (y.j && !C.__CE_patched) {
			C.__CE_patched = !0;
			for (var S = 0; S < y.m.length; S++) y.m[S](C);
			for (S = 0; S < y.g.length; S++) y.g[S](C)
		}
	}

	function qt(y, C) {
		var S = [];
		for (ke(y, C, function(T) {
				return S.push(T)
			}), C = 0; C < S.length; C++) {
			var L = S[C];
			1 === L.__CE_state ? y.connectedCallback(L) : me(y, L)
		}
	}

	function te(y, C) {
		var S = [];
		for (ke(y, C, function(T) {
				return S.push(T)
			}), C = 0; C < S.length; C++) {
			var L = S[C];
			1 === L.__CE_state && y.disconnectedCallback(L)
		}
	}

	function Gt(y, C, S) {
		var L = (S = void 0 === S ? {} : S).J,
			T = S.upgrade || function(d) {
				return me(y, d)
			},
			D = [];
		for (ke(y, C, function(d) {
				if (y.j && Zt(y, d), "link" === d.localName && "import" === d.getAttribute("rel")) {
					var h = d.import;
					h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry), h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : d.addEventListener("load", function() {
						var m = d.import;
						if (!m.__CE_documentLoadHandled) {
							m.__CE_documentLoadHandled = !0;
							var A = new Set;
							L && (L.forEach(function($) {
								return A.add($)
							}), A.delete(m)), Gt(y, m, {
								J: A,
								upgrade: T
							})
						}
					})
				} else D.push(d)
			}, L), C = 0; C < D.length; C++) T(D[C])
	}

	function me(y, C) {
		try {
			var S = C.ownerDocument,
				L = S.__CE_registry,
				T = L && (S.defaultView || S.__CE_isImportDocument) ? $e(L, C.localName) : void 0;
			if (T && void 0 === C.__CE_state) {
				T.constructionStack.push(C);
				try {
					try {
						if (new T.constructorFunction !== C) throw Error("The custom element constructor did not produce the element being upgraded.")
					} finally {
						T.constructionStack.pop()
					}
				} catch (m) {
					throw C.__CE_state = 2, m
				}
				if (C.__CE_state = 1, C.__CE_definition = T, T.attributeChangedCallback && C.hasAttributes()) {
					var D = T.observedAttributes;
					for (T = 0; T < D.length; T++) {
						var d = D[T],
							h = C.getAttribute(d);
						null !== h && y.attributeChangedCallback(C, d, null, h, null)
					}
				}
				yt(C) && y.connectedCallback(C)
			}
		} catch (m) {
			ce(m)
		}
	}

	function Yt(y, C, S, L) {
		var T = C.__CE_registry;
		if (T && (null === L || "http://www.w3.org/1999/xhtml" === L) && (T = $e(T, S))) try {
			var D = new T.constructorFunction;
			if (void 0 === D.__CE_state || void 0 === D.__CE_definition) throw Error("Failed to construct '" + S + "': The returned value was not constructed with the HTMLElement constructor.");
			if ("http://www.w3.org/1999/xhtml" !== D.namespaceURI) throw Error("Failed to construct '" + S + "': The constructed element's namespace must be the HTML namespace.");
			if (D.hasAttributes()) throw Error("Failed to construct '" + S + "': The constructed element must not have any attributes.");
			if (null !== D.firstChild) throw Error("Failed to construct '" + S + "': The constructed element must not have any children.");
			if (null !== D.parentNode) throw Error("Failed to construct '" + S + "': The constructed element must not have a parent node.");
			if (D.ownerDocument !== C) throw Error("Failed to construct '" + S + "': The constructed element's owner document is incorrect.");
			if (D.localName !== S) throw Error("Failed to construct '" + S + "': The constructed element's local name is incorrect.");
			return D
		} catch (d) {
			return ce(d), C = null === L ? et.call(C, S) : ot.call(C, L, S), Object.setPrototypeOf(C, HTMLUnknownElement.prototype), C.__CE_state = 2, C.__CE_definition = void 0, Zt(y, C), C
		}
		return Zt(y, C = null === L ? et.call(C, S) : ot.call(C, L, S)), C
	}

	function ce(y) {
		var C = "",
			S = "",
			L = 0,
			T = 0;
		y instanceof Error ? (C = y.message, S = y.sourceURL || y.fileName || "", L = y.line || y.lineNumber || 0, T = y.column || y.columnNumber || 0) : C = "Uncaught " + String(y);
		var D = void 0;
		void 0 === ErrorEvent.prototype.initErrorEvent ? D = new ErrorEvent("error", {
			cancelable: !0,
			message: C,
			filename: S,
			lineno: L,
			colno: T,
			error: y
		}) : ((D = document.createEvent("ErrorEvent")).initErrorEvent("error", !1, !0, C, S, L), D.preventDefault = function() {
			Object.defineProperty(this, "defaultPrevented", {
				configurable: !0,
				get: function() {
					return !0
				}
			})
		}), void 0 === D.error && Object.defineProperty(D, "error", {
			configurable: !0,
			enumerable: !0,
			get: function() {
				return y
			}
		}), window.dispatchEvent(D), D.defaultPrevented || console.error(y)
	}

	function Ae() {
		var y = this;
		this.g = void 0, this.F = new Promise(function(C) {
			y.l = C
		})
	}

	function Fe(y) {
		var C = document;
		this.l = void 0, this.h = y, this.g = C, Gt(this.h, this.g), "loading" === this.g.readyState && (this.l = new MutationObserver(this.G.bind(this)), this.l.observe(this.g, {
			childList: !0,
			subtree: !0
		}))
	}

	function Ie(y) {
		y.l && y.l.disconnect()
	}

	function _t(y) {
		this.s = new Map, this.u = new Map, this.C = new Map, this.A = !1, this.B = new Map, this.o = function(C) {
			return C()
		}, this.i = !1, this.v = [], this.h = y, this.D = y.I ? new Fe(y) : void 0
	}

	function ge(y, C) {
		if (!zt(C)) throw new SyntaxError("The element name '" + C + "' is not valid.");
		if ($e(y, C)) throw Error("A custom element with name '" + C + "' has already been defined.");
		if (y.A) throw Error("A custom element is already being defined.")
	}

	function De(y, C, S) {
		var L;
		y.A = !0;
		try {
			var T = S.prototype;
			if (!(T instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");
			var D = function($) {
					var O = T[$];
					if (void 0 !== O && !(O instanceof Function)) throw Error("The '" + $ + "' callback must be a function.");
					return O
				},
				d = D("connectedCallback"),
				h = D("disconnectedCallback"),
				m = D("adoptedCallback"),
				A = (L = D("attributeChangedCallback")) && S.observedAttributes || []
		} catch ($) {
			throw $
		} finally {
			y.A = !1
		}
		return y.u.set(C, S = {
			localName: C,
			constructorFunction: S,
			connectedCallback: d,
			disconnectedCallback: h,
			adoptedCallback: m,
			attributeChangedCallback: L,
			observedAttributes: A,
			constructionStack: []
		}), y.C.set(S.constructorFunction, S), S
	}

	function je(y) {
		if (!1 !== y.i) {
			y.i = !1;
			for (var C = [], S = y.v, L = new Map, T = 0; T < S.length; T++) L.set(S[T], []);
			for (Gt(y.h, document, {
					upgrade: function(m) {
						if (void 0 === m.__CE_state) {
							var A = m.localName,
								$ = L.get(A);
							$ ? $.push(m) : y.u.has(A) && C.push(m)
						}
					}
				}), T = 0; T < C.length; T++) me(y.h, C[T]);
			for (T = 0; T < S.length; T++) {
				for (var D = S[T], d = L.get(D), h = 0; h < d.length; h++) me(y.h, d[h]);
				(D = y.B.get(D)) && D.resolve(void 0)
			}
			S.length = 0
		}
	}

	function $e(y, C) {
		var S = y.u.get(C);
		if (S) return S;
		if (S = y.s.get(C)) {
			y.s.delete(C);
			try {
				return De(y, C, S())
			} catch (L) {
				ce(L)
			}
		}
	}

	function fe(y, C, S) {
		function L(T) {
			return function(D) {
				for (var d = [], h = 0; h < arguments.length; ++h) d[h] = arguments[h];
				h = [];
				for (var m = [], A = 0; A < d.length; A++) {
					var $ = d[A];
					if ($ instanceof Element && yt($) && m.push($), $ instanceof DocumentFragment)
						for ($ = $.firstChild; $; $ = $.nextSibling) h.push($);
					else h.push($)
				}
				for (T.apply(this, d), d = 0; d < m.length; d++) te(y, m[d]);
				if (yt(this))
					for (d = 0; d < h.length; d++)(m = h[d]) instanceof Element && qt(y, m)
			}
		}
		void 0 !== S.prepend && (C.prepend = L(S.prepend)), void 0 !== S.append && (C.append = L(S.append))
	}
	Oe.prototype.connectedCallback = function(y) {
		var C = y.__CE_definition;
		if (C.connectedCallback) try {
			C.connectedCallback.call(y)
		} catch (S) {
			ce(S)
		}
	}, Oe.prototype.disconnectedCallback = function(y) {
		var C = y.__CE_definition;
		if (C.disconnectedCallback) try {
			C.disconnectedCallback.call(y)
		} catch (S) {
			ce(S)
		}
	}, Oe.prototype.attributeChangedCallback = function(y, C, S, L, T) {
		var D = y.__CE_definition;
		if (D.attributeChangedCallback && -1 < D.observedAttributes.indexOf(C)) try {
			D.attributeChangedCallback.call(y, C, S, L, T)
		} catch (d) {
			ce(d)
		}
	}, Ae.prototype.resolve = function(y) {
		if (this.g) throw Error("Already resolved.");
		this.g = y, this.l(y)
	}, Fe.prototype.G = function(y) {
		var C = this.g.readyState;
		for ("interactive" !== C && "complete" !== C || Ie(this), C = 0; C < y.length; C++)
			for (var S = y[C].addedNodes, L = 0; L < S.length; L++) Gt(this.h, S[L])
	}, _t.prototype.H = function(y, C) {
		var S = this;
		if (!(C instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");
		ge(this, y), this.s.set(y, C), this.v.push(y), this.i || (this.i = !0, this.o(function() {
			return je(S)
		}))
	}, _t.prototype.define = function(y, C) {
		var S = this;
		if (!(C instanceof Function)) throw new TypeError("Custom element constructors must be functions.");
		ge(this, y), De(this, y, C), this.v.push(y), this.i || (this.i = !0, this.o(function() {
			return je(S)
		}))
	}, _t.prototype.upgrade = function(y) {
		Gt(this.h, y)
	}, _t.prototype.get = function(y) {
		if (y = $e(this, y)) return y.constructorFunction
	}, _t.prototype.whenDefined = function(y) {
		if (!zt(y)) return Promise.reject(new SyntaxError("'" + y + "' is not a valid custom element name."));
		var C = this.B.get(y);
		if (C) return C.F;
		C = new Ae, this.B.set(y, C);
		var S = this.u.has(y) || this.s.has(y);
		return y = -1 === this.v.indexOf(y), S && y && C.resolve(void 0), C.F
	}, _t.prototype.polyfillWrapFlushCallback = function(y) {
		this.D && Ie(this.D);
		var C = this.o;
		this.o = function(S) {
			return y(function() {
				return C(S)
			})
		}
	}, _t.prototype.define = _t.prototype.define, _t.prototype.upgrade = _t.prototype.upgrade, _t.prototype.get = _t.prototype.get, _t.prototype.whenDefined = _t.prototype.whenDefined, _t.prototype.polyfillDefineLazy = _t.prototype.H, _t.prototype.polyfillWrapFlushCallback = _t.prototype.polyfillWrapFlushCallback;
	var Se = {},
		oe = window.customElements;

	function p() {
		var y = new Oe;
		(function Ce(y) {
			function C() {
				var S = this.constructor,
					L = document.__CE_registry.C.get(S);
				if (!L) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");
				var T = L.constructionStack;
				if (0 === T.length) return T = et.call(document, L.localName), Object.setPrototypeOf(T, S.prototype), T.__CE_state = 1, T.__CE_definition = L, Zt(y, T), T;
				var D = T.length - 1,
					d = T[D];
				if (d === Se) throw Error("Failed to construct '" + L.localName + "': This element was already constructed.");
				return T[D] = Se, Object.setPrototypeOf(d, S.prototype), Zt(y, d), d
			}
			C.prototype = Vt.prototype, Object.defineProperty(HTMLElement.prototype, "constructor", {
				writable: !0,
				configurable: !0,
				enumerable: !1,
				value: C
			}), window.HTMLElement = C
		})(y),
		function xe(y) {
			Document.prototype.createElement = function(C) {
				return Yt(y, this, C, null)
			}, Document.prototype.importNode = function(C, S) {
				return C = Lt.call(this, C, !!S), this.__CE_registry ? Gt(y, C) : pe(y, C), C
			}, Document.prototype.createElementNS = function(C, S) {
				return Yt(y, this, S, C)
			}, fe(y, Document.prototype, {
				prepend: rt,
				append: c
			})
		}(y), fe(y, DocumentFragment.prototype, {
				prepend: nt,
				append: v
			}),
			function Pe(y) {
				function C(S, L) {
					Object.defineProperty(S, "textContent", {
						enumerable: L.enumerable,
						configurable: !0,
						get: L.get,
						set: function(T) {
							if (this.nodeType === Node.TEXT_NODE) L.set.call(this, T);
							else {
								var D = void 0;
								if (this.firstChild) {
									var d = this.childNodes,
										h = d.length;
									if (0 < h && yt(this)) {
										D = Array(h);
										for (var m = 0; m < h; m++) D[m] = d[m]
									}
								}
								if (L.set.call(this, T), D)
									for (T = 0; T < D.length; T++) te(y, D[T])
							}
						}
					})
				}
				Node.prototype.insertBefore = function(S, L) {
					if (S instanceof DocumentFragment) {
						var T = Ne(S);
						if (S = jt.call(this, S, L), yt(this))
							for (L = 0; L < T.length; L++) qt(y, T[L]);
						return S
					}
					return T = S instanceof Element && yt(S), L = jt.call(this, S, L), T && te(y, S), yt(this) && qt(y, S), L
				}, Node.prototype.appendChild = function(S) {
					if (S instanceof DocumentFragment) {
						var L = Ne(S);
						if (S = ct.call(this, S), yt(this))
							for (var T = 0; T < L.length; T++) qt(y, L[T]);
						return S
					}
					return L = S instanceof Element && yt(S), T = ct.call(this, S), L && te(y, S), yt(this) && qt(y, S), T
				}, Node.prototype.cloneNode = function(S) {
					return S = ft.call(this, !!S), this.ownerDocument.__CE_registry ? Gt(y, S) : pe(y, S), S
				}, Node.prototype.removeChild = function(S) {
					var L = S instanceof Element && yt(S),
						T = St.call(this, S);
					return L && te(y, S), T
				}, Node.prototype.replaceChild = function(S, L) {
					if (S instanceof DocumentFragment) {
						var T = Ne(S);
						if (S = F.call(this, S, L), yt(this))
							for (te(y, L), L = 0; L < T.length; L++) qt(y, T[L]);
						return S
					}
					T = S instanceof Element && yt(S);
					var D = F.call(this, S, L),
						d = yt(this);
					return d && te(y, L), T && te(y, S), d && qt(y, S), D
				}, bt && bt.get ? C(Node.prototype, bt) : function Ft(y, C) {
					y.j = !0, y.m.push(C)
				}(y, function(S) {
					C(S, {
						enumerable: !0,
						configurable: !0,
						get: function() {
							for (var L = [], T = this.firstChild; T; T = T.nextSibling) T.nodeType !== Node.COMMENT_NODE && L.push(T.textContent);
							return L.join("")
						},
						set: function(L) {
							for (; this.firstChild;) St.call(this, this.firstChild);
							null != L && "" !== L && ct.call(this, document.createTextNode(L))
						}
					})
				})
			}(y),
			function ze(y) {
				function C(T, D) {
					Object.defineProperty(T, "innerHTML", {
						enumerable: D.enumerable,
						configurable: !0,
						get: D.get,
						set: function(d) {
							var h = this,
								m = void 0;
							if (yt(this) && (m = [], ke(y, this, function(O) {
									O !== h && m.push(O)
								})), D.set.call(this, d), m)
								for (var A = 0; A < m.length; A++) {
									var $ = m[A];
									1 === $.__CE_state && y.disconnectedCallback($)
								}
							return this.ownerDocument.__CE_registry ? Gt(y, this) : pe(y, this), d
						}
					})
				}

				function S(T, D) {
					T.insertAdjacentElement = function(d, h) {
						var m = yt(h);
						return d = D.call(this, d, h), m && te(y, h), yt(d) && qt(y, h), d
					}
				}

				function L(T, D) {
					function d(h, m) {
						for (var A = []; h !== m; h = h.nextSibling) A.push(h);
						for (m = 0; m < A.length; m++) Gt(y, A[m])
					}
					T.insertAdjacentHTML = function(h, m) {
						if ("beforebegin" === (h = h.toLowerCase())) {
							var A = this.previousSibling;
							D.call(this, h, m), d(A || this.parentNode.firstChild, this)
						} else if ("afterbegin" === h) A = this.firstChild, D.call(this, h, m), d(this.firstChild, A);
						else if ("beforeend" === h) A = this.lastChild, D.call(this, h, m), d(A || this.firstChild, null);
						else {
							if ("afterend" !== h) throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
							A = this.nextSibling, D.call(this, h, m), d(this.nextSibling, A)
						}
					}
				}
				Tt && (Element.prototype.attachShadow = function(T) {
						if (T = Tt.call(this, T), y.j && !T.__CE_patched) {
							T.__CE_patched = !0;
							for (var D = 0; D < y.m.length; D++) y.m[D](T)
						}
						return this.__CE_shadowRoot = T
					}), Mt && Mt.get ? C(Element.prototype, Mt) : Xt && Xt.get ? C(HTMLElement.prototype, Xt) : function Jt(y, C) {
						y.j = !0, y.g.push(C)
					}(y, function(T) {
						C(T, {
							enumerable: !0,
							configurable: !0,
							get: function() {
								return ft.call(this, !0).innerHTML
							},
							set: function(D) {
								var d = "template" === this.localName,
									h = d ? this.content : this,
									m = ot.call(document, this.namespaceURI, this.localName);
								for (m.innerHTML = D; 0 < h.childNodes.length;) St.call(h, h.childNodes[0]);
								for (D = d ? m.content : m; 0 < D.childNodes.length;) ct.call(h, D.childNodes[0])
							}
						})
					}), Element.prototype.setAttribute = function(T, D) {
						if (1 !== this.__CE_state) return wt.call(this, T, D);
						var d = Wt.call(this, T);
						wt.call(this, T, D), D = Wt.call(this, T), y.attributeChangedCallback(this, T, d, D, null)
					}, Element.prototype.setAttributeNS = function(T, D, d) {
						if (1 !== this.__CE_state) return Kt.call(this, T, D, d);
						var h = Nt.call(this, T, D);
						Kt.call(this, T, D, d), d = Nt.call(this, T, D), y.attributeChangedCallback(this, D, h, d, T)
					}, Element.prototype.removeAttribute = function(T) {
						if (1 !== this.__CE_state) return at.call(this, T);
						var D = Wt.call(this, T);
						at.call(this, T), null !== D && y.attributeChangedCallback(this, T, D, null, null)
					}, X && (Element.prototype.toggleAttribute = function(T, D) {
						if (1 !== this.__CE_state) return X.call(this, T, D);
						var d = Wt.call(this, T);
						return null !== d !== (D = X.call(this, T, D)) && y.attributeChangedCallback(this, T, d, D ? "" : null, null), D
					}), Element.prototype.removeAttributeNS = function(T, D) {
						if (1 !== this.__CE_state) return Rt.call(this, T, D);
						var d = Nt.call(this, T, D);
						Rt.call(this, T, D);
						var h = Nt.call(this, T, D);
						d !== h && y.attributeChangedCallback(this, D, d, h, T)
					}, ee ? S(HTMLElement.prototype, ee) : j && S(Element.prototype, j), Ot ? L(HTMLElement.prototype, Ot) : _ && L(Element.prototype, _), fe(y, Element.prototype, {
						prepend: pt,
						append: U
					}),
					function Ke(y) {
						function C(L) {
							return function(T) {
								for (var D = [], d = 0; d < arguments.length; ++d) D[d] = arguments[d];
								d = [];
								for (var h = [], m = 0; m < D.length; m++) {
									var A = D[m];
									if (A instanceof Element && yt(A) && h.push(A), A instanceof DocumentFragment)
										for (A = A.firstChild; A; A = A.nextSibling) d.push(A);
									else d.push(A)
								}
								for (L.apply(this, D), D = 0; D < h.length; D++) te(y, h[D]);
								if (yt(this))
									for (D = 0; D < d.length; D++)(h = d[D]) instanceof Element && qt(y, h)
							}
						}
						var S = Element.prototype;
						void 0 !== V && (S.before = C(V)), void 0 !== G && (S.after = C(G)), void 0 !== mt && (S.replaceWith = function(L) {
							for (var T = [], D = 0; D < arguments.length; ++D) T[D] = arguments[D];
							D = [];
							for (var d = [], h = 0; h < T.length; h++) {
								var m = T[h];
								if (m instanceof Element && yt(m) && d.push(m), m instanceof DocumentFragment)
									for (m = m.firstChild; m; m = m.nextSibling) D.push(m);
								else D.push(m)
							}
							for (h = yt(this), mt.apply(this, T), T = 0; T < d.length; T++) te(y, d[T]);
							if (h)
								for (te(y, this), T = 0; T < D.length; T++)(d = D[T]) instanceof Element && qt(y, d)
						}), void 0 !== gt && (S.remove = function() {
							var L = yt(this);
							gt.call(this), L && te(y, this)
						})
					}(y)
			}(y), window.CustomElementRegistry = _t, y = new _t(y), document.__CE_registry = y, Object.defineProperty(window, "customElements", {
				configurable: !0,
				enumerable: !0,
				value: y
			})
	}
	oe && !oe.forcePolyfill && "function" == typeof oe.define && "function" == typeof oe.get || p(), window.__CE_installPolyfill = p
}.call(self),
	function(et, ot) {
		"object" == typeof exports && "undefined" != typeof module ? ot(exports) : "function" == typeof define && define.amd ? define(["exports"], ot) : ot((et = "undefined" != typeof globalThis ? globalThis : et || self).Popper = {})
	}(this, function(et) {
		"use strict";

		function ot(d) {
			if (null == d) return window;
			if ("[object Window]" !== d.toString()) {
				var h = d.ownerDocument;
				return h && h.defaultView || window
			}
			return d
		}

		function Lt(d) {
			return d instanceof ot(d).Element || d instanceof Element
		}

		function rt(d) {
			return d instanceof ot(d).HTMLElement || d instanceof HTMLElement
		}

		function c(d) {
			return "undefined" != typeof ShadowRoot && (d instanceof ot(d).ShadowRoot || d instanceof ShadowRoot)
		}
		var nt = Math.max,
			v = Math.min,
			ft = Math.round;

		function ct() {
			var d = navigator.userAgentData;
			return null != d && d.brands && Array.isArray(d.brands) ? d.brands.map(function(h) {
				return h.brand + "/" + h.version
			}).join(" ") : navigator.userAgent
		}

		function jt() {
			return !/^((?!chrome|android).)*safari/i.test(ct())
		}

		function St(d, h, m) {
			void 0 === h && (h = !1), void 0 === m && (m = !1);
			var A = d.getBoundingClientRect(),
				$ = 1,
				O = 1;
			h && rt(d) && ($ = d.offsetWidth > 0 && ft(A.width) / d.offsetWidth || 1, O = d.offsetHeight > 0 && ft(A.height) / d.offsetHeight || 1);
			var W = (Lt(d) ? ot(d) : window).visualViewport,
				M = !jt() && m,
				z = (A.left + (M && W ? W.offsetLeft : 0)) / $,
				tt = (A.top + (M && W ? W.offsetTop : 0)) / O,
				J = A.width / $,
				Q = A.height / O;
			return {
				width: J,
				height: Q,
				top: tt,
				right: z + J,
				bottom: tt + Q,
				left: z,
				x: z,
				y: tt
			}
		}

		function F(d) {
			var h = ot(d);
			return {
				scrollLeft: h.pageXOffset,
				scrollTop: h.pageYOffset
			}
		}

		function bt(d) {
			return d ? (d.nodeName || "").toLowerCase() : null
		}

		function Tt(d) {
			return ((Lt(d) ? d.ownerDocument : d.document) || window.document).documentElement
		}

		function Mt(d) {
			return St(Tt(d)).left + F(d).scrollLeft
		}

		function Wt(d) {
			return ot(d).getComputedStyle(d)
		}

		function wt(d) {
			var h = Wt(d);
			return /auto|scroll|overlay|hidden/.test(h.overflow + h.overflowY + h.overflowX)
		}

		function at(d, h, m) {
			void 0 === m && (m = !1);
			var A, $, Q, Z, st, ut, O = rt(h),
				W = rt(h) && (Z = (Q = h).getBoundingClientRect(), st = ft(Z.width) / Q.offsetWidth || 1, ut = ft(Z.height) / Q.offsetHeight || 1, 1 !== st || 1 !== ut),
				M = Tt(h),
				z = St(d, W, m),
				tt = {
					scrollLeft: 0,
					scrollTop: 0
				},
				J = {
					x: 0,
					y: 0
				};
			return (O || !O && !m) && (("body" !== bt(h) || wt(M)) && (tt = (A = h) !== ot(A) && rt(A) ? {
				scrollLeft: ($ = A).scrollLeft,
				scrollTop: $.scrollTop
			} : F(A)), rt(h) ? ((J = St(h, !0)).x += h.clientLeft, J.y += h.clientTop) : M && (J.x = Mt(M))), {
				x: z.left + tt.scrollLeft - J.x,
				y: z.top + tt.scrollTop - J.y,
				width: z.width,
				height: z.height
			}
		}

		function X(d) {
			var h = St(d),
				m = d.offsetWidth,
				A = d.offsetHeight;
			return Math.abs(h.width - m) <= 1 && (m = h.width), Math.abs(h.height - A) <= 1 && (A = h.height), {
				x: d.offsetLeft,
				y: d.offsetTop,
				width: m,
				height: A
			}
		}

		function Nt(d) {
			return "html" === bt(d) ? d : d.assignedSlot || d.parentNode || (c(d) ? d.host : null) || Tt(d)
		}

		function Kt(d) {
			return ["html", "body", "#document"].indexOf(bt(d)) >= 0 ? d.ownerDocument.body : rt(d) && wt(d) ? d : Kt(Nt(d))
		}

		function Rt(d, h) {
			var m;
			void 0 === h && (h = []);
			var A = Kt(d),
				$ = A === (null == (m = d.ownerDocument) ? void 0 : m.body),
				O = ot(A),
				W = $ ? [O].concat(O.visualViewport || [], wt(A) ? A : []) : A,
				M = h.concat(W);
			return $ ? M : M.concat(Rt(Nt(W)))
		}

		function j(d) {
			return ["table", "td", "th"].indexOf(bt(d)) >= 0
		}

		function _(d) {
			return rt(d) && "fixed" !== Wt(d).position ? d.offsetParent : null
		}

		function pt(d) {
			for (var h = ot(d), m = _(d); m && j(m) && "static" === Wt(m).position;) m = _(m);
			return m && ("html" === bt(m) || "body" === bt(m) && "static" === Wt(m).position) ? h : m || function(A) {
				var $ = /firefox/i.test(ct());
				if (/Trident/i.test(ct()) && rt(A) && "fixed" === Wt(A).position) return null;
				var O = Nt(A);
				for (c(O) && (O = O.host); rt(O) && ["html", "body"].indexOf(bt(O)) < 0;) {
					var W = Wt(O);
					if ("none" !== W.transform || "none" !== W.perspective || "paint" === W.contain || -1 !== ["transform", "perspective"].indexOf(W.willChange) || $ && "filter" === W.willChange || $ && W.filter && "none" !== W.filter) return O;
					O = O.parentNode
				}
				return null
			}(d) || h
		}
		var U = "top",
			V = "bottom",
			G = "right",
			mt = "left",
			gt = "auto",
			Vt = [U, V, G, mt],
			Xt = "start",
			ee = "end",
			Ot = "viewport",
			Bt = "popper",
			zt = Vt.reduce(function(d, h) {
				return d.concat([h + "-" + Xt, h + "-" + ee])
			}, []),
			de = [].concat(Vt, [gt]).reduce(function(d, h) {
				return d.concat([h, h + "-" + Xt, h + "-" + ee])
			}, []),
			yt = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

		function Ne(d) {
			var h = new Map,
				m = new Set,
				A = [];

			function $(O) {
				m.add(O.name), [].concat(O.requires || [], O.requiresIfExists || []).forEach(function(W) {
					if (!m.has(W)) {
						var M = h.get(W);
						M && $(M)
					}
				}), A.push(O)
			}
			return d.forEach(function(O) {
				h.set(O.name, O)
			}), d.forEach(function(O) {
				m.has(O.name) || $(O)
			}), A
		}

		function we(d, h) {
			var m = h.getRootNode && h.getRootNode();
			if (d.contains(h)) return !0;
			if (m && c(m)) {
				var A = h;
				do {
					if (A && d.isSameNode(A)) return !0;
					A = A.parentNode || A.host
				} while (A)
			}
			return !1
		}

		function Ee(d) {
			return Object.assign({}, d, {
				left: d.x,
				top: d.y,
				right: d.x + d.width,
				bottom: d.y + d.height
			})
		}

		function Oe(d, h, m) {
			return h === Ot ? Ee(function(A, $) {
				var O = ot(A),
					W = Tt(A),
					M = O.visualViewport,
					z = W.clientWidth,
					tt = W.clientHeight,
					J = 0,
					Q = 0;
				if (M) {
					z = M.width, tt = M.height;
					var Z = jt();
					(Z || !Z && "fixed" === $) && (J = M.offsetLeft, Q = M.offsetTop)
				}
				return {
					width: z,
					height: tt,
					x: J + Mt(A),
					y: Q
				}
			}(d, m)) : Lt(h) ? ((O = St(A = h, !1, "fixed" === m)).top = O.top + A.clientTop, O.left = O.left + A.clientLeft, O.bottom = O.top + A.clientHeight, O.right = O.left + A.clientWidth, O.width = A.clientWidth, O.height = A.clientHeight, O.x = O.left, O.y = O.top, O) : Ee(function(A) {
				var $, O = Tt(A),
					W = F(A),
					M = null == ($ = A.ownerDocument) ? void 0 : $.body,
					z = nt(O.scrollWidth, O.clientWidth, M ? M.scrollWidth : 0, M ? M.clientWidth : 0),
					tt = nt(O.scrollHeight, O.clientHeight, M ? M.scrollHeight : 0, M ? M.clientHeight : 0),
					J = -W.scrollLeft + Mt(A),
					Q = -W.scrollTop;
				return "rtl" === Wt(M || O).direction && (J += nt(O.clientWidth, M ? M.clientWidth : 0) - z), {
					width: z,
					height: tt,
					x: J,
					y: Q
				}
			}(Tt(d)));
			var A, O
		}

		function Ft(d) {
			return d.split("-")[0]
		}

		function Jt(d) {
			return d.split("-")[1]
		}

		function pe(d) {
			return ["top", "bottom"].indexOf(d) >= 0 ? "x" : "y"
		}

		function Zt(d) {
			var h, m = d.reference,
				A = d.element,
				$ = d.placement,
				O = $ ? Ft($) : null,
				W = $ ? Jt($) : null,
				M = m.x + m.width / 2 - A.width / 2,
				z = m.y + m.height / 2 - A.height / 2;
			switch (O) {
				case U:
					h = {
						x: M,
						y: m.y - A.height
					};
					break;
				case V:
					h = {
						x: M,
						y: m.y + m.height
					};
					break;
				case G:
					h = {
						x: m.x + m.width,
						y: z
					};
					break;
				case mt:
					h = {
						x: m.x - A.width,
						y: z
					};
					break;
				default:
					h = {
						x: m.x,
						y: m.y
					}
			}
			var tt = O ? pe(O) : null;
			if (null != tt) {
				var J = "y" === tt ? "height" : "width";
				switch (W) {
					case Xt:
						h[tt] = h[tt] - (m[J] / 2 - A[J] / 2);
						break;
					case ee:
						h[tt] = h[tt] + (m[J] / 2 - A[J] / 2)
				}
			}
			return h
		}

		function qt(d) {
			return Object.assign({}, {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}, d)
		}

		function te(d, h) {
			return h.reduce(function(m, A) {
				return m[A] = d, m
			}, {})
		}

		function Gt(d, h) {
			void 0 === h && (h = {});
			var A = h.placement,
				$ = void 0 === A ? d.placement : A,
				O = h.strategy,
				W = void 0 === O ? d.strategy : O,
				M = h.boundary,
				z = void 0 === M ? "clippingParents" : M,
				tt = h.rootBoundary,
				J = void 0 === tt ? Ot : tt,
				Q = h.elementContext,
				Z = void 0 === Q ? Bt : Q,
				st = h.altBoundary,
				ut = void 0 !== st && st,
				vt = h.padding,
				lt = void 0 === vt ? 0 : vt,
				Ht = qt("number" != typeof lt ? lt : te(lt, Vt)),
				Et = d.rects.popper,
				At = d.elements[ut ? Z === Bt ? "reference" : Bt : Z],
				dt = function ke(d, h, m, A) {
					var z, tt, J, $ = "clippingParents" === h ? (tt = Rt(Nt(z = d)), Lt(J = ["absolute", "fixed"].indexOf(Wt(z).position) >= 0 && rt(z) ? pt(z) : z) ? tt.filter(function(Q) {
							return Lt(Q) && we(Q, J) && "body" !== bt(Q)
						}) : []) : [].concat(h),
						O = [].concat($, [m]),
						M = O.reduce(function(z, tt) {
							var J = Oe(d, tt, A);
							return z.top = nt(J.top, z.top), z.right = v(J.right, z.right), z.bottom = v(J.bottom, z.bottom), z.left = nt(J.left, z.left), z
						}, Oe(d, O[0], A));
					return M.width = M.right - M.left, M.height = M.bottom - M.top, M.x = M.left, M.y = M.top, M
				}(Lt(At) ? At : At.contextElement || Tt(d.elements.popper), z, J, W),
				it = St(d.elements.reference),
				kt = Zt({
					reference: it,
					element: Et,
					strategy: "absolute",
					placement: $
				}),
				It = Ee(Object.assign({}, Et, kt)),
				Dt = Z === Bt ? It : it,
				Ut = {
					top: dt.top - Dt.top + Ht.top,
					bottom: Dt.bottom - dt.bottom + Ht.bottom,
					left: dt.left - Dt.left + Ht.left,
					right: Dt.right - dt.right + Ht.right
				},
				ie = d.modifiersData.offset;
			if (Z === Bt && ie) {
				var ve = ie[$];
				Object.keys(Ut).forEach(function(ue) {
					var ne = [G, V].indexOf(ue) >= 0 ? 1 : -1,
						be = [U, V].indexOf(ue) >= 0 ? "y" : "x";
					Ut[ue] += ve[be] * ne
				})
			}
			return Ut
		}
		var me = {
			placement: "bottom",
			modifiers: [],
			strategy: "absolute"
		};

		function Yt() {
			for (var d = arguments.length, h = new Array(d), m = 0; m < d; m++) h[m] = arguments[m];
			return !h.some(function(A) {
				return !(A && "function" == typeof A.getBoundingClientRect)
			})
		}

		function ce(d) {
			void 0 === d && (d = {});
			var m = d.defaultModifiers,
				A = void 0 === m ? [] : m,
				$ = d.defaultOptions,
				O = void 0 === $ ? me : $;
			return function(W, M, z) {
				void 0 === z && (z = O);
				var tt, J, Q = {
						placement: "bottom",
						orderedModifiers: [],
						options: Object.assign({}, me, O),
						modifiersData: {},
						elements: {
							reference: W,
							popper: M
						},
						attributes: {},
						styles: {}
					},
					Z = [],
					st = !1,
					ut = {
						state: Q,
						setOptions: function(lt) {
							var Ht = "function" == typeof lt ? lt(Q.options) : lt;
							vt(), Q.options = Object.assign({}, O, Q.options, Ht), Q.scrollParents = {
								reference: Lt(W) ? Rt(W) : W.contextElement ? Rt(W.contextElement) : [],
								popper: Rt(M)
							};
							var $t, Et, dt, it, At = ($t = [].concat(A, Q.options.modifiers), Et = $t.reduce(function(dt, it) {
								var kt = dt[it.name];
								return dt[it.name] = kt ? Object.assign({}, kt, it, {
									options: Object.assign({}, kt.options, it.options),
									data: Object.assign({}, kt.data, it.data)
								}) : it, dt
							}, {}), dt = Object.keys(Et).map(function(dt) {
								return Et[dt]
							}), it = Ne(dt), yt.reduce(function(kt, It) {
								return kt.concat(it.filter(function(Dt) {
									return Dt.phase === It
								}))
							}, []));
							return Q.orderedModifiers = At.filter(function(dt) {
								return dt.enabled
							}), Q.orderedModifiers.forEach(function(dt) {
								var kt = dt.options,
									Dt = dt.effect;
								if ("function" == typeof Dt) {
									var Ut = Dt({
										state: Q,
										name: dt.name,
										instance: ut,
										options: void 0 === kt ? {} : kt
									});
									Z.push(Ut || function() {})
								}
							}), ut.update()
						},
						forceUpdate: function() {
							if (!st) {
								var lt = Q.elements,
									Ht = lt.reference,
									$t = lt.popper;
								if (Yt(Ht, $t)) {
									Q.rects = {
										reference: at(Ht, pt($t), "fixed" === Q.options.strategy),
										popper: X($t)
									}, Q.reset = !1, Q.placement = Q.options.placement, Q.orderedModifiers.forEach(function(Dt) {
										return Q.modifiersData[Dt.name] = Object.assign({}, Dt.data)
									});
									for (var Et = 0; Et < Q.orderedModifiers.length; Et++)
										if (!0 !== Q.reset) {
											var At = Q.orderedModifiers[Et],
												dt = At.fn,
												it = At.options;
											"function" == typeof dt && (Q = dt({
												state: Q,
												options: void 0 === it ? {} : it,
												name: At.name,
												instance: ut
											}) || Q)
										} else Q.reset = !1, Et = -1
								}
							}
						},
						update: (tt = function() {
							return new Promise(function(lt) {
								ut.forceUpdate(), lt(Q)
							})
						}, function() {
							return J || (J = new Promise(function(lt) {
								Promise.resolve().then(function() {
									J = void 0, lt(tt())
								})
							})), J
						}),
						destroy: function() {
							vt(), st = !0
						}
					};
				if (!Yt(W, M)) return ut;

				function vt() {
					Z.forEach(function(lt) {
						return lt()
					}), Z = []
				}
				return ut.setOptions(z).then(function(lt) {
					!st && z.onFirstUpdate && z.onFirstUpdate(lt)
				}), ut
			}
		}
		var Ae = {
				passive: !0
			},
			Fe = {
				name: "eventListeners",
				enabled: !0,
				phase: "write",
				fn: function() {},
				effect: function(d) {
					var h = d.state,
						m = d.instance,
						A = d.options,
						$ = A.scroll,
						O = void 0 === $ || $,
						W = A.resize,
						M = void 0 === W || W,
						z = ot(h.elements.popper),
						tt = [].concat(h.scrollParents.reference, h.scrollParents.popper);
					return O && tt.forEach(function(J) {
							J.addEventListener("scroll", m.update, Ae)
						}), M && z.addEventListener("resize", m.update, Ae),
						function() {
							O && tt.forEach(function(J) {
								J.removeEventListener("scroll", m.update, Ae)
							}), M && z.removeEventListener("resize", m.update, Ae)
						}
				},
				data: {}
			},
			Ie = {
				name: "popperOffsets",
				enabled: !0,
				phase: "read",
				fn: function(d) {
					var h = d.state;
					h.modifiersData[d.name] = Zt({
						reference: h.rects.reference,
						element: h.rects.popper,
						strategy: "absolute",
						placement: h.placement
					})
				},
				data: {}
			},
			_t = {
				top: "auto",
				right: "auto",
				bottom: "auto",
				left: "auto"
			};

		function ge(d) {
			var h, m = d.popper,
				A = d.popperRect,
				$ = d.placement,
				O = d.variation,
				W = d.offsets,
				M = d.position,
				z = d.gpuAcceleration,
				tt = d.adaptive,
				J = d.roundOffsets,
				Q = d.isFixed,
				Z = W.x,
				st = void 0 === Z ? 0 : Z,
				ut = W.y,
				vt = void 0 === ut ? 0 : ut,
				lt = "function" == typeof J ? J({
					x: st,
					y: vt
				}) : {
					x: st,
					y: vt
				};
			st = lt.x, vt = lt.y;
			var Ht = W.hasOwnProperty("x"),
				$t = W.hasOwnProperty("y"),
				Et = mt,
				At = U,
				dt = window;
			if (tt) {
				var it = pt(m),
					kt = "clientHeight",
					It = "clientWidth";
				it === ot(m) && "static" !== Wt(it = Tt(m)).position && "absolute" === M && (kt = "scrollHeight", It = "scrollWidth"), ($ === U || ($ === mt || $ === G) && O === ee) && (At = V, vt -= (Q && it === dt && dt.visualViewport ? dt.visualViewport.height : it[kt]) - A.height, vt *= z ? 1 : -1), ($ === mt || ($ === U || $ === V) && O === ee) && (Et = G, st -= (Q && it === dt && dt.visualViewport ? dt.visualViewport.width : it[It]) - A.width, st *= z ? 1 : -1)
			}
			var Dt, ve, ue, be, Qt, Ut = Object.assign({
					position: M
				}, tt && _t),
				ie = !0 === J ? (ve = {
					x: st,
					y: vt
				}, ue = ot(m), be = ve.y, {
					x: ft(ve.x * (Qt = ue.devicePixelRatio || 1)) / Qt || 0,
					y: ft(be * Qt) / Qt || 0
				}) : {
					x: st,
					y: vt
				};
			return st = ie.x, vt = ie.y, Object.assign({}, Ut, z ? ((Dt = {})[At] = $t ? "0" : "", Dt[Et] = Ht ? "0" : "", Dt.transform = (dt.devicePixelRatio || 1) <= 1 ? "translate(" + st + "px, " + vt + "px)" : "translate3d(" + st + "px, " + vt + "px, 0)", Dt) : ((h = {})[At] = $t ? vt + "px" : "", h[Et] = Ht ? st + "px" : "", h.transform = "", h))
		}
		var De = {
				name: "computeStyles",
				enabled: !0,
				phase: "beforeWrite",
				fn: function(d) {
					var h = d.state,
						m = d.options,
						A = m.gpuAcceleration,
						$ = void 0 === A || A,
						O = m.adaptive,
						W = void 0 === O || O,
						M = m.roundOffsets,
						z = void 0 === M || M,
						tt = {
							placement: Ft(h.placement),
							variation: Jt(h.placement),
							popper: h.elements.popper,
							popperRect: h.rects.popper,
							gpuAcceleration: $,
							isFixed: "fixed" === h.options.strategy
						};
					null != h.modifiersData.popperOffsets && (h.styles.popper = Object.assign({}, h.styles.popper, ge(Object.assign({}, tt, {
						offsets: h.modifiersData.popperOffsets,
						position: h.options.strategy,
						adaptive: W,
						roundOffsets: z
					})))), null != h.modifiersData.arrow && (h.styles.arrow = Object.assign({}, h.styles.arrow, ge(Object.assign({}, tt, {
						offsets: h.modifiersData.arrow,
						position: "absolute",
						adaptive: !1,
						roundOffsets: z
					})))), h.attributes.popper = Object.assign({}, h.attributes.popper, {
						"data-popper-placement": h.placement
					})
				},
				data: {}
			},
			je = {
				name: "applyStyles",
				enabled: !0,
				phase: "write",
				fn: function(d) {
					var h = d.state;
					Object.keys(h.elements).forEach(function(m) {
						var A = h.styles[m] || {},
							$ = h.attributes[m] || {},
							O = h.elements[m];
						rt(O) && bt(O) && (Object.assign(O.style, A), Object.keys($).forEach(function(W) {
							var M = $[W];
							!1 === M ? O.removeAttribute(W) : O.setAttribute(W, !0 === M ? "" : M)
						}))
					})
				},
				effect: function(d) {
					var h = d.state,
						m = {
							popper: {
								position: h.options.strategy,
								left: "0",
								top: "0",
								margin: "0"
							},
							arrow: {
								position: "absolute"
							},
							reference: {}
						};
					return Object.assign(h.elements.popper.style, m.popper), h.styles = m, h.elements.arrow && Object.assign(h.elements.arrow.style, m.arrow),
						function() {
							Object.keys(h.elements).forEach(function(A) {
								var $ = h.elements[A],
									O = h.attributes[A] || {},
									W = Object.keys(h.styles.hasOwnProperty(A) ? h.styles[A] : m[A]).reduce(function(M, z) {
										return M[z] = "", M
									}, {});
								rt($) && bt($) && (Object.assign($.style, W), Object.keys(O).forEach(function(M) {
									$.removeAttribute(M)
								}))
							})
						}
				},
				requires: ["computeStyles"]
			},
			$e = {
				name: "offset",
				enabled: !0,
				phase: "main",
				requires: ["popperOffsets"],
				fn: function(d) {
					var h = d.state,
						A = d.name,
						$ = d.options.offset,
						O = void 0 === $ ? [0, 0] : $,
						W = de.reduce(function(J, Q) {
							return J[Q] = (st = h.rects, ut = O, vt = Ft(Z = Q), lt = [mt, U].indexOf(vt) >= 0 ? -1 : 1, $t = ($t = (Ht = "function" == typeof ut ? ut(Object.assign({}, st, {
								placement: Z
							})) : ut)[0]) || 0, Et = ((Et = Ht[1]) || 0) * lt, [mt, G].indexOf(vt) >= 0 ? {
								x: Et,
								y: $t
							} : {
								x: $t,
								y: Et
							}), J;
							var Z, st, ut, vt, lt, Ht, $t, Et
						}, {}),
						M = W[h.placement],
						tt = M.y;
					null != h.modifiersData.popperOffsets && (h.modifiersData.popperOffsets.x += M.x, h.modifiersData.popperOffsets.y += tt), h.modifiersData[A] = W
				}
			},
			fe = {
				left: "right",
				right: "left",
				bottom: "top",
				top: "bottom"
			};

		function xe(d) {
			return d.replace(/left|right|bottom|top/g, function(h) {
				return fe[h]
			})
		}
		var Ke = {
			start: "end",
			end: "start"
		};

		function ze(d) {
			return d.replace(/start|end/g, function(h) {
				return Ke[h]
			})
		}
		var Ce = {
			name: "flip",
			enabled: !0,
			phase: "main",
			fn: function(d) {
				var h = d.state,
					m = d.options,
					A = d.name;
				if (!h.modifiersData[A]._skip) {
					for (var $ = m.mainAxis, O = void 0 === $ || $, W = m.altAxis, M = void 0 === W || W, z = m.fallbackPlacements, tt = m.padding, J = m.boundary, Q = m.rootBoundary, Z = m.altBoundary, st = m.flipVariations, ut = void 0 === st || st, vt = m.allowedAutoPlacements, lt = h.options.placement, Ht = Ft(lt), $t = z || (Ht !== lt && ut ? function(ye) {
							if (Ft(ye) === gt) return [];
							var ae = xe(ye);
							return [ze(ye), ae, ze(ae)]
						}(lt) : [xe(lt)]), Et = [lt].concat($t).reduce(function(ye, ae) {
							return ye.concat(Ft(ae) === gt ? function Se(d, h) {
								void 0 === h && (h = {});
								var $ = h.boundary,
									O = h.rootBoundary,
									W = h.padding,
									M = h.flipVariations,
									z = h.allowedAutoPlacements,
									tt = void 0 === z ? de : z,
									J = Jt(h.placement),
									Q = J ? M ? zt : zt.filter(function(ut) {
										return Jt(ut) === J
									}) : Vt,
									Z = Q.filter(function(ut) {
										return tt.indexOf(ut) >= 0
									});
								0 === Z.length && (Z = Q);
								var st = Z.reduce(function(ut, vt) {
									return ut[vt] = Gt(d, {
										placement: vt,
										boundary: $,
										rootBoundary: O,
										padding: W
									})[Ft(vt)], ut
								}, {});
								return Object.keys(st).sort(function(ut, vt) {
									return st[ut] - st[vt]
								})
							}(h, {
								placement: ae,
								boundary: J,
								rootBoundary: Q,
								padding: tt,
								flipVariations: ut,
								allowedAutoPlacements: vt
							}) : ae)
						}, []), At = h.rects.reference, dt = h.rects.popper, it = new Map, kt = !0, It = Et[0], Dt = 0; Dt < Et.length; Dt++) {
						var Ut = Et[Dt],
							ie = Ft(Ut),
							ve = Jt(Ut) === Xt,
							ue = [U, V].indexOf(ie) >= 0,
							ne = ue ? "width" : "height",
							be = Gt(h, {
								placement: Ut,
								boundary: J,
								rootBoundary: Q,
								altBoundary: Z,
								padding: tt
							}),
							Qt = ue ? ve ? G : mt : ve ? V : U;
						At[ne] > dt[ne] && (Qt = xe(Qt));
						var re = xe(Qt),
							He = [];
						if (O && He.push(be[ie] <= 0), M && He.push(be[Qt] <= 0, be[re] <= 0), He.every(function(ye) {
								return ye
							})) {
							It = Ut, kt = !1;
							break
						}
						it.set(Ut, He)
					}
					if (kt)
						for (var Ue = function(ye) {
								var ae = Et.find(function(Be) {
									var Xe = it.get(Be);
									if (Xe) return Xe.slice(0, ye).every(function(Le) {
										return Le
									})
								});
								if (ae) return It = ae, "break"
							}, Me = ut ? 3 : 1; Me > 0 && "break" !== Ue(Me); Me--);
					h.placement !== It && (h.modifiersData[A]._skip = !0, h.placement = It, h.reset = !0)
				}
			},
			requiresIfExists: ["offset"],
			data: {
				_skip: !1
			}
		};

		function Pe(d, h, m) {
			return nt(d, v(h, m))
		}
		var oe = {
				name: "preventOverflow",
				enabled: !0,
				phase: "main",
				fn: function(d) {
					var Ct, se, h = d.state,
						m = d.options,
						A = d.name,
						$ = m.mainAxis,
						O = void 0 === $ || $,
						W = m.altAxis,
						M = void 0 !== W && W,
						Z = m.tether,
						st = void 0 === Z || Z,
						ut = m.tetherOffset,
						vt = void 0 === ut ? 0 : ut,
						lt = Gt(h, {
							boundary: m.boundary,
							rootBoundary: m.rootBoundary,
							padding: m.padding,
							altBoundary: m.altBoundary
						}),
						Ht = Ft(h.placement),
						$t = Jt(h.placement),
						Et = !$t,
						At = pe(Ht),
						dt = "x" === At ? "y" : "x",
						it = h.modifiersData.popperOffsets,
						kt = h.rects.reference,
						It = h.rects.popper,
						Dt = "function" == typeof vt ? vt(Object.assign({}, h.rects, {
							placement: h.placement
						})) : vt,
						Ut = "number" == typeof Dt ? {
							mainAxis: Dt,
							altAxis: Dt
						} : Object.assign({
							mainAxis: 0,
							altAxis: 0
						}, Dt),
						ie = h.modifiersData.offset ? h.modifiersData.offset[h.placement] : null,
						ve = {
							x: 0,
							y: 0
						};
					if (it) {
						if (O) {
							var ue, ne = "y" === At ? U : mt,
								be = "y" === At ? V : G,
								Qt = "y" === At ? "height" : "width",
								re = it[At],
								He = re + lt[ne],
								Ue = re - lt[be],
								Me = st ? -It[Qt] / 2 : 0,
								ye = $t === Xt ? kt[Qt] : It[Qt],
								ae = $t === Xt ? -It[Qt] : -kt[Qt],
								Be = h.elements.arrow,
								Xe = st && Be ? X(Be) : {
									width: 0,
									height: 0
								},
								Le = h.modifiersData["arrow#persistent"] ? h.modifiersData["arrow#persistent"].padding : {
									top: 0,
									right: 0,
									bottom: 0,
									left: 0
								},
								sn = Le[ne],
								Je = Le[be],
								Ve = Pe(0, kt[Qt], Xe[Qt]),
								ln = Et ? kt[Qt] / 2 - Me - Ve - sn - Ut.mainAxis : ye - Ve - sn - Ut.mainAxis,
								Qe = Et ? -kt[Qt] / 2 + Me + Ve + Je + Ut.mainAxis : ae + Ve + Je + Ut.mainAxis,
								We = h.elements.arrow && pt(h.elements.arrow),
								Ze = null != (ue = null == ie ? void 0 : ie[At]) ? ue : 0,
								Ge = re + Qe - Ze,
								tn = Pe(st ? v(He, re + ln - Ze - (We ? "y" === At ? We.clientTop || 0 : We.clientLeft || 0 : 0)) : He, re, st ? nt(Ue, Ge) : Ue);
							it[At] = tn, ve[At] = tn - re
						}
						if (M) {
							var cn, _e = it[dt],
								x = "y" === dt ? "height" : "width",
								k = _e + lt["x" === At ? U : mt],
								i = _e - lt["x" === At ? V : G],
								u = -1 !== [U, mt].indexOf(Ht),
								g = null != (cn = null == ie ? void 0 : ie[dt]) ? cn : 0,
								E = u ? k : _e - kt[x] - It[x] - g + Ut.altAxis,
								I = u ? _e + kt[x] + It[x] - g - Ut.altAxis : i,
								q = st && u ? (se = Pe(E, _e, Ct = I)) > Ct ? Ct : se : Pe(st ? E : k, _e, st ? I : i);
							it[dt] = q, ve[dt] = q - _e
						}
						h.modifiersData[A] = ve
					}
				},
				requiresIfExists: ["offset"]
			},
			p = {
				name: "arrow",
				enabled: !0,
				phase: "main",
				fn: function(d) {
					var h, It, Dt, m = d.state,
						A = d.name,
						$ = d.options,
						O = m.elements.arrow,
						W = m.modifiersData.popperOffsets,
						M = Ft(m.placement),
						z = pe(M),
						tt = [mt, G].indexOf(M) >= 0 ? "height" : "width";
					if (O && W) {
						var J = (Dt = m, qt("number" != typeof(It = "function" == typeof(It = $.padding) ? It(Object.assign({}, Dt.rects, {
								placement: Dt.placement
							})) : It) ? It : te(It, Vt))),
							Q = X(O),
							Z = "y" === z ? U : mt,
							st = "y" === z ? V : G,
							ut = m.rects.reference[tt] + m.rects.reference[z] - W[z] - m.rects.popper[tt],
							vt = W[z] - m.rects.reference[z],
							lt = pt(O),
							Ht = lt ? "y" === z ? lt.clientHeight || 0 : lt.clientWidth || 0 : 0,
							dt = Ht / 2 - Q[tt] / 2 + (ut / 2 - vt / 2),
							it = Pe(J[Z], dt, Ht - Q[tt] - J[st]);
						m.modifiersData[A] = ((h = {})[z] = it, h.centerOffset = it - dt, h)
					}
				},
				effect: function(d) {
					var h = d.state,
						m = d.options.element,
						A = void 0 === m ? "[data-popper-arrow]" : m;
					null != A && ("string" != typeof A || (A = h.elements.popper.querySelector(A))) && we(h.elements.popper, A) && (h.elements.arrow = A)
				},
				requires: ["popperOffsets"],
				requiresIfExists: ["preventOverflow"]
			};

		function y(d, h, m) {
			return void 0 === m && (m = {
				x: 0,
				y: 0
			}), {
				top: d.top - h.height - m.y,
				right: d.right - h.width + m.x,
				bottom: d.bottom - h.height + m.y,
				left: d.left - h.width - m.x
			}
		}

		function C(d) {
			return [U, G, V, mt].some(function(h) {
				return d[h] >= 0
			})
		}
		var S = {
				name: "hide",
				enabled: !0,
				phase: "main",
				requiresIfExists: ["preventOverflow"],
				fn: function(d) {
					var h = d.state,
						m = d.name,
						A = h.rects.reference,
						$ = h.rects.popper,
						O = h.modifiersData.preventOverflow,
						W = Gt(h, {
							elementContext: "reference"
						}),
						M = Gt(h, {
							altBoundary: !0
						}),
						z = y(W, A),
						tt = y(M, $, O),
						J = C(z),
						Q = C(tt);
					h.modifiersData[m] = {
						referenceClippingOffsets: z,
						popperEscapeOffsets: tt,
						isReferenceHidden: J,
						hasPopperEscaped: Q
					}, h.attributes.popper = Object.assign({}, h.attributes.popper, {
						"data-popper-reference-hidden": J,
						"data-popper-escaped": Q
					})
				}
			},
			L = ce({
				defaultModifiers: [Fe, Ie, De, je]
			}),
			T = [Fe, Ie, De, je, $e, Ce, oe, p, S],
			D = ce({
				defaultModifiers: T
			});
		et.applyStyles = je, et.arrow = p, et.computeStyles = De, et.createPopper = D, et.createPopperLite = L, et.defaultModifiers = T, et.detectOverflow = Gt, et.eventListeners = Fe, et.flip = Ce, et.hide = S, et.offset = $e, et.popperGenerator = ce, et.popperOffsets = Ie, et.preventOverflow = oe, Object.defineProperty(et, "__esModule", {
			value: !0
		})
	}),
	function(et, ot) {
		"object" == typeof exports && "undefined" != typeof module ? ot(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], ot) : ot((et = "undefined" != typeof globalThis ? globalThis : et || self).bootstrap = {}, et.jQuery, et.Popper)
	}(this, function(et, ot, Lt) {
		"use strict";

		function rt(x) {
			return x && "object" == typeof x && "default" in x ? x : {
				default: x
			}
		}
		var c = rt(ot),
			nt = rt(Lt);

		function v(x, k) {
			for (var i = 0; i < k.length; i++) {
				var u = k[i];
				u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(x, u.key, u)
			}
		}

		function ft(x, k, i) {
			return k && v(x.prototype, k), i && v(x, i), Object.defineProperty(x, "prototype", {
				writable: !1
			}), x
		}

		function ct() {
			return ct = Object.assign ? Object.assign.bind() : function(x) {
				for (var k = 1; k < arguments.length; k++) {
					var i = arguments[k];
					for (var u in i) Object.prototype.hasOwnProperty.call(i, u) && (x[u] = i[u])
				}
				return x
			}, ct.apply(this, arguments)
		}

		function jt(x, k) {
			return (jt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(i, u) {
				return i.__proto__ = u, i
			})(x, k)
		}
		var St = "transitionend",
			F = {
				TRANSITION_END: "bsTransitionEnd",
				getUID: function(x) {
					do {
						x += ~~(1e6 * Math.random())
					} while (document.getElementById(x));
					return x
				},
				getSelectorFromElement: function(x) {
					var k = x.getAttribute("data-target");
					if (!k || "#" === k) {
						var i = x.getAttribute("href");
						k = i && "#" !== i ? i.trim() : ""
					}
					try {
						return document.querySelector(k) ? k : null
					} catch (u) {
						return null
					}
				},
				getTransitionDurationFromElement: function(x) {
					if (!x) return 0;
					var k = c.default(x).css("transition-duration"),
						i = c.default(x).css("transition-delay"),
						u = parseFloat(k),
						g = parseFloat(i);
					return u || g ? (k = k.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(k) + parseFloat(i))) : 0
				},
				reflow: function(x) {
					return x.offsetHeight
				},
				triggerTransitionEnd: function(x) {
					c.default(x).trigger(St)
				},
				supportsTransitionEnd: function() {
					return Boolean(St)
				},
				isElement: function(x) {
					return (x[0] || x).nodeType
				},
				typeCheckConfig: function(x, k, i) {
					for (var u in i)
						if (Object.prototype.hasOwnProperty.call(i, u)) {
							var g = i[u],
								E = k[u],
								I = E && F.isElement(E) ? "element" : null === (q = E) || void 0 === q ? "" + q : {}.toString.call(q).match(/\s([a-z]+)/i)[1].toLowerCase();
							if (!new RegExp(g).test(I)) throw new Error(x.toUpperCase() + ': Option "' + u + '" provided type "' + I + '" but expected type "' + g + '".')
						} var q
				},
				findShadowRoot: function(x) {
					if (!document.documentElement.attachShadow) return null;
					if ("function" == typeof x.getRootNode) {
						var k = x.getRootNode();
						return k instanceof ShadowRoot ? k : null
					}
					return x instanceof ShadowRoot ? x : x.parentNode ? F.findShadowRoot(x.parentNode) : null
				},
				jQueryDetection: function() {
					if (void 0 === c.default) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
					var x = c.default.fn.jquery.split(" ")[0].split(".");
					if (x[0] < 2 && x[1] < 9 || 1 === x[0] && 9 === x[1] && x[2] < 1 || x[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
				}
			};
		F.jQueryDetection(), c.default.fn.emulateTransitionEnd = function(x) {
			var k = this,
				i = !1;
			return c.default(this).one(F.TRANSITION_END, function() {
				i = !0
			}), setTimeout(function() {
				i || F.triggerTransitionEnd(k)
			}, x), this
		}, c.default.event.special[F.TRANSITION_END] = {
			bindType: St,
			delegateType: St,
			handle: function(x) {
				if (c.default(x.target).is(this)) return x.handleObj.handler.apply(this, arguments)
			}
		};
		var bt = "bs.alert",
			Tt = c.default.fn.alert,
			Mt = function() {
				function x(i) {
					this._element = i
				}
				var k = x.prototype;
				return k.close = function(i) {
					var u = this._element;
					i && (u = this._getRootElement(i)), this._triggerCloseEvent(u).isDefaultPrevented() || this._removeElement(u)
				}, k.dispose = function() {
					c.default.removeData(this._element, bt), this._element = null
				}, k._getRootElement = function(i) {
					var u = F.getSelectorFromElement(i),
						g = !1;
					return u && (g = document.querySelector(u)), g || (g = c.default(i).closest(".alert")[0]), g
				}, k._triggerCloseEvent = function(i) {
					var u = c.default.Event("close.bs.alert");
					return c.default(i).trigger(u), u
				}, k._removeElement = function(i) {
					var u = this;
					if (c.default(i).removeClass("show"), c.default(i).hasClass("fade")) {
						var g = F.getTransitionDurationFromElement(i);
						c.default(i).one(F.TRANSITION_END, function(E) {
							return u._destroyElement(i, E)
						}).emulateTransitionEnd(g)
					} else this._destroyElement(i)
				}, k._destroyElement = function(i) {
					c.default(i).detach().trigger("closed.bs.alert").remove()
				}, x._jQueryInterface = function(i) {
					return this.each(function() {
						var u = c.default(this),
							g = u.data(bt);
						g || (g = new x(this), u.data(bt, g)), "close" === i && g[i](this)
					})
				}, x._handleDismiss = function(i) {
					return function(u) {
						u && u.preventDefault(), i.close(this)
					}
				}, ft(x, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}]), x
			}();
		c.default(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', Mt._handleDismiss(new Mt)), c.default.fn.alert = Mt._jQueryInterface, c.default.fn.alert.Constructor = Mt, c.default.fn.alert.noConflict = function() {
			return c.default.fn.alert = Tt, Mt._jQueryInterface
		};
		var Wt = "bs.button",
			wt = c.default.fn.button,
			at = "active",
			X = '[data-toggle^="button"]',
			Nt = 'input:not([type="hidden"])',
			Rt = function() {
				function x(i) {
					this._element = i, this.shouldAvoidTriggerChange = !1
				}
				var k = x.prototype;
				return k.toggle = function() {
					var i = !0,
						u = !0,
						g = c.default(this._element).closest('[data-toggle="buttons"]')[0];
					if (g) {
						var E = this._element.querySelector(Nt);
						if (E) {
							if ("radio" === E.type)
								if (E.checked && this._element.classList.contains(at)) i = !1;
								else {
									var I = g.querySelector(".active");
									I && c.default(I).removeClass(at)
								} i && ("checkbox" !== E.type && "radio" !== E.type || (E.checked = !this._element.classList.contains(at)), this.shouldAvoidTriggerChange || c.default(E).trigger("change")), E.focus(), u = !1
						}
					}
					this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (u && this._element.setAttribute("aria-pressed", !this._element.classList.contains(at)), i && c.default(this._element).toggleClass(at))
				}, k.dispose = function() {
					c.default.removeData(this._element, Wt), this._element = null
				}, x._jQueryInterface = function(i, u) {
					return this.each(function() {
						var g = c.default(this),
							E = g.data(Wt);
						E || (E = new x(this), g.data(Wt, E)), E.shouldAvoidTriggerChange = u, "toggle" === i && E[i]()
					})
				}, ft(x, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}]), x
			}();
		c.default(document).on("click.bs.button.data-api", X, function(x) {
			var k = x.target,
				i = k;
			if (c.default(k).hasClass("btn") || (k = c.default(k).closest(".btn")[0]), !k || k.hasAttribute("disabled") || k.classList.contains("disabled")) x.preventDefault();
			else {
				var u = k.querySelector(Nt);
				if (u && (u.hasAttribute("disabled") || u.classList.contains("disabled"))) return void x.preventDefault();
				"INPUT" !== i.tagName && "LABEL" === k.tagName || Rt._jQueryInterface.call(c.default(k), "toggle", "INPUT" === i.tagName)
			}
		}).on("focus.bs.button.data-api blur.bs.button.data-api", X, function(x) {
			var k = c.default(x.target).closest(".btn")[0];
			c.default(k).toggleClass("focus", /^focus(in)?$/.test(x.type))
		}), c.default(window).on("load.bs.button.data-api", function() {
			for (var x = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), k = 0, i = x.length; k < i; k++) {
				var u = x[k],
					g = u.querySelector(Nt);
				g.checked || g.hasAttribute("checked") ? u.classList.add(at) : u.classList.remove(at)
			}
			for (var E = 0, I = (x = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; E < I; E++) {
				var q = x[E];
				"true" === q.getAttribute("aria-pressed") ? q.classList.add(at) : q.classList.remove(at)
			}
		}), c.default.fn.button = Rt._jQueryInterface, c.default.fn.button.Constructor = Rt, c.default.fn.button.noConflict = function() {
			return c.default.fn.button = wt, Rt._jQueryInterface
		};
		var j = "carousel",
			_ = "bs.carousel",
			pt = c.default.fn[j],
			U = "active",
			V = "next",
			G = "prev",
			mt = "slid.bs.carousel",
			gt = ".active.carousel-item",
			Vt = {
				interval: 5e3,
				keyboard: !0,
				slide: !1,
				pause: "hover",
				wrap: !0,
				touch: !0
			},
			Xt = {
				interval: "(number|boolean)",
				keyboard: "boolean",
				slide: "(boolean|string)",
				pause: "(string|boolean)",
				wrap: "boolean",
				touch: "boolean"
			},
			ee = {
				TOUCH: "touch",
				PEN: "pen"
			},
			Ot = function() {
				function x(i, u) {
					this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(u), this._element = i, this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
				}
				var k = x.prototype;
				return k.next = function() {
					this._isSliding || this._slide(V)
				}, k.nextWhenVisible = function() {
					var i = c.default(this._element);
					!document.hidden && i.is(":visible") && "hidden" !== i.css("visibility") && this.next()
				}, k.prev = function() {
					this._isSliding || this._slide(G)
				}, k.pause = function(i) {
					i || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (F.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
				}, k.cycle = function(i) {
					i || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._updateInterval(), this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
				}, k.to = function(i) {
					var u = this;
					this._activeElement = this._element.querySelector(gt);
					var g = this._getItemIndex(this._activeElement);
					if (!(i > this._items.length - 1 || i < 0))
						if (this._isSliding) c.default(this._element).one(mt, function() {
							return u.to(i)
						});
						else {
							if (g === i) return this.pause(), void this.cycle();
							this._slide(i > g ? V : G, this._items[i])
						}
				}, k.dispose = function() {
					c.default(this._element).off(".bs.carousel"), c.default.removeData(this._element, _), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
				}, k._getConfig = function(i) {
					return i = ct({}, Vt, i), F.typeCheckConfig(j, i, Xt), i
				}, k._handleSwipe = function() {
					var i = Math.abs(this.touchDeltaX);
					if (!(i <= 40)) {
						var u = i / this.touchDeltaX;
						this.touchDeltaX = 0, u > 0 && this.prev(), u < 0 && this.next()
					}
				}, k._addEventListeners = function() {
					var i = this;
					this._config.keyboard && c.default(this._element).on("keydown.bs.carousel", function(u) {
						return i._keydown(u)
					}), "hover" === this._config.pause && c.default(this._element).on("mouseenter.bs.carousel", function(u) {
						return i.pause(u)
					}).on("mouseleave.bs.carousel", function(u) {
						return i.cycle(u)
					}), this._config.touch && this._addTouchEventListeners()
				}, k._addTouchEventListeners = function() {
					var i = this;
					if (this._touchSupported) {
						var u = function(E) {
								i._pointerEvent && ee[E.originalEvent.pointerType.toUpperCase()] ? i.touchStartX = E.originalEvent.clientX : i._pointerEvent || (i.touchStartX = E.originalEvent.touches[0].clientX)
							},
							g = function(E) {
								i._pointerEvent && ee[E.originalEvent.pointerType.toUpperCase()] && (i.touchDeltaX = E.originalEvent.clientX - i.touchStartX), i._handleSwipe(), "hover" === i._config.pause && (i.pause(), i.touchTimeout && clearTimeout(i.touchTimeout), i.touchTimeout = setTimeout(function(I) {
									return i.cycle(I)
								}, 500 + i._config.interval))
							};
						c.default(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", function(E) {
							return E.preventDefault()
						}), this._pointerEvent ? (c.default(this._element).on("pointerdown.bs.carousel", function(E) {
							return u(E)
						}), c.default(this._element).on("pointerup.bs.carousel", function(E) {
							return g(E)
						}), this._element.classList.add("pointer-event")) : (c.default(this._element).on("touchstart.bs.carousel", function(E) {
							return u(E)
						}), c.default(this._element).on("touchmove.bs.carousel", function(E) {
							var I;
							i.touchDeltaX = (I = E).originalEvent.touches && I.originalEvent.touches.length > 1 ? 0 : I.originalEvent.touches[0].clientX - i.touchStartX
						}), c.default(this._element).on("touchend.bs.carousel", function(E) {
							return g(E)
						}))
					}
				}, k._keydown = function(i) {
					if (!/input|textarea/i.test(i.target.tagName)) switch (i.which) {
						case 37:
							i.preventDefault(), this.prev();
							break;
						case 39:
							i.preventDefault(), this.next()
					}
				}, k._getItemIndex = function(i) {
					return this._items = i && i.parentNode ? [].slice.call(i.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(i)
				}, k._getItemByDirection = function(i, u) {
					var g = i === V,
						E = i === G,
						I = this._getItemIndex(u);
					if ((E && 0 === I || g && I === this._items.length - 1) && !this._config.wrap) return u;
					var K = (I + (i === G ? -1 : 1)) % this._items.length;
					return -1 === K ? this._items[this._items.length - 1] : this._items[K]
				}, k._triggerSlideEvent = function(i, u) {
					var g = this._getItemIndex(i),
						E = this._getItemIndex(this._element.querySelector(gt)),
						I = c.default.Event("slide.bs.carousel", {
							relatedTarget: i,
							direction: u,
							from: E,
							to: g
						});
					return c.default(this._element).trigger(I), I
				}, k._setActiveIndicatorElement = function(i) {
					if (this._indicatorsElement) {
						var u = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
						c.default(u).removeClass(U);
						var g = this._indicatorsElement.children[this._getItemIndex(i)];
						g && c.default(g).addClass(U)
					}
				}, k._updateInterval = function() {
					var i = this._activeElement || this._element.querySelector(gt);
					if (i) {
						var u = parseInt(i.getAttribute("data-interval"), 10);
						u ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = u) : this._config.interval = this._config.defaultInterval || this._config.interval
					}
				}, k._slide = function(i, u) {
					var g, E, I, q = this,
						K = this._element.querySelector(gt),
						Pt = this._getItemIndex(K),
						Ct = u || K && this._getItemByDirection(i, K),
						se = this._getItemIndex(Ct),
						qe = Boolean(this._interval);
					if (i === V ? (g = "carousel-item-left", E = "carousel-item-next", I = "left") : (g = "carousel-item-right", E = "carousel-item-prev", I = "right"), Ct && c.default(Ct).hasClass(U)) this._isSliding = !1;
					else if (!this._triggerSlideEvent(Ct, I).isDefaultPrevented() && K && Ct) {
						this._isSliding = !0, qe && this.pause(), this._setActiveIndicatorElement(Ct), this._activeElement = Ct;
						var en = c.default.Event(mt, {
							relatedTarget: Ct,
							direction: I,
							from: Pt,
							to: se
						});
						if (c.default(this._element).hasClass("slide")) {
							c.default(Ct).addClass(E), F.reflow(Ct), c.default(K).addClass(g), c.default(Ct).addClass(g);
							var mn = F.getTransitionDurationFromElement(K);
							c.default(K).one(F.TRANSITION_END, function() {
								c.default(Ct).removeClass(g + " " + E).addClass(U), c.default(K).removeClass("active " + E + " " + g), q._isSliding = !1, setTimeout(function() {
									return c.default(q._element).trigger(en)
								}, 0)
							}).emulateTransitionEnd(mn)
						} else c.default(K).removeClass(U), c.default(Ct).addClass(U), this._isSliding = !1, c.default(this._element).trigger(en);
						qe && this.cycle()
					}
				}, x._jQueryInterface = function(i) {
					return this.each(function() {
						var u = c.default(this).data(_),
							g = ct({}, Vt, c.default(this).data());
						"object" == typeof i && (g = ct({}, g, i));
						var E = "string" == typeof i ? i : g.slide;
						if (u || (u = new x(this, g), c.default(this).data(_, u)), "number" == typeof i) u.to(i);
						else if ("string" == typeof E) {
							if (void 0 === u[E]) throw new TypeError('No method named "' + E + '"');
							u[E]()
						} else g.interval && g.ride && (u.pause(), u.cycle())
					})
				}, x._dataApiClickHandler = function(i) {
					var u = F.getSelectorFromElement(this);
					if (u) {
						var g = c.default(u)[0];
						if (g && c.default(g).hasClass("carousel")) {
							var E = ct({}, c.default(g).data(), c.default(this).data()),
								I = this.getAttribute("data-slide-to");
							I && (E.interval = !1), x._jQueryInterface.call(c.default(g), E), I && c.default(g).data(_).to(I), i.preventDefault()
						}
					}
				}, ft(x, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}, {
					key: "Default",
					get: function() {
						return Vt
					}
				}]), x
			}();
		c.default(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", Ot._dataApiClickHandler), c.default(window).on("load.bs.carousel.data-api", function() {
			for (var x = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), k = 0, i = x.length; k < i; k++) {
				var u = c.default(x[k]);
				Ot._jQueryInterface.call(u, u.data())
			}
		}), c.default.fn[j] = Ot._jQueryInterface, c.default.fn[j].Constructor = Ot, c.default.fn[j].noConflict = function() {
			return c.default.fn[j] = pt, Ot._jQueryInterface
		};
		var Bt = "collapse",
			zt = "bs.collapse",
			de = c.default.fn[Bt],
			yt = "show",
			Ne = "collapse",
			we = "collapsing",
			Ee = "collapsed",
			ke = '[data-toggle="collapse"]',
			Ft = {
				toggle: !0,
				parent: ""
			},
			Jt = {
				toggle: "boolean",
				parent: "(string|element)"
			},
			pe = function() {
				function x(i, u) {
					this._isTransitioning = !1, this._element = i, this._config = this._getConfig(u), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]'));
					for (var g = [].slice.call(document.querySelectorAll(ke)), E = 0, I = g.length; E < I; E++) {
						var q = g[E],
							K = F.getSelectorFromElement(q),
							Pt = [].slice.call(document.querySelectorAll(K)).filter(function(Ct) {
								return Ct === i
							});
						null !== K && Pt.length > 0 && (this._selector = K, this._triggerArray.push(q))
					}
					this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
				}
				var k = x.prototype;
				return k.toggle = function() {
					c.default(this._element).hasClass(yt) ? this.hide() : this.show()
				}, k.show = function() {
					var i, u, g = this;
					if (!(this._isTransitioning || c.default(this._element).hasClass(yt) || (this._parent && 0 === (i = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function(Pt) {
							return "string" == typeof g._config.parent ? Pt.getAttribute("data-parent") === g._config.parent : Pt.classList.contains(Ne)
						})).length && (i = null), i && (u = c.default(i).not(this._selector).data(zt)) && u._isTransitioning))) {
						var E = c.default.Event("show.bs.collapse");
						if (c.default(this._element).trigger(E), !E.isDefaultPrevented()) {
							i && (x._jQueryInterface.call(c.default(i).not(this._selector), "hide"), u || c.default(i).data(zt, null));
							var I = this._getDimension();
							c.default(this._element).removeClass(Ne).addClass(we), this._element.style[I] = 0, this._triggerArray.length && c.default(this._triggerArray).removeClass(Ee).attr("aria-expanded", !0), this.setTransitioning(!0);
							var q = "scroll" + (I[0].toUpperCase() + I.slice(1)),
								K = F.getTransitionDurationFromElement(this._element);
							c.default(this._element).one(F.TRANSITION_END, function() {
								c.default(g._element).removeClass(we).addClass("collapse show"), g._element.style[I] = "", g.setTransitioning(!1), c.default(g._element).trigger("shown.bs.collapse")
							}).emulateTransitionEnd(K), this._element.style[I] = this._element[q] + "px"
						}
					}
				}, k.hide = function() {
					var i = this;
					if (!this._isTransitioning && c.default(this._element).hasClass(yt)) {
						var u = c.default.Event("hide.bs.collapse");
						if (c.default(this._element).trigger(u), !u.isDefaultPrevented()) {
							var g = this._getDimension();
							this._element.style[g] = this._element.getBoundingClientRect()[g] + "px", F.reflow(this._element), c.default(this._element).addClass(we).removeClass("collapse show");
							var E = this._triggerArray.length;
							if (E > 0)
								for (var I = 0; I < E; I++) {
									var q = this._triggerArray[I],
										K = F.getSelectorFromElement(q);
									null !== K && (c.default([].slice.call(document.querySelectorAll(K))).hasClass(yt) || c.default(q).addClass(Ee).attr("aria-expanded", !1))
								}
							this.setTransitioning(!0), this._element.style[g] = "";
							var Pt = F.getTransitionDurationFromElement(this._element);
							c.default(this._element).one(F.TRANSITION_END, function() {
								i.setTransitioning(!1), c.default(i._element).removeClass(we).addClass(Ne).trigger("hidden.bs.collapse")
							}).emulateTransitionEnd(Pt)
						}
					}
				}, k.setTransitioning = function(i) {
					this._isTransitioning = i
				}, k.dispose = function() {
					c.default.removeData(this._element, zt), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
				}, k._getConfig = function(i) {
					return (i = ct({}, Ft, i)).toggle = Boolean(i.toggle), F.typeCheckConfig(Bt, i, Jt), i
				}, k._getDimension = function() {
					return c.default(this._element).hasClass("width") ? "width" : "height"
				}, k._getParent = function() {
					var i, u = this;
					F.isElement(this._config.parent) ? (i = this._config.parent, void 0 !== this._config.parent.jquery && (i = this._config.parent[0])) : i = document.querySelector(this._config.parent);
					var E = [].slice.call(i.querySelectorAll('[data-toggle="collapse"][data-parent="' + this._config.parent + '"]'));
					return c.default(E).each(function(I, q) {
						u._addAriaAndCollapsedClass(x._getTargetFromElement(q), [q])
					}), i
				}, k._addAriaAndCollapsedClass = function(i, u) {
					var g = c.default(i).hasClass(yt);
					u.length && c.default(u).toggleClass(Ee, !g).attr("aria-expanded", g)
				}, x._getTargetFromElement = function(i) {
					var u = F.getSelectorFromElement(i);
					return u ? document.querySelector(u) : null
				}, x._jQueryInterface = function(i) {
					return this.each(function() {
						var u = c.default(this),
							g = u.data(zt),
							E = ct({}, Ft, u.data(), "object" == typeof i && i ? i : {});
						if (!g && E.toggle && "string" == typeof i && /show|hide/.test(i) && (E.toggle = !1), g || (g = new x(this, E), u.data(zt, g)), "string" == typeof i) {
							if (void 0 === g[i]) throw new TypeError('No method named "' + i + '"');
							g[i]()
						}
					})
				}, ft(x, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}, {
					key: "Default",
					get: function() {
						return Ft
					}
				}]), x
			}();
		c.default(document).on("click.bs.collapse.data-api", ke, function(x) {
			"A" === x.currentTarget.tagName && x.preventDefault();
			var k = c.default(this),
				i = F.getSelectorFromElement(this),
				u = [].slice.call(document.querySelectorAll(i));
			c.default(u).each(function() {
				var g = c.default(this),
					E = g.data(zt) ? "toggle" : k.data();
				pe._jQueryInterface.call(g, E)
			})
		}), c.default.fn[Bt] = pe._jQueryInterface, c.default.fn[Bt].Constructor = pe, c.default.fn[Bt].noConflict = function() {
			return c.default.fn[Bt] = de, pe._jQueryInterface
		};
		var Zt = "dropdown",
			qt = "bs.dropdown",
			te = c.default.fn[Zt],
			Gt = new RegExp("38|40|27"),
			me = "disabled",
			Yt = "show",
			ce = "dropdown-menu-right",
			Ae = "hide.bs.dropdown",
			Fe = "hidden.bs.dropdown",
			Ie = "click.bs.dropdown.data-api",
			_t = "keydown.bs.dropdown.data-api",
			ge = '[data-toggle="dropdown"]',
			De = ".dropdown-menu",
			je = {
				offset: 0,
				flip: !0,
				boundary: "scrollParent",
				reference: "toggle",
				display: "dynamic",
				popperConfig: null
			},
			$e = {
				offset: "(number|string|function)",
				flip: "boolean",
				boundary: "(string|element)",
				reference: "(string|element)",
				display: "string",
				popperConfig: "(null|object)"
			},
			fe = function() {
				function x(i, u) {
					this._element = i, this._popper = null, this._config = this._getConfig(u), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
				}
				var k = x.prototype;
				return k.toggle = function() {
					if (!this._element.disabled && !c.default(this._element).hasClass(me)) {
						var i = c.default(this._menu).hasClass(Yt);
						x._clearMenus(), i || this.show(!0)
					}
				}, k.show = function(i) {
					if (void 0 === i && (i = !1), !(this._element.disabled || c.default(this._element).hasClass(me) || c.default(this._menu).hasClass(Yt))) {
						var u = {
								relatedTarget: this._element
							},
							g = c.default.Event("show.bs.dropdown", u),
							E = x._getParentFromElement(this._element);
						if (c.default(E).trigger(g), !g.isDefaultPrevented()) {
							if (!this._inNavbar && i) {
								if (void 0 === nt.default) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
								var I = this._element;
								"parent" === this._config.reference ? I = E : F.isElement(this._config.reference) && (I = this._config.reference, void 0 !== this._config.reference.jquery && (I = this._config.reference[0])), "scrollParent" !== this._config.boundary && c.default(E).addClass("position-static"), this._popper = new nt.default(I, this._menu, this._getPopperConfig())
							}
							"ontouchstart" in document.documentElement && 0 === c.default(E).closest(".navbar-nav").length && c.default(document.body).children().on("mouseover", null, c.default.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), c.default(this._menu).toggleClass(Yt), c.default(E).toggleClass(Yt).trigger(c.default.Event("shown.bs.dropdown", u))
						}
					}
				}, k.hide = function() {
					if (!this._element.disabled && !c.default(this._element).hasClass(me) && c.default(this._menu).hasClass(Yt)) {
						var i = {
								relatedTarget: this._element
							},
							u = c.default.Event(Ae, i),
							g = x._getParentFromElement(this._element);
						c.default(g).trigger(u), u.isDefaultPrevented() || (this._popper && this._popper.destroy(), c.default(this._menu).toggleClass(Yt), c.default(g).toggleClass(Yt).trigger(c.default.Event(Fe, i)))
					}
				}, k.dispose = function() {
					c.default.removeData(this._element, qt), c.default(this._element).off(".bs.dropdown"), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
				}, k.update = function() {
					this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
				}, k._addEventListeners = function() {
					var i = this;
					c.default(this._element).on("click.bs.dropdown", function(u) {
						u.preventDefault(), u.stopPropagation(), i.toggle()
					})
				}, k._getConfig = function(i) {
					return i = ct({}, this.constructor.Default, c.default(this._element).data(), i), F.typeCheckConfig(Zt, i, this.constructor.DefaultType), i
				}, k._getMenuElement = function() {
					if (!this._menu) {
						var i = x._getParentFromElement(this._element);
						i && (this._menu = i.querySelector(De))
					}
					return this._menu
				}, k._getPlacement = function() {
					var i = c.default(this._element.parentNode),
						u = "bottom-start";
					return i.hasClass("dropup") ? u = c.default(this._menu).hasClass(ce) ? "top-end" : "top-start" : i.hasClass("dropright") ? u = "right-start" : i.hasClass("dropleft") ? u = "left-start" : c.default(this._menu).hasClass(ce) && (u = "bottom-end"), u
				}, k._detectNavbar = function() {
					return c.default(this._element).closest(".navbar").length > 0
				}, k._getOffset = function() {
					var i = this,
						u = {};
					return "function" == typeof this._config.offset ? u.fn = function(g) {
						return g.offsets = ct({}, g.offsets, i._config.offset(g.offsets, i._element)), g
					} : u.offset = this._config.offset, u
				}, k._getPopperConfig = function() {
					var i = {
						placement: this._getPlacement(),
						modifiers: {
							offset: this._getOffset(),
							flip: {
								enabled: this._config.flip
							},
							preventOverflow: {
								boundariesElement: this._config.boundary
							}
						}
					};
					return "static" === this._config.display && (i.modifiers.applyStyle = {
						enabled: !1
					}), ct({}, i, this._config.popperConfig)
				}, x._jQueryInterface = function(i) {
					return this.each(function() {
						var u = c.default(this).data(qt);
						if (u || (u = new x(this, "object" == typeof i ? i : null), c.default(this).data(qt, u)), "string" == typeof i) {
							if (void 0 === u[i]) throw new TypeError('No method named "' + i + '"');
							u[i]()
						}
					})
				}, x._clearMenus = function(i) {
					if (!i || 3 !== i.which && ("keyup" !== i.type || 9 === i.which))
						for (var u = [].slice.call(document.querySelectorAll(ge)), g = 0, E = u.length; g < E; g++) {
							var I = x._getParentFromElement(u[g]),
								q = c.default(u[g]).data(qt),
								K = {
									relatedTarget: u[g]
								};
							if (i && "click" === i.type && (K.clickEvent = i), q) {
								var Pt = q._menu;
								if (c.default(I).hasClass(Yt) && !(i && ("click" === i.type && /input|textarea/i.test(i.target.tagName) || "keyup" === i.type && 9 === i.which) && c.default.contains(I, i.target))) {
									var Ct = c.default.Event(Ae, K);
									c.default(I).trigger(Ct), Ct.isDefaultPrevented() || ("ontouchstart" in document.documentElement && c.default(document.body).children().off("mouseover", null, c.default.noop), u[g].setAttribute("aria-expanded", "false"), q._popper && q._popper.destroy(), c.default(Pt).removeClass(Yt), c.default(I).removeClass(Yt).trigger(c.default.Event(Fe, K)))
								}
							}
						}
				}, x._getParentFromElement = function(i) {
					var u, g = F.getSelectorFromElement(i);
					return g && (u = document.querySelector(g)), u || i.parentNode
				}, x._dataApiKeydownHandler = function(i) {
					if (!(/input|textarea/i.test(i.target.tagName) ? 32 === i.which || 27 !== i.which && (40 !== i.which && 38 !== i.which || c.default(i.target).closest(De).length) : !Gt.test(i.which)) && !this.disabled && !c.default(this).hasClass(me)) {
						var u = x._getParentFromElement(this),
							g = c.default(u).hasClass(Yt);
						if (g || 27 !== i.which) {
							if (i.preventDefault(), i.stopPropagation(), !g || 27 === i.which || 32 === i.which) return 27 === i.which && c.default(u.querySelector(ge)).trigger("focus"), void c.default(this).trigger("click");
							var E = [].slice.call(u.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function(q) {
								return c.default(q).is(":visible")
							});
							if (0 !== E.length) {
								var I = E.indexOf(i.target);
								38 === i.which && I > 0 && I--, 40 === i.which && I < E.length - 1 && I++, I < 0 && (I = 0), E[I].focus()
							}
						}
					}
				}, ft(x, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}, {
					key: "Default",
					get: function() {
						return je
					}
				}, {
					key: "DefaultType",
					get: function() {
						return $e
					}
				}]), x
			}();
		c.default(document).on(_t, ge, fe._dataApiKeydownHandler).on(_t, De, fe._dataApiKeydownHandler).on(Ie + " keyup.bs.dropdown.data-api", fe._clearMenus).on(Ie, ge, function(x) {
			x.preventDefault(), x.stopPropagation(), fe._jQueryInterface.call(c.default(this), "toggle")
		}).on(Ie, ".dropdown form", function(x) {
			x.stopPropagation()
		}), c.default.fn[Zt] = fe._jQueryInterface, c.default.fn[Zt].Constructor = fe, c.default.fn[Zt].noConflict = function() {
			return c.default.fn[Zt] = te, fe._jQueryInterface
		};
		var xe = "bs.modal",
			Ke = c.default.fn.modal,
			ze = "modal-open",
			Se = "fade",
			Ce = "show",
			Pe = "modal-static",
			oe = "hidden.bs.modal",
			p = "show.bs.modal",
			y = "focusin.bs.modal",
			C = "resize.bs.modal",
			S = "click.dismiss.bs.modal",
			L = "keydown.dismiss.bs.modal",
			T = "mousedown.dismiss.bs.modal",
			D = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
			d = {
				backdrop: !0,
				keyboard: !0,
				focus: !0,
				show: !0
			},
			h = {
				backdrop: "(boolean|string)",
				keyboard: "boolean",
				focus: "boolean",
				show: "boolean"
			},
			m = function() {
				function x(i, u) {
					this._config = this._getConfig(u), this._element = i, this._dialog = i.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
				}
				var k = x.prototype;
				return k.toggle = function(i) {
					return this._isShown ? this.hide() : this.show(i)
				}, k.show = function(i) {
					var u = this;
					if (!this._isShown && !this._isTransitioning) {
						var g = c.default.Event(p, {
							relatedTarget: i
						});
						c.default(this._element).trigger(g), g.isDefaultPrevented() || (this._isShown = !0, c.default(this._element).hasClass(Se) && (this._isTransitioning = !0), this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), c.default(this._element).on(S, '[data-dismiss="modal"]', function(E) {
							return u.hide(E)
						}), c.default(this._dialog).on(T, function() {
							c.default(u._element).one("mouseup.dismiss.bs.modal", function(E) {
								c.default(E.target).is(u._element) && (u._ignoreBackdropClick = !0)
							})
						}), this._showBackdrop(function() {
							return u._showElement(i)
						}))
					}
				}, k.hide = function(i) {
					var u = this;
					if (i && i.preventDefault(), this._isShown && !this._isTransitioning) {
						var g = c.default.Event("hide.bs.modal");
						if (c.default(this._element).trigger(g), this._isShown && !g.isDefaultPrevented()) {
							this._isShown = !1;
							var E = c.default(this._element).hasClass(Se);
							if (E && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), c.default(document).off(y), c.default(this._element).removeClass(Ce), c.default(this._element).off(S), c.default(this._dialog).off(T), E) {
								var I = F.getTransitionDurationFromElement(this._element);
								c.default(this._element).one(F.TRANSITION_END, function(q) {
									return u._hideModal(q)
								}).emulateTransitionEnd(I)
							} else this._hideModal()
						}
					}
				}, k.dispose = function() {
					[window, this._element, this._dialog].forEach(function(i) {
						return c.default(i).off(".bs.modal")
					}), c.default(document).off(y), c.default.removeData(this._element, xe), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
				}, k.handleUpdate = function() {
					this._adjustDialog()
				}, k._getConfig = function(i) {
					return i = ct({}, d, i), F.typeCheckConfig("modal", i, h), i
				}, k._triggerBackdropTransition = function() {
					var i = this,
						u = c.default.Event("hidePrevented.bs.modal");
					if (c.default(this._element).trigger(u), !u.isDefaultPrevented()) {
						var g = this._element.scrollHeight > document.documentElement.clientHeight;
						g || (this._element.style.overflowY = "hidden"), this._element.classList.add(Pe);
						var E = F.getTransitionDurationFromElement(this._dialog);
						c.default(this._element).off(F.TRANSITION_END), c.default(this._element).one(F.TRANSITION_END, function() {
							i._element.classList.remove(Pe), g || c.default(i._element).one(F.TRANSITION_END, function() {
								i._element.style.overflowY = ""
							}).emulateTransitionEnd(i._element, E)
						}).emulateTransitionEnd(E), this._element.focus()
					}
				}, k._showElement = function(i) {
					var u = this,
						g = c.default(this._element).hasClass(Se),
						E = this._dialog ? this._dialog.querySelector(".modal-body") : null;
					this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), c.default(this._dialog).hasClass("modal-dialog-scrollable") && E ? E.scrollTop = 0 : this._element.scrollTop = 0, g && F.reflow(this._element), c.default(this._element).addClass(Ce), this._config.focus && this._enforceFocus();
					var I = c.default.Event("shown.bs.modal", {
							relatedTarget: i
						}),
						q = function() {
							u._config.focus && u._element.focus(), u._isTransitioning = !1, c.default(u._element).trigger(I)
						};
					if (g) {
						var K = F.getTransitionDurationFromElement(this._dialog);
						c.default(this._dialog).one(F.TRANSITION_END, q).emulateTransitionEnd(K)
					} else q()
				}, k._enforceFocus = function() {
					var i = this;
					c.default(document).off(y).on(y, function(u) {
						document !== u.target && i._element !== u.target && 0 === c.default(i._element).has(u.target).length && i._element.focus()
					})
				}, k._setEscapeEvent = function() {
					var i = this;
					this._isShown ? c.default(this._element).on(L, function(u) {
						i._config.keyboard && 27 === u.which ? (u.preventDefault(), i.hide()) : i._config.keyboard || 27 !== u.which || i._triggerBackdropTransition()
					}) : this._isShown || c.default(this._element).off(L)
				}, k._setResizeEvent = function() {
					var i = this;
					this._isShown ? c.default(window).on(C, function(u) {
						return i.handleUpdate(u)
					}) : c.default(window).off(C)
				}, k._hideModal = function() {
					var i = this;
					this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._showBackdrop(function() {
						c.default(document.body).removeClass(ze), i._resetAdjustments(), i._resetScrollbar(), c.default(i._element).trigger(oe)
					})
				}, k._removeBackdrop = function() {
					this._backdrop && (c.default(this._backdrop).remove(), this._backdrop = null)
				}, k._showBackdrop = function(i) {
					var u = this,
						g = c.default(this._element).hasClass(Se) ? Se : "";
					if (this._isShown && this._config.backdrop) {
						if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", g && this._backdrop.classList.add(g), c.default(this._backdrop).appendTo(document.body), c.default(this._element).on(S, function(K) {
								u._ignoreBackdropClick ? u._ignoreBackdropClick = !1 : K.target === K.currentTarget && ("static" === u._config.backdrop ? u._triggerBackdropTransition() : u.hide())
							}), g && F.reflow(this._backdrop), c.default(this._backdrop).addClass(Ce), !i) return;
						if (!g) return void i();
						var E = F.getTransitionDurationFromElement(this._backdrop);
						c.default(this._backdrop).one(F.TRANSITION_END, i).emulateTransitionEnd(E)
					} else if (!this._isShown && this._backdrop) {
						c.default(this._backdrop).removeClass(Ce);
						var I = function() {
							u._removeBackdrop(), i && i()
						};
						if (c.default(this._element).hasClass(Se)) {
							var q = F.getTransitionDurationFromElement(this._backdrop);
							c.default(this._backdrop).one(F.TRANSITION_END, I).emulateTransitionEnd(q)
						} else I()
					} else i && i()
				}, k._adjustDialog = function() {
					var i = this._element.scrollHeight > document.documentElement.clientHeight;
					!this._isBodyOverflowing && i && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !i && (this._element.style.paddingRight = this._scrollbarWidth + "px")
				}, k._resetAdjustments = function() {
					this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
				}, k._checkScrollbar = function() {
					var i = document.body.getBoundingClientRect();
					this._isBodyOverflowing = Math.round(i.left + i.right) < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
				}, k._setScrollbar = function() {
					var i = this;
					if (this._isBodyOverflowing) {
						var u = [].slice.call(document.querySelectorAll(D)),
							g = [].slice.call(document.querySelectorAll(".sticky-top"));
						c.default(u).each(function(q, K) {
							var Pt = K.style.paddingRight,
								Ct = c.default(K).css("padding-right");
							c.default(K).data("padding-right", Pt).css("padding-right", parseFloat(Ct) + i._scrollbarWidth + "px")
						}), c.default(g).each(function(q, K) {
							var Pt = K.style.marginRight,
								Ct = c.default(K).css("margin-right");
							c.default(K).data("margin-right", Pt).css("margin-right", parseFloat(Ct) - i._scrollbarWidth + "px")
						});
						var E = document.body.style.paddingRight,
							I = c.default(document.body).css("padding-right");
						c.default(document.body).data("padding-right", E).css("padding-right", parseFloat(I) + this._scrollbarWidth + "px")
					}
					c.default(document.body).addClass(ze)
				}, k._resetScrollbar = function() {
					var i = [].slice.call(document.querySelectorAll(D));
					c.default(i).each(function(E, I) {
						var q = c.default(I).data("padding-right");
						c.default(I).removeData("padding-right"), I.style.paddingRight = q || ""
					});
					var u = [].slice.call(document.querySelectorAll(".sticky-top"));
					c.default(u).each(function(E, I) {
						var q = c.default(I).data("margin-right");
						void 0 !== q && c.default(I).css("margin-right", q).removeData("margin-right")
					});
					var g = c.default(document.body).data("padding-right");
					c.default(document.body).removeData("padding-right"), document.body.style.paddingRight = g || ""
				}, k._getScrollbarWidth = function() {
					var i = document.createElement("div");
					i.className = "modal-scrollbar-measure", document.body.appendChild(i);
					var u = i.getBoundingClientRect().width - i.clientWidth;
					return document.body.removeChild(i), u
				}, x._jQueryInterface = function(i, u) {
					return this.each(function() {
						var g = c.default(this).data(xe),
							E = ct({}, d, c.default(this).data(), "object" == typeof i && i ? i : {});
						if (g || (g = new x(this, E), c.default(this).data(xe, g)), "string" == typeof i) {
							if (void 0 === g[i]) throw new TypeError('No method named "' + i + '"');
							g[i](u)
						} else E.show && g.show(u)
					})
				}, ft(x, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}, {
					key: "Default",
					get: function() {
						return d
					}
				}]), x
			}();
		c.default(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(x) {
			var k, i = this,
				u = F.getSelectorFromElement(this);
			u && (k = document.querySelector(u));
			var g = c.default(k).data(xe) ? "toggle" : ct({}, c.default(k).data(), c.default(this).data());
			"A" !== this.tagName && "AREA" !== this.tagName || x.preventDefault();
			var E = c.default(k).one(p, function(I) {
				I.isDefaultPrevented() || E.one(oe, function() {
					c.default(i).is(":visible") && i.focus()
				})
			});
			m._jQueryInterface.call(c.default(k), g, this)
		}), c.default.fn.modal = m._jQueryInterface, c.default.fn.modal.Constructor = m, c.default.fn.modal.noConflict = function() {
			return c.default.fn.modal = Ke, m._jQueryInterface
		};
		var A = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
			$ = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
			O = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

		function W(x, k, i) {
			if (0 === x.length) return x;
			if (i && "function" == typeof i) return i(x);
			for (var u = (new window.DOMParser).parseFromString(x, "text/html"), g = Object.keys(k), E = [].slice.call(u.body.querySelectorAll("*")), I = function(Pt, Ct) {
					var se = E[Pt],
						qe = se.nodeName.toLowerCase();
					if (-1 === g.indexOf(se.nodeName.toLowerCase())) return se.parentNode.removeChild(se), "continue";
					var en = [].slice.call(se.attributes),
						mn = [].concat(k["*"] || [], k[qe] || []);
					en.forEach(function(_n) {
						(function(dn, gn) {
							var nn = dn.nodeName.toLowerCase();
							if (-1 !== gn.indexOf(nn)) return -1 === A.indexOf(nn) || Boolean($.test(dn.nodeValue) || O.test(dn.nodeValue));
							for (var fn = gn.filter(function(En) {
									return En instanceof RegExp
								}), hn = 0, wn = fn.length; hn < wn; hn++)
								if (fn[hn].test(nn)) return !0;
							return !1
						})(_n, mn) || se.removeAttribute(_n.nodeName)
					})
				}, q = 0, K = E.length; q < K; q++) I(q);
			return u.body.innerHTML
		}
		var M = "tooltip",
			z = "bs.tooltip",
			tt = c.default.fn.tooltip,
			J = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
			Q = ["sanitize", "whiteList", "sanitizeFn"],
			Z = "fade",
			st = "show",
			ut = "show",
			lt = "hover",
			$t = {
				AUTO: "auto",
				TOP: "top",
				RIGHT: "right",
				BOTTOM: "bottom",
				LEFT: "left"
			},
			Et = {
				animation: !0,
				template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
				trigger: "hover focus",
				title: "",
				delay: 0,
				html: !1,
				selector: !1,
				placement: "top",
				offset: 0,
				container: !1,
				fallbackPlacement: "flip",
				boundary: "scrollParent",
				customClass: "",
				sanitize: !0,
				sanitizeFn: null,
				whiteList: {
					"*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
					a: ["target", "href", "title", "rel"],
					area: [],
					b: [],
					br: [],
					col: [],
					code: [],
					div: [],
					em: [],
					hr: [],
					h1: [],
					h2: [],
					h3: [],
					h4: [],
					h5: [],
					h6: [],
					i: [],
					img: ["src", "srcset", "alt", "title", "width", "height"],
					li: [],
					ol: [],
					p: [],
					pre: [],
					s: [],
					small: [],
					span: [],
					sub: [],
					sup: [],
					strong: [],
					u: [],
					ul: []
				},
				popperConfig: null
			},
			At = {
				animation: "boolean",
				template: "string",
				title: "(string|element|function)",
				trigger: "string",
				delay: "(number|object)",
				html: "boolean",
				selector: "(string|boolean)",
				placement: "(string|function)",
				offset: "(number|string|function)",
				container: "(string|element|boolean)",
				fallbackPlacement: "(string|array)",
				boundary: "(string|element)",
				customClass: "(string|function)",
				sanitize: "boolean",
				sanitizeFn: "(null|function)",
				whiteList: "object",
				popperConfig: "(null|object)"
			},
			dt = {
				HIDE: "hide.bs.tooltip",
				HIDDEN: "hidden.bs.tooltip",
				SHOW: "show.bs.tooltip",
				SHOWN: "shown.bs.tooltip",
				INSERTED: "inserted.bs.tooltip",
				CLICK: "click.bs.tooltip",
				FOCUSIN: "focusin.bs.tooltip",
				FOCUSOUT: "focusout.bs.tooltip",
				MOUSEENTER: "mouseenter.bs.tooltip",
				MOUSELEAVE: "mouseleave.bs.tooltip"
			},
			it = function() {
				function x(i, u) {
					if (void 0 === nt.default) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
					this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = i, this.config = this._getConfig(u), this.tip = null, this._setListeners()
				}
				var k = x.prototype;
				return k.enable = function() {
					this._isEnabled = !0
				}, k.disable = function() {
					this._isEnabled = !1
				}, k.toggleEnabled = function() {
					this._isEnabled = !this._isEnabled
				}, k.toggle = function(i) {
					if (this._isEnabled)
						if (i) {
							var u = this.constructor.DATA_KEY,
								g = c.default(i.currentTarget).data(u);
							g || (g = new this.constructor(i.currentTarget, this._getDelegateConfig()), c.default(i.currentTarget).data(u, g)), g._activeTrigger.click = !g._activeTrigger.click, g._isWithActiveTrigger() ? g._enter(null, g) : g._leave(null, g)
						} else {
							if (c.default(this.getTipElement()).hasClass(st)) return void this._leave(null, this);
							this._enter(null, this)
						}
				}, k.dispose = function() {
					clearTimeout(this._timeout), c.default.removeData(this.element, this.constructor.DATA_KEY), c.default(this.element).off(this.constructor.EVENT_KEY), c.default(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && c.default(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
				}, k.show = function() {
					var i = this;
					if ("none" === c.default(this.element).css("display")) throw new Error("Please use show on visible elements");
					var u = c.default.Event(this.constructor.Event.SHOW);
					if (this.isWithContent() && this._isEnabled) {
						c.default(this.element).trigger(u);
						var g = F.findShadowRoot(this.element),
							E = c.default.contains(null !== g ? g : this.element.ownerDocument.documentElement, this.element);
						if (u.isDefaultPrevented() || !E) return;
						var I = this.getTipElement(),
							q = F.getUID(this.constructor.NAME);
						I.setAttribute("id", q), this.element.setAttribute("aria-describedby", q), this.setContent(), this.config.animation && c.default(I).addClass(Z);
						var K = "function" == typeof this.config.placement ? this.config.placement.call(this, I, this.element) : this.config.placement,
							Pt = this._getAttachment(K);
						this.addAttachmentClass(Pt);
						var Ct = this._getContainer();
						c.default(I).data(this.constructor.DATA_KEY, this), c.default.contains(this.element.ownerDocument.documentElement, this.tip) || c.default(I).appendTo(Ct), c.default(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new nt.default(this.element, I, this._getPopperConfig(Pt)), c.default(I).addClass(st), c.default(I).addClass(this.config.customClass), "ontouchstart" in document.documentElement && c.default(document.body).children().on("mouseover", null, c.default.noop);
						var se = function() {
							i.config.animation && i._fixTransition();
							var en = i._hoverState;
							i._hoverState = null, c.default(i.element).trigger(i.constructor.Event.SHOWN), "out" === en && i._leave(null, i)
						};
						if (c.default(this.tip).hasClass(Z)) {
							var qe = F.getTransitionDurationFromElement(this.tip);
							c.default(this.tip).one(F.TRANSITION_END, se).emulateTransitionEnd(qe)
						} else se()
					}
				}, k.hide = function(i) {
					var u = this,
						g = this.getTipElement(),
						E = c.default.Event(this.constructor.Event.HIDE),
						I = function() {
							u._hoverState !== ut && g.parentNode && g.parentNode.removeChild(g), u._cleanTipClass(), u.element.removeAttribute("aria-describedby"), c.default(u.element).trigger(u.constructor.Event.HIDDEN), null !== u._popper && u._popper.destroy(), i && i()
						};
					if (c.default(this.element).trigger(E), !E.isDefaultPrevented()) {
						if (c.default(g).removeClass(st), "ontouchstart" in document.documentElement && c.default(document.body).children().off("mouseover", null, c.default.noop), this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, c.default(this.tip).hasClass(Z)) {
							var q = F.getTransitionDurationFromElement(g);
							c.default(g).one(F.TRANSITION_END, I).emulateTransitionEnd(q)
						} else I();
						this._hoverState = ""
					}
				}, k.update = function() {
					null !== this._popper && this._popper.scheduleUpdate()
				}, k.isWithContent = function() {
					return Boolean(this.getTitle())
				}, k.addAttachmentClass = function(i) {
					c.default(this.getTipElement()).addClass("bs-tooltip-" + i)
				}, k.getTipElement = function() {
					return this.tip = this.tip || c.default(this.config.template)[0], this.tip
				}, k.setContent = function() {
					var i = this.getTipElement();
					this.setElementContent(c.default(i.querySelectorAll(".tooltip-inner")), this.getTitle()), c.default(i).removeClass("fade show")
				}, k.setElementContent = function(i, u) {
					"object" != typeof u || !u.nodeType && !u.jquery ? this.config.html ? (this.config.sanitize && (u = W(u, this.config.whiteList, this.config.sanitizeFn)), i.html(u)) : i.text(u) : this.config.html ? c.default(u).parent().is(i) || i.empty().append(u) : i.text(c.default(u).text())
				}, k.getTitle = function() {
					var i = this.element.getAttribute("data-original-title");
					return i || (i = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), i
				}, k._getPopperConfig = function(i) {
					var u = this;
					return ct({}, {
						placement: i,
						modifiers: {
							offset: this._getOffset(),
							flip: {
								behavior: this.config.fallbackPlacement
							},
							arrow: {
								element: ".arrow"
							},
							preventOverflow: {
								boundariesElement: this.config.boundary
							}
						},
						onCreate: function(g) {
							g.originalPlacement !== g.placement && u._handlePopperPlacementChange(g)
						},
						onUpdate: function(g) {
							return u._handlePopperPlacementChange(g)
						}
					}, this.config.popperConfig)
				}, k._getOffset = function() {
					var i = this,
						u = {};
					return "function" == typeof this.config.offset ? u.fn = function(g) {
						return g.offsets = ct({}, g.offsets, i.config.offset(g.offsets, i.element)), g
					} : u.offset = this.config.offset, u
				}, k._getContainer = function() {
					return !1 === this.config.container ? document.body : F.isElement(this.config.container) ? c.default(this.config.container) : c.default(document).find(this.config.container)
				}, k._getAttachment = function(i) {
					return $t[i.toUpperCase()]
				}, k._setListeners = function() {
					var i = this;
					this.config.trigger.split(" ").forEach(function(u) {
						if ("click" === u) c.default(i.element).on(i.constructor.Event.CLICK, i.config.selector, function(I) {
							return i.toggle(I)
						});
						else if ("manual" !== u) {
							var g = u === lt ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN,
								E = u === lt ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
							c.default(i.element).on(g, i.config.selector, function(I) {
								return i._enter(I)
							}).on(E, i.config.selector, function(I) {
								return i._leave(I)
							})
						}
					}), this._hideModalHandler = function() {
						i.element && i.hide()
					}, c.default(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = ct({}, this.config, {
						trigger: "manual",
						selector: ""
					}) : this._fixTitle()
				}, k._fixTitle = function() {
					var i = typeof this.element.getAttribute("data-original-title");
					(this.element.getAttribute("title") || "string" !== i) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
				}, k._enter = function(i, u) {
					var g = this.constructor.DATA_KEY;
					(u = u || c.default(i.currentTarget).data(g)) || (u = new this.constructor(i.currentTarget, this._getDelegateConfig()), c.default(i.currentTarget).data(g, u)), i && (u._activeTrigger["focusin" === i.type ? "focus" : lt] = !0), c.default(u.getTipElement()).hasClass(st) || u._hoverState === ut ? u._hoverState = ut : (clearTimeout(u._timeout), u._hoverState = ut, u.config.delay && u.config.delay.show ? u._timeout = setTimeout(function() {
						u._hoverState === ut && u.show()
					}, u.config.delay.show) : u.show())
				}, k._leave = function(i, u) {
					var g = this.constructor.DATA_KEY;
					(u = u || c.default(i.currentTarget).data(g)) || (u = new this.constructor(i.currentTarget, this._getDelegateConfig()), c.default(i.currentTarget).data(g, u)), i && (u._activeTrigger["focusout" === i.type ? "focus" : lt] = !1), u._isWithActiveTrigger() || (clearTimeout(u._timeout), u._hoverState = "out", u.config.delay && u.config.delay.hide ? u._timeout = setTimeout(function() {
						"out" === u._hoverState && u.hide()
					}, u.config.delay.hide) : u.hide())
				}, k._isWithActiveTrigger = function() {
					for (var i in this._activeTrigger)
						if (this._activeTrigger[i]) return !0;
					return !1
				}, k._getConfig = function(i) {
					var u = c.default(this.element).data();
					return Object.keys(u).forEach(function(g) {
						-1 !== Q.indexOf(g) && delete u[g]
					}), "number" == typeof(i = ct({}, this.constructor.Default, u, "object" == typeof i && i ? i : {})).delay && (i.delay = {
						show: i.delay,
						hide: i.delay
					}), "number" == typeof i.title && (i.title = i.title.toString()), "number" == typeof i.content && (i.content = i.content.toString()), F.typeCheckConfig(M, i, this.constructor.DefaultType), i.sanitize && (i.template = W(i.template, i.whiteList, i.sanitizeFn)), i
				}, k._getDelegateConfig = function() {
					var i = {};
					if (this.config)
						for (var u in this.config) this.constructor.Default[u] !== this.config[u] && (i[u] = this.config[u]);
					return i
				}, k._cleanTipClass = function() {
					var i = c.default(this.getTipElement()),
						u = i.attr("class").match(J);
					null !== u && u.length && i.removeClass(u.join(""))
				}, k._handlePopperPlacementChange = function(i) {
					this.tip = i.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(i.placement))
				}, k._fixTransition = function() {
					var i = this.getTipElement(),
						u = this.config.animation;
					null === i.getAttribute("x-placement") && (c.default(i).removeClass(Z), this.config.animation = !1, this.hide(), this.show(), this.config.animation = u)
				}, x._jQueryInterface = function(i) {
					return this.each(function() {
						var u = c.default(this),
							g = u.data(z),
							E = "object" == typeof i && i;
						if ((g || !/dispose|hide/.test(i)) && (g || (g = new x(this, E), u.data(z, g)), "string" == typeof i)) {
							if (void 0 === g[i]) throw new TypeError('No method named "' + i + '"');
							g[i]()
						}
					})
				}, ft(x, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}, {
					key: "Default",
					get: function() {
						return Et
					}
				}, {
					key: "NAME",
					get: function() {
						return M
					}
				}, {
					key: "DATA_KEY",
					get: function() {
						return z
					}
				}, {
					key: "Event",
					get: function() {
						return dt
					}
				}, {
					key: "EVENT_KEY",
					get: function() {
						return ".bs.tooltip"
					}
				}, {
					key: "DefaultType",
					get: function() {
						return At
					}
				}]), x
			}();
		c.default.fn.tooltip = it._jQueryInterface, c.default.fn.tooltip.Constructor = it, c.default.fn.tooltip.noConflict = function() {
			return c.default.fn.tooltip = tt, it._jQueryInterface
		};
		var kt = "bs.popover",
			It = c.default.fn.popover,
			Dt = new RegExp("(^|\\s)bs-popover\\S+", "g"),
			Ut = ct({}, it.Default, {
				placement: "right",
				trigger: "click",
				content: "",
				template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
			}),
			ie = ct({}, it.DefaultType, {
				content: "(string|element|function)"
			}),
			ve = {
				HIDE: "hide.bs.popover",
				HIDDEN: "hidden.bs.popover",
				SHOW: "show.bs.popover",
				SHOWN: "shown.bs.popover",
				INSERTED: "inserted.bs.popover",
				CLICK: "click.bs.popover",
				FOCUSIN: "focusin.bs.popover",
				FOCUSOUT: "focusout.bs.popover",
				MOUSEENTER: "mouseenter.bs.popover",
				MOUSELEAVE: "mouseleave.bs.popover"
			},
			ue = function(x) {
				var k, i;

				function u() {
					return x.apply(this, arguments) || this
				}
				i = x, (k = u).prototype = Object.create(i.prototype), k.prototype.constructor = k, jt(k, i);
				var g = u.prototype;
				return g.isWithContent = function() {
					return this.getTitle() || this._getContent()
				}, g.addAttachmentClass = function(E) {
					c.default(this.getTipElement()).addClass("bs-popover-" + E)
				}, g.getTipElement = function() {
					return this.tip = this.tip || c.default(this.config.template)[0], this.tip
				}, g.setContent = function() {
					var E = c.default(this.getTipElement());
					this.setElementContent(E.find(".popover-header"), this.getTitle());
					var I = this._getContent();
					"function" == typeof I && (I = I.call(this.element)), this.setElementContent(E.find(".popover-body"), I), E.removeClass("fade show")
				}, g._getContent = function() {
					return this.element.getAttribute("data-content") || this.config.content
				}, g._cleanTipClass = function() {
					var E = c.default(this.getTipElement()),
						I = E.attr("class").match(Dt);
					null !== I && I.length > 0 && E.removeClass(I.join(""))
				}, u._jQueryInterface = function(E) {
					return this.each(function() {
						var I = c.default(this).data(kt),
							q = "object" == typeof E ? E : null;
						if ((I || !/dispose|hide/.test(E)) && (I || (I = new u(this, q), c.default(this).data(kt, I)), "string" == typeof E)) {
							if (void 0 === I[E]) throw new TypeError('No method named "' + E + '"');
							I[E]()
						}
					})
				}, ft(u, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}, {
					key: "Default",
					get: function() {
						return Ut
					}
				}, {
					key: "NAME",
					get: function() {
						return "popover"
					}
				}, {
					key: "DATA_KEY",
					get: function() {
						return kt
					}
				}, {
					key: "Event",
					get: function() {
						return ve
					}
				}, {
					key: "EVENT_KEY",
					get: function() {
						return ".bs.popover"
					}
				}, {
					key: "DefaultType",
					get: function() {
						return ie
					}
				}]), u
			}(it);
		c.default.fn.popover = ue._jQueryInterface, c.default.fn.popover.Constructor = ue, c.default.fn.popover.noConflict = function() {
			return c.default.fn.popover = It, ue._jQueryInterface
		};
		var ne = "scrollspy",
			be = "bs.scrollspy",
			Qt = c.default.fn[ne],
			re = "active",
			He = "position",
			Ue = ".nav, .list-group",
			Me = {
				offset: 10,
				method: "auto",
				target: ""
			},
			ye = {
				offset: "number",
				method: "string",
				target: "(string|element)"
			},
			ae = function() {
				function x(i, u) {
					var g = this;
					this._element = i, this._scrollElement = "BODY" === i.tagName ? window : i, this._config = this._getConfig(u), this._selector = this._config.target + " .nav-link," + this._config.target + " .list-group-item," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, c.default(this._scrollElement).on("scroll.bs.scrollspy", function(E) {
						return g._process(E)
					}), this.refresh(), this._process()
				}
				var k = x.prototype;
				return k.refresh = function() {
					var i = this,
						g = "auto" === this._config.method ? this._scrollElement === this._scrollElement.window ? "offset" : He : this._config.method,
						E = g === He ? this._getScrollTop() : 0;
					this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(I) {
						var q, K = F.getSelectorFromElement(I);
						if (K && (q = document.querySelector(K)), q) {
							var Pt = q.getBoundingClientRect();
							if (Pt.width || Pt.height) return [c.default(q)[g]().top + E, K]
						}
						return null
					}).filter(Boolean).sort(function(I, q) {
						return I[0] - q[0]
					}).forEach(function(I) {
						i._offsets.push(I[0]), i._targets.push(I[1])
					})
				}, k.dispose = function() {
					c.default.removeData(this._element, be), c.default(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
				}, k._getConfig = function(i) {
					if ("string" != typeof(i = ct({}, Me, "object" == typeof i && i ? i : {})).target && F.isElement(i.target)) {
						var u = c.default(i.target).attr("id");
						u || (u = F.getUID(ne), c.default(i.target).attr("id", u)), i.target = "#" + u
					}
					return F.typeCheckConfig(ne, i, ye), i
				}, k._getScrollTop = function() {
					return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
				}, k._getScrollHeight = function() {
					return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
				}, k._getOffsetHeight = function() {
					return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
				}, k._process = function() {
					var i = this._getScrollTop() + this._config.offset,
						u = this._getScrollHeight(),
						g = this._config.offset + u - this._getOffsetHeight();
					if (this._scrollHeight !== u && this.refresh(), i >= g) {
						var E = this._targets[this._targets.length - 1];
						this._activeTarget !== E && this._activate(E)
					} else {
						if (this._activeTarget && i < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
						for (var I = this._offsets.length; I--;) this._activeTarget !== this._targets[I] && i >= this._offsets[I] && (void 0 === this._offsets[I + 1] || i < this._offsets[I + 1]) && this._activate(this._targets[I])
					}
				}, k._activate = function(i) {
					this._activeTarget = i, this._clear();
					var u = this._selector.split(",").map(function(E) {
							return E + '[data-target="' + i + '"],' + E + '[href="' + i + '"]'
						}),
						g = c.default([].slice.call(document.querySelectorAll(u.join(","))));
					g.hasClass("dropdown-item") ? (g.closest(".dropdown").find(".dropdown-toggle").addClass(re), g.addClass(re)) : (g.addClass(re), g.parents(Ue).prev(".nav-link, .list-group-item").addClass(re), g.parents(Ue).prev(".nav-item").children(".nav-link").addClass(re)), c.default(this._scrollElement).trigger("activate.bs.scrollspy", {
						relatedTarget: i
					})
				}, k._clear = function() {
					[].slice.call(document.querySelectorAll(this._selector)).filter(function(i) {
						return i.classList.contains(re)
					}).forEach(function(i) {
						return i.classList.remove(re)
					})
				}, x._jQueryInterface = function(i) {
					return this.each(function() {
						var u = c.default(this).data(be);
						if (u || (u = new x(this, "object" == typeof i && i), c.default(this).data(be, u)), "string" == typeof i) {
							if (void 0 === u[i]) throw new TypeError('No method named "' + i + '"');
							u[i]()
						}
					})
				}, ft(x, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}, {
					key: "Default",
					get: function() {
						return Me
					}
				}]), x
			}();
		c.default(window).on("load.bs.scrollspy.data-api", function() {
			for (var x = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), k = x.length; k--;) {
				var i = c.default(x[k]);
				ae._jQueryInterface.call(i, i.data())
			}
		}), c.default.fn[ne] = ae._jQueryInterface, c.default.fn[ne].Constructor = ae, c.default.fn[ne].noConflict = function() {
			return c.default.fn[ne] = Qt, ae._jQueryInterface
		};
		var Be = "bs.tab",
			Xe = c.default.fn.tab,
			Le = "active",
			Ve = ".active",
			ln = "> li > .active",
			Qe = function() {
				function x(i) {
					this._element = i
				}
				var k = x.prototype;
				return k.show = function() {
					var i = this;
					if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && c.default(this._element).hasClass(Le) || c.default(this._element).hasClass("disabled") || this._element.hasAttribute("disabled"))) {
						var u, g, E = c.default(this._element).closest(".nav, .list-group")[0],
							I = F.getSelectorFromElement(this._element);
						if (E) {
							var q = "UL" === E.nodeName || "OL" === E.nodeName ? ln : Ve;
							g = (g = c.default.makeArray(c.default(E).find(q)))[g.length - 1]
						}
						var K = c.default.Event("hide.bs.tab", {
								relatedTarget: this._element
							}),
							Pt = c.default.Event("show.bs.tab", {
								relatedTarget: g
							});
						if (g && c.default(g).trigger(K), c.default(this._element).trigger(Pt), !Pt.isDefaultPrevented() && !K.isDefaultPrevented()) {
							I && (u = document.querySelector(I)), this._activate(this._element, E);
							var Ct = function() {
								var se = c.default.Event("hidden.bs.tab", {
										relatedTarget: i._element
									}),
									qe = c.default.Event("shown.bs.tab", {
										relatedTarget: g
									});
								c.default(g).trigger(se), c.default(i._element).trigger(qe)
							};
							u ? this._activate(u, u.parentNode, Ct) : Ct()
						}
					}
				}, k.dispose = function() {
					c.default.removeData(this._element, Be), this._element = null
				}, k._activate = function(i, u, g) {
					var E = this,
						I = (!u || "UL" !== u.nodeName && "OL" !== u.nodeName ? c.default(u).children(Ve) : c.default(u).find(ln))[0],
						q = g && I && c.default(I).hasClass("fade"),
						K = function() {
							return E._transitionComplete(i, I, g)
						};
					if (I && q) {
						var Pt = F.getTransitionDurationFromElement(I);
						c.default(I).removeClass("show").one(F.TRANSITION_END, K).emulateTransitionEnd(Pt)
					} else K()
				}, k._transitionComplete = function(i, u, g) {
					if (u) {
						c.default(u).removeClass(Le);
						var E = c.default(u.parentNode).find("> .dropdown-menu .active")[0];
						E && c.default(E).removeClass(Le), "tab" === u.getAttribute("role") && u.setAttribute("aria-selected", !1)
					}
					c.default(i).addClass(Le), "tab" === i.getAttribute("role") && i.setAttribute("aria-selected", !0), F.reflow(i), i.classList.contains("fade") && i.classList.add("show");
					var I = i.parentNode;
					if (I && "LI" === I.nodeName && (I = I.parentNode), I && c.default(I).hasClass("dropdown-menu")) {
						var q = c.default(i).closest(".dropdown")[0];
						if (q) {
							var K = [].slice.call(q.querySelectorAll(".dropdown-toggle"));
							c.default(K).addClass(Le)
						}
						i.setAttribute("aria-expanded", !0)
					}
					g && g()
				}, x._jQueryInterface = function(i) {
					return this.each(function() {
						var u = c.default(this),
							g = u.data(Be);
						if (g || (g = new x(this), u.data(Be, g)), "string" == typeof i) {
							if (void 0 === g[i]) throw new TypeError('No method named "' + i + '"');
							g[i]()
						}
					})
				}, ft(x, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}]), x
			}();
		c.default(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(x) {
			x.preventDefault(), Qe._jQueryInterface.call(c.default(this), "show")
		}), c.default.fn.tab = Qe._jQueryInterface, c.default.fn.tab.Constructor = Qe, c.default.fn.tab.noConflict = function() {
			return c.default.fn.tab = Xe, Qe._jQueryInterface
		};
		var We = "bs.toast",
			bn = c.default.fn.toast,
			Ge = "show",
			tn = "showing",
			cn = "click.dismiss.bs.toast",
			un = {
				animation: !0,
				autohide: !0,
				delay: 500
			},
			yn = {
				animation: "boolean",
				autohide: "boolean",
				delay: "number"
			},
			_e = function() {
				function x(i, u) {
					this._element = i, this._config = this._getConfig(u), this._timeout = null, this._setListeners()
				}
				var k = x.prototype;
				return k.show = function() {
					var i = this,
						u = c.default.Event("show.bs.toast");
					if (c.default(this._element).trigger(u), !u.isDefaultPrevented()) {
						this._clearTimeout(), this._config.animation && this._element.classList.add("fade");
						var g = function() {
							i._element.classList.remove(tn), i._element.classList.add(Ge), c.default(i._element).trigger("shown.bs.toast"), i._config.autohide && (i._timeout = setTimeout(function() {
								i.hide()
							}, i._config.delay))
						};
						if (this._element.classList.remove("hide"), F.reflow(this._element), this._element.classList.add(tn), this._config.animation) {
							var E = F.getTransitionDurationFromElement(this._element);
							c.default(this._element).one(F.TRANSITION_END, g).emulateTransitionEnd(E)
						} else g()
					}
				}, k.hide = function() {
					if (this._element.classList.contains(Ge)) {
						var i = c.default.Event("hide.bs.toast");
						c.default(this._element).trigger(i), i.isDefaultPrevented() || this._close()
					}
				}, k.dispose = function() {
					this._clearTimeout(), this._element.classList.contains(Ge) && this._element.classList.remove(Ge), c.default(this._element).off(cn), c.default.removeData(this._element, We), this._element = null, this._config = null
				}, k._getConfig = function(i) {
					return i = ct({}, un, c.default(this._element).data(), "object" == typeof i && i ? i : {}), F.typeCheckConfig("toast", i, this.constructor.DefaultType), i
				}, k._setListeners = function() {
					var i = this;
					c.default(this._element).on(cn, '[data-dismiss="toast"]', function() {
						return i.hide()
					})
				}, k._close = function() {
					var i = this,
						u = function() {
							i._element.classList.add("hide"), c.default(i._element).trigger("hidden.bs.toast")
						};
					if (this._element.classList.remove(Ge), this._config.animation) {
						var g = F.getTransitionDurationFromElement(this._element);
						c.default(this._element).one(F.TRANSITION_END, u).emulateTransitionEnd(g)
					} else u()
				}, k._clearTimeout = function() {
					clearTimeout(this._timeout), this._timeout = null
				}, x._jQueryInterface = function(i) {
					return this.each(function() {
						var u = c.default(this),
							g = u.data(We);
						if (g || (g = new x(this, "object" == typeof i && i), u.data(We, g)), "string" == typeof i) {
							if (void 0 === g[i]) throw new TypeError('No method named "' + i + '"');
							g[i](this)
						}
					})
				}, ft(x, null, [{
					key: "VERSION",
					get: function() {
						return "4.6.2"
					}
				}, {
					key: "DefaultType",
					get: function() {
						return yn
					}
				}, {
					key: "Default",
					get: function() {
						return un
					}
				}]), x
			}();
		c.default.fn.toast = _e._jQueryInterface, c.default.fn.toast.Constructor = _e, c.default.fn.toast.noConflict = function() {
			return c.default.fn.toast = bn, _e._jQueryInterface
		}, et.Alert = Mt, et.Button = Rt, et.Carousel = Ot, et.Collapse = pe, et.Dropdown = fe, et.Modal = m, et.Popover = ue, et.Scrollspy = ae, et.Tab = Qe, et.Toast = _e, et.Tooltip = it, et.Util = F, Object.defineProperty(et, "__esModule", {
			value: !0
		})
	}),
	function(et, ot) {
		if ("object" == typeof exports && "object" == typeof module) module.exports = ot(require("jQuery"));
		else if ("function" == typeof define && define.amd) define(["jQuery"], ot);
		else {
			var Lt = ot("object" == typeof exports ? require("jQuery") : et.jQuery);
			for (var rt in Lt)("object" == typeof exports ? exports : et)[rt] = Lt[rt]
		}
	}(self, function(et) {
		return (() => {
			"use strict";
			var ot = {
					9770: (nt, v, ft) => {
						var ct = ft(1145),
							jt = ft.n(ct);
						jt().summernote = jt().summernote || {
							lang: {}
						}, jt().extend(jt().summernote.lang, {
							"en-US": {
								font: {
									bold: "Bold",
									italic: "Italic",
									underline: "Underline",
									clear: "Remove Font Style",
									height: "Line Height",
									name: "Font Family",
									strikethrough: "Strikethrough",
									subscript: "Subscript",
									superscript: "Superscript",
									size: "Font Size",
									sizeunit: "Font Size Unit"
								},
								image: {
									image: "Picture",
									insert: "Insert Image",
									resizeFull: "Resize full",
									resizeHalf: "Resize half",
									resizeQuarter: "Resize quarter",
									resizeNone: "Original size",
									floatLeft: "Float Left",
									floatRight: "Float Right",
									floatNone: "Remove float",
									shapeRounded: "Shape: Rounded",
									shapeCircle: "Shape: Circle",
									shapeThumbnail: "Shape: Thumbnail",
									shapeNone: "Shape: None",
									dragImageHere: "Drag image or text here",
									dropImage: "Drop image or Text",
									selectFromFiles: "Select from files",
									maximumFileSize: "Maximum file size",
									maximumFileSizeError: "Maximum file size exceeded.",
									url: "Image URL",
									remove: "Remove Image",
									original: "Original"
								},
								video: {
									video: "Video",
									videoLink: "Video Link",
									insert: "Insert Video",
									url: "Video URL",
									providers: "(YouTube, Google Drive, Vimeo, Vine, Instagram, DailyMotion, Youku, Peertube)"
								},
								link: {
									link: "Link",
									insert: "Insert Link",
									unlink: "Unlink",
									edit: "Edit",
									textToDisplay: "Text to display",
									url: "To what URL should this link go?",
									openInNewWindow: "Open in new window",
									useProtocol: "Use default protocol"
								},
								table: {
									table: "Table",
									addRowAbove: "Add row above",
									addRowBelow: "Add row below",
									addColLeft: "Add column left",
									addColRight: "Add column right",
									delRow: "Delete row",
									delCol: "Delete column",
									delTable: "Delete table"
								},
								hr: {
									insert: "Insert Horizontal Rule"
								},
								style: {
									style: "Style",
									p: "Normal",
									blockquote: "Quote",
									pre: "Code",
									h1: "Header 1",
									h2: "Header 2",
									h3: "Header 3",
									h4: "Header 4",
									h5: "Header 5",
									h6: "Header 6"
								},
								lists: {
									unordered: "Unordered list",
									ordered: "Ordered list"
								},
								options: {
									help: "Help",
									fullscreen: "Full Screen",
									codeview: "Code View"
								},
								paragraph: {
									paragraph: "Paragraph",
									outdent: "Outdent",
									indent: "Indent",
									left: "Align left",
									center: "Align center",
									right: "Align right",
									justify: "Justify full"
								},
								color: {
									recent: "Recent Color",
									more: "More Color",
									background: "Background Color",
									foreground: "Text Color",
									transparent: "Transparent",
									setTransparent: "Set transparent",
									reset: "Reset",
									resetToDefault: "Reset to default",
									cpSelect: "Select"
								},
								shortcut: {
									shortcuts: "Keyboard shortcuts",
									close: "Close",
									textFormatting: "Text formatting",
									action: "Action",
									paragraphFormatting: "Paragraph formatting",
									documentStyle: "Document Style",
									extraKeys: "Extra keys"
								},
								help: {
									escape: "Escape",
									insertParagraph: "Insert Paragraph",
									undo: "Undo the last command",
									redo: "Redo the last command",
									tab: "Tab",
									untab: "Untab",
									bold: "Set a bold style",
									italic: "Set a italic style",
									underline: "Set a underline style",
									strikethrough: "Set a strikethrough style",
									removeFormat: "Clean a style",
									justifyLeft: "Set left align",
									justifyCenter: "Set center align",
									justifyRight: "Set right align",
									justifyFull: "Set full align",
									insertUnorderedList: "Toggle unordered list",
									insertOrderedList: "Toggle ordered list",
									outdent: "Outdent on current paragraph",
									indent: "Indent on current paragraph",
									formatPara: "Change current block's format as a paragraph(P tag)",
									formatH1: "Change current block's format as H1",
									formatH2: "Change current block's format as H2",
									formatH3: "Change current block's format as H3",
									formatH4: "Change current block's format as H4",
									formatH5: "Change current block's format as H5",
									formatH6: "Change current block's format as H6",
									insertHorizontalRule: "Insert horizontal rule",
									"linkDialog.show": "Show Link Dialog"
								},
								history: {
									undo: "Undo",
									redo: "Redo"
								},
								specialChar: {
									specialChar: "SPECIAL CHARACTERS",
									select: "Select Special characters"
								},
								output: {
									noSelection: "No Selection Made!"
								}
							}
						})
					},
					1145: nt => {
						nt.exports = et
					}
				},
				Lt = {};

			function rt(nt) {
				var v = Lt[nt];
				if (void 0 !== v) return v.exports;
				var ft = Lt[nt] = {
					exports: {}
				};
				return ot[nt](ft, ft.exports, rt), ft.exports
			}
			rt.n = nt => {
				var v = nt && nt.__esModule ? () => nt.default : () => nt;
				return rt.d(v, {
					a: v
				}), v
			}, rt.d = (nt, v) => {
				for (var ft in v) rt.o(v, ft) && !rt.o(nt, ft) && Object.defineProperty(nt, ft, {
					enumerable: !0,
					get: v[ft]
				})
			}, rt.o = (nt, v) => Object.prototype.hasOwnProperty.call(nt, v), rt.r = nt => {
				"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(nt, Symbol.toStringTag, {
					value: "Module"
				}), Object.defineProperty(nt, "__esModule", {
					value: !0
				})
			};
			var c = {};
			return (() => {
				rt.r(c);
				var nt = rt(1145),
					v = rt.n(nt),
					ft = (rt(9770), ["sans-serif", "serif", "monospace", "cursive", "fantasy"]);

				function ct(e) {
					return -1 === v().inArray(e.toLowerCase(), ft) ? "'".concat(e, "'") : e
				}
				var jt, St = navigator.userAgent,
					F = /MSIE|Trident/i.test(St);
				if (F) {
					var bt = /MSIE (\d+[.]\d+)/.exec(St);
					bt && (jt = parseFloat(bt[1])), (bt = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(St)) && (jt = parseFloat(bt[1]))
				}
				var Tt = /Edge\/\d+/.test(St),
					Mt = "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
					Wt = F ? "DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted" : "input";
				const wt = {
					isMac: navigator.appVersion.indexOf("Mac") > -1,
					isMSIE: F,
					isEdge: Tt,
					isFF: !Tt && /firefox/i.test(St),
					isPhantom: /PhantomJS/i.test(St),
					isWebkit: !Tt && /webkit/i.test(St),
					isChrome: !Tt && /chrome/i.test(St),
					isSafari: !Tt && /safari/i.test(St) && !/chrome/i.test(St),
					browserVersion: jt,
					isSupportTouch: Mt,
					isFontInstalled: function(e) {
						var o = "Comic Sans MS" === e ? "Courier New" : "Comic Sans MS",
							s = "mmmmmmmmmmwwwww",
							r = document.createElement("canvas").getContext("2d");
						r.font = "200px '" + o + "'";
						var t = r.measureText(s).width;
						return r.font = "200px " + ct(e) + ', "' + o + '"', t !== r.measureText(s).width
					},
					isW3CRangeSupport: !!document.createRange,
					inputEventName: Wt,
					genericFontFamilies: ft,
					validFontName: ct
				};
				var at = 0;
				const X = {
					eq: function(e) {
						return function(o) {
							return e === o
						}
					},
					eq2: function(e, o) {
						return e === o
					},
					peq2: function(e) {
						return function(o, s) {
							return o[e] === s[e]
						}
					},
					ok: function() {
						return !0
					},
					fail: function() {
						return !1
					},
					self: function(e) {
						return e
					},
					not: function(e) {
						return function() {
							return !e.apply(e, arguments)
						}
					},
					and: function(e, o) {
						return function(s) {
							return e(s) && o(s)
						}
					},
					invoke: function(e, o) {
						return function() {
							return e[o].apply(e, arguments)
						}
					},
					resetUniqueId: function() {
						at = 0
					},
					uniqueId: function(e) {
						var o = ++at + "";
						return e ? e + o : o
					},
					rect2bnd: function(e) {
						var o = v()(document);
						return {
							top: e.top + o.scrollTop(),
							left: e.left + o.scrollLeft(),
							width: e.right - e.left,
							height: e.bottom - e.top
						}
					},
					invertObject: function(e) {
						var o = {};
						for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (o[e[s]] = s);
						return o
					},
					namespaceToCamel: function(e, o) {
						return (o = o || "") + e.split(".").map(function(s) {
							return s.substring(0, 1).toUpperCase() + s.substring(1)
						}).join("")
					},
					debounce: function(e, o, s) {
						var r;
						return function() {
							var t = this,
								n = arguments,
								a = function() {
									r = null, s || e.apply(t, n)
								},
								l = s && !r;
							clearTimeout(r), r = setTimeout(a, o), l && e.apply(t, n)
						}
					},
					isValidUrl: function(e) {
						return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(e)
					}
				};

				function Nt(e) {
					return e[0]
				}

				function Kt(e) {
					return e[e.length - 1]
				}

				function Rt(e) {
					return e.slice(1)
				}

				function j(e, o) {
					if (e && e.length && o) {
						if (e.indexOf) return -1 !== e.indexOf(o);
						if (e.contains) return e.contains(o)
					}
					return !1
				}
				const _ = {
					head: Nt,
					last: Kt,
					initial: function(e) {
						return e.slice(0, e.length - 1)
					},
					tail: Rt,
					prev: function(e, o) {
						if (e && e.length && o) {
							var s = e.indexOf(o);
							return -1 === s ? null : e[s - 1]
						}
						return null
					},
					next: function(e, o) {
						if (e && e.length && o) {
							var s = e.indexOf(o);
							return -1 === s ? null : e[s + 1]
						}
						return null
					},
					find: function(e, o) {
						for (var s = 0, r = e.length; s < r; s++) {
							var t = e[s];
							if (o(t)) return t
						}
					},
					contains: j,
					all: function(e, o) {
						for (var s = 0, r = e.length; s < r; s++)
							if (!o(e[s])) return !1;
						return !0
					},
					sum: function(e, o) {
						return o = o || X.self, e.reduce(function(s, r) {
							return s + o(r)
						}, 0)
					},
					from: function(e) {
						for (var o = [], s = e.length, r = -1; ++r < s;) o[r] = e[r];
						return o
					},
					isEmpty: function(e) {
						return !e || !e.length
					},
					clusterBy: function(e, o) {
						return e.length ? Rt(e).reduce(function(s, r) {
							var t = Kt(s);
							return o(Kt(t), r) ? t[t.length] = r : s[s.length] = [r], s
						}, [
							[Nt(e)]
						]) : []
					},
					compact: function(e) {
						for (var o = [], s = 0, r = e.length; s < r; s++) e[s] && o.push(e[s]);
						return o
					},
					unique: function(e) {
						for (var o = [], s = 0, r = e.length; s < r; s++) j(o, e[s]) || o.push(e[s]);
						return o
					}
				};
				var pt = String.fromCharCode(160);

				function U(e) {
					return e && v()(e).hasClass("note-editable")
				}

				function V(e) {
					return e = e.toUpperCase(),
						function(o) {
							return o && o.nodeName.toUpperCase() === e
						}
				}

				function G(e) {
					return e && 3 === e.nodeType
				}

				function mt(e) {
					return e && /^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT|^AUDIO|^VIDEO|^EMBED/.test(e.nodeName.toUpperCase())
				}

				function gt(e) {
					return !U(e) && e && /^DIV|^P|^LI|^H[1-7]/.test(e.nodeName.toUpperCase())
				}
				var Vt = V("PRE"),
					Xt = V("LI"),
					ee = V("TABLE"),
					Ot = V("DATA");

				function Bt(e) {
					return !(we(e) || zt(e) || de(e) || gt(e) || ee(e) || Ne(e) || Ot(e))
				}

				function zt(e) {
					return e && /^UL|^OL/.test(e.nodeName.toUpperCase())
				}
				var de = V("HR");

				function yt(e) {
					return e && /^TD|^TH/.test(e.nodeName.toUpperCase())
				}
				var Ne = V("BLOCKQUOTE");

				function we(e) {
					return yt(e) || Ne(e) || U(e)
				}
				var Ee = V("A"),
					Oe = V("BODY"),
					ke = wt.isMSIE && wt.browserVersion < 11 ? "&nbsp;" : "<br>";

				function Ft(e) {
					return G(e) ? e.nodeValue.length : e ? e.childNodes.length : 0
				}

				function Jt(e) {
					var o = Ft(e);
					return 0 === o || !G(e) && 1 === o && e.innerHTML === ke || !(!_.all(e.childNodes, G) || "" !== e.innerHTML)
				}

				function pe(e) {
					mt(e) || Ft(e) || (e.innerHTML = ke)
				}

				function Zt(e, o) {
					for (; e;) {
						if (o(e)) return e;
						if (U(e)) break;
						e = e.parentNode
					}
					return null
				}

				function qt(e, o) {
					o = o || X.fail;
					var s = [];
					return Zt(e, function(r) {
						return U(r) || s.push(r), o(r)
					}), s
				}

				function te(e, o) {
					o = o || X.fail;
					for (var s = []; e && !o(e);) s.push(e), e = e.nextSibling;
					return s
				}

				function Gt(e, o) {
					var s = o.nextSibling,
						r = o.parentNode;
					return s ? r.insertBefore(e, s) : r.appendChild(e), e
				}

				function me(e, o) {
					return v().each(o, function(s, r) {
						e.appendChild(r)
					}), e
				}

				function Yt(e) {
					return 0 === e.offset
				}

				function ce(e) {
					return e.offset === Ft(e.node)
				}

				function Ae(e) {
					return Yt(e) || ce(e)
				}

				function Fe(e, o) {
					for (; e && e !== o;) {
						if (0 !== _t(e)) return !1;
						e = e.parentNode
					}
					return !0
				}

				function Ie(e, o) {
					if (!o) return !1;
					for (; e && e !== o;) {
						if (_t(e) !== Ft(e.parentNode) - 1) return !1;
						e = e.parentNode
					}
					return !0
				}

				function _t(e) {
					for (var o = 0; e = e.previousSibling;) o += 1;
					return o
				}

				function ge(e) {
					return !!(e && e.childNodes && e.childNodes.length)
				}

				function De(e, o) {
					var s, r;
					if (0 === e.offset) {
						if (U(e.node)) return null;
						s = e.node.parentNode, r = _t(e.node)
					} else ge(e.node) ? r = Ft(s = e.node.childNodes[e.offset - 1]) : (s = e.node, r = o ? 0 : e.offset - 1);
					return {
						node: s,
						offset: r
					}
				}

				function je(e, o) {
					var s, r;
					if (Ft(e.node) === e.offset) {
						if (U(e.node)) return null;
						var t = fe(e.node);
						t ? (s = t, r = 0) : (s = e.node.parentNode, r = _t(e.node) + 1)
					} else ge(e.node) ? (s = e.node.childNodes[e.offset], r = 0) : (s = e.node, r = o ? Ft(e.node) : e.offset + 1);
					return {
						node: s,
						offset: r
					}
				}

				function $e(e, o) {
					var s, r = 0;
					if (Jt(e.node)) return null === e.node ? null : {
						node: s = e.node.nextSibling,
						offset: r = 0
					};
					if (Ft(e.node) === e.offset) {
						if (U(e.node)) return null;
						s = e.node.parentNode, r = _t(e.node) + 1, U(s) && (s = e.node.nextSibling, r = 0)
					} else if (ge(e.node)) {
						if (r = 0, Jt(s = e.node.childNodes[e.offset])) return Jt(e.node.nextSibling) ? null : {
							node: e.node.nextSibling,
							offset: r
						}
					} else if (s = e.node, r = o ? Ft(e.node) : e.offset + 1, Jt(s)) return null;
					return {
						node: s,
						offset: r
					}
				}

				function fe(e) {
					if (e.nextSibling && e.parent === e.nextSibling.parent) return G(e.nextSibling) ? e.nextSibling : fe(e.nextSibling)
				}

				function xe(e, o) {
					return e.node === o.node && e.offset === o.offset
				}

				function Ke(e, o) {
					var s = o && o.isSkipPaddingBlankHTML,
						r = o && o.isNotSplitEdgePoint,
						t = o && o.isDiscardEmptySplits;
					if (t && (s = !0), Ae(e) && (G(e.node) || r)) {
						if (Yt(e)) return e.node;
						if (ce(e)) return e.node.nextSibling
					}
					if (G(e.node)) return e.node.splitText(e.offset);
					var n = e.node.childNodes[e.offset],
						a = Gt(e.node.cloneNode(!1), e.node);
					return me(a, te(n)), s || (pe(e.node), pe(a)), t && (Jt(e.node) && Ce(e.node), Jt(a)) ? (Ce(a), e.node.nextSibling) : a
				}

				function ze(e, o, s) {
					var r = qt(o.node, X.eq(e));
					return r.length ? 1 === r.length ? Ke(o, s) : r.reduce(function(t, n) {
						return t === o.node && (t = Ke(o, s)), Ke({
							node: n,
							offset: t ? _t(t) : Ft(n)
						}, s)
					}) : null
				}

				function Se(e) {
					return document.createElement(e)
				}

				function Ce(e, o) {
					if (e && e.parentNode) {
						if (e.removeNode) return e.removeNode(o);
						var s = e.parentNode;
						if (!o) {
							for (var r = [], t = 0, n = e.childNodes.length; t < n; t++) r.push(e.childNodes[t]);
							for (var a = 0, l = r.length; a < l; a++) s.insertBefore(r[a], e)
						}
						s.removeChild(e)
					}
				}
				var Pe = V("TEXTAREA");

				function oe(e, o) {
					var s = Pe(e[0]) ? e.val() : e.html();
					return o ? s.replace(/[\n\r]/g, "") : s
				}
				const p = {
					NBSP_CHAR: pt,
					ZERO_WIDTH_NBSP_CHAR: "\ufeff",
					blank: ke,
					emptyPara: "<p>".concat(ke, "</p>"),
					makePredByNodeName: V,
					isEditable: U,
					isControlSizing: function(e) {
						return e && v()(e).hasClass("note-control-sizing")
					},
					isText: G,
					isElement: function(e) {
						return e && 1 === e.nodeType
					},
					isVoid: mt,
					isPara: gt,
					isPurePara: function(e) {
						return gt(e) && !Xt(e)
					},
					isHeading: function(e) {
						return e && /^H[1-7]/.test(e.nodeName.toUpperCase())
					},
					isInline: Bt,
					isBlock: X.not(Bt),
					isBodyInline: function(e) {
						return Bt(e) && !Zt(e, gt)
					},
					isBody: Oe,
					isParaInline: function(e) {
						return Bt(e) && !!Zt(e, gt)
					},
					isPre: Vt,
					isList: zt,
					isTable: ee,
					isData: Ot,
					isCell: yt,
					isBlockquote: Ne,
					isBodyContainer: we,
					isAnchor: Ee,
					isDiv: V("DIV"),
					isLi: Xt,
					isBR: V("BR"),
					isSpan: V("SPAN"),
					isB: V("B"),
					isU: V("U"),
					isS: V("S"),
					isI: V("I"),
					isImg: V("IMG"),
					isTextarea: Pe,
					deepestChildIsEmpty: function(e) {
						do {
							if (null === e.firstElementChild || "" === e.firstElementChild.innerHTML) break
						} while (e = e.firstElementChild);
						return Jt(e)
					},
					isEmpty: Jt,
					isEmptyAnchor: X.and(Ee, Jt),
					isClosestSibling: function(e, o) {
						return e.nextSibling === o || e.previousSibling === o
					},
					withClosestSiblings: function(e, o) {
						o = o || X.ok;
						var s = [];
						return e.previousSibling && o(e.previousSibling) && s.push(e.previousSibling), s.push(e), e.nextSibling && o(e.nextSibling) && s.push(e.nextSibling), s
					},
					nodeLength: Ft,
					isLeftEdgePoint: Yt,
					isRightEdgePoint: ce,
					isEdgePoint: Ae,
					isLeftEdgeOf: Fe,
					isRightEdgeOf: Ie,
					isLeftEdgePointOf: function(e, o) {
						return Yt(e) && Fe(e.node, o)
					},
					isRightEdgePointOf: function(e, o) {
						return ce(e) && Ie(e.node, o)
					},
					prevPoint: De,
					nextPoint: je,
					nextPointWithEmptyNode: $e,
					isSamePoint: xe,
					isVisiblePoint: function(e) {
						if (G(e.node) || !ge(e.node) || Jt(e.node)) return !0;
						var o = e.node.childNodes[e.offset - 1],
							s = e.node.childNodes[e.offset];
						return !((o && !mt(o) || s && !mt(s)) && !ee(s))
					},
					prevPointUntil: function(e, o) {
						for (; e;) {
							if (o(e)) return e;
							e = De(e)
						}
						return null
					},
					nextPointUntil: function(e, o) {
						for (; e;) {
							if (o(e)) return e;
							e = je(e)
						}
						return null
					},
					isCharPoint: function(e) {
						if (!G(e.node)) return !1;
						var o = e.node.nodeValue.charAt(e.offset - 1);
						return o && " " !== o && o !== pt
					},
					isSpacePoint: function(e) {
						if (!G(e.node)) return !1;
						var o = e.node.nodeValue.charAt(e.offset - 1);
						return " " === o || o === pt
					},
					walkPoint: function(e, o, s, r) {
						for (var t = e; t && (s(t), !xe(t, o));) t = $e(t, r && e.node !== t.node && o.node !== t.node)
					},
					ancestor: Zt,
					singleChildAncestor: function(e, o) {
						for (e = e.parentNode; e && 1 === Ft(e);) {
							if (o(e)) return e;
							if (U(e)) break;
							e = e.parentNode
						}
						return null
					},
					listAncestor: qt,
					lastAncestor: function(e, o) {
						var s = qt(e);
						return _.last(s.filter(o))
					},
					listNext: te,
					listPrev: function(e, o) {
						o = o || X.fail;
						for (var s = []; e && !o(e);) s.push(e), e = e.previousSibling;
						return s
					},
					listDescendant: function(e, o) {
						var s = [];
						return o = o || X.ok,
							function r(t) {
								e !== t && o(t) && s.push(t);
								for (var n = 0, a = t.childNodes.length; n < a; n++) r(t.childNodes[n])
							}(e), s
					},
					commonAncestor: function(e, o) {
						for (var s = qt(e), r = o; r; r = r.parentNode)
							if (s.indexOf(r) > -1) return r;
						return null
					},
					wrap: function(e, o) {
						var s = e.parentNode,
							r = v()("<" + o + ">")[0];
						return s.insertBefore(r, e), r.appendChild(e), r
					},
					insertAfter: Gt,
					appendChildNodes: me,
					position: _t,
					hasChildren: ge,
					makeOffsetPath: function(e, o) {
						return qt(o, X.eq(e)).map(_t).reverse()
					},
					fromOffsetPath: function(e, o) {
						for (var s = e, r = 0, t = o.length; r < t; r++) s = s.childNodes.length <= o[r] ? s.childNodes[s.childNodes.length - 1] : s.childNodes[o[r]];
						return s
					},
					splitTree: ze,
					splitPoint: function(e, o) {
						var s, r, t = o ? gt : we,
							n = qt(e.node, t),
							a = _.last(n) || e.node;
						t(a) ? (s = n[n.length - 2], r = a) : r = (s = a).parentNode;
						var l = s && ze(s, e, {
							isSkipPaddingBlankHTML: o,
							isNotSplitEdgePoint: o
						});
						return l || r !== e.node || (l = e.node.childNodes[e.offset]), {
							rightNode: l,
							container: r
						}
					},
					create: Se,
					createText: function(e) {
						return document.createTextNode(e)
					},
					remove: Ce,
					removeWhile: function(e, o) {
						for (; e && !U(e) && o(e);) {
							var s = e.parentNode;
							Ce(e), e = s
						}
					},
					replace: function(e, o) {
						if (e.nodeName.toUpperCase() === o.toUpperCase()) return e;
						var s = Se(o);
						return e.style.cssText && (s.style.cssText = e.style.cssText), me(s, _.from(e.childNodes)), Gt(s, e), Ce(e), s
					},
					html: function(e, o) {
						var s = oe(e);
						return o && (s = (s = s.replace(/<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g, function(r, t, n) {
							n = n.toUpperCase();
							var a = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(n) && !!t,
								l = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(n);
							return r + (a || l ? "\n" : "")
						})).trim()), s
					},
					value: oe,
					posFromPlaceholder: function(e) {
						var o = v()(e),
							s = o.offset(),
							r = o.outerHeight(!0);
						return {
							left: s.left,
							top: s.top + r
						}
					},
					attachEvents: function(e, o) {
						Object.keys(o).forEach(function(s) {
							e.on(s, o[s])
						})
					},
					detachEvents: function(e, o) {
						Object.keys(o).forEach(function(s) {
							e.off(s, o[s])
						})
					},
					isCustomStyleTag: function(e) {
						return e && !G(e) && _.contains(e.classList, "note-styletag")
					}
				};
				var C = function() {
					function e(t, n) {
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.$note = t, this.memos = {}, this.modules = {}, this.layoutInfo = {}, this.options = v().extend(!0, {}, n), v().summernote.ui = v().summernote.ui_template(this.options), this.ui = v().summernote.ui, this.initialize()
					}
					var s;
					return s = [{
						key: "initialize",
						value: function() {
							return this.layoutInfo = this.ui.createLayout(this.$note), this._initialize(), this.$note.hide(), this
						}
					}, {
						key: "destroy",
						value: function() {
							this._destroy(), this.$note.removeData("summernote"), this.ui.removeLayout(this.$note, this.layoutInfo)
						}
					}, {
						key: "reset",
						value: function() {
							var t = this.isDisabled();
							this.code(p.emptyPara), this._destroy(), this._initialize(), t && this.disable()
						}
					}, {
						key: "_initialize",
						value: function() {
							var t = this;
							this.options.id = X.uniqueId(v().now()), this.options.container = this.options.container || this.layoutInfo.editor;
							var n = v().extend({}, this.options.buttons);
							Object.keys(n).forEach(function(l) {
								t.memo("button." + l, n[l])
							});
							var a = v().extend({}, this.options.modules, v().summernote.plugins || {});
							Object.keys(a).forEach(function(l) {
								t.module(l, a[l], !0)
							}), Object.keys(this.modules).forEach(function(l) {
								t.initializeModule(l)
							})
						}
					}, {
						key: "_destroy",
						value: function() {
							var t = this;
							Object.keys(this.modules).reverse().forEach(function(n) {
								t.removeModule(n)
							}), Object.keys(this.memos).forEach(function(n) {
								t.removeMemo(n)
							}), this.triggerEvent("destroy", this)
						}
					}, {
						key: "code",
						value: function(t) {
							var n = this.invoke("codeview.isActivated");
							if (void 0 === t) return this.invoke("codeview.sync"), n ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();
							n ? this.invoke("codeview.sync", t) : this.layoutInfo.editable.html(t), this.$note.val(t), this.triggerEvent("change", t, this.layoutInfo.editable)
						}
					}, {
						key: "isDisabled",
						value: function() {
							return "false" === this.layoutInfo.editable.attr("contenteditable")
						}
					}, {
						key: "enable",
						value: function() {
							this.layoutInfo.editable.attr("contenteditable", !0), this.invoke("toolbar.activate", !0), this.triggerEvent("disable", !1), this.options.editing = !0
						}
					}, {
						key: "disable",
						value: function() {
							this.invoke("codeview.isActivated") && this.invoke("codeview.deactivate"), this.layoutInfo.editable.attr("contenteditable", !1), this.options.editing = !1, this.invoke("toolbar.deactivate", !0), this.triggerEvent("disable", !0)
						}
					}, {
						key: "triggerEvent",
						value: function() {
							var t = _.head(arguments),
								n = _.tail(_.from(arguments)),
								a = this.options.callbacks[X.namespaceToCamel(t, "on")];
							a && a.apply(this.$note[0], n), this.$note.trigger("summernote." + t, n)
						}
					}, {
						key: "initializeModule",
						value: function(t) {
							var n = this.modules[t];
							n.shouldInitialize = n.shouldInitialize || X.ok, n.shouldInitialize() && (n.initialize && n.initialize(), n.events && p.attachEvents(this.$note, n.events))
						}
					}, {
						key: "module",
						value: function(t, n, a) {
							if (1 === arguments.length) return this.modules[t];
							this.modules[t] = new n(this), a || this.initializeModule(t)
						}
					}, {
						key: "removeModule",
						value: function(t) {
							var n = this.modules[t];
							n.shouldInitialize() && (n.events && p.detachEvents(this.$note, n.events), n.destroy && n.destroy()), delete this.modules[t]
						}
					}, {
						key: "memo",
						value: function(t, n) {
							if (1 === arguments.length) return this.memos[t];
							this.memos[t] = n
						}
					}, {
						key: "removeMemo",
						value: function(t) {
							this.memos[t] && this.memos[t].destroy && this.memos[t].destroy(), delete this.memos[t]
						}
					}, {
						key: "createInvokeHandlerAndUpdateState",
						value: function(t, n) {
							var a = this;
							return function(l) {
								a.createInvokeHandler(t, n)(l), a.invoke("buttons.updateCurrentStyle")
							}
						}
					}, {
						key: "createInvokeHandler",
						value: function(t, n) {
							var a = this;
							return function(l) {
								l.preventDefault();
								var f = v()(l.target);
								a.invoke(t, n || f.closest("[data-value]").data("value"), f)
							}
						}
					}, {
						key: "invoke",
						value: function() {
							var t = _.head(arguments),
								n = _.tail(_.from(arguments)),
								a = t.split("."),
								l = a.length > 1,
								f = l && _.head(a),
								w = l ? _.last(a) : _.head(a),
								b = this.modules[f || "editor"];
							return !f && this[w] ? this[w].apply(this, n) : b && b[w] && b.shouldInitialize() ? b[w].apply(b, n) : void 0
						}
					}], s && function y(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();

				function L(e, o) {
					var s, r, t = e.parentElement(),
						n = document.body.createTextRange(),
						a = _.from(t.childNodes);
					for (s = 0; s < a.length; s++)
						if (!p.isText(a[s])) {
							if (n.moveToElementText(a[s]), n.compareEndPoints("StartToStart", e) >= 0) break;
							r = a[s]
						} if (0 !== s && p.isText(a[s - 1])) {
						var l = document.body.createTextRange(),
							f = null;
						l.moveToElementText(r || t), l.collapse(!r), f = r ? r.nextSibling : t.firstChild;
						var w = e.duplicate();
						w.setEndPoint("StartToStart", l);
						for (var b = w.text.replace(/[\r\n]/g, "").length; b > f.nodeValue.length && f.nextSibling;) b -= f.nodeValue.length, f = f.nextSibling;
						o && f.nextSibling && p.isText(f.nextSibling) && b === f.nodeValue.length && (b -= f.nodeValue.length, f = f.nextSibling), t = f, s = b
					}
					return {
						cont: t,
						offset: s
					}
				}

				function T(e) {
					var o = document.body.createTextRange(),
						s = function r(t, n) {
							var a, l;
							if (p.isText(t)) {
								var f = p.listPrev(t, X.not(p.isText)),
									w = _.last(f).previousSibling;
								a = w || t.parentNode, n += _.sum(_.tail(f), p.nodeLength), l = !w
							} else {
								if (p.isText(a = t.childNodes[n] || t)) return r(a, 0);
								n = 0, l = !1
							}
							return {
								node: a,
								collapseToStart: l,
								offset: n
							}
						}(e.node, e.offset);
					return o.moveToElementText(s.node), o.collapse(s.collapseToStart), o.moveStart("character", s.offset), o
				}
				v().fn.extend({
					summernote: function() {
						var e = v().type(_.head(arguments)),
							o = "string" === e,
							s = "object" === e,
							r = v().extend({}, v().summernote.options, s ? _.head(arguments) : {});
						r.langInfo = v().extend(!0, {}, v().summernote.lang["en-US"], v().summernote.lang[r.lang]), r.icons = v().extend(!0, {}, v().summernote.options.icons, r.icons), r.tooltip = "auto" === r.tooltip ? !wt.isSupportTouch : r.tooltip, this.each(function(a, l) {
							var f = v()(l);
							if (!f.data("summernote")) {
								var w = new C(f, r);
								f.data("summernote", w), f.data("summernote").triggerEvent("init", w.layoutInfo)
							}
						});
						var t = this.first();
						if (t.length) {
							var n = t.data("summernote");
							if (o) return n.invoke.apply(n, _.from(arguments));
							r.focus && n.invoke("editor.focus")
						}
						return this
					}
				});
				var D = function() {
					function e(t, n, a, l) {
						(function(f, w) {
							if (!(f instanceof w)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.sc = t, this.so = n, this.ec = a, this.eo = l, this.isOnEditable = this.makeIsOn(p.isEditable), this.isOnList = this.makeIsOn(p.isList), this.isOnAnchor = this.makeIsOn(p.isAnchor), this.isOnCell = this.makeIsOn(p.isCell), this.isOnData = this.makeIsOn(p.isData)
					}
					var s;
					return (s = [{
						key: "nativeRange",
						value: function() {
							if (wt.isW3CRangeSupport) {
								var t = document.createRange();
								return t.setStart(this.sc, this.so), t.setEnd(this.ec, this.eo), t
							}
							var n = T({
								node: this.sc,
								offset: this.so
							});
							return n.setEndPoint("EndToEnd", T({
								node: this.ec,
								offset: this.eo
							})), n
						}
					}, {
						key: "getPoints",
						value: function() {
							return {
								sc: this.sc,
								so: this.so,
								ec: this.ec,
								eo: this.eo
							}
						}
					}, {
						key: "getStartPoint",
						value: function() {
							return {
								node: this.sc,
								offset: this.so
							}
						}
					}, {
						key: "getEndPoint",
						value: function() {
							return {
								node: this.ec,
								offset: this.eo
							}
						}
					}, {
						key: "select",
						value: function() {
							var t = this.nativeRange();
							if (wt.isW3CRangeSupport) {
								var n = document.getSelection();
								n.rangeCount > 0 && n.removeAllRanges(), n.addRange(t)
							} else t.select();
							return this
						}
					}, {
						key: "scrollIntoView",
						value: function(t) {
							var n = v()(t).height();
							return t.scrollTop + n < this.sc.offsetTop && (t.scrollTop += Math.abs(t.scrollTop + n - this.sc.offsetTop)), this
						}
					}, {
						key: "normalize",
						value: function() {
							var t = function(l, f) {
									if (!l || p.isVisiblePoint(l) && (!p.isEdgePoint(l) || p.isRightEdgePoint(l) && !f || p.isLeftEdgePoint(l) && f || p.isRightEdgePoint(l) && f && p.isVoid(l.node.nextSibling) || p.isLeftEdgePoint(l) && !f && p.isVoid(l.node.previousSibling) || p.isBlock(l.node) && p.isEmpty(l.node))) return l;
									var w = p.ancestor(l.node, p.isBlock),
										b = !1;
									if (!b) {
										var N = p.prevPoint(l) || {
											node: null
										};
										b = (p.isLeftEdgePointOf(l, w) || p.isVoid(N.node)) && !f
									}
									var P = !1;
									if (!P) {
										var R = p.nextPoint(l) || {
											node: null
										};
										P = (p.isRightEdgePointOf(l, w) || p.isVoid(R.node)) && f
									}
									if (b || P) {
										if (p.isVisiblePoint(l)) return l;
										f = !f
									}
									return (f ? p.nextPointUntil(p.nextPoint(l), p.isVisiblePoint) : p.prevPointUntil(p.prevPoint(l), p.isVisiblePoint)) || l
								},
								n = t(this.getEndPoint(), !1),
								a = this.isCollapsed() ? n : t(this.getStartPoint(), !0);
							return new e(a.node, a.offset, n.node, n.offset)
						}
					}, {
						key: "nodes",
						value: function(t, n) {
							t = t || X.ok;
							var a = n && n.includeAncestor,
								l = n && n.fullyContains,
								f = this.getStartPoint(),
								w = this.getEndPoint(),
								b = [],
								N = [];
							return p.walkPoint(f, w, function(P) {
								var R;
								p.isEditable(P.node) || (l ? (p.isLeftEdgePoint(P) && N.push(P.node), p.isRightEdgePoint(P) && _.contains(N, P.node) && (R = P.node)) : R = a ? p.ancestor(P.node, t) : P.node, R && t(R) && b.push(R))
							}, !0), _.unique(b)
						}
					}, {
						key: "commonAncestor",
						value: function() {
							return p.commonAncestor(this.sc, this.ec)
						}
					}, {
						key: "expand",
						value: function(t) {
							var n = p.ancestor(this.sc, t),
								a = p.ancestor(this.ec, t);
							if (!n && !a) return new e(this.sc, this.so, this.ec, this.eo);
							var l = this.getPoints();
							return n && (l.sc = n, l.so = 0), a && (l.ec = a, l.eo = p.nodeLength(a)), new e(l.sc, l.so, l.ec, l.eo)
						}
					}, {
						key: "collapse",
						value: function(t) {
							return t ? new e(this.sc, this.so, this.sc, this.so) : new e(this.ec, this.eo, this.ec, this.eo)
						}
					}, {
						key: "splitText",
						value: function() {
							var t = this.sc === this.ec,
								n = this.getPoints();
							return p.isText(this.ec) && !p.isEdgePoint(this.getEndPoint()) && this.ec.splitText(this.eo), p.isText(this.sc) && !p.isEdgePoint(this.getStartPoint()) && (n.sc = this.sc.splitText(this.so), n.so = 0, t && (n.ec = n.sc, n.eo = this.eo - this.so)), new e(n.sc, n.so, n.ec, n.eo)
						}
					}, {
						key: "deleteContents",
						value: function() {
							if (this.isCollapsed()) return this;
							var t = this.splitText(),
								n = t.nodes(null, {
									fullyContains: !0
								}),
								a = p.prevPointUntil(t.getStartPoint(), function(f) {
									return !_.contains(n, f.node)
								}),
								l = [];
							return v().each(n, function(f, w) {
								var b = w.parentNode;
								a.node !== b && 1 === p.nodeLength(b) && l.push(b), p.remove(w, !1)
							}), v().each(l, function(f, w) {
								p.remove(w, !1)
							}), new e(a.node, a.offset, a.node, a.offset).normalize()
						}
					}, {
						key: "makeIsOn",
						value: function(t) {
							return function() {
								var n = p.ancestor(this.sc, t);
								return !!n && n === p.ancestor(this.ec, t)
							}
						}
					}, {
						key: "isLeftEdgeOf",
						value: function(t) {
							if (!p.isLeftEdgePoint(this.getStartPoint())) return !1;
							var n = p.ancestor(this.sc, t);
							return n && p.isLeftEdgeOf(this.sc, n)
						}
					}, {
						key: "isCollapsed",
						value: function() {
							return this.sc === this.ec && this.so === this.eo
						}
					}, {
						key: "wrapBodyInlineWithPara",
						value: function() {
							if (p.isBodyContainer(this.sc) && p.isEmpty(this.sc)) return this.sc.innerHTML = p.emptyPara, new e(this.sc.firstChild, 0, this.sc.firstChild, 0);
							var t, n = this.normalize();
							if (p.isParaInline(this.sc) || p.isPara(this.sc)) return n;
							if (p.isInline(n.sc)) {
								var a = p.listAncestor(n.sc, X.not(p.isInline));
								t = _.last(a), p.isInline(t) || (t = a[a.length - 2] || n.sc.childNodes[n.so])
							} else t = n.sc.childNodes[n.so > 0 ? n.so - 1 : 0];
							if (t) {
								var l = p.listPrev(t, p.isParaInline).reverse();
								if ((l = l.concat(p.listNext(t.nextSibling, p.isParaInline))).length) {
									var f = p.wrap(_.head(l), "p");
									p.appendChildNodes(f, _.tail(l))
								}
							}
							return this.normalize()
						}
					}, {
						key: "insertNode",
						value: function(t) {
							var n = this;
							(p.isText(t) || p.isInline(t)) && (n = this.wrapBodyInlineWithPara().deleteContents());
							var a = p.splitPoint(n.getStartPoint(), p.isInline(t));
							return a.rightNode ? (a.rightNode.parentNode.insertBefore(t, a.rightNode), p.isEmpty(a.rightNode) && p.isPara(t) && a.rightNode.parentNode.removeChild(a.rightNode)) : a.container.appendChild(t), t
						}
					}, {
						key: "pasteHTML",
						value: function(t) {
							t = v().trim(t);
							var n = v()("<div></div>").html(t)[0],
								a = _.from(n.childNodes),
								l = this,
								f = !1;
							return l.so >= 0 && (a = a.reverse(), f = !0), a = a.map(function(w) {
								return l.insertNode(w)
							}), f && (a = a.reverse()), a
						}
					}, {
						key: "toString",
						value: function() {
							var t = this.nativeRange();
							return wt.isW3CRangeSupport ? t.toString() : t.text
						}
					}, {
						key: "getWordRange",
						value: function(t) {
							var n = this.getEndPoint();
							if (!p.isCharPoint(n)) return this;
							var a = p.prevPointUntil(n, function(l) {
								return !p.isCharPoint(l)
							});
							return t && (n = p.nextPointUntil(n, function(l) {
								return !p.isCharPoint(l)
							})), new e(a.node, a.offset, n.node, n.offset)
						}
					}, {
						key: "getWordsRange",
						value: function(t) {
							var n = this.getEndPoint(),
								a = function(f) {
									return !p.isCharPoint(f) && !p.isSpacePoint(f)
								};
							if (a(n)) return this;
							var l = p.prevPointUntil(n, a);
							return t && (n = p.nextPointUntil(n, a)), new e(l.node, l.offset, n.node, n.offset)
						}
					}, {
						key: "getWordsMatchRange",
						value: function(t) {
							var n = this.getEndPoint(),
								a = p.prevPointUntil(n, function(b) {
									if (!p.isCharPoint(b) && !p.isSpacePoint(b)) return !0;
									var N = new e(b.node, b.offset, n.node, n.offset),
										P = t.exec(N.toString());
									return P && 0 === P.index
								}),
								l = new e(a.node, a.offset, n.node, n.offset),
								f = l.toString(),
								w = t.exec(f);
							return w && w[0].length === f.length ? l : null
						}
					}, {
						key: "bookmark",
						value: function(t) {
							return {
								s: {
									path: p.makeOffsetPath(t, this.sc),
									offset: this.so
								},
								e: {
									path: p.makeOffsetPath(t, this.ec),
									offset: this.eo
								}
							}
						}
					}, {
						key: "paraBookmark",
						value: function(t) {
							return {
								s: {
									path: _.tail(p.makeOffsetPath(_.head(t), this.sc)),
									offset: this.so
								},
								e: {
									path: _.tail(p.makeOffsetPath(_.last(t), this.ec)),
									offset: this.eo
								}
							}
						}
					}, {
						key: "getClientRects",
						value: function() {
							return this.nativeRange().getClientRects()
						}
					}]) && function S(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				const d = {
					create: function(e, o, s, r) {
						if (4 === arguments.length) return new D(e, o, s, r);
						if (2 === arguments.length) return new D(e, o, s = e, r = o);
						var t = this.createFromSelection();
						if (!t && 1 === arguments.length) {
							var n = arguments[0];
							return p.isEditable(n) && (n = n.lastChild), this.createFromBodyElement(n, p.emptyPara === arguments[0].innerHTML)
						}
						return t
					},
					createFromBodyElement: function(e) {
						var o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
							s = this.createFromNode(e);
						return s.collapse(o)
					},
					createFromSelection: function() {
						var e, o, s, r;
						if (wt.isW3CRangeSupport) {
							var t = document.getSelection();
							if (!t || 0 === t.rangeCount || p.isBody(t.anchorNode)) return null;
							var n = t.getRangeAt(0);
							e = n.startContainer, o = n.startOffset, s = n.endContainer, r = n.endOffset
						} else {
							var a = document.selection.createRange(),
								l = a.duplicate();
							l.collapse(!1);
							var f = a;
							f.collapse(!0);
							var w = L(f, !0),
								b = L(l, !1);
							p.isText(w.node) && p.isLeftEdgePoint(w) && p.isTextNode(b.node) && p.isRightEdgePoint(b) && b.node.nextSibling === w.node && (w = b), e = w.cont, o = w.offset, s = b.cont, r = b.offset
						}
						return new D(e, o, s, r)
					},
					createFromNode: function(e) {
						var o = e,
							s = 0,
							r = e,
							t = p.nodeLength(r);
						return p.isVoid(o) && (s = p.listPrev(o).length - 1, o = o.parentNode), p.isBR(r) ? (t = p.listPrev(r).length - 1, r = r.parentNode) : p.isVoid(r) && (t = p.listPrev(r).length, r = r.parentNode), this.create(o, s, r, t)
					},
					createFromNodeBefore: function(e) {
						return this.createFromNode(e).collapse(!0)
					},
					createFromNodeAfter: function(e) {
						return this.createFromNode(e).collapse()
					},
					createFromBookmark: function(e, o) {
						var s = p.fromOffsetPath(e, o.s.path),
							r = o.s.offset,
							t = p.fromOffsetPath(e, o.e.path);
						return new D(s, r, t, o.e.offset)
					},
					createFromParaBookmark: function(e, o) {
						var s = e.s.offset,
							r = e.e.offset,
							t = p.fromOffsetPath(_.head(o), e.s.path),
							n = p.fromOffsetPath(_.last(o), e.e.path);
						return new D(t, s, n, r)
					}
				};
				var h = {
					BACKSPACE: 8,
					TAB: 9,
					ENTER: 13,
					ESCAPE: 27,
					SPACE: 32,
					DELETE: 46,
					LEFT: 37,
					UP: 38,
					RIGHT: 39,
					DOWN: 40,
					NUM0: 48,
					NUM1: 49,
					NUM2: 50,
					NUM3: 51,
					NUM4: 52,
					NUM5: 53,
					NUM6: 54,
					NUM7: 55,
					NUM8: 56,
					B: 66,
					E: 69,
					I: 73,
					J: 74,
					K: 75,
					L: 76,
					R: 82,
					S: 83,
					U: 85,
					V: 86,
					Y: 89,
					Z: 90,
					SLASH: 191,
					LEFTBRACKET: 219,
					BACKSLASH: 220,
					RIGHTBRACKET: 221,
					HOME: 36,
					END: 35,
					PAGEUP: 33,
					PAGEDOWN: 34
				};
				const m = {
					isEdit: function(e) {
						return _.contains([h.BACKSPACE, h.TAB, h.ENTER, h.SPACE, h.DELETE], e)
					},
					isMove: function(e) {
						return _.contains([h.LEFT, h.UP, h.RIGHT, h.DOWN], e)
					},
					isNavigation: function(e) {
						return _.contains([h.HOME, h.END, h.PAGEUP, h.PAGEDOWN], e)
					},
					nameFromCode: X.invertObject(h),
					code: h
				};
				var $ = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.stack = [], this.stackOffset = -1, this.context = t, this.$editable = t.layoutInfo.editable, this.editable = this.$editable[0]
					}
					var s;
					return (s = [{
						key: "makeSnapshot",
						value: function() {
							var t = d.create(this.editable);
							return {
								contents: this.$editable.html(),
								bookmark: t && t.isOnEditable() ? t.bookmark(this.editable) : {
									s: {
										path: [],
										offset: 0
									},
									e: {
										path: [],
										offset: 0
									}
								}
							}
						}
					}, {
						key: "applySnapshot",
						value: function(t) {
							null !== t.contents && this.$editable.html(t.contents), null !== t.bookmark && d.createFromBookmark(this.editable, t.bookmark).select()
						}
					}, {
						key: "rewind",
						value: function() {
							this.$editable.html() !== this.stack[this.stackOffset].contents && this.recordUndo(), this.stackOffset = 0, this.applySnapshot(this.stack[this.stackOffset])
						}
					}, {
						key: "commit",
						value: function() {
							this.stack = [], this.stackOffset = -1, this.recordUndo()
						}
					}, {
						key: "reset",
						value: function() {
							this.stack = [], this.stackOffset = -1, this.$editable.html(""), this.recordUndo()
						}
					}, {
						key: "undo",
						value: function() {
							this.$editable.html() !== this.stack[this.stackOffset].contents && this.recordUndo(), this.stackOffset > 0 && (this.stackOffset--, this.applySnapshot(this.stack[this.stackOffset]))
						}
					}, {
						key: "redo",
						value: function() {
							this.stack.length - 1 > this.stackOffset && (this.stackOffset++, this.applySnapshot(this.stack[this.stackOffset]))
						}
					}, {
						key: "recordUndo",
						value: function() {
							this.stackOffset++, this.stack.length > this.stackOffset && (this.stack = this.stack.slice(0, this.stackOffset)), this.stack.push(this.makeSnapshot()), this.stack.length > this.context.options.historyLimit && (this.stack.shift(), this.stackOffset -= 1)
						}
					}]) && function A(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var W = function() {
					function e() {
						! function(t, n) {
							if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
						}(this, e)
					}
					var s;
					return (s = [{
						key: "jQueryCSS",
						value: function(t, n) {
							var a = {};
							return v().each(n, function(l, f) {
								a[f] = t.css(f)
							}), a
						}
					}, {
						key: "fromNode",
						value: function(t) {
							var n = this.jQueryCSS(t, ["font-family", "font-size", "text-align", "list-style-type", "line-height"]) || {},
								a = t[0].style.fontSize || n["font-size"];
							return n["font-size"] = parseInt(a, 10), n["font-size-unit"] = a.match(/[a-z%]+$/), n
						}
					}, {
						key: "stylePara",
						value: function(t, n) {
							v().each(t.nodes(p.isPara, {
								includeAncestor: !0
							}), function(a, l) {
								v()(l).css(n)
							})
						}
					}, {
						key: "styleNodes",
						value: function(t, n) {
							t = t.splitText();
							var a = n && n.nodeName || "SPAN",
								l = !(!n || !n.expandClosestSibling),
								f = !(!n || !n.onlyPartialContains);
							if (t.isCollapsed()) return [t.insertNode(p.create(a))];
							var w = p.makePredByNodeName(a),
								b = t.nodes(p.isText, {
									fullyContains: !0
								}).map(function(P) {
									return p.singleChildAncestor(P, w) || p.wrap(P, a)
								});
							if (l) {
								if (f) {
									var N = t.nodes();
									w = X.and(w, function(P) {
										return _.contains(N, P)
									})
								}
								return b.map(function(P) {
									var R = p.withClosestSiblings(P, w),
										B = _.head(R),
										H = _.tail(R);
									return v().each(H, function(Y, ht) {
										p.appendChildNodes(B, ht.childNodes), p.remove(ht)
									}), _.head(R)
								})
							}
							return b
						}
					}, {
						key: "current",
						value: function(t) {
							var n = v()(p.isElement(t.sc) ? t.sc : t.sc.parentNode),
								a = this.fromNode(n);
							try {
								a = v().extend(a, {
									"font-bold": document.queryCommandState("bold") ? "bold" : "normal",
									"font-italic": document.queryCommandState("italic") ? "italic" : "normal",
									"font-underline": document.queryCommandState("underline") ? "underline" : "normal",
									"font-subscript": document.queryCommandState("subscript") ? "subscript" : "normal",
									"font-superscript": document.queryCommandState("superscript") ? "superscript" : "normal",
									"font-strikethrough": document.queryCommandState("strikethrough") ? "strikethrough" : "normal",
									"font-family": document.queryCommandValue("fontname") || a["font-family"]
								})
							} catch (b) {}
							if (t.isOnList()) {
								var l = ["circle", "disc", "disc-leading-zero", "square"].indexOf(a["list-style-type"]) > -1;
								a["list-style"] = l ? "unordered" : "ordered"
							} else a["list-style"] = "none";
							var f = p.ancestor(t.sc, p.isPara);
							if (f && f.style["line-height"]) a["line-height"] = f.style.lineHeight;
							else {
								var w = parseInt(a["line-height"], 10) / parseInt(a["font-size"], 10);
								a["line-height"] = w.toFixed(1)
							}
							return a.anchor = t.isOnAnchor() && p.ancestor(t.sc, p.isAnchor), a.ancestors = p.listAncestor(t.sc, p.isEditable), a.range = t, a
						}
					}]) && function O(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var z = function() {
					function e() {
						! function(t, n) {
							if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
						}(this, e)
					}
					var s;
					return (s = [{
						key: "insertOrderedList",
						value: function(t) {
							this.toggleList("OL", t)
						}
					}, {
						key: "insertUnorderedList",
						value: function(t) {
							this.toggleList("UL", t)
						}
					}, {
						key: "indent",
						value: function(t) {
							var n = this,
								a = d.create(t).wrapBodyInlineWithPara(),
								l = a.nodes(p.isPara, {
									includeAncestor: !0
								}),
								f = _.clusterBy(l, X.peq2("parentNode"));
							v().each(f, function(w, b) {
								var N = _.head(b);
								if (p.isLi(N)) {
									var P = n.findList(N.previousSibling);
									P ? b.map(function(R) {
										return P.appendChild(R)
									}) : (n.wrapList(b, N.parentNode.nodeName), b.map(function(R) {
										return R.parentNode
									}).map(function(R) {
										return n.appendToPrevious(R)
									}))
								} else v().each(b, function(R, B) {
									v()(B).css("marginLeft", function(H, Y) {
										return (parseInt(Y, 10) || 0) + 25
									})
								})
							}), a.select()
						}
					}, {
						key: "outdent",
						value: function(t) {
							var n = this,
								a = d.create(t).wrapBodyInlineWithPara(),
								l = a.nodes(p.isPara, {
									includeAncestor: !0
								}),
								f = _.clusterBy(l, X.peq2("parentNode"));
							v().each(f, function(w, b) {
								var N = _.head(b);
								p.isLi(N) ? n.releaseList([b]) : v().each(b, function(P, R) {
									v()(R).css("marginLeft", function(B, H) {
										return (H = parseInt(H, 10) || 0) > 25 ? H - 25 : ""
									})
								})
							}), a.select()
						}
					}, {
						key: "toggleList",
						value: function(t, n) {
							var a = this,
								l = d.create(n).wrapBodyInlineWithPara(),
								f = l.nodes(p.isPara, {
									includeAncestor: !0
								}),
								w = l.paraBookmark(f),
								b = _.clusterBy(f, X.peq2("parentNode"));
							if (_.find(f, p.isPurePara)) {
								var N = [];
								v().each(b, function(R, B) {
									N = N.concat(a.wrapList(B, t))
								}), f = N
							} else {
								var P = l.nodes(p.isList, {
									includeAncestor: !0
								}).filter(function(R) {
									return !v().nodeName(R, t)
								});
								P.length ? v().each(P, function(R, B) {
									p.replace(B, t)
								}) : f = this.releaseList(b, !0)
							}
							d.createFromParaBookmark(w, f).select()
						}
					}, {
						key: "wrapList",
						value: function(t, n) {
							var a = _.head(t),
								l = _.last(t),
								f = p.isList(a.previousSibling) && a.previousSibling,
								w = p.isList(l.nextSibling) && l.nextSibling,
								b = f || p.insertAfter(p.create(n || "UL"), l);
							return t = t.map(function(N) {
								return p.isPurePara(N) ? p.replace(N, "LI") : N
							}), p.appendChildNodes(b, t), w && (p.appendChildNodes(b, _.from(w.childNodes)), p.remove(w)), t
						}
					}, {
						key: "releaseList",
						value: function(t, n) {
							var a = this,
								l = [];
							return v().each(t, function(f, w) {
								var b = _.head(w),
									N = _.last(w),
									P = n ? p.lastAncestor(b, p.isList) : b.parentNode,
									R = P.parentNode;
								if ("LI" === P.parentNode.nodeName) w.map(function(ht) {
									var xt = a.findNextSiblings(ht);
									R.nextSibling ? R.parentNode.insertBefore(ht, R.nextSibling) : R.parentNode.appendChild(ht), xt.length && (a.wrapList(xt, P.nodeName), ht.appendChild(xt[0].parentNode))
								}), 0 === P.children.length && R.removeChild(P), 0 === R.childNodes.length && R.parentNode.removeChild(R);
								else {
									var B = P.childNodes.length > 1 ? p.splitTree(P, {
											node: N.parentNode,
											offset: p.position(N) + 1
										}, {
											isSkipPaddingBlankHTML: !0
										}) : null,
										H = p.splitTree(P, {
											node: b.parentNode,
											offset: p.position(b)
										}, {
											isSkipPaddingBlankHTML: !0
										});
									w = n ? p.listDescendant(H, p.isLi) : _.from(H.childNodes).filter(p.isLi), !n && p.isList(P.parentNode) || (w = w.map(function(ht) {
										return p.replace(ht, "P")
									})), v().each(_.from(w).reverse(), function(ht, xt) {
										p.insertAfter(xt, P)
									});
									var Y = _.compact([P, H, B]);
									v().each(Y, function(ht, xt) {
										var he = [xt].concat(p.listDescendant(xt, p.isList));
										v().each(he.reverse(), function(Re, le) {
											p.nodeLength(le) || p.remove(le, !0)
										})
									})
								}
								l = l.concat(w)
							}), l
						}
					}, {
						key: "appendToPrevious",
						value: function(t) {
							return t.previousSibling ? p.appendChildNodes(t.previousSibling, [t]) : this.wrapList([t], "LI")
						}
					}, {
						key: "findList",
						value: function(t) {
							return t ? _.find(t.children, function(n) {
								return ["OL", "UL"].indexOf(n.nodeName) > -1
							}) : null
						}
					}, {
						key: "findNextSiblings",
						value: function(t) {
							for (var n = []; t.nextSibling;) n.push(t.nextSibling), t = t.nextSibling;
							return n
						}
					}]) && function M(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var J = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.bullet = new z, this.options = t.options
					}
					var s;
					return (s = [{
						key: "insertTab",
						value: function(t, n) {
							var a = p.createText(new Array(n + 1).join(p.NBSP_CHAR));
							(t = t.deleteContents()).insertNode(a, !0), (t = d.create(a, n)).select()
						}
					}, {
						key: "insertParagraph",
						value: function(t, n) {
							n = (n = (n = n || d.create(t)).deleteContents()).wrapBodyInlineWithPara();
							var a, l = p.ancestor(n.sc, p.isPara);
							if (l) {
								if (p.isLi(l) && (p.isEmpty(l) || p.deepestChildIsEmpty(l))) return void this.bullet.toggleList(l.parentNode.nodeName);
								var f = null;
								if (1 === this.options.blockquoteBreakingLevel ? f = p.ancestor(l, p.isBlockquote) : 2 === this.options.blockquoteBreakingLevel && (f = p.lastAncestor(l, p.isBlockquote)), f) {
									a = v()(p.emptyPara)[0], p.isRightEdgePoint(n.getStartPoint()) && p.isBR(n.sc.nextSibling) && v()(n.sc.nextSibling).remove();
									var w = p.splitTree(f, n.getStartPoint(), {
										isDiscardEmptySplits: !0
									});
									w ? w.parentNode.insertBefore(a, w) : p.insertAfter(a, f)
								} else {
									a = p.splitTree(l, n.getStartPoint());
									var b = p.listDescendant(l, p.isEmptyAnchor);
									b = b.concat(p.listDescendant(a, p.isEmptyAnchor)), v().each(b, function(P, R) {
										p.remove(R)
									}), (p.isHeading(a) || p.isPre(a) || p.isCustomStyleTag(a)) && p.isEmpty(a) && (a = p.replace(a, "p"))
								}
							} else {
								var N = n.sc.childNodes[n.so];
								a = v()(p.emptyPara)[0], N ? n.sc.insertBefore(a, N) : n.sc.appendChild(a)
							}
							d.create(a, 0).normalize().select().scrollIntoView(t)
						}
					}]) && function tt(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var Z = function e(o, s, r, t) {
					var n = {
							colPos: 0,
							rowPos: 0
						},
						a = [],
						l = [];

					function f(H, Y, ht, xt, he, Re, le) {
						var Te = {
							baseRow: ht,
							baseCell: xt,
							isRowSpan: he,
							isColSpan: Re,
							isVirtual: le
						};
						a[H] || (a[H] = []), a[H][Y] = Te
					}

					function w(H, Y, ht, xt) {
						return {
							baseCell: H.baseCell,
							action: Y,
							virtualTable: {
								rowIndex: ht,
								cellIndex: xt
							}
						}
					}

					function b(H, Y) {
						if (!a[H] || !a[H][Y]) return Y;
						for (var ht = Y; a[H][ht];)
							if (ht++, !a[H][ht]) return ht
					}

					function N(H, Y) {
						var ht = b(H.rowIndex, Y.cellIndex),
							xt = Y.colSpan > 1,
							he = Y.rowSpan > 1,
							Re = H.rowIndex === n.rowPos && Y.cellIndex === n.colPos;
						f(H.rowIndex, ht, H, Y, he, xt, !1);
						var le = Y.attributes.rowSpan ? parseInt(Y.attributes.rowSpan.value, 10) : 0;
						if (le > 1)
							for (var Te = 1; Te < le; Te++) {
								var Ye = H.rowIndex + Te;
								P(Ye, ht, Y, Re), f(Ye, ht, H, Y, !0, xt, !0)
							}
						var an = Y.attributes.colSpan ? parseInt(Y.attributes.colSpan.value, 10) : 0;
						if (an > 1)
							for (var Cn = 1; Cn < an; Cn++) {
								var vn = b(H.rowIndex, ht + Cn);
								P(H.rowIndex, vn, Y, Re), f(H.rowIndex, vn, H, Y, he, !0, !0)
							}
					}

					function P(H, Y, ht, xt) {
						H === n.rowPos && n.colPos >= ht.cellIndex && ht.cellIndex <= Y && !xt && n.colPos++
					}

					function R(H) {
						switch (s) {
							case e.where.Column:
								if (H.isColSpan) return e.resultAction.SubtractSpanCount;
								break;
							case e.where.Row:
								if (!H.isVirtual && H.isRowSpan) return e.resultAction.AddCell;
								if (H.isRowSpan) return e.resultAction.SubtractSpanCount
						}
						return e.resultAction.RemoveCell
					}

					function B(H) {
						switch (s) {
							case e.where.Column:
								if (H.isColSpan) return e.resultAction.SumSpanCount;
								if (H.isRowSpan && H.isVirtual) return e.resultAction.Ignore;
								break;
							case e.where.Row:
								if (H.isRowSpan) return e.resultAction.SumSpanCount;
								if (H.isColSpan && H.isVirtual) return e.resultAction.Ignore
						}
						return e.resultAction.AddCell
					}
					this.getActionList = function() {
							for (var H = s === e.where.Row ? n.rowPos : -1, Y = s === e.where.Column ? n.colPos : -1, ht = 0, xt = !0; xt;) {
								var he = H >= 0 ? H : ht,
									Re = Y >= 0 ? Y : ht,
									le = a[he];
								if (!le) return xt = !1, l;
								var Te = le[Re];
								if (!Te) return xt = !1, l;
								var Ye = e.resultAction.Ignore;
								switch (r) {
									case e.requestAction.Add:
										Ye = B(Te);
										break;
									case e.requestAction.Delete:
										Ye = R(Te)
								}
								l.push(w(Te, Ye, he, Re)), ht++
							}
							return l
						}, o && o.tagName && ("td" === o.tagName.toLowerCase() || "th" === o.tagName.toLowerCase()) && (n.colPos = o.cellIndex, o.parentElement && o.parentElement.tagName && "tr" === o.parentElement.tagName.toLowerCase() && (n.rowPos = o.parentElement.rowIndex)),
						function() {
							for (var H = t.rows, Y = 0; Y < H.length; Y++)
								for (var ht = H[Y].cells, xt = 0; xt < ht.length; xt++) N(H[Y], ht[xt])
						}()
				};
				Z.where = {
					Row: 0,
					Column: 1
				}, Z.requestAction = {
					Add: 0,
					Delete: 1
				}, Z.resultAction = {
					Ignore: 0,
					SubtractSpanCount: 1,
					RemoveCell: 2,
					AddCell: 3,
					SumSpanCount: 4
				};
				var st = function() {
					function e() {
						! function(t, n) {
							if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
						}(this, e)
					}
					var s;
					return (s = [{
						key: "tab",
						value: function(t, n) {
							var a = p.ancestor(t.commonAncestor(), p.isCell),
								l = p.ancestor(a, p.isTable),
								f = p.listDescendant(l, p.isCell),
								w = _[n ? "prev" : "next"](f, a);
							w && d.create(w, 0).select()
						}
					}, {
						key: "addRow",
						value: function(t, n) {
							for (var a = p.ancestor(t.commonAncestor(), p.isCell), l = v()(a).closest("tr"), f = this.recoverAttributes(l), w = v()("<tr" + f + "></tr>"), b = new Z(a, Z.where.Row, Z.requestAction.Add, v()(l).closest("table")[0]).getActionList(), N = 0; N < b.length; N++) {
								var P = b[N],
									R = this.recoverAttributes(P.baseCell);
								switch (P.action) {
									case Z.resultAction.AddCell:
										w.append("<td" + R + ">" + p.blank + "</td>");
										break;
									case Z.resultAction.SumSpanCount:
										if ("top" === n && (P.baseCell.parent ? P.baseCell.closest("tr").rowIndex : 0) <= l[0].rowIndex) {
											var B = v()("<div></div>").append(v()("<td" + R + ">" + p.blank + "</td>").removeAttr("rowspan")).html();
											w.append(B);
											break
										}
										var H = parseInt(P.baseCell.rowSpan, 10);
										H++, P.baseCell.setAttribute("rowSpan", H)
								}
							}
							if ("top" === n) l.before(w);
							else {
								if (a.rowSpan > 1) {
									var Y = l[0].rowIndex + (a.rowSpan - 2);
									return void v()(v()(l).parent().find("tr")[Y]).after(v()(w))
								}
								l.after(w)
							}
						}
					}, {
						key: "addCol",
						value: function(t, n) {
							var a = p.ancestor(t.commonAncestor(), p.isCell),
								l = v()(a).closest("tr");
							v()(l).siblings().push(l);
							for (var f = new Z(a, Z.where.Column, Z.requestAction.Add, v()(l).closest("table")[0]).getActionList(), w = 0; w < f.length; w++) {
								var b = f[w],
									N = this.recoverAttributes(b.baseCell);
								switch (b.action) {
									case Z.resultAction.AddCell:
										"right" === n ? v()(b.baseCell).after("<td" + N + ">" + p.blank + "</td>") : v()(b.baseCell).before("<td" + N + ">" + p.blank + "</td>");
										break;
									case Z.resultAction.SumSpanCount:
										if ("right" === n) {
											var P = parseInt(b.baseCell.colSpan, 10);
											P++, b.baseCell.setAttribute("colSpan", P)
										} else v()(b.baseCell).before("<td" + N + ">" + p.blank + "</td>")
								}
							}
						}
					}, {
						key: "recoverAttributes",
						value: function(t) {
							var n = "";
							if (!t) return n;
							for (var a = t.attributes || [], l = 0; l < a.length; l++) "id" !== a[l].name.toLowerCase() && a[l].specified && (n += " " + a[l].name + "='" + a[l].value + "'");
							return n
						}
					}, {
						key: "deleteRow",
						value: function(t) {
							for (var n = p.ancestor(t.commonAncestor(), p.isCell), a = v()(n).closest("tr"), l = a.children("td, th").index(v()(n)), f = a[0].rowIndex, w = new Z(n, Z.where.Row, Z.requestAction.Delete, v()(a).closest("table")[0]).getActionList(), b = 0; b < w.length; b++)
								if (w[b]) {
									var N = w[b].baseCell,
										P = w[b].virtualTable,
										R = N.rowSpan && N.rowSpan > 1,
										B = R ? parseInt(N.rowSpan, 10) : 0;
									switch (w[b].action) {
										case Z.resultAction.Ignore:
											continue;
										case Z.resultAction.AddCell:
											var H = a.next("tr")[0];
											if (!H) continue;
											var Y = a[0].cells[l];
											R && (B > 2 ? (B--, H.insertBefore(Y, H.cells[l]), H.cells[l].setAttribute("rowSpan", B), H.cells[l].innerHTML = "") : 2 === B && (H.insertBefore(Y, H.cells[l]), H.cells[l].removeAttribute("rowSpan"), H.cells[l].innerHTML = ""));
											continue;
										case Z.resultAction.SubtractSpanCount:
											R && (B > 2 ? (B--, N.setAttribute("rowSpan", B), P.rowIndex !== f && N.cellIndex === l && (N.innerHTML = "")) : 2 === B && (N.removeAttribute("rowSpan"), P.rowIndex !== f && N.cellIndex === l && (N.innerHTML = "")));
											continue;
										case Z.resultAction.RemoveCell:
											continue
									}
								} a.remove()
						}
					}, {
						key: "deleteCol",
						value: function(t) {
							for (var n = p.ancestor(t.commonAncestor(), p.isCell), a = v()(n).closest("tr"), l = a.children("td, th").index(v()(n)), f = new Z(n, Z.where.Column, Z.requestAction.Delete, v()(a).closest("table")[0]).getActionList(), w = 0; w < f.length; w++)
								if (f[w]) switch (f[w].action) {
									case Z.resultAction.Ignore:
										continue;
									case Z.resultAction.SubtractSpanCount:
										var b = f[w].baseCell;
										if (b.colSpan && b.colSpan > 1) {
											var N = b.colSpan ? parseInt(b.colSpan, 10) : 0;
											N > 2 ? (N--, b.setAttribute("colSpan", N), b.cellIndex === l && (b.innerHTML = "")) : 2 === N && (b.removeAttribute("colSpan"), b.cellIndex === l && (b.innerHTML = ""))
										}
										continue;
									case Z.resultAction.RemoveCell:
										p.remove(f[w].baseCell, !0);
										continue
								}
						}
					}, {
						key: "createTable",
						value: function(t, n, a) {
							for (var l, f = [], w = 0; w < t; w++) f.push("<td>" + p.blank + "</td>");
							l = f.join("");
							for (var b, N = [], P = 0; P < n; P++) N.push("<tr>" + l + "</tr>");
							b = N.join("");
							var R = v()("<table>" + b + "</table>");
							return a && a.tableClassName && R.addClass(a.tableClassName), R[0]
						}
					}, {
						key: "deleteTable",
						value: function(t) {
							var n = p.ancestor(t.commonAncestor(), p.isCell);
							v()(n).closest("table").remove()
						}
					}]) && function Q(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var vt = function() {
					function e(t) {
						var n = this;
						(function(b, N) {
							if (!(b instanceof N)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.$note = t.layoutInfo.note, this.$editor = t.layoutInfo.editor, this.$editable = t.layoutInfo.editable, this.options = t.options, this.lang = this.options.langInfo, this.editable = this.$editable[0], this.lastRange = null, this.snapshot = null, this.style = new W, this.table = new st, this.typing = new J(t), this.bullet = new z, this.history = new $(t), this.context.memo("help.escape", this.lang.help.escape), this.context.memo("help.undo", this.lang.help.undo), this.context.memo("help.redo", this.lang.help.redo), this.context.memo("help.tab", this.lang.help.tab), this.context.memo("help.untab", this.lang.help.untab), this.context.memo("help.insertParagraph", this.lang.help.insertParagraph), this.context.memo("help.insertOrderedList", this.lang.help.insertOrderedList), this.context.memo("help.insertUnorderedList", this.lang.help.insertUnorderedList), this.context.memo("help.indent", this.lang.help.indent), this.context.memo("help.outdent", this.lang.help.outdent), this.context.memo("help.formatPara", this.lang.help.formatPara), this.context.memo("help.insertHorizontalRule", this.lang.help.insertHorizontalRule), this.context.memo("help.fontName", this.lang.help.fontName);
						for (var a = ["bold", "italic", "underline", "strikethrough", "superscript", "subscript", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "formatBlock", "removeFormat", "backColor"], l = 0, f = a.length; l < f; l++) this[a[l]] = function(b) {
							return function(N) {
								n.beforeCommand(), document.execCommand(b, !1, N), n.afterCommand(!0)
							}
						}(a[l]), this.context.memo("help." + a[l], this.lang.help[a[l]]);
						this.fontName = this.wrapCommand(function(b) {
							return n.fontStyling("font-family", wt.validFontName(b))
						}), this.fontSize = this.wrapCommand(function(b) {
							var N = n.currentStyle()["font-size-unit"];
							return n.fontStyling("font-size", b + N)
						}), this.fontSizeUnit = this.wrapCommand(function(b) {
							var N = n.currentStyle()["font-size"];
							return n.fontStyling("font-size", N + b)
						});
						for (var w = 1; w <= 6; w++) this["formatH" + w] = function(b) {
							return function() {
								n.formatBlock("H" + b)
							}
						}(w), this.context.memo("help.formatH" + w, this.lang.help["formatH" + w]);
						this.insertParagraph = this.wrapCommand(function() {
							n.typing.insertParagraph(n.editable)
						}), this.insertOrderedList = this.wrapCommand(function() {
							n.bullet.insertOrderedList(n.editable)
						}), this.insertUnorderedList = this.wrapCommand(function() {
							n.bullet.insertUnorderedList(n.editable)
						}), this.indent = this.wrapCommand(function() {
							n.bullet.indent(n.editable)
						}), this.outdent = this.wrapCommand(function() {
							n.bullet.outdent(n.editable)
						}), this.insertNode = this.wrapCommand(function(b) {
							n.isLimited(v()(b).text().length) || (n.getLastRange().insertNode(b), n.setLastRange(d.createFromNodeAfter(b).select()))
						}), this.insertText = this.wrapCommand(function(b) {
							if (!n.isLimited(b.length)) {
								var N = n.getLastRange().insertNode(p.createText(b));
								n.setLastRange(d.create(N, p.nodeLength(N)).select())
							}
						}), this.pasteHTML = this.wrapCommand(function(b) {
							if (!n.isLimited(b.length)) {
								b = n.context.invoke("codeview.purify", b);
								var N = n.getLastRange().pasteHTML(b);
								n.setLastRange(d.createFromNodeAfter(_.last(N)).select())
							}
						}), this.formatBlock = this.wrapCommand(function(b, N) {
							var P = n.options.callbacks.onApplyCustomStyle;
							P ? P.call(n, N, n.context, n.onFormatBlock) : n.onFormatBlock(b, N)
						}), this.insertHorizontalRule = this.wrapCommand(function() {
							var b = n.getLastRange().insertNode(p.create("HR"));
							b.nextSibling && n.setLastRange(d.create(b.nextSibling, 0).normalize().select())
						}), this.lineHeight = this.wrapCommand(function(b) {
							n.style.stylePara(n.getLastRange(), {
								lineHeight: b
							})
						}), this.createLink = this.wrapCommand(function(b) {
							var N = b.url,
								P = b.text,
								R = b.isNewWindow,
								B = b.checkProtocol,
								H = b.range || n.getLastRange(),
								Y = P.length - H.toString().length;
							if (!(Y > 0 && n.isLimited(Y))) {
								var ht = H.toString() !== P;
								"string" == typeof N && (N = N.trim()), n.options.onCreateLink ? N = n.options.onCreateLink(N) : B && (N = /^([A-Za-z][A-Za-z0-9+-.]*\:|#|\/)/.test(N) ? N : n.options.defaultProtocol + N);
								var xt = [];
								if (ht) {
									var he = (H = H.deleteContents()).insertNode(v()("<A>" + P + "</A>")[0]);
									xt.push(he)
								} else xt = n.style.styleNodes(H, {
									nodeName: "A",
									expandClosestSibling: !0,
									onlyPartialContains: !0
								});
								v().each(xt, function(Re, le) {
									v()(le).attr("href", N), R ? v()(le).attr("target", "_blank") : v()(le).removeAttr("target")
								}), n.setLastRange(n.createRangeFromList(xt).select())
							}
						}), this.color = this.wrapCommand(function(b) {
							var N = b.foreColor,
								P = b.backColor;
							N && document.execCommand("foreColor", !1, N), P && document.execCommand("backColor", !1, P)
						}), this.foreColor = this.wrapCommand(function(b) {
							document.execCommand("foreColor", !1, b)
						}), this.insertTable = this.wrapCommand(function(b) {
							var N = b.split("x");
							n.getLastRange().deleteContents().insertNode(n.table.createTable(N[0], N[1], n.options))
						}), this.removeMedia = this.wrapCommand(function() {
							var b = v()(n.restoreTarget()).parent();
							b.closest("figure").length ? b.closest("figure").remove() : b = v()(n.restoreTarget()).detach(), n.context.triggerEvent("media.delete", b, n.$editable)
						}), this.floatMe = this.wrapCommand(function(b) {
							var N = v()(n.restoreTarget());
							N.toggleClass("note-float-left", "left" === b), N.toggleClass("note-float-right", "right" === b), N.css("float", "none" === b ? "" : b)
						}), this.resize = this.wrapCommand(function(b) {
							var N = v()(n.restoreTarget());
							0 === (b = parseFloat(b)) ? N.css("width", "") : N.css({
								width: 100 * b + "%",
								height: ""
							})
						})
					}
					var s;
					return s = [{
						key: "initialize",
						value: function() {
							var t = this;
							this.$editable.on("keydown", function(n) {
								if (n.keyCode === m.code.ENTER && t.context.triggerEvent("enter", n), t.context.triggerEvent("keydown", n), t.snapshot = t.history.makeSnapshot(), t.hasKeyShortCut = !1, n.isDefaultPrevented() || (t.options.shortcuts ? t.hasKeyShortCut = t.handleKeyMap(n) : t.preventDefaultEditableShortCuts(n)), t.isLimited(1, n)) {
									var a = t.getLastRange();
									if (a.eo - a.so == 0) return !1
								}
								t.setLastRange(), t.options.recordEveryKeystroke && !1 === t.hasKeyShortCut && t.history.recordUndo()
							}).on("keyup", function(n) {
								t.setLastRange(), t.context.triggerEvent("keyup", n)
							}).on("focus", function(n) {
								t.setLastRange(), t.context.triggerEvent("focus", n)
							}).on("blur", function(n) {
								t.context.triggerEvent("blur", n)
							}).on("mousedown", function(n) {
								t.context.triggerEvent("mousedown", n)
							}).on("mouseup", function(n) {
								t.setLastRange(), t.history.recordUndo(), t.context.triggerEvent("mouseup", n)
							}).on("scroll", function(n) {
								t.context.triggerEvent("scroll", n)
							}).on("paste", function(n) {
								t.setLastRange(), t.context.triggerEvent("paste", n)
							}).on("input", function() {
								t.isLimited(0) && t.snapshot && t.history.applySnapshot(t.snapshot)
							}), this.$editable.attr("spellcheck", this.options.spellCheck), this.$editable.attr("autocorrect", this.options.spellCheck), this.options.disableGrammar && this.$editable.attr("data-gramm", !1), this.$editable.html(p.html(this.$note) || p.emptyPara), this.$editable.on(wt.inputEventName, X.debounce(function() {
								t.context.triggerEvent("change", t.$editable.html(), t.$editable)
							}, 10)), this.$editable.on("focusin", function(n) {
								t.context.triggerEvent("focusin", n)
							}).on("focusout", function(n) {
								t.context.triggerEvent("focusout", n)
							}), this.options.airMode ? this.options.overrideContextMenu && this.$editor.on("contextmenu", function(n) {
								return t.context.triggerEvent("contextmenu", n), !1
							}) : (this.options.width && this.$editor.outerWidth(this.options.width), this.options.height && this.$editable.outerHeight(this.options.height), this.options.maxHeight && this.$editable.css("max-height", this.options.maxHeight), this.options.minHeight && this.$editable.css("min-height", this.options.minHeight)), this.history.recordUndo(), this.setLastRange()
						}
					}, {
						key: "destroy",
						value: function() {
							this.$editable.off()
						}
					}, {
						key: "handleKeyMap",
						value: function(t) {
							var n = this.options.keyMap[wt.isMac ? "mac" : "pc"],
								a = [];
							t.metaKey && a.push("CMD"), t.ctrlKey && !t.altKey && a.push("CTRL"), t.shiftKey && a.push("SHIFT");
							var l = m.nameFromCode[t.keyCode];
							l && a.push(l);
							var f = n[a.join("+")];
							if ("TAB" !== l || this.options.tabDisable)
								if (f) {
									if (!1 !== this.context.invoke(f)) return t.preventDefault(), !0
								} else m.isEdit(t.keyCode) && this.afterCommand();
							else this.afterCommand();
							return !1
						}
					}, {
						key: "preventDefaultEditableShortCuts",
						value: function(t) {
							(t.ctrlKey || t.metaKey) && _.contains([66, 73, 85], t.keyCode) && t.preventDefault()
						}
					}, {
						key: "isLimited",
						value: function(t, n) {
							return t = t || 0, (void 0 === n || !(m.isMove(n.keyCode) || m.isNavigation(n.keyCode) || n.ctrlKey || n.metaKey || _.contains([m.code.BACKSPACE, m.code.DELETE], n.keyCode))) && this.options.maxTextLength > 0 && this.$editable.text().length + t > this.options.maxTextLength
						}
					}, {
						key: "createRange",
						value: function() {
							return this.focus(), this.setLastRange(), this.getLastRange()
						}
					}, {
						key: "createRangeFromList",
						value: function(t) {
							var n = d.createFromNodeBefore(_.head(t)).getStartPoint(),
								a = d.createFromNodeAfter(_.last(t)).getEndPoint();
							return d.create(n.node, n.offset, a.node, a.offset)
						}
					}, {
						key: "setLastRange",
						value: function(t) {
							t ? this.lastRange = t : (this.lastRange = d.create(this.editable), 0 === v()(this.lastRange.sc).closest(".note-editable").length && (this.lastRange = d.createFromBodyElement(this.editable)))
						}
					}, {
						key: "getLastRange",
						value: function() {
							return this.lastRange || this.setLastRange(), this.lastRange
						}
					}, {
						key: "saveRange",
						value: function(t) {
							t && this.getLastRange().collapse().select()
						}
					}, {
						key: "restoreRange",
						value: function() {
							this.lastRange && (this.lastRange.select(), this.focus())
						}
					}, {
						key: "saveTarget",
						value: function(t) {
							this.$editable.data("target", t)
						}
					}, {
						key: "clearTarget",
						value: function() {
							this.$editable.removeData("target")
						}
					}, {
						key: "restoreTarget",
						value: function() {
							return this.$editable.data("target")
						}
					}, {
						key: "currentStyle",
						value: function() {
							var t = d.create();
							return t && (t = t.normalize()), t ? this.style.current(t) : this.style.fromNode(this.$editable)
						}
					}, {
						key: "styleFromNode",
						value: function(t) {
							return this.style.fromNode(t)
						}
					}, {
						key: "undo",
						value: function() {
							this.context.triggerEvent("before.command", this.$editable.html()), this.history.undo(), this.context.triggerEvent("change", this.$editable.html(), this.$editable)
						}
					}, {
						key: "commit",
						value: function() {
							this.context.triggerEvent("before.command", this.$editable.html()), this.history.commit(), this.context.triggerEvent("change", this.$editable.html(), this.$editable)
						}
					}, {
						key: "redo",
						value: function() {
							this.context.triggerEvent("before.command", this.$editable.html()), this.history.redo(), this.context.triggerEvent("change", this.$editable.html(), this.$editable)
						}
					}, {
						key: "beforeCommand",
						value: function() {
							this.context.triggerEvent("before.command", this.$editable.html()), document.execCommand("styleWithCSS", !1, this.options.styleWithCSS), this.focus()
						}
					}, {
						key: "afterCommand",
						value: function(t) {
							this.normalizeContent(), this.history.recordUndo(), t || this.context.triggerEvent("change", this.$editable.html(), this.$editable)
						}
					}, {
						key: "tab",
						value: function() {
							var t = this.getLastRange();
							if (t.isCollapsed() && t.isOnCell()) this.table.tab(t);
							else {
								if (0 === this.options.tabSize) return !1;
								this.isLimited(this.options.tabSize) || (this.beforeCommand(), this.typing.insertTab(t, this.options.tabSize), this.afterCommand())
							}
						}
					}, {
						key: "untab",
						value: function() {
							var t = this.getLastRange();
							if (t.isCollapsed() && t.isOnCell()) this.table.tab(t, !0);
							else if (0 === this.options.tabSize) return !1
						}
					}, {
						key: "wrapCommand",
						value: function(t) {
							return function() {
								this.beforeCommand(), t.apply(this, arguments), this.afterCommand()
							}
						}
					}, {
						key: "insertImage",
						value: function(t, n) {
							var a, l = this;
							return (a = t, v().Deferred(function(f) {
								var w = v()("<img>");
								w.one("load", function() {
									w.off("error abort"), f.resolve(w)
								}).one("error abort", function() {
									w.off("load").detach(), f.reject(w)
								}).css({
									display: "none"
								}).appendTo(document.body).attr("src", a)
							}).promise()).then(function(f) {
								l.beforeCommand(), "function" == typeof n ? n(f) : ("string" == typeof n && f.attr("data-filename", n), f.css("width", Math.min(l.$editable.width(), f.width()))), f.show(), l.getLastRange().insertNode(f[0]), l.setLastRange(d.createFromNodeAfter(f[0]).select()), l.afterCommand()
							}).fail(function(f) {
								l.context.triggerEvent("image.upload.error", f)
							})
						}
					}, {
						key: "insertImagesAsDataURL",
						value: function(t) {
							var n = this;
							v().each(t, function(a, l) {
								var w, f = l.name;
								n.options.maximumImageFileSize && n.options.maximumImageFileSize < l.size ? n.context.triggerEvent("image.upload.error", n.lang.image.maximumFileSizeError) : (w = l, v().Deferred(function(b) {
									v().extend(new FileReader, {
										onload: function(N) {
											b.resolve(N.target.result)
										},
										onerror: function(N) {
											b.reject(N)
										}
									}).readAsDataURL(w)
								}).promise()).then(function(w) {
									return n.insertImage(w, f)
								}).fail(function() {
									n.context.triggerEvent("image.upload.error")
								})
							})
						}
					}, {
						key: "insertImagesOrCallback",
						value: function(t) {
							this.options.callbacks.onImageUpload ? this.context.triggerEvent("image.upload", t) : this.insertImagesAsDataURL(t)
						}
					}, {
						key: "getSelectedText",
						value: function() {
							var t = this.getLastRange();
							return t.isOnAnchor() && (t = d.createFromNode(p.ancestor(t.sc, p.isAnchor))), t.toString()
						}
					}, {
						key: "onFormatBlock",
						value: function(t, n) {
							if (document.execCommand("FormatBlock", !1, wt.isMSIE ? "<" + t + ">" : t), n && n.length && (n[0].tagName.toUpperCase() !== t.toUpperCase() && (n = n.find(t)), n && n.length)) {
								var a = this.createRange(),
									l = v()([a.sc, a.ec]).closest(t);
								l.removeClass();
								var f = n[0].className || "";
								f && l.addClass(f)
							}
						}
					}, {
						key: "formatPara",
						value: function() {
							this.formatBlock("P")
						}
					}, {
						key: "fontStyling",
						value: function(t, n) {
							var a = this.getLastRange();
							if ("" !== a) {
								var l = this.style.styleNodes(a);
								if (this.$editor.find(".note-status-output").html(""), v()(l).css(t, n), a.isCollapsed()) {
									var f = _.head(l);
									f && !p.nodeLength(f) && (f.innerHTML = p.ZERO_WIDTH_NBSP_CHAR, d.createFromNode(f.firstChild).select(), this.setLastRange(), this.$editable.data("bogus", f))
								} else this.setLastRange(this.createRangeFromList(l).select())
							} else {
								var w = v().now();
								this.$editor.find(".note-status-output").html('<div id="note-status-output-' + w + '" class="alert alert-info">' + this.lang.output.noSelection + "</div>"), setTimeout(function() {
									v()("#note-status-output-" + w).remove()
								}, 5e3)
							}
						}
					}, {
						key: "unlink",
						value: function() {
							var t = this.getLastRange();
							if (t.isOnAnchor()) {
								var n = p.ancestor(t.sc, p.isAnchor);
								(t = d.createFromNode(n)).select(), this.setLastRange(), this.beforeCommand(), document.execCommand("unlink"), this.afterCommand()
							}
						}
					}, {
						key: "getLinkInfo",
						value: function() {
							var t = this.getLastRange().expand(p.isAnchor),
								n = v()(_.head(t.nodes(p.isAnchor))),
								a = {
									range: t,
									text: t.toString(),
									url: n.length ? n.attr("href") : ""
								};
							return n.length && (a.isNewWindow = "_blank" === n.attr("target")), a
						}
					}, {
						key: "addRow",
						value: function(t) {
							var n = this.getLastRange(this.$editable);
							n.isCollapsed() && n.isOnCell() && (this.beforeCommand(), this.table.addRow(n, t), this.afterCommand())
						}
					}, {
						key: "addCol",
						value: function(t) {
							var n = this.getLastRange(this.$editable);
							n.isCollapsed() && n.isOnCell() && (this.beforeCommand(), this.table.addCol(n, t), this.afterCommand())
						}
					}, {
						key: "deleteRow",
						value: function() {
							var t = this.getLastRange(this.$editable);
							t.isCollapsed() && t.isOnCell() && (this.beforeCommand(), this.table.deleteRow(t), this.afterCommand())
						}
					}, {
						key: "deleteCol",
						value: function() {
							var t = this.getLastRange(this.$editable);
							t.isCollapsed() && t.isOnCell() && (this.beforeCommand(), this.table.deleteCol(t), this.afterCommand())
						}
					}, {
						key: "deleteTable",
						value: function() {
							var t = this.getLastRange(this.$editable);
							t.isCollapsed() && t.isOnCell() && (this.beforeCommand(), this.table.deleteTable(t), this.afterCommand())
						}
					}, {
						key: "resizeTo",
						value: function(t, n, a) {
							var l;
							if (a) {
								var f = t.y / t.x,
									w = n.data("ratio");
								l = {
									width: w > f ? t.x : t.y / w,
									height: w > f ? t.x * w : t.y
								}
							} else l = {
								width: t.x,
								height: t.y
							};
							n.css(l)
						}
					}, {
						key: "hasFocus",
						value: function() {
							return this.$editable.is(":focus")
						}
					}, {
						key: "focus",
						value: function() {
							this.hasFocus() || this.$editable.focus()
						}
					}, {
						key: "isEmpty",
						value: function() {
							return p.isEmpty(this.$editable[0]) || p.emptyPara === this.$editable.html()
						}
					}, {
						key: "empty",
						value: function() {
							this.context.invoke("code", p.emptyPara)
						}
					}, {
						key: "normalizeContent",
						value: function() {
							this.$editable[0].normalize()
						}
					}], s && function ut(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var Ht = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.$editable = t.layoutInfo.editable
					}
					var s;
					return (s = [{
						key: "initialize",
						value: function() {
							this.$editable.on("paste", this.pasteByEvent.bind(this))
						}
					}, {
						key: "pasteByEvent",
						value: function(t) {
							var n = this,
								a = t.originalEvent.clipboardData;
							if (a && a.items && a.items.length) {
								var l = a.items.length > 1 ? a.items[1] : _.head(a.items);
								"file" === l.kind && -1 !== l.type.indexOf("image/") ? (this.context.invoke("editor.insertImagesOrCallback", [l.getAsFile()]), t.preventDefault()) : "string" === l.kind && this.context.invoke("editor.isLimited", a.getData("Text").length) && t.preventDefault()
							} else if (window.clipboardData) {
								var f = window.clipboardData.getData("text");
								this.context.invoke("editor.isLimited", f.length) && t.preventDefault()
							}
							setTimeout(function() {
								n.context.invoke("editor.afterCommand")
							}, 10)
						}
					}]) && function lt(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var Et = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.$eventListener = v()(document), this.$editor = t.layoutInfo.editor, this.$editable = t.layoutInfo.editable, this.options = t.options, this.lang = this.options.langInfo, this.documentEventHandlers = {}, this.$dropzone = v()(['<div class="note-dropzone">', '<div class="note-dropzone-message"></div>', "</div>"].join("")).prependTo(this.$editor)
					}
					var s;
					return (s = [{
						key: "initialize",
						value: function() {
							this.options.disableDragAndDrop ? (this.documentEventHandlers.onDrop = function(t) {
								t.preventDefault()
							}, this.$eventListener = this.$dropzone, this.$eventListener.on("drop", this.documentEventHandlers.onDrop)) : this.attachDragAndDropEvent()
						}
					}, {
						key: "attachDragAndDropEvent",
						value: function() {
							var t = this,
								n = v()(),
								a = this.$dropzone.find(".note-dropzone-message");
							this.documentEventHandlers.onDragenter = function(l) {
								var f = t.context.invoke("codeview.isActivated"),
									w = t.$editor.width() > 0 && t.$editor.height() > 0;
								f || n.length || !w || (t.$editor.addClass("dragover"), t.$dropzone.width(t.$editor.width()), t.$dropzone.height(t.$editor.height()), a.text(t.lang.image.dragImageHere)), n = n.add(l.target)
							}, this.documentEventHandlers.onDragleave = function(l) {
								(n = n.not(l.target)).length && "BODY" !== l.target.nodeName || (n = v()(), t.$editor.removeClass("dragover"))
							}, this.documentEventHandlers.onDrop = function() {
								n = v()(), t.$editor.removeClass("dragover")
							}, this.$eventListener.on("dragenter", this.documentEventHandlers.onDragenter).on("dragleave", this.documentEventHandlers.onDragleave).on("drop", this.documentEventHandlers.onDrop), this.$dropzone.on("dragenter", function() {
								t.$dropzone.addClass("hover"), a.text(t.lang.image.dropImage)
							}).on("dragleave", function() {
								t.$dropzone.removeClass("hover"), a.text(t.lang.image.dragImageHere)
							}), this.$dropzone.on("drop", function(l) {
								var f = l.originalEvent.dataTransfer;
								l.preventDefault(), f && f.files && f.files.length ? (t.$editable.focus(), t.context.invoke("editor.insertImagesOrCallback", f.files)) : v().each(f.types, function(w, b) {
									if (!(b.toLowerCase().indexOf("_moz_") > -1)) {
										var N = f.getData(b);
										b.toLowerCase().indexOf("text") > -1 ? t.context.invoke("editor.pasteHTML", N) : v()(N).each(function(P, R) {
											t.context.invoke("editor.insertNode", R)
										})
									}
								})
							}).on("dragover", !1)
						}
					}, {
						key: "destroy",
						value: function() {
							var t = this;
							Object.keys(this.documentEventHandlers).forEach(function(n) {
								t.$eventListener.off(n.substr(2).toLowerCase(), t.documentEventHandlers[n])
							}), this.documentEventHandlers = {}
						}
					}]) && function $t(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();

				function dt(e, o) {
					(null == o || o > e.length) && (o = e.length);
					for (var s = 0, r = new Array(o); s < o; s++) r[s] = e[s];
					return r
				}
				var kt = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.$editor = t.layoutInfo.editor, this.$editable = t.layoutInfo.editable, this.$codable = t.layoutInfo.codable, this.options = t.options, this.CodeMirrorConstructor = window.CodeMirror, this.options.codemirror.CodeMirrorConstructor && (this.CodeMirrorConstructor = this.options.codemirror.CodeMirrorConstructor)
					}
					var s;
					return s = [{
						key: "sync",
						value: function(t) {
							var n = this.isActivated(),
								a = this.CodeMirrorConstructor;
							n && (t ? a ? this.$codable.data("cmEditor").getDoc().setValue(t) : this.$codable.val(t) : a && this.$codable.data("cmEditor").save())
						}
					}, {
						key: "initialize",
						value: function() {
							var t = this;
							this.$codable.on("keyup", function(n) {
								n.keyCode === m.code.ESCAPE && t.deactivate()
							})
						}
					}, {
						key: "isActivated",
						value: function() {
							return this.$editor.hasClass("codeview")
						}
					}, {
						key: "toggle",
						value: function() {
							this.isActivated() ? this.deactivate() : this.activate(), this.context.triggerEvent("codeview.toggled")
						}
					}, {
						key: "purify",
						value: function(t) {
							if (this.options.codeviewFilter && (t = t.replace(this.options.codeviewFilterRegex, ""), this.options.codeviewIframeFilter)) {
								var n = this.options.codeviewIframeWhitelistSrc.concat(this.options.codeviewIframeWhitelistSrcBase);
								t = t.replace(/(<iframe.*?>.*?(?:<\/iframe>)?)/gi, function(a) {
									if (/<.+src(?==?('|"|\s)?)[\s\S]+src(?=('|"|\s)?)[^>]*?>/i.test(a)) return "";
									var l, f = function At(e, o) {
										var s = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
										if (!s) {
											if (Array.isArray(e) || (s = function(f, w) {
													if (f) {
														if ("string" == typeof f) return dt(f, w);
														var b = Object.prototype.toString.call(f).slice(8, -1);
														if ("Object" === b && f.constructor && (b = f.constructor.name), "Map" === b || "Set" === b) return Array.from(f);
														if ("Arguments" === b || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b)) return dt(f, w)
													}
												}(e)) || o && e && "number" == typeof e.length) {
												s && (e = s);
												var r = 0,
													t = function() {};
												return {
													s: t,
													n: function() {
														return r >= e.length ? {
															done: !0
														} : {
															done: !1,
															value: e[r++]
														}
													},
													e: function(f) {
														throw f
													},
													f: t
												}
											}
											throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
										}
										var n, a = !0,
											l = !1;
										return {
											s: function() {
												s = s.call(e)
											},
											n: function() {
												var f = s.next();
												return a = f.done, f
											},
											e: function(f) {
												l = !0, n = f
											},
											f: function() {
												try {
													a || null == s.return || s.return()
												} finally {
													if (l) throw n
												}
											}
										}
									}(n);
									try {
										for (f.s(); !(l = f.n()).done;)
											if (new RegExp('src="(https?:)?//' + l.value.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + '/(.+)"').test(a)) return a
									} catch (b) {
										f.e(b)
									} finally {
										f.f()
									}
									return ""
								})
							}
							return t
						}
					}, {
						key: "activate",
						value: function() {
							var t = this,
								n = this.CodeMirrorConstructor;
							if (this.$codable.val(p.html(this.$editable, this.options.prettifyHtml)), this.$codable.height(this.$editable.height()), this.context.invoke("toolbar.updateCodeview", !0), this.context.invoke("airPopover.updateCodeview", !0), this.$editor.addClass("codeview"), this.$codable.focus(), n) {
								var a = n.fromTextArea(this.$codable[0], this.options.codemirror);
								if (this.options.codemirror.tern) {
									var l = new n.TernServer(this.options.codemirror.tern);
									a.ternServer = l, a.on("cursorActivity", function(f) {
										l.updateArgHints(f)
									})
								}
								a.on("blur", function(f) {
									t.context.triggerEvent("blur.codeview", a.getValue(), f)
								}), a.on("change", function() {
									t.context.triggerEvent("change.codeview", a.getValue(), a)
								}), a.setSize(null, this.$editable.outerHeight()), this.$codable.data("cmEditor", a)
							} else this.$codable.on("blur", function(f) {
								t.context.triggerEvent("blur.codeview", t.$codable.val(), f)
							}), this.$codable.on("input", function() {
								t.context.triggerEvent("change.codeview", t.$codable.val(), t.$codable)
							})
						}
					}, {
						key: "deactivate",
						value: function() {
							if (this.CodeMirrorConstructor) {
								var t = this.$codable.data("cmEditor");
								this.$codable.val(t.getValue()), t.toTextArea()
							}
							var n = this.purify(p.value(this.$codable, this.options.prettifyHtml) || p.emptyPara),
								a = this.$editable.html() !== n;
							this.$editable.html(n), this.$editable.height(this.options.height ? this.$codable.height() : "auto"), this.$editor.removeClass("codeview"), a && this.context.triggerEvent("change", this.$editable.html(), this.$editable), this.$editable.focus(), this.context.invoke("toolbar.updateCodeview", !1), this.context.invoke("airPopover.updateCodeview", !1)
						}
					}, {
						key: "destroy",
						value: function() {
							this.isActivated() && this.deactivate()
						}
					}], s && function it(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var Dt = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.$document = v()(document), this.$statusbar = t.layoutInfo.statusbar, this.$editable = t.layoutInfo.editable, this.$codable = t.layoutInfo.codable, this.options = t.options
					}
					var s;
					return (s = [{
						key: "initialize",
						value: function() {
							var t = this;
							this.options.airMode || this.options.disableResizeEditor ? this.destroy() : this.$statusbar.on("mousedown", function(n) {
								n.preventDefault(), n.stopPropagation();
								var a = t.$editable.offset().top - t.$document.scrollTop(),
									l = t.$codable.offset().top - t.$document.scrollTop(),
									f = function(w) {
										var b = w.clientY - (a + 24),
											N = w.clientY - (l + 24);
										b = t.options.minheight > 0 ? Math.max(b, t.options.minheight) : b, b = t.options.maxHeight > 0 ? Math.min(b, t.options.maxHeight) : b, N = t.options.minheight > 0 ? Math.max(N, t.options.minheight) : N, N = t.options.maxHeight > 0 ? Math.min(N, t.options.maxHeight) : N, t.$editable.height(b), t.$codable.height(N)
									};
								t.$document.on("mousemove", f).one("mouseup", function() {
									t.$document.off("mousemove", f)
								})
							})
						}
					}, {
						key: "destroy",
						value: function() {
							this.$statusbar.off(), this.$statusbar.addClass("locked")
						}
					}]) && function It(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var ie = function() {
					function e(t) {
						var n = this;
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.$editor = t.layoutInfo.editor, this.$toolbar = t.layoutInfo.toolbar, this.$editable = t.layoutInfo.editable, this.$codable = t.layoutInfo.codable, this.$window = v()(window), this.$scrollbar = v()("html, body"), this.scrollbarClassName = "note-fullscreen-body", this.onResize = function() {
							n.resizeTo({
								h: n.$window.height() - n.$toolbar.outerHeight()
							})
						}
					}
					var s;
					return (s = [{
						key: "resizeTo",
						value: function(t) {
							this.$editable.css("height", t.h), this.$codable.css("height", t.h), this.$codable.data("cmeditor") && this.$codable.data("cmeditor").setsize(null, t.h)
						}
					}, {
						key: "toggle",
						value: function() {
							this.$editor.toggleClass("fullscreen");
							var t = this.isFullscreen();
							this.$scrollbar.toggleClass(this.scrollbarClassName, t), t ? (this.$editable.data("orgHeight", this.$editable.css("height")), this.$editable.data("orgMaxHeight", this.$editable.css("maxHeight")), this.$editable.css("maxHeight", ""), this.$window.on("resize", this.onResize).trigger("resize")) : (this.$window.off("resize", this.onResize), this.resizeTo({
								h: this.$editable.data("orgHeight")
							}), this.$editable.css("maxHeight", this.$editable.css("orgMaxHeight"))), this.context.invoke("toolbar.updateFullscreen", t)
						}
					}, {
						key: "isFullscreen",
						value: function() {
							return this.$editor.hasClass("fullscreen")
						}
					}, {
						key: "destroy",
						value: function() {
							this.$scrollbar.removeClass(this.scrollbarClassName)
						}
					}]) && function Ut(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var ue = function() {
					function e(t) {
						var n = this;
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.$document = v()(document), this.$editingArea = t.layoutInfo.editingArea, this.options = t.options, this.lang = this.options.langInfo, this.events = {
							"summernote.mousedown": function(a, l) {
								n.update(l.target, l) && l.preventDefault()
							},
							"summernote.keyup summernote.scroll summernote.change summernote.dialog.shown": function() {
								n.update()
							},
							"summernote.disable summernote.blur": function() {
								n.hide()
							},
							"summernote.codeview.toggled": function() {
								n.update()
							}
						}
					}
					var s;
					return (s = [{
						key: "initialize",
						value: function() {
							var t = this;
							this.$handle = v()(['<div class="note-handle">', '<div class="note-control-selection">', '<div class="note-control-selection-bg"></div>', '<div class="note-control-holder note-control-nw"></div>', '<div class="note-control-holder note-control-ne"></div>', '<div class="note-control-holder note-control-sw"></div>', '<div class="', this.options.disableResizeImage ? "note-control-holder" : "note-control-sizing", ' note-control-se"></div>', this.options.disableResizeImage ? "" : '<div class="note-control-selection-info"></div>', "</div>", "</div>"].join("")).prependTo(this.$editingArea), this.$handle.on("mousedown", function(n) {
								if (p.isControlSizing(n.target)) {
									n.preventDefault(), n.stopPropagation();
									var a = t.$handle.find(".note-control-selection").data("target"),
										l = a.offset(),
										f = t.$document.scrollTop(),
										w = function(b) {
											t.context.invoke("editor.resizeTo", {
												x: b.clientX - l.left,
												y: b.clientY - (l.top - f)
											}, a, !b.shiftKey), t.update(a[0], b)
										};
									t.$document.on("mousemove", w).one("mouseup", function(b) {
										b.preventDefault(), t.$document.off("mousemove", w), t.context.invoke("editor.afterCommand")
									}), a.data("ratio") || a.data("ratio", a.height() / a.width())
								}
							}), this.$handle.on("wheel", function(n) {
								n.preventDefault(), t.update()
							})
						}
					}, {
						key: "destroy",
						value: function() {
							this.$handle.remove()
						}
					}, {
						key: "update",
						value: function(t, n) {
							if (this.context.isDisabled()) return !1;
							var a = p.isImg(t),
								l = this.$handle.find(".note-control-selection");
							if (this.context.invoke("imagePopover.update", t, n), a) {
								var f = v()(t),
									w = f.position(),
									b = {
										left: w.left + parseInt(f.css("marginLeft"), 10),
										top: w.top + parseInt(f.css("marginTop"), 10)
									},
									N = {
										w: f.outerWidth(!1),
										h: f.outerHeight(!1)
									};
								l.css({
									display: "block",
									left: b.left,
									top: b.top,
									width: N.w,
									height: N.h
								}).data("target", f);
								var P = new Image;
								P.src = f.attr("src");
								var R = N.w + "x" + N.h + " (" + this.lang.image.original + ": " + P.width + "x" + P.height + ")";
								l.find(".note-control-selection-info").text(R), this.context.invoke("editor.saveTarget", t)
							} else this.hide();
							return a
						}
					}, {
						key: "hide",
						value: function() {
							this.context.invoke("editor.clearTarget"), this.$handle.children().hide()
						}
					}]) && function ve(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var be = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/]{2}|tel:|mailto:[A-Z0-9._%+-]+@|xmpp:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i,
					Qt = function() {
						function e(t) {
							var n = this;
							(function(a, l) {
								if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
							})(this, e), this.context = t, this.options = t.options, this.events = {
								"summernote.keyup": function(a, l) {
									l.isDefaultPrevented() || n.handleKeyup(l)
								},
								"summernote.keydown": function(a, l) {
									n.handleKeydown(l)
								}
							}
						}
						var s;
						return (s = [{
							key: "initialize",
							value: function() {
								this.lastWordRange = null
							}
						}, {
							key: "destroy",
							value: function() {
								this.lastWordRange = null
							}
						}, {
							key: "replace",
							value: function() {
								if (this.lastWordRange) {
									var t = this.lastWordRange.toString(),
										n = t.match(be);
									if (n && (n[1] || n[2])) {
										var a = n[1] ? t : "http://" + t,
											l = this.options.showDomainOnlyForAutolink ? t.replace(/^(?:https?:\/\/)?(?:tel?:?)?(?:mailto?:?)?(?:xmpp?:?)?(?:www\.)?/i, "").split("/")[0] : t,
											f = v()("<a></a>").html(l).attr("href", a)[0];
										this.context.options.linkTargetBlank && v()(f).attr("target", "_blank"), this.lastWordRange.insertNode(f), this.lastWordRange = null, this.context.invoke("editor.focus")
									}
								}
							}
						}, {
							key: "handleKeydown",
							value: function(t) {
								if (_.contains([m.code.ENTER, m.code.SPACE], t.keyCode)) {
									var n = this.context.invoke("editor.createRange").getWordRange();
									this.lastWordRange = n
								}
							}
						}, {
							key: "handleKeyup",
							value: function(t) {
								_.contains([m.code.ENTER, m.code.SPACE], t.keyCode) && this.replace()
							}
						}]) && function ne(e, o) {
							for (var s = 0; s < o.length; s++) {
								var r = o[s];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
							}
						}(e.prototype, s), e
					}();
				var He = function() {
					function e(t) {
						var n = this;
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.$note = t.layoutInfo.note, this.events = {
							"summernote.change": function() {
								n.$note.val(t.invoke("code"))
							}
						}
					}
					var s;
					return (s = [{
						key: "shouldInitialize",
						value: function() {
							return p.isTextarea(this.$note[0])
						}
					}]) && function re(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var Me = function() {
					function e(t) {
						var n = this;
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.options = t.options.replace || {}, this.keys = [m.code.ENTER, m.code.SPACE, m.code.PERIOD, m.code.COMMA, m.code.SEMICOLON, m.code.SLASH], this.previousKeydownCode = null, this.events = {
							"summernote.keyup": function(a, l) {
								l.isDefaultPrevented() || n.handleKeyup(l)
							},
							"summernote.keydown": function(a, l) {
								n.handleKeydown(l)
							}
						}
					}
					var s;
					return (s = [{
						key: "shouldInitialize",
						value: function() {
							return !!this.options.match
						}
					}, {
						key: "initialize",
						value: function() {
							this.lastWord = null
						}
					}, {
						key: "destroy",
						value: function() {
							this.lastWord = null
						}
					}, {
						key: "replace",
						value: function() {
							if (this.lastWord) {
								var t = this,
									n = this.lastWord.toString();
								this.options.match(n, function(a) {
									if (a) {
										var l = "";
										if ("string" == typeof a ? l = p.createText(a) : a instanceof jQuery ? l = a[0] : a instanceof Node && (l = a), !l) return;
										t.lastWord.insertNode(l), t.lastWord = null, t.context.invoke("editor.focus")
									}
								})
							}
						}
					}, {
						key: "handleKeydown",
						value: function(t) {
							if (this.previousKeydownCode && _.contains(this.keys, this.previousKeydownCode)) this.previousKeydownCode = t.keyCode;
							else {
								if (_.contains(this.keys, t.keyCode)) {
									var n = this.context.invoke("editor.createRange").getWordRange();
									this.lastWord = n
								}
								this.previousKeydownCode = t.keyCode
							}
						}
					}, {
						key: "handleKeyup",
						value: function(t) {
							_.contains(this.keys, t.keyCode) && this.replace()
						}
					}]) && function Ue(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var ae = function() {
					function e(t) {
						var n = this;
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.$editingArea = t.layoutInfo.editingArea, this.options = t.options, !0 === this.options.inheritPlaceholder && (this.options.placeholder = this.context.$note.attr("placeholder") || this.options.placeholder), this.events = {
							"summernote.init summernote.change": function() {
								n.update()
							},
							"summernote.codeview.toggled": function() {
								n.update()
							}
						}
					}
					var s;
					return (s = [{
						key: "shouldInitialize",
						value: function() {
							return !!this.options.placeholder
						}
					}, {
						key: "initialize",
						value: function() {
							var t = this;
							this.$placeholder = v()('<div class="note-placeholder"></div>'), this.$placeholder.on("click", function() {
								t.context.invoke("focus")
							}).html(this.options.placeholder).prependTo(this.$editingArea), this.update()
						}
					}, {
						key: "destroy",
						value: function() {
							this.$placeholder.remove()
						}
					}, {
						key: "update",
						value: function() {
							var t = !this.context.invoke("codeview.isActivated") && this.context.invoke("editor.isEmpty");
							this.$placeholder.toggle(t)
						}
					}]) && function ye(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var Xe = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.ui = v().summernote.ui, this.context = t, this.$toolbar = t.layoutInfo.toolbar, this.options = t.options, this.lang = this.options.langInfo, this.invertedKeyMap = X.invertObject(this.options.keyMap[wt.isMac ? "mac" : "pc"])
					}
					var s;
					return (s = [{
						key: "representShortcut",
						value: function(t) {
							var n = this.invertedKeyMap[t];
							return this.options.shortcuts && n ? (wt.isMac && (n = n.replace("CMD", "\u2318").replace("SHIFT", "\u21e7")), " (" + (n = n.replace("BACKSLASH", "\\").replace("SLASH", "/").replace("LEFTBRACKET", "[").replace("RIGHTBRACKET", "]")) + ")") : ""
						}
					}, {
						key: "button",
						value: function(t) {
							return !this.options.tooltip && t.tooltip && delete t.tooltip, t.container = this.options.container, this.ui.button(t)
						}
					}, {
						key: "initialize",
						value: function() {
							this.addToolbarButtons(), this.addImagePopoverButtons(), this.addLinkPopoverButtons(), this.addTablePopoverButtons(), this.fontInstalledMap = {}
						}
					}, {
						key: "destroy",
						value: function() {
							delete this.fontInstalledMap
						}
					}, {
						key: "isFontInstalled",
						value: function(t) {
							return Object.prototype.hasOwnProperty.call(this.fontInstalledMap, t) || (this.fontInstalledMap[t] = wt.isFontInstalled(t) || _.contains(this.options.fontNamesIgnoreCheck, t)), this.fontInstalledMap[t]
						}
					}, {
						key: "isFontDeservedToAdd",
						value: function(t) {
							return "" !== (t = t.toLowerCase()) && this.isFontInstalled(t) && -1 === wt.genericFontFamilies.indexOf(t)
						}
					}, {
						key: "colorPalette",
						value: function(t, n, a, l) {
							var f = this;
							return this.ui.buttonGroup({
								className: "note-color " + t,
								children: [this.button({
									className: "note-current-color-button",
									contents: this.ui.icon(this.options.icons.font + " note-recent-color"),
									tooltip: n,
									click: function(w) {
										var b = v()(w.currentTarget);
										a && l ? f.context.invoke("editor.color", {
											backColor: b.attr("data-backColor"),
											foreColor: b.attr("data-foreColor")
										}) : a ? f.context.invoke("editor.color", {
											backColor: b.attr("data-backColor")
										}) : l && f.context.invoke("editor.color", {
											foreColor: b.attr("data-foreColor")
										})
									},
									callback: function(w) {
										var b = w.find(".note-recent-color");
										a && (b.css("background-color", f.options.colorButton.backColor), w.attr("data-backColor", f.options.colorButton.backColor)), l ? (b.css("color", f.options.colorButton.foreColor), w.attr("data-foreColor", f.options.colorButton.foreColor)) : b.css("color", "transparent")
									}
								}), this.button({
									className: "dropdown-toggle",
									contents: this.ui.dropdownButtonContents("", this.options),
									tooltip: this.lang.color.more,
									data: {
										toggle: "dropdown"
									}
								}), this.ui.dropdown({
									items: (a ? ['<div class="note-palette">', '<div class="note-palette-title">' + this.lang.color.background + "</div>", "<div>", '<button type="button" class="note-color-reset btn btn-light btn-default" data-event="backColor" data-value="transparent">', this.lang.color.transparent, "</button>", "</div>", '<div class="note-holder" data-event="backColor">\x3c!-- back colors --\x3e</div>', "<div>", '<button type="button" class="note-color-select btn btn-light btn-default" data-event="openPalette" data-value="backColorPicker-' + this.options.id + '">', this.lang.color.cpSelect, "</button>", '<input type="color" id="backColorPicker-' + this.options.id + '" class="note-btn note-color-select-btn" value="' + this.options.colorButton.backColor + '" data-event="backColorPalette-' + this.options.id + '">', "</div>", '<div class="note-holder-custom" id="backColorPalette-' + this.options.id + '" data-event="backColor"></div>', "</div>"].join("") : "") + (l ? ['<div class="note-palette">', '<div class="note-palette-title">' + this.lang.color.foreground + "</div>", "<div>", '<button type="button" class="note-color-reset btn btn-light btn-default" data-event="removeFormat" data-value="foreColor">', this.lang.color.resetToDefault, "</button>", "</div>", '<div class="note-holder" data-event="foreColor">\x3c!-- fore colors --\x3e</div>', "<div>", '<button type="button" class="note-color-select btn btn-light btn-default" data-event="openPalette" data-value="foreColorPicker-' + this.options.id + '">', this.lang.color.cpSelect, "</button>", '<input type="color" id="foreColorPicker-' + this.options.id + '" class="note-btn note-color-select-btn" value="' + this.options.colorButton.foreColor + '" data-event="foreColorPalette-' + this.options.id + '">', "</div>", '<div class="note-holder-custom" id="foreColorPalette-' + this.options.id + '" data-event="foreColor"></div>', "</div>"].join("") : ""),
									callback: function(w) {
										w.find(".note-holder").each(function(N, P) {
											var R = v()(P);
											R.append(f.ui.palette({
												colors: f.options.colors,
												colorsName: f.options.colorsName,
												eventName: R.data("event"),
												container: f.options.container,
												tooltip: f.options.tooltip
											}).render())
										});
										var b = [
											["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]
										];
										w.find(".note-holder-custom").each(function(N, P) {
											var R = v()(P);
											R.append(f.ui.palette({
												colors: b,
												colorsName: b,
												eventName: R.data("event"),
												container: f.options.container,
												tooltip: f.options.tooltip
											}).render())
										}), w.find("input[type=color]").each(function(N, P) {
											v()(P).change(function() {
												var R = w.find("#" + v()(this).data("event")).find(".note-color-btn").first(),
													B = this.value.toUpperCase();
												R.css("background-color", B).attr("aria-label", B).attr("data-value", B).attr("data-original-title", B), R.click()
											})
										})
									},
									click: function(w) {
										w.stopPropagation();
										var b = v()("." + t).find(".note-dropdown-menu"),
											N = v()(w.target),
											P = N.data("event"),
											R = N.attr("data-value");
										if ("openPalette" === P) {
											var B = b.find("#" + R),
												H = v()(b.find("#" + B.data("event")).find(".note-color-row")[0]),
												Y = H.find(".note-color-btn").last().detach(),
												ht = B.val();
											Y.css("background-color", ht).attr("aria-label", ht).attr("data-value", ht).attr("data-original-title", ht), H.prepend(Y), B.click()
										} else {
											if (_.contains(["backColor", "foreColor"], P)) {
												var xt = "backColor" === P ? "background-color" : "color",
													he = N.closest(".note-color").find(".note-recent-color"),
													Re = N.closest(".note-color").find(".note-current-color-button");
												he.css(xt, R), Re.attr("data-" + P, R)
											}
											f.context.invoke("editor." + P, R)
										}
									}
								})]
							}).render()
						}
					}, {
						key: "addToolbarButtons",
						value: function() {
							var t = this;
							this.context.memo("button.style", function() {
								return t.ui.buttonGroup([t.button({
									className: "dropdown-toggle",
									contents: t.ui.dropdownButtonContents(t.ui.icon(t.options.icons.magic), t.options),
									tooltip: t.lang.style.style,
									data: {
										toggle: "dropdown"
									}
								}), t.ui.dropdown({
									className: "dropdown-style",
									items: t.options.styleTags,
									title: t.lang.style.style,
									template: function(B) {
										"string" == typeof B && (B = {
											tag: B,
											title: Object.prototype.hasOwnProperty.call(t.lang.style, B) ? t.lang.style[B] : B
										});
										var H = B.tag;
										return "<" + H + (B.style ? ' style="' + B.style + '" ' : "") + (B.className ? ' class="' + B.className + '"' : "") + ">" + B.title + "</" + H + ">"
									},
									click: t.context.createInvokeHandler("editor.formatBlock")
								})]).render()
							});
							for (var n = function(B, H) {
									var Y = t.options.styleTags[B];
									t.context.memo("button.style." + Y, function() {
										return t.button({
											className: "note-btn-style-" + Y,
											contents: '<div data-value="' + Y + '">' + Y.toUpperCase() + "</div>",
											tooltip: t.lang.style[Y],
											click: t.context.createInvokeHandler("editor.formatBlock")
										}).render()
									})
								}, a = 0, l = this.options.styleTags.length; a < l; a++) n(a);
							this.context.memo("button.bold", function() {
								return t.button({
									className: "note-btn-bold",
									contents: t.ui.icon(t.options.icons.bold),
									tooltip: t.lang.font.bold + t.representShortcut("bold"),
									click: t.context.createInvokeHandlerAndUpdateState("editor.bold")
								}).render()
							}), this.context.memo("button.italic", function() {
								return t.button({
									className: "note-btn-italic",
									contents: t.ui.icon(t.options.icons.italic),
									tooltip: t.lang.font.italic + t.representShortcut("italic"),
									click: t.context.createInvokeHandlerAndUpdateState("editor.italic")
								}).render()
							}), this.context.memo("button.underline", function() {
								return t.button({
									className: "note-btn-underline",
									contents: t.ui.icon(t.options.icons.underline),
									tooltip: t.lang.font.underline + t.representShortcut("underline"),
									click: t.context.createInvokeHandlerAndUpdateState("editor.underline")
								}).render()
							}), this.context.memo("button.clear", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.eraser),
									tooltip: t.lang.font.clear + t.representShortcut("removeFormat"),
									click: t.context.createInvokeHandler("editor.removeFormat")
								}).render()
							}), this.context.memo("button.strikethrough", function() {
								return t.button({
									className: "note-btn-strikethrough",
									contents: t.ui.icon(t.options.icons.strikethrough),
									tooltip: t.lang.font.strikethrough + t.representShortcut("strikethrough"),
									click: t.context.createInvokeHandlerAndUpdateState("editor.strikethrough")
								}).render()
							}), this.context.memo("button.superscript", function() {
								return t.button({
									className: "note-btn-superscript",
									contents: t.ui.icon(t.options.icons.superscript),
									tooltip: t.lang.font.superscript,
									click: t.context.createInvokeHandlerAndUpdateState("editor.superscript")
								}).render()
							}), this.context.memo("button.subscript", function() {
								return t.button({
									className: "note-btn-subscript",
									contents: t.ui.icon(t.options.icons.subscript),
									tooltip: t.lang.font.subscript,
									click: t.context.createInvokeHandlerAndUpdateState("editor.subscript")
								}).render()
							}), this.context.memo("button.fontname", function() {
								var B = t.context.invoke("editor.currentStyle");
								return t.options.addDefaultFonts && v().each(B["font-family"].split(","), function(H, Y) {
									Y = Y.trim().replace(/['"]+/g, ""), t.isFontDeservedToAdd(Y) && -1 === t.options.fontNames.indexOf(Y) && t.options.fontNames.push(Y)
								}), t.ui.buttonGroup([t.button({
									className: "dropdown-toggle",
									contents: t.ui.dropdownButtonContents('<span class="note-current-fontname"></span>', t.options),
									tooltip: t.lang.font.name,
									data: {
										toggle: "dropdown"
									}
								}), t.ui.dropdownCheck({
									className: "dropdown-fontname",
									checkClassName: t.options.icons.menuCheck,
									items: t.options.fontNames.filter(t.isFontInstalled.bind(t)),
									title: t.lang.font.name,
									template: function(H) {
										return '<span style="font-family: ' + wt.validFontName(H) + '">' + H + "</span>"
									},
									click: t.context.createInvokeHandlerAndUpdateState("editor.fontName")
								})]).render()
							}), this.context.memo("button.fontsize", function() {
								return t.ui.buttonGroup([t.button({
									className: "dropdown-toggle",
									contents: t.ui.dropdownButtonContents('<span class="note-current-fontsize"></span>', t.options),
									tooltip: t.lang.font.size,
									data: {
										toggle: "dropdown"
									}
								}), t.ui.dropdownCheck({
									className: "dropdown-fontsize",
									checkClassName: t.options.icons.menuCheck,
									items: t.options.fontSizes,
									title: t.lang.font.size,
									click: t.context.createInvokeHandlerAndUpdateState("editor.fontSize")
								})]).render()
							}), this.context.memo("button.fontsizeunit", function() {
								return t.ui.buttonGroup([t.button({
									className: "dropdown-toggle",
									contents: t.ui.dropdownButtonContents('<span class="note-current-fontsizeunit"></span>', t.options),
									tooltip: t.lang.font.sizeunit,
									data: {
										toggle: "dropdown"
									}
								}), t.ui.dropdownCheck({
									className: "dropdown-fontsizeunit",
									checkClassName: t.options.icons.menuCheck,
									items: t.options.fontSizeUnits,
									title: t.lang.font.sizeunit,
									click: t.context.createInvokeHandlerAndUpdateState("editor.fontSizeUnit")
								})]).render()
							}), this.context.memo("button.color", function() {
								return t.colorPalette("note-color-all", t.lang.color.recent, !0, !0)
							}), this.context.memo("button.forecolor", function() {
								return t.colorPalette("note-color-fore", t.lang.color.foreground, !1, !0)
							}), this.context.memo("button.backcolor", function() {
								return t.colorPalette("note-color-back", t.lang.color.background, !0, !1)
							}), this.context.memo("button.ul", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.unorderedlist),
									tooltip: t.lang.lists.unordered + t.representShortcut("insertUnorderedList"),
									click: t.context.createInvokeHandler("editor.insertUnorderedList")
								}).render()
							}), this.context.memo("button.ol", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.orderedlist),
									tooltip: t.lang.lists.ordered + t.representShortcut("insertOrderedList"),
									click: t.context.createInvokeHandler("editor.insertOrderedList")
								}).render()
							});
							var f = this.button({
									contents: this.ui.icon(this.options.icons.alignLeft),
									tooltip: this.lang.paragraph.left + this.representShortcut("justifyLeft"),
									click: this.context.createInvokeHandler("editor.justifyLeft")
								}),
								w = this.button({
									contents: this.ui.icon(this.options.icons.alignCenter),
									tooltip: this.lang.paragraph.center + this.representShortcut("justifyCenter"),
									click: this.context.createInvokeHandler("editor.justifyCenter")
								}),
								b = this.button({
									contents: this.ui.icon(this.options.icons.alignRight),
									tooltip: this.lang.paragraph.right + this.representShortcut("justifyRight"),
									click: this.context.createInvokeHandler("editor.justifyRight")
								}),
								N = this.button({
									contents: this.ui.icon(this.options.icons.alignJustify),
									tooltip: this.lang.paragraph.justify + this.representShortcut("justifyFull"),
									click: this.context.createInvokeHandler("editor.justifyFull")
								}),
								P = this.button({
									contents: this.ui.icon(this.options.icons.outdent),
									tooltip: this.lang.paragraph.outdent + this.representShortcut("outdent"),
									click: this.context.createInvokeHandler("editor.outdent")
								}),
								R = this.button({
									contents: this.ui.icon(this.options.icons.indent),
									tooltip: this.lang.paragraph.indent + this.representShortcut("indent"),
									click: this.context.createInvokeHandler("editor.indent")
								});
							this.context.memo("button.justifyLeft", X.invoke(f, "render")), this.context.memo("button.justifyCenter", X.invoke(w, "render")), this.context.memo("button.justifyRight", X.invoke(b, "render")), this.context.memo("button.justifyFull", X.invoke(N, "render")), this.context.memo("button.outdent", X.invoke(P, "render")), this.context.memo("button.indent", X.invoke(R, "render")), this.context.memo("button.paragraph", function() {
								return t.ui.buttonGroup([t.button({
									className: "dropdown-toggle",
									contents: t.ui.dropdownButtonContents(t.ui.icon(t.options.icons.alignLeft), t.options),
									tooltip: t.lang.paragraph.paragraph,
									data: {
										toggle: "dropdown"
									}
								}), t.ui.dropdown([t.ui.buttonGroup({
									className: "note-align",
									children: [f, w, b, N]
								}), t.ui.buttonGroup({
									className: "note-list",
									children: [P, R]
								})])]).render()
							}), this.context.memo("button.height", function() {
								return t.ui.buttonGroup([t.button({
									className: "dropdown-toggle",
									contents: t.ui.dropdownButtonContents(t.ui.icon(t.options.icons.textHeight), t.options),
									tooltip: t.lang.font.height,
									data: {
										toggle: "dropdown"
									}
								}), t.ui.dropdownCheck({
									items: t.options.lineHeights,
									checkClassName: t.options.icons.menuCheck,
									className: "dropdown-line-height",
									title: t.lang.font.height,
									click: t.context.createInvokeHandler("editor.lineHeight")
								})]).render()
							}), this.context.memo("button.table", function() {
								return t.ui.buttonGroup([t.button({
									className: "dropdown-toggle",
									contents: t.ui.dropdownButtonContents(t.ui.icon(t.options.icons.table), t.options),
									tooltip: t.lang.table.table,
									data: {
										toggle: "dropdown"
									}
								}), t.ui.dropdown({
									title: t.lang.table.table,
									className: "note-table",
									items: ['<div class="note-dimension-picker">', '<div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div>', '<div class="note-dimension-picker-highlighted"></div>', '<div class="note-dimension-picker-unhighlighted"></div>', "</div>", '<div class="note-dimension-display">1 x 1</div>'].join("")
								})], {
									callback: function(B) {
										B.find(".note-dimension-picker-mousecatcher").css({
											width: t.options.insertTableMaxSize.col + "em",
											height: t.options.insertTableMaxSize.row + "em"
										}).mouseup(t.context.createInvokeHandler("editor.insertTable")).on("mousemove", t.tableMoveHandler.bind(t))
									}
								}).render()
							}), this.context.memo("button.link", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.link),
									tooltip: t.lang.link.link + t.representShortcut("linkDialog.show"),
									click: t.context.createInvokeHandler("linkDialog.show")
								}).render()
							}), this.context.memo("button.picture", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.picture),
									tooltip: t.lang.image.image,
									click: t.context.createInvokeHandler("imageDialog.show")
								}).render()
							}), this.context.memo("button.video", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.video),
									tooltip: t.lang.video.video,
									click: t.context.createInvokeHandler("videoDialog.show")
								}).render()
							}), this.context.memo("button.hr", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.minus),
									tooltip: t.lang.hr.insert + t.representShortcut("insertHorizontalRule"),
									click: t.context.createInvokeHandler("editor.insertHorizontalRule")
								}).render()
							}), this.context.memo("button.fullscreen", function() {
								return t.button({
									className: "btn-fullscreen note-codeview-keep",
									contents: t.ui.icon(t.options.icons.arrowsAlt),
									tooltip: t.lang.options.fullscreen,
									click: t.context.createInvokeHandler("fullscreen.toggle")
								}).render()
							}), this.context.memo("button.codeview", function() {
								return t.button({
									className: "btn-codeview note-codeview-keep",
									contents: t.ui.icon(t.options.icons.code),
									tooltip: t.lang.options.codeview,
									click: t.context.createInvokeHandler("codeview.toggle")
								}).render()
							}), this.context.memo("button.redo", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.redo),
									tooltip: t.lang.history.redo + t.representShortcut("redo"),
									click: t.context.createInvokeHandler("editor.redo")
								}).render()
							}), this.context.memo("button.undo", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.undo),
									tooltip: t.lang.history.undo + t.representShortcut("undo"),
									click: t.context.createInvokeHandler("editor.undo")
								}).render()
							}), this.context.memo("button.help", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.question),
									tooltip: t.lang.options.help,
									click: t.context.createInvokeHandler("helpDialog.show")
								}).render()
							})
						}
					}, {
						key: "addImagePopoverButtons",
						value: function() {
							var t = this;
							this.context.memo("button.resizeFull", function() {
								return t.button({
									contents: '<span class="note-fontsize-10">100%</span>',
									tooltip: t.lang.image.resizeFull,
									click: t.context.createInvokeHandler("editor.resize", "1")
								}).render()
							}), this.context.memo("button.resizeHalf", function() {
								return t.button({
									contents: '<span class="note-fontsize-10">50%</span>',
									tooltip: t.lang.image.resizeHalf,
									click: t.context.createInvokeHandler("editor.resize", "0.5")
								}).render()
							}), this.context.memo("button.resizeQuarter", function() {
								return t.button({
									contents: '<span class="note-fontsize-10">25%</span>',
									tooltip: t.lang.image.resizeQuarter,
									click: t.context.createInvokeHandler("editor.resize", "0.25")
								}).render()
							}), this.context.memo("button.resizeNone", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.rollback),
									tooltip: t.lang.image.resizeNone,
									click: t.context.createInvokeHandler("editor.resize", "0")
								}).render()
							}), this.context.memo("button.floatLeft", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.floatLeft),
									tooltip: t.lang.image.floatLeft,
									click: t.context.createInvokeHandler("editor.floatMe", "left")
								}).render()
							}), this.context.memo("button.floatRight", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.floatRight),
									tooltip: t.lang.image.floatRight,
									click: t.context.createInvokeHandler("editor.floatMe", "right")
								}).render()
							}), this.context.memo("button.floatNone", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.rollback),
									tooltip: t.lang.image.floatNone,
									click: t.context.createInvokeHandler("editor.floatMe", "none")
								}).render()
							}), this.context.memo("button.removeMedia", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.trash),
									tooltip: t.lang.image.remove,
									click: t.context.createInvokeHandler("editor.removeMedia")
								}).render()
							})
						}
					}, {
						key: "addLinkPopoverButtons",
						value: function() {
							var t = this;
							this.context.memo("button.linkDialogShow", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.link),
									tooltip: t.lang.link.edit,
									click: t.context.createInvokeHandler("linkDialog.show")
								}).render()
							}), this.context.memo("button.unlink", function() {
								return t.button({
									contents: t.ui.icon(t.options.icons.unlink),
									tooltip: t.lang.link.unlink,
									click: t.context.createInvokeHandler("editor.unlink")
								}).render()
							})
						}
					}, {
						key: "addTablePopoverButtons",
						value: function() {
							var t = this;
							this.context.memo("button.addRowUp", function() {
								return t.button({
									className: "btn-md",
									contents: t.ui.icon(t.options.icons.rowAbove),
									tooltip: t.lang.table.addRowAbove,
									click: t.context.createInvokeHandler("editor.addRow", "top")
								}).render()
							}), this.context.memo("button.addRowDown", function() {
								return t.button({
									className: "btn-md",
									contents: t.ui.icon(t.options.icons.rowBelow),
									tooltip: t.lang.table.addRowBelow,
									click: t.context.createInvokeHandler("editor.addRow", "bottom")
								}).render()
							}), this.context.memo("button.addColLeft", function() {
								return t.button({
									className: "btn-md",
									contents: t.ui.icon(t.options.icons.colBefore),
									tooltip: t.lang.table.addColLeft,
									click: t.context.createInvokeHandler("editor.addCol", "left")
								}).render()
							}), this.context.memo("button.addColRight", function() {
								return t.button({
									className: "btn-md",
									contents: t.ui.icon(t.options.icons.colAfter),
									tooltip: t.lang.table.addColRight,
									click: t.context.createInvokeHandler("editor.addCol", "right")
								}).render()
							}), this.context.memo("button.deleteRow", function() {
								return t.button({
									className: "btn-md",
									contents: t.ui.icon(t.options.icons.rowRemove),
									tooltip: t.lang.table.delRow,
									click: t.context.createInvokeHandler("editor.deleteRow")
								}).render()
							}), this.context.memo("button.deleteCol", function() {
								return t.button({
									className: "btn-md",
									contents: t.ui.icon(t.options.icons.colRemove),
									tooltip: t.lang.table.delCol,
									click: t.context.createInvokeHandler("editor.deleteCol")
								}).render()
							}), this.context.memo("button.deleteTable", function() {
								return t.button({
									className: "btn-md",
									contents: t.ui.icon(t.options.icons.trash),
									tooltip: t.lang.table.delTable,
									click: t.context.createInvokeHandler("editor.deleteTable")
								}).render()
							})
						}
					}, {
						key: "build",
						value: function(t, n) {
							for (var a = 0, l = n.length; a < l; a++) {
								for (var f = n[a], w = Array.isArray(f) ? f[0] : f, b = Array.isArray(f) ? 1 === f.length ? [f[0]] : f[1] : [f], N = this.ui.buttonGroup({
										className: "note-" + w
									}).render(), P = 0, R = b.length; P < R; P++) {
									var B = this.context.memo("button." + b[P]);
									B && N.append("function" == typeof B ? B(this.context) : B)
								}
								N.appendTo(t)
							}
						}
					}, {
						key: "updateCurrentStyle",
						value: function(t) {
							var n = t || this.$toolbar,
								a = this.context.invoke("editor.currentStyle");
							if (this.updateBtnStates(n, {
									".note-btn-bold": function() {
										return "bold" === a["font-bold"]
									},
									".note-btn-italic": function() {
										return "italic" === a["font-italic"]
									},
									".note-btn-underline": function() {
										return "underline" === a["font-underline"]
									},
									".note-btn-subscript": function() {
										return "subscript" === a["font-subscript"]
									},
									".note-btn-superscript": function() {
										return "superscript" === a["font-superscript"]
									},
									".note-btn-strikethrough": function() {
										return "strikethrough" === a["font-strikethrough"]
									}
								}), a["font-family"]) {
								var l = a["font-family"].split(",").map(function(P) {
										return P.replace(/[\'\"]/g, "").replace(/\s+$/, "").replace(/^\s+/, "")
									}),
									f = _.find(l, this.isFontInstalled.bind(this));
								n.find(".dropdown-fontname a").each(function(P, R) {
									var B = v()(R),
										H = B.data("value") + "" == f + "";
									B.toggleClass("checked", H)
								}), n.find(".note-current-fontname").text(f).css("font-family", f)
							}
							if (a["font-size"]) {
								var w = a["font-size"];
								n.find(".dropdown-fontsize a").each(function(P, R) {
									var B = v()(R),
										H = B.data("value") + "" == w + "";
									B.toggleClass("checked", H)
								}), n.find(".note-current-fontsize").text(w);
								var b = a["font-size-unit"];
								n.find(".dropdown-fontsizeunit a").each(function(P, R) {
									var B = v()(R),
										H = B.data("value") + "" == b + "";
									B.toggleClass("checked", H)
								}), n.find(".note-current-fontsizeunit").text(b)
							}
							if (a["line-height"]) {
								var N = a["line-height"];
								n.find(".dropdown-line-height a").each(function(P, R) {
									var B = v()(R),
										H = v()(R).data("value") + "" == N + "";
									B.toggleClass("checked", H)
								}), n.find(".note-current-line-height").text(N)
							}
						}
					}, {
						key: "updateBtnStates",
						value: function(t, n) {
							var a = this;
							v().each(n, function(l, f) {
								a.ui.toggleBtnActive(t.find(l), f())
							})
						}
					}, {
						key: "tableMoveHandler",
						value: function(t) {
							var n, a = v()(t.target.parentNode),
								l = a.next(),
								f = a.find(".note-dimension-picker-mousecatcher"),
								w = a.find(".note-dimension-picker-highlighted"),
								b = a.find(".note-dimension-picker-unhighlighted");
							if (void 0 === t.offsetX) {
								var N = v()(t.target).offset();
								n = {
									x: t.pageX - N.left,
									y: t.pageY - N.top
								}
							} else n = {
								x: t.offsetX,
								y: t.offsetY
							};
							var P = Math.ceil(n.x / 18) || 1,
								R = Math.ceil(n.y / 18) || 1;
							w.css({
								width: P + "em",
								height: R + "em"
							}), f.data("value", P + "x" + R), P > 3 && P < this.options.insertTableMaxSize.col && b.css({
								width: P + 1 + "em"
							}), R > 3 && R < this.options.insertTableMaxSize.row && b.css({
								height: R + 1 + "em"
							}), l.html(P + " x " + R)
						}
					}]) && function Be(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var sn = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.$window = v()(window), this.$document = v()(document), this.ui = v().summernote.ui, this.$note = t.layoutInfo.note, this.$editor = t.layoutInfo.editor, this.$toolbar = t.layoutInfo.toolbar, this.$editable = t.layoutInfo.editable, this.$statusbar = t.layoutInfo.statusbar, this.options = t.options, this.isFollowing = !1, this.followScroll = this.followScroll.bind(this)
					}
					var s;
					return (s = [{
						key: "shouldInitialize",
						value: function() {
							return !this.options.airMode
						}
					}, {
						key: "initialize",
						value: function() {
							var t = this;
							this.options.toolbar = this.options.toolbar || [], this.options.toolbar.length ? this.context.invoke("buttons.build", this.$toolbar, this.options.toolbar) : this.$toolbar.hide(), this.options.toolbarContainer && this.$toolbar.appendTo(this.options.toolbarContainer), this.changeContainer(!1), this.$note.on("summernote.keyup summernote.mouseup summernote.change", function() {
								t.context.invoke("buttons.updateCurrentStyle")
							}), this.context.invoke("buttons.updateCurrentStyle"), this.options.followingToolbar && this.$window.on("scroll resize", this.followScroll)
						}
					}, {
						key: "destroy",
						value: function() {
							this.$toolbar.children().remove(), this.options.followingToolbar && this.$window.off("scroll resize", this.followScroll)
						}
					}, {
						key: "followScroll",
						value: function() {
							if (this.$editor.hasClass("fullscreen")) return !1;
							var t = this.$editor.outerHeight(),
								n = this.$editor.width(),
								a = this.$toolbar.height(),
								l = this.$statusbar.height(),
								f = 0;
							this.options.otherStaticBar && (f = v()(this.options.otherStaticBar).outerHeight());
							var w = this.$document.scrollTop(),
								b = this.$editor.offset().top,
								N = b - f,
								P = b + t - f - a - l;
							!this.isFollowing && w > N && w < P - a ? (this.isFollowing = !0, this.$editable.css({
								marginTop: this.$toolbar.outerHeight()
							}), this.$toolbar.css({
								position: "fixed",
								top: f,
								width: n,
								zIndex: 1e3
							})) : this.isFollowing && (w < N || w > P) && (this.isFollowing = !1, this.$toolbar.css({
								position: "relative",
								top: 0,
								width: "100%",
								zIndex: "auto"
							}), this.$editable.css({
								marginTop: ""
							}))
						}
					}, {
						key: "changeContainer",
						value: function(t) {
							t ? this.$toolbar.prependTo(this.$editor) : this.options.toolbarContainer && this.$toolbar.appendTo(this.options.toolbarContainer), this.options.followingToolbar && this.followScroll()
						}
					}, {
						key: "updateFullscreen",
						value: function(t) {
							this.ui.toggleBtnActive(this.$toolbar.find(".btn-fullscreen"), t), this.changeContainer(t)
						}
					}, {
						key: "updateCodeview",
						value: function(t) {
							this.ui.toggleBtnActive(this.$toolbar.find(".btn-codeview"), t), t ? this.deactivate() : this.activate()
						}
					}, {
						key: "activate",
						value: function(t) {
							var n = this.$toolbar.find("button");
							t || (n = n.not(".note-codeview-keep")), this.ui.toggleBtn(n, !0)
						}
					}, {
						key: "deactivate",
						value: function(t) {
							var n = this.$toolbar.find("button");
							t || (n = n.not(".note-codeview-keep")), this.ui.toggleBtn(n, !1)
						}
					}]) && function Le(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var Ve = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.ui = v().summernote.ui, this.$body = v()(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo, t.memo("help.linkDialog.show", this.options.langInfo.help["linkDialog.show"])
					}
					var s;
					return (s = [{
						key: "initialize",
						value: function() {
							var t = this.options.dialogsInBody ? this.$body : this.options.container,
								n = ['<div class="form-group note-form-group">', '<label for="note-dialog-link-txt-'.concat(this.options.id, '" class="note-form-label">').concat(this.lang.link.textToDisplay, "</label>"), '<input id="note-dialog-link-txt-'.concat(this.options.id, '" class="note-link-text form-control note-form-control note-input" type="text"/>'), "</div>", '<div class="form-group note-form-group">', '<label for="note-dialog-link-url-'.concat(this.options.id, '" class="note-form-label">').concat(this.lang.link.url, "</label>"), '<input id="note-dialog-link-url-'.concat(this.options.id, '" class="note-link-url form-control note-form-control note-input" type="text" value="http://"/>'), "</div>", this.options.disableLinkTarget ? "" : v()("<div></div>").append(this.ui.checkbox({
									className: "sn-checkbox-open-in-new-window",
									text: this.lang.link.openInNewWindow,
									checked: !0
								}).render()).html(), v()("<div></div>").append(this.ui.checkbox({
									className: "sn-checkbox-use-protocol",
									text: this.lang.link.useProtocol,
									checked: !0
								}).render()).html()].join(""),
								a = '<input type="button" href="#" class="'.concat("btn btn-primary note-btn note-btn-primary note-link-btn", '" value="').concat(this.lang.link.insert, '" disabled>');
							this.$dialog = this.ui.dialog({
								className: "link-dialog",
								title: this.lang.link.insert,
								fade: this.options.dialogsFade,
								body: n,
								footer: a
							}).render().appendTo(t)
						}
					}, {
						key: "destroy",
						value: function() {
							this.ui.hideDialog(this.$dialog), this.$dialog.remove()
						}
					}, {
						key: "bindEnterKey",
						value: function(t, n) {
							t.on("keypress", function(a) {
								a.keyCode === m.code.ENTER && (a.preventDefault(), n.trigger("click"))
							})
						}
					}, {
						key: "toggleLinkBtn",
						value: function(t, n, a) {
							this.ui.toggleBtn(t, n.val() && a.val())
						}
					}, {
						key: "showLinkDialog",
						value: function(t) {
							var n = this;
							return v().Deferred(function(a) {
								var l = n.$dialog.find(".note-link-text"),
									f = n.$dialog.find(".note-link-url"),
									w = n.$dialog.find(".note-link-btn"),
									b = n.$dialog.find(".sn-checkbox-open-in-new-window input[type=checkbox]"),
									N = n.$dialog.find(".sn-checkbox-use-protocol input[type=checkbox]");
								n.ui.onDialogShown(n.$dialog, function() {
									n.context.triggerEvent("dialog.shown"), !t.url && X.isValidUrl(t.text) && (t.url = t.text), l.on("input paste propertychange", function() {
										t.text = l.val(), n.toggleLinkBtn(w, l, f)
									}).val(t.text), f.on("input paste propertychange", function() {
										t.text || l.val(f.val()), n.toggleLinkBtn(w, l, f)
									}).val(t.url), wt.isSupportTouch || f.trigger("focus"), n.toggleLinkBtn(w, l, f), n.bindEnterKey(f, w), n.bindEnterKey(l, w), b.prop("checked", void 0 !== t.isNewWindow ? t.isNewWindow : n.context.options.linkTargetBlank), N.prop("checked", !t.url && n.context.options.useProtocol), w.one("click", function(B) {
										B.preventDefault(), a.resolve({
											range: t.range,
											url: f.val(),
											text: l.val(),
											isNewWindow: b.is(":checked"),
											checkProtocol: N.is(":checked")
										}), n.ui.hideDialog(n.$dialog)
									})
								}), n.ui.onDialogHidden(n.$dialog, function() {
									l.off(), f.off(), w.off(), "pending" === a.state() && a.reject()
								}), n.ui.showDialog(n.$dialog)
							}).promise()
						}
					}, {
						key: "show",
						value: function() {
							var t = this,
								n = this.context.invoke("editor.getLinkInfo");
							this.context.invoke("editor.saveRange"), this.showLinkDialog(n).then(function(a) {
								t.context.invoke("editor.restoreRange"), t.context.invoke("editor.createLink", a)
							}).fail(function() {
								t.context.invoke("editor.restoreRange")
							})
						}
					}]) && function Je(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var Qe = function() {
					function e(t) {
						var n = this;
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.ui = v().summernote.ui, this.options = t.options, this.events = {
							"summernote.keyup summernote.mouseup summernote.change summernote.scroll": function() {
								n.update()
							},
							"summernote.disable summernote.dialog.shown": function() {
								n.hide()
							},
							"summernote.blur": function(a, l) {
								l.originalEvent && l.originalEvent.relatedTarget && n.$popover[0].contains(l.originalEvent.relatedTarget) || n.hide()
							}
						}
					}
					var s;
					return (s = [{
						key: "shouldInitialize",
						value: function() {
							return !_.isEmpty(this.options.popover.link)
						}
					}, {
						key: "initialize",
						value: function() {
							this.$popover = this.ui.popover({
								className: "note-link-popover",
								callback: function(n) {
									n.find(".popover-content,.note-popover-content").prepend('<span><a target="_blank"></a>&nbsp;</span>')
								}
							}).render().appendTo(this.options.container);
							var t = this.$popover.find(".popover-content,.note-popover-content");
							this.context.invoke("buttons.build", t, this.options.popover.link), this.$popover.on("mousedown", function(n) {
								n.preventDefault()
							})
						}
					}, {
						key: "destroy",
						value: function() {
							this.$popover.remove()
						}
					}, {
						key: "update",
						value: function() {
							if (this.context.invoke("editor.hasFocus")) {
								var t = this.context.invoke("editor.getLastRange");
								if (t.isCollapsed() && t.isOnAnchor()) {
									var n = p.ancestor(t.sc, p.isAnchor),
										a = v()(n).attr("href");
									this.$popover.find("a").attr("href", a).text(a);
									var l = p.posFromPlaceholder(n),
										f = v()(this.options.container).offset();
									l.top -= f.top, l.left -= f.left, this.$popover.css({
										display: "block",
										left: l.left,
										top: l.top
									})
								} else this.hide()
							} else this.hide()
						}
					}, {
						key: "hide",
						value: function() {
							this.$popover.hide()
						}
					}]) && function ln(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var bn = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.ui = v().summernote.ui, this.$body = v()(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo
					}
					var s;
					return (s = [{
						key: "initialize",
						value: function() {
							var t = "";
							if (this.options.maximumImageFileSize) {
								var n = Math.floor(Math.log(this.options.maximumImageFileSize) / Math.log(1024)),
									a = 1 * (this.options.maximumImageFileSize / Math.pow(1024, n)).toFixed(2) + " " + " KMGTP" [n] + "B";
								t = "<small>".concat(this.lang.image.maximumFileSize + " : " + a, "</small>")
							}
							var l = this.options.dialogsInBody ? this.$body : this.options.container,
								f = ['<div class="form-group note-form-group note-group-select-from-files">', '<label for="note-dialog-image-file-' + this.options.id + '" class="note-form-label">' + this.lang.image.selectFromFiles + "</label>", '<input id="note-dialog-image-file-' + this.options.id + '" class="note-image-input form-control-file note-form-control note-input" ', ' type="file" name="files" accept="' + this.options.acceptImageFileTypes + '" multiple="multiple"/>', t, "</div>", '<div class="form-group note-group-image-url">', '<label for="note-dialog-image-url-' + this.options.id + '" class="note-form-label">' + this.lang.image.url + "</label>", '<input id="note-dialog-image-url-' + this.options.id + '" class="note-image-url form-control note-form-control note-input" type="text"/>', "</div>"].join(""),
								w = '<input type="button" href="#" class="'.concat("btn btn-primary note-btn note-btn-primary note-image-btn", '" value="').concat(this.lang.image.insert, '" disabled>');
							this.$dialog = this.ui.dialog({
								title: this.lang.image.insert,
								fade: this.options.dialogsFade,
								body: f,
								footer: w
							}).render().appendTo(l)
						}
					}, {
						key: "destroy",
						value: function() {
							this.ui.hideDialog(this.$dialog), this.$dialog.remove()
						}
					}, {
						key: "bindEnterKey",
						value: function(t, n) {
							t.on("keypress", function(a) {
								a.keyCode === m.code.ENTER && (a.preventDefault(), n.trigger("click"))
							})
						}
					}, {
						key: "show",
						value: function() {
							var t = this;
							this.context.invoke("editor.saveRange"), this.showImageDialog().then(function(n) {
								t.ui.hideDialog(t.$dialog), t.context.invoke("editor.restoreRange"), "string" == typeof n ? t.options.callbacks.onImageLinkInsert ? t.context.triggerEvent("image.link.insert", n) : t.context.invoke("editor.insertImage", n) : t.context.invoke("editor.insertImagesOrCallback", n)
							}).fail(function() {
								t.context.invoke("editor.restoreRange")
							})
						}
					}, {
						key: "showImageDialog",
						value: function() {
							var t = this;
							return v().Deferred(function(n) {
								var a = t.$dialog.find(".note-image-input"),
									l = t.$dialog.find(".note-image-url"),
									f = t.$dialog.find(".note-image-btn");
								t.ui.onDialogShown(t.$dialog, function() {
									t.context.triggerEvent("dialog.shown"), a.replaceWith(a.clone().on("change", function(w) {
										n.resolve(w.target.files || w.target.value)
									}).val("")), l.on("input paste propertychange", function() {
										t.ui.toggleBtn(f, l.val())
									}).val(""), wt.isSupportTouch || l.trigger("focus"), f.click(function(w) {
										w.preventDefault(), n.resolve(l.val())
									}), t.bindEnterKey(l, f)
								}), t.ui.onDialogHidden(t.$dialog, function() {
									a.off(), l.off(), f.off(), "pending" === n.state() && n.reject()
								}), t.ui.showDialog(t.$dialog)
							})
						}
					}]) && function We(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var Ge = function() {
					function e(t) {
						var n = this;
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.ui = v().summernote.ui, this.editable = t.layoutInfo.editable[0], this.options = t.options, this.events = {
							"summernote.disable summernote.dialog.shown": function() {
								n.hide()
							},
							"summernote.blur": function(a, l) {
								l.originalEvent && l.originalEvent.relatedTarget && n.$popover[0].contains(l.originalEvent.relatedTarget) || n.hide()
							}
						}
					}
					var s;
					return (s = [{
						key: "shouldInitialize",
						value: function() {
							return !_.isEmpty(this.options.popover.image)
						}
					}, {
						key: "initialize",
						value: function() {
							this.$popover = this.ui.popover({
								className: "note-image-popover"
							}).render().appendTo(this.options.container);
							var t = this.$popover.find(".popover-content,.note-popover-content");
							this.context.invoke("buttons.build", t, this.options.popover.image), this.$popover.on("mousedown", function(n) {
								n.preventDefault()
							})
						}
					}, {
						key: "destroy",
						value: function() {
							this.$popover.remove()
						}
					}, {
						key: "update",
						value: function(t, n) {
							if (p.isImg(t)) {
								var a = v()(t).offset(),
									l = v()(this.options.container).offset(),
									f = {};
								this.options.popatmouse ? (f.left = n.pageX - 20, f.top = n.pageY) : f = a, f.top -= l.top, f.left -= l.left, this.$popover.css({
									display: "block",
									left: f.left,
									top: f.top
								})
							} else this.hide()
						}
					}, {
						key: "hide",
						value: function() {
							this.$popover.hide()
						}
					}]) && function Ze(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var cn = function() {
					function e(t) {
						var n = this;
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.ui = v().summernote.ui, this.options = t.options, this.events = {
							"summernote.mousedown": function(a, l) {
								n.update(l.target)
							},
							"summernote.keyup summernote.scroll summernote.change": function() {
								n.update()
							},
							"summernote.disable summernote.dialog.shown": function() {
								n.hide()
							},
							"summernote.blur": function(a, l) {
								l.originalEvent && l.originalEvent.relatedTarget && n.$popover[0].contains(l.originalEvent.relatedTarget) || n.hide()
							}
						}
					}
					var s;
					return (s = [{
						key: "shouldInitialize",
						value: function() {
							return !_.isEmpty(this.options.popover.table)
						}
					}, {
						key: "initialize",
						value: function() {
							this.$popover = this.ui.popover({
								className: "note-table-popover"
							}).render().appendTo(this.options.container);
							var t = this.$popover.find(".popover-content,.note-popover-content");
							this.context.invoke("buttons.build", t, this.options.popover.table), wt.isFF && document.execCommand("enableInlineTableEditing", !1, !1), this.$popover.on("mousedown", function(n) {
								n.preventDefault()
							})
						}
					}, {
						key: "destroy",
						value: function() {
							this.$popover.remove()
						}
					}, {
						key: "update",
						value: function(t) {
							if (this.context.isDisabled()) return !1;
							var n = p.isCell(t) || p.isCell(null == t ? void 0 : t.parentElement);
							if (n) {
								var a = p.posFromPlaceholder(t),
									l = v()(this.options.container).offset();
								a.top -= l.top, a.left -= l.left, this.$popover.css({
									display: "block",
									left: a.left,
									top: a.top
								})
							} else this.hide();
							return n
						}
					}, {
						key: "hide",
						value: function() {
							this.$popover.hide()
						}
					}]) && function tn(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var yn = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.ui = v().summernote.ui, this.$body = v()(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo
					}
					var s;
					return (s = [{
						key: "initialize",
						value: function() {
							var t = this.options.dialogsInBody ? this.$body : this.options.container,
								n = ['<div class="form-group note-form-group row-fluid">', '<label for="note-dialog-video-url-'.concat(this.options.id, '" class="note-form-label">').concat(this.lang.video.url, ' <small class="text-muted">').concat(this.lang.video.providers, "</small></label>"), '<input id="note-dialog-video-url-'.concat(this.options.id, '" class="note-video-url form-control note-form-control note-input" type="text"/>'), "</div>"].join(""),
								a = '<input type="button" href="#" class="'.concat("btn btn-primary note-btn note-btn-primary note-video-btn", '" value="').concat(this.lang.video.insert, '" disabled>');
							this.$dialog = this.ui.dialog({
								title: this.lang.video.insert,
								fade: this.options.dialogsFade,
								body: n,
								footer: a
							}).render().appendTo(t)
						}
					}, {
						key: "destroy",
						value: function() {
							this.ui.hideDialog(this.$dialog), this.$dialog.remove()
						}
					}, {
						key: "bindEnterKey",
						value: function(t, n) {
							t.on("keypress", function(a) {
								a.keyCode === m.code.ENTER && (a.preventDefault(), n.trigger("click"))
							})
						}
					}, {
						key: "createVideoNode",
						value: function(t) {
							var n, a = t.match(/\/\/(?:(?:www|m)\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?$/),
								l = t.match(/(?:\.|\/\/)drive\.google\.com\/file\/d\/(.[a-zA-Z0-9_-]*)\/view/),
								f = t.match(/(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/),
								w = t.match(/\/\/vine\.co\/v\/([a-zA-Z0-9]+)/),
								b = t.match(/\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/),
								N = t.match(/.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/),
								P = t.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/),
								R = t.match(/\/\/(.*)\/videos\/watch\/([^?]*)(?:\?(?:start=(\w*))?(?:&stop=(\w*))?(?:&loop=([10]))?(?:&autoplay=([10]))?(?:&muted=([10]))?)?/),
								B = t.match(/\/\/v\.qq\.com.*?vid=(.+)/),
								H = t.match(/\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/),
								Y = t.match(/^.+.(mp4|m4v)$/),
								ht = t.match(/^.+.(ogg|ogv)$/),
								xt = t.match(/^.+.(webm)$/),
								he = t.match(/(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/);
							if (a && 11 === a[1].length) {
								var Re = a[1],
									le = 0;
								if (void 0 !== a[2]) {
									var Te = a[2].match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
									if (Te)
										for (var Ye = [3600, 60, 1], an = 0, Cn = Ye.length; an < Cn; an++) le += void 0 !== Te[an + 1] ? Ye[an] * parseInt(Te[an + 1], 10) : 0
								}
								n = v()("<iframe>").attr("frameborder", 0).attr("src", "//www.youtube.com/embed/" + Re + (le > 0 ? "?start=" + le : "")).attr("width", "640").attr("height", "360")
							} else if (l && l[0].length) n = v()("<iframe>").attr("frameborder", 0).attr("src", "https://drive.google.com/file/d/" + l[1] + "/preview").attr("width", "640").attr("height", "480");
							else if (f && f[0].length) n = v()("<iframe>").attr("frameborder", 0).attr("src", "https://instagram.com/p/" + f[1] + "/embed/").attr("width", "612").attr("height", "710").attr("scrolling", "no").attr("allowtransparency", "true");
							else if (w && w[0].length) n = v()("<iframe>").attr("frameborder", 0).attr("src", w[0] + "/embed/simple").attr("width", "600").attr("height", "600").attr("class", "vine-embed");
							else if (b && b[3].length) n = v()("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("src", "//player.vimeo.com/video/" + b[3]).attr("width", "640").attr("height", "360");
							else if (N && N[2].length) n = v()("<iframe>").attr("frameborder", 0).attr("src", "//www.dailymotion.com/embed/video/" + N[2]).attr("width", "640").attr("height", "360");
							else if (P && P[1].length) n = v()("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("height", "498").attr("width", "510").attr("src", "//player.youku.com/embed/" + P[1]);
							else if (R && R[0].length) {
								var vn = 0;
								"undefined" !== R[2] && (vn = R[2]);
								var An = 0;
								"undefined" !== R[3] && (An = R[3]);
								var In = 0;
								"undefined" !== R[4] && (In = R[4]);
								var Dn = 0;
								"undefined" !== R[5] && (Dn = R[5]);
								var Pn = 0;
								"undefined" !== R[6] && (Pn = R[6]), n = v()('<iframe allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups">').attr("frameborder", 0).attr("src", "//" + R[1] + "/videos/embed/" + R[2] + "?loop=" + In + "&autoplay=" + Dn + "&muted=" + Pn + (vn > 0 ? "&start=" + vn : "") + (An > 0 ? "&end=" + le : "")).attr("width", "560").attr("height", "315")
							} else if (B && B[1].length || H && H[2].length) {
								var Wn = B && B[1].length ? B[1] : H[2];
								n = v()("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("height", "310").attr("width", "500").attr("src", "https://v.qq.com/txp/iframe/player.html?vid=" + Wn + "&amp;auto=0")
							} else if (Y || ht || xt) n = v()("<video controls>").attr("src", t).attr("width", "640").attr("height", "360");
							else {
								if (!he || !he[0].length) return !1;
								n = v()("<iframe>").attr("frameborder", 0).attr("src", "https://www.facebook.com/plugins/video.php?href=" + encodeURIComponent(he[0]) + "&show_text=0&width=560").attr("width", "560").attr("height", "301").attr("scrolling", "no").attr("allowtransparency", "true")
							}
							return n.addClass("note-video-clip"), n[0]
						}
					}, {
						key: "show",
						value: function() {
							var t = this,
								n = this.context.invoke("editor.getSelectedText");
							this.context.invoke("editor.saveRange"), this.showVideoDialog(n).then(function(a) {
								t.ui.hideDialog(t.$dialog), t.context.invoke("editor.restoreRange");
								var l = t.createVideoNode(a);
								l && t.context.invoke("editor.insertNode", l)
							}).fail(function() {
								t.context.invoke("editor.restoreRange")
							})
						}
					}, {
						key: "showVideoDialog",
						value: function() {
							var t = this;
							return v().Deferred(function(n) {
								var a = t.$dialog.find(".note-video-url"),
									l = t.$dialog.find(".note-video-btn");
								t.ui.onDialogShown(t.$dialog, function() {
									t.context.triggerEvent("dialog.shown"), a.on("input paste propertychange", function() {
										t.ui.toggleBtn(l, a.val())
									}), wt.isSupportTouch || a.trigger("focus"), l.click(function(f) {
										f.preventDefault(), n.resolve(a.val())
									}), t.bindEnterKey(a, l)
								}), t.ui.onDialogHidden(t.$dialog, function() {
									a.off(), l.off(), "pending" === n.state() && n.reject()
								}), t.ui.showDialog(t.$dialog)
							})
						}
					}]) && function un(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var x = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.ui = v().summernote.ui, this.$body = v()(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo
					}
					var s;
					return (s = [{
						key: "initialize",
						value: function() {
							var t = this.options.dialogsInBody ? this.$body : this.options.container,
								n = ['<p class="text-center">', '<a href="http://summernote.org/" target="_blank" rel="noopener noreferrer">Summernote 0.8.20</a> \xb7 ', '<a href="https://github.com/summernote/summernote" target="_blank" rel="noopener noreferrer">Project</a> \xb7 ', '<a href="https://github.com/summernote/summernote/issues" target="_blank" rel="noopener noreferrer">Issues</a>', "</p>"].join("");
							this.$dialog = this.ui.dialog({
								title: this.lang.options.help,
								fade: this.options.dialogsFade,
								body: this.createShortcutList(),
								footer: n,
								callback: function(a) {
									a.find(".modal-body,.note-modal-body").css({
										"max-height": 300,
										overflow: "scroll"
									})
								}
							}).render().appendTo(t)
						}
					}, {
						key: "destroy",
						value: function() {
							this.ui.hideDialog(this.$dialog), this.$dialog.remove()
						}
					}, {
						key: "createShortcutList",
						value: function() {
							var t = this,
								n = this.options.keyMap[wt.isMac ? "mac" : "pc"];
							return Object.keys(n).map(function(a) {
								var l = n[a],
									f = v()('<div><div class="help-list-item"></div></div>');
								return f.append(v()("<label><kbd>" + a + "</kdb></label>").css({
									width: 180,
									"margin-right": 10
								})).append(v()("<span></span>").html(t.context.memo("help." + l) || l)), f.html()
							}).join("")
						}
					}, {
						key: "showHelpDialog",
						value: function() {
							var t = this;
							return v().Deferred(function(n) {
								t.ui.onDialogShown(t.$dialog, function() {
									t.context.triggerEvent("dialog.shown"), n.resolve()
								}), t.ui.showDialog(t.$dialog)
							}).promise()
						}
					}, {
						key: "show",
						value: function() {
							var t = this;
							this.context.invoke("editor.saveRange"), this.showHelpDialog().then(function() {
								t.context.invoke("editor.restoreRange")
							})
						}
					}]) && function _e(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var i = function() {
					function e(t) {
						var n = this;
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.ui = v().summernote.ui, this.options = t.options, this.hidable = !0, this.onContextmenu = !1, this.pageX = null, this.pageY = null, this.events = {
							"summernote.contextmenu": function(a) {
								n.options.editing && (a.preventDefault(), a.stopPropagation(), n.onContextmenu = !0, n.update(!0))
							},
							"summernote.mousedown": function(a, l) {
								n.pageX = l.pageX, n.pageY = l.pageY
							},
							"summernote.keyup summernote.mouseup summernote.scroll": function(a, l) {
								n.options.editing && !n.onContextmenu && (n.pageX = l.pageX, n.pageY = l.pageY, n.update()), n.onContextmenu = !1
							},
							"summernote.disable summernote.change summernote.dialog.shown summernote.blur": function() {
								n.hide()
							},
							"summernote.focusout": function() {
								n.$popover.is(":active,:focus") || n.hide()
							}
						}
					}
					var s;
					return (s = [{
						key: "shouldInitialize",
						value: function() {
							return this.options.airMode && !_.isEmpty(this.options.popover.air)
						}
					}, {
						key: "initialize",
						value: function() {
							var t = this;
							this.$popover = this.ui.popover({
								className: "note-air-popover"
							}).render().appendTo(this.options.container);
							var n = this.$popover.find(".popover-content");
							this.context.invoke("buttons.build", n, this.options.popover.air), this.$popover.on("mousedown", function() {
								t.hidable = !1
							}), this.$popover.on("mouseup", function() {
								t.hidable = !0
							})
						}
					}, {
						key: "destroy",
						value: function() {
							this.$popover.remove()
						}
					}, {
						key: "update",
						value: function(t) {
							var n = this.context.invoke("editor.currentStyle");
							if (!n.range || n.range.isCollapsed() && !t) this.hide();
							else {
								var a = {
										left: this.pageX,
										top: this.pageY
									},
									l = v()(this.options.container).offset();
								a.top -= l.top, a.left -= l.left, this.$popover.css({
									display: "block",
									left: Math.max(a.left, 0) + -5,
									top: a.top + 5
								}), this.context.invoke("buttons.updateCurrentStyle", this.$popover)
							}
						}
					}, {
						key: "updateCodeview",
						value: function(t) {
							this.ui.toggleBtnActive(this.$popover.find(".btn-codeview"), t), t && this.hide()
						}
					}, {
						key: "hide",
						value: function() {
							this.hidable && this.$popover.hide()
						}
					}]) && function k(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var g = function() {
					function e(t) {
						var n = this;
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.context = t, this.ui = v().summernote.ui, this.$editable = t.layoutInfo.editable, this.options = t.options, this.hint = this.options.hint || [], this.direction = this.options.hintDirection || "bottom", this.hints = Array.isArray(this.hint) ? this.hint : [this.hint], this.events = {
							"summernote.keyup": function(a, l) {
								l.isDefaultPrevented() || n.handleKeyup(l)
							},
							"summernote.keydown": function(a, l) {
								n.handleKeydown(l)
							},
							"summernote.disable summernote.dialog.shown summernote.blur": function() {
								n.hide()
							}
						}
					}
					var s;
					return (s = [{
						key: "shouldInitialize",
						value: function() {
							return this.hints.length > 0
						}
					}, {
						key: "initialize",
						value: function() {
							var t = this;
							this.lastWordRange = null, this.matchingWord = null, this.$popover = this.ui.popover({
								className: "note-hint-popover",
								hideArrow: !0,
								direction: ""
							}).render().appendTo(this.options.container), this.$popover.hide(), this.$content = this.$popover.find(".popover-content,.note-popover-content"), this.$content.on("click", ".note-hint-item", function(n) {
								t.$content.find(".active").removeClass("active"), v()(n.currentTarget).addClass("active"), t.replace()
							}), this.$popover.on("mousedown", function(n) {
								n.preventDefault()
							})
						}
					}, {
						key: "destroy",
						value: function() {
							this.$popover.remove()
						}
					}, {
						key: "selectItem",
						value: function(t) {
							this.$content.find(".active").removeClass("active"), t.addClass("active"), this.$content[0].scrollTop = t[0].offsetTop - this.$content.innerHeight() / 2
						}
					}, {
						key: "moveDown",
						value: function() {
							var t = this.$content.find(".note-hint-item.active"),
								n = t.next();
							if (n.length) this.selectItem(n);
							else {
								var a = t.parent().next();
								a.length || (a = this.$content.find(".note-hint-group").first()), this.selectItem(a.find(".note-hint-item").first())
							}
						}
					}, {
						key: "moveUp",
						value: function() {
							var t = this.$content.find(".note-hint-item.active"),
								n = t.prev();
							if (n.length) this.selectItem(n);
							else {
								var a = t.parent().prev();
								a.length || (a = this.$content.find(".note-hint-group").last()), this.selectItem(a.find(".note-hint-item").last())
							}
						}
					}, {
						key: "replace",
						value: function() {
							var t = this.$content.find(".note-hint-item.active");
							if (t.length) {
								var n = this.nodeFromItem(t);
								if (null !== this.matchingWord && 0 === this.matchingWord.length) this.lastWordRange.so = this.lastWordRange.eo;
								else if (null !== this.matchingWord && this.matchingWord.length > 0 && !this.lastWordRange.isCollapsed()) {
									var a = this.lastWordRange.eo - this.lastWordRange.so - this.matchingWord.length;
									a > 0 && (this.lastWordRange.so += a)
								}
								if (this.lastWordRange.insertNode(n), "next" === this.options.hintSelect) {
									var l = document.createTextNode("");
									v()(n).after(l), d.createFromNodeBefore(l).select()
								} else d.createFromNodeAfter(n).select();
								this.lastWordRange = null, this.hide(), this.context.invoke("editor.focus"), this.context.triggerEvent("change", this.$editable.html(), this.$editable)
							}
						}
					}, {
						key: "nodeFromItem",
						value: function(t) {
							var n = this.hints[t.data("index")],
								a = t.data("item"),
								l = n.content ? n.content(a) : a;
							return "string" == typeof l && (l = p.createText(l)), l
						}
					}, {
						key: "createItemTemplates",
						value: function(t, n) {
							var a = this.hints[t];
							return n.map(function(l) {
								var f = v()('<div class="note-hint-item"></div>');
								return f.append(a.template ? a.template(l) : l + ""), f.data({
									index: t,
									item: l
								}), f
							})
						}
					}, {
						key: "handleKeydown",
						value: function(t) {
							this.$popover.is(":visible") && (t.keyCode === m.code.ENTER ? (t.preventDefault(), this.replace()) : t.keyCode === m.code.UP ? (t.preventDefault(), this.moveUp()) : t.keyCode === m.code.DOWN && (t.preventDefault(), this.moveDown()))
						}
					}, {
						key: "searchKeyword",
						value: function(t, n, a) {
							var l = this.hints[t];
							if (l && l.match.test(n) && l.search) {
								var f = l.match.exec(n);
								this.matchingWord = f[0], l.search(f[1], a)
							} else a()
						}
					}, {
						key: "createGroup",
						value: function(t, n) {
							var a = this,
								l = v()('<div class="note-hint-group note-hint-group-' + t + '"></div>');
							return this.searchKeyword(t, n, function(f) {
								(f = f || []).length && (l.html(a.createItemTemplates(t, f)), a.show())
							}), l
						}
					}, {
						key: "handleKeyup",
						value: function(t) {
							var n = this;
							if (!_.contains([m.code.ENTER, m.code.UP, m.code.DOWN], t.keyCode)) {
								var a, l, f = this.context.invoke("editor.getLastRange");
								if ("words" === this.options.hintMode) {
									if (a = f.getWordsRange(f), l = a.toString(), this.hints.forEach(function(N) {
											if (N.match.test(l)) return a = f.getWordsMatchRange(N.match), !1
										}), !a) return void this.hide();
									l = a.toString()
								} else a = f.getWordRange(), l = a.toString();
								if (this.hints.length && l) {
									this.$content.empty();
									var w = X.rect2bnd(_.last(a.getClientRects())),
										b = v()(this.options.container).offset();
									w && (w.top -= b.top, w.left -= b.left, this.$popover.hide(), this.lastWordRange = a, this.hints.forEach(function(N, P) {
										N.match.test(l) && n.createGroup(P, l).appendTo(n.$content)
									}), this.$content.find(".note-hint-item:first").addClass("active"), this.$popover.css("top" === this.direction ? {
										left: w.left,
										top: w.top - this.$popover.outerHeight() - 5
									} : {
										left: w.left,
										top: w.top + w.height + 5
									}))
								} else this.hide()
							}
						}
					}, {
						key: "show",
						value: function() {
							this.$popover.show()
						}
					}, {
						key: "hide",
						value: function() {
							this.$popover.hide()
						}
					}]) && function u(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();

				function E(e) {
					return (E = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
						return typeof o
					} : function(o) {
						return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o
					})(e)
				}
				v().summernote = v().extend(v().summernote, {
					version: "0.8.20",
					plugins: {},
					dom: p,
					range: d,
					lists: _,
					options: {
						langInfo: v().summernote.lang["en-US"],
						editing: !0,
						modules: {
							editor: vt,
							clipboard: Ht,
							dropzone: Et,
							codeview: kt,
							statusbar: Dt,
							fullscreen: ie,
							handle: ue,
							hintPopover: g,
							autoLink: Qt,
							autoSync: He,
							autoReplace: Me,
							placeholder: ae,
							buttons: Xe,
							toolbar: sn,
							linkDialog: Ve,
							linkPopover: Qe,
							imageDialog: bn,
							imagePopover: Ge,
							tablePopover: cn,
							videoDialog: yn,
							helpDialog: x,
							airPopover: i
						},
						buttons: {},
						lang: "en-US",
						followingToolbar: !1,
						toolbarPosition: "top",
						otherStaticBar: "",
						codeviewKeepButton: !1,
						toolbar: [
							["style", ["style"]],
							["font", ["bold", "underline", "clear"]],
							["fontname", ["fontname"]],
							["color", ["color"]],
							["para", ["ul", "ol", "paragraph"]],
							["table", ["table"]],
							["insert", ["link", "picture", "video"]],
							["view", ["fullscreen", "codeview", "help"]]
						],
						popatmouse: !0,
						popover: {
							image: [
								["resize", ["resizeFull", "resizeHalf", "resizeQuarter", "resizeNone"]],
								["float", ["floatLeft", "floatRight", "floatNone"]],
								["remove", ["removeMedia"]]
							],
							link: [
								["link", ["linkDialogShow", "unlink"]]
							],
							table: [
								["add", ["addRowDown", "addRowUp", "addColLeft", "addColRight"]],
								["delete", ["deleteRow", "deleteCol", "deleteTable"]]
							],
							air: [
								["color", ["color"]],
								["font", ["bold", "underline", "clear"]],
								["para", ["ul", "paragraph"]],
								["table", ["table"]],
								["insert", ["link", "picture"]],
								["view", ["fullscreen", "codeview"]]
							]
						},
						airMode: !1,
						overrideContextMenu: !1,
						width: null,
						height: null,
						linkTargetBlank: !0,
						useProtocol: !0,
						defaultProtocol: "http://",
						focus: !1,
						tabDisabled: !1,
						tabSize: 4,
						styleWithCSS: !1,
						shortcuts: !0,
						textareaAutoSync: !0,
						tooltip: "auto",
						container: null,
						maxTextLength: 0,
						blockquoteBreakingLevel: 2,
						spellCheck: !0,
						disableGrammar: !1,
						placeholder: null,
						inheritPlaceholder: !1,
						recordEveryKeystroke: !1,
						historyLimit: 200,
						showDomainOnlyForAutolink: !1,
						hintMode: "word",
						hintSelect: "after",
						hintDirection: "bottom",
						styleTags: ["p", "blockquote", "pre", "h1", "h2", "h3", "h4", "h5", "h6"],
						fontNames: ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Helvetica Neue", "Helvetica", "Impact", "Lucida Grande", "Tahoma", "Times New Roman", "Verdana"],
						fontNamesIgnoreCheck: [],
						addDefaultFonts: !0,
						fontSizes: ["8", "9", "10", "11", "12", "14", "18", "24", "36"],
						fontSizeUnits: ["px", "pt"],
						colors: [
							["#000000", "#424242", "#636363", "#9C9C94", "#CEC6CE", "#EFEFEF", "#F7F7F7", "#FFFFFF"],
							["#FF0000", "#FF9C00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#9C00FF", "#FF00FF"],
							["#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE"],
							["#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD"],
							["#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5"],
							["#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#3984C6", "#634AA5", "#A54A7B"],
							["#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842"],
							["#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]
						],
						colorsName: [
							["Black", "Tundora", "Dove Gray", "Star Dust", "Pale Slate", "Gallery", "Alabaster", "White"],
							["Red", "Orange Peel", "Yellow", "Green", "Cyan", "Blue", "Electric Violet", "Magenta"],
							["Azalea", "Karry", "Egg White", "Zanah", "Botticelli", "Tropical Blue", "Mischka", "Twilight"],
							["Tonys Pink", "Peach Orange", "Cream Brulee", "Sprout", "Casper", "Perano", "Cold Purple", "Careys Pink"],
							["Mandy", "Rajah", "Dandelion", "Olivine", "Gulf Stream", "Viking", "Blue Marguerite", "Puce"],
							["Guardsman Red", "Fire Bush", "Golden Dream", "Chelsea Cucumber", "Smalt Blue", "Boston Blue", "Butterfly Bush", "Cadillac"],
							["Sangria", "Mai Tai", "Buddha Gold", "Forest Green", "Eden", "Venice Blue", "Meteorite", "Claret"],
							["Rosewood", "Cinnamon", "Olive", "Parsley", "Tiber", "Midnight Blue", "Valentino", "Loulou"]
						],
						colorButton: {
							foreColor: "#000000",
							backColor: "#FFFF00"
						},
						lineHeights: ["1.0", "1.2", "1.4", "1.5", "1.6", "1.8", "2.0", "3.0"],
						tableClassName: "table table-bordered",
						insertTableMaxSize: {
							col: 10,
							row: 10
						},
						dialogsInBody: !1,
						dialogsFade: !1,
						maximumImageFileSize: null,
						acceptImageFileTypes: "image/*",
						callbacks: {
							onBeforeCommand: null,
							onBlur: null,
							onBlurCodeview: null,
							onChange: null,
							onChangeCodeview: null,
							onDialogShown: null,
							onEnter: null,
							onFocus: null,
							onImageLinkInsert: null,
							onImageUpload: null,
							onImageUploadError: null,
							onInit: null,
							onKeydown: null,
							onKeyup: null,
							onMousedown: null,
							onMouseup: null,
							onPaste: null,
							onScroll: null
						},
						codemirror: {
							mode: "text/html",
							htmlMode: !0,
							lineNumbers: !0
						},
						codeviewFilter: !0,
						codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml)[^>]*?>/gi,
						codeviewIframeFilter: !0,
						codeviewIframeWhitelistSrc: [],
						codeviewIframeWhitelistSrcBase: ["www.youtube.com", "www.youtube-nocookie.com", "www.facebook.com", "vine.co", "instagram.com", "player.vimeo.com", "www.dailymotion.com", "player.youku.com", "jumpingbean.tv", "v.qq.com"],
						keyMap: {
							pc: {
								ESC: "escape",
								ENTER: "insertParagraph",
								"CTRL+Z": "undo",
								"CTRL+Y": "redo",
								TAB: "tab",
								"SHIFT+TAB": "untab",
								"CTRL+B": "bold",
								"CTRL+I": "italic",
								"CTRL+U": "underline",
								"CTRL+SHIFT+S": "strikethrough",
								"CTRL+BACKSLASH": "removeFormat",
								"CTRL+SHIFT+L": "justifyLeft",
								"CTRL+SHIFT+E": "justifyCenter",
								"CTRL+SHIFT+R": "justifyRight",
								"CTRL+SHIFT+J": "justifyFull",
								"CTRL+SHIFT+NUM7": "insertUnorderedList",
								"CTRL+SHIFT+NUM8": "insertOrderedList",
								"CTRL+LEFTBRACKET": "outdent",
								"CTRL+RIGHTBRACKET": "indent",
								"CTRL+NUM0": "formatPara",
								"CTRL+NUM1": "formatH1",
								"CTRL+NUM2": "formatH2",
								"CTRL+NUM3": "formatH3",
								"CTRL+NUM4": "formatH4",
								"CTRL+NUM5": "formatH5",
								"CTRL+NUM6": "formatH6",
								"CTRL+ENTER": "insertHorizontalRule",
								"CTRL+K": "linkDialog.show"
							},
							mac: {
								ESC: "escape",
								ENTER: "insertParagraph",
								"CMD+Z": "undo",
								"CMD+SHIFT+Z": "redo",
								TAB: "tab",
								"SHIFT+TAB": "untab",
								"CMD+B": "bold",
								"CMD+I": "italic",
								"CMD+U": "underline",
								"CMD+SHIFT+S": "strikethrough",
								"CMD+BACKSLASH": "removeFormat",
								"CMD+SHIFT+L": "justifyLeft",
								"CMD+SHIFT+E": "justifyCenter",
								"CMD+SHIFT+R": "justifyRight",
								"CMD+SHIFT+J": "justifyFull",
								"CMD+SHIFT+NUM7": "insertUnorderedList",
								"CMD+SHIFT+NUM8": "insertOrderedList",
								"CMD+LEFTBRACKET": "outdent",
								"CMD+RIGHTBRACKET": "indent",
								"CMD+NUM0": "formatPara",
								"CMD+NUM1": "formatH1",
								"CMD+NUM2": "formatH2",
								"CMD+NUM3": "formatH3",
								"CMD+NUM4": "formatH4",
								"CMD+NUM5": "formatH5",
								"CMD+NUM6": "formatH6",
								"CMD+ENTER": "insertHorizontalRule",
								"CMD+K": "linkDialog.show"
							}
						},
						icons: {
							align: "note-icon-align",
							alignCenter: "note-icon-align-center",
							alignJustify: "note-icon-align-justify",
							alignLeft: "note-icon-align-left",
							alignRight: "note-icon-align-right",
							rowBelow: "note-icon-row-below",
							colBefore: "note-icon-col-before",
							colAfter: "note-icon-col-after",
							rowAbove: "note-icon-row-above",
							rowRemove: "note-icon-row-remove",
							colRemove: "note-icon-col-remove",
							indent: "note-icon-align-indent",
							outdent: "note-icon-align-outdent",
							arrowsAlt: "note-icon-arrows-alt",
							bold: "note-icon-bold",
							caret: "note-icon-caret",
							circle: "note-icon-circle",
							close: "note-icon-close",
							code: "note-icon-code",
							eraser: "note-icon-eraser",
							floatLeft: "note-icon-float-left",
							floatRight: "note-icon-float-right",
							font: "note-icon-font",
							frame: "note-icon-frame",
							italic: "note-icon-italic",
							link: "note-icon-link",
							unlink: "note-icon-chain-broken",
							magic: "note-icon-magic",
							menuCheck: "note-icon-menu-check",
							minus: "note-icon-minus",
							orderedlist: "note-icon-orderedlist",
							pencil: "note-icon-pencil",
							picture: "note-icon-picture",
							question: "note-icon-question",
							redo: "note-icon-redo",
							rollback: "note-icon-rollback",
							square: "note-icon-square",
							strikethrough: "note-icon-strikethrough",
							subscript: "note-icon-subscript",
							superscript: "note-icon-superscript",
							table: "note-icon-table",
							textHeight: "note-icon-text-height",
							trash: "note-icon-trash",
							underline: "note-icon-underline",
							undo: "note-icon-undo",
							unorderedlist: "note-icon-unorderedlist",
							video: "note-icon-video"
						}
					}
				});
				var q = function() {
					function e(t, n, a, l) {
						(function(f, w) {
							if (!(f instanceof w)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.markup = t, this.children = n, this.options = a, this.callback = l
					}
					var s;
					return (s = [{
						key: "render",
						value: function(t) {
							var n = v()(this.markup);
							if (this.options && this.options.contents && n.html(this.options.contents), this.options && this.options.className && n.addClass(this.options.className), this.options && this.options.data && v().each(this.options.data, function(l, f) {
									n.attr("data-" + l, f)
								}), this.options && this.options.click && n.on("click", this.options.click), this.children) {
								var a = n.find(".note-children-container");
								this.children.forEach(function(l) {
									l.render(a.length ? a : n)
								})
							}
							return this.callback && this.callback(n, this.options), this.options && this.options.callback && this.options.callback(n), t && t.append(n), n
						}
					}]) && function I(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				const K = function(e, o) {
					return function() {
						var s = "object" === E(arguments[1]) ? arguments[1] : arguments[0],
							r = Array.isArray(arguments[0]) ? arguments[0] : [];
						return s && s.children && (r = s.children), new q(e, r, s, o)
					}
				};
				const Ct = function() {
					function e(t, n) {
						if (function(w, b) {
								if (!(w instanceof b)) throw new TypeError("Cannot call a class as a function")
							}(this, e), this.$node = t, this.options = v().extend({}, {
								title: "",
								target: n.container,
								trigger: "hover focus",
								placement: "bottom"
							}, n), this.$tooltip = v()(['<div class="note-tooltip">', '<div class="note-tooltip-arrow"></div>', '<div class="note-tooltip-content"></div>', "</div>"].join("")), "manual" !== this.options.trigger) {
							var a = this.show.bind(this),
								l = this.hide.bind(this),
								f = this.toggle.bind(this);
							this.options.trigger.split(" ").forEach(function(w) {
								"hover" === w ? (t.off("mouseenter mouseleave"), t.on("mouseenter", a).on("mouseleave", l)) : "click" === w ? t.on("click", f) : "focus" === w && t.on("focus", a).on("blur", l)
							})
						}
					}
					var s;
					return (s = [{
						key: "show",
						value: function() {
							var t = this.$node,
								n = t.offset(),
								a = v()(this.options.target).offset();
							n.top -= a.top, n.left -= a.left;
							var l = this.$tooltip,
								f = this.options.title || t.attr("title") || t.data("title"),
								w = this.options.placement || t.data("placement");
							l.addClass(w), l.find(".note-tooltip-content").text(f), l.appendTo(this.options.target);
							var b = t.outerWidth(),
								N = t.outerHeight(),
								P = l.outerWidth(),
								R = l.outerHeight();
							"bottom" === w ? l.css({
								top: n.top + N,
								left: n.left + (b / 2 - P / 2)
							}) : "top" === w ? l.css({
								top: n.top - R,
								left: n.left + (b / 2 - P / 2)
							}) : "left" === w ? l.css({
								top: n.top + (N / 2 - R / 2),
								left: n.left - P
							}) : "right" === w && l.css({
								top: n.top + (N / 2 - R / 2),
								left: n.left + b
							}), l.addClass("in")
						}
					}, {
						key: "hide",
						value: function() {
							var t = this;
							this.$tooltip.removeClass("in"), setTimeout(function() {
								t.$tooltip.remove()
							}, 200)
						}
					}, {
						key: "toggle",
						value: function() {
							this.$tooltip.hasClass("in") ? this.hide() : this.show()
						}
					}]) && function Pt(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var qe = function() {
					function e(t, n) {
						(function(a, l) {
							if (!(a instanceof l)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.$button = t, this.options = v().extend({}, {
							target: n.container
						}, n), this.setEvent()
					}
					var s;
					return (s = [{
						key: "setEvent",
						value: function() {
							var t = this;
							this.$button.on("click", function(n) {
								t.toggle(), n.stopImmediatePropagation()
							})
						}
					}, {
						key: "clear",
						value: function() {
							var t = v()(".note-btn-group.open");
							t.find(".note-btn.active").removeClass("active"), t.removeClass("open")
						}
					}, {
						key: "show",
						value: function() {
							this.$button.addClass("active"), this.$button.parent().addClass("open");
							var t = this.$button.next(),
								n = t.offset(),
								a = t.outerWidth(),
								l = v()(window).width(),
								f = parseFloat(v()(this.options.target).css("margin-right"));
							t.css("margin-left", n.left + a > l - f ? l - f - (n.left + a) : "")
						}
					}, {
						key: "hide",
						value: function() {
							this.$button.removeClass("active"), this.$button.parent().removeClass("open")
						}
					}, {
						key: "toggle",
						value: function() {
							var t = this.$button.parent().hasClass("open");
							this.clear(), t ? this.hide() : this.show()
						}
					}]) && function se(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				v()(document).on("click", function(e) {
					v()(e.target).closest(".note-btn-group").length || (v()(".note-btn-group.open").removeClass("open"), v()(".note-btn-group .note-btn.active").removeClass("active"))
				}), v()(document).on("click.note-dropdown-menu", function(e) {
					v()(e.target).closest(".note-dropdown-menu").parent().removeClass("open"), v()(e.target).closest(".note-dropdown-menu").parent().find(".note-btn.active").removeClass("active")
				});
				const en = qe;
				const _n = function() {
					function e(t) {
						(function(n, a) {
							if (!(n instanceof a)) throw new TypeError("Cannot call a class as a function")
						})(this, e), this.$modal = t, this.$backdrop = v()('<div class="note-modal-backdrop"></div>')
					}
					var s;
					return (s = [{
						key: "show",
						value: function() {
							var t = this;
							this.$backdrop.appendTo(document.body).show(), this.$modal.addClass("open").show(), this.$modal.trigger("note.modal.show"), this.$modal.off("click", ".close").on("click", ".close", this.hide.bind(this)), this.$modal.on("keydown", function(n) {
								27 === n.which && (n.preventDefault(), t.hide())
							})
						}
					}, {
						key: "hide",
						value: function() {
							this.$modal.removeClass("open").hide(), this.$backdrop.hide(), this.$modal.trigger("note.modal.hide"), this.$modal.off("keydown")
						}
					}]) && function mn(e, o) {
						for (var s = 0; s < o.length; s++) {
							var r = o[s];
							r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
						}
					}(e.prototype, s), e
				}();
				var dn = K('<div class="note-editor note-frame"></div>'),
					gn = K('<div class="note-toolbar" role="toolbar"></div>'),
					nn = K('<div class="note-editing-area"></div>'),
					fn = K('<textarea class="note-codable" aria-multiline="true"></textarea>'),
					hn = K('<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"></div>'),
					wn = K(['<output class="note-status-output" role="status" aria-live="polite"></output>', '<div class="note-statusbar" role="status">', '<div class="note-resizebar" aria-label="resize">', '<div class="note-icon-bar"></div>', '<div class="note-icon-bar"></div>', '<div class="note-icon-bar"></div>', "</div>", "</div>"].join("")),
					En = K('<div class="note-editor note-airframe"></div>'),
					Sn = K(['<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"></div>', '<output class="note-status-output" role="status" aria-live="polite"></output>'].join("")),
					on = K('<div class="note-btn-group"></div>'),
					pn = K('<button type="button" class="note-btn" tabindex="-1"></button>', function(e, o) {
						o && o.tooltip && (e.attr({
							"aria-label": o.tooltip
						}), e.data("_lite_tooltip", new Ct(e, {
							title: o.tooltip,
							container: o.container
						})).on("click", function(s) {
							v()(s.currentTarget).data("_lite_tooltip").hide()
						})), o.contents && e.html(o.contents), o && o.data && "dropdown" === o.data.toggle && e.data("_lite_dropdown", new en(e, {
							container: o.container
						})), o && o.codeviewKeepButton && e.addClass("note-codeview-keep")
					}),
					kn = K('<div class="note-dropdown-menu" role="list"></div>', function(e, o) {
						var s = Array.isArray(o.items) ? o.items.map(function(r) {
							var t = "string" == typeof r ? r : r.value || "",
								n = o.template ? o.template(r) : r,
								a = v()('<a class="note-dropdown-item" href="#" data-value="' + t + '" role="listitem" aria-label="' + t + '"></a>');
							return a.html(n).data("item", r), a
						}) : o.items;
						e.html(s).attr({
							"aria-label": o.title
						}), e.on("click", "> .note-dropdown-item", function(r) {
							var t = v()(this),
								n = t.data("item"),
								a = t.data("value");
							n.click ? n.click(t) : o.itemClick && o.itemClick(r, n, a)
						}), o && o.codeviewKeepButton && e.addClass("note-codeview-keep")
					}),
					Tn = K('<div class="note-dropdown-menu note-check" role="list"></div>', function(e, o) {
						var s = Array.isArray(o.items) ? o.items.map(function(r) {
							var t = "string" == typeof r ? r : r.value || "",
								n = o.template ? o.template(r) : r,
								a = v()('<a class="note-dropdown-item" href="#" data-value="' + t + '" role="listitem" aria-label="' + r + '"></a>');
							return a.html([rn(o.checkClassName), " ", n]).data("item", r), a
						}) : o.items;
						e.html(s).attr({
							"aria-label": o.title
						}), e.on("click", "> .note-dropdown-item", function(r) {
							var t = v()(this),
								n = t.data("item"),
								a = t.data("value");
							n.click ? n.click(t) : o.itemClick && o.itemClick(r, n, a)
						}), o && o.codeviewKeepButton && e.addClass("note-codeview-keep")
					}),
					Ln = function(e, o) {
						return e + " " + rn(o.icons.caret, "span")
					},
					Rn = function(e, o) {
						return on([pn({
							className: "dropdown-toggle",
							contents: e.title + " " + rn("note-icon-caret"),
							tooltip: e.tooltip,
							data: {
								toggle: "dropdown"
							}
						}), kn({
							className: e.className,
							items: e.items,
							template: e.template,
							itemClick: e.itemClick
						})], {
							callback: o
						}).render()
					},
					On = function(e, o) {
						return on([pn({
							className: "dropdown-toggle",
							contents: e.title + " " + rn("note-icon-caret"),
							tooltip: e.tooltip,
							data: {
								toggle: "dropdown"
							}
						}), Tn({
							className: e.className,
							checkClassName: e.checkClassName,
							items: e.items,
							template: e.template,
							itemClick: e.itemClick
						})], {
							callback: o
						}).render()
					},
					Fn = function(e) {
						return on([pn({
							className: "dropdown-toggle",
							contents: e.title + " " + rn("note-icon-caret"),
							tooltip: e.tooltip,
							data: {
								toggle: "dropdown"
							}
						}), kn([on({
							className: "note-align",
							children: e.items[0]
						}), on({
							className: "note-list",
							children: e.items[1]
						})])]).render()
					},
					$n = function(e) {
						return on([pn({
							className: "dropdown-toggle",
							contents: e.title + " " + rn("note-icon-caret"),
							tooltip: e.tooltip,
							data: {
								toggle: "dropdown"
							}
						}), kn({
							className: "note-table",
							items: ['<div class="note-dimension-picker">', '<div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div>', '<div class="note-dimension-picker-highlighted"></div>', '<div class="note-dimension-picker-unhighlighted"></div>', "</div>", '<div class="note-dimension-display">1 x 1</div>'].join("")
						})], {
							callback: function(o) {
								o.find(".note-dimension-picker-mousecatcher").css({
									width: e.col + "em",
									height: e.row + "em"
								}).mouseup(e.itemClick).mousemove(function(s) {
									! function(r, t, n) {
										var a, l = v()(r.target.parentNode),
											f = l.next(),
											w = l.find(".note-dimension-picker-mousecatcher"),
											b = l.find(".note-dimension-picker-highlighted"),
											N = l.find(".note-dimension-picker-unhighlighted");
										if (void 0 === r.offsetX) {
											var P = v()(r.target).offset();
											a = {
												x: r.pageX - P.left,
												y: r.pageY - P.top
											}
										} else a = {
											x: r.offsetX,
											y: r.offsetY
										};
										var R = Math.ceil(a.x / 18) || 1,
											B = Math.ceil(a.y / 18) || 1;
										b.css({
											width: R + "em",
											height: B + "em"
										}), w.data("value", R + "x" + B), R > 3 && R < t && N.css({
											width: R + 1 + "em"
										}), B > 3 && B < n && N.css({
											height: B + 1 + "em"
										}), f.html(R + " x " + B)
									}(s, e.col, e.row)
								})
							}
						}).render()
					},
					Nn = K('<div class="note-color-palette"></div>', function(e, o) {
						for (var s = [], r = 0, t = o.colors.length; r < t; r++) {
							for (var n = o.eventName, a = o.colors[r], l = o.colorsName[r], f = [], w = 0, b = a.length; w < b; w++) {
								var N = a[w],
									P = l[w];
								f.push(['<button type="button" class="note-btn note-color-btn"', 'style="background-color:', N, '" ', 'data-event="', n, '" ', 'data-value="', N, '" ', 'data-title="', P, '" ', 'aria-label="', P, '" ', 'data-toggle="button" tabindex="-1"></button>'].join(""))
							}
							s.push('<div class="note-color-row">' + f.join("") + "</div>")
						}
						e.html(s.join("")), e.find(".note-color-btn").each(function() {
							v()(this).data("_lite_tooltip", new Ct(v()(this), {
								container: o.container
							}))
						})
					}),
					Hn = function(e, o) {
						return on({
							className: "note-color",
							children: [pn({
								className: "note-current-color-button",
								contents: e.title,
								tooltip: e.lang.color.recent,
								click: e.currentClick,
								callback: function(s) {
									var r = s.find(".note-recent-color");
									"foreColor" !== o && (r.css("background-color", "#FFFF00"), s.attr("data-backColor", "#FFFF00"))
								}
							}), pn({
								className: "dropdown-toggle",
								contents: rn("note-icon-caret"),
								tooltip: e.lang.color.more,
								data: {
									toggle: "dropdown"
								}
							}), kn({
								items: ["<div>", '<div class="note-btn-group btn-background-color">', '<div class="note-palette-title">' + e.lang.color.background + "</div>", "<div>", '<button type="button" class="note-color-reset note-btn note-btn-block" data-event="backColor" data-value="transparent">', e.lang.color.transparent, "</button>", "</div>", '<div class="note-holder" data-event="backColor"></div>', '<div class="btn-sm">', '<input type="color" id="html5bcp" class="note-btn btn-default" value="#21104A" style="width:100%;" data-value="cp">', '<button type="button" class="note-color-reset btn" data-event="backColor" data-value="cpbackColor">', e.lang.color.cpSelect, "</button>", "</div>", "</div>", '<div class="note-btn-group btn-foreground-color">', '<div class="note-palette-title">' + e.lang.color.foreground + "</div>", "<div>", '<button type="button" class="note-color-reset note-btn note-btn-block" data-event="removeFormat" data-value="foreColor">', e.lang.color.resetToDefault, "</button>", "</div>", '<div class="note-holder" data-event="foreColor"></div>', '<div class="btn-sm">', '<input type="color" id="html5fcp" class="note-btn btn-default" value="#21104A" style="width:100%;" data-value="cp">', '<button type="button" class="note-color-reset btn" data-event="foreColor" data-value="cpforeColor">', e.lang.color.cpSelect, "</button>", "</div>", "</div>", "</div>"].join(""),
								callback: function(s) {
									s.find(".note-holder").each(function() {
										var r = v()(this);
										r.append(Nn({
											colors: e.colors,
											eventName: r.data("event")
										}).render())
									}), "fore" === o ? (s.find(".btn-background-color").hide(), s.css({
										"min-width": "210px"
									})) : "back" === o && (s.find(".btn-foreground-color").hide(), s.css({
										"min-width": "210px"
									}))
								},
								click: function(s) {
									var r = v()(s.target),
										t = r.data("event"),
										n = r.data("value"),
										a = document.getElementById("html5fcp").value,
										l = document.getElementById("html5bcp").value;
									if ("cp" === n ? s.stopPropagation() : "cpbackColor" === n ? n = l : "cpforeColor" === n && (n = a), t && n) {
										var f = "backColor" === t ? "background-color" : "color",
											w = r.closest(".note-color").find(".note-recent-color"),
											b = r.closest(".note-color").find(".note-current-color-button");
										w.css(f, n), b.attr("data-" + t, n), e.itemClick("fore" === o ? "foreColor" : "back" === o ? "backColor" : t, n)
									}
								}
							})]
						}).render()
					},
					xn = K('<div class="note-modal" aria-hidden="false" tabindex="-1" role="dialog"></div>', function(e, o) {
						o.fade && e.addClass("fade"), e.attr({
							"aria-label": o.title
						}), e.html(['<div class="note-modal-content">', o.title ? '<div class="note-modal-header"><button type="button" class="close" aria-label="Close" aria-hidden="true"><i class="note-icon-close"></i></button><h4 class="note-modal-title">' + o.title + "</h4></div>" : "", '<div class="note-modal-body">' + o.body + "</div>", o.footer ? '<div class="note-modal-footer">' + o.footer + "</div>" : "", "</div>"].join("")), e.data("modal", new _n(e, o))
					}),
					jn = function(e) {
						var o = '<div class="note-form-group"><label for="note-dialog-video-url-' + e.id + '" class="note-form-label">' + e.lang.video.url + ' <small class="text-muted">' + e.lang.video.providers + '</small></label><input id="note-dialog-video-url-' + e.id + '" class="note-video-url note-input" type="text"/></div>',
							s = ['<button type="button" href="#" class="note-btn note-btn-primary note-video-btn disabled" disabled>', e.lang.video.insert, "</button>"].join("");
						return xn({
							title: e.lang.video.insert,
							fade: e.fade,
							body: o,
							footer: s
						}).render()
					},
					Mn = function(e) {
						var o = '<div class="note-form-group note-group-select-from-files"><label for="note-dialog-image-file-' + e.id + '" class="note-form-label">' + e.lang.image.selectFromFiles + '</label><input id="note-dialog-image-file-' + e.id + '" class="note-note-image-input note-input" type="file" name="files" accept="image/*" multiple="multiple"/>' + e.imageLimitation + '</div><div class="note-form-group"><label for="note-dialog-image-url-' + e.id + '" class="note-form-label">' + e.lang.image.url + '</label><input id="note-dialog-image-url-' + e.id + '" class="note-image-url note-input" type="text"/></div>',
							s = ['<button href="#" type="button" class="note-btn note-btn-primary note-btn-large note-image-btn disabled" disabled>', e.lang.image.insert, "</button>"].join("");
						return xn({
							title: e.lang.image.insert,
							fade: e.fade,
							body: o,
							footer: s
						}).render()
					},
					Bn = function(e) {
						var o = '<div class="note-form-group"><label for="note-dialog-link-txt-' + e.id + '" class="note-form-label">' + e.lang.link.textToDisplay + '</label><input id="note-dialog-link-txt-' + e.id + '" class="note-link-text note-input" type="text"/></div><div class="note-form-group"><label for="note-dialog-link-url-' + e.id + '" class="note-form-label">' + e.lang.link.url + '</label><input id="note-dialog-link-url-' + e.id + '" class="note-link-url note-input" type="text" value="http://"/></div>' + (e.disableLinkTarget ? "" : '<div class="checkbox"><label for="note-dialog-link-nw-' + e.id + '"><input id="note-dialog-link-nw-' + e.id + '" type="checkbox" checked> ' + e.lang.link.openInNewWindow + "</label></div>") + '<div class="checkbox"><label for="note-dialog-link-up-' + e.id + '"><input id="note-dialog-link-up-' + e.id + '" type="checkbox" checked> ' + e.lang.link.useProtocol + "</label></div>",
							s = ['<button href="#" type="button" class="note-btn note-btn-primary note-link-btn disabled" disabled>', e.lang.link.insert, "</button>"].join("");
						return xn({
							className: "link-dialog",
							title: e.lang.link.insert,
							fade: e.fade,
							body: o,
							footer: s
						}).render()
					},
					zn = K(['<div class="note-popover bottom">', '<div class="note-popover-arrow"></div>', '<div class="popover-content note-children-container"></div>', "</div>"].join(""), function(e, o) {
						e.addClass(void 0 !== o.direction ? o.direction : "bottom").hide(), o.hideArrow && e.find(".note-popover-arrow").hide()
					}),
					Un = K('<div class="checkbox"></div>', function(e, o) {
						e.html(["<label" + (o.id ? ' for="note-' + o.id + '"' : "") + ">", '<input role="checkbox" type="checkbox"' + (o.id ? ' id="note-' + o.id + '"' : ""), o.checked ? " checked" : "", ' aria-checked="' + (o.checked ? "true" : "false") + '"/>', o.text ? o.text : "", "</label>"].join(""))
					}),
					rn = function(e, o) {
						return e.match(/^</) ? e : "<" + (o = o || "i") + ' class="' + e + '"></' + o + ">"
					};
				v().summernote = v().extend(v().summernote, {
					ui_template: function(e) {
						return {
							editor: dn,
							toolbar: gn,
							editingArea: nn,
							codable: fn,
							editable: hn,
							statusbar: wn,
							airEditor: En,
							airEditable: Sn,
							buttonGroup: on,
							button: pn,
							dropdown: kn,
							dropdownCheck: Tn,
							dropdownButton: Rn,
							dropdownButtonContents: Ln,
							dropdownCheckButton: On,
							paragraphDropdownButton: Fn,
							tableDropdownButton: $n,
							colorDropdownButton: Hn,
							palette: Nn,
							dialog: xn,
							videoDialog: jn,
							imageDialog: Mn,
							linkDialog: Bn,
							popover: zn,
							checkbox: Un,
							icon: rn,
							options: e,
							toggleBtn: function(o, s) {
								o.toggleClass("disabled", !s), o.attr("disabled", !s)
							},
							toggleBtnActive: function(o, s) {
								o.toggleClass("active", s)
							},
							check: function(o, s) {
								o.find(".checked").removeClass("checked"), o.find('[data-value="' + s + '"]').addClass("checked")
							},
							onDialogShown: function(o, s) {
								o.one("note.modal.show", s)
							},
							onDialogHidden: function(o, s) {
								o.one("note.modal.hide", s)
							},
							showDialog: function(o) {
								o.data("modal").show()
							},
							hideDialog: function(o) {
								o.data("modal").hide()
							},
							getPopoverContent: function(o) {
								return o.find(".note-popover-content")
							},
							getDialogBody: function(o) {
								return o.find(".note-modal-body")
							},
							createLayout: function(o) {
								var s = (e.airMode ? En([nn([fn(), Sn()])]) : dn("bottom" === e.toolbarPosition ? [nn([fn(), hn()]), gn(), wn()] : [gn(), nn([fn(), hn()]), wn()])).render();
								return s.insertAfter(o), {
									note: o,
									editor: s,
									toolbar: s.find(".note-toolbar"),
									editingArea: s.find(".note-editing-area"),
									editable: s.find(".note-editable"),
									codable: s.find(".note-codable"),
									statusbar: s.find(".note-statusbar")
								}
							},
							removeLayout: function(o, s) {
								o.html(s.editable.html()), s.editor.remove(), o.off("summernote"), o.show()
							}
						}
					},
					interface: "lite"
				})
			})(), c
		})()
	});