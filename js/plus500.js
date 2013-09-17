/**
  * Plus500 javascript file sourced from: 
  *   Chrome://http://trade.plus500.com/Trade 
  *      DeveloperTools::Sources::Scripts::AllJsTrade.min.js, 
  *   js code beautified with: http://jsbeautifier.org/
  */  
var a;
(function (b) {
		function c(g) {
			var l = g.data;
			if (!g.isDefaultPrevented()) {
				g.preventDefault();
				b(this).ajaxSubmit(l)
			}
		}

		function d(g) {
			var l = g.target,
				n = b(l);
			if (!n.is("[type=submit],[type=image]")) {
				l = n.closest("[type=submit]");
				if (l.length === 0) return;
				l = l[0]
			}
			var m = this;
			m.clk = l;
			if (l.type == "image")
				if (g.offsetX !== undefined) {
					m.clk_x = g.offsetX;
					m.clk_y = g.offsetY
				} else if (typeof b.fn.offset == "function") {
				n = n.offset();
				m.clk_x = g.pageX - n.left;
				m.clk_y = g.pageY - n.top
			} else {
				m.clk_x = g.pageX - l.offsetLeft;
				m.clk_y = g.pageY - l.offsetTop
			}
			setTimeout(function () {
					m.clk = m.clk_x =
						m.clk_y = nureturn g;
					return this.attr.apply(this, arguments)
				}; b.fn.ajaxSubmit = function (g) {
					function l(z) {
						z = b.param(z).split("&");
						var L = z.length,
							N = [],
							O, G;
						for (O = 0; O < L; O++) {
							z[O] = z[O].replace(/\+/g, " ");
							G = z[O].split("=");
							N.push([decodeURIComponent(G[0]), decodeURIComponent(G[1])])
						}
						return N
					}

					function n(z) {
						for (var L = new FormData, N = 0; N < z.length; N++) L.append(z[N].name, z[N].value);
						if (g.extraData) {
							z = l(g.extraData);
							for (N = 0; N < z.length; N++) z[N] && L.append(z[N][0], z[N][1])
						}
						g.data = null;
						N = b.extend(true, {}, b.ajaxSettings,
							g, {
								contentType: false,
								processData: false,
								cache: false,
								type: q || "POST"
							});
						if (g.uploadProgress) N.xhr = function () {
							var G = jQuery.ajaxSettings.xhr();
							G.upload && G.upload.addEventListener("progress", function (R) {
								var E = 0,
									X = R.loaded || R.position,
									W = R.total;
								if (R.lengthComputable) E = Math.ceil(X / W * 100);
								g.uploadProgress(R, X, W, E)
							}, false);
							return G
						};
						N.data = null;
						var O = N.beforeSend;
						N.beforeSend = function (G, R) {
							R.data = L;
							O && O.call(this, G, R)
						};
						return b.ajax(N)
					}

					function m(z) {
						function L(y) {
							var A = null;
							try {
								if (y.contentWindow) A = y.contentWindow.document
							} catch (M) {
								e("cannot get iframe.contentWindow document: " +
									M)
							}
							if (A) return A;
							try {
								A = y.contentDocument ? y.contentDocument : y.document
							} catch (K) {
								e("cannot get iframe.contentDocument: " + K);
								A = y.document
							}
							return A
						}

						function N() {
							function y() {
								try {
									var Y = L(V).readyState;
									e("state = " + Y);
									Y && Y.toLowerCase() == "uninitialized" && setTimeout(y, 50)
								} catch (ba) {
									e("Server abort: ", ba, " (", ba.name, ")");
									O(ha);
									ga && clearTimeout(ga);
									ga = undefined
								}
							}
							var A = t.attr2("target"),
								M = t.attr2("action");
							G.setAttribute("target", W);
							q || G.setAttribute("method", "POST");
							M != E.url && G.setAttribute("action", E.url);
							if (!E.skipEncodingOverride && (!q || /post/i.test(q))) t.attr({
								encoding: "multipart/form-data",
								enctype: "multipart/form-data"
							});
							if (E.timeout) ga = setTimeout(function () {
								ia = true;
								O(fa)
							}, E.timeout);
							var K = [];
							try {
								if (E.extraData)
									for (var Q in E.extraData)
										if (E.extraData.hasOwnProperty(Q)) b.isPlainObject(E.extraData[Q]) && E.extraData[Q].hasOwnProperty("name") && E.extraData[Q].hasOwnProperty("value") ? K.push(b('<input type="hidden" name="' + E.extraData[Q].name + '">').val(E.extraData[Q].value).appendTo(G)[0]) : K.push(b('<input type="hidden" name="' +
											Q + '">').val(E.extraData[Q]).appendTo(G)[0]);
								if (!E.iframeTarget) {
									Z.appendTo("body");
									V.attachEvent ? V.attachEvent("onload", O) : V.addEventListener("load", O, false)
								}
								setTimeout(y, 15);
								try {
									G.submit()
								} catch (T) {
									document.createElement("form").submit.apply(G)
								}
							} finally {
								G.setAttribute("action", M);
								A ? G.setAttribute("target", A) : t.removeAttr("target");
								b(K).remove()
							}
						}

						function O(y) {
							if (!(H.aborted || J)) {
								U = L(V);
								if (!U) {
									e("cannot access response document");
									y = ha
								}
								if (y === fa && H) {
									H.abort("timeout");
									ca.reject(H, "timeout")
								} else if (y ==
									ha && H) {
									H.abort("server abort");
									ca.reject(H, "error", "server abort")
								} else {
									if (!U || U.location.href == E.iframeSrc)
										if (!ia) return;
									V.detachEvent ? V.detachEvent("onload", O) : V.removeEventListener("load", O, false);
									y = "success";
									var A;
									try {
										if (ia) throw "timeout";
										var M = E.dataType == "xml" || U.XMLDocument || b.isXMLDoc(U);
										e("isXml=" + M);
										if (!M && window.opera && (U.body === null || !U.body.innerHTML))
											if (--la) {
												e("requeing onLoad callback, DOM not available");
												setTimeout(O, 250);
												return
											}
										var K = U.body ? U.body : U.documentElement;
										H.responseText =
											K ? K.innerHTML : null;
										H.responseXML = U.XMLDocument ? U.XMLDocument : U;
										if (M) E.dataType = "xml";
										H.getResponseHeader = function (ka) {
											return {
												"content-type": E.dataType
											}[ka]
										};
										if (K) {
											H.status = Number(K.getAttribute("status")) || H.status;
											H.statusText = K.getAttribute("statusText") || H.statusText
										}
										var Q = (E.dataType || "").toLowerCase(),
											T = /(json|script|text)/.test(Q);
										if (T || E.textarea) {
											var Y = U.getElementsByTagName("textarea")[0];
											if (Y) {
												H.responseText = Y.value;
												H.status = Number(Y.getAttribute("status")) || H.status;
												H.statusText = Y.getAttribute("statusText") ||
													H.statusText
											} else if (T) {
												var ba = U.getElementsByTagName("pre")[0],
													aa = U.getElementsByTagName("body")[0];
												if (ba) H.responseText = ba.textContent ? ba.textContent : ba.innerText;
												else if (aa) H.responseText = aa.textContent ? aa.textContent : aa.innerText
											}
										} else if (Q == "xml" && !H.responseXML && H.responseText) H.responseXML = r(H.responseText);
										try {
											da = C(H, Q, E)
										} catch (ea) {
											y = "parsererror";
											H.error = A = ea || y
										}
									} catch (ja) {
										e("error caught: ", ja);
										y = "error";
										H.error = A = ja || y
									}
									if (H.aborted) {
										e("upload aborted");
										y = null
									}
									if (H.status) y = H.status >= 200 &&
										H.status < 300 || H.status === 304 ? "success" : "error";
									if (y === "success") {
										E.success && E.success.call(E.context, da, "success", H);
										ca.resolve(H.responseText, "success", H);
										X && b.event.trigger("ajaxSuccess", [H, E])
									} else if (y) {
										if (A === undefined) A = H.statusText;
										E.error && E.error.call(E.context, H, y, A);
										ca.reject(H, "error", A);
										X && b.event.trigger("ajaxError", [H, E, A])
									}
									X && b.event.trigger("ajaxComplete", [H, E]);
									X && !--b.active && b.event.trigger("ajaxStop");
									E.complete && E.complete.call(E.context, H, y);
									J = true;
									E.timeout && clearTimeout(ga);
									setTimeout(function () {
										E.iframeTarget || Z.remove();
										H.responseXML = null
									}, 100)
								}
							}
						}
						var G = t[0],
							R, E, X, W, Z, V, H, ia, ga, ca = b.Deferred();
						if (z)
							for (R = 0; R < D.length; R++) {
								z = b(D[R]);
								h ? z.prop("disabled", false) : z.removeAttr("disabled")
							}
						E = b.extend(true, {}, b.ajaxSettings, g);
						E.context = E.context || E;
						W = "jqFormIO" + (new Date).getTime();
						if (E.iframeTarget) {
							Z = b(E.iframeTarget);
							if (R = Z.attr2("name")) W = R;
							else Z.attr2("name", W)
						} else {
							Z = b('<iframe name="' + W + '" src="' + E.iframeSrc + '" />');
							Z.css({
								position: "absolute",
								top: "-1000px",
								left: "-1000px"
							})
						}
						V =
							Z[0];
						H = {
							aborted: 0,
							responseText: null,
							responseXML: null,
							status: 0,
							statusText: "n/a",
							getAllResponseHeaders: function () {},
							getResponseHeader: function () {},
							setRequestHeader: function () {},
							abort: function (y) {
								var A = y === "timeout" ? "timeout" : "aborted";
								e("aborting upload... " + A);
								this.aborted = 1;
								try {
									V.contentWindow.document.execCommand && V.contentWindow.document.execCommand("Stop")
								} catch (M) {}
								Z.attr("src", E.iframeSrc);
								H.error = A;
								E.error && E.error.call(E.context, H, A, y);
								X && b.event.trigger("ajaxError", [H, E, A]);
								E.complete && E.complete.call(E.context,
									H, A)
							}
						};
						(X = E.global) && 0 === b.active++ && b.event.trigger("ajaxStart");
						X && b.event.trigger("ajaxSend", [H, E]);
						if (E.beforeSend && E.beforeSend.call(E.context, H, E) === false) {
							E.global && b.active--;
							ca.reject();
							return ca
						}
						if (H.aborted) {
							ca.reject();
							return ca
						}
						if (z = G.clk)
							if ((R = z.name) && !z.disabled) {
								E.extraData = E.extraData || {};
								E.extraData[R] = z.value;
								if (z.type == "image") {
									E.extraData[R + ".x"] = G.clk_x;
									E.extraData[R + ".y"] = G.clk_y
								}
							}
						var fa = 1,
							ha = 2;
						z = b("meta[name=csrf-token]").attr("content");
						if ((R = b("meta[name=csrf-param]").attr("content")) &&
							z) {
							E.extraData = E.extraData || {};
							E.extraData[R] = z
						}
						E.forceSync ? N() : setTimeout(N, 10);
						var da, U, la = 50,
							J, r = b.parseXML || function (y, A) {
								if (window.ActiveXObject) {
									A = new ActiveXObject("Microsoft.XMLDOM");
									A.async = "false";
									A.loadXML(y)
								} else A = (new DOMParser).parseFromString(y, "text/xml");
								return A && A.documentElement && A.documentElement.nodeName != "parsererror" ? A : null
							}, u = b.parseJSON || function (y) {
								return window.eval("(" + y + ")")
							}, C = function (y, A, M) {
								var K = y.getResponseHeader("content-type") || "",
									Q = A === "xml" || !A && K.indexOf("xml") >=
										0;
								y = Q ? y.responseXML : y.responseText;
								Q && y.documentElement.nodeName === "parsererror" && b.error && b.error("parsererror");
								if (M && M.dataFilter) y = M.dataFilter(y, A);
								if (typeof y === "string")
									if (A === "json" || !A && K.indexOf("json") >= 0) y = u(y);
									else if (A === "script" || !A && K.indexOf("javascript") >= 0) b.globalEval(y);
								return y
							};
						return ca
					}
					if (!this.length) {
						e("ajaxSubmit: skipping submit process - no element selected");
						return this
					}
					var q, o, t = this;
					if (typeof g == "function") g = {
						success: g
					};
					q = this.attr2("method");
					o = this.attr2("action");
					if (o = (o = typeof o === "string" ? b.trim(o) : "") || window.location.href || "") o = (o.match(/^([^#]+)/) || [])[1];
					g = b.extend(true, {
						url: o,
						success: b.ajaxSettings.success,
						type: q || "GET",
						iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
					}, g);
					o = {};
					this.trigger("form-pre-serialize", [this, g, o]);
					if (o.veto) {
						e("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
						return this
					}
					if (g.beforeSerialize && g.beforeSerialize(this, g) === false) {
						e("ajaxSubmit: submit aborted via beforeSerialize callback");
						return this
					}
					var w = g.traditional;
					if (w === undefined) w = b.ajaxSettings.traditional;
					var D = [],
						v, I = this.formToArray(g.semantic, D);
					if (g.data) {
						g.extraData = g.data;
						v = b.param(g.data, w)
					}
					if (g.beforeSubmit && g.beforeSubmit(I, this, g) === false) {
						e("ajaxSubmit: submit aborted via beforeSubmit callback");
						return this
					}
					this.trigger("form-submit-validate", [I, this, g, o]);
					if (o.veto) {
						e("ajaxSubmit: submit vetoed via form-submit-validate trigger");
						return this
					}
					o = b.param(I, w);
					if (v) o = o ? o + "&" + v : v;
					if (g.type.toUpperCase() == "GET") {
						g.url +=
							(g.url.indexOf("?") >= 0 ? "&" : "?") + o;
						g.data = null
					} else g.data = o;
					var S = [];
					g.resetForm && S.push(function () {
						t.resetForm()
					});
					g.clearForm && S.push(function () {
						t.clearForm(g.includeHidden)
					});
					if (!g.dataType && g.target) {
						var P = g.success || function () {};
						S.push(function (z) {
							var L = g.replaceTarget ? "replaceWith" : "html";
							b(g.target)[L](z).each(P, arguments)
						})
					} else g.success && S.push(g.success);
					g.success = function (z, L, N) {
						for (var O = g.context || this, G = 0, R = S.length; G < R; G++) S[G].apply(O, [z, L, N || t, t])
					};
					if (g.error) {
						var p = g.error;
						g.error =
							function (z, L, N) {
								p.apply(g.context || this, [z, L, N, t])
						}
					}
					if (g.complete) {
						var x = g.complete;
						g.complete = function (z, L) {
							x.apply(g.context || this, [z, L, t])
						}
					}
					v = b('input[type=file]:enabled[value!=""]', this).length > 0;
					o = t.attr("enctype") == "multipart/form-data" || t.attr("encoding") == "multipart/form-data";
					w = f.fileapi && f.formdata;
					e("fileAPI :" + w);
					var F = (v || o) && !w,
						B;
					if (g.iframe !== false && (g.iframe || F))
						if (g.closeKeepAlive) b.get(g.closeKeepAlive, function () {
							B = m(I)
						});
						else B = m(I);
						else B = (v || o) && w ? n(I) : b.ajax(g);
					t.removeData("jqxhr").data("jqxhr",
						B);
					for (v = 0; v < D.length; v++) D[v] = null;
					this.trigger("form-submit-notify", [this, g]);
					return this
				}; b.fn.ajaxForm = function (g) {
					g = g || {};
					g.delegation = g.delegation && b.isFunction(b.fn.on);
					if (!g.delegation && this.length === 0) {
						var l = {
							s: this.selector,
							c: this.context
						};
						if (!b.isReady && l.s) {
							e("DOM not ready, queuing ajaxForm");
							b(function () {
								b(l.s, l.c).ajaxForm(g)
							});
							return this
						}
						e("terminating; zero elements found by selector" + (b.isReady ? "" : " (DOM not ready)"));
						return this
					}
					if (g.delegation) {
						b(document).off("submit.form-plugin",
							this.selector, c).off("click.form-plugin", this.selector, d).on("submit.form-plugin", this.selector, g, c).on("click.form-plugin", this.selector, g, d);
						return this
					}
					return this.ajaxFormUnbind().bind("submit.form-plugin", g, c).bind("click.form-plugin", g, d)
				}; b.fn.ajaxFormUnbind = function () {
					return this.unbind("submit.form-plugin click.form-plugin")
				}; b.fn.formToArray = function (g, l) {
					var n = [];
					if (this.length === 0) return n;
					var m = this[0],
						q = g ? m.getElementsByTagName("*") : m.elements;
					if (!q) return n;
					var o, t, w, D, v, I;
					o = 0;
					for (I =
						q.length; o < I; o++) {
						v = q[o];
						w = v.name;
						if (!(!w || v.disabled))
							if (g && m.clk && v.type == "image") {
								if (m.clk == v) {
									n.push({
										name: w,
										value: b(v).val(),
										type: v.type
									});
									n.push({
										name: w + ".x",
										value: m.clk_x
									}, {
										name: w + ".y",
										value: m.clk_y
									})
								}
							} else if ((D = b.fieldValue(v, true)) && D.constructor == Array) {
							l && l.push(v);
							t = 0;
							for (v = D.length; t < v; t++) n.push({
								name: w,
								value: D[t]
							})
						} else if (f.fileapi && v.type == "file") {
							l && l.push(v);
							D = v.files;
							if (D.length)
								for (t = 0; t < D.length; t++) n.push({
									name: w,
									value: D[t],
									type: v.type
								});
							else n.push({
								name: w,
								value: "",
								type: v.type
							})
						} else if (D !==
							null && typeof D != "undefined") {
							l && l.push(v);
							n.push({
								name: w,
								value: D,
								type: v.type,
								required: v.required
							})
						}
					}
					if (!g && m.clk) {
						g = b(m.clk);
						l = g[0];
						if ((w = l.name) && !l.disabled && l.type == "image") {
							n.push({
								name: w,
								value: g.val()
							});
							n.push({
								name: w + ".x",
								value: m.clk_x
							}, {
								name: w + ".y",
								value: m.clk_y
							})
						}
					}
					return n
				}; b.fn.formSerialize = function (g) {
					return b.param(this.formToArray(g))
				}; b.fn.fieldSerialize = function (g) {
					var l = [];
					this.each(function () {
						var n = this.name;
						if (n) {
							var m = b.fieldValue(this, g);
							if (m && m.constructor == Array)
								for (var q = 0,
										o = m.length; q < o; q++) l.push({
									name: n,
									value: m[q]
								});
							else m !== null && typeof m != "undefined" && l.push({
								name: this.name,
								value: m
							})
						}
					});
					return b.param(l)
				}; b.fn.fieldValue = function (g) {
					for (var l = [], n = 0, m = this.length; n < m; n++) {
						var q = b.fieldValue(this[n], g);
						q === null || typeof q == "undefined" || q.constructor == Array && !q.length || (q.constructor == Array ? b.merge(l, q) : l.push(q))
					}
					return l
				}; b.fieldValue = function (g, l) {
					var n = g.name,
						m = g.type,
						q = g.tagName.toLowerCase();
					if (l === undefined) l = true;
					if (l && (!n || g.disabled || m == "reset" || m == "button" ||
						(m == "checkbox" || m == "radio") && !g.checked || (m == "submit" || m == "image") && g.form && g.form.clk != g || q == "select" && g.selectedIndex == -1)) return null;
					if (q == "select") {
						q = g.selectedIndex;
						if (q < 0) return null;
						l = [];
						g = g.options;
						n = (m = m == "select-one") ? q + 1 : g.length;
						for (q = m ? q : 0; q < n; q++) {
							var o = g[q];
							if (o.selected) {
								var t = o.value;
								t || (t = o.attributes && o.attributes.value && !o.attributes.value.specified ? o.text : o.value);
								if (m) return t;
								l.push(t)
							}
						}
						return l
					}
					return b(g).val()
				}; b.fn.clearForm = function (g) {
					return this.each(function () {
						b("input,select,textarea",
							this).clearFields(g)
					})
				}; b.fnll
			}, 100)
	}

	function e() {
		if (b.fn.ajaxSubmit.debug) {
			var g = "[jquery.form] " + Array.prototype.join.call(arguments, "");
			if (window.console && window.console.log) window.console.log(g);
			else window.opera && window.opera.postError && window.opera.postError(g)
		}
	}
	var f = {}; f.fileapi = b("<input type='file'/>").get(0).files !== undefined; f.formdata = window.FormData !== undefined;
	var h = !! b.fn.prop; b.fn.attr2 = function () {
		if (!h) return this.attr.apply(this, arguments);
		var g = this.prop.apply(this, arguments);
		if (g && g.jquery || typeof g === "string").clearFields = b.fn.clearInputs = function (g) {
			var l = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
			return this.each(function () {
				var n = this.type,
					m = this.tagName.toLowerCase();
				if (l.test(n) || m == "textarea") this.value = "";
				else if (n == "checkbox" || n == "radio") this.checked = false;
				else if (m == "select") this.selectedIndex = -1;
				else if (n == "file") /MSIE/.test(navigator.userAgent) ? b(this).replaceWith(b(this).clone(true)) : b(this).val("");
				else if (g)
					if (g ===
						true && /hidden/.test(n) || typeof g == "string" && b(this).is(g)) this.value = ""
			})
		};
		b.fn.resetForm = function () {
			return this.each(function () {
				if (typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) this.reset()
			})
		};
		b.fn.enable = function (g) {
			if (g === undefined) g = true;
			return this.each(function () {
				this.disabled = !g
			})
		};
		b.fn.selected = function (g) {
			if (g === undefined) g = true;
			return this.each(function () {
				var l = this.type;
				if (l == "checkbox" || l == "radio") this.checked = g;
				else if (this.tagName.toLowerCase() == "option") {
					l =
						b(this).parent("select");
					g && l[0] && l[0].type == "select-one" && l.find("option").selected(false);
					this.selected = g
				}
			})
		};
		b.fn.ajaxSubmit.debug = false
	})(jQuery);
(function (b) {
	var c = 0,
		d = {}, e = "%";
	b.fn.jqote = function (f, h) {
		var g = b([]);
		h = h || e;
		var l = new RegExp("<" + h + "(.+?)" + h + ">", "g");
		b.isArray(f) || (f = [f]);
		b(this).each(function (n) {
			var m = (fn = d[b.data(this, "jqote")]) ? fn : (d[b.data(this, "jqote", c++)] = new Function("i, j", "var t=[]; t.push('" + b(this).html().replace(/\s*<!\[CDATA\[|\]\]>\s*/g, "").replace(/[\r\n\t]/g, "\\\n").replace(l, function (q) {
					return q.replace(/'/g, "\u001a")
				}).split("<" + h + "=").join("\u001a,").replace(l, "\u001a); $1 t.push(\u001a").split(h + ">").join(",\u001a").split("'").join("\\'").split("\u001a").join("'") +
				"'); return $(t.join(''));"));
			for (j = 0; j < f.length; j++) g.push(m.call(f[j], n, j))
		});
		return g
	};
	b.jqote_tag = function (f) {
		e = f
	}
})(jQuery);
jQuery.fn.ivsNumeric = function () {
	return this.each(function () {
		var b = $(this);
		b.keydown(function () {
			b.numeric({
				decimal: false,
				negative: false
			}, null)
		})
	})
};
var dateFormat = function () {
	var b = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		c = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		d = /[^-+\dA-Z]/g,
		e = function (f, h) {
			f = String(f);
			for (h = h || 2; f.length < h;) f = "0" + f;
			return f
		};
	return function (f, h, g) {
		var l = dateFormat;
		if (arguments.length == 1 && Object.prototype.toString.call(f) == "[object String]" && !/\d/.test(f)) {
			h = f;
			f = undefined
		}
		f = f ? new Date(f) : new Date;
		if (isNaN(f)) throw SyntaxError("invalid date");
		h = String(l.masks[h] || h || l.masks["default"]);
		if (h.slice(0, 4) == "UTC:") {
			h = h.slice(4);
			g = true
		}
		var n = g ? "getUTC" : "get",
			m = f[n + "Date"](),
			q = f[n + "Day"](),
			o = f[n + "Month"](),
			t = f[n + "FullYear"](),
			w = f[n + "Hours"](),
			D = f[n + "Minutes"](),
			v = f[n + "Seconds"]();
		n = f[n + "Milliseconds"]();
		var I = g ? 0 : f.getTimezoneOffset(),
			S = {
				d: m,
				dd: e(m),
				ddd: l.i18n.dayNames[q],
				dddd: l.i18n.dayNames[q + 7],
				m: o + 1,
				mm: e(o + 1),
				mmm: l.i18n.monthNames[o],
				mmmm: l.i18n.monthNames[o + 12],
				yy: String(t).slice(2),
				yyyy: t,
				h: w % 12 || 12,
				hh: e(w % 12 || 12),
				H: w,
				HH: e(w),
				M: D,
				MM: e(D),
				s: v,
				ss: e(v),
				l: e(n, 3),
				L: e(n > 99 ? Math.round(n / 10) : n),
				t: w < 12 ? "a" : "p",
				tt: w < 12 ? "am" : "pm",
				T: w < 12 ? "A" : "P",
				TT: w < 12 ? "AM" : "PM",
				Z: g ? "UTC" : (String(f).match(c) || [""]).pop().replace(d, ""),
				o: (I > 0 ? "-" : "+") + e(Math.floor(Math.abs(I) / 60) * 100 + Math.abs(I) % 60, 4),
				S: ["th", "st", "nd", "rd"][m % 10 > 3 ? 0 : (m % 100 - m % 10 != 10) * m % 10]
			};
		return h.replace(b, function (P) {
			return P in S ? S[P] : P.slice(1, P.length - 1)
		})
	}
}();
dateFormat.masks = {
	"default": "ddd mmm dd yyyy HH:MM:ss",
	shortDate: "m/d/yy",
	mediumDate: "mmm d, yyyy",
	longDate: "mmmm d, yyyy",
	fullDate: "dddd, mmmm d, yyyy",
	shortTime: "h:MM TT",
	mediumTime: "h:MM:ss TT",
	longTime: "h:MM:ss TT Z",
	isoDate: "yyyy-mm-dd",
	isoTime: "HH:MM:ss",
	isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
dateFormat.i18n = {
	dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
Date.prototype.format = function (b, c) {
	return dateFormat(this, b, c)
};

function printStackTrace(b) {
	var c = b && b.e ? b.e : null;
	b = b && b.guess ? b.guess : true;
	var d = new printStackTrace.implementation;
	c = d.run(c);
	return b ? d.guessFunctions(c) : c
}
printStackTrace.implementation = function () {};
printStackTrace.implementation.prototype = {
	run: function (b) {
		var c = this._mode || this.mode();
		if (c === "other") return this.other(arguments.callee);
		else {
			b = b || function () {
				try {
					0()
				} catch (d) {
					return d
				}
			}();
			return this[c](b)
		}
	},
	mode: function () {
		try {
			0()
		} catch (b) {
			if (b.arguments) return this._mode = "chrome";
			else if (b.stack) return this._mode = "firefox";
			else if (window.opera && !("stacktrace" in b)) return this._mode = "opera"
		}
		return this._mode = "other"
	},
	chrome: function (b) {
		return b.stack.replace(/^.*?\n/, "").replace(/^.*?\n/, "").replace(/^.*?\n/,
			"").replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@").split("\n")
	},
	firefox: function (b) {
		return b.stack.replace(/^.*?\n/, "").replace(/(?:\n@:0)?\s+$/m, "").replace(/^\(/gm, "{anonymous}(").split("\n")
	},
	opera: function (b) {
		b = b.message.split("\n");
		var c = /Line\s+(\d+).*?script\s+(http\S+)(?:.*?in\s+function\s+(\S+))?/i,
			d, e, f;
		d = 4;
		e = 0;
		for (f = b.length; d < f; d += 2)
			if (c.test(b[d])) b[e++] = (RegExp.$3 ? RegExp.$3 + "()@" + RegExp.$2 + RegExp.$1 : "{anonymous}()@" + RegExp.$2 +
				":" + RegExp.$1) + " -- " + b[d + 1].replace(/^\s+/, "");
		b.splice(e, b.length - e);
		return b
	},
	other: function (b) {
		for (var c = /function\s*([\w\-$]+)?\s*\(/i, d = [], e = 0, f, h; b && d.length < 10;) {
			f = c.test(b.toString()) ? RegExp.$1 || "{anonymous}" : "{anonymous}";
			h = Array.prototype.slice.call(b.arguments);
			d[e++] = f + "(" + printStackTrace.implementation.prototype.stringifyArguments(h) + ")";
			if (b === b.caller && window.opera) break;
			b = b.caller
		}
		return d
	},
	stringifyArguments: function (b) {
		for (var c = 0; c < b.length; ++c) {
			var d = b[c];
			if (typeof d == "object") b[c] =
				"#object";
			else if (typeof d == "function") b[c] = "#function";
			else if (typeof d == "string") b[c] = '"' + d + '"'
		}
		return b.join(",")
	},
	sourceCache: {},
	ajax: function (b) {
		var c = this.createXMLHTTPObject();
		if (c) {
			c.open("GET", b, false);
			c.setRequestHeader("User-Agent", "XMLHTTP/1.0");
			c.send("");
			return c.responseText
		}
	},
	createXMLHTTPObject: function () {
		for (var b, c = [
					function () {
						return new XMLHttpRequest
					},
					function () {
						return new ActiveXObject("Msxml2.XMLHTTP")
					},
					function () {
						return new ActiveXObject("Msxml3.XMLHTTP")
					},
					function () {
						return new ActiveXObject("Microsoft.XMLHTTP")
					}
				],
				d = 0; d < c.length; d++) try {
			b = c[d]();
			this.createXMLHTTPObject = c[d];
			return b
		} catch (e) {}
	},
	getSource: function (b) {
		b in this.sourceCache || (this.sourceCache[b] = this.ajax(b).split("\n"));
		return this.sourceCache[b]
	},
	guessFunctions: function (b) {
		for (var c = 0; c < b.length; ++c) {
			var d = b[c],
				e = /{anonymous}\(.*\)@(\w+:\/\/([-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/.exec(d);
			if (e) {
				var f = e[1];
				e = e[4];
				if (f && e) {
					f = this.guessFunctionName(f, e);
					b[c] = d.replace("{anonymous}", f)
				}
			}
		}
		return b
	},
	guessFunctionName: function (b, c) {
		try {
			return this.guessFunctionNameFromLines(c,
				this.getSource(b))
		} catch (d) {
			return "getSource failed with url: " + b + ", exception: " + d.toString()
		}
	},
	guessFunctionNameFromLines: function (b, c) {
		for (var d = /function ([^(]*)\(([^)]*)\)/, e = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(function|eval|new Function)/, f = "", h = 0; h < 10; ++h) {
			f = c[b - h] + f;
			if (f !== undefined) {
				var g = e.exec(f);
				if (g) return g[1];
				else g = d.exec(f); if (g && g[1]) return g[1]
			}
		}
		return "(?)"
	}
};
var spinboxDigits = [/[0-9]/],
	spinboxPadDigits = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 109, 110],
	spinboxPadArrows = [33, 34, 35, 36, 37, 38, 39, 40],
	spinboxOtherWhiteKeys = [9, 13, 8, 46, 188, 190],
	spinboxAllKeys = spinboxDigits.concat(spinboxPadDigits, spinboxPadArrows, spinboxOtherWhiteKeys);
(function (b) {
	function c(e) {
		if (isNaN(e)) return false;
		if (typeof e == "number") return true;
		return !isNaN(b.parseFloat(e))
	}

	function d() {
		for (var e = 0; e < arguments.length; e++)
			if (arguments[e] !== NaN) {
				if (typeof arguments[e] == "number") return arguments[e];
				var f = b.parseFloat(arguments[e]);
				if (!isNaN(f)) return Number(f)
			}
		return NaN
	}
	b.fn.spinbox = function (e) {
		function f(o) {
			if (typeof o == "number") return o;
			return b.parseFloat(o)
		}

		function h(o, t) {
			return t === 0 ? b.format(o, "d0") : b.format(o, "n" + t)
		}

		function g() {
			var o = b(this),
				t = d(o.val(),
					o.data("spinboxReset"), 0),
				w = d(o.val()),
				D = d(o.data("spinboxMin")),
				v = d(o.data("spinboxMax")),
				I = d(o.data("spinboxAtomicAmount")),
				S = d(o.data("spinboxAtomicAmountOffset")),
				P = o.data("spinboxInvalidClass");
			if (c(o.data("spinboxScale")) && e.round) t = e.round(t, o.data("spinboxScale"));
			if (c(D)) t = Math.max(t, D);
			if (c(v)) t = Math.min(t, v);
			if (!c(S) && c(I)) {
				S = t % I;
				o.data("spinboxAtomicAmountOffset", S)
			}
			if (c(I)) t = t - t % I + S;
			if (P) c(w) && t == w ? b(this).removeClass(P) : b(this).addClass(P);
			return t == w
		}

		function l(o, t, w) {
			o = b(this);
			if (!(e.ignore &&
				o.is(e.ignore))) {
				t = d(t, o.data("spinboxStep"), 1);
				w = w || (q ? -1 : 1);
				var D = o.val(),
					v = d(D, o.data("spinboxReset"), 0),
					I = d(o.data("spinboxMin")),
					S = d(o.data("spinboxMax")),
					P = d(o.data("spinboxAtomicAmount")),
					p = d(o.data("spinboxAtomicAmountOffset")),
					x = [v, t, I, S, w, D, e];
				if (w > 0) v = e.increment.apply(this, x);
				else if (w < 0) v = e.decrement.apply(this, x);
				if (c(o.data("spinboxScale")) && e.round) v = e.round(v, o.data("spinboxScale"));
				if (c(I)) v = Math.max(v, I);
				if (c(S)) v = Math.min(v, S);
				if (!c(p) && c(P)) {
					p = v % P;
					o.data("spinboxAtomicAmountOffset",
						p)
				}
				if (c(P)) v = v - v % P + p;
				P = v;
				if (c(o.data("spinboxScale"))) P = h(v, o.data("spinboxScale"));
				x = [f(P), t, I, S, w, f(D), e];
				if (P != D && o.triggerHandler("beforeSpin", x) !== false) {
					o.val(P);
					e.change && o.trigger("change", x)
				}
				t = o.data("spinnedValue");
				o.data("spinnedValue", P);
				t != P && o.triggerHandler("spin", x);
				g.apply(this)
			}
		}
		if (e && typeof e === "string" && e === "disable") return this.prop("disabled", true).parent().children(".spinbox-inc,.spinbox-dec").addClass("spinbox-disabled");
		if (e && typeof e === "string" && e === "enable") return this.prop("disabled",
			false).parent().children(".spinbox-inc,.spinbox-dec").removeClass("spinbox-disabled");
		if (e && typeof e === "string" && e === "destroy") return this.unbind(".spinbox").val("").removeClass(e.spinboxClass).removeClass(e.upClass).removeClass(e.downClass).removeClass(e.upHoverClass).removeClass(e.downHoverClass).removeData("spinboxMax").removeData("spinboxReset").removeData("spinboxStep").removeData("spinboxBigStep").removeData("spinboxMaxLength").removeData("spinboxScale").removeData("spinboxReset").removeData("spinboxAtomicAmount").removeData("spinboxAtomicAmountOffset").removeData("spinboxInvalidClass");
		if (e && typeof e === "string") {
			alert("spinbox unknown operation : " + e);
			return this
		}
		e = b.extend({}, b.fn.spinbox.defaults, e);
		var n = this.each(function () {
			var o = b(this),
				t = d(e.reset, e.min, e.max, o.val(), o.data("spinboxReset")),
				w = o.data("spinboxScale");
			w = w || c(w) ? w : e.scale;
			if (w === true) w = (e.step.toString().split(".")[1] || "").length;
			o.data("spinboxMin", e.min);
			o.data("spinboxMax", e.max);
			o.data("spinboxStep", e.step);
			o.data("spinboxBigStep", e.bigStep);
			o.data("spinboxReset", t);
			o.data("spinboxScale", w);
			o.data("spinboxMaxLength",
				e.maxLength);
			o.data("spinboxAtomicAmount", e.atomicAmount);
			o.data("spinboxAtomicAmountOffset", null);
			o.data("spinboxInvalidClass", e.invalidClass)
		});
		if (e.update) {
			n.each(function () {
				l.apply(this, [b.Event(), 0])
			});
			return n
		}
		b(this).unbind(".spinbox");
		b(this).parent().children(".spinbox-inc,.spinbox-dec").remove();
		var m, q;
		return this.each(function () {
			function o(p, x, F, B) {
				t();
				w = window.setTimeout(function () {
					l.apply(p, [x, F, B]);
					D = window.setInterval(function () {
						l.apply(p, [x, F, B])
					}, e.repeat)
				}, e.delay)
			}

			function t() {
				window.clearTimeout(w);
				window.clearInterval(D)
			}
			var w, D, v = b(this);
			if (e.touchButtons) {
				var I = b('<a class="spinbox-inc spinbox-float" href="#"></a>').appendTo(v.parent()),
					S = b('<a class="spinbox-dec spinbox-float" href="#"></a>').appendTo(v.parent()),
					P = false;
				b([]).add(I).add(S).bind("touchstart.spinbox mousedown.spinbox", function (p) {
					if (P) return false;
					if (b(this).hasClass("spinbox-disabled")) return false;
					P = true;
					b(this).addClass("spinbox-active");
					var x = b(this).hasClass("spinbox-inc") ? 1 : -1;
					l.apply(v, [p, v.data("spinboxStep"), x]);
					o(v, p, v.data("spinboxStep"), x);
					return false
				}).bind("touchend.spinbox mouseout.spinbox mouseup.spinbox", function () {
					P = false;
					b(this).removeClass("spinbox-active");
					if (b(this).hasClass("spinbox-disabled")) return false;
					t();
					return false
				}).bind("click.spinbox", function () {
					return false
				});
				v.addClass("spinbox-touch");
				v.addClass("spinbox-float")
			}
			v.bind("mousemove.spinbox", function (p) {
				if (e.touchButtons) return true;
				var x = b(this),
					F = x.offset(),
					B = x.height() / 2,
					z = p.pageX > F.left + x.width() - e.buttonWidth;
				m = z && p.pageY <=
					F.top + B;
				q = z && p.pageY > F.top + B;
				x.toggleClass(e.upHoverClass, m).toggleClass(e.downHoverClass, q)
			}).bind("mouseout.spinbox", function () {
				if (e.touchButtons) return true;
				t();
				b(this).removeClass([e.upClass, e.downClass, e.upHoverClass, e.downHoverClass].join(" "));
				m = q = null
			}).bind("selectstart.spinbox", function () {
				if (e.touchButtons) return true;
				if (m || q) return false;
				return true
			}).bind("dblclick.spinbox", function () {
				if (e.touchButtons) return true;
				return false
			}).bind("mousedown.spinbox", function (p) {
				if (e.touchButtons) return true;
				if (m || q) {
					b(this).toggleClass(e.upClass, m).toggleClass(e.downClass, q);
					l.apply(this, [p]);
					o(this, p);
					return false
				}
			}).bind("mouseup.spinbox", function () {
				if (e.touchButtons) return true;
				t();
				b(this).removeClass(e.upClass).removeClass(e.downClass);
				return false
			}).bind("keydown.spinbox", function (p) {
				if (!e.keys || b.grep(e.keys, function (z) {
					return z === p.keyCode || z instanceof RegExp && z.test(String.fromCharCode(p.keyCode))
				}).length) {
					var x = b(this);
					if (x.val().length == x.data("spinboxMaxLength") && (spinboxDigits[0].test(String.fromCharCode(p.keyCode)) ||
						b.inArray(p.keyCode, spinboxPadDigits) > -1)) return false;
					var F = {
						up: 38,
						down: 40,
						pageUp: 33,
						pageDown: 34
					}, B = x.data("spinboxBigStep");
					x = p.shiftKey ? B : x.data("spinboxStep");
					switch (p.keyCode) {
					case F.up:
						l.apply(this, [p, x, 1]);
						break;
					case F.down:
						l.apply(this, [p, x, -1]);
						break;
					case F.pageUp:
						l.apply(this, [p, B, 1]);
						break;
					case F.pageDown:
						l.apply(this, [p, B, -1]);
						break
					}
				} else return !e.keys
			}).bind("keyup.spinbox", function () {
				if (!b(this).data("spinboxInvalidClass")) return true;
				g.apply(this) && e.change && b(this).trigger("change", [true]);
				return true
			}).bind("change.spinbox", function (p, x) {
				x || g.apply(this) && l.apply(this, [p, 0])
			}).addClass(e.spinboxClass);
			e.mousewheel && b(this).bind("mousewheel.spinbox DOMMouseScroll.spinbox", function (p) {
				var x = p.shiftKey ? b(this).data("spinboxBigStep") : b(this).data("spinboxStep");
				if (p.detail < 0 || p.wheelDelta >= 120) l.apply(this, [p, x, 1]);
				else if (p.detail > 0 || p.wheelDelta <= -120) l.apply(this, [p, x, -1]);
				return false
			});
			l.apply(this, [b.Event(), 0])
		})
	};
	b.fn.spinbox.defaults = {
		min: 0,
		max: null,
		step: 1,
		bigStep: 10,
		keys: spinboxAllKeys,
		ignore: "[readonly],[disabled]",
		spinboxClass: "spinbox-active",
		upClass: "spinbox-up",
		downClass: "spinbox-down",
		upHoverClass: "spinbox-up-hover",
		downHoverClass: "spinbox-down-hover",
		mousewheel: true,
		change: true,
		increment: function (e, f) {
			return e + f
		},
		decrement: function (e, f) {
			return e - f
		},
		reset: null,
		delay: 500,
		repeat: 100,
		buttonWidth: 20,
		scale: true,
		maxLength: 8,
		update: false,
		touchButtons: true,
		atomicAmount: null,
		invalidClass: null,
		round: function (e, f) {
			return Math.round(e * Math.pow(10, f)) / Math.pow(10, f)
		}
	}
})(jQuery);
jQuery.cookie = function (b, c, d) {
	if (typeof c != "undefined") {
		d = d || {};
		if (c === null) {
			c = "";
			d.expires = -1
		}
		var e = "";
		if (d.expires && (typeof d.expires == "number" || d.expires.toUTCString)) {
			if (typeof d.expires == "number") {
				e = new Date;
				e.setTime(e.getTime() + d.expires * 24 * 60 * 60 * 1E3)
			} else e = d.expires;
			e = "; expires=" + e.toUTCString()
		}
		var f = d.path ? "; path=" + d.path : "",
			h = d.domain ? "; domain=" + d.domain : "";
		d = d.secure ? "; secure" : "";
		document.cookie = [b, "=", encodeURIComponent(c), e, f, h, d].join("")
	} else {
		c = null;
		if (document.cookie && document.cookie !=
			"") {
			d = document.cookie.split(";");
			for (e = 0; e < d.length; e++) {
				f = jQuery.trim(d[e]);
				if (f.substring(0, b.length + 1) == b + "=") {
					c = decodeURIComponent(f.substring(b.length + 1));
					break
				}
			}
		}
		return c
	}
};
(function (b) {
	b.fn.alphanumeric = function (c) {
		c = b.extend({
			ichars: "!@#$%^&*()+=[]\\';,/{}|\":<>?~`.- ",
			nchars: "",
			allow: ""
		}, c);
		return this.each(function () {
			if (c.nocaps) c.nchars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			if (c.allcaps) c.nchars += "abcdefghijklmnopqrstuvwxyz";
			s = c.allow.split("");
			for (i = 0; i < s.length; i++)
				if (c.ichars.indexOf(s[i]) != -1) s[i] = "\\" + s[i];
			c.allow = s.join("|");
			var d = c.ichars + c.nchars;
			d = d.replace(new RegExp(c.allow, "gi"), "");
			b(this).keypress(function (e) {
				k = e.charCode ? String.fromCharCode(e.charCode) : String.fromCharCode(e.which);
				d.indexOf(k) != -1 && e.preventDefault();
				e.ctrlKey && k == "v" && e.preventDefault()
			});
			b(this).bind("contextmenu", function () {
				return false
			})
		})
	};
	b.fn.numeric = function (c) {
		var d = "abcdefghijklmnopqrstuvwxyz";
		d += d.toUpperCase();
		c = b.extend({
			nchars: d
		}, c);
		return this.each(function () {
			b(this).alphanumeric(c)
		})
	};
	b.fn.removeSpaces = function () {
		return this.each(function () {
			b(this).val(b(this).val().replace(/ /g, ""))
		})
	};
	b.fn.alpha = function (c) {
		c = b.extend({
			nchars: "1234567890"
		}, c);
		return this.each(function () {
			b(this).alphanumeric(c)
		})
	}
})(jQuery);
(function (b) {
	b.fn.numeric = function (c, d) {
		if (typeof c === "boolean") c = {
			decimal: c
		};
		c = c || {};
		if (typeof c.negative == "undefined") c.negative = true;
		var e = c.decimal === false ? "" : c.decimal || ".";
		c = c.negative === true ? true : false;
		d = typeof d == "function" ? d : function () {};
		return this.data("numeric.decimal", e).data("numeric.negative", c).data("numeric.callback", d).keypress(b.fn.numeric.keypress).keyup(b.fn.numeric.keyup).blur(b.fn.numeric.blur)
	};
	b.fn.numeric.keypress = function (c) {
		var d = b.data(this, "numeric.decimal"),
			e = b.data(this,
				"numeric.negative"),
			f = c.charCode ? c.charCode : c.keyCode ? c.keyCode : 0;
		if (f == 13 && this.nodeName.toLowerCase() == "input") return true;
		else if (f == 13) return false;
		var h = false;
		if (c.ctrlKey && f == 97 || c.ctrlKey && f == 65) return true;
		if (c.ctrlKey && f == 120 || c.ctrlKey && f == 88) return true;
		if (c.ctrlKey && f == 99 || c.ctrlKey && f == 67) return true;
		if (c.ctrlKey && f == 122 || c.ctrlKey && f == 90) return true;
		if (c.ctrlKey && f == 118 || c.ctrlKey && f == 86 || c.shiftKey && f == 45) return true;
		if (f < 48 || f > 57) {
			var g = b(this).val();
			if (g.indexOf("-") !== 0 && e && f == 45 &&
				(g.length === 0 || parseInt(b.fn.getSelectionStart(this), 10) === 0)) return true;
			if (d && f == d.charCodeAt(0) && g.indexOf(d) != -1) h = false;
			if (f != 8 && f != 9 && f != 13 && f != 35 && f != 36 && f != 37 && f != 39 && f != 46) h = false;
			else if (typeof c.charCode != "undefined")
				if (c.keyCode == c.which && c.which !== 0) {
					h = true;
					if (c.which == 46) h = false
				} else if (c.keyCode !== 0 && c.charCode === 0 && c.which === 0) h = true;
			if (d && f == d.charCodeAt(0)) h = g.indexOf(d) == -1 ? true : false
		} else h = true;
		return h
	};
	b.fn.numeric.keyup = function () {
		var c = b(this).val();
		if (c && c.length > 0) {
			var d =
				b.fn.getSelectionStart(this),
				e = b.data(this, "numeric.decimal"),
				f = b.data(this, "numeric.negative");
			if (e !== "" && e !== null) {
				var h = c.indexOf(e);
				if (h === 0) this.value = "0" + c;
				if (h == 1 && c.charAt(0) == "-") this.value = "-0" + c.substring(1);
				c = this.value
			}
			var g = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "-", e];
			h = c.length;
			for (var l = h - 1; l >= 0; l--) {
				var n = c.charAt(l);
				if (l !== 0 && n == "-") c = c.substring(0, l) + c.substring(l + 1);
				else if (l === 0 && !f && n == "-") c = c.substring(1);
				for (var m = false, q = 0; q < g.length; q++)
					if (n == g[q]) {
						m = true;
						break
					}
				if (!m || n == " ") c = c.substring(0,
					l) + c.substring(l + 1)
			}
			f = c.indexOf(e);
			if (f > 0)
				for (h = h - 1; h > f; h--)
					if (c.charAt(h) == e) c = c.substring(0, h) + c.substring(h + 1);
			this.value = c;
			b.fn.setSelection(this, d)
		}
	};
	b.fn.numeric.blur = function () {
		var c = b.data(this, "numeric.decimal"),
			d = b.data(this, "numeric.callback"),
			e = this.value;
		if (e !== "")(new RegExp("^\\d+$|^\\d*" + c + "\\d+$")).exec(e) || d.apply(this)
	};
	b.fn.removeNumeric = function () {
		return this.data("numeric.decimal", null).data("numeric.negative", null).data("numeric.callback", null).unbind("keypress", b.fn.numeric.keypress).unbind("blur",
			b.fn.numeric.blur)
	};
	b.fn.getSelectionStart = function (c) {
		if (c.createTextRange) {
			var d = document.selection.createRange().duplicate();
			d.moveEnd("character", c.value.length);
			if (d.text === "") return c.value.length;
			return c.value.lastIndexOf(d.text)
		} else return c.selectionStart
	};
	b.fn.setSelection = function (c, d) {
		if (typeof d == "number") d = [d, d];
		if (d && d.constructor == Array && d.length == 2)
			if (c.createTextRange) {
				c = c.createTextRange();
				c.collapse(true);
				c.moveStart("character", d[0]);
				c.moveEnd("character", d[1]);
				c.select()
			} else if (c.setSelectionRange) {
			c.focus();
			c.setSelectionRange(d[0], d[1])
		}
	}
})(jQuery);
new(function (b) {
	var c = b.separator || "&",
		d = b.spaces === false ? false : true,
		e = (b.prefix === false ? false : true) ? b.hash === true ? "#" : "?" : "",
		f = b.numbers === false ? false : true;
	jQuery.query = new(function () {
		var h = function (m, q) {
			return m != undefined && m !== null && (q ? m.constructor == q : true)
		}, g = function (m) {
				for (var q = /\[([^[]*)\]/g, o = /^([^[]+)(\[.*\])?$/.exec(m), t = o[1], w = []; m = q.exec(o[2]);) w.push(m[1]);
				return [t, w]
			}, l = function (m, q, o) {
				var t = q.shift();
				if (typeof m != "object") m = null;
				if (t === "") {
					m || (m = []);
					if (h(m, Array)) m.push(q.length ==
						0 ? o : l(null, q.slice(0), o));
					else if (h(m, Object)) {
						for (t = 0; m[t++] != null;);
						m[--t] = q.length == 0 ? o : l(m[t], q.slice(0), o)
					} else {
						m = [];
						m.push(q.length == 0 ? o : l(null, q.slice(0), o))
					}
				} else if (t && t.match(/^\s*[0-9]+\s*$/)) {
					var w = parseInt(t, 10);
					m || (m = []);
					m[w] = q.length == 0 ? o : l(m[w], q.slice(0), o)
				} else if (t) {
					w = t.replace(/^\s*|\s*$/g, "");
					m || (m = {});
					if (h(m, Array)) {
						var D = {};
						for (t = 0; t < m.length; ++t) D[t] = m[t];
						m = D
					}
					m[w] = q.length == 0 ? o : l(m[w], q.slice(0), o)
				} else return o;
				return m
			}, n = function (m) {
				var q = this;
				q.keys = {};
				m.queryObject ? jQuery.each(m.get(),
					function (o, t) {
						q.SET(o, t)
					}) : jQuery.each(arguments, function () {
					var o = "" + this;
					o = o.replace(/^[?#]/, "");
					o = o.replace(/[;&]$/, "");
					if (d) o = o.replace(/[+]/g, " ");
					jQuery.each(o.split(/[&;]/), function () {
						var t = decodeURIComponent(this.split("=")[0] || ""),
							w = decodeURIComponent(this.split("=")[1] || "");
						if (t) {
							if (f)
								if (/^[+-]?[0-9]+\.[0-9]*$/.test(w)) w = parseFloat(w);
								else if (/^[+-]?[0-9]+$/.test(w)) w = parseInt(w, 10);
							w = !w && w !== 0 ? true : w;
							if (w !== false && w !== true && typeof w != "number") w = w;
							q.SET(t, w)
						}
					})
				});
				return q
			};
		n.prototype = {
			queryObject: true,
			has: function (m, q) {
				m = this.get(m);
				return h(m, q)
			},
			GET: function (m) {
				if (!h(m)) return this.keys;
				var q = g(m);
				m = q[1];
				for (q = this.keys[q[0]]; q != null && m.length != 0;) q = q[m.shift()];
				return typeof q == "number" ? q : q || ""
			},
			get: function (m) {
				m = this.GET(m);
				if (h(m, Object)) return jQuery.extend(true, {}, m);
				else if (h(m, Array)) return m.slice(0);
				return m
			},
			SET: function (m, q) {
				q = !h(q) ? null : q;
				m = g(m);
				var o = m[0];
				this.keys[o] = l(this.keys[o], m[1].slice(0), q);
				return this
			},
			set: function (m, q) {
				return this.copy().SET(m, q)
			},
			REMOVE: function (m) {
				return this.SET(m,
					null).COMPACT()
			},
			remove: function (m) {
				return this.copy().REMOVE(m)
			},
			EMPTY: function () {
				var m = this;
				jQuery.each(m.keys, function (q) {
					delete m.keys[q]
				});
				return m
			},
			load: function (m) {
				var q = m.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1"),
					o = m.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
				return new n(m.length == o.length ? "" : o, m.length == q.length ? "" : q)
			},
			empty: function () {
				return this.copy().EMPTY()
			},
			copy: function () {
				return new n(this)
			},
			COMPACT: function () {
				function m(q) {
					var o = typeof q == "object" ? h(q, Array) ? [] : {} : q;
					if (typeof q == "object") {
						var t =
							function (w, D, v) {
								if (h(w, Array)) w.push(v);
								else w[D] = v
						};
						jQuery.each(q, function (w, D) {
							if (!h(D)) return true;
							t(o, w, m(D))
						})
					}
					return o
				}
				this.keys = m(this.keys);
				return this
			},
			compact: function () {
				return this.copy().COMPACT()
			},
			toString: function () {
				var m = [],
					q = [],
					o = function (D) {
						D += "";
						if (d) D = D.replace(/ /g, "+");
						return encodeURIComponent(D)
					}, t = function (D, v, I) {
						if (!(!h(I) || I === false)) {
							v = [o(v)];
							if (I !== true) {
								v.push("=");
								v.push(o(I))
							}
							D.push(v.join(""))
						}
					}, w = function (D, v) {
						var I = function (S) {
							return !v || v == "" ? "" + S : [v, "[", S, "]"].join("")
						};
						jQuery.each(D, function (S, P) {
							typeof P == "object" ? w(P, I(S)) : t(q, I(S), P)
						})
					};
				w(this.keys);
				q.length > 0 && m.push(e);
				m.push(q.join(c));
				return m.join("")
			}
		};
		return new n(location.search, location.hash)
	})
})(jQuery.query || {});
(function (b) {
	b.widget("ui.menubar", {
		version: "@VERSION",
		options: {
			autoExpand: false,
			buttons: false,
			items: "li",
			menuElement: "ul",
			menuIcon: false,
			position: {
				my: "left top",
				at: "left bottom"
			}
		},
		_create: function () {
			this.menuItems = this.element.children(this.options.items);
			this.items = this.menuItems.children("button, a");
			this.openSubmenus = 0;
			this._initializeWidget();
			this._initializeMenuItems();
			this._initializeItems()
		},
		_initializeWidget: function () {
			this.element.addClass("ui-menubar ui-widget-header ui-helper-clearfix").attr("role",
				"menubar");
			this._on(this.element, {
				keydown: function (c) {
					var d;
					if (c.keyCode === b.ui.keyCode.ESCAPE && this.active && this.active.menu("collapse", c) !== true) {
						d = this.active;
						this.active.blur();
						this._close(c);
						b(c.target).blur().mouseleave();
						d.prev().focus()
					}
				},
				focusin: function () {
					this.items.eq(0).attr("tabIndex", -1);
					clearTimeout(this.closeTimer)
				},
				focusout: function () {
					this.closeTimer = this._delay(function () {
						this._close();
						this.items.eq(0).attr("tabIndex", 0)
					}, 150)
				},
				"mouseleave .ui-menubar-item": function () {
					if (this.options.autoExpand) this.closeTimer =
						this._delay(function () {
							this._close()
						}, 150)
				},
				"mouseenter .ui-menubar-item": function () {
					clearTimeout(this.closeTimer)
				}
			})
		},
		_initializeMenuItems: function () {
			var c = this;
			this.menuItems.addClass("ui-menubar-item").attr("role", "presentation").css({
				"border-width": "1px",
				"border-style": "hidden"
			});
			this._on(this.menuItems.children(c.options.menuElement).menu({
				position: {
					within: this.options.position.within
				},
				select: function (d, e) {
					if (e.item.hasClass("dont-close-on-click") || d.originalEvent && d.originalEvent.currentTarget &&
						b(d.originalEvent.currentTarget).hasClass("dont-close-on-click")) return false;
					e.item.parents("ul.ui-menu:last").hide();
					c._close();
					e.item.parents(".ui-menubar-item").children().first().focus();
					c._trigger("select", d, e)
				},
				menus: this.options.menuElement
			}).hide().attr({
				"aria-hidden": "true",
				"aria-expanded": "false"
			}), {
				keydown: function (d) {
					b(d.target).attr("tabIndex", 0);
					var e;
					if (!b(this).is(":hidden")) switch (d.keyCode) {
					case b.ui.keyCode.LEFT:
						e = c.active.prev(".ui-button");
						if (this.openSubmenus) this.openSubmenus--;
						else if (this._hasSubMenu(e.parent().prev())) {
							c.active.blur();
							c._open(d, e.parent().prev().find(".ui-menu"))
						} else {
							e.parent().prev().find(".ui-button").focus();
							c._close(d);
							this.open = true
						}
						d.preventDefault();
						b(d.target).attr("tabIndex", -1);
						break;
					case b.ui.keyCode.RIGHT:
						this.next(d);
						d.preventDefault();
						break
					}
				},
				focusout: function (d) {
					b(d.target).removeClass("ui-state-focus")
				}
			});
			this.menuItems.each(function (d, e) {
				c._identifyMenuItemsNeighbors(b(e), c, d)
			})
		},
		_hasSubMenu: function (c) {
			return b(c).children(this.options.menuElement).length >
				0
		},
		_identifyMenuItemsNeighbors: function (c, d, e) {
			d = this.menuItems.length;
			var f = e === d - 1;
			if (e === 0) {
				c.data("prevMenuItem", b(this.menuItems[d - 1]));
				c.data("nextMenuItem", b(this.menuItems[e + 1]))
			} else {
				f ? c.data("nextMenuItem", b(this.menuItems[0])) : c.data("nextMenuItem", b(this.menuItems[e + 1]));
				c.data("prevMenuItem", b(this.menuItems[e - 1]))
			}
		},
		_initializeItems: function () {
			var c = this;
			this._focusable(this.items);
			this._hoverable(this.items);
			this.items.slice(1).attr("tabIndex", -1);
			this.items.each(function (d, e) {
				c._initializeItem(b(e),
					c)
			})
		},
		_initializeItem: function (c) {
			var d = this._hasSubMenu(c.parent());
			c.addClass("ui-button ui-widget ui-button-text-only ui-menubar-link").attr("role", "menuitem").wrapInner("<span class='ui-button-text'></span>");
			this.options.buttons && c.removeClass("ui-menubar-link").addClass("ui-state-default");
			this._on(c, {
				focus: function (e) {
					c.attr("tabIndex", 0);
					c.addClass("ui-state-focus");
					e.preventDefault()
				},
				focusout: function (e) {
					c.attr("tabIndex", -1);
					c.removeClass("ui-state-focus");
					e.preventDefault()
				}
			});
			if (d) {
				this._on(c, {
					click: this._mouseBehaviorForMenuItemWithSubmenu,
					focus: this._mouseBehaviorForMenuItemWithSubmenu,
					mouseenter: this._mouseBehaviorForMenuItemWithSubmenu
				});
				this._on(c, {
					keydown: function (e) {
						switch (e.keyCode) {
						case b.ui.keyCode.SPACE:
						case b.ui.keyCode.UP:
						case b.ui.keyCode.DOWN:
							this._open(e, b(e.target).next());
							e.preventDefault();
							break;
						case b.ui.keyCode.LEFT:
							this.previous(e);
							e.preventDefault();
							break;
						case b.ui.keyCode.RIGHT:
							this.next(e);
							e.preventDefault();
							break;
						case b.ui.keyCode.TAB:
							break
						}
					}
				});
				c.attr("aria-haspopup",
					"true");
				if (this.options.menuIcon) {
					c.addClass("ui-state-default").append("<span class='ui-button-icon-secondary ui-icon ui-icon-triangle-1-s'></span>");
					c.removeClass("ui-button-text-only").addClass("ui-button-text-icon-secondary")
				}
			} else this._on(c, {
				click: function () {
					if (this.active) this._close();
					else {
						this.open = true;
						this.active = b(c).parent()
					}
				},
				mouseenter: function () {
					if (this.open) {
						this.stashedOpenMenu = this.active;
						this._close()
					}
				},
				keydown: function (e) {
					if (e.keyCode === b.ui.keyCode.LEFT) {
						this.previous(e);
						e.preventDefault()
					} else if (e.keyCode ===
						b.ui.keyCode.RIGHT) {
						this.next(e);
						e.preventDefault()
					}
				}
			})
		},
		_mouseBehaviorForMenuItemWithSubmenu: function (c) {
			var d;
			if (!(c.type === "focus" && !c.originalEvent)) {
				c.preventDefault();
				d = b(c.target).parents(".ui-menubar-item").children("ul");
				if (c.type === "click" && d.is(":visible") && this.active && this.active[0] === d[0]) this._close();
				else {
					if (c.type === "mouseenter") {
						this.element.find(":focus").focusout();
						this.stashedOpenMenu && this._open(c, d);
						this.stashedOpenMenu = undefined
					}
					if (this.open && c.type === "mouseenter" || c.type ===
						"click" || this.options.autoExpand) {
						clearTimeout(this.closeTimer);
						this._open(c, d);
						c.stopPropagation()
					}
				}
			}
		},
		_destroy: function () {
			this.menuItems.removeClass("ui-menubar-item").removeAttr("role").css({
				"border-width": "",
				"border-style": ""
			});
			this.element.removeClass("ui-menubar ui-widget-header ui-helper-clearfix").removeAttr("role").unbind(".menubar");
			this.items.unbind(".menubar").removeClass("ui-button ui-widget ui-button-text-only ui-menubar-link ui-state-default").removeAttr("role").removeAttr("aria-haspopup").children(".ui-icon").remove();
			this.items.children("span.ui-button-text").each(function () {
				var c = b(this);
				c.parent().html(c.html())
			});
			this.element.find(":ui-menu").menu("destroy").show().removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("tabindex").unbind(".menubar")
		},
		_collapseActiveMenu: function () {
			this.active.menu("collapseAll").hide().attr({
				"aria-hidden": "true",
				"aria-expanded": "false"
			}).closest(this.options.items).removeClass("ui-state-active")
		},
		_close: function () {
			if (this.active) {
				this._collapseActiveMenu();
				this.active =
					null;
				this.open = false;
				this.openSubmenus = 0
			}
		},
		_open: function (c, d) {
			var e;
			e = d.closest(".ui-menubar-item");
			this.active && this.active.length && this._hasSubMenu(this.active.closest(this.options.items)) && this._collapseActiveMenu();
			e = e.addClass("ui-state-active");
			this.active = d.show().position(b.extend({
				of: e
			}, this.options.position)).removeAttr("aria-hidden").attr("aria-expanded", "true").menu("focus", c, d.children(".ui-menu-item").first()).focus();
			this.open = true
		},
		next: function (c) {
			function d() {
				return this.active &&
					this._hasSubMenu(this.active.closest(this.options.items)) && this.active.data("uiMenu") && this.active.data("uiMenu").active && this.active.data("uiMenu").active.has(".ui-menu").length
			}
			if (this.open)
				if (d.call(this)) {
					this.openSubmenus++;
					return
				}
			this.openSubmenus = 0;
			this._move("next", c)
		},
		previous: function (c) {
			if (this.open && this.openSubmenus) this.openSubmenus--;
			else {
				this.openSubmenus = 0;
				this._move("prev", c)
			}
		},
		_move: function (c, d) {
			var e = b(d.target).closest(".ui-menubar-item");
			c = e.data(c + "MenuItem");
			var f = c.find(".ui-button");
			if (this.open)
				if (this._hasSubMenu(c)) this._open(d, c.children(".ui-menu"));
				else {
					this._collapseActiveMenu();
					c.find(".ui-button").focus();
					this.open = true
				} else {
					e.find(".ui-button");
					f.focus()
				}
		}
	})
})(jQuery);
if (!this.JSON) this.JSON = {};
(function () {
	function b(m) {
		return m < 10 ? "0" + m : m
	}

	function c(m) {
		f.lastIndex = 0;
		return f.test(m) ? '"' + m.replace(f, function (q) {
			var o = l[q];
			return typeof o === "string" ? o : "\\u" + ("0000" + q.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + m + '"'
	}

	function d(m, q) {
		var o, t, w = h,
			D, v = q[m];
		if (v && typeof v === "object" && typeof v.toJSON === "function") v = v.toJSON(m);
		if (typeof n === "function") v = n.call(q, m, v);
		switch (typeof v) {
		case "string":
			return c(v);
		case "number":
			return isFinite(v) ? String(v) : "null";
		case "boolean":
		case "null":
			return String(v);
		case "object":
			if (!v) return "null";
			h += g;
			D = [];
			if (Object.prototype.toString.apply(v) === "[object Array]") {
				t = v.length;
				for (m = 0; m < t; m += 1) D[m] = d(m, v) || "null";
				q = D.length === 0 ? "[]" : h ? "[\n" + h + D.join(",\n" + h) + "\n" + w + "]" : "[" + D.join(",") + "]";
				h = w;
				return q
			}
			if (n && typeof n === "object") {
				t = n.length;
				for (m = 0; m < t; m += 1) {
					o = n[m];
					if (typeof o === "string")
						if (q = d(o, v)) D.push(c(o) + (h ? ": " : ":") + q)
				}
			} else
				for (o in v)
					if (Object.hasOwnProperty.call(v, o))
						if (q = d(o, v)) D.push(c(o) + (h ? ": " : ":") + q); q = D.length === 0 ? "{}" : h ? "{\n" + h + D.join(",\n" + h) +
				"\n" + w + "}" : "{" + D.join(",") + "}";
			h = w;
			return q
		}
	}
	if (typeof Date.prototype.toJSON !== "function") {
		Date.prototype.toJSON = function () {
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z" : null
		};
		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
			return this.valueOf()
		}
	}
	var e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		h, g, l = {
			"\u0008": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\u000c": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		}, n;
	if (typeof JSON.stringify !== "function") JSON.stringify = function (m, q, o) {
		var t;
		g = h = "";
		if (typeof o === "number")
			for (t = 0; t < o; t += 1) g += " ";
		else if (typeof o === "string") g = o;
		if ((n = q) && typeof q !== "function" && (typeof q !== "object" || typeof q.length !== "number")) throw new Error("JSON.stringify");
		return d("", {
			"": m
		})
	};
	if (typeof JSON.parse !== "function") JSON.parse = function (m, q) {
		function o(t, w) {
			var D, v, I = t[w];
			if (I && typeof I === "object")
				for (D in I)
					if (Object.hasOwnProperty.call(I, D)) {
						v = o(I, D);
						if (v !== undefined) I[D] = v;
						else delete I[D]
					}
			return q.call(t, w, I)
		}
		m = String(m);
		e.lastIndex = 0;
		if (e.test(m)) m = m.replace(e, function (t) {
			return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
		});
		if (/^[\],:{}\s]*$/.test(m.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
			"]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
			m = eval("(" + m + ")");
			return typeof q === "function" ? o({
				"": m
			}, "") : m
		}
		throw new SyntaxError("JSON.parse");
	}
})();
var swfobject = function () {
	function b() {
		if (!fa) {
			try {
				var r = G.getElementsByTagName("body")[0].appendChild(I("span"));
				r.parentNode.removeChild(r)
			} catch (u) {
				return
			}
			fa = true;
			r = X.length;
			for (var C = 0; C < r; C++) X[C]()
		}
	}

	function c(r) {
		if (fa) r();
		else X[X.length] = r
	}

	function d(r) {
		if (typeof O.addEventListener != B) O.addEventListener("load", r, false);
		else if (typeof G.addEventListener != B) G.addEventListener("load", r, false);
		else if (typeof O.attachEvent != B) S(O, "onload", r);
		else if (typeof O.onload == "function") {
			var u = O.onload;
			O.onload =
				function () {
					u();
					r()
			}
		} else O.onload = r
	}

	function e() {
		E ? f() : h()
	}

	function f() {
		var r = G.getElementsByTagName("body")[0],
			u = I(z);
		u.setAttribute("type", L);
		var C = r.appendChild(u);
		if (C) {
			var y = 0;
			(function () {
				if (typeof C.GetVariable != B) {
					var A = C.GetVariable("$version");
					if (A) {
						A = A.split(" ")[1].split(",");
						J.pv = [parseInt(A[0], 10), parseInt(A[1], 10), parseInt(A[2], 10)]
					}
				} else if (y < 10) {
					y++;
					setTimeout(arguments.callee, 10);
					return
				}
				r.removeChild(u);
				C = null;
				h()
			})()
		} else h()
	}

	function h() {
		var r = W.length;
		if (r > 0)
			for (var u = 0; u < r; u++) {
				var C =
					W[u].id,
					y = W[u].callbackFn,
					A = {
						success: false,
						id: C
					};
				if (J.pv[0] > 0) {
					var M = v(C);
					if (M)
						if (P(W[u].swfVersion) && !(J.wk && J.wk < 312)) {
							x(C, true);
							if (y) {
								A.success = true;
								A.ref = g(C);
								y(A)
							}
						} else if (W[u].expressInstall && l()) {
						A = {};
						A.data = W[u].expressInstall;
						A.width = M.getAttribute("width") || "0";
						A.height = M.getAttribute("height") || "0";
						if (M.getAttribute("class")) A.styleclass = M.getAttribute("class");
						if (M.getAttribute("align")) A.align = M.getAttribute("align");
						var K = {};
						M = M.getElementsByTagName("param");
						for (var Q = M.length, T = 0; T <
							Q; T++)
							if (M[T].getAttribute("name").toLowerCase() != "movie") K[M[T].getAttribute("name")] = M[T].getAttribute("value");
						n(A, K, C, y)
					} else {
						m(M);
						y && y(A)
					}
				} else {
					x(C, true);
					if (y) {
						if ((C = g(C)) && typeof C.SetVariable != B) {
							A.success = true;
							A.ref = C
						}
						y(A)
					}
				}
			}
	}

	function g(r) {
		var u = null;
		if ((r = v(r)) && r.nodeName == "OBJECT")
			if (typeof r.SetVariable != B) u = r;
			else if (r = r.getElementsByTagName(z)[0]) u = r;
		return u
	}

	function l() {
		return !ha && P("6.0.65") && (J.win || J.mac) && !(J.wk && J.wk < 312)
	}

	function n(r, u, C, y) {
		ha = true;
		ga = y || null;
		ca = {
			success: false,
			id: C
		};
		var A = v(C);
		if (A) {
			if (A.nodeName == "OBJECT") {
				H = q(A);
				ia = null
			} else {
				H = A;
				ia = C
			}
			r.id = N;
			if (typeof r.width == B || !/%$/.test(r.width) && parseInt(r.width, 10) < 310) r.width = "310";
			if (typeof r.height == B || !/%$/.test(r.height) && parseInt(r.height, 10) < 137) r.height = "137";
			G.title = G.title.slice(0, 47) + " - Flash Player Installation";
			y = J.ie && J.win ? "ActiveX" : "PlugIn";
			y = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + y + "&MMdoctitle=" + G.title;
			if (typeof u.flashvars != B) u.flashvars += "&" + y;
			else u.flashvars =
				y; if (J.ie && J.win && A.readyState != 4) {
				y = I("div");
				C += "SWFObjectNew";
				y.setAttribute("id", C);
				A.parentNode.insertBefore(y, A);
				A.style.display = "none";
				(function () {
					A.readyState == 4 ? A.parentNode.removeChild(A) : setTimeout(arguments.callee, 10)
				})()
			}
			o(r, u, C)
		}
	}

	function m(r) {
		if (J.ie && J.win && r.readyState != 4) {
			var u = I("div");
			r.parentNode.insertBefore(u, r);
			u.parentNode.replaceChild(q(r), u);
			r.style.display = "none";
			(function () {
				r.readyState == 4 ? r.parentNode.removeChild(r) : setTimeout(arguments.callee, 10)
			})()
		} else r.parentNode.replaceChild(q(r),
			r)
	}

	function q(r) {
		var u = I("div");
		if (J.win && J.ie) u.innerHTML = r.innerHTML;
		else if (r = r.getElementsByTagName(z)[0])
			if (r = r.childNodes)
				for (var C = r.length, y = 0; y < C; y++)!(r[y].nodeType == 1 && r[y].nodeName == "PARAM") && r[y].nodeType != 8 && u.appendChild(r[y].cloneNode(true));
		return u
	}

	function o(r, u, C) {
		var y, A = v(C);
		if (J.wk && J.wk < 312) return y;
		if (A) {
			if (typeof r.id == B) r.id = C;
			if (J.ie && J.win) {
				var M = "";
				for (var K in r)
					if (r[K] != Object.prototype[K])
						if (K.toLowerCase() == "data") u.movie = r[K];
						else if (K.toLowerCase() == "styleclass") M +=
					' class="' + r[K] + '"';
				else if (K.toLowerCase() != "classid") M += " " + K + '="' + r[K] + '"';
				K = "";
				for (var Q in u)
					if (u[Q] != Object.prototype[Q]) K += '<param name="' + Q + '" value="' + u[Q] + '" />';
				A.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + M + ">" + K + "</object>";
				Z[Z.length] = r.id;
				y = v(r.id)
			} else {
				Q = I(z);
				Q.setAttribute("type", L);
				for (M in r)
					if (r[M] != Object.prototype[M])
						if (M.toLowerCase() == "styleclass") Q.setAttribute("class", r[M]);
						else M.toLowerCase() != "classid" && Q.setAttribute(M, r[M]);
				for (var T in u) u[T] !=
					Object.prototype[T] && T.toLowerCase() != "movie" && t(Q, T, u[T]);
				A.parentNode.replaceChild(Q, A);
				y = Q
			}
		}
		return y
	}

	function t(r, u, C) {
		var y = I("param");
		y.setAttribute("name", u);
		y.setAttribute("value", C);
		r.appendChild(y)
	}

	function w(r) {
		var u = v(r);
		if (u && u.nodeName == "OBJECT")
			if (J.ie && J.win) {
				u.style.display = "none";
				(function () {
					u.readyState == 4 ? D(r) : setTimeout(arguments.callee, 10)
				})()
			} else u.parentNode.removeChild(u)
	}

	function D(r) {
		if (r = v(r)) {
			for (var u in r)
				if (typeof r[u] == "function") r[u] = null;
			r.parentNode.removeChild(r)
		}
	}

	function v(r) {
		var u = null;
		try {
			u = G.getElementById(r)
		} catch (C) {}
		return u
	}

	function I(r) {
		return G.createElement(r)
	}

	function S(r, u, C) {
		r.attachEvent(u, C);
		V[V.length] = [r, u, C]
	}

	function P(r) {
		var u = J.pv;
		r = r.split(".");
		r[0] = parseInt(r[0], 10);
		r[1] = parseInt(r[1], 10) || 0;
		r[2] = parseInt(r[2], 10) || 0;
		return u[0] > r[0] || u[0] == r[0] && u[1] > r[1] || u[0] == r[0] && u[1] == r[1] && u[2] >= r[2] ? true : false
	}

	function p(r, u, C, y) {
		if (!(J.ie && J.mac)) {
			var A = G.getElementsByTagName("head")[0];
			if (A) {
				C = C && typeof C == "string" ? C : "screen";
				if (y) U = da = null;
				if (!da || U != C) {
					y = I("style");
					y.setAttribute("type", "text/css");
					y.setAttribute("media", C);
					da = A.appendChild(y);
					if (J.ie && J.win && typeof G.styleSheets != B && G.styleSheets.length > 0) da = G.styleSheets[G.styleSheets.length - 1];
					U = C
				}
				if (J.ie && J.win) da && typeof da.addRule == z && da.addRule(r, u);
				else da && typeof G.createTextNode != B && da.appendChild(G.createTextNode(r + " {" + u + "}"))
			}
		}
	}

	function x(r, u) {
		if (la) {
			u = u ? "visible" : "hidden";
			if (fa && v(r)) v(r).style.visibility = u;
			else p("#" + r, "visibility:" + u)
		}
	}

	function F(r) {
		return /[\\\"<>\.;]/.exec(r) !=
			null && typeof encodeURIComponent != B ? encodeURIComponent(r) : r
	}
	var B = "undefined",
		z = "object",
		L = "application/x-shockwave-flash",
		N = "SWFObjectExprInst",
		O = window,
		G = document,
		R = navigator,
		E = false,
		X = [e],
		W = [],
		Z = [],
		V = [],
		H, ia, ga, ca, fa = false,
		ha = false,
		da, U, la = true,
		J = function () {
			var r = typeof G.getElementById != B && typeof G.getElementsByTagName != B && typeof G.createElement != B,
				u = R.userAgent.toLowerCase(),
				C = R.platform.toLowerCase(),
				y = C ? /win/.test(C) : /win/.test(u);
			C = C ? /mac/.test(C) : /mac/.test(u);
			u = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,
				"$1")) : false;
			var A = !+"\u000b1",
				M = [0, 0, 0],
				K = null;
			if (typeof R.plugins != B && typeof R.plugins["Shockwave Flash"] == z) {
				if ((K = R.plugins["Shockwave Flash"].description) && !(typeof R.mimeTypes != B && R.mimeTypes[L] && !R.mimeTypes[L].enabledPlugin)) {
					E = true;
					A = false;
					K = K.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
					M[0] = parseInt(K.replace(/^(.*)\..*$/, "$1"), 10);
					M[1] = parseInt(K.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
					M[2] = /[a-zA-Z]/.test(K) ? parseInt(K.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
				}
			} else if (typeof O.ActiveXObject != B) try {
				var Q =
					new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				if (Q)
					if (K = Q.GetVariable("$version")) {
						A = true;
						K = K.split(" ")[1].split(",");
						M = [parseInt(K[0], 10), parseInt(K[1], 10), parseInt(K[2], 10)]
					}
			} catch (T) {}
			return {
				w3: r,
				pv: M,
				wk: u,
				ie: A,
				win: y,
				mac: C
			}
		}();
	(function () {
		if (J.w3) {
			if (typeof G.readyState != B && G.readyState == "complete" || typeof G.readyState == B && (G.getElementsByTagName("body")[0] || G.body)) b();
			if (!fa) {
				typeof G.addEventListener != B && G.addEventListener("DOMContentLoaded", b, false);
				if (J.ie && J.win) {
					G.attachEvent("onreadystatechange",
						function () {
							if (G.readyState == "complete") {
								G.detachEvent("onreadystatechange", arguments.callee);
								b()
							}
						});
					O == top && function () {
						if (!fa) {
							try {
								G.documentElement.doScroll("left")
							} catch (r) {
								setTimeout(arguments.callee, 0);
								return
							}
							b()
						}
					}()
				}
				J.wk && function () {
					fa || (/loaded|complete/.test(G.readyState) ? b() : setTimeout(arguments.callee, 0))
				}();
				d(b)
			}
		}
	})();
	(function () {
		J.ie && J.win && window.attachEvent("onunload", function () {
			for (var r = V.length, u = 0; u < r; u++) V[u][0].detachEvent(V[u][1], V[u][2]);
			r = Z.length;
			for (u = 0; u < r; u++) w(Z[u]);
			for (var C in J) J[C] =
				null;
			J = null;
			for (var y in swfobject) swfobject[y] = null;
			swfobject = null
		})
	})();
	return {
		registerObject: function (r, u, C, y) {
			if (J.w3 && r && u) {
				var A = {};
				A.id = r;
				A.swfVersion = u;
				A.expressInstall = C;
				A.callbackFn = y;
				W[W.length] = A;
				x(r, false)
			} else y && y({
				success: false,
				id: r
			})
		},
		getObjectById: function (r) {
			if (J.w3) return g(r)
		},
		embedSWF: function (r, u, C, y, A, M, K, Q, T, Y) {
			var ba = {
				success: false,
				id: u
			};
			if (J.w3 && !(J.wk && J.wk < 312) && r && u && C && y && A) {
				x(u, false);
				c(function () {
					C += "";
					y += "";
					var aa = {};
					if (T && typeof T === z)
						for (var ea in T) aa[ea] = T[ea];
					aa.data = r;
					aa.width = C;
					aa.height = y;
					ea = {};
					if (Q && typeof Q === z)
						for (var ja in Q) ea[ja] = Q[ja];
					if (K && typeof K === z)
						for (var ka in K)
							if (typeof ea.flashvars != B) ea.flashvars += "&" + ka + "=" + K[ka];
							else ea.flashvars = ka + "=" + K[ka];
					if (P(A)) {
						ja = o(aa, ea, u);
						aa.id == u && x(u, true);
						ba.success = true;
						ba.ref = ja
					} else if (M && l()) {
						aa.data = M;
						n(aa, ea, u, Y);
						return
					} else x(u, true);
					Y && Y(ba)
				})
			} else Y && Y(ba)
		},
		switchOffAutoHideShow: function () {
			la = false
		},
		ua: J,
		getFlashPlayerVersion: function () {
			return {
				major: J.pv[0],
				minor: J.pv[1],
				release: J.pv[2]
			}
		},
		hasFlashPlayerVersion: P,
		createSWF: function (r, u, C) {
			if (J.w3) return o(r, u, C)
		},
		showExpressInstall: function (r, u, C, y) {
			J.w3 && l() && n(r, u, C, y)
		},
		removeSWF: function (r) {
			J.w3 && w(r)
		},
		createCSS: function (r, u, C, y) {
			J.w3 && p(r, u, C, y)
		},
		addDomLoadEvent: c,
		addLoadEvent: d,
		getQueryParamValue: function (r) {
			var u = G.location.search || G.location.hash;
			if (u) {
				if (/\?/.test(u)) u = u.split("?")[1];
				if (r == null) return F(u);
				u = u.split("&");
				for (var C = 0; C < u.length; C++)
					if (u[C].substring(0, u[C].indexOf("=")) == r) return F(u[C].substring(u[C].indexOf("=") + 1))
			}
			return ""
		},
		expressInstallCallback: function () {
			if (ha) {
				var r =
					v(N);
				if (r && H) {
					r.parentNode.replaceChild(H, r);
					if (ia) {
						x(ia, true);
						if (J.ie && J.win) H.style.display = "block"
					}
					ga && ga(ca)
				}
				ha = false
			}
		}
	}
}();
(function () {
	var b = Math,
		c = function (p) {
			return p >> 0
		}, d = /webkit/i.test(navigator.appVersion) ? "webkit" : /firefox/i.test(navigator.userAgent) ? "Moz" : "opera" in window ? "O" : "";
	/android/gi.test(navigator.appVersion);
	var e = /iphone|ipad/gi.test(navigator.appVersion),
		f = /playbook/gi.test(navigator.appVersion),
		h = /hp-tablet/gi.test(navigator.appVersion),
		g = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix,
		l = "ontouchstart" in window && !h,
		n = d + "Transform" in document.documentElement.style,
		m = e || f,
		q = function () {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (p) {
					return setTimeout(p, 17)
			}
		}(),
		o = function () {
			return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
		}(),
		t = "onorientationchange" in window ? "orientationchange" : "resize",
		w = l ?
			"touchstart" : "mousedown",
		D = l ? "touchmove" : "mousemove",
		v = l ? "touchend" : "mouseup",
		I = l ? "touchcancel" : "mouseup",
		S = "translate" + (g ? "3d(" : "("),
		P = g ? ",0)" : ")";
	e = function (p, x) {
		var F = document,
			B;
		this.wrapper = typeof p == "object" ? p : F.getElementById(p);
		this.wrapper.style.overflow = "hidden";
		this.scroller = this.wrapper.children[0];
		this.options = {
			hScroll: true,
			vScroll: true,
			x: 0,
			y: 0,
			bounce: true,
			bounceLock: false,
			momentum: true,
			lockDirection: true,
			useTransform: true,
			useTransition: false,
			onRefresh: null,
			onBeforeScrollStart: function (z) {
				z.preventDefault()
			},
			onScrollStart: null,
			onBeforeScrollMove: null,
			onScrollMove: null,
			onBeforeScrollEnd: null,
			onScrollEnd: null,
			onTouchEnd: null,
			onDestroy: null
		};
		for (B in x) this.options[B] = x[B];
		this.x = this.options.x;
		this.y = this.options.y;
		this.options.useTransform = n ? this.options.useTransform : false;
		this.options.hScrollbar = this.options.hScroll && this.options.hScrollbar;
		this.options.vScrollbar = this.options.vScroll && this.options.vScrollbar;
		this.options.useTransition = m && this.options.useTransition;
		this.scroller.style[d + "TransitionProperty"] =
			this.options.useTransform ? "-" + d.toLowerCase() + "-transform" : "top left";
		this.scroller.style[d + "TransitionDuration"] = "0";
		this.scroller.style[d + "TransformOrigin"] = "0 0";
		if (this.options.useTransition) this.scroller.style[d + "TransitionTimingFunction"] = "cubic-bezier(0.33,0.66,0.66,1)";
		if (this.options.useTransform) this.scroller.style[d + "Transform"] = S + this.x + "px," + this.y + "px" + P;
		else this.scroller.style.cssText += ";position:absolute;top:" + this.y + "px;left:" + this.x + "px";
		this.refresh();
		this._bind(t, window);
		this._bind(w);
		l || this._bind("mouseout", this.wrapper)
	};
	e.prototype = {
		enabled: true,
		x: 0,
		y: 0,
		steps: [],
		scale: 1,
		handleEvent: function (p) {
			switch (p.type) {
			case w:
				if (!l && p.button !== 0) return;
				this._start(p);
				break;
			case D:
				this._move(p);
				break;
			case v:
			case I:
				this._end(p);
				break;
			case t:
				this._resize();
				break;
			case "mouseout":
				this._mouseout(p);
				break;
			case "webkitTransitionEnd":
				this._transitionEnd(p);
				break
			}
		},
		_resize: function () {
			this.refresh()
		},
		_pos: function (p, x) {
			p = this.hScroll ? p : 0;
			x = this.vScroll ? x : 0;
			if (this.options.useTransform) this.scroller.style[d +
				"Transform"] = S + p + "px," + x + "px" + P + " scale(" + this.scale + ")";
			else {
				p = c(p);
				x = c(x);
				this.scroller.style.left = p + "px";
				this.scroller.style.top = x + "px"
			}
			this.x = p;
			this.y = x
		},
		_start: function (p) {
			var x = l ? p.touches[0] : p,
				F, B;
			if (this.enabled) {
				this.options.onBeforeScrollStart && this.options.onBeforeScrollStart.call(this, p);
				this.options.useTransition && this._transitionTime(0);
				this.zoomed = this.animating = this.moved = false;
				this.dirY = this.dirX = this.absDistY = this.absDistX = this.distY = this.distX = 0;
				if (this.options.momentum) {
					if (this.options.useTransform) {
						F =
							getComputedStyle(this.scroller, null)[d + "Transform"].replace(/[^0-9-.,]/g, "").split(",");
						B = F[4] * 1;
						F = F[5] * 1
					} else {
						B = getComputedStyle(this.scroller, null).left.replace(/[^0-9-]/g, "") * 1;
						F = getComputedStyle(this.scroller, null).top.replace(/[^0-9-]/g, "") * 1
					} if (B != this.x || F != this.y) {
						this.options.useTransition ? this._unbind("webkitTransitionEnd") : o(this.aniTime);
						this.steps = [];
						this._pos(B, F)
					}
				}
				this.startX = this.x;
				this.startY = this.y;
				this.pointX = x.pageX;
				this.pointY = x.pageY;
				this.startTime = p.timeStamp || Date.now();
				this.options.onScrollStart &&
					this.options.onScrollStart.call(this, p);
				this._bind(D);
				this._bind(v);
				this._bind(I)
			}
		},
		_move: function (p) {
			var x = l ? p.touches[0] : p,
				F = x.pageX - this.pointX,
				B = x.pageY - this.pointY,
				z = this.x + F,
				L = this.y + B,
				N = p.timeStamp || Date.now();
			this.options.onBeforeScrollMove && this.options.onBeforeScrollMove.call(this, p);
			this.pointX = x.pageX;
			this.pointY = x.pageY;
			if (z > 0 || z < this.maxScrollX) z = this.options.bounce ? this.x + F / 2 : z >= 0 || this.maxScrollX >= 0 ? 0 : this.maxScrollX;
			if (L > 0 || L < this.maxScrollY) L = this.options.bounce ? this.y + B / 2 : L >= 0 ||
				this.maxScrollY >= 0 ? 0 : this.maxScrollY;
			this.distX += F;
			this.distY += B;
			this.absDistX = b.abs(this.distX);
			this.absDistY = b.abs(this.distY);
			if (!(this.absDistX < 6 && this.absDistY < 6)) {
				if (this.options.lockDirection)
					if (this.absDistX > this.absDistY + 5) {
						L = this.y;
						B = 0
					} else if (this.absDistY > this.absDistX + 5) {
					z = this.x;
					F = 0
				}
				this.moved = true;
				this._pos(z, L);
				this.dirX = F > 0 ? -1 : F < 0 ? 1 : 0;
				this.dirY = B > 0 ? -1 : B < 0 ? 1 : 0;
				if (N - this.startTime > 300) {
					this.startTime = N;
					this.startX = this.x;
					this.startY = this.y
				}
				this.options.onScrollMove && this.options.onScrollMove.call(this,
					p)
			}
		},
		_end: function (p) {
			if (!(l && p.touches.length != 0)) {
				var x = l ? p.changedTouches[0] : p,
					F, B, z = {
						dist: 0,
						time: 0
					}, L = {
						dist: 0,
						time: 0
					}, N = (p.timeStamp || Date.now()) - this.startTime;
				F = this.x;
				B = this.y;
				this._unbind(D);
				this._unbind(v);
				this._unbind(I);
				this.options.onBeforeScrollEnd && this.options.onBeforeScrollEnd.call(this, p);
				if (this.moved) {
					if (N < 300 && this.options.momentum) {
						z = F ? this._momentum(F - this.startX, N, -this.x, this.scrollerW - this.wrapperW + this.x, this.options.bounce ? this.wrapperW : 0) : z;
						L = B ? this._momentum(B - this.startY,
							N, -this.y, this.maxScrollY < 0 ? this.scrollerH - this.wrapperH + this.y : 0, this.options.bounce ? this.wrapperH : 0) : L;
						F = this.x + z.dist;
						B = this.y + L.dist;
						if (this.x > 0 && F > 0 || this.x < this.maxScrollX && F < this.maxScrollX) z = {
							dist: 0,
							time: 0
						};
						if (this.y > 0 && B > 0 || this.y < this.maxScrollY && B < this.maxScrollY) L = {
							dist: 0,
							time: 0
						}
					}
					if (z.dist || L.dist) {
						x = b.max(b.max(z.time, L.time), 10);
						this.scrollTo(c(F), c(B), x)
					} else this._resetPos(200)
				} else {
					if (l) {
						for (F = x.target; F.nodeType != 1;) F = F.parentNode;
						if (F.tagName != "SELECT" && F.tagName != "INPUT" && F.tagName !=
							"TEXTAREA") {
							B = document.createEvent("MouseEvents");
							B.initMouseEvent("click", true, true, p.view, 1, x.screenX, x.screenY, x.clientX, x.clientY, p.ctrlKey, p.altKey, p.shiftKey, p.metaKey, 0, null);
							B._fake = true;
							F.dispatchEvent(B)
						}
					}
					this._resetPos(200)
				}
				this.options.onTouchEnd && this.options.onTouchEnd.call(this, p)
			}
		},
		_resetPos: function (p) {
			var x = this.x >= 0 ? 0 : this.x < this.maxScrollX ? this.maxScrollX : this.x,
				F = this.y >= 0 || this.maxScrollY > 0 ? 0 : this.y < this.maxScrollY ? this.maxScrollY : this.y;
			if (x == this.x && F == this.y) {
				if (this.moved) {
					this.options.onScrollEnd &&
						this.options.onScrollEnd.call(this);
					this.moved = false
				}
			} else this.scrollTo(x, F, p || 0)
		},
		_mouseout: function (p) {
			var x = p.relatedTarget;
			if (x)
				for (; x = x.parentNode;)
					if (x == this.wrapper) return;
			this._end(p)
		},
		_transitionEnd: function (p) {
			if (p.target == this.scroller) {
				this._unbind("webkitTransitionEnd");
				this._startAni()
			}
		},
		_startAni: function () {
			var p = this,
				x = p.x,
				F = p.y,
				B = Date.now(),
				z, L, N;
			if (!p.animating)
				if (p.steps.length) {
					z = p.steps.shift();
					if (z.x == x && z.y == F) z.time = 0;
					p.animating = true;
					p.moved = true;
					if (p.options.useTransition) {
						p._transitionTime(z.time);
						p._pos(z.x, z.y);
						p.animating = false;
						z.time ? p._bind("webkitTransitionEnd") : p._resetPos(0)
					} else {
						N = function () {
							var O = Date.now();
							if (O >= B + z.time) {
								p._pos(z.x, z.y);
								p.animating = false;
								p.options.onAnimationEnd && p.options.onAnimationEnd.call(p);
								p._startAni()
							} else {
								O = (O - B) / z.time - 1;
								L = b.sqrt(1 - O * O);
								O = (z.x - x) * L + x;
								p._pos(O, (z.y - F) * L + F);
								if (p.animating) p.aniTime = q(N)
							}
						};
						N()
					}
				} else p._resetPos(400)
		},
		_transitionTime: function (p) {
			this.scroller.style[d + "TransitionDuration"] = p + "ms"
		},
		_momentum: function (p, x, F, B, z) {
			x = b.abs(p) / x;
			var L = x * x / 0.0012,
				N = 0;
			N = 0;
			if (p > 0 && L > F) {
				N = z / (6 / (L / x * 6.0E-4));
				F += N;
				x = x * F / L;
				L = F
			} else if (p < 0 && L > B) {
				N = z / (6 / (L / x * 6.0E-4));
				B += N;
				x = x * B / L;
				L = B
			}
			L *= p < 0 ? -1 : 1;
			N = x / 6.0E-4;
			return {
				dist: L,
				time: c(N)
			}
		},
		_offset: function (p) {
			for (var x = -p.offsetLeft, F = -p.offsetTop; p = p.offsetParent;) {
				x -= p.offsetLeft;
				F -= p.offsetTop
			}
			return {
				left: x,
				top: F
			}
		},
		_bind: function (p, x, F) {
			(x || this.scroller).addEventListener(p, this, !! F)
		},
		_unbind: function (p, x, F) {
			(x || this.scroller).removeEventListener(p, this, !! F)
		},
		destroy: function () {
			this.scroller.style[d + "Transform"] =
				"";
			this._unbind(t, window);
			this._unbind(w);
			this._unbind(D);
			this._unbind(v);
			this._unbind(I);
			this._unbind("mouseout", this.wrapper);
			this.options.useTransition && this._unbind("webkitTransitionEnd");
			this.options.onDestroy && this.options.onDestroy.call(this)
		},
		refresh: function () {
			var p;
			this.wrapperW = this.wrapper.clientWidth;
			this.wrapperH = this.wrapper.clientHeight;
			this.scrollerW = this.scroller.offsetWidth;
			this.scrollerH = this.scroller.offsetHeight;
			this.maxScrollX = this.wrapperW - this.scrollerW;
			this.maxScrollY = this.wrapperH -
				this.scrollerH;
			this.dirY = this.dirX = 0;
			this.hScroll = this.options.hScroll && this.maxScrollX < 0;
			this.vScroll = this.options.vScroll && (!this.options.bounceLock && !this.hScroll || this.scrollerH > this.wrapperH);
			p = this._offset(this.wrapper);
			this.wrapperOffsetLeft = -p.left;
			this.wrapperOffsetTop = -p.top;
			this.scroller.style[d + "TransitionDuration"] = "0";
			this._resetPos(200)
		},
		scrollTo: function (p, x, F, B) {
			var z = p;
			this.stop();
			z.length || (z = [{
				x: p,
				y: x,
				time: F,
				relative: B
			}]);
			p = 0;
			for (x = z.length; p < x; p++) {
				if (z[p].relative) {
					z[p].x = this.x -
						z[p].x;
					z[p].y = this.y - z[p].y
				}
				this.steps.push({
					x: z[p].x,
					y: z[p].y,
					time: z[p].time || 0
				})
			}
			this._startAni()
		},
		scrollToElement: function (p, x) {
			if (p = p.nodeType ? p : this.scroller.querySelector(p)) {
				p = this._offset(p);
				p.left += this.wrapperOffsetLeft;
				p.top += this.wrapperOffsetTop;
				p.left = p.left > 0 ? 0 : p.left < this.maxScrollX ? this.maxScrollX : p.left;
				p.top = p.top > 0 ? 0 : p.top < this.maxScrollY ? this.maxScrollY : p.top;
				x = x === undefined ? b.max(b.abs(p.left) * 2, b.abs(p.top) * 2) : x;
				this.scrollTo(p.left, p.top, x)
			}
		},
		disable: function () {
			this.stop();
			this._resetPos(0);
			this.enabled = false;
			this._unbind(D);
			this._unbind(v);
			this._unbind(I)
		},
		enable: function () {
			this.enabled = true
		},
		stop: function () {
			o(this.aniTime);
			this.steps = [];
			this.animating = this.moved = false
		}
	};
	if (typeof exports !== "undefined") exports.iScroll = e;
	else window.iScroll = e
})();
if (typeof XML == "undefined") XML = function () {};
XML.ObjTree = function () {
	return this
};
XML.ObjTree.VERSION = "0.24";
a = XML.ObjTree.prototype;
a.xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n';
a.attr_prefix = "-";
a.overrideMimeType = "text/xml";
a.parseXML = function (b) {
	var c;
	if (window.DOMParser) {
		c = new DOMParser;
		b = c.parseFromString(b, "application/xml");
		if (!b) return;
		c = b.documentElement
	} else if (window.ActiveXObject) {
		c = new ActiveXObject("Microsoft.XMLDOM");
		c.async = false;
		c.loadXML(b);
		c = c.documentElement
	}
	if (c) return this.parseDOM(c)
};
a.parseHTTP = function (b, c, d) {
	var e = {};
	for (var f in c) e[f] = c[f];
	if (!e.method) e.method = typeof e.postBody == "undefined" && typeof e.postbody == "undefined" && typeof e.parameters == "undefined" ? "get" : "post";
	if (d) {
		e.asynchronous = true;
		var h = this,
			g = e.onComplete;
		e.onComplete = function (n) {
			var m;
			if (n && n.responseXML && n.responseXML.documentElement) m = h.parseDOM(n.responseXML.documentElement);
			else if (n && n.responseText) m = h.parseXML(n.responseText);
			d(m, n);
			g && g(n)
		}
	} else e.asynchronous = false;
	var l;
	if (typeof HTTP != "undefined" &&
		HTTP.Request) {
		e.uri = b;
		if (b = new HTTP.Request(e)) l = b.transport
	} else if (typeof Ajax != "undefined" && Ajax.Request)
		if (b = new Ajax.Request(b, e)) l = b.transport;
	if (d) return l;
	if (l && l.responseXML && l.responseXML.documentElement) return this.parseDOM(l.responseXML.documentElement);
	else if (l && l.responseText) return this.parseXML(l.responseText)
};
a.parseDOM = function (b) {
	if (b) {
		this.__force_array = {};
		if (this.force_array)
			for (var c = 0; c < this.force_array.length; c++) this.__force_array[this.force_array[c]] = 1;
		c = this.parseElement(b);
		if (this.__force_array[b.nodeName]) c = [c];
		if (b.nodeType != 11) {
			var d = {};
			d[b.nodeName] = c;
			c = d
		}
		return c
	}
};
a.parseElement = function (b) {
	if (b.nodeType != 7) {
		if (b.nodeType == 3 || b.nodeType == 4) {
			if (b.nodeValue.match(/[^\x00-\x20]/) == null) return;
			return b.nodeValue
		}
		var c, d = {};
		if (b.attributes && b.attributes.length) {
			c = {};
			for (var e = 0; e < b.attributes.length; e++) {
				var f = b.attributes[e].nodeName;
				if (typeof f == "string") {
					var h = b.attributes[e].nodeValue;
					if (h) {
						f = this.attr_prefix + f;
						if (typeof d[f] == "undefined") d[f] = 0;
						d[f]++;
						this.addNode(c, f, d[f], h)
					}
				}
			}
		}
		if (b.childNodes && b.childNodes.length) {
			f = true;
			if (c) f = false;
			for (e = 0; e < b.childNodes.length &&
				f; e++) {
				h = b.childNodes[e].nodeType;
				h == 3 || h == 4 || (f = false)
			}
			if (f) {
				c || (c = "");
				for (e = 0; e < b.childNodes.length; e++) c += b.childNodes[e].nodeValue
			} else {
				c || (c = {});
				for (e = 0; e < b.childNodes.length; e++) {
					f = b.childNodes[e].nodeName;
					if (typeof f == "string")
						if (h = this.parseElement(b.childNodes[e])) {
							if (typeof d[f] == "undefined") d[f] = 0;
							d[f]++;
							this.addNode(c, f, d[f], h)
						}
				}
			}
		}
		return c
	}
};
a.addNode = function (b, c, d, e) {
	if (this.__force_array[c]) {
		if (d == 1) b[c] = [];
		b[c][b[c].length] = e
	} else if (d == 1) b[c] = e;
	else if (d == 2) b[c] = [b[c], e];
	else b[c][b[c].length] = e
};
a.writeXML = function (b) {
	return this.xmlDecl + this.hash_to_xml(null, b)
};
a.hash_to_xml = function (b, c) {
	var d = [],
		e = [];
	for (var f in c)
		if (c.hasOwnProperty(f)) {
			var h = c[f];
			if (f.charAt(0) != this.attr_prefix) d[d.length] = typeof h == "undefined" || h == null ? "<" + f + " />" : typeof h == "object" && h.constructor == Array ? this.array_to_xml(f, h) : typeof h == "object" ? this.hash_to_xml(f, h) : this.scalar_to_xml(f, h);
			else e[e.length] = " " + f.substring(1) + '="' + this.xml_escape(h) + '"'
		}
	c = e.join("");
	e = d.join("");
	typeof b == "undefined" || b == null || (e = d.length > 0 ? e.match(/\n/) ? "<" + b + c + ">\n" + e + "</" + b + ">\n" : "<" + b + c + ">" + e +
		"</" + b + ">\n" : "<" + b + c + " />\n");
	return e
};
a.array_to_xml = function (b, c) {
	for (var d = [], e = 0; e < c.length; e++) {
		var f = c[e];
		d[d.length] = typeof f == "undefined" || f == null ? "<" + b + " />" : typeof f == "object" && f.constructor == Array ? this.array_to_xml(b, f) : typeof f == "object" ? this.hash_to_xml(b, f) : this.scalar_to_xml(b, f)
	}
	return d.join("")
};
a.scalar_to_xml = function (b, c) {
	return b == "#text" ? this.xml_escape(c) : "<" + b + ">" + this.xml_escape(c) + "</" + b + ">\n"
};
a.xml_escape = function (b) {
	return String(b).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
};
var ApplicationState = {
	startUpPageState: undefined,
	StartUpInitiatorSubSessionID: undefined,
	bonus: null,
	machineID: null
};
ApplicationState.readBonus = function (b) {
	if (typeof b === "undefined" || b === null) b = ApplicationState.bonus;
	var c = {};
	if (b !== null) c = JSON.parse(b);
	return c
};
ApplicationState.writeBonus = function (b) {
	ApplicationState.bonus = JSON.stringify(b)
};
ApplicationState.readStartUpPageState = function () {
	return ApplicationState.startUpPageState
};
ApplicationState.writeStartUpPageState = function (b) {
	ApplicationState.startUpPageState = b
};
ApplicationState.readStartUpInitiatorSubSessionID = function () {
	return ApplicationState.StartUpInitiatorSubSessionID
};
ApplicationState.writeStartUpInitiatorSubSessionID = function (b) {
	ApplicationState.StartUpInitiatorSubSessionID = b
};
ApplicationState.writeMachineID = function (b) {
	ApplicationState.MachineID = b
};

function writeStartUpPageStateCookie(b) {
	ApplicationState.writeStartUpPageState(b);
	$.cookie(appCookies.StartUpPageState, EStartUpPageStateToString(b), {
		expires: 3650,
		path: "/"
	})
}

function readMachineIDCookie() {
	var b = $.cookie(appCookies.MachineID);
	if (b === null) {
		b = "";
		for (var c = 0; c < 32; c++) b += "0123456789abcdef".charAt(Math.floor(Math.random() * 16));
		$.cookie(appCookies.MachineID, b, {
			expires: 5475,
			path: "/"
		})
	}
	return b
}

function readStartUpPageStateCookie() {
	var b = $.cookie(appCookies.StartUpPageState);
	if (b !== null) b = StringToEStartUpPageState(b);
	return b
}

function readBonusCookie() {
	return ApplicationState.readBonus($.cookie(appCookies.Bonus))
}

function clearStartUpPageStateCookie() {
	$.cookie(appCookies.StartUpPageState, null, {
		expires: 3650,
		path: "/"
	});
	$.cookie(appCookies.StartUpInitiatorSubSessionID, null, {
		expires: 3650,
		path: "/"
	})
}

function setBonusCookies(b) {
	$.cookie(appCookies.Bonus, b, {
		expires: 3650,
		path: "/"
	})
}

function clearBonusCookies() {
	$.cookie(appCookies.Bonus, null, {
		expires: 3650,
		path: "/"
	})
}

function writeStartUpInitiatorSubSessionIDToCookie(b) {
	$.cookie(appCookies.StartUpInitiatorSubSessionID, b, {
		expires: 3650,
		path: "/"
	})
}

function readStartUpInitiatorSubSessionIDFromCookie() {
	return $.cookie(appCookies.StartUpInitiatorSubSessionID)
}

function writeSubSeesionIDToCookie() {
	var b;
	if (readIsRealModeToCookie() === null) writeStartUpInitiatorSubSessionIDToCookie(null);
	else {
		b = readIsRealModeToCookie().toLowerCase() === "true" ? pageSubSessionID : null;
		writeStartUpInitiatorSubSessionIDToCookie(b)
	}
}

function readApplicationStateCookies() {
	ApplicationState.writeStartUpInitiatorSubSessionID(readStartUpInitiatorSubSessionIDFromCookie());
	ApplicationState.writeStartUpPageState(readStartUpPageStateCookie());
	ApplicationState.writeBonus(readBonusCookie());
	ApplicationState.writeMachineID(readMachineIDCookie());
	clearBonusDetailsFromCookies()
}

function clearBonusDetailsFromCookies() {
	clearStartUpPageStateCookie();
	clearBonusCookies()
}

function readPasswordCookie() {
	var b = $.cookie(appCookies.Password),
		c = $.cookie(appCookies.PasswordHidden);
	if (b === null) return null;
	if (c === null) savePasswordCookie(b, true);
	else b = Base64.decode(b); if (!CheckPassword(b, true)) return null;
	return b
}

function savePasswordCookie(b, c) {
	var d = {
		path: "/",
		secure: StringToEDeployEnvironemntType(LangJSDict.jsDeployEnv) != EDeployEnvironemnt.Local
	};
	if (c) d.expires = 3650;
	b = Base64.encode(b);
	$.cookie(appCookies.Password, b, d);
	$.cookie(appCookies.PasswordHidden, "1", d);
	$.cookie(appCookies.PasswordDontPersist, c ? null : "1", d)
}
var appCookies = {
	BackendServerSessionID: "BackendServerSessionID",
	UserName: "UserName",
	RegisterNewUserName: "RegisterNewUserName",
	Password: "Password",
	PasswordHidden: "PasswordHidden",
	PasswordDontPersist: "PasswordDontPersist",
	IsRealMode: "IsRealMode",
	ReferralID: "ReferralID",
	ReferralTags: "ReferralTags",
	ReferralPlainType: "ReferralPlainType",
	RefererUrl: "RefererUrl",
	RefererDesktopDownloadID: "DesktopDownloadID",
	RefererEncryptedUserID: "RefererEncryptedUserID",
	Lang2CharsCode: "Lang2CharsCode",
	DebugBtnsTestArea: "DebugBtnsTestArea",
	StartUpPageState: "StartUpPageState",
	StartUpInitiatorSubSessionID: "StartUpInitiatorSubSessionID",
	Bonus: "Bonus",
	MachineID: "MachineID",
	GraphSettings: "GraphSettings",
	ConfirmShortDoesntCloseLongPos: "ConfirmShortDoesntCloseLongPos",
	ChoseAccountModeActively: "ChoseAccountModeActively",
	LastInstrument: "LastInstrument",
	LastCategory: "LastCategory",
	PreparingForPublish: "PreparingForPublish"
};

function writeIsRealModeToCookie(b) {
	$.cookie(appCookies.IsRealMode, b, {
		expires: 3650,
		path: "/"
	})
}

function readIsRealModeToCookie() {
	return $.cookie(appCookies.IsRealMode)
}

function writeBackendServerSessionID(b) {
	$.cookie(appCookies.BackendServerSessionID, b, {
		expires: 0.006944,
		path: "/"
	})
}

function readBackendServerSessionID() {
	return $.cookie(appCookies.BackendServerSessionID)
}
var cometSessID, cometSubSessID, cometRespFunc, cometErrorFunc, cometTimeInMSBetweenRequests, activeTimoutID = 0,
	firstCometRequest = true,
	loggedOut = false,
	cometRetriesCount = 0;

function InitComet(b, c, d, e, f) {
	cometSessID = b;
	cometSubSessID = c;
	cometTimeInMSBetweenRequests = d;
	cometRespFunc = e;
	cometErrorFunc = f;
	CometRequest()
}

function StopCometRequest() {
	loggedOut = true
}

function CometOnError(b, c, d) {
	if (!loggedOut) {
		cometRetriesCount++;
		cometRetriesCount >= 3 ? cometErrorFunc() : setTimeout("CometRequest()", 5E3)
	}
}

function CometRequest() {
	if (!loggedOut) {
		if (userLogToSend !== null) {
			var b = userLogToSend;
			userLogToSend = null;
			SEND_userLog(new UserLog(b))
		}
		b = {
			sessID: cometSessID,
			subSessID: cometSubSessID
		};
		if (firstCometRequest) {
			firstCometRequest = false;
			b.firstCometRequest = true
		}
		$.ajax({
			url: "/CometAsyncHandler.ashx",
			type: "POST",
			data: b,
			dataType: "json",
			timeout: 6E4,
			success: function (c) {
				if (c !== null) {
					cometRetriesCount = 0;
					if (c.length < 1 || c[0].Type !== 0) cometRespFunc(c);
					if (cometTimeInMSBetweenRequests > 0) {
						c = (Math.random() * 0.4 + 0.8) * cometTimeInMSBetweenRequests;
						c = parseInt(c, 10);
						setTimeout("CometRequest()", c)
					} else CometRequest()
				} else CometOnError()
			},
			error: CometOnError
		})
	}
}
var GC = {
	NIL_DATEVALUE: "1900-01-01 00:00:00.000",
	NIL_NUMBER: -1,
	BACKGROUND_TIME_OUT_IN_SECONDS: 480,
	TI_CHANGE_COLUMN_IND: 7,
	SEC_IN_24_HOURS: 86400,
	SEC_IN_YEAR: 31536E3,
	NAME_MIN_LENGTH: 2,
	NAME_MAX_LENGTH: 18,
	LAST_NAME_MIN_LENGTH: 2,
	LAST_NAME_MAX_LENGTH: 40,
	PHONE_MIN_LENGTH: 6,
	PHONE_MAX_LENGTH: 30,
	STREET_MIN_LENGTH: 2,
	MAX_LENGTH: 50,
	VALIDATION_CODE_MIN_MAX: 3,
	CC_AMOUNT_MIN: 3,
	CC_AMOUNT_MAX: 4,
	MB_AMOUNT_MIN: 3,
	MB_AMOUNT_MAX: 4,
	OTHER_AMOUNT_MIN: 3,
	OTHER_AMOUNT_MAX: 4,
	PAYPAL_AMOUNT_MIN: 3,
	PAYPAL_AMOUNT_MAX: 4,
	WITHDRAW_BANK_DRAFT_AMOUNT_MIN: 3,
	WITHDRAW_BANK_DRAFT_AMOUNT_MAX: 4,
	WITHDRAW_AMOUNT_MIN_LENGTH: 1,
	WITHDRAW_WIRE_BANK_ACCOUNT_NUMBER_MIN_LENGTH: 4,
	WITHDRAW_WIRE_BANK_NAME_MIN_LENGTH: 3,
	WITHDRAW_WIRE_BANK_CODE_MIN_LENGTH: 2,
	WITHDRAW_WIRE_COUNTRY_MIN_LENGTH: 2,
	WITHDRAW_MB_AMOUNT_MIN: 3,
	WITHDRAW_MB_AMOUNT_MAX: 4,
	WITHDRAW_PAYPAL_AMOUNT_MIN: 3,
	WITHDRAW_PAYPAL_AMOUNT_MAX: 4,
	PASSWORD_LENGTH_MIN: 6,
	PASSWORD_LENGTH_MAX: 12,
	PASSWORD_FORMAT_REGEXP: /^[\w\.]*$/i,
	PASSWORD_TOO_EASY: /1234/i,
	VISA_LENGTH_MIN: 13,
	VISA_LENGTH_MAX: 16,
	AMEX_LENGTH_MIN_MAX: 15,
	MASTERCARD_LENGTH_MIN_MAX: 16,
	DINERS_LENGTH_MIN_MAX: 14,
	ENROUTE_LENGTH_MIN_MAX: 15,
	DISCOVER_LENGTH_MIN_MAX: 16,
	JCB1_LENGTH_MIN_MAX: 16,
	JCB2_LENGTH_MIN_MAX: 15,
	EMPTY_STRING: "",
	EPS: 1.0E-7,
	PRICE_ACCURACY: 2,
	FRACTION_PERCENT_ACCURACY: 4,
	STD_PERCENT_ACCURACY: 2,
	IPAD_SCROLL_NOTIFICATION_DURATION: 15E3,
	EMAIL: {
		MIN_LENGTH: 6,
		MAX_LENGTH: 80,
		ASCII_CHARS_ONLY: /^[\x20-\x7E]+$/,
		REG_EXP: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
		DOUBLE_DOT_REG_EXP: /\.\./i
	},
	NON_ALPHANUM_CHARS_REG_EXP: /^(\s|[&!\)\(\*\^\+\-%\$#@~`;\?\.\\])*$/i,
	NAME_FAIL_REG_EXP: /((^(\s)+.*$)|(.*(\s)+$))/i,
	PASSWORD_REG_EXP: /^[\w\d\-\.][\w\d\-\.]*[\w\d\-\.]$/,
	DIGITS_REG_EXP: /[0-9]*/,
	ALPHANUMERIC: /(\w)/,
	NON_ALPHANUMERIC: /(\W)/,
	NUMERIC: /[0-9]/,
	ZIP_CITY_REG_EXP: /^[A-Za-z0-9][A-Za-z0-9\s\-]*[A-Za-z0-9]$/,
	STREET_REG_EXP: /^[A-Za-z0-9][A-Za-z0-9\s\-\,\''\`\/\.#]*[A-Za-z0-9]$/,
	VISA_REG_EXP: /^4/,
	AMEX_REG_EXP: /^(34|37)/,
	MASTERCARD_REG_EXP: /^(51|52|53|54|55)/,
	DINERS_REG_EXP: /^(300|301|302|303|304|305|36|38)/,
	ENROUTE_REG_EXP: /^(2014|2149)/,
	DISCOVER_REG_EXP: /^(6011)/,
	JCB1_REG_EXP: /^(3)/,
	JCB2_REG_EXP: /^(2131|1800)/,
	ALTERNATIVE_TO_MB: {
		IDeal: "IDL",
		Giropay: "GIR",
		ING: null,
		NordeaEMaksu: "SO2",
		NordeaEBetalingDenmark: null,
		NordeaEBetalingSweden: "EBT",
		ENets: "ENT",
		BPay: null,
		Sofortuberweisung: "SFT",
		OnlineUberweisung: null,
		ECard: null,
		WesternUnion: null
	},
	MB_TO_ALTERNATIVE: {
		IDL: "IDeal",
		GIR: "Giropay",
		SO2: "NordeaEMaksu",
		EBT: "NordeaEBetalingSweden",
		ENT: "ENets",
		SFT: "Sofortuberweisung"
	},
	TRACKING: {
		REFERRAL_ENCUID_QS: "ru",
		REFERRAL_ID_QS: "id",
		REFERRAL_TAGS_QS: "tags",
		REFERRAL_PL_QS: "pl",
		REFERRAL_URL_QS: "refurl",
		REFERRAL_DOWNLOADID_QS: "did"
	},
	ADDRESS_VERIFICATION_CODE_LENGTH: 3,
	ERROR_INSTRUMENT_ID: "InstrumentID isn't valid",
	FIELD_ERR_CLASS: "ui-field-error",
	OTHER_TAB_HEADER_MAXLEN: 12,
	CP_DEFAULT_DAYS_BACK: 14,
	CONFIG_MIN_MILISECONDS_BETWEEN_SET_CONFIG: 6E4,
	TAB_CHANGED: "tab_changed",
	ALERT_EXPIRY_DISTANCE_SECONDS: 7776E3
}, PRECACHED_IMAGES = ["/Content/Images/Error_dialoge_Icons.gif", "/Content/Images/Loading.gif", "/Content/Images/StandardButton_Right.png",
		"/Content/Images/StandardButton_Left.png"
	],
	GeneralUI = {
		TI_HighLowSeparationChar: "/",
		RightToLeftLanguage: false,
		LogoutReconnectWidth: 400,
		BuySellFormWidth: 385,
		BuySellFormHeight: 380,
		BuySellFormAdvancedHeight: 500,
		ClosePositionFormWidth: 250,
		AccountRegistrationWidth: 725,
		AccountRegistrationHeight: 607,
		AccountHistoryWidth: 700,
		AccountHistoryHeight: 500,
		FacebookPostDialogWidth: 400,
		FSAAccountRegistrationHeight: 635,
		ForgotYourPasswordWidth: 416,
		ForgotYourPasswordHeight: 260,
		FundsManagementWidth: 689,
		FundsManagementHeight: 520,
		ChallengeJoinDialogWidth: 350,
		ChangePasswordDialogWidth: 350,
		EmailValidationDialogWidth: 470,
		ErrorFormWidth: 300,
		PhoneValidationDialogWidth: 550,
		AddressValidationDialogWidth: 700,
		NotificationsDialogWidth: 260,
		FavoritesWidth: 535,
		FavoritesHeight: 250,
		DepositeWidth: 753,
		DepositeHeight: 500,
		WithdrawWidth: 755,
		WithdrawHeight: 610,
		DetailsWidth: 550,
		DetailsHeight: 280,
		AlertWidth: 320,
		BonusAccountWidth: 700,
		BonusAccountHeight: 500,
		ProcessLoginPosition: ["center", 263],
		ProcessWidth: 200,
		ProcessWidthLong: 320,
		ProgressBarWidth: 255,
		ReportsHeight: 260,
		ReportsWidth: 630,
		PriceAlertsWidth: 300,
		PriceAlertsHeight: 210,
		PriceAlertsListWidth: 500,
		SetupIndicatorsWidth: 753,
		AlertMultipleChoiceWidth: 337,
		MaxConcurrentAlerts: 5
	};
$(document).ready(function () {
	$(".question-mark-img").tooltip();
	$("a.tbl-button").click(function () {
		this.blur();
		return false
	});
	$("a.small-tbl-button").click(function () {
		this.blur();
		return false
	});
	$("a.submit-anchor").click(function () {
		var b = jQuery.Event("before_submit");
		$(this).trigger(b);
		b.isDefaultPrevented() || $("form").submit();
		return false
	})
});

function writeLang2CharsCodeCookie(b) {
	$.cookie(appCookies.Lang2CharsCode, b, {
		expires: 3650,
		path: "/"
	})
}
var precached_images_objects = [];
$(document).ready(function () {
	$("#dropDownLanguages").change(function () {
		writeLang2CharsCodeCookie($(this).children("option:selected").val());
		this.form.submit()
	});
	for (var b = 0; b < PRECACHED_IMAGES.length; b++) {
		var c = document.createElement("img");
		c.src = PRECACHED_IMAGES[b];
		precached_images_objects.push(c)
	}
});
var $bonusLink, selectMenu;

function initalizeWebAppMasterFromCookies() {
	if ($.cookie(appCookies.DebugBtnsTestArea) == "show") {
		$("#session_id").removeClass("display-none-class");
		$("#button_test_area").removeClass("display-none-class")
	} else {
		$("#session_id").addClass("display-none-class");
		$("#button_test_area").addClass("display-none-class")
	}
	showButtonIfGalitEnter()
}
var selectMenuOptions = {
	select: selectedFromMenu,
	menuIcon: true,
	position: {
		my: "right top-1",
		at: "right bottom",
		within: ".main-content-wrapper"
	}
};

function menuItemSetEnabled(b, c) {
	c = $("#" + c);
	b ? c.removeClass("ui-state-disabled") : c.addClass("ui-state-disabled")
}

function selectMenuOnSetDemoOrReal(b) {
	menuItemSetEnabled(b, "monetary_history")
}

function selectMenuOnSetIsEmailValidated(b) {
	menuItemSetEnabled(!b, "email_validation")
}

function isChallengeJoinEnabled() {
	var b = GlobalDs.ChallengeInfo;
	if (b === null) return true;
	if (b.Status == EChallengeStatus.Cancelled || b.Status == EChallengeStatus.Completed) return true;
	if (b.Status == EChallengeStatus.Pending && b.ParticipantStatus != EChallengeParticipantStatus.Accepted) return true;
	if (b.Status == EChallengeStatus.InProgress && b.ParticipantStatus != EChallengeParticipantStatus.InProgress) return true;
	return false
}

function isChallengeInviteEnabled() {
	var b = GlobalDs.ChallengeInfo;
	if (b === null) return false;
	if (b.Status == EChallengeStatus.Pending && b.ParticipantStatus == EChallengeParticipantStatus.Accepted) return true;
	return false
}

function isChallengeLeaveEnabled() {
	var b = GlobalDs.ChallengeInfo;
	if (b === null) return false;
	if (b.Status == EChallengeStatus.Cancelled || b.Status == EChallengeStatus.Completed) return false;
	if (b.Status == EChallengeStatus.Pending && b.ParticipantStatus != EChallengeParticipantStatus.Rejected) return true;
	if (b.Status == EChallengeStatus.InProgress && b.ParticipantStatus == EChallengeParticipantStatus.InProgress) return true;
	return false
}

function selectMenuOnChallengeInfo() {
	menuItemSetEnabled(isChallengeJoinEnabled(), "challenge_join");
	menuItemSetEnabled(isChallengeInviteEnabled(), "challenge_invite");
	menuItemSetEnabled(isChallengeLeaveEnabled(), "challenge_leave")
}

function addLiveChatOption() {
	$("#live_chat").removeClass("display-none-class");
	$("#funds-live-chat").attr("class", "funds-live-chat");
	$("#funds-live-chat").attr("href", GlobalDs.LinksInfo.ChatLink)
}

function addChallengeOptions() {
	$("#challenge_options").removeClass("display-none-class");
	$("#shortcut_links").addClass("has_sub_menu")
}

function selectedFromMenu(b, c) {
	switch (c.item.attr("id")) {
	case "notifications":
		openNotificationsDialog();
		break;
	case "monetary_history":
		GlobalDs.IsRealMode && openHistoryDialog(false, false);
		break;
	case "change_password":
		runStartUpFlow(EStartUpPageState.SSLOpenWithChangePassword);
		break;
	case "rate_alerts":
		openPriceAlertsListDialog();
		break;
	case "contact_support":
		window.open("mailto:" + LangJSDict.strSupportEmail, "_self");
		break;
	case "live_chat":
		window.open(GlobalDs.LinksInfo.ChatLink);
		break;
	case "email_validation":
		GlobalDs.PersonalInfo.IsEmailValidated ||
			openEmailValidation();
		break;
	case "challenge_join":
		isChallengeJoinEnabled() && $challenge_join.dialog("open");
		break;
	case "challenge_invite":
		isChallengeInviteEnabled() && window.open("mailto:?subject=" + LangJSDict.strCHALLENGE_EMAIL_SUBJECT + "&body=" + LangJSDict.strCHALLENGE_EMAIL_BODY.replace(/\r\n/g, "%0D%0A").replace("%s", GlobalDs.ChallengeInfo.Name).replace("%s", dateToDisplayDateAndTime(GlobalDs.ChallengeInfo.StartTime)).replace("%s", dateToDisplayDateAndTime(GlobalDs.ChallengeInfo.EndTime)).replace("%s",
			GlobalDs.ChallengeInfo.ChallengeCode), "_self");
		break;
	case "challenge_leave":
		isChallengeLeaveEnabled() && alertDialog(ALERT_TYPE.atConfirmation, LangJSDict.strCHALLENGE_LEAVE_CONFIRM, false, function () {
			OpenProcessingForm();
			SENDImm_challengeCancelImm({
				ChallengeCode: GlobalDs.ChallengeInfo.ChallengeCode
			}, function (d) {
				CloseProcessingForm();
				StringToESecuredServiceResult(d.SecuredResultCode) == ESecuredServiceResult.Success ? alertDialog(ALERT_TYPE.atSuccess, LangJSDict.strCHALLENGE_LEFT_CHALLENGE, false, null, null) :
					alertDialog(ALERT_TYPE.atError, LangJSDict.strCHALLENGE_GENERAL_FAILURE, false, null, null)
			})
		}, null);
		break;
	case "logout":
		alertDialog(ALERT_TYPE.atConfirmation, LangJSDict.strSURE_TO_EXIT, false, function () {
			OpenProcessingForm();
			SaveWebClientConfigurationIfNeeded(function () {
				StartedLogOutPhase();
				window.open(LangJSDict.urlLOGOUT, "_self")
			})
		}, null);
		break;
	default:
		break
	}
	return false
}
$(document).ready(function () {
	$.jqote_tag("~");
	$.preferCulture([LangJSDict.jsLangCultureCode, LangJSDict.jsLangCultureCode.substr(0, 2)]);
	$bonusLink = $("#main_lobby_bonus_link");
	initalizeWebAppMasterFromCookies();
	readMachineIDCookie();
	$("#logout_reconnect_dialog").dialog({
		iphoneMaxWidth: 305,
		iphoneMaxHeight: 140,
		autoOpen: false,
		modal: true,
		width: GeneralUI.LogoutReconnectWidth
	});
	$("#header_logout").click(function () {
		alertDialog(ALERT_TYPE.atConfirmation, LangJSDict.strSURE_TO_EXIT, false, function () {
			OpenProcessingForm();
			SaveWebClientConfigurationIfNeeded(function () {
				StartedLogOutPhase();
				window.open(LangJSDict.urlLOGOUT, "_self")
			})
		}, null);
		return false
	});
	$.ctrlPlusAlt(121, function () {
		if ($("#session_id").hasClass("display-none-class")) {
			$("#session_id").removeClass("display-none-class");
			$("#button_test_area").removeClass("display-none-class");
			$.cookie(appCookies.DebugBtnsTestArea, "show", {
				expires: 3650,
				path: "/"
			})
		} else {
			$("#session_id").addClass("display-none-class");
			$("#button_test_area").addClass("display-none-class");
			$.cookie(appCookies.DebugBtnsTestArea,
				"unShow", {
					expires: 3650,
					path: "/"
				})
		}
		return false
	});
	$bonusLink.click(function () {
		GlobalDs.IsRealMode ? runStartUpFlow($bonusLink.data().StartUpPageState) : alertDialog(ALERT_TYPE.atConfirmation, LangJSDict.strYOU_MUST_TRADE_FOR_REAL_MONEY, false, function () {
			setBonusCookies(ApplicationState.bonus);
			runStartUpFlow($bonusLink.data().StartUpPageState)
		}, null);
		return false
	});
	var b = $("#ipad_scroll_notification");
	if (isAppleMobileOS()) {
		b.removeClass("display-none-class");
		window.setTimeout(function () {
			b.fadeOut(500)
		}, GC.IPAD_SCROLL_NOTIFICATION_DURATION)
	} else b.addClass("display-none-class");
	if (isAppleMobileOS()) {
		$("body").addClass("iOS");
		isiPhone() && $("body").addClass("iPhone");
		isiPad() && $("body").addClass("iPad")
	}
	if (getDisplayPageType() === EPageType.Trade) {
		$("#shortcut_links").removeClass("display-none-class");
		selectMenu = $("#shortcut_links").menubar(selectMenuOptions)
	}
});
$.ctrlPlusAlt = function (b, c, d) {
	$(document).keydown(function (e) {
		d || (d = []);
		var f = parseInt(b, 10);
		if ((!isNaN(f) && f > 0 && e.keyCode == b || isNaN(f) && e.keyCode == b.charCodeAt(0)) && e.ctrlKey && e.altKey) {
			c.apply(this, d);
			return false
		}
	})
};
var undefined;

function ReportErrors(b) {
	SEND_userLog(new UserLog(b + "Stack : " + printStackTrace()));
	alert(b)
}

function GetProp(b, c) {
	var d = "";
	if (!(c in b)) return c;
	return b[c]
}

function GetPropETS(b, c) {
	b = GetProp(b, c);
	if (b === null || b === "") b = "&nbsp;";
	return b
}

function GetPropDefault(b, c, d) {
	if (!(c in b)) return d;
	return b[c]
}

function IsGeneralJsonResponseOK(b) {
	if (typeof b != "object") return true;
	if ("ResultCode" in b && b.ResultCode !== 0) return false;
	return true
}

function DebugGetPropertiesString(b) {
	var c = "{";
	for (var d in b) c += d + " value :" + b[d] + "\n";
	c += "}";
	return c
}

function log(b) {
	typeof console !== "undefined" && console.log(b)
}

function consolePrintStackTrace() {
	typeof console !== "undefined" && typeof console.trace == "function" && console.trace()
}

function getKeys(b) {
	var c = [];
	if (typeof b != "object" || b === null) return c;
	for (var d in b) c.push(d);
	return c
}

function getValues(b) {
	var c = [];
	if (typeof b != "object" || b === null) return c;
	for (var d in b) c.push(b[d]);
	return c
}

function RGBtoHex(b, c, d) {
	return toHex(b) + toHex(c) + toHex(d)
}

function toHex(b) {
	if (b === null) return "00";
	b = parseInt(b, 10);
	if (b === 0 || isNaN(b)) return "00";
	b = Math.max(0, b);
	b = Math.min(b, 255);
	b = Math.round(b);
	return "0123456789ABCDEF".charAt((b - b % 16) / 16) + "0123456789ABCDEF".charAt(b % 16)
}

function decoratorVerifyReponseProperties(b, c, d, e) {
	function f(g) {
		f.preFunc();
		if (typeof f.failFunc == "function" && typeof g == "object" && g !== null) {
			if ("ResultCode" in g && g.ResultCode !== 0) return f.failFunc(g.ResultCode);
			if ("SecuredResultCode" in g && g.SecuredResultCode !== 0) return f.failFunc(g.SecuredResultCode);
			if ("LoginResultCode" in g && g.LoginResultCode !== 0) return f.failFunc(g.LoginResultCode)
		}
		for (var l = [], n = g, m = 0; m < f.req.length; m++) {
			l = f.req[m];
			if (m > 0) {
				n = n[l[0]];
				l = l.slice(1)
			}
			if (l = VerifyProperties(l, n)) {
				ReportErrors(l);
				return -1
			}
		}
		return f.f(g)
	}
	f.req = [
		[]
	];
	for (var h = 0; h < b.length; h++) typeof b[h] == "object" ? f.req.push(b[h]) : f.req[0].push(b[h]);
	f.preFunc = function () {};
	if (typeof d != "undefined" && d !== null) f.preFunc = d;
	f.f = c;
	f.failFunc = e;
	return f
}

function dateToDisplayOnlyDateSt(b) {
	return $.format(b, "d")
}

function dateToDisplayOnlyTimeSt(b, c) {
	return c ? $.format(b, "T") : $.format(b, "t")
}

function dateToDisplayDateAndTime(b) {
	return dateToDisplayOnlyDateSt(b) + " " + dateToDisplayOnlyTimeSt(b, false)
}

function stdFormatToDate(b) {
	b = b.match(/(\d{4})\-(\d{2})\-(\d{2}) (\d{2})\:(\d{2}):(\d{2})\.(\d{3})/);
	var c = new Date(1900, 0);
	if (b === null || b.length < 8) return c;
	c = new Date;
	c.setFullYear(b[1], parseInt(b[2], 10) - 1, b[3]);
	c.setHours(b[4], b[5], b[6], b[7]);
	return c
}

function stdFormatUTCToLocalDateTime(b) {
	b = stdFormatToDate(b);
	b.setTime(b.getTime() - b.getTimezoneOffset() * 6E4);
	return b
}

function dateToStdFormat(b) {
	if (typeof b === "undefined" || b === null) return GC.NIL_DATEVALUE;
	return b.format("yyyy-mm-dd HH:MM:ss.l")
}

function dateToDateOnlyString(b) {
	if (b === null) return GC.NIL_DATEVALUE;
	return $.format(b, "d")
}

function convertToStdFormat(b, c, d) {
	var e = new Date;
	e.setFullYear(d, c, b);
	return dateToStdFormat(e)
}

function parseServerDateTime(b) {
	b = b.substr(b.indexOf("(") + 1, b.indexOf(")"));
	var c = new Date;
	c.setTime(parseInt(b, 10));
	return c
}
Array.prototype.remove = function (b, c) {
	c = this.slice((c || b) + 1 || this.length);
	this.length = b < 0 ? this.length + b : b;
	return this.push.apply(this, c)
};

function easyPassword(b) {
	if (b.indexOf("12345") != -1) return true;
	return false
}

function sameChar(b) {
	var c = b;
	for (var d = c = 0; d < b.length; d++)
		if (b.charAt(d) == b[0]) c += 1;
	if (b.length == c) return true;
	return false
}

function getInstrumentID(b, c) {
	if (!GC.NUMERIC.test(b.split(c)[1])) {
		ReportErrors(GC.ERROR_INSTRUMENT_ID);
		return null
	}
	return b.split(c)[1]
}

function numberFormat(b, c, d, e) {
	var f = "";
	b += "";
	if (b.indexOf("-") === 0) {
		f = "-";
		b *= -1
	}
	b = Math.round(b * Math.pow(10, c)) / Math.pow(10, c);
	b = (b + "").split(".");
	b[0] || (b[0] = "0");
	b[1] || (b[1] = "");
	if (b[1].length < c) {
		for (var h = b[1], g = b[1].length + 1; g <= c; g++) h += "0";
		b[1] = h
	}
	if (e !== "" && b[0].length > 3) {
		h = b[0];
		b[0] = "";
		for (var l = 3; l < h.length; l += 3) {
			g = h.slice(h.length - l, h.length - l + 3);
			b[0] = e + g + b[0] + ""
		}
		l = h.substr(0, h.length % 3 === 0 ? 3 : h.length % 3);
		b[0] = l + b[0]
	}
	d = c <= 0 ? "" : d;
	return f + b[0] + d + b[1]
}

function parseFloatCultured(b) {
	if (typeof b == "number") return b;
	return $.parseFloat(b)
}

function formatPercentCultured(b, c) {
	if (typeof c == "undefined") c = 2;
	return $.format(b / 100, "p" + c)
}

function roundNumberToXDecPlaces(b, c) {
	return Math.round(b * Math.pow(10, c)) / Math.pow(10, c)
}

function roundToPrecisionDigits(b, c) {
	if (c === 0) b = Math.round(b);
	isNaN(b) && alertDialog(ALERT_TYPE.atError, "roundToPrecisionDigits : " + b + " is not a Number", false, null, null);
	return $.format(b, "n" + c)
}

function getHighLowString(b, c, d, e, f) {
	if (!f) return LangJSDict.strTRADING_CLOSED;
	if (b === null || c === null || b <= 0 || c <= 0) return "-";
	b = roundToPrecisionDigits(b, d, e);
	c = roundToPrecisionDigits(c, d, e);
	return b + " " + GeneralUI.TI_HighLowSeparationChar + " " + c
}

function requiredSecuritiesString(b, c, d, e, f) {
	b = d * b / 100;
	c = b * c;
	c = c.toFixed(GC.PRICE_ACCURACY);
	return f + b + " = " + e + c
}

function getPipValue(b) {
	return Math.pow(10, -b)
}
var myCountriesXmlCash = null;

function getCountriesXml(b) {
	myCountriesXmlCash !== null ? b(myCountriesXmlCash) : $.ajax({
		type: "GET",
		url: "../Content/Data/Countries.xml",
		dataType: "xml",
		success: function (c) {
			myCountriesXmlCash = c;
			b(myCountriesXmlCash)
		}
	})
}

function IsBtnDisabled(b) {
	if (b.is(".std-button-disabled, .tbl-button-disabled, .small-tbl-button-disabled")) return true;
	return false
}
var offsetInMinutes = -(new Date).getTimezoneOffset();

function GMTToLocalDate(b) {
	b = b.getTime() + offsetInMinutes * 6E4;
	return b = new Date(b)
}

function getDisplayPageType() {
	if ($("#regular_user_login_cntnt").length > 0) return EPageType.Login;
	if ($("#new_user_login_cntnt").length > 0) return EPageType.RegisterNewUser;
	if ($("#select_account").length > 0) return EPageType.SelectAccount;
	if ($("#header_main_tabs").length > 0) return EPageType.Trade;
	ReportErrors("getDisplayPageType: Unknwon page type!");
	return -1
}

function setDialogXVisibility(b, c) {
	c ? b.dialog().parents(".ui-dialog").find(".ui-dialog-titlebar-close").hide() : b.dialog().parents(".ui-dialog").find(".ui-dialog-titlebar-close").show()
}

function isBrowserChrome() {
	return navigator.userAgent.toLowerCase().indexOf("chrome") > -1
}

function isPhoneOk(b) {
	var c = true;
	if (/^(00.*)/.test(b.val()) || b.val() === "" || !/^\d*$/.test(b.val())) {
		b.addClass(GC.FIELD_ERR_CLASS);
		c = false
	}
	return c
}

function convertDayIndexToDayInWeek(b) {
	switch (b) {
	case 0:
		return LangJSDict.strSHORT_DAY_SUN;
	case 1:
		return LangJSDict.strSHORT_DAY_MON;
	case 2:
		return LangJSDict.strSHORT_DAY_TUE;
	case 3:
		return LangJSDict.strSHORT_DAY_WED;
	case 4:
		return LangJSDict.strSHORT_DAY_THU;
	case 5:
		return LangJSDict.strSHORT_DAY_FRI;
	case 6:
		return LangJSDict.strSHORT_DAY_SAT;
	default:
		ReportErrors("convertDayIndexToDayInWeek: Unknwon " + b + " worng  number of day in week!");
		break
	}
	return -1
}

function checkIfGeneralFailureReceive(b) {
	if ("ResultCode" in b && b.ResultCode > 0) return true
}

function convertStringToNuber(b) {
	b = parseInt(b, 10);
	if (isNaN(b)) b = null;
	return b
}

function isAppleMobileOS() {
	return navigator.userAgent.toLowerCase().indexOf("iphone") > -1 || navigator.userAgent.toLowerCase().indexOf("ipad") > -1
}

function isAndroidOS() {
	return navigator.userAgent.toLowerCase().indexOf("android") > -1
}

function isiPhone() {
	return navigator.userAgent.toLowerCase().indexOf("iphone") > -1
}

function isiPad() {
	return navigator.userAgent.toLowerCase().indexOf("ipad") > -1
}
var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function (b) {
		for (var c = "", d, e, f, h, g, l, n = 0; n < b.length;) {
			d = b.charCodeAt(n);
			n++;
			e = b.charCodeAt(n);
			n++;
			f = b.charCodeAt(n);
			n++;
			h = d >> 2;
			d = (d & 3) << 4 | e >> 4;
			g = (e & 15) << 2 | f >> 6;
			l = f & 63;
			if (isNaN(e)) g = l = 64;
			else if (isNaN(f)) l = 64;
			c = c + this._keyStr.charAt(h) + this._keyStr.charAt(d) + this._keyStr.charAt(g) + this._keyStr.charAt(l)
		}
		return c
	},
	decode: function (b) {
		var c = "",
			d, e, f, h, g, l = 0;
		for (b = b.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < b.length;) {
			d =
				this._keyStr.indexOf(b.charAt(l));
			l++;
			e = this._keyStr.indexOf(b.charAt(l));
			l++;
			h = this._keyStr.indexOf(b.charAt(l));
			l++;
			g = this._keyStr.indexOf(b.charAt(l));
			l++;
			d = d << 2 | e >> 4;
			e = (e & 15) << 4 | h >> 2;
			f = (h & 3) << 6 | g;
			c += String.fromCharCode(d);
			if (h != 64) c += String.fromCharCode(e);
			if (g != 64) c += String.fromCharCode(f)
		}
		return c
	}
};

function readDecimalsInBinary(b) {
	for (var c = [], d = 0; d < b.length; d += 4) {
		for (var e = 0, f = 3; f >= 0; f--) e = e * 256 + b.charCodeAt(d + f);
		f = Math.floor(e / 1E8);
		e = e % 1E8 * Math.pow(10, -f);
		c.push(e)
	}
	return c
}

function readDecimalsInBase64(b) {
	b = Base64.decode(b);
	return readDecimalsInBinary(b)
}

function readIntegersInBinary(b) {
	for (var c = [], d = 0; d < b.length; d += 4) {
		for (var e = 0, f = 3; f >= 0; f--) e = e * 256 + b.charCodeAt(d + f);
		c.push(e)
	}
	return c
}

function readIntegersInBase64(b) {
	b = Base64.decode(b);
	return readIntegersInBinary(b)
}

function readDateTimesInBinary(b) {
	for (var c = [], d = 0; d < b.length; d += 6) {
		for (var e = 0, f = 3; f >= 0; f--) e = e * 256 + b.charCodeAt(d + f);
		e *= 1E3;
		e += 256 * b.charCodeAt(d + 5) + b.charCodeAt(d + 4);
		f = new Date;
		f.setTime(e);
		c.push(f)
	}
	return c
}

function readDateTimesInBase64(b) {
	b = Base64.decode(b);
	return readDateTimesInBinary(b)
}

function genericFormatMoneyAmount(b, c, d, e, f, h) {
	var g = GC.PRICE_ACCURACY;
	f = " ";
	e || (g = 0);
	if (d === true) g = 0;
	if (h === true) f = "";
	b = roundToPrecisionDigits(b, g, true);
	if (typeof c == "string") {
		d = $.culture.numberFormat.currency.pattern[1];
		b = d.indexOf("$") < d.indexOf("n") ? c + f + b : b + f + c
	}
	return b
}

function isRTLLanguage() {
	if (GlobalDs.Lang2CharsCode == "he" || GlobalDs.Lang2CharsCode == "ar") return true;
	return false
}

function callBackWrapperCheckLoggedOut(b) {
	return function (c) {
		if (c.ResultCode === 2) MainHSM.HandleSubSessionEndedOrMissing();
		else typeof b === "function" && b(c)
	}
}

function SendRequest(b, c) {
	c.SessionID = cometSessID;
	c.SubSessionID = cometSubSessID;
	$.post("/ClientRequest/" + b, c, callBackWrapperCheckLoggedOut(null), "json")
}

function UserLog(b) {
	this.Message = Base64.encode(unescape(encodeURIComponent(b)))
}

function ProcessRateAlert(b, c, d, e, f, h, g) {
	this.ModificationType = b;
	this.RateAlertID = c;
	this.InstrumentID = d;
	this.InstrumentName = e;
	this.Type = f;
	this.Rate = h;
	this.ExpiryDate = g
}

function CancelRateAlert(b) {
	this.RateAlertID = b
}

function UpdateFavoriteInstruments(b) {
	this.instsIDs = b
}

function ProcessOrderRequest(b, c, d, e, f, h, g, l, n, m, q, o, t, w) {
	this.ModificationType = b;
	this.OrderID = c;
	this.InstrumentID = d;
	this.InstrumentName = e;
	this.Type = f;
	this.OrderEntryType = h;
	this.RequestedAmount = g;
	this.MinRate = l;
	this.MaxRate = n;
	this.ClientRate = m;
	this.LimitRate = q;
	this.StopRate = o;
	this.OrderExpiration = t;
	this.TrailingStopPips = w
}

function UpdaePosition(b, c, d, e, f, h) {
	this.PositionID = b;
	this.InstrumentID = c;
	this.InstrumentName = d;
	this.LimitRate = e;
	this.StopRate = f;
	this.TrailingStopPips = h
}

function ClosePosition(b, c) {
	this.PositionID = b;
	this.Amount = c
}

function GetClosedPositions(b, c) {
	this.FromDate = dateToStdFormat(b);
	this.ToDate = dateToStdFormat(c)
}

function UserCancelOrder(b) {
	this.OrderID = b
}

function PostToFacebookLog(b, c) {
	this.FacebookId = b;
	this.PostContent = c
}

function UserQuetionnaire(b, c) {
	this.questionAndAnswers = "";
	if (b.length == c.length)
		for (var d = 0; d < b.length; d++) {
			if (d > 0) this.questionAndAnswers += ",";
			this.questionAndAnswers += EAQuestionsTypeToString(b[d]) + "-" + EAQAnswersTypeToString(c[d])
		}
}

function GetChartDataTick(b, c) {
	this.InstrumentID = b;
	this.InstrumentName = c
}

function GetChartData(b, c, d) {
	this.InstrumentID = b;
	this.InstrumentName = c;
	this.FeedResolutionLevel = d
}

function UpdateFavoritesInstruments(b, c) {
	this.InstrumentsIDs = "" + b.join(",");
	this.SequenceNumber = c
}

function myTest() {
	SendRequest("ClosePosition", {
		PositionID: 130456,
		CloseAmount: 160
	})
}
var totalUserLogMsgsLength = 0,
	totalUserLogMsgsCnt = 0;

function SEND_userLog(b) {
	totalUserLogMsgsLength += JSON.stringify(b).length;
	totalUserLogMsgsCnt += 1;
	totalUserLogMsgsLength > 1E4 || totalUserLogMsgsCnt > 3 || SendRequest("UserLog", b)
}

function SEND_getGeneralInfo() {
	SendRequest("GetGeneralInfo", {})
}

function SEND_getCategoriesStructure() {
	SendRequest("GetCategoriesStructure", {})
}

function SEND_getCategoriesStructure2() {
	SendRequest("GetCategoriesStructure2", {})
}

function SEND_getTradeInstruments(b) {
	SendRequest("GetTradeInstruments", {
		SpecificCategory: b
	})
}

function SEND_getFavoritesInstruments() {
	SendRequest("GetFavoritesInstruments", {})
}

function SEND_updateFavoritesInstruments(b) {
	SendRequest("UpdateFavoritesInstruments", b)
}

function SEND_getRateAlerts() {
	SendRequest("GetRateAlerts", {})
}

function SEND_cancelRateAlert(b) {
	SendRequest("CancelRateAlert", b)
}

function SEND_processRateAlert(b) {
	SendRequest("ProcessRateAlert", b)
}

function SEND_getOpenPositions() {
	SendRequest("GetOpenPositions", {})
}

function SEND_getClosedPositions(b) {
	SendRequest("GetClosedPositions", b)
}

function SEND_getActiveOrders(b) {
	SendRequest("GetActiveOrders", b)
}

function SEND_processOrder(b) {
	SendRequest("ProcessOrder", b)
}

function SEND_positionUpdate(b) {
	SendRequest("PositionUpdate", b)
}

function SEND_closePosition(b) {
	SendRequest("ClosePosition", b)
}

function SEND_userCancelOrder(b) {
	SendRequest("UserCancelOrder", b)
}

function SEND_getAccountValue() {
	SendRequest("GetAccountValue", {})
}

function SEND_postToFacebookLog(b) {
	SendRequest("PostToFacebookLog", b)
}

function SEND_getChallengeInfo() {
	SendRequest("GetChallengeInfo", {})
}

function ForgotPassword(b) {
	this.Email = b
}

function ChangePassword(b, c, d) {
	this.Email = b;
	this.Password = c;
	this.NewPassword = d
}

function SendPhoneVerificationCode(b, c) {
	this.PhoneVerifyType = EPhoneVerifyTypeToString(b);
	this.PhoneNumber = c
}

function VerifyPhone(b, c) {
	this.PhoneNumber = b;
	this.Code = c
}

function VerifyEmail(b) {
	this.Email = b
}

function SendEmailVerificationCode(b, c) {
	this.Email = b;
	this.Code = c
}

function CashierHistory(b, c) {
	this.FromDate = b;
	this.ToDate = c
}

function BonusHistory(b, c) {
	this.FromDate = b;
	this.ToDate = c
}

function AccountRegistrationPersonalInfo(b, c, d, e, f, h, g, l, n, m, q, o, t, w) {
	this.FirstName = b;
	this.LastName = c;
	this.PhoneNumber = d;
	this.FaxNumber = e;
	this.ID = f;
	this.BirthDate = h;
	this.TimeZone = g;
	this.IsPhoneMobile = l;
	this.Country = n;
	this.CountryCode = m;
	this.State = q;
	this.City = o;
	this.Address = t;
	this.Zip = w
}

function UseLastDepositMethod(b, c) {
	this.Amount = b;
	this.PayMethodId = c
}

function RealDepositCreditCard(b, c, d, e, f, h, g) {
	this.Amount = b;
	this.BonusCode = c;
	this.CreditCardNumber = d;
	this.ExpirationMonth = e;
	this.ExpirationYear = f;
	this.CVV = h;
	this.Owner = g
}

function RealDepositMoneyBookers(b, c, d, e) {
	this.Amount = b;
	this.BonusCode = c;
	this.OptionalEmail = d;
	if (typeof e === "number") this.MoneyBookersPM = EMoneyBookersPMsToString(e)
}

function RealDepositAlternativeMethods(b, c, d) {
	this.Amount = b;
	this.BonusCode = c;
	if (typeof d === "number") this.AlternativeMethodsPM = EAlternativeMethodsPMsToString(d)
}

function RealDepositCashU(b, c) {
	this.Amount = b;
	this.BonusCode = c
}

function RealDepositPayPal(b, c, d) {
	this.Amount = b;
	this.BonusCode = c;
	this.PayPalEmail = d
}

function RealWithdrawBankDraft(b) {
	this.actualAmount = b
}

function RealWithdrawWire(b, c, d, e, f, h, g, l, n, m) {
	this.bankAccount = b;
	this.bankName = c;
	this.sortCode = d;
	this.IBAN = e;
	this.sortCodeType = f;
	this.countryCode = h;
	this.actualCurrencyID = g;
	this.actualAmount = l;
	this.comments = n;
	this.destinationBankID = m
}

function RealWithdrawMoneyBookers(b, c) {
	this.ActualAmount = b;
	this.Email = c
}

function RealWithdrawPayPal(b, c) {
	this.ActualAmount = b;
	this.Email = c
}

function CancelWithdraw(b) {
	this.WithdrawTransId = b
}

function RealWithdrawBankdraft() {}

function RequiredFilesStatuses(b) {
	this.RequiredFilesStatusesType = b
}

function SendAddressVerfication(b, c, d) {
	this.City = b;
	this.Address = c;
	this.Zip = d
}

function VerifyAddress(b) {
	this.Code = b
}

function GetRegulationType(b) {
	this.CountryCode = b
}

function SendImmRequest(b, c, d) {
	c.SessionID = cometSessID;
	c.SubSessionID = cometSubSessID;
	$.getJSON("/ClientRequest/" + b, c, callBackWrapperCheckLoggedOut(d))
}

function SendImmRequestNotLoggedIn(b, c, d) {
	c.SessionID = 0;
	c.SubSessionID = 0;
	$.getJSON("/Login/" + b, c, d)
}

function SENDImmNotLoggedIn_forgotPasswordImm(b, c) {
	SendImmRequestNotLoggedIn("ForgotPasswordImm", b, c)
}

function SEND_sessionFeedControlImm(b) {
	SendRequest("SessionFeedControlImm", b)
}

function SENDImm_getBuySellDialogInfoImm(b, c) {
	SendImmRequest("GetBuySellDialogInfoImm", b, c)
}

function SENDImm_notifyBuySellDialogClosedImm() {
	SendImmRequest("NotifyBuySellDialogClosedImm", {}, null)
}

function SENDImm_getInstrumentDetailsImm(b, c) {
	SendImmRequest("GetInstrumentDetailsImm", b, c)
}

function SENDImm_editPositionImm(b, c) {
	SendImmRequest("EditPositionImm", b, c)
}

function SENDImm_getClosePositionInfoImm(b, c) {
	SendImmRequest("GetClosePositionInfoImm", b, c)
}

function SENDImm_unregisterPositionFromRegularFeedsImm(b, c) {
	SendImmRequest("UnregisterPositionFromRegularFeedsImm", b, c)
}

function SENDImm_editOrderImm(b, c) {
	SendImmRequest("EditOrderImm", b, c)
}

function SENDImm_switchToRealImm(b, c) {
	SendImmRequest("SwitchToRealImm", b, c)
}

function SENDImm_switchToDemoImm(b, c) {
	SendImmRequest("SwitchToDemoImm", b, c)
}

function SENDImm_getNotificationImm(b, c) {
	SendImmRequest("NotificationImm", b, c)
}

function SENDImm_UpdateNotificationImm(b, c) {
	SendImmRequest("UpdateNotificationImm", b, c)
}

function SENDImm_GetSearchInstrumentsImm(b, c) {
	SendImmRequest("GetSearchInstrumentsImm", b, c)
}

function SENDImm_getPixelsScriptsImm(b, c) {
	SendImmRequest("GetPixelsScriptsImm", b, c)
}

function SENDImm_ChangePasswordImm(b, c) {
	SendImmRequest("ChangePasswordImm", b, c)
}

function SENDImm_sendPhoneVerificationImm(b, c) {
	SendImmRequest("SendPhoneVerificationImm", b, c)
}

function SENDImm_verifyPhoneImm(b, c) {
	SendImmRequest("VerifyPhoneImm", b, c)
}

function SENDImm_getAvailableBonusesImm(b, c) {
	SendImmRequest("GetAvailableBonusesImm", b, c)
}

function SENDImm_updateAccountRegistrationInfoImm(b, c) {
	SendImmRequest("UpdateAccountRegistrationInfoImm", b, c)
}

function SENDImm_getCashierHistoryImm(b, c) {
	SendImmRequest("GetCashierHistoryImm", b, c)
}

function SENDImm_getBonusHistoryImm(b, c) {
	SendImmRequest("GetBonusHistoryImm", b, c)
}

function SENDImm_getUserCashierInfoImm(b, c) {
	SendImmRequest("GetUserCashierInfoImm", b, c)
}

function SENDImm_getAccountValueImm(b, c) {
	SendImmRequest("GetAccountValueImm", b, c)
}

function SENDImm_realDepositCreditCardImm(b, c) {
	SendImmRequest("RealDepositCreditCardImm", b, c)
}

function SENDImm_realDepositUseLastDepositMethodImm(b, c) {
	SendImmRequest("RealDepositUseLastDepositMethodImm", b, c)
}

function SENDImm_realDepositMoneyBookersImm(b, c) {
	SendImmRequest("RealDepositMoneyBookersImm", b, c)
}

function SENDImm_realDepositAlternativeMethodsImm(b, c) {
	SendImmRequest("RealDepositAlternativeMethodsImm", b, c)
}

function SENDImm_realDepositCashUImm(b, c) {
	SendImmRequest("RealDepositCashUImm", b, c)
}

function SENDImm_realDepositPayPalImm(b, c) {
	SendImmRequest("RealDepositPayPalImm", b, c)
}

function SENDImm_realDepositWireImm(b, c) {
	SendImmRequest("RealDepositWireImm", b, c)
}

function SENDImm_realWithdrawWireImm(b, c) {
	SendImmRequest("RealWithdrawWireImm", b, c)
}

function SENDImm_realWithdrawBankDraftImm(b, c) {
	SendImmRequest("RealWithdrawBankDraftImm", b, c)
}

function SENDImm_realWithdrawMoneyBookersImm(b, c) {
	SendImmRequest("RealWithdrawMoneyBookersImm", b, c)
}

function SENDImm_realWithdrawPayPalImm(b, c) {
	SendImmRequest("RealWithdrawPayPalImm", b, c)
}

function SENDImm_cancelWithdrawImm(b, c) {
	SendImmRequest("CancelWithdrawImm", b, c)
}

function SENDImm_sendAddressVerificationImm(b, c) {
	SendImmRequest("SendAddressVerificationImm", b, c)
}

function SENDImm_verifyAddressImm(b, c) {
	SendImmRequest("VerifyAddressImm", b, c)
}

function SENDImm_sendEmailVerificationImm(b, c) {
	SendImmRequest("SendEmailVerificationImm", b, c)
}

function SENDImm_verifyEmailImm(b, c) {
	SendImmRequest("VerifyEmailImm", b, c)
}

function SENDImm_getRequiredFilesStatusesImm(b, c) {
	SendImmRequest("GetRequiredFilesStatusesImm", b, c)
}

function SENDImm_setUserQuetionnaireImm(b, c) {
	SendImmRequest("SetUserQuetionnaireImm", b, c)
}

function SENDImm_getUserQuetionnaireImm(b, c) {
	SendImmRequest("GetUserQuetionnaireImm", b, c)
}

function SENDImm_getChartDataTickImm(b, c) {
	SendImmRequest("GetChartDataTickImm", b, c)
}

function SENDImm_getChartDataImm(b, c) {
	SendImmRequest("GetChartDataImm", b, c)
}

function SENDImm_getRegulationTypeImm(b, c) {
	SendImmRequest("GetRegulationTypeImm", b, c)
}

function SENDImm_getWebClientConfigurationImm(b) {
	SendImmRequest("GetWebClientConfigurationImm", {}, b)
}

function SENDImm_setWebClientConfigurationImm(b, c) {
	SendImmRequest("SetWebClientConfigurationImm", b, c)
}

function SENDImm_challengeCancelImm(b, c) {
	SendImmRequest("ChallengeCancelImm", b, c)
}

function SENDImm_challengeJoinImm(b, c) {
	SendImmRequest("ChallengeJoinImm", b, c)
}
var ESecuredServiceResult = {
	Success: 0,
	UserAuthenticationFailed: 2,
	ContactSupportNeeded: 6,
	EmailVerifyNeeded: 7,
	PhoneVerifyNeeded: 8,
	SendDocsNeeded: 9,
	CreditCardNotSupported: 10,
	CreditCardIsInvalid: 11,
	DemoAccountNotSupportThisMethod: 12,
	ServerError: 13,
	RealAccountNotSupportThisMethod: 14,
	InvalidCode: 15,
	VerifiedBefore: 16,
	ReachedMaxPhoneVerificationTrials: 17,
	EmailIsNotExistInSystem: 18,
	ActionFailed: 19,
	InvalidUserRoleID: 20,
	PayMethodNotBelongToUser: 21,
	AMLCheckFailed: 22,
	CountryIsBlocked: 23,
	AddressVerificationAlreadySent: 24,
	InvalidInput: 25,
	ReachedMaxVerificationTrials: 26,
	InvalidClientType: 27,
	InvalidMachineIDParameters: 28,
	InvalidPhoneNumber: 29,
	FullRegisterNeeded: 30,
	InvalidArguments: 31,
	InvalidChallengeCode: 201,
	UserAlreadyHaveChallenge: 202,
	UserNotInChallenge: 203,
	ChallengeMaxUsersExceeded: 204,
	UserHasChallengeInProgress: 205,
	ChallengeAlreadyStarted: 206
}, ELoginServiceResult = {
		Success: 0,
		ApplicationVersionNotCompliant: 1,
		UserAuthenticationFailed: 2,
		DuplicateEmail: 3,
		PasswordTooWeak: 4,
		InvalidDownloadID: 5,
		ContactSupportNeeded: 6,
		ServerError: 13,
		EmailIsNotExistInSystem: 18,
		ActionFailed: 19,
		InvalidClientType: 27,
		InvalidMachineIDParameters: 28
	}, EDepositTrnsStatus = {
		DtsRequested: 1,
		DtsApproved: 2,
		DtsRejected: 4,
		DtsCancelled: 8
	}, EWithdrawTrnsStatus = {
		WtsRequested: 1,
		WtsCancelled: 2,
		WtsApprovedNotSent: 4,
		WtsApproveSent: 8,
		WtsApproveSetteled: 16,
		WtsRejected: 32
	}, EBonusTrnsStatus = {
		BtsRequested: 1,
		BtsExpired: 2,
		BtsConditionFulFilled: 4,
		BtsCancelled: 8
	}, EAdjustmentType = {
		Admin: 1,
		InactivityFee: 2
	}, EBonusEvent = {
		RegisterNewUser: 1,
		PhoneApproved: 2,
		InitialDeposit: 4,
		OngoingDeposit: 8,
		Admin: 16,
		Retention: 32,
		PhotoIDApproved: 64,
		AddressApproved: 128,
		UserReferral: 256
	}, EBonusType = {
		ReleaseRestricted: 1,
		CashOutRestricted: 2
	}, EWCTransactionType = {
		Withdraw: 0,
		Deposit: 1,
		Bonus: 2,
		Adjustment: 3,
		Unknwon: 4
	}, ECreditCardsErrorReason = {
		DefaultReason: 0,
		WrongCVV: 1,
		Denied: 2,
		InvalidCard: 3,
		CardExpired: 4,
		InvalidCardNumber: 5,
		CallCreditCompany: 6,
		SuspiciousCard: 7
	}, EInstrumentType = {
		Forex: 1,
		Commodities: 2,
		Indices: 4,
		Stocks: 8,
		ETF: 16
	}, ECategoryType = {
		Normal: 1,
		Favorites: 2,
		MostActive: 3,
		RisersAndFallers: 4
	}, EOpType = {
		Buy: 0,
		Sell: 1
	}, EInstrumentAssetType = {
		NULL: -1,
		Shares: 0,
		Barrels: 1,
		Ounces: 2,
		Contracts: 3,
		Pounds: 4,
		Bushels: 5
	}, EOpTypeWithShort = {
		Buy: 0,
		Sell: 1,
		Short: 1
	}, EVENT_TYPE = {
		FutureOrderChange: 0,
		CurrentValueChange: 1,
		CurrentAmountChange: 2
	}, EClientLogLevel = {
		Debug: 1,
		Info: 2,
		Warn: 4,
		Error: 8,
		Fatal: 16
	}, EMainModeType = {
		New: 0,
		EditPositon: 1,
		EditOrder: 2,
		NewOrderOnly: 3
	}, ECommListType = {
		All: 0,
		Update: 1
	}, EModificationType = {
		New: 0,
		Update: 1
	}, ERequestStatus = {
		NULL: -1,
		Approved: 0,
		Rejected: 1
	}, EServerErrorType = {
		CommError: 0,
		ServerError: 1
	}, EOrderStatus = {
		Pending: 1,
		Live: 2,
		Executed: 4,
		Cancelled: 8,
		Rejected: 16
	}, EOrderEntryType = {
		Market: 1,
		EntryLimit: 2,
		EntryStop: 4
	}, EOrderRejectReason = {
		NULL: -1,
		MarketNotInRange: 0,
		PreConditionsViolation: 1,
		NotEnoughMoney: 2,
		Server: 3,
		InvalidOrderID: 4,
		InstrumentNotAvailable: 5,
		MaxOrdersExceeded: 6,
		MaxPositionsExceeded: 7,
		MaxPositionsPerHourExceeded: 8,
		Hedge: 9,
		RegulationRequired: 10,
		ConsecutiveOrdersError: 11
	}, ECancelOrderReason = {
		NULL: -1,
		Admin: 0,
		User: 1,
		Server: 2,
		Expired: 3,
		StockSplitAmountTooLow: 4
	}, ECancelOrderRejectReason = {
		NULL: -1,
		Server: 0,
		InvalidOrderID: 1
	}, EPositionStatus = {
		Open: 1,
		Closed: 2,
		Canceled: 4
	}, EPositionReasonClose = {
		MarketClosed: 1,
		LimitCall: 2,
		StopCall: 4,
		TrailingStopCall: 8,
		MarginCall: 16,
		Expired: 32,
		StockSplitAmountTooLow: 64
	}, EPositionRejectReasons = {
		NULL: -1,
		Server: 0,
		InvalidPositionID: 1
	}, EClosePositionRejectReason = {
		NULL: -1,
		Server: 0,
		InvalidPositionID: 1,
		InstrumentNotAvailable: 2,
		Hedge: 4,
		InvalidCloseAmount: 8
	}, ECancelPositionReason = {
		Admin: 0
	}, ERateAlertStatus = {
		Pending: 1,
		Fired: 2,
		Cancelled: 4,
		Rejected: 8
	}, ERateAlertRejectReason = {
		NULL: -1,
		InvalidRate: 0,
		InstrumentNotAvailable: 1,
		MaxRateAlertsPerInstrumentExceeded: 2,
		InvalidExpiryDate: 4,
		Server: 8,
		InvalidRateAlertID: 16
	}, ERateAlertCancelReason = {
		Expired: 1,
		CancelledByUser: 2,
		CancelledByAdmin: 4,
		InvalidRate: 8,
		InstrumentNotAvailable: 16,
		MaxRateAlertsPerInstrumentExceeded: 32,
		PastExpiryDate: 64
	}, ECancelRateAlertRejectReason = {
		NULL: -1,
		Server: 0,
		InvalidRateAlertID: 1
	}, EFavoriteRejectReasons = {
		NULL: -1,
		Server: 0,
		InvalidInstrumentID: 1,
		MaxExceeded: 2
	}, EInstrumentStatusChangeType = {
		InstrumentUpdate: 0,
		FeedReceive: 1,
		Initialize: 2
	},
	EPhoneVerifyType = {
		Phone: 0,
		SMS: 1
	}, EFlowPrerequisite = {
		None: 0,
		FullRegister: 1,
		Questionnaire: 2,
		Documents: 4
	}, EPayMethodFunctionality = {
		Deposit: 1,
		Withdraw: 2
	}, EPayMethodType = {
		CreditCards: 1,
		PayPal: 2,
		Wire: 4,
		BankDraft: 8,
		WebMoney: 16,
		MoneyBookers: 32,
		CashU: 64,
		AlternativeMethods: 128
	}, EMoneyBookersCCs = {
		CSI: 1,
		JCB: 2,
		AMX: 4,
		VSD: 8,
		VSE: 16,
		SLO: 32,
		LSR: 64,
		GCB: 128,
		NET: 256,
		DNK: 512,
		PSP: 1024,
		OTHER: 2147483648
	}, EMoneyBookersPMs = {
		GIR: 1,
		DID: 2,
		SFT: 4,
		ENT: 8,
		EBT: 16,
		SO2: 32,
		IDL: 64,
		NPY: 128,
		PLI: 256,
		PWY: 512,
		EPY: 1024,
		OBT: 2048,
		GLU: 4096,
		WLT: 8192
	},
	EAlternativeMethodsPMs = {
		IDeal: 1,
		Giropay: 2,
		ING: 4,
		NordeaEMaksu: 8,
		NordeaEBetalingDenmark: 16,
		NordeaEBetalingSweden: 32,
		ENets: 64,
		BPay: 128,
		Sofortuberweisung: 256,
		OnlineUberweisung: 512,
		ECard: 1024,
		WesternUnion: 2048
	}, EWireSortCodeType = {
		Swift: 1,
		Branch: 2
	}, EAlertsExecutionMethod = {
		Email: 1,
		SMS: 2,
		Push: 4
	}, EAlertType = {
		PositionOpened: 1,
		PositionClosed: 2,
		RateAlert: 3,
		Announcement: 4,
		MarginAlert: 5
	}, EAlertTypeFieldName = {
		OpenPositionNotification: 1,
		ClosePositionNotification: 2,
		AlertPriceNotification: 3,
		AnnouncementNotification: 4,
		MarginNotification: 5
	}, EPageType = {
		RegisterNewUser: 1,
		Login: 2,
		SelectAccount: 3,
		Trade: 4
	}, EAQQuestions = {
		SecuritiesExperience: 1,
		OptionsExperience: 2,
		FuturesExperience: 3,
		CommoditiesExperience: 4,
		TradedIn12MonthsGeneral: 5,
		TradedIn12MonthsCFd: 6,
		SharesExperience: 7,
		CFDExperience: 8,
		CFDKnowledgeSource: 9,
		CFDDealingFrequency: 10,
		ASICCFDKnowledgeSource: 11,
		ASICWarning: 12,
		FSAUnderstandCFD: 13
	}, EAQAnswers = {
		None: 0,
		LessThanYear: 1,
		BetweenOneToTwoYears: 2,
		BetweenThreeToFiveYears: 3,
		MoreThanFiveYears: 4,
		Yes: 5,
		No: 6,
		FiveOrLess: 7,
		SixToTwenty: 8,
		TwentyOneToFifty: 9,
		MoreThanFiftyOne: 10,
		Zero: 11,
		OneToFour: 12,
		FiveToNine: 13,
		MoreThan10: 14,
		FinanceRelatedEducationProgram: 15,
		EmploymentFinancialInstitution: 16,
		FinanceIndustryQualification: 17,
		SelfTaught: 18,
		MoreThanOncePerWeek: 19,
		MoreThanOncePerMonth: 20,
		BetweenTwoAndTwelveTimesPerYear: 21,
		LessThanTwicePerYear: 22,
		ResearchedInformationAboutMarkets: 23,
		NoKnowledgeInCFD: 24
	}, EUserFileType = {
		PhotoID: 1,
		ResidenceVerification: 2,
		AuthorisationForm: 4,
		CreditCard: 8,
		SelfPhoto: 16,
		Other: 16384
	}, EUserFileStatus = {
		Required: 1,
		Processing: 2,
		Accepted: 3,
		Rejected: 4
	}, EFileUploadResult = {
		Success: 0,
		FileTooBig: 1,
		FileMimeTypeNotSupported: 2,
		NoFileRecieved: 3,
		ServerRefused: 4
	}, EUserRegulationStatus = {
		NotRequired: 1,
		Pending: 2,
		RegulatedNotReviewed: 3,
		Regulated: 4,
		Rejected: 5
	}, ERegulationType = {
		None: 0,
		FSA: 1,
		ASIC: 2
	}, EDeployEnvironemnt = {
		Local: 0,
		QA: 1,
		Test: 2,
		Prod: 3
	}, EAddressVerifyStatus = {
		NotSent: 1,
		Sent: 2,
		Verified: 4
	}, ERequiredFilesStatusesType = {
		Deposit: 1,
		Withdraw: 2,
		TrustLevelUpgrade: 3,
		AllFiles: 4
	}, EInstrumentStatus = {
		Available: 1,
		Unavailable: 2,
		Untradable: 4,
		TotallyFreezed: 8
	}, EFeedResolutionLevel = {
		Tick: 0,
		Minute: 1,
		FiveMinutes: 2,
		FifteenMinutes: 3,
		ThirtyMinutes: 4,
		Hour: 5,
		TwoHours: 6,
		FourHours: 7,
		Day: 8,
		Week: 9
	}, FeedResolutionTime = {
		Tick: 0,
		Minute: 60,
		FiveMinutes: 300,
		FifteenMinutes: 900,
		ThirtyMinutes: 1800,
		Hour: 3600,
		TwoHours: 7200,
		FourHours: 14400,
		Day: 86400,
		Week: 604800
	}, EBankType = {
		None: 0,
		Barclays: 1,
		ABNAMRO: 2,
		IBB: 3,
		CommonwealthBankOfAustralia: 4
	}, EChallengeStatus = {
		Pending: 1,
		Cancelled: 2,
		InProgress: 4,
		Completed: 8
	}, EChallengeParticipantStatus = {
		Pending: 1,
		Rejected: 2,
		Accepted: 4,
		InProgress: 8,
		Resigned: 16,
		Eliminated: 32,
		Completed: 64
	};

function GenericEnumToString(b, c) {
	function d(e) {
		if (!("rev_dict" in d)) {
			d.rev_dict = {};
			for (var f in b) d.rev_dict[b[f]] = f
		}
		if (e in d.rev_dict) return d.rev_dict[e];
		ReportErrors("UnknownEnumToString " + c + " enum: " + e + " enum value!");
		consolePrintStackTrace();
		return -1
	}
	return d
}

function GenericStringToEnum(b, c) {
	function d(e) {
		if (e in b) return b[e];
		ReportErrors("UnknownStringToEnum " + c + " enum: " + e + " enum value!");
		consolePrintStackTrace();
		return -1
	}
	return d
}

function GenericLeftStripWrapper(b, c) {
	var d = function () {
		var e = b.apply(this, arguments);
		if (e.indexOf(c) === 0) e = e.substr(c.length);
		return e
	};
	d.f = b;
	d.token = c;
	return d
}
var StringToEBonusEvent = GenericStringToEnum(EBonusEvent, "EBonusEvent"),
	EBonusEventToString = GenericEnumToString(EBonusEvent, "EBonusEvent"),
	StringToEAlertType = GenericStringToEnum(EAlertType, "EAlertType"),
	EAlertTypeToString = GenericEnumToString(EAlertType, "EAlertType"),
	StringToEAlertsExecutionMethod = GenericStringToEnum(EAlertsExecutionMethod, "EAlertsExecutionMethod"),
	EAlertsExecutionMethodToString = GenericEnumToString(EAlertsExecutionMethod, "EAlertsExecutionMethod"),
	StringToEWCTransactionType = GenericStringToEnum(EWCTransactionType,
		"EWCTransactionType"),
	EWCTransactionTypeToString = GenericEnumToString(EWCTransactionType, "EWCTransactionType"),
	StringToEBonusType = GenericStringToEnum(EBonusType, "EBonusType"),
	EBonusTypeToString = GenericEnumToString(EBonusType, "EBonusType"),
	StringToEBonusTrnsStatus = GenericStringToEnum(EBonusTrnsStatus, "EBonusTrnsStatus"),
	EBonusTrnsStatusToString = GenericEnumToString(EBonusTrnsStatus, "EBonusTrnsStatus"),
	EBonusTrnsStatusToShortString = GenericLeftStripWrapper(EBonusTrnsStatusToString, "Bts"),
	StringToEAdjustmentType =
		GenericStringToEnum(EAdjustmentType, "EAdjustmentType"),
	EAdjustmentTypeToString = GenericEnumToString(EAdjustmentType, "EAdjustmentType"),
	StringToEWithdrawTrnsStatus = GenericStringToEnum(EWithdrawTrnsStatus, "EWithdrawTrnsStatus"),
	EWithdrawTrnsStatusToString = GenericEnumToString(EWithdrawTrnsStatus, "EWithdrawTrnsStatus"),
	EWithdrawTrnsStatusToShortString = GenericLeftStripWrapper(EWithdrawTrnsStatusToString, "Wts"),
	StringToEDepositTrnsStatus = GenericStringToEnum(EDepositTrnsStatus, "EDepositTrnsStatus"),
	EDepositTrnsStatusToString =
		GenericEnumToString(EDepositTrnsStatus, "EDepositTrnsStatus"),
	EDepositTrnsStatusToShortString = GenericLeftStripWrapper(EDepositTrnsStatusToString, "Dts"),
	StringToEClientLogLevel = GenericStringToEnum(EClientLogLevel, "EClientLogLevel"),
	EClientLogLevelToString = GenericEnumToString(EClientLogLevel, "EClientLogLevel"),
	StringToECommListType = GenericStringToEnum(ECommListType, "ECommListType"),
	ECommListTypeToString = GenericEnumToString(ECommListType, "ECommListType"),
	StringToEModificationType = GenericStringToEnum(EModificationType,
		"EModificationType"),
	EModificationTypeToString = GenericEnumToString(EModificationType, "EModificationType"),
	StringToERequestStatus = GenericStringToEnum(ERequestStatus, "ERequestStatus"),
	ERequestStatusToString = GenericEnumToString(ERequestStatus, "ERequestStatus"),
	StringToEServerErrorType = GenericStringToEnum(EServerErrorType, "EServerErrorType"),
	EServerErrorTypeToString = GenericEnumToString(EServerErrorType, "EServerErrorType"),
	StringToEInstrumentType = GenericStringToEnum(EInstrumentType, "EInstrumentType"),
	EInstrumentTypeToString = GenericEnumToString(EInstrumentType, "EInstrumentType"),
	StringToECategoryType = GenericStringToEnum(ECategoryType, "ECategoryType"),
	ECategoryTypeToString = GenericEnumToString(ECategoryType, "ECategoryType"),
	StringToEOpType = GenericStringToEnum(EOpTypeWithShort, "EOpType"),
	EOpTypeToString = GenericEnumToString(EOpType, "EOpType"),
	StringToEInstrumentAssetType = GenericStringToEnum(EInstrumentAssetType, "EInstrumentAssetType"),
	EInstrumentAssetTypeToString = GenericEnumToString(EInstrumentAssetType,
		"EInstrumentAssetType"),
	StringToEOrderStatus = GenericStringToEnum(EOrderStatus, "EOrderStatus"),
	EOrderStatusToString = GenericEnumToString(EOrderStatus, "EOrderStatus"),
	StringToEOrderEntryType = GenericStringToEnum(EOrderEntryType, "EOrderEntryType"),
	EOrderEntryTypeToString = GenericEnumToString(EOrderEntryType, "EOrderEntryType"),
	StringToEOrderRejectReason = GenericStringToEnum(EOrderRejectReason, "EOrderRejectReason"),
	EOrderRejectReasonToString = GenericEnumToString(EOrderRejectReason, "EOrderRejectReason"),
	StringToECancelOrderReason =
		GenericStringToEnum(ECancelOrderReason, "ECancelOrderReason"),
	ECancelOrderReasonToString = GenericEnumToString(ECancelOrderReason, "ECancelOrderReason"),
	StringToEPositionStatus = GenericStringToEnum(EPositionStatus, "EPositionStatus"),
	EPositionStatusToString = GenericEnumToString(EPositionStatus, "EPositionStatus"),
	StringToEPositionReasonClose = GenericStringToEnum(EPositionReasonClose, "EPositionReasonClose"),
	EPositionReasonCloseToString = GenericEnumToString(EPositionReasonClose, "EPositionReasonClose"),
	StringToEPositionRejectReasons =
		GenericStringToEnum(EPositionRejectReasons, "EPositionRejectReasons"),
	EPositionRejectReasonsToString = GenericEnumToString(EPositionRejectReasons, "EPositionRejectReasons"),
	StringToEClosePositionRejectReason = GenericStringToEnum(EClosePositionRejectReason, "EClosePositionRejectReason"),
	EClosePositionRejectReasonToString = GenericEnumToString(EClosePositionRejectReason, "EClosePositionRejectReason"),
	StringToECancelPositionReason = GenericStringToEnum(ECancelPositionReason, "ECancelPositionReason"),
	ECancelPositionReasonToString =
		GenericEnumToString(ECancelPositionReason, "ECancelPositionReason"),
	StringToECancelOrderRejectReason = GenericStringToEnum(ECancelOrderRejectReason, "ECancelOrderRejectReason"),
	ECancelOrderRejectReasonToString = GenericEnumToString(ECancelOrderRejectReason, "ECancelOrderRejectReason"),
	StringToERateAlertStatus = GenericStringToEnum(ERateAlertStatus, "ERateAlertStatus"),
	ERateAlertStatusToString = GenericEnumToString(ERateAlertStatus, "ERateAlertStatus"),
	StringToERateAlertRejectReason = GenericStringToEnum(ERateAlertRejectReason,
		"ERateAlertRejectReason"),
	ERateAlertRejectReasonToString = GenericEnumToString(ERateAlertRejectReason, "ERateAlertRejectReason"),
	StringToERateAlertCancelReason = GenericStringToEnum(ERateAlertCancelReason, "ERateAlertCancelReason"),
	ERateAlertCancelReasonToString = GenericEnumToString(ERateAlertCancelReason, "ERateAlertCancelReason"),
	StringToECancelRateAlertRejectReason = GenericStringToEnum(ECancelRateAlertRejectReason, "ECancelRateAlertRejectReason"),
	ECancelRateAlertRejectReasonToString = GenericEnumToString(ECancelRateAlertRejectReason,
		"ECancelRateAlertRejectReason"),
	StringToEFavoriteRejectReasons = GenericStringToEnum(EFavoriteRejectReasons, "EFavoriteRejectReasons"),
	EFavoriteRejectReasonsToString = GenericEnumToString(EFavoriteRejectReasons, "EFavoriteRejectReasons"),
	StringToEPayMethodType = GenericStringToEnum(EPayMethodType, "EPayMethodType"),
	EPayMethodTypeToString = GenericEnumToString(EPayMethodType, "EPayMethodType"),
	StringToEMoneyBookersCCs = GenericStringToEnum(EMoneyBookersCCs, "EMoneyBookersCCs"),
	EMoneyBookersCCsToString = GenericEnumToString(EMoneyBookersCCs,
		"EMoneyBookersCCs");

function EMoneyBookersCCsToDisplayedString(b) {
	switch (b) {
	case EMoneyBookersCCs.CSI:
		return "CartaSi";
	case EMoneyBookersCCs.JCB:
		return "JCB";
	case EMoneyBookersCCs.AMX:
		return "American Express";
	case EMoneyBookersCCs.VSD:
		return "Visa Delta/Debit";
	case EMoneyBookersCCs.VSE:
		return "Visa Electron";
	case EMoneyBookersCCs.SLO:
		return "Solo";
	case EMoneyBookersCCs.LSR:
		return "Laser";
	case EMoneyBookersCCs.GCB:
		return "GCCarte BleueB";
	case EMoneyBookersCCs.NET:
		return "Chinese Debit";
	case EMoneyBookersCCs.DNK:
		return "Dankort";
	case EMoneyBookersCCs.PSP:
		return "PostePay";
	default:
		ReportErrors("EMoneyBookersCCsToDisplayedString: Unknwon " + b + " enum value!");
		return -1
	}
}
var StringToEMoneyBookersPMs = GenericStringToEnum(EMoneyBookersPMs, "EMoneyBookersPMs"),
	EMoneyBookersPMsToString = GenericEnumToString(EMoneyBookersPMs, "EMoneyBookersPMs");

function EMoneyBookersPMsToDisplayedString(b) {
	return LangJSDict["strALTERNATIVE_PM_" + EMoneyBookersPMsToString(b)]
}
var StringToEAlternativeMethodsPMs = GenericStringToEnum(EAlternativeMethodsPMs, "EAlternativeMethodsPMs"),
	EAlternativeMethodsPMsToString = GenericEnumToString(EAlternativeMethodsPMs, "EAlternativeMethodsPMs");

function EAlternativeMethodsPMsToDisplayedString(b) {
	return LangJSDict["strALTERNATIVE_PM_" + EAlternativeMethodsPMsToString(b)]
}
var StringToEPayMethodFunctionality = GenericStringToEnum(EPayMethodFunctionality, "EPayMethodFunctionality"),
	EPayMethodFunctionalityToString = GenericEnumToString(EPayMethodFunctionality, "EPayMethodFunctionality"),
	StringToEEWireSortCodeType = GenericStringToEnum(EWireSortCodeType, "EWireSortCodeType"),
	EWireSortCodeTypeToString = GenericEnumToString(EWireSortCodeType, "EWireSortCodeType"),
	StringToEPhoneVerifyType = GenericStringToEnum(EPhoneVerifyType, "EPhoneVerifyType"),
	EPhoneVerifyTypeToString = GenericEnumToString(EPhoneVerifyType,
		"EPhoneVerifyType"),
	StringToEAQuestionsType = GenericStringToEnum(EAQQuestions, "EAQQuestions"),
	EAQuestionsTypeToString = GenericEnumToString(EAQQuestions, "EAQQuestions"),
	StringToEAQAnswersType = GenericStringToEnum(EAQAnswers, "EAQAnswers"),
	EAQAnswersTypeToString = GenericEnumToString(EAQAnswers, "EAQAnswers"),
	StringToEUserFileType = GenericStringToEnum(EUserFileType, "EUserFileType"),
	EUserFileTypeToString = GenericEnumToString(EUserFileType, "EUserFileType"),
	StringToEUserFileStatusType = GenericStringToEnum(EUserFileStatus,
		"EUserFileStatus"),
	EUserFileStatusTypeToString = GenericEnumToString(EUserFileStatus, "EUserFileStatus"),
	StringToEFileUploadResultType = GenericStringToEnum(EFileUploadResult, "EFileUploadResult"),
	EFileUploadResultTypeToString = GenericEnumToString(EFileUploadResult, "EFileUploadResult"),
	StringToEUserRegulationStatusType = GenericStringToEnum(EUserRegulationStatus, "EUserRegulationStatus"),
	EUserRegulationStatusTypeToString = GenericEnumToString(EUserRegulationStatus, "EUserRegulationStatus"),
	StringToERegulationType =
		GenericStringToEnum(ERegulationType, "ERegulationType"),
	ERegulationTypeToString = GenericEnumToString(ERegulationType, "ERegulationType"),
	StringToEDeployEnvironemntType = GenericStringToEnum(EDeployEnvironemnt, "EDeployEnvironemnt"),
	EDeployEnvironemntTypeToString = GenericEnumToString(EDeployEnvironemnt, "EDeployEnvironemnt"),
	StringToEAddressVerifyStatusType = GenericStringToEnum(EAddressVerifyStatus, "EAddressVerifyStatus"),
	EAddressVerifyStatusTypeToString = GenericEnumToString(EAddressVerifyStatus, "EAddressVerifyStatus"),
	StringToESecuredServiceResult = GenericStringToEnum(ESecuredServiceResult, "ESecuredServiceResult"),
	ESecuredServiceResultToString = GenericEnumToString(ESecuredServiceResult, "ESecuredServiceResult"),
	StringToELoginServiceResult = GenericStringToEnum(ELoginServiceResult, "ELoginServiceResult"),
	ELoginServiceResultToString = GenericEnumToString(ELoginServiceResult, "ELoginServiceResult"),
	StringToEFlowPrerequisite = GenericStringToEnum(EFlowPrerequisite, "EFlowPrerequisite"),
	EFlowPrerequisiteToString = GenericEnumToString(EFlowPrerequisite,
		"EFlowPrerequisite"),
	StringToERequiredFilesStatusesType = GenericStringToEnum(ERequiredFilesStatusesType, "ERequiredFilesStatusesType"),
	ERequiredFilesStatusesTypeToString = GenericEnumToString(ERequiredFilesStatusesType, "ERequiredFilesStatusesType"),
	StringToEInstrumentStatus = GenericStringToEnum(EInstrumentStatus, "EInstrumentStatus"),
	EInstrumentStatusToString = GenericEnumToString(EInstrumentStatus, "EInstrumentStatus"),
	StringToEFeedResolutionLevel = GenericStringToEnum(EFeedResolutionLevel, "EFeedResolutionLevel"),
	EFeedResolutionLevelToString = GenericEnumToString(EFeedResolutionLevel, "EFeedResolutionLevel"),
	StringToECreditCardsErrorReason = GenericStringToEnum(ECreditCardsErrorReason, "ECreditCardsErrorReason"),
	ECreditCardsErrorReasonToString = GenericEnumToString(ECreditCardsErrorReason, "ECreditCardsErrorReason"),
	StringToEBankType = GenericStringToEnum(EBankType, "EBankType"),
	EBankTypeToString = GenericEnumToString(EBankType, "EBankType"),
	StringToEChallengeStatus = GenericStringToEnum(EChallengeStatus, "EChallengeStatus"),
	EChallengeStatusToString = GenericEnumToString(EChallengeStatus, "EChallengeStatus"),
	StringToEChallengeParticipantStatus = GenericStringToEnum(EChallengeParticipantStatus, "EChallengeParticipantStatus"),
	EChallengeParticipantStatusToString = GenericEnumToString(EChallengeParticipantStatus, "EChallengeParticipantStatus");

function CheckPassword(b, c) {
	c = typeof c == "boolean" && c === true ? function () {} : alertDialog;
	if (b === null || b.length < GC.PASSWORD_LENGTH_MIN) {
		c(ALERT_TYPE.atError, LangJSDict.strPASSWORD_ERROR_PasswordInvalidMinLength, false, null, null);
		return false
	}
	if (b.length > GC.PASSWORD_LENGTH_MAX) {
		c(ALERT_TYPE.atError, LangJSDict.strPASSWORD_ERROR_PasswordInvalidMaxLength, false, null, null);
		return false
	}
	if (!checkRegexpString(b, GC.PASSWORD_FORMAT_REGEXP)) {
		c(ALERT_TYPE.atError, LangJSDict.strPASSWORD_ERROR_PasswordInvalidFormat,
			false, null, null);
		return false
	}
	if (checkRegexpString(b, GC.PASSWORD_TOO_EASY)) {
		c(ALERT_TYPE.atError, LangJSDict.strPASSWORD_ERROR_PasswordTooEasy, false, null, null);
		return false
	}
	if (checkRegexpString(b, new RegExp(b[0] + "{" + b.length + "}", "g"))) {
		c(ALERT_TYPE.atError, LangJSDict.strPASSWORD_ERROR_PasswordTooEasy, false, null, null);
		return false
	}
	return true
}

function CheckUserName(b) {
	if (!checkEmailString(b)) {
		alertDialog(ALERT_TYPE.atError, LangJSDict.strINVALID_EMAIL_ERROR, false, null, null);
		return false
	}
	if (checkRegexpString(b, GC.EMAIL.DOUBLE_DOT_REG_EXP)) {
		alertDialog(ALERT_TYPE.atError, LangJSDict.strINVALID_EMAIL_ERROR, false, null, null);
		return false
	}
	return true
}

function checkLength(b, c, d) {
	if (b.val().length > d || b.val().length < c) {
		b.addClass(GC.FIELD_ERR_CLASS);
		return false
	} else return true
}

function checkRegexp(b, c, d) {
	if (typeof d == "undefined") d = true;
	c = c.test(b.val());
	if (d && !c || !d && c) {
		b.addClass(GC.FIELD_ERR_CLASS);
		return false
	} else return true
}

function checkRegexpString(b, c, d) {
	if (typeof d == "undefined") d = true;
	b = c.test(b);
	return d && !b || !d && b ? false : true
}

function checkEmailString(b) {
	if (b.length > GC.EMAIL.MAX_LENGTH || b.length < GC.EMAIL.MIN_LENGTH) return false;
	if (!checkRegexpString(b, GC.EMAIL.REG_EXP)) return false;
	if (!checkRegexpString(b, GC.EMAIL.ASCII_CHARS_ONLY)) return false;
	return true
}

function checkEmail(b) {
	var c = checkEmailString(b.val());
	c || b.addClass(GC.FIELD_ERR_CLASS);
	return c
}

function checkCheckBox(b, c) {
	if (!b.is(":checked")) {
		c.addClass(GC.FIELD_ERR_CLASS);
		return false
	}
	return true
}

function checkComboBox(b, c, d) {
	if (b.val() === null || b.val() < d) {
		c.addClass(GC.FIELD_ERR_CLASS);
		return false
	}
	return true
}

function readRefererUrlFromCookie() {
	return $.cookie(appCookies.RefererUrl)
}

function writeRefererUrlCookie(b) {
	$.cookie(appCookies.RefererUrl, b, {
		expires: 30,
		path: "/"
	})
}

function readReferralIDFromCookie() {
	return $.cookie(appCookies.ReferralID)
}

function writeReferralIDCookie(b) {
	$.cookie(appCookies.ReferralID, b, {
		expires: 30,
		path: "/"
	})
}

function readReferralTagsFromCookie() {
	return $.cookie(appCookies.ReferralTags)
}

function writeReferralTagsCookie(b) {
	$.cookie(appCookies.ReferralTags, b, {
		expires: 30,
		path: "/"
	})
}

function readReferralPlainTypeFromCookie() {
	return $.cookie(appCookies.ReferralPlainType)
}

function readRefererEncryptedUserIDFromCookie() {
	return $.cookie(appCookies.RefererEncryptedUserID)
}

function readReferralDesktopDownloadIDFromCookie() {
	return $.cookie(appCookies.RefererDesktopDownloadID)
}

function writeReferralPlainTypeCookie(b) {
	$.cookie(appCookies.ReferralPlainType, b, {
		expires: 30,
		path: "/"
	})
}

function writeRefererEncryptedUserIDCookie(b) {
	$.cookie(appCookies.RefererEncryptedUserID, b, {
		expires: 30,
		path: "/"
	})
}

function writeReferralDesktopDownloadID(b) {
	$.cookie(appCookies.RefererDesktopDownloadID, b, {
		expires: 30,
		path: "/"
	})
}

function getMarketingQS() {
	var b = "";
	if (readReferralIDFromCookie() !== null) b = b + "&" + GC.TRACKING.REFERRAL_ID_QS + "=" + encodeURIComponent(readReferralIDFromCookie());
	if (readReferralTagsFromCookie() !== null) b = b + "&" + GC.TRACKING.REFERRAL_TAGS_QS + "=" + encodeURIComponent(readReferralTagsFromCookie());
	if (readReferralPlainTypeFromCookie() !== null) b = b + "&" + GC.TRACKING.REFERRAL_PL_QS + "=" + encodeURIComponent(readReferralPlainTypeFromCookie());
	if (readRefererUrlFromCookie() !== null) b = b + "&" + GC.TRACKING.REFERRAL_URL_QS + "=" +
		encodeURIComponent(readRefererUrlFromCookie());
	if (readRefererEncryptedUserIDFromCookie() !== null) b = b + "&" + GC.TRACKING.REFERRAL_ENCUID_QS + "=" + encodeURIComponent(readRefererEncryptedUserIDFromCookie());
	return b
}

function getRefererUrl() {
	var b = $("#URL_REFERRER").val();
	if (b === "") return null;
	return b
}

function getParamFromQueryStringObject(b) {
	if (!(b in queryStringObject)) return null;
	return queryStringObject[b]
}

function getRefererEncryptedUserID() {
	return getParamFromQueryStringObject(GC.TRACKING.REFERRAL_ENCUID_QS)
}

function getReferralID() {
	return getParamFromQueryStringObject(GC.TRACKING.REFERRAL_ID_QS)
}

function getReferralTags() {
	return getParamFromQueryStringObject(GC.TRACKING.REFERRAL_TAGS_QS)
}

function getReferralPlainType() {
	return getParamFromQueryStringObject(GC.TRACKING.REFERRAL_PL_QS)
}

function getReferralDesktopWindowsDownloadID() {
	return getParamFromQueryStringObject(GC.TRACKING.REFERRAL_DOWNLOADID_QS)
}

function updateMarketingCookies(b, c, d, e, f, h) {
	writeRefererEncryptedUserIDCookie(b);
	writeRefererUrlCookie(c);
	writeReferralIDCookie(d);
	writeReferralTagsCookie(e);
	writeReferralPlainTypeCookie(f);
	writeReferralDesktopDownloadID(h)
}

function clearMarketingCookies() {
	updateMarketingCookies(null, null, null, null, null, null)
}
var queryStringObject = {};
$(document).ready(function () {
	queryStringObject = $.query.get();
	var b = getRefererUrl(),
		c = getRefererEncryptedUserID(),
		d = getReferralID(),
		e = getReferralTags(),
		f = getReferralPlainType(),
		h = getReferralDesktopWindowsDownloadID();
	if (!(c === null && b === null && d === null && e === null && f === null && h === null))
		if (h !== null) {
			clearMarketingCookies();
			updateMarketingCookies(null, null, null, null, null, h)
		} else if (d !== null) {
		clearMarketingCookies();
		updateMarketingCookies(null, b, d, e, f, null)
	} else if (c !== null) {
		clearMarketingCookies();
		updateMarketingCookies(c,
			null, null, null, null, null)
	} else {
		c = readReferralIDFromCookie();
		h = readReferralTagsFromCookie();
		var g = readReferralPlainTypeFromCookie(),
			l = readRefererEncryptedUserIDFromCookie(),
			n = readReferralDesktopDownloadIDFromCookie();
		c !== null || l !== null || n !== null || c === null && h === null && g === null && updateMarketingCookies(null, b, d, e, f, null)
	}
});
var EClientMessageType = {
	KeepAlive: 0,
	GeneralInfo: 1,
	ServerReady: 3,
	CategoriesStructure: 4,
	TradeInstruments: 5,
	SubSessionEnded: 6,
	OpenPositions: 7,
	ActiveOrders: 8,
	ClosedPositions: 9,
	BuySellDialogFeed: 10,
	Feed: 11,
	NewOrder: 12,
	UpdateOrder: 13,
	ProcessOrderRejected: 14,
	ChangeOrderToPosition: 15,
	UserCancelOrder: 16,
	CancelOrder: 17,
	CancelPosition: 18,
	InstrumentsUpdate: 20,
	PositionUpdate: 25,
	ClosePosition: 26,
	ChangePositionRejected: 27,
	PositionsFeed: 28,
	OrdersFeed: 29,
	AccountValueFeed: 30,
	FavoritesInstruments: 31,
	FavoritesInstrumentsUpdate: 32,
	RateAlerts: 33,
	CancelRateAlert: 34,
	ProcessRateAlert: 35,
	DemoBalanceIncreased: 40,
	ChallengeInfo: 41,
	FeedSnapshotStartOrEnd: 42,
	FileUploadResult: 45,
	HttpSessionEnded: 100,
	SubSessionMissing: 101,
	CometUrlError: 102,
	WebPublishTermination: 103,
	EndOfMessages: 1E3
};

function VerifyProperties(b, c, d) {
	var e = "";
	if (typeof c == "object" && c !== null)
		for (var f = 0; f < b.length; f++) b[f] in c || (e = e + "['" + b[f] + "' is not in jsonObject: '" + JSON.stringify(c) + "' ]");
	else e = "VerifyProperties - jsonObject [" + c + "] is not an object!"; if (e === "") e = null;
	else if (d !== true) {
		log(e);
		consolePrintStackTrace()
	}
	return e
}
var CentralHSM = {};
CentralHSM.msgHandlers = [];
CentralHSM.BeforeHSM = function () {
	writeBackendServerSessionID(readBackendServerSessionID())
};
CentralHSM.AfterHSM = function () {};
CentralHSM.RegisterMsgHandler = function (b) {
	CentralHSM.msgHandlers.push(b)
};
CentralHSM.HandleMessages = function (b) {
	CentralHSM.BeforeHSM(b);
	for (var c = 0; c < CentralHSM.msgHandlers.length; c++) CentralHSM.msgHandlers[c](b);
	CentralHSM.AfterHSM(b)
};
$(document).ready(function () {
	if (getDisplayPageType() == EPageType.SelectAccount) $("#select_account").click(function () {
		$.cookie(appCookies.ChoseAccountModeActively, "True");
		return true
	});
	else getDisplayPageType() == EPageType.Trade && $.cookie(appCookies.ChoseAccountModeActively, null)
});
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.RegisterNewUser) {
		var b = $.cookie(appCookies.RegisterNewUserName);
		b !== null ? $("#newUserName").val(b) : $("#newUserName").val("");
		$("#password").val("");
		bindBeforeSumbitRegisterNewUser();
		writeIsRealModeToCookie($("#isRealMode").val());
		$(this).keypress(function (c) {
			(c.keyCode ? c.keyCode : c.which) == 13 && $("#registernewuser_submit_button").click()
		})
	}
});

function verifyFields() {
	var b = $("#newUserName").val();
	if (!CheckUserName(b)) return false;
	b = $("#password").val();
	if (!CheckPassword(b)) return false;
	if ($("#confirmPassword").val() != b) {
		alertDialog(ALERT_TYPE.atError, LangJSDict.strPASSWORD_ERROR_PasswordInvalidConfirmation, false, null, null);
		return false
	}
	return true
}

function bindBeforeSumbitRegisterNewUser() {
	$("#registernewuser_submit_button").bind("before_submit", function () {
		$("#newUserName").removeSpaces();
		$("#password").removeSpaces();
		$("#confirmPassword").removeSpaces();
		if (!verifyFields()) return false;
		var b = $.cookie(appCookies.PreparingForPublish);
		if (b !== null) {
			b = (new Date(b)).getTime() - (new Date).getTime();
			OpenConnectingForm(GeneralUI.ProcessLoginPosition, undefined, b, function () {
				$("#registernewuser_submit_button").click()
			});
			return false
		}
		OpenProcessingForm(GeneralUI.ProcessLoginPosition);
		$.cookie(appCookies.RegisterNewUserName, $("#newUserName").val(), {
			expires: 3650,
			path: "/"
		});
		$.cookie(appCookies.UserName, $("#newUserName").val(), {
			expires: 3650,
			path: "/"
		});
		savePasswordCookie($("#password").val(), true);
		return true
	})
}
var iphone = false,
	android = false,
	storedScrollAndroid = {}, androidTablet = false,
	ipad = false;

function scrollAndroid(b) {
	if (android)
		if (storedScrollAndroid[b]) setTimeout(function () {
			storedScrollAndroid[b].refresh()
		}, 0);
		else {
			$("#" + b).css("overflow", "hidden");
			$("#" + b).css("overflow-x", "hidden");
			$("#" + b).css("overflow-y", "hidden");
			storedScrollAndroid[b] = new iScroll(b)
		}
}

function scrollIntoView(b, c) {
	if (!android) {
		var d = $(c).scrollTop(),
			e = b.offset().top - $(c).offset().top,
			f = b.offset().top + $(b).height() - $(c).offset().top;
		if (!(e >= 0 && f <= $(c).height())) {
			b = d + e - $(c).height() / 2 + $(b).height() / 2;
			$(c).scrollTop(b)
		}
	}
}
$(document).ready(function () {
	var b = $("#button_test_area"),
		c = $.ui.dialog.prototype.open,
		d = $.ui.dialog.prototype.option,
		e = $.ui.dialog.prototype._position;
	iphone = navigator.userAgent.toLowerCase().indexOf("iphone") > -1 || navigator.userAgent.indexOf("iPad") > -1;
	android = navigator.userAgent.toLowerCase().indexOf("android") > -1;
	ipad = navigator.userAgent.indexOf("ViewPad") > -1;
	androidTablet = android && navigator.userAgent.toLowerCase().indexOf("android") > -1;
	var f = [];
	if (iphone || ipad) {
		f.push("ios");
		ipad ? f.push("iosTablet") :
			f.push("iosMobile")
	}
	if (android) {
		f.push("android");
		androidTablet ? f.push("androidTablet") : f.push("androidMobile")
	}!android && !iphone && f.push("browserPC");
	$.each(f, function (h, g) {
		$("#main-body").addClass(g)
	});
	$.ui.dialog.prototype.open = function () {
		if (iphone || android) {
			var h = d.apply(this, ["iphoneMaxWidth"]),
				g = d.apply(this, ["iphoneMaxHeight"]);
			h = (window.innerWidth - h) / 2 + 10;
			g = (window.innerHeight - g) / 2 + 10;
			if (h < 10) h = 10;
			if (g < 10) g = 10;
			if (iphone) {
				h += window.pageXOffset;
				g += window.pageYOffset
			}
			$(this.uiDialog).css("left",
				"" + h + "px");
			$(this.uiDialog).css("top", "" + g + "px");
			$.ui.dialog.prototype._position = function () {};
			d.apply(this, ["position", [h, g]])
		}
		g = c.apply(this, arguments);
		iphone || android || $(this.uiDialog).position({
			my: "center center",
			at: "center center",
			collision: "fit fit",
			of: $(".DialogCenter")
		});
		$.ui.dialog.prototype._position = e;
		return g
	};
	$("#confirm").click(function () {
		SENDImm_setUserQuetionnaireImm({
			questionAndAnswers: "OptionsExperience-BetweenOneToTwoYears,FuturesExperience-MoreThanFiveYears"
		}, function (h) {
			log(h)
		});
		alertDialog(ALERT_TYPE.atConfirmation, "@@@@@@@@@@@@@@@", false, function () {
			alert("yes")
		}, function () {
			alert("no")
		});
		return false
	});
	b.find("#success").click(function () {
		alertDialog(ALERT_TYPE.atSuccess, "VVVVVVVVVV", false, function () {
			alert("success")
		}, null);
		return false
	});
	b.find("#info").click(function () {
		alertDialog(ALERT_TYPE.atInfo, "Position has been created on your behalf. Please check now.", false, function () {
			alert("info")
		}, null);
		return false
	});
	b.find("#error1").click(function () {
		alertDialog(ALERT_TYPE.atError,
			"$$$$$$$$$$$$", false, function () {
				alert("error")
			}, null);
		return false
	});
	b.find("#warning").click(function () {
		alertDialog(ALERT_TYPE.atWarning, "--------", true, function () {
			alert("warn")
		}, null);
		return false
	})
});

function alertDialogMultipleChoice(b, c, d, e, f, h) {
	if ($(".alert_dialog").length >= GeneralUI.MaxConcurrentAlerts) ReportErrors("Already showing " + GeneralUI.MaxConcurrentAlerts + " or more alerts");
	else {
		var g = $("#alert_dialog_template").jqote({})[0].appendTo($(document.body));
		g.dialog({
			iphoneMaxWidth: 300,
			iphoneMaxHeight: 140,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.AlertMultipleChoiceWidth,
			minHeight: 70,
			closeOnEscape: false,
			close: function () {
				$(this).remove()
			}
		});
		g.find(".alert_img").removeClass("alert-dialog-img-error").removeClass("alert-dialog-img-info").removeClass("alert-dialog-img-success").removeClass("alert-dialog-img-confirm").removeClass("alert-dialog-img-warning");
		setDialogXVisibility(g, e);
		var l = g.find(".our_buttons_area");
		l.addClass("our_buttons_area_alternative_option").removeClass("our_buttons_area");
		$.each(f, function (n, m) {
			$('<div class="float alternative_option_btn"> <a class=" float std-button ' + m.Id + '" href="#"> <span>' + m.Text + "</span> </a> </div>").appendTo(l);
			l.find("." + m.Id).click(function () {
				g.dialog("close");
				m.Func instanceof Function && m.Func(g.find(".our_new_checkbox").is(":checked"))
			})
		});
		typeof h == "string" && $('<div class="clear0"></div><div class="float alert-dont-show-checkbox"> <input type="checkbox" class="our_new_checkbox" name="" value=""/></div><div class="float" style="padding-right:4px;padding-left:4px">' +
			h + "</div>").appendTo(l);
		g.parent().find(".ui-dialog-titlebar").find("span").text(c);
		g.find(".alert-dialog-msg").text(d).addClass("alert-dialog-multiple-msg").removeClass("alert-dialog-msg");
		g.find(".alert_img").addClass(ALERT_ICON_TYPE[b]);
		g.dialog("open")
	}
}

function alertDialog(b, c, d, e, f, h) {
	if ($(".alert_dialog").length >= GeneralUI.MaxConcurrentAlerts) ReportErrors("Already showing " + GeneralUI.MaxConcurrentAlerts + " or more alerts");
	else {
		var g = $("#alert_dialog_template").jqote({})[0].appendTo($(document.body));
		g.dialog({
			iphoneMaxWidth: 300,
			iphoneMaxHeight: 140,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.AlertWidth,
			minHeight: 70,
			closeOnEscape: false,
			close: function () {
				$(this).remove()
			}
		});
		g.find(".alert_img").removeClass("alert-dialog-img-error").removeClass("alert-dialog-img-info").removeClass("alert-dialog-img-success").removeClass("alert-dialog-img-confirm").removeClass("alert-dialog-img-warning");
		setDialogXVisibility(g, d);
		d = g.find(".our_buttons_area");
		switch (b) {
		case ALERT_TYPE.atError:
			g.parent().find(".ui-dialog-titlebar").find("span").text(LangJSDict.strERROR);
			g.find(".alert-dialog-msg").text(c);
			g.find(".alert_img").addClass("alert-dialog-img-error");
			addButtns(d, "btn_error_ok", LangJSDict.strOK, null, null, h);
			consolePrintStackTrace();
			g.find(".btn_error_ok").click(function () {
				g.dialog("close");
				return false
			});
			g.bind("dialogbeforeclose", function () {
				e instanceof Function && e(g.find(".our_new_checkbox").is(":checked"));
				return true
			});
			break;
		case ALERT_TYPE.atInfo:
			g.parent().find(".ui-dialog-titlebar").find("span").text(LangJSDict.strINFO);
			g.find(".alert-dialog-msg").text(c);
			g.find(".alert_img").addClass("alert-dialog-img-info");
			addButtns(d, "btn_info_ok", LangJSDict.strOK, null, null, h);
			g.find(".btn_info_ok").click(function () {
				g.dialog("close");
				e instanceof Function && e(g.find(".our_new_checkbox").is(":checked"));
				return false
			});
			break;
		case ALERT_TYPE.atSuccess:
			g.parent().find(".ui-dialog-titlebar").find("span").text(GlobalDs.Brand);
			g.find(".alert-dialog-msg").text(c);
			g.find(".alert_img").addClass("alert-dialog-img-success");
			addButtns(d, "btn_success_ok", LangJSDict.strOK, null, null, h);
			g.find(".btn_success_ok").click(function () {
				g.dialog("close");
				return false
			});
			g.bind("dialogbeforeclose", function () {
				e instanceof Function && e(g.find(".our_new_checkbox").is(":checked"));
				return true
			});
			break;
		case ALERT_TYPE.atConfirmation:
			g.parent().find(".ui-dialog-titlebar").find("span").text(LangJSDict.strCONFIRMATION);
			g.find(".alert-dialog-msg").text(c);
			g.find(".alert_img").addClass("alert-dialog-img-confirm");
			addButtns(d, "btn_confirm_yes", LangJSDict.strYES, "btn_confirm_no", LangJSDict.strNO, h);
			g.find(".btn_confirm_yes").click(function () {
				g.dialog("close");
				e instanceof Function && e(g.find(".our_new_checkbox").is(":checked"));
				return false
			});
			g.find(".btn_confirm_no").click(function () {
				g.dialog("close");
				f instanceof Function && f(g.find(".our_new_checkbox").is(":checked"));
				return false
			});
			break;
		case ALERT_TYPE.atWarning:
			g.parent().find(".ui-dialog-titlebar").find("span").text(GlobalDs.Brand);
			g.find(".alert-dialog-msg").text(c);
			g.find(".alert_img").addClass("alert-dialog-img-warning");
			addButtns(d, "btn_warning_ok", LangJSDict.strOK, null, null, h);
			g.find(".btn_warning_ok").click(function () {
				g.dialog("close");
				e instanceof Function && e(g.find(".our_new_checkbox").is(":checked"));
				return false
			});
			break;
		default:
			ReportErrors("alertDialog unknown type : " + b);
			break
		}
		g.dialog("open")
	}
}

function addButtns(b, c, d, e, f, h) {
	if (e === null) $('<div class="our_new_btn"> <a class=" float std-button ' + c + '" href="#"> <span>' + d + "</span> </a> </div>").appendTo(b);
	else {
		$('<div class="float our_confirm_btn"><a class=" float std-button ' + c + '" href="#"> <span>' + d + "</span> </a>  </div>").appendTo(b);
		$('<div class="float our_second_btn"> <a class=" float std-button ' + e + '" href="#"> <span>' + f + "</span> </a> </div>").appendTo(b)
	} if (typeof h == "string") {
		$('<div class="clear0"></div><div class="alert-dont-show-checkbox"> <input type="checkbox" class="our_new_checkbox" name="" value=""/></div><div class="float our_new_checkbox_text">' +
			h + "</div>").appendTo(b);
		b.addClass("our_buttons_area_alternative_option").removeClass("our_buttons_area")
	}
}
var ALERT_TYPE = {
	atError: 0,
	atInfo: 1,
	atSuccess: 2,
	atConfirmation: 3,
	atWarning: 4
}, ALERT_ICON_TYPE = {
		0: "alert-dialog-img-error",
		1: "alert-dialog-img-info",
		2: "alert-dialog-img-success",
		3: "alert-dialog-img-confirm",
		4: "alert-dialog-img-warning"
	};
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Login) {
		initalizeControlFromCookies();
		bindBeforeSumbitLogin();
		$(".registered-user-forgot").click(function () {
			$("#forgot_password_dialog").dialog("open");
			return false
		});
		writeIsRealModeToCookie($("#isRealMode").val());
		if (readIsRealModeToCookie().toLowerCase() !== "true") {
			ApplicationState.writeStartUpPageState(null);
			ApplicationState.writeStartUpInitiatorSubSessionID(null)
		}
		$(this).keypress(function (d) {
			(d.keyCode ? d.keyCode : d.which) == 13 && !isForgotYourPasswordDialogOpen() &&
				$("#login_submit_button").click()
		});
		var b = $("#windows-app-download").attr("href"),
			c = getMarketingQS();
		if (c !== "") b += c;
		if (typeof b == "string" && b.indexOf("?") == -1) b = b.replace("&", "?");
		$("#windows-app-download").attr("href", b)
	}
});

function isForgotYourPasswordDialogOpen() {
	return $("#forgot_password_dialog").dialog("isOpen")
}

function bindBeforeSumbitLogin() {
	$("#login_submit_button").bind("before_submit", function () {
		$("#user_name").removeSpaces();
		$("#password").removeSpaces();
		if (!checkEmailString($("#user_name").val())) {
			alertDialog(ALERT_TYPE.atError, LangJSDict.strINVALID_EMAIL_ERROR, false, null, null);
			return false
		}
		if (checkRegexpString($("#user_name").val(), GC.EMAIL.DOUBLE_DOT_REG_EXP)) {
			alertDialog(ALERT_TYPE.atError, LangJSDict.strINVALID_EMAIL_ERROR, false, null, null);
			return false
		}
		if ($("#password").val().length < GC.PASSWORD_LENGTH_MIN) {
			alertDialog(ALERT_TYPE.atError,
				LangJSDict.strPASSWORD_ERROR_PasswordInvalidMinLength, false, null, null);
			return false
		}
		var b = $.cookie(appCookies.PreparingForPublish);
		if (b !== null) {
			b = (new Date(b)).getTime() - (new Date).getTime();
			OpenConnectingForm(GeneralUI.ProcessLoginPosition, undefined, b, function () {
				$("#login_submit_button").click()
			});
			return false
		}
		$.cookie(appCookies.UserName, $("#user_name").val(), {
			expires: 3650,
			path: "/"
		});
		$("#save_password").is(":checked") === true ? savePasswordCookie($("#password").val(), true) : savePasswordCookie($("#password").val(),
			false);
		OpenProcessingForm(GeneralUI.ProcessLoginPosition);
		return true
	})
}

function initalizeControlFromCookies() {
	var b = $.cookie(appCookies.UserName),
		c = readPasswordCookie();
	b !== null ? $("#user_name").val(b) : $("#userName").val("");
	if (c !== null && !$.cookie(appCookies.PasswordDontPersist)) {
		$("#password").val(c);
		$("#save_password").prop("checked", true)
	} else {
		$("#password").val("");
		$("#save_password").prop("checked", false)
	}
}

function showButtonIfGalitEnter() {
	var b = $.cookie(appCookies.UserName);
	if (b !== null) {
		b = b.toLowerCase();
		if (b === "galit_sl@plus500.com" || b === "halel@plus.com") $("#button_test_area").removeClass("display-none-class")
	}
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Login) {
		var b = $("#forgot_password_dialog");
		b.dialog({
			iphoneMaxWidth: 400,
			iphoneMaxHeight: 260,
			autoOpen: false,
			modal: true,
			width: GeneralUI.ForgotYourPasswordWidth,
			height: GeneralUI.ForgotYourPasswordHeight,
			resizable: false
		});
		$("#forgot_psw_close").click(function () {
			b.dialog("close");
			return false
		});
		$("#forgot_psw_submit").click(function () {
			$("#forgot_psw_email-box").removeSpaces();
			var d = $("#forgot_psw_email-box").val();
			if (!CheckUserName(d)) return false;
			d = new ForgotPassword($("#forgot_psw_email-box").val());
			OpenProcessingForm(GeneralUI.ProcessLoginPosition);
			SENDImmNotLoggedIn_forgotPasswordImm(d, function (e) {
				CloseProcessingForm();
				StringToELoginServiceResult(e.LoginResultCode) == ELoginServiceResult.Success ? alertDialog(ALERT_TYPE.atInfo, LangJSDict.strPASSWORD_RESET, false, null, null) : alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" + e.LoginResultCode], false, null, null)
			});
			b.dialog("close");
			return false
		});
		var c = $.query.get("forgotPassword");
		if (c !== null &&
			c !== "") {
			$.cookie(appCookies.ChoseAccountModeActively, "True");
			$("#forgot_password_dialog").dialog("open");
			c = $.query.get("email");
			$("#forgot_psw_email-box").val(c)
		}
	}
});
var $process, $progressBarDialog, $progressBar, ProgressBar = {};
ProgressBar.updateProgressTime = 500;
ProgressBar.connectCallback = null;
ProgressBar.needToCall = false;

function OpenProcessingForm(b, c) {
	typeof b != "undefined" && $process.dialog("option", "position", b);
	if (typeof c == "undefined") {
		c = LangJSDict.strPROCESSING;
		$process.dialog("option", "width", GeneralUI.ProcessWidth)
	} else $process.dialog("option", "width", GeneralUI.ProcessWidthLong);
	$("#processing-text").text(c);
	$process.dialog("isOpen") || $process.dialog("open")
}

function CloseProcessingForm() {
	$process.dialog("isOpen") && $process.dialog("close")
}

function OpenConnectingForm(b, c, d, e) {
	ProgressBar.needToCall = true;
	ProgressBar.connectCallback = e;
	if (!(e instanceof Function)) ProgressBar.needToCall = false;
	b && $progressBarDialog.dialog("option", "position", b);
	if (typeof c == "undefined" || c === null) c = LangJSDict.strCONNECTING;
	$progressBarDialog.dialog("option", "width", GeneralUI.ProgressBarWidth);
	$("#progress_bar_text").text(c);
	if (typeof d == "undefined") ProgressBar.updateProgressTime = 500;
	else if (d <= 2E3) {
		if (ProgressBar.needToCall) {
			ProgressBar.needToCall = false;
			ProgressBar.connectCallback()
		}
		return
	} else ProgressBar.updateProgressTime = d / 95;
	$progressBar.progressbar({
		value: 0
	});
	$progressBarDialog.dialog("open");
	setTimeout(updateProgress, ProgressBar.updateProgressTime)
}

function CloseConnectingForm() {
	$progressBarDialog.dialog("close")
}

function updateProgress() {
	var b = $progressBar.progressbar("option", "value");
	if (b < 95) {
		$progressBar.progressbar("option", "value", b + 1);
		setTimeout(updateProgress, ProgressBar.updateProgressTime)
	} else if (ProgressBar.needToCall) {
		ProgressBar.needToCall = false;
		CloseConnectingForm();
		ProgressBar.connectCallback()
	}
}
$(document).ready(function () {
	$process = $("#processing_dialog");
	$progressBarDialog = $("#progress_bar_dialog_div");
	$progressBar = $("#progress_bar_div");
	var b = {
		iphoneMaxWidth: 450,
		iphoneMaxHeight: 250,
		autoOpen: false,
		modal: true,
		width: GeneralUI.ProgressBarWidth,
		closeOnEscape: false,
		minHeight: 70,
		resizable: false,
		open: function () {},
		close: function () {}
	};
	$process.dialog({
		autoOpen: false,
		modal: true,
		width: GeneralUI.ProcessWidth,
		iphoneMaxHeight: 80,
		iphoneMaxWidth: 200,
		closeOnEscape: false,
		minHeight: 70,
		resizable: false,
		open: function () {},
		close: function () {}
	}).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
	$progressBarDialog.dialog(b).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
	b = $("#button_test_area");
	b.find("#processing").click(function () {
		OpenProcessingForm(undefined, LangJSDict.strREDIRECT_TO_SECURE_SITE);
		SENDImm_getCashierHistoryImm(new CashierHistory(dateToStdFormat(new Date(2E3, 0)), GC.NIL_DATEVALUE), function () {});
		return false
	});
	b.find("#progress_bar_test").click(function () {
		OpenConnectingForm(undefined,
			undefined, 6E3, null);
		return false
	});
	if (getDisplayPageType() === EPageType.Trade) {
		b = $.cookie(appCookies.PreparingForPublish);
		if (b !== null) {
			b = (new Date(b)).getTime() - (new Date).getTime();
			OpenConnectingForm(undefined, undefined, b, MainHSM.ReconnectLogin);
			return false
		}
	}
});
var GlobalDs = {
	GeneralInfoReceived: false,
	StartUpFlowExecuted: false,
	Brand: null,
	UserBaseCurrencySymbol: null,
	UserBaseCurrShowCents: null,
	UserBaseCurrShowOnLeft: null,
	IsRealMode: null,
	UserName: null,
	DepositPrerequisites: null,
	WithdrawPrerequisites: null,
	RegulationStatus: null,
	IsDeposited: null,
	AddressVerifyStatus: null,
	DSHasOnlyLiveOrders: null,
	ShowedBonus: null,
	Bonuses: null,
	Lang2CharsCode: $.cookie(appCookies.Lang2CharsCode),
	PersonalInfo: {
		FName: null,
		LName: null,
		Phone: null,
		IsEmailValidated: null,
		IsPhoneValidated: null,
		Country: null,
		City: null,
		Address: null,
		Zip: null,
		DateOfBirth: null
	},
	LinksInfo: {
		UserAgreementLink: null,
		ProductDisclosureStatementLink: null,
		FinancialServiceGuideLink: null,
		RiskWarningLink: null,
		OrderExecutionPolicyLink: null,
		PrivacyPolicyLink: null,
		HomeWithParamsLink: null,
		TraderPointsLink: null
	},
	ChallengeInfo: null,
	HasCashierInfo: false,
	CashierInfo: {
		NumOfPendingWithdrawals: null,
		IsNeedPhoneVerificationBeforeDeposit: null,
		depositFailedPhoneVerifyNeeded: false,
		IsNeedPhoneVerificationBeforeWithdraw: false,
		PayMethods: [{
			PayMethodType: null,
			Functionality: null,
			MinDepositAmount: null,
			MaxDepositAmount: null,
			MinWithdrawAmount: null,
			MaxWithdrawAmount: null,
			MergeOption: null
		}],
		MoneyBookersCCs: null,
		MoneyBookersPMs: null,
		AlternativeMethodsPMs: null,
		LastSuccessfulPayMethodsInfo: null
	},
	AccountValue: {
		Balance: 0,
		Equity: 0,
		AvailableBalance: 0,
		InitialMargin: 0,
		MaintenanceMargin: 0,
		PendingBonuses: 0,
		Bonuses: 0,
		AvailableBalanceForCashout: 0,
		TotalNetProfitLoss: 0
	},
	SearchInstrumentInfoes: null
};
GlobalDs.fillAccountValue = function (b, c, d, e, f, h, g, l, n) {
	GlobalDs.AccountValue.Balance = b;
	GlobalDs.AccountValue.Equity = c;
	GlobalDs.AccountValue.AvailableBalance = d;
	GlobalDs.AccountValue.InitialMargin = e;
	GlobalDs.AccountValue.MaintenanceMargin = f;
	GlobalDs.AccountValue.PendingBonuses = h;
	GlobalDs.AccountValue.Bonuses = g;
	GlobalDs.AccountValue.AvailableBalanceForCashout = l;
	GlobalDs.AccountValue.TotalNetProfitLoss = n
};
GlobalDs.fillGeneralInfo = function (b, c, d, e, f, h, g, l, n, m, q, o) {
	GlobalDs.GeneralInfoReceived = true;
	GlobalDs.Brand = b;
	GlobalDs.IsRealMode = c;
	GlobalDs.UserName = d;
	GlobalDs.UserBaseCurrencySymbol = e;
	GlobalDs.UserBaseCurrShowOnLeft = f;
	GlobalDs.UserBaseCurrShowCents = h;
	GlobalDs.IsDeposited = n;
	GlobalDs.IsChatEnabled = m;
	GlobalDs.RegulationStatus = StringToEUserRegulationStatusType(q);
	GlobalDs.AddressVerifyStatus = StringToEAddressVerifyStatusType(o);
	GlobalDs.DepositPrerequisites = [];
	GlobalDs.WithdrawPrerequisites = [];
	$.each(g,
		function (t, w) {
			GlobalDs.DepositPrerequisites.push(StringToEFlowPrerequisite(w))
		});
	$.each(l, function (t, w) {
		GlobalDs.WithdrawPrerequisites.push(StringToEFlowPrerequisite(w))
	})
};
GlobalDs.fillPersonalInfo = function (b, c, d, e, f, h, g, l, n, m) {
	GlobalDs.PersonalInfo.FName = b;
	GlobalDs.PersonalInfo.LName = c;
	GlobalDs.PersonalInfo.Phone = d;
	GlobalDs.PersonalInfo.IsEmailValidated = e;
	GlobalDs.PersonalInfo.IsPhoneValidated = f;
	GlobalDs.PersonalInfo.Country = h;
	GlobalDs.PersonalInfo.City = g;
	GlobalDs.PersonalInfo.Address = l;
	GlobalDs.PersonalInfo.Zip = n;
	GlobalDs.PersonalInfo.DateOfBirth = stdFormatToDate(m);
	selectMenuOnSetIsEmailValidated(e);
	e && $email_validation.dialog("isOpen") && $email_validation.dialog("close")
};
GlobalDs.fillLinksInfo = function (b, c, d, e, f, h, g, l, n) {
	GlobalDs.LinksInfo.UserAgreementLink = b;
	GlobalDs.LinksInfo.ProductDisclosureStatementLink = c;
	GlobalDs.LinksInfo.FinancialServiceGuideLink = d;
	GlobalDs.LinksInfo.RiskWarningLink = e;
	GlobalDs.LinksInfo.OrderExecutionPolicyLink = f;
	GlobalDs.LinksInfo.PrivacyPolicyLink = h;
	GlobalDs.LinksInfo.HomeWithParamsLink = g;
	GlobalDs.LinksInfo.TraderPointsLink = l;
	GlobalDs.LinksInfo.ChatLink = n
};
GlobalDs.fillChallengeInfo = function (b, c) {
	if (b && c !== null)
		if (b = VerifyProperties(["ChallengeID", "ChallengeCode", "Name", "Status", "ParticipantStatus", "StartTime", "EndTime"], c)) ReportErrors(b);
		else GlobalDs.ChallengeInfo = {
			ChallengeID: c.ChallengeID,
			ChallengeCode: c.ChallengeCode,
			Name: c.Name,
			Status: StringToEChallengeStatus(c.Status),
			ParticipantStatus: StringToEChallengeParticipantStatus(c.ParticipantStatus),
			StartTime: stdFormatToDate(c.StartTime),
			EndTime: stdFormatToDate(c.EndTime)
		};
		else GlobalDs.ChallengeInfo =
			null
};
GlobalDs.emptyCashierInfo = function () {
	this.HasCashierInfo = false
};
GlobalDs.fillCashierInfo = function (b) {
	var c = VerifyProperties(["NumOfPendingWithdrawals", "IsNeedPhoneVerificationBeforeDeposit", "PayMethods", "MoneyBookersCCs", "MoneyBookersPMs", "AlternativeMethodsPMs"], b);
	if (c) ReportErrors(c);
	else {
		this.CashierInfo.NumOfPendingWithdrawals = b.NumOfPendingWithdrawals;
		this.CashierInfo.IsNeedPhoneVerificationBeforeDeposit = b.IsNeedPhoneVerificationBeforeDeposit;
		this.CashierInfo.PayMethods = [];
		this.CashierInfo.MoneyBookersCCs = [];
		this.CashierInfo.MoneyBookersPMs = [];
		this.CashierInfo.AlternativeMethodsPMs = [];
		for (var d = 0; d < b.PayMethods.length; d++) {
			var e = b.PayMethods[d];
			if (c = VerifyProperties(["PayMethodType", "Functionality", "MinDepositAmount", "MaxDepositAmount", "MinWithdrawAmount", "MaxWithdrawAmount", "MergeOption"], e)) {
				ReportErrors(c);
				return
			}
			c = {
				PayMethodType: StringToEPayMethodType(e.PayMethodType),
				Functionality: [],
				MinDepositAmount: e.MinDepositAmount,
				MaxDepositAmount: e.MaxDepositAmount,
				MinWithdrawAmount: e.MinWithdrawAmount,
				MaxWithdrawAmount: e.MaxWithdrawAmount,
				BankType: StringToEBankType(e.BankType),
				MergeOption: e.MergeOption
			};
			if (e.Functionality !== null)
				for (var f = 0; f < e.Functionality.length; f++) c.Functionality.push(StringToEPayMethodFunctionality(e.Functionality[f]));
			this.CashierInfo.PayMethods.push(c)
		}
		if (b.MoneyBookersCCs instanceof Array)
			for (d = 0; d < b.MoneyBookersCCs.length; d++) this.CashierInfo.MoneyBookersCCs.push(StringToEMoneyBookersCCs(b.MoneyBookersCCs[d]));
		if (b.AlternativeMethodsPMs instanceof Array)
			for (d = 0; d < b.AlternativeMethodsPMs.length; d++) this.CashierInfo.AlternativeMethodsPMs.push(StringToEAlternativeMethodsPMs(b.AlternativeMethodsPMs[d]));
		if (b.MoneyBookersPMs instanceof Array)
			for (d = 0; d < b.MoneyBookersPMs.length; d++)
				if (!(b.AlternativeMethodsPMs instanceof Array) || $.inArray(GC.MB_TO_ALTERNATIVE[b.MoneyBookersPMs[d]], b.AlternativeMethodsPMs) < 0) this.CashierInfo.MoneyBookersPMs.push(StringToEMoneyBookersPMs(b.MoneyBookersPMs[d]));
		this.CashierInfo.LastSuccessfulPayMethodsInfo = GetPropDefault(b, "LastSuccessfulPayMethodsInfo", null);
		this.HasCashierInfo = true
	}
};
GlobalDs.getBonusesInfoFromServer = function () {
	SENDImm_getAvailableBonusesImm({}, function (b) {
		var c = VerifyProperties(["AvailableBonuses"], b);
		if (c) ReportErrors(c);
		else {
			GlobalDs.fillBonusesInfo(b.AvailableBonuses);
			createBonusLinkText()
		}
	})
};
GlobalDs.fillBonusesInfo = function (b) {
	GlobalDs.Bonuses = [];
	for (var c = 0; c < b.length; c++) {
		var d = b[c],
			e = VerifyProperties(["BonusEventType", "BonusAmountInUBC", "MinDepositAmountInUBC", "BonusCode", "RequiredVolume"], d);
		if (e) {
			ReportErrors(e);
			return
		}
		GlobalDs.Bonuses.push({
			BonusCode: d.BonusCode,
			BonusEventType: StringToEBonusEvent(d.BonusEventType),
			BonusAmountInUBC: d.BonusAmountInUBC,
			MinDepositAmountInUBC: d.MinDepositAmountInUBC,
			RequiredVolume: d.RequiredVolume
		})
	}
};
GlobalDs.CashierInfo.IsValidPayMethod = function (b, c) {
	for (var d = 0; d < this.PayMethods.length; d++) {
		var e = this.PayMethods[d];
		if (e.PayMethodType == b)
			if ($.inArray(c, e.Functionality) >= 0) return true
	}
	return false
};
GlobalDs.CashierInfo.GetPayMethod = function (b) {
	for (var c = 0; c < this.PayMethods.length; c++) {
		var d = this.PayMethods[c];
		if (d.PayMethodType == b) return d
	}
	return null
};
GlobalDs.IsDepositPrerequisiteFullFilled = function (b) {
	return $.inArray(b, GlobalDs.DepositPrerequisites) == -1
};
GlobalDs.IsWithdrawPrerequisiteFullFilled = function (b) {
	return $.inArray(b, GlobalDs.WithdrawPrerequisites) == -1
};
GlobalDs.MarkFlowPrerequisiteAsFullFilled = function (b) {
	GlobalDs.MarkDepositFlowPrerequisiteAsFullFilled(b);
	GlobalDs.MarkWithdrawFlowPrerequisiteAsFullFilled(b)
};
GlobalDs.MarkDepositFlowPrerequisiteAsFullFilled = function (b) {
	b = $.inArray(b, GlobalDs.DepositPrerequisites);
	b != -1 && GlobalDs.DepositPrerequisites.remove(b)
};
GlobalDs.MarkWithdrawFlowPrerequisiteAsFullFilled = function (b) {
	b = $.inArray(b, GlobalDs.WithdrawPrerequisites);
	b != -1 && GlobalDs.WithdrawPrerequisites.remove(b)
};
GlobalDs.formatMoneyAmount = function (b, c, d, e) {
	return genericFormatMoneyAmount(b, c ? GlobalDs.UserBaseCurrencySymbol : null, d, GlobalDs.UserBaseCurrShowCents, GlobalDs.UserBaseCurrShowOnLeft, e)
};
GlobalDs.shouldReverseTrendColors = function () {
	return GlobalDs.PersonalInfo.Country.toLowerCase() == "china" && GlobalDs.Lang2CharsCode == "cn"
};
var DSHSM = {};
DSHSM.BeforeHSM = function () {};
DSHSM.AfterHSM = function () {};
DSHSM.AccountValueArrived = function (b) {
	if (GlobalDs.UserBaseCurrencySymbol === null) log("account value feed arrived before general info ");
	else {
		var c = VerifyProperties(["Balance", "Equity", "AvailableBalance", "InitialMargin", "MaintenanceMargin", "PendingBonuses", "Bonuses", "AvailableBalanceForCashout", "TotalNetProfitLoss"], b);
		if (c) ReportErrors(c);
		else {
			GlobalDs.fillAccountValue(b.Balance, b.Equity, b.AvailableBalance, b.InitialMargin, b.MaintenanceMargin, b.PendingBonuses, b.Bonuses, b.AvailableBalanceForCashout,
				b.TotalNetProfitLoss);
			log(b)
		}
	}
};
DSHSM.HandleGeneralInfo = function (b) {
	var c = GlobalDs.GeneralInfoReceived,
		d = VerifyProperties(["BackendServerSessionID", "Brand", "UserBaseCurrSymbol", "UserBaseCurrShowCents", "UserBaseCurrShowOnLeft", "UserName", "IsRealMode", "DepositPrerequisites", "WithdrawPrerequisites", "PersonalInfo", "LinksInfo", "IsDeposited", "RegulationStatus", "AddressVerifyStatus", "IsChatEnabled"], b);
	if (d) ReportErrors(d);
	else {
		writeBackendServerSessionID(b.BackendServerSessionID);
		GlobalDs.fillGeneralInfo(b.Brand, b.IsRealMode, b.UserName,
			b.UserBaseCurrSymbol, b.UserBaseCurrShowOnLeft, b.UserBaseCurrShowCents, b.DepositPrerequisites, b.WithdrawPrerequisites, b.IsDeposited, b.IsChatEnabled, b.RegulationStatus, b.AddressVerifyStatus);
		var e = b.PersonalInfo;
		if (d = VerifyProperties(["FName", "LName", "Phone", "IsEmailValidated", "IsPhoneValidated", "Country", "City", "Address", "Zip"], e)) ReportErrors(d);
		else {
			GlobalDs.fillPersonalInfo(e.FName, e.LName, e.Phone, e.IsEmailValidated, e.IsPhoneValidated, e.Country, e.City, e.Address, e.Zip, e.DateOfBirth);
			b = b.LinksInfo;
			if (d = VerifyProperties(["UserAgreementLink", "ProductDisclosureStatementLink", "FinancialServiceGuideLink", "RiskWarningLink", "OrderExecutionPolicyLink", "PrivacyPolicyLink", "HomeWithParamsLink", "TraderPointsLink", "ChatLink"], b)) ReportErrors(d);
			else {
				GlobalDs.fillLinksInfo(b.UserAgreementLink, b.ProductDisclosureStatementLink, b.FinancialServiceGuideLink, b.RiskWarningLink, b.OrderExecutionPolicyLink, b.PrivacyPolicyLink, b.HomeWithParamsLink, b.TraderPointsLink, b.ChatLink);
				if (!c) {
					SEND_getCategoriesStructure();
					SEND_getFavoritesInstruments();
					SEND_getRateAlerts();
					SEND_getOpenPositions();
					SEND_getActiveOrders({
						IsOnlyLiveOrders: true
					});
					!GlobalDs.IsRealMode && GlobalDs.Brand === "Plus500" && SEND_getChallengeInfo()
				}
			}
		}
	}
};
DSHSM.HandleMessages = function (b) {
	DSHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.GeneralInfo:
			DSHSM.HandleGeneralInfo(d);
			break;
		default:
			break
		}
	});
	DSHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(DSHSM.HandleMessages);
var RANGE_INSTRUMENT = 1,
	RANGE_INDEPENDENT = 2,
	IndicatorTypeParams = {}, EIndicatorType = {}, EMovingAverageTypes = {
		Simple: 1,
		Exponential: 2,
		Weighted: 3
	};

function max_arr(b) {
	return Math.max.apply(Math, b)
}

function min_arr(b) {
	return Math.min.apply(Math, b)
}

function sum_arr(b) {
	for (var c = b.length, d = 0, e = 0; e < c; e++) d += b[e];
	return d
}

function avg_arr(b) {
	return sum_arr(b) / b.length
}

function mult_arrays(b, c) {
	for (var d = b.length, e = [], f = 0; f < d; f++) e.push(b[f] * c[f]);
	return e
}

function square_arr(b) {
	return mult_arrays(b, b)
}

function add_to_array(b, c) {
	for (var d = b.length, e = [], f = 0; f < d; f++) e.push(b[f] + c);
	return e
}

function xrange(b, c) {
	var d = [];
	for (b = b; b < c; b++) d.push(b);
	return d
}

function UpdateStatic() {
	return [this.Value]
}

function UpdateMovingAverage(b) {
	this.History.push(b);
	this.Sum += b;
	if (this.History.length >= this.Period) {
		if (this.History.length > this.Period) this.Sum -= this.History.shift();
		if (this.AverageType == EMovingAverageTypes.Simple) return [this.Sum / this.Period];
		else if (this.AverageType == EMovingAverageTypes.Weighted) {
			for (var c = b = 0; c < this.Period; c++) b += (c + 1) * this.History[c];
			return [b / (this.Period * (this.Period + 1) / 2)]
		} else {
			if (this.ExpMovingAvg === 0) this.ExpMovingAvg = this.Sum / this.Period;
			else this.ExpMovingAvg += (b - this.ExpMovingAvg) *
				(2 / (1 + this.Period));
			return [this.ExpMovingAvg]
		}
	}
	return null
}

function UpdateRSI(b) {
	if (!this.PrevClose) {
		this.PrevClose = b;
		return [100]
	}
	this.Cnt++;
	var c = 0,
		d = 0;
	if (b > this.PrevClose) c = b - this.PrevClose;
	else d = this.PrevClose - b; if (this.Cnt >= this.Period) {
		this.AvgLoss = (this.AvgLoss * (this.Period - 1) + d) / this.Period;
		this.AvgGain = (this.AvgGain * (this.Period - 1) + c) / this.Period;
		c = 100;
		if (this.AvgLoss !== 0) c = 100 - 100 / (1 + this.AvgGain / this.AvgLoss);
		this.PrevClose = b;
		return [c]
	} else {
		this.AvgLoss += d / this.Period;
		this.AvgGain += c / this.Period;
		return null
	}
}

function UpdateBollingerBands(b) {
	this.History.push(b);
	if (this.History.length >= this.Period) {
		var c = sum_arr(this.History) / this.Period;
		if (this.Exp) {
			if (this.ExpMovingAvg === 0) this.ExpMovingAvg = c;
			else this.ExpMovingAvg += (b - this.ExpMovingAvg) * (2 / (1 + this.Period));
			c = this.ExpMovingAvg
		}
		for (var d = b = 0; d < this.Period; d++) b += (this.History[d] - c) * (this.History[d] - c);
		b = Math.sqrt(b / (this.Period - 1));
		this.History.shift();
		return [c + this.K * b, c, c - this.K * b]
	}
	return null
}

function UpdateMomentum(b) {
	this.History.push(b);
	if (this.History.length >= this.Period) {
		var c = this.History.shift();
		return [b / c * 100]
	}
	return null
}

function UpdateMACD(b) {
	this.Cnt++;
	this.Short += this.Cnt <= this.PeriodShort ? b / this.PeriodShort : (b - this.Short) * (2 / (1 + this.PeriodShort));
	this.Long += this.Cnt <= this.PeriodLong ? b / this.PeriodLong : (b - this.Long) * (2 / (1 + this.PeriodLong));
	if (this.Cnt < this.PeriodLong) return null;
	else if (this.Cnt <= this.PeriodLong + this.Period) {
		this.Signal += (this.Short - this.Long) / this.Period;
		return null
	} else {
		this.Signal += (this.Short - this.Long - this.Signal) * (2 / (1 + this.Period));
		return [this.Short - this.Long - this.Signal, this.Short - this.Long,
			this.Signal]
	}
}

function UpdateParabolicSAR(b, c, d) {
	if (!this.LastSAR) {
		this.LastSAR = d;
		this.History = [c, d, c, d, c];
		return null
	}
	if (this.Long && this.History[0] < c) this.History[0] = c;
	if (!this.Long && this.History[0] > d) this.History[0] = d;
	this.History = [this.History[0], this.History[3], this.History[4], d, c];
	if (!this.EP) {
		this.EP = this.History[0];
		this.AF = this.Alpha;
		return null
	}
	b = this.AF * Math.abs(this.EP - this.LastSAR);
	if (this.Long)
		if (this.LastSAR + b > d) {
			this.LastSAR = this.EP;
			this.EP = d;
			this.History[0] = d;
			this.AF = this.Alpha;
			this.Long = false
		} else {
			if (this.EP !=
				max_arr(this.History)) {
				this.EP = max_arr(this.History);
				if (this.AF < this.MaxAlpha + 1.0E-6) this.AF += this.Alpha
			}
			this.EP = max_arr(this.History);
			this.LastSAR = Math.min(this.LastSAR + b, this.History[1], this.History[3])
		} else if (this.LastSAR - b < c) {
		this.LastSAR = this.EP;
		this.EP = c;
		this.Long = true;
		this.History[0] = c;
		this.AF = this.Alpha
	} else {
		if (this.EP != min_arr(this.History)) {
			this.EP = min_arr(this.History);
			if (this.AF < this.MaxAlpha + 1.0E-6) this.AF += this.Alpha
		}
		this.LastSAR = Math.max(this.LastSAR - b, this.History[2], this.History[4])
	}
	return [this.LastSAR]
}

function UpdateTrueRange(b, c, d) {
	if (this.LastClose === 0) {
		this.LastClose = b;
		return null
	}
	this.Cnt += 1;
	c = Math.max(c - d, Math.abs(c - this.LastClose), Math.abs(this.LastClose - d));
	this.History.push(c);
	this.LastClose = b;
	if (this.Cnt < this.Period) {
		this.TR += c / this.Period;
		return [this.TR / this.Cnt * this.Period]
	} else {
		this.TR += (c - this.TR) * (2 / (1 + this.Period));
		return [this.TR]
	}
}

function UpdateAlligator(b) {
	this.History.push(b);
	b = max_arr([this.PeriodSlow + this.ShiftSlow, this.PeriodMid + this.ShiftMid, this.PeriodFast + this.ShiftFast]);
	if (this.History.length < b) return null;
	this.History.length > b && this.History.shift();
	this.AvgSlow = sum_arr(this.History.slice(-this.PeriodSlow - this.ShiftSlow, -this.ShiftSlow)) / this.PeriodSlow;
	this.AvgMid = sum_arr(this.History.slice(-this.PeriodMid - this.ShiftMid, -this.ShiftMid)) / this.PeriodMid;
	this.AvgFast = sum_arr(this.History.slice(-this.PeriodFast - this.ShiftFast, -this.ShiftFast)) / this.PeriodFast;
	return [this.AvgSlow, this.AvgMid, this.AvgFast]
}

function UpdateCCI(b, c, d) {
	b = (b + c + d) / 3;
	this.History.push(b);
	this.SMATP += b / this.Period;
	if (this.History.length >= this.Period) {
		if (this.History.length > this.Period) this.SMATP -= this.History.shift() / this.Period;
		for (d = c = 0; d < this.Period; d++) c += Math.abs(this.History[d] - this.SMATP);
		c /= this.Period;
		if (c === 0) return [0];
		return [(b - this.SMATP) / (0.015 * c)]
	} else return null
}

function UpdateDeMarker(b, c, d) {
	if (this.PrevHigh === 0) {
		this.PrevHigh = c;
		this.PrevLow = d;
		return null
	}
	var e = b = 0;
	if (c > this.PrevHigh) e = (c - this.PrevHigh) / this.Period;
	if (d < this.PrevLow) b = (this.PrevLow - d) / this.Period;
	this.PrevHigh = c;
	this.PrevLow = d;
	this.History.push([b, e]);
	this.DeMin += b;
	this.DeMax += e;
	if (this.History.length >= this.Period) {
		if (this.History.length > this.Period) {
			c = this.History.shift();
			this.DeMin -= c[0];
			this.DeMax -= c[1]
		}
		return this.DeMin + this.DeMax === 0 ? [0.5] : [this.DeMax / (this.DeMin + this.DeMax)]
	} else return null
}

function UpdateEnvelopes(b) {
	b = b / this.Period;
	this.MA += b;
	this.History.push(b);
	if (this.History.length >= this.Period) {
		if (this.History.length > this.Period) this.MA -= this.History.shift();
		return [this.MA - this.MA * this.Distance / 100, this.MA + this.MA * this.Distance / 100]
	} else return null
}

function UpdateLinearReg(b) {
	if (this.History.length === 0) {
		this.X = xrange(0, this.Period);
		this.SigmaX = sum_arr(this.X);
		this.SigmaXSquared = sum_arr(square_arr(this.X))
	}
	this.History.push(b);
	if (this.History.length >= this.Period) {
		this.History.length > this.Period && this.History.shift();
		b = sum_arr(this.History);
		var c = this.Period * sum_arr(mult_arrays(this.X, this.History)) - b * this.SigmaX;
		c /= this.Period * this.SigmaXSquared - this.SigmaX * this.SigmaX;
		return [(b - c * this.SigmaX) / this.Period + c * this.Period]
	} else return null
}

function UpdateSTDDEV(b) {
	this.History.push(b);
	if (this.History.length >= this.Period) {
		this.History.length > this.Period && this.History.shift();
		b = sum_arr(this.History) / this.Period;
		return [Math.pow(sum_arr(square_arr(add_to_array(this.History, -b))) / this.Period, 0.5)]
	} else return null
}

function UpdateWilliamsR(b, c, d) {
	this.History.push(c);
	this.History.push(d);
	if (this.History.length >= this.Period * 2) {
		if (this.History.length > this.Period * 2) {
			this.History.shift();
			this.History.shift()
		}
		c = max_arr(this.History);
		d = min_arr(this.History);
		if (c == d) return [-50];
		return [(c - b) / (c - d) * -100]
	} else return null
}

function UpdateStochastic(b, c, d) {
	this.History.push(c);
	this.History.push(d);
	if (this.History.length >= this.Period * 2) {
		if (this.History.length > this.Period * 2) {
			this.History.shift();
			this.History.shift()
		}
		d = max_arr(this.History);
		var e = min_arr(this.History);
		c = 50;
		if (d != e) c = (b - e) / (d - e) * 100;
		this.History2.push(c);
		b = this.AvgPeriod;
		this.Fast || (b = this.AvgPeriod * 2 - 1);
		if (this.History2.length >= b) {
			this.History2.length > b && this.History2.shift();
			if (this.Fast) return [c, avg_arr(this.History2)];
			else {
				c = [];
				for (d = 0; d < this.AvgPeriod; d++) c.push(avg_arr(this.History2.slice(d,
					d + this.AvgPeriod)));
				return [avg_arr(this.History2.slice(this.AvgPeriod - 1, b)), avg_arr(c)]
			}
		} else return null
	} else return null
}

function UpdateKAMA(b) {
	this.History.push(b);
	if (this.History.length >= this.Period) {
		this.History.length > this.Period && this.History.shift();
		for (var c = 0, d = 1; d < this.Period; d++) c += Math.abs(this.History[d] - this.History[d - 1]);
		if (c === 0) c = 1;
		c = Math.abs(b - this.History[0]) / c;
		c = c * 0.6015 + 0.0645;
		c = c * c;
		if (this.KAMA === 0) this.KAMA = b;
		else this.KAMA += c * (b - this.KAMA);
		return [this.KAMA]
	} else return null
}

function UpdateADX(b, c, d) {
	if (this.PrevClose === 0) {
		this.PrevClose = b;
		this.PrevHigh = c;
		this.PrevLow = d;
		this.Mult = 2 / (this.Period + 1);
		return null
	}
	var e = Math.max(c - d, Math.abs(c - this.PrevClose), Math.abs(this.PrevClose - d));
	if (this.Cnt < this.Period) this.TR += e / this.Period;
	else this.TR = (this.TR * (this.Period - 1) + e) / this.Period;
	e = 0;
	var f = Math.max(0, c - this.PrevHigh),
		h = Math.max(0, this.PrevLow - d);
	if (f > h) h = 0;
	if (h > f) f = 0;
	if (f == h || this.TR === 0 || c < this.PrevHigh && d > this.PrevLow) h = f = 0;
	else {
		f /= this.TR;
		h /= this.TR
	}
	this.PrevClose =
		b;
	this.PrevHigh = c;
	this.PrevLow = d;
	if (this.Cnt < this.Period) {
		this.Cnt += 1;
		this.DI_POS += f / this.Period;
		this.DI_NEG += h / this.Period;
		if (this.DI_POS + this.DI_NEG) e = Math.abs((this.DI_POS - this.DI_NEG) / (this.DI_POS + this.DI_NEG));
		this.DX += e / this.Period;
		return null
	} else {
		this.DI_POS = (this.DI_POS * (this.Period - 1) + f) / this.Period;
		this.DI_NEG = (this.DI_NEG * (this.Period - 1) + h) / this.Period;
		if (this.DI_POS + this.DI_NEG) e = Math.abs((this.DI_POS - this.DI_NEG) / (this.DI_POS + this.DI_NEG));
		this.DX = (this.DX * (this.Period - 1) + e) / this.Period;
		return [this.DX * 100, this.DI_POS * 100, this.DI_NEG * 100]
	}
}

function IndicatorResetState() {
	for (var b in IndicatorTypeParams[this.TypeName].InternalState)
		if (IndicatorTypeParams[this.TypeName].InternalState.hasOwnProperty(b)) this[b] = IndicatorTypeParams[this.TypeName].InternalState[b];
	this.History = [];
	this.History2 = []
}

function IndicatorSaveState() {
	for (var b in IndicatorTypeParams[this.TypeName].InternalState)
		if (this.hasOwnProperty(b)) this["Backup_" + b] = this[b];
	this.HistoryBackup = this.History.slice();
	this.History2Backup = this.History2.slice()
}

function IndicatorRestoreState() {
	for (var b in IndicatorTypeParams[this.TypeName].InternalState)
		if (this.hasOwnProperty(b)) this[b] = this["Backup_" + b];
	this.History = this.HistoryBackup.slice();
	this.History2 = this.History2Backup.slice()
}
IndicatorTypeParams = {
	Static: {
		Type: 0,
		Outputs: 1,
		Range: RANGE_INSTRUMENT,
		DefaultParams: {
			Value: 0
		},
		InternalState: {},
		Update: UpdateStatic
	},
	ADX: {
		Type: 17,
		Outputs: 3,
		Range: RANGE_INDEPENDENT,
		DefaultParams: {
			Period: 14
		},
		InternalState: {
			Cnt: 0,
			PrevClose: 0,
			PrevHigh: 0,
			PrevLow: 0,
			DI_POS: 0,
			DI_NEG: 0,
			TR: 0,
			DX: 0
		},
		Update: UpdateADX
	},
	Alligator: {
		Type: 8,
		Outputs: 3,
		Range: RANGE_INSTRUMENT,
		DefaultParams: {
			PeriodSlow: 13,
			PeriodMid: 8,
			PeriodFast: 5,
			ShiftSlow: 8,
			ShiftMid: 5,
			ShiftFast: 3
		},
		InternalState: {
			AvgSlow: 0,
			AvgMid: 0,
			AvgFast: 0
		},
		Update: UpdateAlligator
	},
	TrueRange: {
		Type: 7,
		Outputs: 1,
		Range: RANGE_INDEPENDENT,
		DefaultParams: {
			Period: 14
		},
		InternalState: {
			LastClose: 0,
			TR: 0,
			Cnt: 0
		},
		Update: UpdateTrueRange
	},
	BollingerBands: {
		Type: 3,
		Outputs: 3,
		Range: RANGE_INSTRUMENT,
		DefaultParams: {
			Period: 10,
			K: 2,
			Exp: false
		},
		InternalState: {
			Sum: 0,
			SquaredSum: 0,
			ExpMovingAvg: 0
		},
		Update: UpdateBollingerBands
	},
	CCI: {
		Type: 9,
		Outputs: 1,
		Range: RANGE_INDEPENDENT,
		DefaultParams: {
			Period: 14
		},
		InternalState: {
			SMATP: 0
		},
		Update: UpdateCCI
	},
	DeMarker: {
		Type: 10,
		Outputs: 1,
		Range: [0, 1],
		DefaultParams: {
			Period: 14
		},
		InternalState: {
			PrevHigh: 0,
			PrevLow: 0,
			DeMin: 0,
			DeMax: 0,
			Cnt: 0
		},
		Update: UpdateDeMarker
	},
	Envelopes: {
		Type: 11,
		Outputs: 2,
		Range: RANGE_INSTRUMENT,
		DefaultParams: {
			Period: 15,
			Distance: 10
		},
		InternalState: {
			MA: 0
		},
		Update: UpdateEnvelopes
	},
	KAMA: {
		Type: 16,
		Outputs: 1,
		Range: RANGE_INSTRUMENT,
		DefaultParams: {
			Period: 14
		},
		InternalState: {
			KAMA: 0
		},
		Update: UpdateKAMA
	},
	LinearReg: {
		Type: 12,
		Outputs: 1,
		Range: RANGE_INSTRUMENT,
		DefaultParams: {
			Period: 10
		},
		InternalState: {},
		Update: UpdateLinearReg
	},
	MACD: {
		Type: 4,
		Outputs: 3,
		Range: RANGE_INDEPENDENT,
		DefaultParams: {
			Period: 9,
			PeriodShort: 12,
			PeriodLong: 26
		},
		InternalState: {
			Cnt: 0,
			Long: 0,
			Short: 0,
			Signal: 0
		},
		Update: UpdateMACD
	},
	Momentum: {
		Type: 5,
		Outputs: 1,
		Range: RANGE_INDEPENDENT,
		DefaultParams: {
			Period: 14
		},
		InternalState: {},
		Update: UpdateMomentum
	},
	MovingAverage: {
		Type: 2,
		Outputs: 1,
		Range: RANGE_INSTRUMENT,
		DefaultParams: {
			Period: 10,
			AverageType: EMovingAverageTypes.Simple
		},
		InternalState: {
			Sum: 0,
			ExpMovingAvg: 0
		},
		Update: UpdateMovingAverage
	},
	ParabolicSAR: {
		Type: 6,
		Outputs: 1,
		Range: RANGE_INSTRUMENT,
		DefaultParams: {
			Alpha: 0.02,
			MaxAlpha: 0.2
		},
		InternalState: {
			EP: 0,
			AF: 0,
			Long: true,
			LastSAR: 0
		},
		Update: UpdateParabolicSAR
	},
	RSI: {
		Type: 1,
		Outputs: 1,
		Range: [0, 100],
		DefaultParams: {
			Period: 14
		},
		InternalState: {
			AvgGain: 0,
			AvgLoss: 0,
			PrevClose: null,
			Cnt: 0
		},
		Update: UpdateRSI
	},
	STDDEV: {
		Type: 13,
		Outputs: 1,
		Range: RANGE_INDEPENDENT,
		DefaultParams: {
			Period: 10
		},
		InternalState: {},
		Update: UpdateSTDDEV
	},
	Stochastic: {
		Type: 15,
		Outputs: 2,
		Range: [0, 100],
		DefaultParams: {
			Fast: true,
			Period: 5,
			AvgPeriod: 3
		},
		InternalState: {},
		Update: UpdateStochastic
	},
	WilliamsR: {
		Type: 14,
		Outputs: 1,
		Range: [-100, 0],
		DefaultParams: {
			Period: 14
		},
		InternalState: {},
		Update: UpdateWilliamsR
	}
};
for (var ind_type in IndicatorTypeParams)
	if (IndicatorTypeParams.hasOwnProperty(ind_type)) {
		EIndicatorType[ind_type] = IndicatorTypeParams[ind_type].Type;
		EIndicatorType[IndicatorTypeParams[ind_type].Type] = ind_type
	}

function GenIndicator(b) {
	var c = EIndicatorType[b.type],
		d = {
			Type: b.type,
			TypeName: c,
			DisplayName: c,
			Outputs: IndicatorTypeParams[c].Outputs,
			Range: IndicatorTypeParams[c].Range,
			History: [],
			ResetState: IndicatorResetState,
			Update: IndicatorTypeParams[c].Update,
			RestoreState: IndicatorRestoreState,
			SaveState: IndicatorSaveState
		};
	d.ResetState();
	for (var e in IndicatorTypeParams[c].DefaultParams)
		if (IndicatorTypeParams[c].DefaultParams.hasOwnProperty(e)) d[e] = IndicatorTypeParams[c].DefaultParams[e];
	for (var f in b.params)
		if (b.params.hasOwnProperty(f)) d[f] =
			b.params[f];
	for (var h in b)
		if (b.hasOwnProperty(h) && h != "type" && h != "param") d[h] = b[h];
	return d
}

function GenIndicators(b) {
	var c = [];
	if (b === undefined) return c;
	for (var d = 0; d < b.length; d++) c.push(GenIndicator(b[d]));
	return c
}
var chartDefaultXML = null,
	xotree = new XML.ObjTree,
	hasFlash = false,
	chartHeights = [
		[52],
		[35, 25],
		[35, 25, 22],
		[50, 14, 14, 14]
	],
	chartGrids = [
		[9],
		[8, 4],
		[4, 4, 3],
		[5, 3, 3, 3]
	],
	chartTicksDefaultViewableHist = 121,
	chartCandlesDefaultViewableHist = 61,
	chartReqHistLength = 400,
	currentGraphCookieVersion = 104,
	defaultGraphCookie = {
		candlesAsLines: true,
		feedResolutionLevel: EFeedResolutionLevel.Minute,
		indicators: [],
		version: currentGraphCookieVersion
	}, localizeChart = {}, disconnectionTimeout = null;

function disconnectInactivity() {
	SaveWebClientConfigurationIfNeeded(function () {
		MainHSM.TimeoutLogoutFlag = true;
		var b = $.get(LangJSDict.urlLOGOUT)
	})
}

function documentBlurred() {
	if (getDisplayPageType() === EPageType.Trade) {
		log("documentBlurred()");
		disconnectionTimeout !== null && clearTimeout(disconnectionTimeout);
		disconnectionTimeout = setTimeout("disconnectInactivity()", GC.BACKGROUND_TIME_OUT_IN_SECONDS * 1E3);
		stopVisibleChartUpdatingFlash()
	}
}

function documentFocused() {
	if (getDisplayPageType() === EPageType.Trade) {
		log("documentFocused()");
		disconnectionTimeout !== null && clearTimeout(disconnectionTimeout);
		disconnectionTimeout = null;
		change_tab_visibility()
	}
}

function getChartDefaultXML() {
	if (chartDefaultXML === null) chartDefaultXML = $.ajax({
		url: "/Content/Data/ChartBase.xml?" + (new Date).getTime(),
		async: false
	}).responseText;
	return chartDefaultXML
}

function ParseXML(b) {
	for (var c = getKeys(localizeChart), d = 0; d < c.length; d++) b = b.replace(new RegExp("###" + c[d] + "###", "g"), localizeChart[c[d]]);
	return xotree.parseXML(b)
}

function JoinStr(b, c) {
	for (var d = "", e = 0; e < c.length; e++) d += (e === 0 ? "" : b) + c[e];
	return d
}

function GenXML(b) {
	b = xotree.writeXML(b);
	b = b.replace(/<\#cdata-section>/g, "<![CDATA[");
	b = b.replace(/<\/\#cdata-section>/g, "]]\>");
	b = b.replace(/\&gt\;/g, ">");
	b = b.replace(/\&lt\;/g, "<");
	b = b.replace(/\"/g, "'");
	b = b.substring(b.indexOf("?>") + 2);
	b = b.replace(/\r|\n/g, "");
	return b = b.replace(/\#\#\#CRLF\#\#\#/g, "\n")
}

function formatDate(b, c) {
	var d = b.getMinutes(),
		e = b.getMonth() + 1,
		f = b.getHours(),
		h = b.getDate(),
		g = "";
	if (e < 10) e = "0" + e;
	if (h < 10) h = "0" + h;
	if (f < 10) f = "0" + f;
	if (d < 10) d = "0" + d;
	g = "" + e + h + b.getFullYear() + " " + f + ":" + d;
	if (!c) {
		c = b.getSeconds();
		b = b.getTime() % 1E3;
		if (c < 10) c = "0" + c;
		if (b < 10) b = "00" + b;
		else if (b < 100) b = "0" + b;
		g += ":" + c + "." + b
	}
	return g
}

function dateFromString(b) {
	var c = b.substr(0, 2) + "/" + b.substr(2, 2) + "/" + b.substr(4),
		d = c.indexOf(".");
	b = 0;
	if (d > -1) {
		b = parseInt(c.substr(d + 1), 10);
		c = c.substr(0, d)
	}
	c = Date.parse(c);
	d = new Date;
	d.setTime(c + b);
	return d
}

function genRandomTick(b, c) {
	var d = Number(2.8),
		e = new Date,
		f = {};
	if (c) {
		if (b.length) {
			d = b[b.length - 1].close;
			e = new Date(b[b.length - 1].time.getTime() + 6E4)
		}
		c = d + Math.random() * d / 10;
		f = d - Math.random() * d / 10;
		b = f + Math.random() * (c - f);
		f = {
			time: e,
			open: d,
			high: c,
			low: f,
			close: b
		}
	} else {
		if (b.length) {
			d = b[b.length - 1].y;
			e = new Date(b[b.length - 1].time.getTime() + (Math.random() + 0.5) * 6E4)
		}
		b = d + (Math.random() - 0.5) * d / 20;
		f = {
			time: e,
			y: b
		}
	}
	return f
}

function genRandomInitialData(b, c) {
	for (var d = [], e = 0; e < b; e++) d.push(genRandomTick(d, c));
	return d
}

function localizeTime(b) {
	var c = new Date;
	c.setTime(b.getTime() - c.getTimezoneOffset() * 6E4);
	return c
}

function getExtraSettings(b) {
	var c = "hh:mm###CRLF###DD/MM",
		d = "hh:mm:ss###CRLF###DD/MM",
		e = $.culture.calendar.patterns.d.toLowerCase();
	if (e.indexOf("d") > e.indexOf("m")) {
		c = "hh:mm###CRLF###MM/DD";
		d = "hh:mm:ss###CRLF###MM/DD"
	}
	c = c.replace(":", $.culture.calendar[":"]).replace("/", $.culture.calendar["/"]);
	d = d.replace(":", $.culture.calendar["/"]).replace("/", $.culture.calendar["/"]);
	c = {
		seconds: d,
		minutes: c,
		hours: c,
		days: c
	};
	return {
		number_format: {
			digits_after_decimal: {
				data: "" + b
			},
			decimal_separator: $.culture.numberFormat["."],
			thousand_separator: $.culture.numberFormat[","]
		},
		date_formats: {
			x_axis: c,
			legend: c
		}
	}
}

function IVSChart(b) {
	this.ChartId = b;
	this.has_focus = 0;
	this.pendingUpdate = false;
	this.currentGraphRes = this.graphSavedSettings = this.DataAndSettingsObject = this.chartMovie = this.chartSWFObject = null;
	this.currentGraphBuy = false;
	this.buyOffset = 0;
	this.chartUpdateTimeout = this.chartMouseMoveTimeout = this.chartDataCB = this.updateChartFunction = this.requestedOrderId = this.requestedPositionId = this.requestedInstrumentId = this.currentServerTimeOffset = null;
	this.chartUpdateTimeoutCntShift = this.chartUpdateTimeoutCnt = 0;
	this.chartInitTimeout =
		null;
	this.chartInited = false;
	this.chartDefaultViewableHist = 61;
	this.isLoadingAnimGif = false;
	this.startGraphLoadingAnimGif = function () {
		$("#" + this.ChartId + "_graph_flash").css("visibility", "hidden");
		this.isLoadingAnimGif = true
	};
	this.stopGraphLoadingAnimGif = function () {
		$("#" + this.ChartId + "_graph_flash").css("visibility", "");
		this.isLoadingAnimGif = false
	};
	this.isGraphLoadingAnimGif = function () {
		return this.isLoadingAnimGif
	};
	this.convertDataToCSV = function (c) {
		for (var d = "", e = this.DataAndSettingsObject, f = 0; f < c.length; f++) {
			var h =
				"",
				g = true;
			for (var l in e.cols)
				if (e.cols.hasOwnProperty(l)) {
					var n = e.cols[l];
					if (n == "date") h += c[f][n];
					else if (n == "y" || n == "close" || n == "high" || n == "low" || n == "open") h += "," + (c[f][n] + e.buy_offset).toFixed(5);
					else if (typeof c[f][n] == "number") h += "," + c[f][n].toFixed(5);
					else g = false
				}
			if (g) d += h + "###CRLF###"
		}
		return d
	};
	this.GetZoom = function (c, d) {
		var e = this.DataAndSettingsObject;
		if (c) {
			e.from = dateFromString(c);
			e.settings.settings.period_selector.from = c
		}
		if (d) {
			e.to = dateFromString(d);
			e.settings.settings.period_selector.to =
				d
		}
	};
	this.setSettingsCompleted = function () {
		if (!this.chartInited) {
			this.chartInited = true;
			this.stopGraphLoadingAnimGif()
		}
	};
	this.ChartInitialized = function () {
		this.chartMovie = document.getElementById(this.ChartId + "_graph_flash");
		this.chartInited = true;
		this.stopGraphLoadingAnimGif();
		if (this.chartInitTimeout !== null) {
			clearTimeout(this.chartInitTimeout);
			this.chartInitTimeout = null;
			this.DataAndSettingsObject.dirty && this.createOrUpdateChartFlash(false)
		}
	};
	this.AddIndicatorsToData = function (c) {
		var d = this.DataAndSettingsObject,
			e = "close",
			f = "high",
			h = "low";
		if (c[0].y) h = f = e = "y";
		for (var g = 0, l = 0; l < c.length; l++) {
			c[l].date = formatDate(c[l].time, d.candles);
			for (var n = 0; n < d.indicators.length; n++) {
				var m = d.indicators[n].Update(c[l][e] + d.buy_offset, c[l][f] + d.buy_offset, c[l][h] + d.buy_offset);
				if (m === null)
					for (g = 0; g < d.indicators[n].Outputs; g++) c[l][d.indicators[n].TypeName + "_" + n + "_" + g] = null;
				else
					for (g = 0; g < d.indicators[n].Outputs; g++) c[l][d.indicators[n].TypeName + "_" + n + "_" + g] = Number(m[g])
			}
		}
		return c.slice(0, c.length)
	};
	this.genEventsHorizLines =
		function (c) {
			if (c.length === 0) return "<event></event>";
			for (var d = {
				event: []
			}, e = 0; e < c.length; e++) {
				var f = $.extend({
					Color: "000000",
					TextColor: "000000",
					Text: "",
					Value: 0,
					Dashed: true
				}, c[e]);
				d.event.push({
					chart_id: "main",
					graph_id: "none",
					y_axis: "right",
					bullet: f.Dashed ? "horizontal_line_dashed" : "horizontal_line",
					border_color: f.Color,
					text_color: f.TextColor,
					letter: f.Text,
					value: f.Value
				})
			}
			return GenXML(d)
	};
	this.genChartObject = function (c, d, e, f, h, g) {
		getChartDefaultXML();
		d = this.DataAndSettingsObject = {
			indicators: GenIndicators(d),
			indicators_src: d,
			settings: ParseXML(getChartDefaultXML()),
			hist_data: e,
			candles: c,
			has_focus: this.has_focus,
			dirty: 0,
			queue_requests: 0,
			extra_settings: f,
			buy_offset: g
		};
		this.chartDefaultViewableHist = c ? chartCandlesDefaultViewableHist : chartTicksDefaultViewableHist;
		$.extend(true, d.settings.settings, f);
		d.indicator_defaults = d.settings.settings.indicator_defaults;
		delete d.settings.settings.indicator_defaults;
		for (f = 0; f < d.indicators.length; f++)
			if (typeof d.indicator_defaults[d.indicators[f].TypeName] == "object") {
				d.indicators[f] =
					$.extend({}, d.indicator_defaults[d.indicators[f].TypeName], d.indicators[f]);
				if (typeof d.indicators[f].Chart == "object") d.indicators[f].Chart = $.extend({}, d.indicator_defaults.Global.Chart, d.indicators[f].Chart)
			}
		if (!d.settings.settings.charts.chart.length) d.settings.settings.charts.chart = [d.settings.settings.charts.chart];
		if (!d.settings.settings.charts.chart[0].graphs.graph.length) d.settings.settings.charts.chart[0].graphs.graph = [d.settings.settings.charts.chart[0].graphs.graph];
		if (!d.settings.settings.data_sets.data_set.length) d.settings.settings.data_sets.data_set = [d.settings.settings.data_sets.data_set];
		g = e[e.length - 1];
		d.hist_data = this.AddIndicatorsToData(e.slice(0, e.length - 1));
		for (f = 0; f < d.indicators.length; f++) d.indicators[f].SaveState();
		d.hist_data.push(this.AddIndicatorsToData([g])[0]);
		d.last_update = g.time;
		if (c) {
			d.cols = ["date", "close", "high", "low", "open"];
			d.settings.settings.charts.chart[0].graphs.graph = [d.settings.settings.charts.chart[0].graphs.graph[0]];
			d.settings.settings.max_grid_count = 20
		} else {
			d.cols = ["date", "y"];
			d.settings.settings.equal_spacing =
				0;
			d.settings.settings.data_sets.data_set[0].csv.columns.column = ["date", "close"];
			d.settings.settings.data_sets.data_set[0].csv.date_format = "MMDDYYYY hh:mm:ss.fff";
			d.settings.settings.charts.chart[0].graphs.graph = [d.settings.settings.charts.chart[0].graphs.graph[1]];
			d.settings.settings.max_grid_count = 15
		}
		for (f = 0; f < d.indicators.length; f++) {
			c = 0;
			if (d.indicators[f].Range != RANGE_INSTRUMENT) {
				c = d.settings.settings.charts.chart.length;
				e = d.settings.settings.charts.chart[c - 1].values.x;
				d.settings.settings.charts.chart[c -
					1].values.x = {
					enabled: 0
				};
				e = {
					"-cid": c,
					values: {
						x: e
					},
					title: "      " + d.indicators[f].DisplayName,
					legend: {
						text_size: 10
					},
					graphs: {
						graph: []
					}
				};
				if (d.indicators[f].Chart) e = $.extend(e, d.indicators[f].Chart);
				d.settings.settings.charts.chart.push(e)
			}
			for (e = 0; e < d.indicators[f].Outputs; e++) {
				g = d.indicators[f].TypeName + "_" + f + "_" + e;
				d.cols.push(g);
				d.settings.settings.data_sets.data_set[0].csv.columns.column.push(g);
				var l = "FF0000";
				if (d.indicators[f].Color) l = $.isArray(d.indicators[f].Color) ? d.indicators[f].Color[e] : d.indicators[f].Color;
				g = {
					"-gid": "" + d.settings.settings.charts.chart[c].graphs.graph.length,
					type: "line",
					color: l,
					alpha: 100,
					fill_alpha: 0,
					axis: "right",
					data_sources: {
						close: g
					},
					cursor_alpha: 0
				};
				if (d.indicators[f].Graph) g = $.isArray(d.indicators[f].Graph) ? $.extend(g, d.indicators[f].Graph[e]) : $.extend(g, d.indicators[f].Graph);
				d.settings.settings.charts.chart[c].graphs.graph.push(g)
			}
			if ($.isArray(d.indicators[f].Range)) {
				e = {
					min: d.indicators[f].Range[0],
					max: d.indicators[f].Range[1],
					strict_min_max: "true"
				};
				d.settings.settings.charts.chart[c].values.y_left =
					$.extend(d.settings.settings.charts.chart[c].values.y_left, e);
				d.settings.settings.charts.chart[c].values.y_right = $.extend(d.settings.settings.charts.chart[c].values.y_right, e)
			}
			if (d.indicators[f].Range != RANGE_INSTRUMENT) d.settings.settings.charts.chart[c].graphs.graph[d.settings.settings.charts.chart[c].graphs.graph.length - 1].title = d.indicators[f].TypeName
		}
		for (f = 0; f < d.settings.settings.charts.chart.length; f++) {
			d.settings.settings.charts.chart[f].height = chartHeights[d.settings.settings.charts.chart.length -
				1][f];
			if (typeof d.settings.settings.charts.chart[f].grid == "undefined") d.settings.settings.charts.chart[f].grid = {};
			if (typeof d.settings.settings.charts.chart[f].grid.y_right == "undefined") d.settings.settings.charts.chart[f].grid.y_right = {};
			if (typeof d.settings.settings.charts.chart[f].grid.y_left == "undefined") d.settings.settings.charts.chart[f].grid.y_left = {};
			d.settings.settings.charts.chart[f].grid.y_right.approx_count = chartGrids[d.settings.settings.charts.chart.length - 1][f];
			d.settings.settings.charts.chart[f].grid.y_left.approx_count =
				chartGrids[d.settings.settings.charts.chart.length - 1][f]
		}
		if (d.settings.settings.charts.chart.length > 3)
			for (f = 0; f < d.settings.settings.charts.chart.length; f++) d.settings.settings.charts.chart[f].values.y_right.text_size = 7;
		d.settings.settings.charts.chart.push({
			"-cid": d.settings.settings.charts.chart.length,
			bg_alpha: 1,
			height: 3,
			border_alpha: 0
		});
		if (this.chartDefaultViewableHist >= d.hist_data.length - 1) this.chartDefaultViewableHist = d.hist_data.length - 2;
		d.from = d.hist_data[d.hist_data.length - this.chartDefaultViewableHist].time;
		d.to = d.hist_data[d.hist_data.length - 1].time;
		d.settings.settings.period_selector.from = d.hist_data[d.hist_data.length - this.chartDefaultViewableHist].date;
		d.settings.settings.period_selector.to = d.hist_data[d.hist_data.length - 1].date;
		d.horiz_lines = h;
		d.settings.settings.data_sets.data_set[0].csv.data = this.convertDataToCSV(d.hist_data);
		d.settings.settings.data_sets.data_set[0].events = this.genEventsHorizLines(h);
		d.time_of_last_tick_at_current_rate = null
	};
	this.chartFailedInit = function () {
		this.chartInitTimeout =
			null;
		alert("failed to init chart: " + this.ChartId)
	};
	this.createOrUpdateChartFlash = function (c) {
		var d = this.DataAndSettingsObject,
			e = GenXML(d.settings);
		if (this.chartSWFObject === null) {
			var f = this;
			this.chartInitTimeout = setTimeout(function () {
				f.chartFailedInit()
			}, 3E4);
			d = {
				chart_id: this.ChartId,
				key: "111-3a9ada32ac64a2770aca5f11f084b5d8",
				chart_settings: encodeURIComponent("<settings></settings>"),
				additional_chart_settings: encodeURIComponent(e)
			};
			swfobject.embedSWF("/Content/Flash/" + (GlobalDs.Brand === "TradeSimple" ?
				"TradeSimpleFlash/" : "") + "amstock.swf", this.ChartId + "_graph_flash", "100%", "100%", "8.0.0", "expressInstall.swf", d, {
				bgcolor: "#ffffff",
				wmode: "opaque"
			});
			this.chartSWFObject = 1
		} else if (this.chartMovie !== null)
			if (c) {
				c = 0;
				if (Math.abs(d.to - d.last_update) < 6E4) c = d.last_update - d.from;
				this.chartMovie.setData(d.settings.settings.data_sets.data_set[0].csv.data.replace(/\#\#\#CRLF\#\#\#/g, "\n"));
				this.chartMovie.setEvents(d.settings.settings.data_sets.data_set[0].events);
				if (c)
					for (e = d.hist_data.length - 2; e > 0; e--)
						if (d.hist_data[d.hist_data.length -
							1].time - d.hist_data[e].time >= c) {
							d.last_update = d.hist_data[d.hist_data.length - 1].time;
							this.chartMovie.setZoom(d.hist_data[e].date, d.hist_data[d.hist_data.length - 1].date);
							break
						}
			} else {
				this.chartInited = false;
				this.chartMovie.setSettings(e, true, true, true)
			} else if (this.chartInitTimeout !== null) d.dirty = 1
	};
	this.unfreezeChart = function () {
		var c = this.DataAndSettingsObject;
		if (c !== null)
			if (c.dirty) {
				this.chartMouseMoveTimeout && clearTimeout(this.chartMouseMoveTimeout);
				this.clearChartUpdateTimeout();
				c.settings.settings.data_sets.data_set[0].csv.data =
					this.convertDataToCSV(c.hist_data);
				this.createOrUpdateChartFlash(true);
				c.queue_requests = 0;
				c.dirty = 0
			} else c.queue_requests = 0
	};
	this.resumeUpdatingFlash = function () {
		this.has_focus = 1;
		if (this.pendingUpdate) {
			this.pendingUpdate = false;
			this.updateChartIfNeeded(this.requestedInstrumentId, this.requestedPositionId, this.requestedOrderId)
		}
		var c = this.DataAndSettingsObject;
		if (c !== null) {
			c.has_focus = 1;
			this.unfreezeChart()
		}
	};
	this.stopUpdatingFlash = function () {
		this.has_focus = 0;
		var c = this.DataAndSettingsObject;
		if (c !== null) c.has_focus =
			0
	};
	this.ModifyChartObjectCandlesAsLines = function (c) {
		var d = this.DataAndSettingsObject;
		if (c) {
			d.settings.settings.charts.chart[0].graphs.graph[0].type = "line";
			d.settings.settings.charts.chart[0].graphs.graph[0].fill_alpha = 0;
			d.settings.settings.charts.chart[0].graphs.graph[0].width = 2;
			d.settings.settings.charts.chart[0].graphs.graph[0].data_sources = {
				close: "close"
			}
		} else {
			d.settings.settings.charts.chart[0].graphs.graph[0].type = "candlestick";
			d.settings.settings.charts.chart[0].graphs.graph[0].fill_alpha = 100;
			d.settings.settings.charts.chart[0].graphs.graph[0].width = 1;
			d.settings.settings.charts.chart[0].graphs.graph[0].data_sources = {
				close: "close",
				high: "high",
				low: "low",
				open: "open"
			}
		}
		d.settings.settings.period_selector.from = d.hist_data[d.hist_data.length - this.chartDefaultViewableHist].date;
		d.settings.settings.period_selector.to = d.hist_data[d.hist_data.length - 1].date
	};
	this.ShowCandlesAsLines = function (c) {
		this.ModifyChartObjectCandlesAsLines(c);
		this.createOrUpdateChartFlash()
	};
	this.ToggleShowCandlesAsLines =
		function () {
			this.ShowCandlesAsLines(this.DataAndSettingsObject.settings.settings.charts.chart[0].graphs.graph[0].type != "line")
	};
	this.InitializeCandleGraph = function (c, d, e, f, h, g) {
		this.genChartObject(true, c, d, e, f, this.currentGraphBuy ? this.buyOffset : 0);
		c = this.DataAndSettingsObject;
		if (g === true) {
			g = c.settings.settings.charts.chart[0].graphs.graph[0].positive_color;
			c.settings.settings.charts.chart[0].graphs.graph[0].positive_color = c.settings.settings.charts.chart[0].graphs.graph[0].negative_color;
			c.settings.settings.charts.chart[0].graphs.graph[0].negative_color =
				g
		}
		h === true && this.ModifyChartObjectCandlesAsLines(h);
		this.createOrUpdateChartFlash()
	};
	this.InitializeTickGraph = function (c, d, e, f) {
		this.genChartObject(false, c, d, e, f, this.currentGraphBuy ? this.buyOffset : 0);
		this.createOrUpdateChartFlash()
	};
	this.ReloadChartNewIndicators = function (c) {
		var d = this.DataAndSettingsObject;
		this.clearChartUpdateTimeout();
		var e = d.candles && d.settings.settings.charts.chart[0].graphs.graph[0].type == "line";
		this.genChartObject(d.candles, c, d.hist_data, d.extra_settings, d.horiz_lines, d.buy_offset);
		e ? this.ShowCandlesAsLines(true) : this.createOrUpdateChartFlash()
	};
	this.ReloadChartOffsetValues = function () {
		var c = this.DataAndSettingsObject;
		this.clearChartUpdateTimeout();
		var d = c.candles && c.settings.settings.charts.chart[0].graphs.graph[0].type == "line";
		this.genChartObject(c.candles, c.indicators_src, c.hist_data, c.extra_settings, c.horiz_lines, this.currentGraphBuy ? this.buyOffset : 0);
		d ? this.ShowCandlesAsLines(true) : this.createOrUpdateChartFlash()
	};
	this.ReloadChartOffsetIfNeeded = function (c) {
		if (c != this.currentGraphBuy) {
			this.currentGraphBuy =
				c;
			this.ReloadChartOffsetValues()
		}
	};
	this.updateChartOnFeed = function (c) {
		if (this.chartMovie !== null && this.chartInited && this.currentGraphRes !== null) this.currentGraphRes === 0 ? this.AddTickPoint({
			time: this.localizeTimeAndAddServerDiff(new Date),
			y: c
		}) : this.AddOrUpdateLastCandle(c, this.localizeTimeAndAddServerDiff(new Date), FeedResolutionTime[EFeedResolutionLevelToString(this.currentGraphRes)])
	};
	this.AddTickPoint = function (c) {
		var d = this.DataAndSettingsObject;
		c = {
			time: c.time,
			y: c.y
		};
		var e = d.hist_data.length >= chartReqHistLength;
		if (d.last_update.getTime() + 3E3 > c.time.getTime() && d.hist_data[d.hist_data.length - 1].y == c.y) {
			if (d.time_of_last_tick_at_current_rate === null) d.time_of_last_tick_at_current_rate = [];
			d.time_of_last_tick_at_current_rate.push(c.time)
		} else {
			if (d.time_of_last_tick_at_current_rate) {
				for (var f = 0; f < d.time_of_last_tick_at_current_rate.length; f++) {
					this.chartUpdateTimeoutCnt++;
					this.chartUpdateTimeoutCntShift++;
					d.hist_data.push(this.AddIndicatorsToData([{
						y: d.hist_data[d.hist_data.length - 1].y,
						time: d.time_of_last_tick_at_current_rate[f]
					}])[0]);
					e && d.hist_data.shift()
				}
				d.time_of_last_tick_at_current_rate = null
			}
			c = this.AddIndicatorsToData([c])[0];
			d.hist_data.push(c);
			e && d.hist_data.shift();
			if (d.has_focus && !d.queue_requests) {
				d.last_update = c.time;
				this.appendDataWrapper(e)
			} else d.dirty = 1
		}
	};
	this.appendDataTimeout = function () {
		var c = this.DataAndSettingsObject;
		c = c.hist_data.slice(c.hist_data.length - this.chartUpdateTimeoutCnt);
		c = this.convertDataToCSV(c).replace(/\#\#\#CRLF\#\#\#/g, "\n");
		this.chartMovie.appendData(c, this.chartUpdateTimeoutCntShift);
		this.clearChartUpdateTimeout()
	};
	this.clearChartUpdateTimeout = function () {
		this.chartUpdateTimeout && clearTimeout(this.chartUpdateTimeout);
		this.chartUpdateTimeoutCnt = this.chartUpdateTimeoutCntShift = 0;
		this.chartUpdateTimeout = null
	};
	this.setDataTimeout = function () {
		this.clearChartUpdateTimeout();
		this.chartMovie.setData(this.convertDataToCSV(this.DataAndSettingsObject.hist_data).replace(/\#\#\#CRLF\#\#\#/g, "\n"))
	};
	this.appendDataWrapper = function (c) {
		if (this.chartUpdateTimeout === null) {
			var d = this;
			this.chartUpdateTimeout = setTimeout(function () {
					d.appendDataTimeout()
				},
				2E3)
		}
		this.chartUpdateTimeoutCnt++;
		c && this.chartUpdateTimeoutCntShift++
	};
	this.setDataWrapper = function () {
		if (this.chartUpdateTimeout === null) {
			var c = this;
			this.chartUpdateTimeout = setTimeout(function () {
				c.setDataTimeout()
			}, 2E4)
		}
	};
	this.AddCandle = function (c) {
		for (var d = this.DataAndSettingsObject, e = 0; e < d.indicators.length; e++) d.indicators[e].SaveState();
		c = {
			time: c.time,
			close: c.close,
			high: c.high,
			low: c.low,
			open: c.open
		};
		e = d.hist_data.length >= chartReqHistLength;
		c = this.AddIndicatorsToData([c])[0];
		d.hist_data.push(c);
		e && d.hist_data.shift();
		if (d.has_focus && d.queue_requests === 0) {
			d.last_update = c.time;
			this.chartUpdateTimeout !== null && this.setDataTimeout();
			this.chartMovie.appendData(this.convertDataToCSV([c]), e ? 1 : 0)
		} else d.dirty = 1
	};
	this.UpdateLastCandle = function (c) {
		for (var d = this.DataAndSettingsObject, e = 0; e < d.indicators.length; e++) d.indicators[e].RestoreState();
		c = {
			time: d.hist_data[d.hist_data.length - 1].time,
			close: c.close,
			high: c.high,
			low: c.low,
			open: c.open,
			date: d.hist_data[d.hist_data.length - 1].date
		};
		c = this.AddIndicatorsToData([c])[0];
		d.hist_data = d.hist_data.slice(0, d.hist_data.length - 1);
		d.hist_data.push(c);
		if (d.has_focus && d.queue_requests === 0) {
			d.last_update = c.time;
			this.setDataWrapper()
		} else d.dirty = 1
	};
	this.AddOrUpdateLastCandle = function (c, d, e) {
		var f = this.DataAndSettingsObject;
		f = f.hist_data[f.hist_data.length - 1];
		var h = f.time.getTime(),
			g = new Date;
		g.setTime(h + e * 1E3);
		if (d.getTime() > g) {
			d.setTime(d.getTime() - d.getTime() % (e * 1E3));
			this.AddCandle({
				time: d,
				high: c,
				low: c,
				open: c,
				close: c
			})
		} else {
			if (c > f.high) f.high = c;
			if (c < f.low) f.low = c;
			f.close =
				c;
			this.UpdateLastCandle(f)
		}
	};
	this.UpdateHorizontalLines = function (c) {
		var d = this.DataAndSettingsObject;
		d.horiz_lines = c;
		c = this.genEventsHorizLines(c);
		d.settings.settings.data_sets.data_set[0].events = c;
		if (d.has_focus && !d.queue_requests) this.chartMovie.setEvents("<events>" + c + "</events>", true);
		else d.dirty = 1
	};
	this.TestInitializeTickGraph = function (c, d, e) {
		return this.InitializeTickGraph(c, genRandomInitialData(250, false), d, e)
	};
	this.TestInitializeCandleGraph = function (c, d, e) {
		return this.InitializeCandleGraph(c,
			genRandomInitialData(250, true), d, e, false)
	};
	this.TestAddCandle = function () {
		this.AddCandle(genRandomTick(this.DataAndSettingsObject.hist_data, true, false, true))
	};
	this.TestAddTickPoint = function () {
		this.AddTickPoint(genRandomTick(this.DataAndSettingsObject.hist_data, false))
	};
	this.GetXTimeRange = function () {
		var c = this.DataAndSettingsObject;
		return {
			from: c.from,
			to: c.to
		}
	};
	this.SetXTimeRange = function (c) {
		var d = this.DataAndSettingsObject;
		d.settings.settings.period_selector.from = formatDate(c.from, d.candles);
		d.settings.settings.period_selector.to =
			formatDate(c.to, d.candles);
		this.chartMovie.setZoom(d.settings.settings.period_selector.from, d.settings.settings.period_selector.to)
	};
	this.ResetXTimeRange = function () {
		var c = this.DataAndSettingsObject;
		this.SetXTimeRange({
			from: c.hist_data[c.hist_data.length - this.chartDefaultViewableHist].time,
			to: c.hist_data[c.hist_data.length - 1].time
		})
	};
	this.updateChartIcons = function () {
		if (this.graphSavedSettings.candlesAsLines) {
			$("#" + this.ChartId + "_graph_tools_toogle_line").addClass("display-none-class");
			$("#" + this.ChartId +
				"_graph_tools_toogle_candles").removeClass("display-none-class")
		} else {
			$("#" + this.ChartId + "_graph_tools_toogle_line").removeClass("display-none-class");
			$("#" + this.ChartId + "_graph_tools_toogle_candles").addClass("display-none-class")
		}
	};
	this.getCookieName = function () {
		return appCookies.GraphSettings + "_" + this.ChartId
	};
	this.saveGraphCookie = function () {
		$.cookie(appCookies.GraphSettings, null, {
			path: "/Trade"
		});
		$.cookie(appCookies.GraphSettings, null);
		$.cookie(this.getCookieName(), JSON.stringify(this.graphSavedSettings), {
			expires: 3650,
			path: "/"
		})
	};
	this.loadGraphCookie = function () {
		this.graphSavedSettings = $.cookie(this.getCookieName());
		if (this.graphSavedSettings === null && this.ChartId == "main_instruments") this.graphSavedSettings = $.cookie(appCookies.GraphSettings);
		if (this.graphSavedSettings !== null) this.graphSavedSettings = JSON.parse(this.graphSavedSettings);
		if (this.graphSavedSettings === null || this.graphSavedSettings.version !== currentGraphCookieVersion) {
			$.cookie(this.getCookieName(), null);
			this.graphSavedSettings = defaultGraphCookie;
			this.saveGraphCookie()
		}
	};
	this.localizeTimeAndAddServerDiff = function (c) {
		var d = new Date;
		d.setTime(c.getTime() - this.currentServerTimeOffset - d.getTimezoneOffset() * 6E4);
		return d
	};
	this.updateChartIfNeeded = function (c, d, e) {
		if (this.has_focus) {
			if (c === 0 || typeof c != "number") {
				if (this.requestedInstrumentId === null) return;
				c = this.requestedInstrumentId
			}
			this.updateChartFunction(this, c, d, e)
		} else {
			this.requestedInstrumentId = c;
			this.requestedPositionId = d;
			this.requestedOrderId = e;
			this.pendingUpdate = true
		}
	};
	this.alertFailedToRetrieveChartData =
		function () {
			this.stopGraphLoadingAnimGif();
			$("#" + this.ChartId + "_graph_title").text("");
			$("#" + this.ChartId + "_graph_over").css("visibility", "hidden");
			currentGraphInstrument = null;
			if (this.chartInitTimeout !== null) {
				clearTimeout(this.chartInitTimeout);
				this.chartInitTimeout = null
			}
			StringToEDeployEnvironemntType(LangJSDict.jsDeployEnv) != EDeployEnvironemnt.Test && alertDialog(ALERT_TYPE.atError, LangJSDict.strCHART_DATA_NOT_AVAILABLE, false, null, null)
	};
	this.getChartDataImmCB = function (c) {
		return decoratorVerifyReponseProperties(["InstrumentName",
			"InstrumentID", "HighRate", "LowRate", "CloseRate", "OpenRate", "DateTime", "FeedResolutionLevel", "PrecisionDigits", "SpreadPipsCount"
		], function (d) {
			if (c.requestedInstrumentId == d.InstrumentID) {
				c.requestedInstrumentId = null;
				c.chartDataCB(d, true)
			}
		}, null, function () {
			c.alertFailedToRetrieveChartData()
		})
	}(this);
	this.getChartDataTickImmCB = function (c) {
		return decoratorVerifyReponseProperties(["InstrumentName", "InstrumentID", "StartPointDate", "LastPointDate", "SellRate", "DeltaDateTime", "PrecisionDigits", "SpreadPipsCount"],
			function (d) {
				if (c.requestedInstrumentId == d.InstrumentID) {
					c.requestedInstrumentId = null;
					c.chartDataCB(d, false)
				}
			}, null, function () {
				c.alertFailedToRetrieveChartData()
			})
	}(this);
	this.getNewChartData = function (c, d, e) {
		this.requestedInstrumentId = c;
		this.currentGraphRes = null;
		this.currentGraphBuy = e;
		if (this.chartMouseMoveTimeout) {
			clearTimeout(this.chartMouseMoveTimeout);
			this.chartMouseMoveTimeout = null
		}
		this.clearChartUpdateTimeout();
		$("#" + this.ChartId + "_graph_over").hasClass("loading_graph") || $("#" + this.ChartId + "_graph_over").addClass("loading_graph");
		this.startGraphLoadingAnimGif();
		$("#" + this.ChartId + "_graph_title").text("");
		e = parseInt($("#" + this.ChartId + "_graph_tools_resolution").val(), 10);
		e === 0 ? SENDImm_getChartDataTickImm(new GetChartDataTick(c, d), this.getChartDataTickImmCB) : SENDImm_getChartDataImm(new GetChartData(c, d, e, EFeedResolutionLevelToString(e)), this.getChartDataImmCB)
	};
	this.startChart = function (c, d) {
		var e = getIndicatorsSettings(this);
		$("#" + this.ChartId + "_graph_title").text(d);
		d = getExtraSettings(c.PrecisionDigits);
		var f = [],
			h = readDateTimesInBase64(c.DateTime),
			g = readDecimalsInBase64(c.CloseRate),
			l = readDecimalsInBase64(c.HighRate),
			n = readDecimalsInBase64(c.LowRate),
			m = readDecimalsInBase64(c.OpenRate),
			q = stdFormatToDate(c.CurrentTime);
		if (g.length < 3) this.alertFailedToRetrieveChartData();
		else {
			this.currentServerTimeOffset = (new Date).getTime() - q.getTime();
			this.buyOffset = Math.pow(0.1, c.PrecisionDigits) * c.SpreadPipsCount;
			for (q = 0; q < g.length; q++) f.push({
				time: h[q],
				open: m[q],
				high: l[q],
				low: n[q],
				close: g[q]
			});
			this.InitializeCandleGraph(e, f, d, [], this.graphSavedSettings.candlesAsLines,
				GlobalDs.shouldReverseTrendColors());
			this.currentGraphRes = StringToEFeedResolutionLevel(c.FeedResolutionLevel);
			this.graphSavedSettings.feedResolutionLevel = this.currentGraphRes;
			this.saveGraphCookie()
		}
	};
	this.startTickChart = function (c, d) {
		var e = getIndicatorsSettings(this);
		$("#" + this.ChartId + "_graph_title").text(d);
		d = getExtraSettings(c.PrecisionDigits);
		var f = [],
			h = readIntegersInBase64(c.DeltaDateTime),
			g = readDecimalsInBase64(c.SellRate),
			l = localizeTime(stdFormatToDate(c.StartPointDate)),
			n = stdFormatToDate(c.CurrentTime);
		if (g.length < 3) this.alertFailedToRetrieveChartData();
		else {
			this.currentServerTimeOffset = (new Date).getTime() - n.getTime();
			this.buyOffset = Math.pow(0.1, c.PrecisionDigits) * c.SpreadPipsCount;
			for (c = 0; c < g.length; c++) {
				n = new Date;
				n.setTime(l.getTime() + parseInt(h[c], 10));
				f.push({
					time: n,
					y: g[c]
				})
			}
			this.InitializeTickGraph(e, f, d, []);
			this.currentGraphRes = EFeedResolutionLevel.Tick;
			this.graphSavedSettings.feedResolutionLevel = EFeedResolutionLevel.Tick;
			this.saveGraphCookie()
		}
	}
}
var allCharts = {
	main_instruments: new IVSChart("main_instruments"),
	main_opositions: new IVSChart("main_opositions"),
	main_orders: new IVSChart("main_orders")
};

function getChart(b) {
	if (b = allCharts[b]) return b;
	return null
}

function amGetZoom(b, c, d) {
	(b = allCharts[b]) && b.GetZoom(c, d)
}

function amReturnData(b, c) {}

function amProcessCompleted(b, c) {
	if (c == "setSettings")(b = allCharts[b]) && b.setSettingsCompleted()
}

function amError(b, c) {
	alert(c)
}

function amReturnParam(b, c) {
	alert(c)
}

function amReturnImageData(b, c) {
	alert(c)
}

function amGetStatus(b, c) {}

function amClickedOn(b, c, d, e) {}

function amChartInited(b) {
	(b = allCharts[b]) && b.ChartInitialized()
}
var blurCheckAgainTimeout = null;

function onFocusCheck() {
	if (blurCheckAgainTimeout === null) documentFocused();
	else {
		clearTimeout(blurCheckAgainTimeout);
		blurCheckAgainTimeout = null
	}
}

function onBlurCheck() {
	if (blurCheckAgainTimeout === null) blurCheckAgainTimeout = setTimeout(onBlurCheckAgain, 100)
}

function onBlurCheckAgain() {
	documentBlurred();
	blurCheckAgainTimeout = null
}
$(document).ready(function () {
	if ("onfocusin" in document) {
		document.onfocusin = onFocusCheck;
		document.onfocusout = onBlurCheck
	} else {
		$(window).blur(documentBlurred);
		$(window).focus(documentFocused)
	}
	var b = swfobject.getFlashPlayerVersion();
	if (!(typeof b.major != "number" || b.major < 8 || getDisplayPageType() !== EPageType.Trade || $("#main_instruments_graph").hasClass("display-none-class"))) {
		hasFlash = true;
		initSetupIndicatorsDialog();
		localizeChart = {
			open: LangJSDict.strOPOSITIONS_OPENRATE_HEADER,
			close: LangJSDict.strORDERS_CURRENTRATE_HEADER,
			high: LangJSDict.strINSTRUMENTS_HIGHLOW_HEADER.split("/")[0],
			low: LangJSDict.strINSTRUMENTS_HIGHLOW_HEADER.split("/")[1]
		};
		b = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		for (var c = 0; c < b.length; c++) localizeChart[b[c]] = LangJSDict["strSHORT_MONTH_" + b[c]];
		for (var d in allCharts)
			if (allCharts.hasOwnProperty(d)) {
				b = allCharts[d];
				b.loadGraphCookie();
				$("#" + d + "_graph_over").mousemove(function (e) {
					return function () {
						var f = allCharts[e];
						if (!(f.DataAndSettingsObject === null || !f.chartInited)) {
							f.DataAndSettingsObject.queue_requests =
								1;
							f.chartMouseMoveTimeout && clearTimeout(f.chartMouseMoveTimeout);
							f.clearChartUpdateTimeout();
							f.chartMouseMoveTimeout = setTimeout(function () {
								f.unfreezeChart()
							}, 1E3)
						}
					}
				}(d));
				$("#" + d + "_graph_tools_reset_zoom").click(function (e) {
					return function () {
						allCharts[e].ResetXTimeRange();
						return false
					}
				}(d));
				$("#" + d + "_graph_tools_toogle_line,#" + d + "_graph_tools_toogle_candles").click(function (e) {
					return function () {
						var f = allCharts[e];
						if (f.currentGraphRes !== 0 && f.currentGraphRes !== null) {
							f.startGraphLoadingAnimGif();
							f.ToggleShowCandlesAsLines();
							f.graphSavedSettings.candlesAsLines = f.DataAndSettingsObject.settings.settings.charts.chart[0].graphs.graph[0].type == "line";
							f.saveGraphCookie();
							f.updateChartIcons()
						}
						return false
					}
				}(d));
				$("#" + b.ChartId + "_graph_tools_setup_indicators").click(function (e) {
					return function () {
						openSetupIndicatorsDialog(allCharts[e]);
						return false
					}
				}(d));
				b.updateChartIcons()
			}
	}
});
var TCB = {}, $rec3_pl, $rec3_equity, $rec3_bonuses, $rec3_available, favoritesCategory = null,
	changedCategory = false;
TCB.tradingCategories_addClickHandlers = function () {
	$("#main_trade_categories").find("a.sub_category_menu_item_link").click(function () {
		$(this).next().toggle();
		$(this).children(":first").toggleClass("sc_arrow_right_img sc_arrow_bottom_img");
		scrollAndroid("main_trade_categories_p2");
		return false
	}).next().hide();
	$("#main_trade_categories").find("a.sub_category_menu_item").click(function () {
		if ($(this).parent().hasClass("sub_category_menu") && !$(this).parent().is(":visible")) {
			$(this).parent().prev().click();
			scrollAndroid("main_trade_categories_p2")
		}
		if ($(this).hasClass("sub_category_menu_item_link")) return false;
		var b = $(this).attr("id");
		if ($("#main_trade_categories").find("a.sub_category_menu_item_selected").attr("id") == b && changedCategory) return false;
		changedCategory = true;
		$("#main_trade_categories").find("a.sub_category_menu_item_selected").removeClass("sub_category_menu_item_selected");
		$(this).addClass("sub_category_menu_item_selected");
		scrollIntoView($(this), $("#main_trade_categories_p2"));
		startLoadingAnimGif();
		if (hasFlash) {
			$("#main_instruments_graph_title").text("");
			$("#main_instruments_graph_over").css("visibility", "hidden")
		}
		if (favoritesRefreshTimer !== null) {
			clearTimeout(favoritesRefreshTimer);
			favoritesRefreshTimer = null
		}
		if (b == favoritesCategory && (favoritesUpdateTimer !== null || favoritesPendingUpdateResponse)) {
			favoritesPendingSwitchToCategory = true;
			if (favoritesUpdateTimer) {
				clearTimeout(favoritesUpdateTimer);
				favoritesUpdateTimer = null;
				favoritesUpdateTimerFunc()
			}
			OpenProcessingForm()
		} else SEND_getTradeInstruments(b);
		return false
	})
};

function getSubCategoriesString(b) {
	for (var c = "", d = 0, e = b.length; d < e; d++) {
		var f = false;
		if (typeof b[d].InstrumentsSubCategories != "undefined" && b[d].InstrumentsSubCategories !== null && b[d].InstrumentsSubCategories.length > 0) f = true;
		c = c + '<a id="' + b[d].ID + '" class="sub_category_menu_item' + (f ? " sub_category_menu_item_link" : "") + '" href="#">' + (f ? '<div class="sc_arrow_right_img"></div>' : "") + b[d].Name + "</a>";
		if (f) c = c + '<div class="sub_category_menu">' + getSubCategoriesString(b[d].InstrumentsSubCategories) + "</div>";
		else if (StringToECategoryType(b[d].Type) == ECategoryType.Favorites) favoritesCategory = b[d].ID
	}
	return c
}

function createTradingCategoriesTree(b, c, d) {
	b = {
		name: b,
		sub_categories: getSubCategoriesString(c),
		is_last_category: d
	};
	return $("#trading_categories_template").jqote(b)[0]
}

function switchToReal() {
	OpenProcessingForm();
	SaveWebClientConfigurationIfNeeded(function () {
		StartedLogOutPhase();
		SENDImm_switchToRealImm({
			Email: GlobalDs.UserName
		}, function (b) {
			if (StringToESecuredServiceResult(b.SecuredServiceResult) === ESecuredServiceResult.Success) {
				writeIsRealModeToCookie(true);
				startUpFlow.reloadCurrentPage()
			} else {
				CloseProcessingForm();
				alertDialog(ALERT_TYPE.atError, b.ErrorMessage !== null && b.ErrorMessage !== "" ? b.ErrorMessage : b.SecuredServiceResult, false, function () {
					OpenProcessingForm();
					window.open(LangJSDict.urlLOGIN, "_self")
				}, null)
			}
		})
	})
}

function switchToDemo() {
	OpenProcessingForm();
	SaveWebClientConfigurationIfNeeded(function () {
		StartedLogOutPhase();
		SENDImm_switchToDemoImm({
			Email: GlobalDs.UserName
		}, function (b) {
			if (StringToESecuredServiceResult(b.SecuredServiceResult) === ESecuredServiceResult.Success) {
				writeIsRealModeToCookie(false);
				startUpFlow.reloadCurrentPage()
			} else {
				CloseProcessingForm();
				alertDialog(ALERT_TYPE.atError, b.ErrorMessage !== null && b.ErrorMessage !== "" ? b.ErrorMessage : b.SecuredServiceResult, false, function () {
					OpenProcessingForm();
					window.open(LangJSDict.urlLOGIN, "_self")
				}, null)
			}
		})
	})
}

function sortAutoCompleteByImportance(b, c) {
	return b.filterGrade - c.filterGrade
}

function filterSearchByTerm(b) {
	if (GlobalDs.SearchInstrumentInfoes === null) return [];
	b = b.toLowerCase();
	for (var c = [], d = 0; d < GlobalDs.SearchInstrumentInfoes.length; d++) {
		var e = GlobalDs.SearchInstrumentInfoes[d],
			f = e.InstrumentName.toLowerCase().indexOf(b),
			h = e.InstrumentEnglishName.toLowerCase().indexOf(b),
			g = e.Symbol.toLowerCase().indexOf(b),
			l = e.Description.toLowerCase().indexOf(b);
		if (f >= 0 || h >= 0 || g >= 0 || l >= 0) {
			e.filterGrade = e.InstrumentName.toLowerCase() == b || e.Symbol.toLowerCase() == b || e.InstrumentEnglishName.toLowerCase() ==
				b ? -45000 - (GlobalDs.SearchInstrumentInfoes.length - d) : l >= 0 && !(f >= 0 || h >= 0 || g >= 0) ? 0 - (GlobalDs.SearchInstrumentInfoes.length - d) : f === 0 || h === 0 || g === 0 ? -30000 - (GlobalDs.SearchInstrumentInfoes.length - d) : -15000 - (GlobalDs.SearchInstrumentInfoes.length - d);
			c.push(e)
		}
	}
	c.sort(sortAutoCompleteByImportance);
	return c
}

function convertFilteredResultToAutoComplete(b) {
	for (var c = [], d = 0; d < b.length; d++) c.push({
		label: (b[d].DisplaySymbol ? b[d].Symbol + "   " : "") + b[d].InstrumentName,
		InstrumentID: b[d].InstrumentID,
		CategoryID: b[d].CategoryID
	});
	return c
}
TCB.autoCompleteAfterFirstLoad = [];
TCB.getSearchInstrumentsImmCB = function (b) {
	var c = VerifyProperties(["SearchInstrumentInfoes"], b);
	if (c) ReportErrors(c);
	else {
		GlobalDs.SearchInstrumentInfoes = b.SearchInstrumentInfoes;
		if (TCB.autoCompleteAfterFirstLoad.length > 0) {
			for (b = 0; b < TCB.autoCompleteAfterFirstLoad.length; b++) TCB.autoCompleteAfterFirstLoad[b]();
			TCB.autoCompleteAfterFirstLoad = []
		}
	}
};
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$("#search_instruments").autocomplete({
			source: function (b, c) {
				var d = function () {
					var e = filterSearchByTerm(b.term);
					e = convertFilteredResultToAutoComplete(e);
					c(e);
					$(".ui-autocomplete").scrollTop(0)
				};
				if (GlobalDs.SearchInstrumentInfoes === null) {
					TCB.autoCompleteAfterFirstLoad.push(d);
					SENDImm_GetSearchInstrumentsImm({}, TCB.getSearchInstrumentsImmCB)
				} else d()
			},
			select: function (b, c) {
				$.cookie(appCookies.LastCategory, c.item.CategoryID, {
					expires: 3650,
					path: "/"
				});
				$.cookie(appCookies.LastInstrument, c.item.InstrumentID, {
					expires: 3650,
					path: "/"
				});
				if ($("#main_trade_categories").find("a.sub_category_menu_item_selected").attr("id") == c.item.CategoryID) hasFlash ? updateMainInstrumentsChartIfNeeded(c.item.InstrumentID, null, null) : scrollToInstrument(c.item.InstrumentID);
				else {
					changedCategory = false;
					$("#" + c.item.CategoryID).click()
				}
				$("#search_instruments").blur();
				return true
			}
		});
		android && $("#main_trade_categories").addClass("main_trade_categories_android");
		$("#button_switch_to_real").click(function () {
			alertDialog(ALERT_TYPE.atConfirmation,
				LangJSDict.strSWITCH_TO_REAL_QUESTION, false, switchToReal, null);
			return false
		});
		$("#switch_to_demo").click(function () {
			alertDialog(ALERT_TYPE.atConfirmation, LangJSDict.strSWITCH_TO_DEMO_QUESTION, false, switchToDemo, null);
			return false
		});
		$("#button_manage_funds").click(function () {
			if (GlobalDs.GeneralInfoReceived) GlobalDs.RegulationStatus == EUserRegulationStatus.Rejected ? alertDialog(ALERT_TYPE.atError, LangJSDict.strREGULATION_REJECTED_CONTACT_SUPPORT, false, null, null) : runStartUpFlow(EStartUpPageState.OpenFundsManagement)
		});
		$rec3_available = $("#cashier_available");
		$rec3_equity = $("#cashier_equity");
		$rec3_pl = $("#cashier_pl");
		$rec3_bonuses = $("#cashier_bonuses");
		$rec3_bonuses.click(function () {
			openBonusDialog();
			return false
		})
	}
});

function fillAccountValueRectangle() {
	var b = GlobalDs.formatMoneyAmount(GlobalDs.AccountValue.AvailableBalance, true),
		c = GlobalDs.formatMoneyAmount(GlobalDs.AccountValue.Equity, true),
		d = GlobalDs.formatMoneyAmount(GlobalDs.AccountValue.TotalNetProfitLoss, true),
		e = GlobalDs.formatMoneyAmount(GlobalDs.AccountValue.PendingBonuses, true);
	$rec3_available.text(b);
	$rec3_equity.text(c);
	$rec3_pl.text(d);
	$rec3_bonuses.text(e);
	if (GlobalDs.AccountValue.PendingBonuses === 0) {
		$rec3_bonuses.addClass("display-none-class");
		$("#cashier_bonuses_div").addClass("display-none-class")
	} else {
		$rec3_bonuses.removeClass("display-none-class");
		$("#cashier_bonuses_div").removeClass("display-none-class")
	}
}
var $buy_sell_close_at_loss_CB, $buy_sell_close_at_lossSP, $close_at_loss_label, $buy_sell_close_at_profitSP, $buy_sell_close_at_profit_CB, $close_at_profit_label, $buy_sell_orderSP, $buy_sell_order_CB, $future_order_label, $buy_sell_trailing_stopSP, $buy_sell_trailing_stop_CB, $trailing_stop_label, $buy_sell, $buy_sell_performBTN, $buy_sell_ALLSP, $buy_sell_amountSP, $buy_sell_rate_line, $buy_sell_loss_color_line, $buy_sell_profit_color_line, $buy_sell_value_line;

function startLoadingAnimGifBuySell() {
	$buy_sell.find("#buy_sell_container").addClass("display-none-class");
	$buy_sell.find("#buy_sell_frame").addClass("loading")
}

function stopLoadingAnimGifBuySell() {
	$buy_sell.find("#buy_sell_frame").removeClass("loading");
	$buy_sell.find("#buy_sell_container").removeClass("display-none-class")
}

function updateFeedInDS(b, c, d) {
	BuySellData.AssetToExchangeFeed.SellRate = b;
	BuySellData.AssetToExchangeFeed.BuyRate = c;
	BuySellData.ToUserBaseCurrencyRate = d
}
var BuySellData = {
	ExchangeMultiplier: undefined,
	ExchangeSymbol: undefined,
	ToUserBaseCurrencyRate: undefined,
	InstrumentID: undefined,
	SpreadPipsCount: undefined,
	AtomicAmount: undefined,
	MaxOrderAmountAtomicUnits: undefined,
	AssetSymbol: undefined,
	PrecisionDigits: undefined,
	InitialMarginPrecentage: undefined,
	InstrumentType: undefined,
	AssetType: undefined,
	DefaultLimitPips: undefined,
	MinLimitPips: undefined,
	MaxLimitPips: undefined,
	DeltaLimitPips: undefined,
	DefaultStopPips: undefined,
	MinStopPips: undefined,
	MaxStopPips: undefined,
	DeltaStopPips: undefined,
	DefaultTrailingStopPips: undefined,
	MinTrailingStopPips: undefined,
	MaxTrailingStopPips: undefined,
	DeltaTrailingStopPips: undefined,
	MinOrderEntryRangePips: undefined,
	DefaultOrderMarketPips: undefined,
	MaxOrderEntryRangePips: undefined,
	DeltaOrderMarketPips: undefined,
	DefaultOrderMarketRangePips: undefined,
	AssetToExchangeFeed: {
		SellRate: undefined,
		BuyRate: undefined
	}
}, EditPositionData = {
		PID: undefined,
		InstrumentID: undefined,
		InstrumentName: undefined,
		PrecisionDigits: undefined,
		Type: undefined,
		Amount: undefined,
		NetPL: undefined,
		Limit: undefined,
		Stop: undefined,
		TrailingStopPips: undefined,
		OpenRate: undefined,
		CurrentRate: undefined,
		OpenValue: undefined,
		CurrentValue: undefined,
		PremiumInExchangeCurrency: undefined,
		PL: undefined,
		InitialMarginInUserCurrency: undefined,
		MaintenanceMarginInUserCurrency: undefined,
		OpenDate: undefined
	}, EditOrderData = {
		OID: undefined,
		InstrumentID: undefined,
		InstrumentName: undefined,
		PrecisionDigits: undefined,
		Type: undefined,
		Amount: undefined,
		Status: undefined,
		Value: undefined,
		Limit: undefined,
		Stop: undefined,
		TrailingStopPips: undefined,
		OpenRate: undefined,
		MinRate: undefined,
		MaxRate: undefined,
		CurrentRate: undefined,
		OpenUntilDate: undefined,
		CreationDate: undefined
	}, GlobalBuySellDS = {
		BuySellMode: undefined,
		Delta: undefined,
		MainMode: undefined
	};
GlobalBuySellDS.setDelta = function (b) {
	GlobalBuySellDS.Delta = b
};
var UIData = {};
UIData.getAmountValue = function () {
	return parseFloatCultured($buy_sell_amountSP.val())
};
UIData.getCloseAtProfitValue = function () {
	return parseFloatCultured($buy_sell_close_at_profitSP.val())
};
UIData.getCloseAtLossValue = function () {
	return parseFloatCultured($buy_sell_close_at_lossSP.val())
};
UIData.getTrailingStopValue = function () {
	return parseFloatCultured($buy_sell_trailing_stopSP.val())
};
UIData.getFutureOrderValue = function () {
	return parseFloatCultured($buy_sell_orderSP.val())
};
GlobalBuySellDS.getCurrentOppRate = function () {
	if (GlobalBuySellDS.BuySellMode == EOpType.Sell) return BuySellData.AssetToExchangeFeed.BuyRate;
	else if (GlobalBuySellDS.BuySellMode == EOpType.Buy) return BuySellData.AssetToExchangeFeed.SellRate;
	ReportErrors("GlobalBuySellDS.getCurrentOppRate unknown enum [EOpType] value " + GlobalBuySellDS.BuySellMode);
	return -1
};
GlobalBuySellDS.getCurrentRate = function () {
	if (GlobalBuySellDS.BuySellMode == EOpType.Sell) return BuySellData.AssetToExchangeFeed.SellRate;
	else if (GlobalBuySellDS.BuySellMode == EOpType.Buy) return BuySellData.AssetToExchangeFeed.BuyRate
};

function GetCurrentActiveRate() {
	return $buy_sell_order_CB.is(":checked") ? UIData.getFutureOrderValue() : GlobalBuySellDS.MainMode == EMainModeType.EditPositon ? EditPositionData.OpenRate : GlobalBuySellDS.getCurrentRate()
}

function GetCurrentOppActiveRate() {
	var b;
	if ($buy_sell_order_CB.is(":checked")) switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Sell:
		b = UIData.getFutureOrderValue() + getPipValue(BuySellData.PrecisionDigits) * BuySellData.SpreadPipsCount;
		break;
	case EOpType.Buy:
		b = UIData.getFutureOrderValue() - getPipValue(BuySellData.PrecisionDigits) * BuySellData.SpreadPipsCount;
		break;
	default:
		ReportErrors("GetCurrentOppActiveRate unknown enum [EOpType] value " + GlobalBuySellDS.BuySellMode);
		return -1
	} else b = GlobalBuySellDS.getCurrentOppRate();
	return b
}

function isOrderAFutureOrder() {
	return $buy_sell_order_CB.is(":checked")
}

function clearCloseAtStatus(b, c, d) {
	b.prop("checked", false);
	c.addClass("display-none-class");
	d.spinbox("disable");
	if (d == $buy_sell_close_at_profitSP) $("#close_at_profit_checkbox_question_mark").empty();
	else d == $buy_sell_close_at_lossSP && $("#close_at_loss_checkbox_question_mark").empty()
}

function toggleAdvancedBuySell() {
	if ($("#advanced").hasClass("display-none-class")) {
		$("#advanced").removeClass("display-none-class");
		$("#advanced_link").text(LangJSDict.strADVANCED + "<<")
	} else {
		$("#advanced").addClass("display-none-class");
		$("#advanced_link").text(LangJSDict.strADVANCED + ">>")
	}
}

function checkBoxChangeTheLabelVisibilityAndSpinBoxDisability(b, c, d, e) {
	var f = b.is(":checked");
	clearCloseAtStatus(b, c, d);
	if (!e)
		if (f) {
			d.spinbox("enable");
			b.prop("checked", true);
			c.removeClass("display-none-class");
			if (d == $buy_sell_close_at_profitSP) {
				b = GlobalBuySellDS.BuySellMode == EOpType.Sell ? LangJSDict.strRATE_MUST_BE_SMALLER : LangJSDict.strRATE_MUST_BE_BIGGER;
				c = GlobalBuySellDS.BuySellMode == EOpType.Sell ? roundToPrecisionDigits(GetCurrentOppActiveRate() - GlobalBuySellDS.Delta * (BuySellData.MinLimitPips - 1),
					BuySellData.PrecisionDigits) : roundToPrecisionDigits(GetCurrentOppActiveRate() + GlobalBuySellDS.Delta * (BuySellData.MinLimitPips - 1), BuySellData.PrecisionDigits);
				$("#close_at_profit_checkbox_question_mark").removeClass("display-none-class");
				$('<div id="qm_close_at_profit" class="float question-mark-img" title= "' + b + " " + c + '"></div>').appendTo("#close_at_profit_checkbox_question_mark").tooltip()
			}
			if (d == $buy_sell_close_at_lossSP) {
				b = GlobalBuySellDS.BuySellMode == EOpType.Sell ? LangJSDict.strRATE_MUST_BE_BIGGER :
					LangJSDict.strRATE_MUST_BE_SMALLER;
				c = GlobalBuySellDS.BuySellMode == EOpType.Sell ? roundToPrecisionDigits(GetCurrentOppActiveRate() + GlobalBuySellDS.Delta * (BuySellData.MinStopPips - 1), BuySellData.PrecisionDigits) : roundToPrecisionDigits(GetCurrentOppActiveRate() - GlobalBuySellDS.Delta * (BuySellData.MinStopPips - 1), BuySellData.PrecisionDigits);
				$("#close_at_loss_checkbox_question_mark").removeClass("display-none-class");
				$('<div id="qm_close_at_loss" class="float question-mark-img" title= "' + b + " " + c + '"></div>').appendTo("#close_at_loss_checkbox_question_mark").tooltip()
			}
		}
}

function ServerResponseEditOrderDialogInfoImm(b, c) {
	var d = VerifyProperties(["InstrumentID", "InstrumentName", "AOrder", "BuySellDialogData"], b);
	if (d) ReportErrors(d);
	else {
		var e = b.AOrder;
		if (d = VerifyProperties(["OID", "InstrumentID", "InstrumentName", "PrecisionDigits", "Type", "Amount", "Status", "Value", "Limit", "Stop", "TrailingStopPips", "OpenRate", "MinRate", "MaxRate", "CurrentRate", "OpenUntilDate", "CreationDate"], e)) ReportErrors(d);
		else {
			EditOrderData.OID = e.OID;
			EditOrderData.InstrumentID = e.InstrumentID;
			EditOrderData.InstrumentName =
				e.InstrumentName;
			EditOrderData.PrecisionDigits = e.PrecisionDigits;
			EditOrderData.Type = e.Type;
			EditOrderData.Amount = e.Amount;
			EditOrderData.Status = e.Status;
			EditOrderData.Value = e.Value;
			EditOrderData.Limit = e.Limit;
			EditOrderData.Stop = e.Stop;
			EditOrderData.TrailingStopPips = e.TrailingStopPips;
			EditOrderData.OpenRate = e.OpenRate;
			EditOrderData.MinRate = e.MinRate;
			EditOrderData.MaxRate = e.MaxRate;
			EditOrderData.CurrentValue = e.CurrentRate;
			EditOrderData.OpenUntilDate = e.OpenUntilDate;
			EditOrderData.CreationDate = e.CreationDate;
			GlobalBuySellDS.BuySellMode = StringToEOpType(EditOrderData.Type);
			ServerResponseBuySellDialogInfoImm(b, GlobalBuySellDS.BuySellMode);
			initEditOrder(EditOrderData, BuySellData, GlobalBuySellDS.BuySellMode, c)
		}
	}
}

function ServerResponseEditPositionDialogInfoImm(b, c) {
	var d = VerifyProperties(["OPosition", "BuySellDialogData"], b);
	if (d) ReportErrors(d);
	else {
		var e = b.OPosition;
		if (d = VerifyProperties(["PID", "InstrumentID", "InstrumentName", "PrecisionDigits", "Type", "Amount", "NetPL", "Limit", "Stop", "TrailingStopPips", "OpenRate", "CurrentRate", "OpenValue", "CurrentValue", "PremiumInUserBaseCurrency", "PL", "InitialMarginInUserCurrency", "MaintenanceMarginInUserCurrency", "OpenDate"], e)) ReportErrors(d);
		else {
			EditPositionData.PID =
				e.PID;
			EditPositionData.InstrumentID = e.InstrumentID;
			EditPositionData.InstrumentName = e.InstrumentName;
			EditPositionData.PrecisionDigits = e.PrecisionDigits;
			EditPositionData.Type = e.Type;
			EditPositionData.Amount = e.Amount;
			EditPositionData.NetPL = e.NetPL;
			EditPositionData.Limit = e.Limit;
			EditPositionData.Stop = e.Stop;
			EditPositionData.TrailingStopPips = e.TrailingStopPips;
			EditPositionData.OpenRate = e.OpenRate;
			EditPositionData.CurrentRate = e.CurrentRate;
			EditPositionData.OpenValue = e.OpenValue;
			EditPositionData.CurrentValue =
				e.CurrentValue;
			EditPositionData.PremiumInExchangeCurrency = e.PremiumInExchangeCurrency;
			EditPositionData.PL = e.PL;
			EditPositionData.InitialMarginInUserCurrency = e.InitialMarginInUserCurrency;
			EditPositionData.MaintenanceMarginInUserCurrency = e.MaintenanceMarginInUserCurrency;
			EditPositionData.OpenDate = e.OpenDate;
			GlobalBuySellDS.BuySellMode = StringToEOpType(EditPositionData.Type);
			ServerResponseBuySellDialogInfoImm(b, GlobalBuySellDS.BuySellMode);
			initEditPosition(EditPositionData, BuySellData, GlobalBuySellDS.BuySellMode,
				c)
		}
	}
}

function ServerResponseBuySellDialogInfoImm(b, c) {
	var d = VerifyProperties(["BuySellDialogData"], b);
	if (d) ReportErrors(d);
	else {
		var e = b.BuySellDialogData;
		if (d = VerifyProperties(["ExchangeSymbol", "InstrumentID", "SpreadPipsCount", "AtomicAmount", "MaxOrderAmountAtomicUnits", "AssetSymbol", "PrecisionDigits", "InitialMarginPrecentage", "InstrumentType", "AssetType", "DefaultLimitPips", "MinLimitPips", "MaxLimitPips", "DeltaLimitPips", "DefaultStopPips", "MinStopPips", "MaxStopPips", "DeltaStopPips", "DefaultTrailingStopPips", "MinTrailingStopPips",
			"MaxTrailingStopPips", "DeltaTrailingStopPips", "MinOrderEntryRangePips", "DefaultOrderMarketPips", "MaxOrderEntryRangePips", "DeltaOrderMarketPips", "DefaultOrderMarketRangePips", "AssetToExchangeFeed"
		], e)) ReportErrors(d);
		else {
			BuySellData.AssetToExchangeFeed = {};
			BuySellData.AssetToExchangeFeed.BuyRate = e.AssetToExchangeFeed.BuyRate;
			BuySellData.AssetToExchangeFeed.SellRate = e.AssetToExchangeFeed.SellRate;
			BuySellData.ExchangeMultiplier = e.ExchangeMultiplier;
			BuySellData.ExchangeSymbol = e.ExchangeSymbol;
			BuySellData.ToUserBaseCurrencyRate =
				e.ToUserBaseCurrencyRate;
			BuySellData.InstrumentID = e.InstrumentID;
			BuySellData.InstrumentName = e.InstrumentName;
			BuySellData.SpreadPipsCount = e.SpreadPipsCount;
			BuySellData.AtomicAmount = e.AtomicAmount;
			BuySellData.MaxOrderAmountAtomicUnits = e.MaxOrderAmountAtomicUnits;
			BuySellData.AssetSymbol = e.AssetSymbol;
			BuySellData.PrecisionDigits = e.PrecisionDigits;
			BuySellData.InitialMarginPrecentage = e.InitialMarginPrecentage;
			BuySellData.InstrumentType = e.InstrumentType;
			BuySellData.AssetType = e.AssetType;
			BuySellData.DefaultLimitPips =
				e.DefaultLimitPips;
			BuySellData.MinLimitPips = e.MinLimitPips;
			BuySellData.MaxLimitPips = e.MaxLimitPips;
			BuySellData.DeltaLimitPips = e.DeltaLimitPips;
			BuySellData.DefaultStopPips = e.DefaultStopPips;
			BuySellData.MinStopPips = e.MinStopPips;
			BuySellData.MaxStopPips = e.MaxStopPips;
			BuySellData.DeltaStopPips = e.DeltaStopPips;
			BuySellData.DefaultTrailingStopPips = e.DefaultTrailingStopPips;
			BuySellData.MinTrailingStopPips = e.MinTrailingStopPips;
			BuySellData.MaxTrailingStopPips = e.MaxTrailingStopPips;
			BuySellData.DeltaTrailingStopPips =
				e.DeltaTrailingStopPips;
			BuySellData.MinOrderEntryRangePips = e.MinOrderEntryRangePips;
			BuySellData.DefaultOrderMarketPips = e.DefaultOrderMarketPips;
			BuySellData.MaxOrderEntryRangePips = e.MaxOrderEntryRangePips;
			BuySellData.DeltaOrderMarketPips = e.DeltaOrderMarketPips;
			BuySellData.DefaultOrderMarketRangePips = e.DefaultOrderMarketRangePips;
			init(BuySellData, c, b.RecommendedAmount || BuySellData.AtomicAmount)
		}
	}
}

function OpenBuySellDialog(b, c, d, e, f, h) {
	startLoadingAnimGifBuySell();
	BuySellData = {
		ExchangeMultiplier: undefined,
		ExchangeSymbol: undefined,
		ToUserBaseCurrencyRate: undefined,
		InstrumentID: undefined,
		SpreadPipsCount: undefined,
		AtomicAmount: undefined,
		MaxOrderAmountAtomicUnits: undefined,
		AssetSymbol: undefined,
		PrecisionDigits: undefined,
		InitialMarginPrecentage: undefined,
		InstrumentType: undefined,
		AssetType: undefined,
		DefaultLimitPips: undefined,
		MinLimitPips: undefined,
		MaxLimitPips: undefined,
		DeltaLimitPips: undefined,
		DefaultStopPips: undefined,
		MinStopPips: undefined,
		MaxStopPips: undefined,
		DeltaStopPips: undefined,
		DefaultTrailingStopPips: undefined,
		MinTrailingStopPips: undefined,
		MaxTrailingStopPips: undefined,
		DeltaTrailingStopPips: undefined,
		MinOrderEntryRangePips: undefined,
		DefaultOrderMarketPips: undefined,
		MaxOrderEntryRangePips: undefined,
		DeltaOrderMarketPips: undefined,
		DefaultOrderMarketRangePips: undefined,
		AssetToExchangeFeed: {
			SellRate: undefined,
			BuyRate: undefined
		}
	};
	$buy_sell.find("#buy_sell_inst").text(": " + f);
	$buy_sell.dialog("option",
		"title", f);
	$buy_sell.dialog("open");
	$buy_sell.find("#advanced_link").removeClass("display-none-class");
	$("#bs_trading_closed_orders_only").addClass("display-none-class");
	switch (d) {
	case EMainModeType.EditPositon:
		$("#buy_sell_dialog").find("#bs_change_values").removeClass("display-none-class");
		$("#buy_sell_dialog").find("#bs_edit_cancel_label").text(LangJSDict.strEDIT_POSITION + " ");
		$("#buy_sell_dialog").find("#bs_id_number").text("(" + c + ")");
		$("#buy_sell_dialog").data("title.dialog", LangJSDict.strEDIT_POSITION);
		break;
	case EMainModeType.EditOrder:
		$("#buy_sell_dialog").find("#bs_change_values").removeClass("display-none-class");
		$("#buy_sell_dialog").find("#bs_edit_cancel_label").text(LangJSDict.strEDIT_ORDER + " ");
		$("#buy_sell_dialog").find("#bs_id_number").text("(" + c + ")");
		$buy_sell.find("#advanced_link").addClass("display-none-class");
		$("#buy_sell_dialog").data("title.dialog", LangJSDict.strEDIT_ORDER + "(" + c + ")");
		break;
	case EMainModeType.New:
		$("#buy_sell_dialog").find("#bs_change_values").addClass("display-none-class");
		break;
	case EMainModeType.NewOrderOnly:
		$("#buy_sell_dialog").find("#bs_change_values").addClass("display-none-class");
		$buy_sell_order_CB.prop("checked", true);
		toggleAdvancedBuySell();
		$buy_sell.find("#advanced_link").addClass("display-none-class");
		checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_order_CB, $future_order_label, $buy_sell_orderSP);
		$("#bs_trading_closed_orders_only").removeClass("display-none-class");
		break;
	default:
		ReportErrors("OpenBuySellDialog unknown enum [EMainModeType] value " +
			d);
		return -1
	}
	GlobalBuySellDS.BuySellMode = e;
	GlobalBuySellDS.MainMode = d;
	if (GlobalBuySellDS.MainMode == EMainModeType.EditPositon) SENDImm_editPositionImm({
		InstrumentID: b,
		PositionID: c
	}, function (g) {
		ServerResponseEditPositionDialogInfoImm(g, h)
	});
	else if (GlobalBuySellDS.MainMode == EMainModeType.EditOrder) SENDImm_editOrderImm({
		InstrumentID: b,
		OrderID: c
	}, function (g) {
		ServerResponseEditOrderDialogInfoImm(g, h)
	});
	else if (GlobalBuySellDS.MainMode == EMainModeType.New) SENDImm_getBuySellDialogInfoImm({
		InstrumentID: b
	}, function (g) {
		ServerResponseBuySellDialogInfoImm(g,
			e)
	});
	else if (GlobalBuySellDS.MainMode == EMainModeType.NewOrderOnly) SENDImm_getBuySellDialogInfoImm({
		InstrumentID: b
	}, function (g) {
		ServerResponseBuySellDialogInfoImm(g, e)
	});
	else {
		ReportErrors("Unknown GlobalBuySellDS.MainMode : " + GlobalBuySellDS.MainMode);
		return -1
	}
	return 0
}

function PerformOrder(b) {
	var c = UIData.getAmountValue() * BuySellData.InitialMarginPrecentage * BuySellData.ToUserBaseCurrencyRate * BuySellData.ExchangeMultiplier / 100 * BuySellData.AssetToExchangeFeed.BuyRate;
	if (GlobalDs.AccountValue.AvailableBalance < c) GlobalDs.IsRealMode ? alertDialog(ALERT_TYPE.atConfirmation, LangJSDict.strDEPOSIT_REQUIRED, false, function () {
		var o = parseInt((c - GlobalDs.AccountValue.AvailableBalance) * 1.05, 10);
		ApplicationState.writeBonus({
			BonusAmountInUBC: 0,
			BonusCode: "",
			BonusEventType: EBonusEvent.OngoingDeposit,
			MinDepositAmountInUBC: o
		});
		runStartUpFlow(EStartUpPageState.SSLOpenWithDepositWithBonus)
	}, null) : alertDialog(ALERT_TYPE.atInfo, LangJSDict.strNOT_ENOUGH_MONEY_IN_DEMO_ACCOUNT, false, null, null);
	else {
		var d = GC.NIL_NUMBER;
		if (b == EModificationType.Update) d = EditOrderData.OID;
		b = EModificationTypeToString(b);
		var e = EOpTypeToString(GlobalBuySellDS.BuySellMode),
			f;
		f = isOrderAFutureOrder() ? GlobalBuySellDS.BuySellMode == EOpType.Sell ? GetCurrentActiveRate() > GlobalBuySellDS.getCurrentRate() ? EOrderEntryTypeToString(EOrderEntryType.EntryLimit) :
			EOrderEntryTypeToString(EOrderEntryType.EntryStop) : GetCurrentActiveRate() > GlobalBuySellDS.getCurrentRate() ? EOrderEntryTypeToString(EOrderEntryType.EntryStop) : EOrderEntryTypeToString(EOrderEntryType.EntryLimit) : EOrderEntryTypeToString(EOrderEntryType.Market);
		var h, g;
		if (isOrderAFutureOrder()) g = h = GetCurrentActiveRate();
		else {
			h = GetCurrentActiveRate() - BuySellData.DefaultOrderMarketRangePips * GlobalBuySellDS.Delta;
			g = GetCurrentActiveRate() + BuySellData.DefaultOrderMarketRangePips * GlobalBuySellDS.Delta
		}
		var l =
			GlobalBuySellDS.getCurrentRate(),
			n = $buy_sell_close_at_profit_CB.is(":checked") ? UIData.getCloseAtProfitValue() : GC.NIL_NUMBER,
			m = $buy_sell_close_at_loss_CB.is(":checked") ? UIData.getCloseAtLossValue() : GC.NIL_NUMBER,
			q = $buy_sell_trailing_stop_CB.is(":checked") ? UIData.getTrailingStopValue() : GC.NIL_NUMBER;
		d = new ProcessOrderRequest(b, d, BuySellData.InstrumentID, BuySellData.InstrumentName, e, f, UIData.getAmountValue(), h, g, l, n, m, GC.NIL_DATEVALUE, q);
		SEND_processOrder(d);
		$buy_sell.dialog("close")
	}
}

function PerformUpdaePosition() {
	EModificationTypeToString(EModificationType.Update);
	var b = EditPositionData.PID,
		c;
	c = $buy_sell_close_at_profit_CB.is(":checked") ? UIData.getCloseAtProfitValue() : GC.NIL_NUMBER;
	var d;
	d = $buy_sell_close_at_loss_CB.is(":checked") ? UIData.getCloseAtLossValue() : GC.NIL_NUMBER;
	var e;
	e = $buy_sell_trailing_stop_CB.is(":checked") ? UIData.getTrailingStopValue() : GC.NIL_NUMBER;
	b = new UpdaePosition(b, BuySellData.InstrumentID, BuySellData.InstrumentName, c, d, e);
	SEND_positionUpdate(b);
	$buy_sell.dialog("close")
}

function PerformBuySellAction() {
	if ($buy_sell_amountSP.hasClass(GC.FIELD_ERR_CLASS)) return false;
	switch (GlobalBuySellDS.MainMode) {
	case EMainModeType.New:
		PerformOrder(EModificationType.New);
		break;
	case EMainModeType.EditOrder:
		PerformOrder(EModificationType.Update);
		break;
	case EMainModeType.EditPositon:
		PerformUpdaePosition();
		break;
	case EMainModeType.NewOrderOnly:
		PerformOrder(EModificationType.New);
		break;
	default:
		ReportErrors("PerformBuySellAction unknown enum [EMainModeType] value " + GlobalBuySellDS.MainMode);
		return -1
	}
	return false
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$buy_sell = $("#buy_sell_dialog");
		$buy_sell_performBTN = $("#bs_button");
		$buy_sell_amountSP = $("#bs_amount");
		$buy_sell_close_at_profitSP = $("#amount_close_at_profit_spin");
		$buy_sell_close_at_lossSP = $("#amount_close_at_loss_spin");
		$buy_sell_trailing_stopSP = $("#trailing_pips_spin");
		$buy_sell_orderSP = $("#order_spin");
		$buy_sell_ALLSP = $([]).add($buy_sell_amountSP).add($buy_sell_close_at_profitSP).add($buy_sell_close_at_lossSP).add($buy_sell_trailing_stopSP).add($buy_sell_orderSP);
		$buy_sell_close_at_profit_CB =
			$("#bs_close_at_profit");
		$buy_sell_close_at_loss_CB = $("#buy_sell_close_at_loss");
		$buy_sell_trailing_stop_CB = $("#buy_sell_trailing_stop");
		$buy_sell_order_CB = $("#buy_sell_order");
		$buy_sell_rate_line = $("#buy-sell-rate-line");
		$buy_sell_value_line = $("#buy-sell-value-line");
		$close_at_profit_label = $("#close_at_profit_label");
		$close_at_loss_label = $("#close_at_loss_label");
		$trailing_stop_label = $("#buy_sell_trailing_stop_label");
		$future_order_label = $("#buy_sell_future_order_label");
		$buy_sell_profit_color_line =
			$("#buy-sell-close-at-profit-line").find(".bs-close-profit");
		$buy_sell_loss_color_line = $("#buy-sell-close-at-loss-line").find(".bs-close-loss");
		$buy_sell.dialog({
			iphoneMaxWidth: 385,
			iphoneMaxHeight: 500,
			autoOpen: false,
			modal: true,
			resizable: false,
			position: "center",
			width: GeneralUI.BuySellFormWidth,
			open: function () {
				$buy_sell_amountSP.spinbox("enable");
				$buy_sell_amountSP.find("#bs_change_values").addClass("display-none-class");
				$buy_sell_order_CB.spinbox("enable");
				$("#toUserBaseCurrencyRate").val(BuySellData.ToUserBaseCurrencyRate);
				checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_close_at_profit_CB, $close_at_profit_label, $buy_sell_close_at_profitSP, true);
				checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_close_at_loss_CB, $close_at_loss_label, $buy_sell_close_at_lossSP, true);
				checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_trailing_stop_CB, $trailing_stop_label, $buy_sell_trailing_stopSP, true);
				checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_order_CB, $future_order_label, $buy_sell_orderSP,
					true)
			},
			close: function () {
				SENDImm_notifyBuySellDialogClosedImm();
				$buy_sell_close_at_profit_CB.prop("checked", false);
				$buy_sell_close_at_loss_CB.prop("checked", false);
				$buy_sell_trailing_stop_CB.prop("checked", false);
				$buy_sell_order_CB.prop("checked", false);
				$("#advanced").addClass("display-none-class");
				clearCloseAtProfitAndCloseAtLossColors()
			}
		});
		$buy_sell.find("#buy_sell_cancel_button").click(function () {
			$buy_sell.dialog("close");
			return false
		});
		$buy_sell_order_CB.click(function () {
			if (GlobalBuySellDS.MainMode ==
				EMainModeType.NewOrderOnly) return false;
			var b = {};
			$(this).is(":checked") ? CentralBuySellEvents.SendEvent(EVENT_TYPE.FutureOrderChange, b) : CentralBuySellEvents.SendEvent(EVENT_TYPE.CurrentValueChange, b);
			return true
		});
		$buy_sell_close_at_profit_CB.click(function () {
			checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_close_at_profit_CB, $close_at_profit_label, $buy_sell_close_at_profitSP)
		});
		$buy_sell_close_at_loss_CB.click(function () {
			checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_close_at_loss_CB,
				$close_at_loss_label, $buy_sell_close_at_lossSP)
		});
		$buy_sell_trailing_stop_CB.click(function () {
			checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_trailing_stop_CB, $trailing_stop_label, $buy_sell_trailing_stopSP)
		});
		$buy_sell_order_CB.click(function () {
			if (GlobalBuySellDS.MainMode == EMainModeType.NewOrderOnly) return false;
			checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_order_CB, $future_order_label, $buy_sell_orderSP);
			return true
		});
		$buy_sell_performBTN.click(PerformBuySellAction);
		$("#button_test_area").find("#buy_sell").click(function () {
			$buy_sell.dialog("open");
			SENDImm_getBuySellDialogInfoImm({
				Operation: "Buy",
				InstrumentID: 2
			}, function () {});
			return false
		});
		$buy_sell.find("#advanced_link").click(function () {
			GlobalBuySellDS.MainMode != EMainModeType.NewOrderOnly && toggleAdvancedBuySell();
			return false
		});
		$buy_sell.find("#bs_debug").click(function () {
			var b = {};
			if ($buy_sell.find("#buy_sell_mode").text() == LangJSDict.strBUYING) {
				b.mode = EOpType.Buy;
				b.BuyRate = parseFloatCultured($("#currentValue").val());
				BuySellData.AssetToExchangeFeed.BuyRate = b.BuyRate;
				b.SellRate = parseFloatCultured($("#currentAppValue").val())
			} else {
				b.mode = EOpType.Sell;
				b.SellRate = parseFloatCultured($("#currentValue").val());
				b.BuyRate = parseFloatCultured($("#currentAppValue").val());
				BuySellData.AssetToExchangeFeed.BuyRate = b.BuyRate
			}
			BuySellData.AssetToExchangeFeed.SellRate = b.SellRate;
			BuySellData.ToUserBaseCurrencyRate = parseFloatCultured($("#toUserBaseCurrencyRate").val());
			updateFeedInDS(b.SellRate, b.BuyRate, BuySellData.ToUserBaseCurrencyRate);
			CentralBuySellEvents.SendEvent(EVENT_TYPE.CurrentValueChange, b);
			return false
		})
	}
});

function handleBuySellDialogFeed(b, c, d, e) {
	var f = {};
	if (BuySellData.InstrumentID == d) {
		updateFeedInDS(b, c, e);
		CentralBuySellEvents.SendEvent(EVENT_TYPE.CurrentValueChange, f)
	}
}
var CentralBuySellEvents = {};
CentralBuySellEvents.currentValueChangeEventCBs = [];
CentralBuySellEvents.futureOrderChangeEventCBs = [];
CentralBuySellEvents.currentAmountChangeEventCBs = [];
CentralBuySellEvents.RegisterEvent = function (b, c) {
	switch (b) {
	case EVENT_TYPE.FutureOrderChange:
		CentralBuySellEvents.futureOrderChangeEventCBs.push(c);
		break;
	case EVENT_TYPE.CurrentValueChange:
		CentralBuySellEvents.currentValueChangeEventCBs.push(c);
		break;
	case EVENT_TYPE.CurrentAmountChange:
		CentralBuySellEvents.currentAmountChangeEventCBs.push(c);
		break;
	default:
		ReportErrors("CentralBuySellEvents.RegisterEvent: Unknwon " + b + " enum value!");
		return -1
	}
	return 0
};
CentralBuySellEvents.SendEvent = function (b, c) {
	switch (b) {
	case EVENT_TYPE.FutureOrderChange:
		for (b = 0; b < CentralBuySellEvents.futureOrderChangeEventCBs.length; b++) CentralBuySellEvents.futureOrderChangeEventCBs[b](c);
		break;
	case EVENT_TYPE.CurrentValueChange:
		for (b = 0; b < CentralBuySellEvents.currentValueChangeEventCBs.length; b++) CentralBuySellEvents.currentValueChangeEventCBs[b](c);
		break;
	case EVENT_TYPE.CurrentAmountChange:
		for (b = 0; b < CentralBuySellEvents.currentAmountChangeEventCBs.length; b++) CentralBuySellEvents.currentAmountChangeEventCBs[b](c);
		break;
	default:
		ReportErrors("CentralBuySellEvents.SendEvent: Unknwon " + b + " enum value!");
		return -1
	}
	return 0
};

function changeFutureOrderValueIfNeeded(b, c, d) {
	var e = 0;
	if (c > b - d && c < b + d) {
		e = Math.abs(c - (b - d)) > Math.abs(c - (b + d)) ? b + d : b - d;
		e = roundToPrecisionDigits(e, BuySellData.PrecisionDigits);
		$buy_sell_orderSP.val(e)
	}
}
var CurrentRateDisplay = {};
CurrentRateDisplay.getDisplayedCurrentRate = function () {
	if (GlobalBuySellDS.MainMode == EMainModeType.EditPositon) switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		return BuySellData.AssetToExchangeFeed.SellRate;
	case EOpType.Sell:
		return BuySellData.AssetToExchangeFeed.BuyRate;
	default:
		ReportErrors("CurrentRateDisplay.getDisplayedCurrentRate " + GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	} else switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		return BuySellData.AssetToExchangeFeed.BuyRate;
	case EOpType.Sell:
		return BuySellData.AssetToExchangeFeed.SellRate;
	default:
		ReportErrors("CurrentRateDisplay.getDisplayedCurrentRate " + GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	}
};
CurrentRateDisplay.getDisplayedCurrentRateSt = function () {
	return roundToPrecisionDigits(CurrentRateDisplay.getDisplayedCurrentRate(), BuySellData.PrecisionDigits)
};
CurrentRateDisplay.updataLabels = function () {
	$buy_sell.find("#bs_current_rate").text(CurrentRateDisplay.getDisplayedCurrentRateSt())
};
CurrentRateDisplay.CurrentValueChange = function () {
	CurrentRateDisplay.updataLabels()
};
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.CurrentValueChange, CurrentRateDisplay.CurrentValueChange);
var AmountLabels = {};
AmountLabels.updateLabels = function () {
	var b;
	b = GlobalBuySellDS.MainMode == EMainModeType.EditPositon ? GlobalBuySellDS.getCurrentOppRate() : GlobalBuySellDS.getCurrentRate();
	b = valueString(BuySellData.InstrumentType, b, UIData.getAmountValue(), BuySellData.ToUserBaseCurrencyRate, BuySellData.ExchangeSymbol, GlobalDs.UserBaseCurrencySymbol, BuySellData.AssetSymbol);
	$buy_sell_value_line.find(".buy-sell-sum-value").text(b);
	if (GlobalBuySellDS.MainMode != EMainModeType.EditPositon) {
		b = getRequiredSecuritiesString(BuySellData.InstrumentType,
			BuySellData.AssetToExchangeFeed.BuyRate, UIData.getAmountValue(), BuySellData.ToUserBaseCurrencyRate, BuySellData.InitialMarginPrecentage, GlobalDs.UserBaseCurrencySymbol, BuySellData.AssetSymbol, BuySellData.ExchangeSymbol);
		$buy_sell.find("#buy-sell-required-line").find(".buy-sell-sum").text(b)
	}
};
AmountLabels.isAllFieldsContainNumbers = function () {
	var b = true;
	if ($buy_sell_amountSP.val().length === 0 || isNaN(parseFloatCultured($buy_sell_amountSP.val()))) b = false;
	return b
};
AmountLabels.CurrentAmountChange = function () {
	AmountLabels.isAllFieldsContainNumbers() && AmountLabels.updateLabels()
};
AmountLabels.CurrentValueChange = function () {
	AmountLabels.isAllFieldsContainNumbers() && AmountLabels.updateLabels()
};
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.CurrentAmountChange, AmountLabels.CurrentAmountChange);
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.CurrentValueChange, AmountLabels.CurrentValueChange);
var CloseAtProfit = {};
CloseAtProfit.updateSpinbox = function () {
	if (document.activeElement.id === "amount_close_at_profit_spin") return 0;
	var b = UIData.getCloseAtProfitValue(),
		c = GetCurrentOppActiveRate();
	switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		$buy_sell_close_at_profitSP.spinbox({
			min: Math.max(c + GlobalBuySellDS.Delta * BuySellData.MinLimitPips - GC.EPS, 0),
			max: c + GlobalBuySellDS.Delta * BuySellData.MaxLimitPips + GC.EPS,
			step: GlobalBuySellDS.Delta * BuySellData.DeltaLimitPips,
			bigStep: 10 * GlobalBuySellDS.Delta * BuySellData.DeltaLimitPips,
			scale: BuySellData.PrecisionDigits,
			update: true
		});
		MoveSpinBoxToCloseEdgeIfNeeded(GlobalBuySellDS.BuySellMode, $buy_sell_close_at_profitSP, b, GlobalBuySellDS.getCurrentRate(), BuySellData.PrecisionDigits);
		$buy_sell_close_at_profit_CB.is(":checked") || $buy_sell_close_at_profitSP.val(roundToPrecisionDigits(c + GlobalBuySellDS.Delta * BuySellData.DefaultLimitPips, BuySellData.PrecisionDigits));
		break;
	case EOpType.Sell:
		$buy_sell_close_at_profitSP.spinbox({
			min: Math.max(c - GlobalBuySellDS.Delta * BuySellData.MaxLimitPips -
				GC.EPS, 0),
			max: c - GlobalBuySellDS.Delta * BuySellData.MinLimitPips + GC.EPS,
			step: GlobalBuySellDS.Delta * BuySellData.DeltaLimitPips,
			bigStep: 10 * GlobalBuySellDS.Delta * BuySellData.DeltaLimitPips,
			scale: BuySellData.PrecisionDigits,
			update: true
		});
		MoveSpinBoxToCloseEdgeIfNeeded(GlobalBuySellDS.BuySellMode, $buy_sell_close_at_profitSP, b, GlobalBuySellDS.getCurrentRate(), BuySellData.PrecisionDigits);
		$buy_sell_close_at_profit_CB.is(":checked") || $buy_sell_close_at_profitSP.val(roundToPrecisionDigits(c - GlobalBuySellDS.Delta *
			BuySellData.DefaultLimitPips, BuySellData.PrecisionDigits));
		break;
	default:
		ReportErrors("CurrentRateDisplay.getDisplayedCurrentRate " + GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	}
	return 0
};
CloseAtProfit.updateLabels = function () {
	switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		updateCloseExpectedProfitLabel(GlobalBuySellDS.BuySellMode, GetCurrentActiveRate(), $buy_sell_close_at_profitSP, BuySellData.ToUserBaseCurrencyRate, UIData.getAmountValue());
		break;
	case EOpType.Sell:
		updateCloseExpectedProfitLabel(GlobalBuySellDS.BuySellMode, GetCurrentActiveRate(), $buy_sell_close_at_profitSP, BuySellData.ToUserBaseCurrencyRate, UIData.getAmountValue());
		break;
	default:
		ReportErrors("CloseAtProfit.updateLabels " +
			GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	}
	return 0
};
CloseAtProfit.CurrentAmountChange = function () {
	CloseAtProfit.isAllFieldsContainNumbers() && CloseAtProfit.updateLabels()
};
CloseAtProfit.CurrentValueChange = function () {
	if (CloseAtProfit.isAllFieldsContainNumbers()) {
		CloseAtProfit.updateLabels();
		CloseAtProfit.updateSpinbox()
	}
};
CloseAtProfit.FutureOrderChange = function () {
	if (isOrderAFutureOrder())
		if (CloseAtProfit.isAllFieldsContainNumbers()) {
			CloseAtProfit.updateLabels();
			CloseAtProfit.updateSpinbox()
		}
};
CloseAtProfit.isAllFieldsContainNumbers = function () {
	var b = true;
	if ($buy_sell_amountSP.val().length === 0 || $buy_sell_close_at_profitSP.val().length === 0 || isNaN(parseFloatCultured($buy_sell_amountSP.val())) || isNaN(parseFloatCultured($buy_sell_close_at_profitSP.val()))) b = false;
	if (isOrderAFutureOrder() && ($buy_sell_orderSP.val().length === 0 || $buy_sell_orderSP.val() === "0" || isNaN(parseFloatCultured($buy_sell_orderSP.val())))) b = false;
	return b
};
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.CurrentAmountChange, CloseAtProfit.CurrentAmountChange);
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.CurrentValueChange, CloseAtProfit.CurrentValueChange);
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.FutureOrderChange, CloseAtProfit.FutureOrderChange);

function MoveSpinBoxToCloseEdgeIfNeeded(b, c, d, e, f) {
	b = c.data("spinboxMin");
	var h = c.data("spinboxMax");
	d = d;
	if (isNaN(d)) d = e;
	b < d && h > d || (d = Math.abs(d - b) > Math.abs(d - h) ? h : b);
	d = roundToPrecisionDigits(d, f);
	c.val(d)
}
var CloseAtLoss = {};
CloseAtLoss.updateLabels = function () {
	switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		updateCloseExpectedProfitLabel(GlobalBuySellDS.BuySellMode, GetCurrentActiveRate(), $buy_sell_close_at_lossSP, BuySellData.ToUserBaseCurrencyRate, UIData.getAmountValue());
		break;
	case EOpType.Sell:
		updateCloseExpectedProfitLabel(GlobalBuySellDS.BuySellMode, GetCurrentActiveRate(), $buy_sell_close_at_lossSP, BuySellData.ToUserBaseCurrencyRate, UIData.getAmountValue());
		break;
	default:
		ReportErrors("CloseAtLoss.updateLabels " +
			GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	}
	return 0
};
CloseAtLoss.updateSpinbox = function () {
	if (document.activeElement.id === "amount_close_at_loss_spin") return 0;
	var b = UIData.getCloseAtLossValue(),
		c = GetCurrentOppActiveRate();
	switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		$buy_sell_close_at_lossSP.spinbox({
			min: Math.max(c - GlobalBuySellDS.Delta * BuySellData.MaxStopPips + GC.EPS, 0),
			max: c - GlobalBuySellDS.Delta * BuySellData.MinStopPips - GC.EPS,
			step: GlobalBuySellDS.Delta * BuySellData.DeltaStopPips,
			bigStep: 10 * GlobalBuySellDS.Delta * BuySellData.DeltaStopPips,
			scale: BuySellData.PrecisionDigits,
			update: true
		});
		MoveSpinBoxToCloseEdgeIfNeeded(GlobalBuySellDS.BuySellMode, $buy_sell_close_at_lossSP, b, GlobalBuySellDS.getCurrentRate(), BuySellData.PrecisionDigits);
		$buy_sell_close_at_loss_CB.is(":checked") || $buy_sell_close_at_lossSP.val(roundToPrecisionDigits(c - GlobalBuySellDS.Delta * BuySellData.DefaultStopPips, BuySellData.PrecisionDigits));
		break;
	case EOpType.Sell:
		$buy_sell_close_at_lossSP.spinbox({
			min: Math.max(c + GlobalBuySellDS.Delta * BuySellData.MinStopPips - GC.EPS, 0),
			max: c + GlobalBuySellDS.Delta * BuySellData.MaxStopPips + GC.EPS,
			step: GlobalBuySellDS.Delta * BuySellData.DeltaStopPips,
			bigStep: 10 * GlobalBuySellDS.Delta * BuySellData.DeltaStopPips,
			scale: BuySellData.PrecisionDigits,
			update: true
		});
		MoveSpinBoxToCloseEdgeIfNeeded(GlobalBuySellDS.BuySellMode, $buy_sell_close_at_lossSP, b, GlobalBuySellDS.getCurrentRate(), BuySellData.PrecisionDigits);
		$buy_sell_close_at_loss_CB.is(":checked") || $buy_sell_close_at_lossSP.val(roundToPrecisionDigits(c + GlobalBuySellDS.Delta * BuySellData.DefaultStopPips, BuySellData.PrecisionDigits));
		break;
	default:
		ReportErrors("CloseAtLoss.updateSpinbox " +
			GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	}
	return 0
};
CloseAtLoss.CurrentAmountChange = function () {
	CloseAtLoss.isAllFieldsContainNumbers() && CloseAtLoss.updateLabels()
};
CloseAtLoss.CurrentValueChange = function () {
	if (CloseAtLoss.isAllFieldsContainNumbers()) {
		CloseAtLoss.updateLabels();
		CloseAtLoss.updateSpinbox()
	}
};
CloseAtLoss.FutureOrderChange = function () {
	if (isOrderAFutureOrder())
		if (CloseAtLoss.isAllFieldsContainNumbers()) {
			CloseAtLoss.updateLabels();
			CloseAtLoss.updateSpinbox()
		}
};
CloseAtLoss.isAllFieldsContainNumbers = function () {
	var b = true;
	if ($buy_sell_amountSP.val().length === 0 || $buy_sell_close_at_lossSP.val().length === 0 || isNaN(parseFloatCultured($buy_sell_amountSP.val())) || isNaN(parseFloatCultured($buy_sell_close_at_lossSP.val()))) b = false;
	if (isOrderAFutureOrder() && ($buy_sell_orderSP.val().length === 0 || $buy_sell_orderSP.val() === "0" || isNaN(parseFloatCultured($buy_sell_orderSP.val())))) b = false;
	return b
};
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.CurrentAmountChange, CloseAtLoss.CurrentAmountChange);
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.CurrentValueChange, CloseAtLoss.CurrentValueChange);
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.FutureOrderChange, CloseAtLoss.FutureOrderChange);
var TrailingStop = {};
TrailingStop.updateLabels = function () {
	switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		getTrailingStopExpectedProfit(GlobalBuySellDS.BuySellMode, UIData.getTrailingStopValue(), UIData.getAmountValue(), BuySellData.ToUserBaseCurrencyRate, GetCurrentActiveRate(), BuySellData.SpreadPipsCount, BuySellData.PrecisionDigits);
		break;
	case EOpType.Sell:
		getTrailingStopExpectedProfit(GlobalBuySellDS.BuySellMode, UIData.getTrailingStopValue(), UIData.getAmountValue(), BuySellData.ToUserBaseCurrencyRate, GetCurrentActiveRate(),
			BuySellData.SpreadPipsCount, BuySellData.PrecisionDigits);
		break;
	default:
		ReportErrors("TrailingStop.updateLabels " + GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	}
	return 0
};
TrailingStop.CurrentAmountChange = function () {
	TrailingStop.isAllFieldsContainNumbers() && TrailingStop.updateLabels()
};
TrailingStop.CurrentValueChange = function () {
	TrailingStop.isAllFieldsContainNumbers() && TrailingStop.updateLabels()
};
TrailingStop.FutureOrderChange = function () {
	isOrderAFutureOrder() && TrailingStop.isAllFieldsContainNumbers() && TrailingStop.updateLabels()
};
TrailingStop.isAllFieldsContainNumbers = function () {
	var b = true;
	if ($buy_sell_amountSP.val().length === 0 || $buy_sell_trailing_stopSP.val().length === 0 || isNaN(parseFloatCultured($buy_sell_amountSP.val())) || isNaN(parseFloatCultured($buy_sell_trailing_stopSP.val()))) b = false;
	if (isOrderAFutureOrder() && ($buy_sell_orderSP.val().length === 0 || $buy_sell_orderSP.val() === "0" || isNaN(parseFloatCultured($buy_sell_orderSP.val())))) b = false;
	return b
};
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.CurrentAmountChange, TrailingStop.CurrentAmountChange);
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.CurrentValueChange, TrailingStop.CurrentValueChange);
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.FutureOrderChange, TrailingStop.FutureOrderChange);

function amountChanged() {
	AmountLabels.isAllFieldsContainNumbers() && CentralBuySellEvents.SendEvent(EVENT_TYPE.CurrentAmountChange, {})
}

function closeAtProfitChanged() {
	CloseAtProfit.isAllFieldsContainNumbers() && CloseAtProfit.updateLabels()
}

function closeAtLossChanged() {
	CloseAtLoss.isAllFieldsContainNumbers() && CloseAtLoss.updateLabels()
}

function trailingStopChanged() {
	TrailingStop.isAllFieldsContainNumbers() && TrailingStop.updateLabels()
}

function futureOrderChanged() {
	if (!FutureOrder.isAllFieldsContainNumbers()) return false;
	FutureOrder.updateLabels();
	CentralBuySellEvents.SendEvent(EVENT_TYPE.FutureOrderChange, {});
	checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_close_at_profit_CB, $close_at_profit_label, $buy_sell_close_at_profitSP, false);
	checkBoxChangeTheLabelVisibilityAndSpinBoxDisability($buy_sell_close_at_loss_CB, $close_at_loss_label, $buy_sell_close_at_lossSP, false);
	return false
}
var FutureOrder = {};
FutureOrder.updateLabels = function () {
	switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		changeFutureOrderValueIfNeeded(BuySellData.AssetToExchangeFeed.BuyRate, UIData.getFutureOrderValue(), BuySellData.MinOrderEntryRangePips * GlobalBuySellDS.Delta);
		getOrderChangePrecentForCurrentRate(BuySellData.AssetToExchangeFeed.BuyRate, UIData.getFutureOrderValue());
		break;
	case EOpType.Sell:
		changeFutureOrderValueIfNeeded(BuySellData.AssetToExchangeFeed.SellRate, UIData.getFutureOrderValue(), BuySellData.MinOrderEntryRangePips *
			GlobalBuySellDS.Delta);
		getOrderChangePrecentForCurrentRate(BuySellData.AssetToExchangeFeed.SellRate, UIData.getFutureOrderValue());
		break;
	default:
		ReportErrors("FutureOrder.updateLabels " + GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	}
	return 0
};
FutureOrder.updateSpinBox = function () {
	if (isOrderAFutureOrder()) $buy_sell_orderSP.spinbox("enable");
	else {
		$buy_sell_orderSP.spinbox("disable");
		switch (GlobalBuySellDS.BuySellMode) {
		case EOpType.Buy:
			$buy_sell_orderSP.val(roundToPrecisionDigits(BuySellData.AssetToExchangeFeed.BuyRate + GlobalBuySellDS.Delta * BuySellData.DefaultOrderMarketPips, BuySellData.PrecisionDigits));
			break;
		case EOpType.Sell:
			$buy_sell_order_CB.is(":checked") || $buy_sell_orderSP.val(roundToPrecisionDigits(BuySellData.AssetToExchangeFeed.SellRate -
				GlobalBuySellDS.Delta * BuySellData.DefaultOrderMarketPips, BuySellData.PrecisionDigits));
			break;
		default:
			ReportErrors("FutureOrder.updateSpinBox " + EOpType.Buy + " enum value!");
			return -1
		}
	}
	var b;
	switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		break;
	case EOpType.Sell:
		break;
	default:
		ReportErrors("FutureOrder.updateSpinBox " + GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	}
	b = GlobalBuySellDS.getCurrentRate();
	var c = UIData.getFutureOrderValue(),
		d = b + BuySellData.MinOrderEntryRangePips * GlobalBuySellDS.Delta;
	d = convertStringToNumberWithPrecisionDigits(d, BuySellData.PrecisionDigits);
	b = b - BuySellData.MinOrderEntryRangePips * GlobalBuySellDS.Delta;
	b = convertStringToNumberWithPrecisionDigits(b, BuySellData.PrecisionDigits);
	if (c > b && c < d) {
		c = d - c > c - b ? b : d;
		$buy_sell_orderSP.val(roundToPrecisionDigits(c, BuySellData.PrecisionDigits))
	}
	FutureOrder.updateLabels();
	return 0
};
FutureOrder.CurrentValueChange = function () {
	if ($buy_sell_order_CB.is(":checked"))
		if (FutureOrder.isAllFieldsContainNumbers()) {
			FutureOrder.updateSpinBox();
			FutureOrder.updateLabels()
		}
};
FutureOrder.isAllFieldsContainNumbers = function () {
	var b = true;
	if ($buy_sell_amountSP.val().length === 0 || $buy_sell_amountSP.val() === 0 || isNaN(parseFloatCultured($buy_sell_amountSP.val()))) b = false;
	if ($buy_sell_order_CB.is(":checked") && ($buy_sell_orderSP.val().length === 0 || $buy_sell_orderSP.val() === "0" || isNaN(parseFloatCultured($buy_sell_orderSP.val())))) b = false;
	return b
};
FutureOrder.FutureValueChange = function () {
	$buy_sell_order_CB.is(":checked") && FutureOrder.isAllFieldsContainNumbers() && FutureOrder.updateLabels()
};

function incOrDecFutureOrder(b, c, d, e, f, h) {
	if (c === 0) return b;
	b = UIData.getFutureOrderValue() + h * c;
	switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		c = BuySellData.AssetToExchangeFeed.BuyRate;
		break;
	case EOpType.Sell:
		c = BuySellData.AssetToExchangeFeed.SellRate;
		break;
	default:
		ReportErrors("incOrDecFutureOrder " + GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	}
	if (b > c - BuySellData.MinOrderEntryRangePips * GlobalBuySellDS.Delta && b < c + BuySellData.MinOrderEntryRangePips * GlobalBuySellDS.Delta) b = c + BuySellData.MinOrderEntryRangePips *
		h * GlobalBuySellDS.Delta;
	return b
}

function decFutureOrder(b, c, d, e, f) {
	return incOrDecFutureOrder(b, c, d, e, f, -1)
}

function incFutureOrder(b, c, d, e, f) {
	return incOrDecFutureOrder(b, c, d, e, f, +1)
}

function convertStringToNumberWithPrecisionDigits(b, c) {
	b = roundToPrecisionDigits(b, c);
	return b = parseFloatCultured(b)
}

function onChangeFutureOrderSpinBoxValue() {
	var b = UIData.getFutureOrderValue(),
		c;
	switch (GlobalBuySellDS.BuySellMode) {
	case EOpType.Buy:
		c = BuySellData.AssetToExchangeFeed.BuyRate;
		break;
	case EOpType.Sell:
		c = BuySellData.AssetToExchangeFeed.SellRate;
		break;
	default:
		ReportErrors("onChangeFutureOrderSpinBoxValue " + GlobalBuySellDS.BuySellMode + " enum value!");
		return -1
	}
	var d = c + BuySellData.MinOrderEntryRangePips * GlobalBuySellDS.Delta;
	d = convertStringToNumberWithPrecisionDigits(d, BuySellData.PrecisionDigits);
	var e =
		c - BuySellData.MinOrderEntryRangePips * GlobalBuySellDS.Delta;
	e = convertStringToNumberWithPrecisionDigits(e, BuySellData.PrecisionDigits);
	if (isNaN(b)) b = c + BuySellData.DefaultOrderMarketPips * GlobalBuySellDS.Delta;
	else if (b > e && b < d) b = d - b > b - e ? e : d;
	else return 0;
	$buy_sell_orderSP.val(b);
	return 0
}
CentralBuySellEvents.RegisterEvent(EVENT_TYPE.CurrentValueChange, FutureOrder.CurrentValueChange);

function initEditPosition(b, c, d, e) {
	$("#bs_opening_rate").text(roundToPrecisionDigits(b.OpenRate, c.PrecisionDigits));
	$("#bs_opening_rate_text").removeClass("display-none-class");
	$("#bs_opening_rate").removeClass("display-none-class");
	switch (StringToEInstrumentType(c.InstrumentType)) {
	case EInstrumentType.Forex:
		$buy_sell_rate_line.find("#bs_opening_coin_symbol").addClass("display-none-class");
		break;
	default:
		if (c.ExchangeMultiplier >= 1) {
			$("#bs_opening_coin_symbol").removeClass("display-none-class");
			$("#bs_opening_coin_symbol").text(c.ExchangeSymbol);
			break
		}
		break
	}
	c = requiredSecuritiesStringEditPosition(b.InitialMarginInUserCurrency);
	$buy_sell.find("#buy-sell-required-line").find(".buy-sell-sum").text(c);
	if (b.Limit !== null) {
		$buy_sell_close_at_profitSP.val(roundToPrecisionDigits(b.Limit, b.PrecisionDigits));
		$buy_sell_close_at_profit_CB.prop("checked", true);
		$buy_sell_close_at_profit_CB.triggerHandler("click")
	}
	if (b.Stop !== null) {
		$buy_sell_close_at_lossSP.val(roundToPrecisionDigits(b.Stop, b.PrecisionDigits));
		$buy_sell_close_at_loss_CB.prop("checked", true);
		$buy_sell_close_at_loss_CB.triggerHandler("click")
	}
	if (b.TrailingStopPips !== null) {
		$buy_sell_trailing_stopSP.val(b.TrailingStopPips);
		$buy_sell_trailing_stop_CB.prop("checked", true);
		$buy_sell_trailing_stop_CB.triggerHandler("click")
	}
	$buy_sell_amountSP.spinbox("disable");
	$buy_sell_amountSP.val(b.Amount);
	$("#only-sell-when-rate").addClass("display-none-class");
	$("#bs_btn_text").text(LangJSDict.strUPDATE);
	$buy_sell_trailing_stop_CB.is(":checked") && $buy_sell.find("#advanced").removeClass("display-none-class");
	CloseAtProfit.updateLabels();
	CloseAtLoss.updateLabels();
	AmountLabels.updateLabels();
	if (typeof e != "undefined") {
		typeof e.closeAtProfit != "undefined" && openBuySellDialogWithCloseAtProfitClicked();
		typeof e.closeAtLoss != "undefined" && openBuySellDialogWithCloseAtLossClicked()
	}
}

function openBuySellDialogWithCloseAtProfitClicked() {
	$buy_sell_close_at_profit_CB.prop("checked", true);
	$buy_sell_close_at_profit_CB.triggerHandler("click");
	$buy_sell_profit_color_line.addClass("bs-color")
}

function openBuySellDialogWithCloseAtLossClicked() {
	$buy_sell_close_at_loss_CB.prop("checked", true);
	$buy_sell_close_at_loss_CB.triggerHandler("click");
	$buy_sell_loss_color_line.addClass("bs-color")
}

function clearCloseAtProfitAndCloseAtLossColors() {
	$buy_sell_profit_color_line.removeClass("bs-color");
	$buy_sell_loss_color_line.removeClass("bs-color")
}

function initEditOrder(b, c, d, e) {
	$buy_sell_orderSP.val(roundToPrecisionDigits(b.MinRate, b.PrecisionDigits));
	$buy_sell_order_CB.prop("checked", true);
	$buy_sell_order_CB.triggerHandler("click");
	if (b.Limit !== null) {
		$buy_sell_close_at_profitSP.val(roundToPrecisionDigits(b.Limit, b.PrecisionDigits));
		$buy_sell_close_at_profit_CB.prop("checked", true);
		$buy_sell_close_at_profit_CB.triggerHandler("click")
	}
	if (b.Stop !== null) {
		$buy_sell_close_at_lossSP.val(roundToPrecisionDigits(b.Stop, b.PrecisionDigits));
		$buy_sell_close_at_loss_CB.prop("checked",
			true);
		$buy_sell_close_at_loss_CB.triggerHandler("click")
	}
	if (b.TrailingStopPips !== null) {
		$buy_sell_trailing_stopSP.val(b.TrailingStopPips);
		$buy_sell_trailing_stop_CB.prop("checked", true);
		$buy_sell_trailing_stop_CB.triggerHandler("click")
	}
	$buy_sell_amountSP.spinbox("disable");
	$buy_sell_amountSP.val(b.Amount);
	$buy_sell_order_CB.spinbox("disable");
	$("#bs_btn_text").text(LangJSDict.strUPDATE);
	$buy_sell.find("#advanced_link").click();
	CloseAtProfit.updateLabels();
	CloseAtLoss.updateLabels();
	AmountLabels.updateLabels();
	if (typeof e != "undefined") {
		typeof e.closeAtProfit != "undefined" && openBuySellDialogWithCloseAtProfitClicked();
		typeof e.closeAtLoss != "undefined" && openBuySellDialogWithCloseAtLossClicked()
	}
}

function init(b, c, d) {
	$buy_sell_ALLSP.unbind();
	GlobalBuySellDS.setDelta(getPipValue(b.PrecisionDigits));
	$buy_sell.find(".buy-sell-coin").text(b.AssetSymbol);
	$buy_sell_amountSP.spinbox("destroy").spinbox({
		min: b.AtomicAmount,
		max: b.MaxOrderAmountAtomicUnits * b.AtomicAmount,
		step: b.AtomicAmount,
		bigStep: 10 * b.AtomicAmount,
		atomicAmount: b.AtomicAmount,
		invalidClass: GC.FIELD_ERR_CLASS
	});
	$buy_sell_amountSP.val(d || b.AtomicAmount);
	$buy_sell_trailing_stopSP.spinbox("destroy").spinbox({
		min: b.MinTrailingStopPips,
		max: b.MaxTrailingStopPips,
		step: b.DeltaTrailingStopPips,
		bigStep: 10 * b.DeltaTrailingStopPips
	}).spinbox("disable");
	$buy_sell_trailing_stopSP.val(b.DefaultTrailingStopPips);
	$buy_sell_orderSP.spinbox("destroy").spinbox({
		min: roundToPrecisionDigits(0.1, b.PrecisionDigits),
		max: 9999999,
		step: GlobalBuySellDS.Delta * b.DeltaOrderMarketPips,
		bigStep: 10 * GlobalBuySellDS.Delta * b.DeltaOrderMarketPips,
		scale: b.PrecisionDigits,
		decrement: decFutureOrder,
		increment: incFutureOrder
	});
	switch (c) {
	case EOpType.Buy:
		$("#bs_btn_text").text(LangJSDict.strBUY);
		$buy_sell.find("#bs_current_rate").text(CurrentRateDisplay.getDisplayedCurrentRateSt());
		$buy_sell.find("#buy_sell_mode").text(LangJSDict.strBUYING);
		$buy_sell_close_at_profitSP.spinbox("destroy").spinbox({
			min: Math.max(b.AssetToExchangeFeed.SellRate + GlobalBuySellDS.Delta * b.MinLimitPips - GC.EPS, 0),
			max: b.AssetToExchangeFeed.SellRate + GlobalBuySellDS.Delta * b.MaxLimitPips + GC.EPS,
			step: GlobalBuySellDS.Delta * b.DeltaLimitPips,
			bigStep: 10 * GlobalBuySellDS.Delta * b.DeltaLimitPips,
			scale: b.PrecisionDigits
		}).spinbox("disable");
		$buy_sell_close_at_profitSP.val(roundToPrecisionDigits(b.AssetToExchangeFeed.SellRate + GlobalBuySellDS.Delta * b.DefaultLimitPips, b.PrecisionDigits));
		updateCloseExpectedProfitLabel(EOpType.Buy, b.AssetToExchangeFeed.BuyRate, $buy_sell_close_at_profitSP, b.ToUserBaseCurrencyRate, b.AtomicAmount);
		$buy_sell_close_at_lossSP.spinbox("destroy").spinbox({
			min: Math.max(b.AssetToExchangeFeed.SellRate - GlobalBuySellDS.Delta * b.MaxStopPips + GC.EPS, 0),
			max: b.AssetToExchangeFeed.SellRate - GlobalBuySellDS.Delta * b.MinStopPips + GC.EPS,
			step: GlobalBuySellDS.Delta * b.DeltaStopPips,
			bigStep: 10 * GlobalBuySellDS.Delta * b.DeltaStopPips,
			scale: b.PrecisionDigits
		}).spinbox("disable");
		$buy_sell_close_at_lossSP.val(roundToPrecisionDigits(b.AssetToExchangeFeed.SellRate - GlobalBuySellDS.Delta * b.DefaultStopPips, b.PrecisionDigits));
		updateCloseExpectedProfitLabel(EOpType.Buy, b.AssetToExchangeFeed.BuyRate, $buy_sell_close_at_lossSP, b.ToUserBaseCurrencyRate, b.AtomicAmount);
		getTrailingStopExpectedProfit(EOpType.Buy, b.DefaultTrailingStopPips, b.AtomicAmount,
			b.ToUserBaseCurrencyRate, b.AssetToExchangeFeed.BuyRate, b.SpreadPipsCount, b.PrecisionDigits);
		$buy_sell_orderSP.val(roundToPrecisionDigits(b.AssetToExchangeFeed.BuyRate + GlobalBuySellDS.Delta * b.DefaultOrderMarketPips, b.PrecisionDigits));
		getOrderChangePrecentForCurrentRate(b.AssetToExchangeFeed.BuyRate, UIData.getFutureOrderValue());
		$buy_sell.find("#buy_sell_only_buy").text(LangJSDict.strONLY_BUY);
		break;
	case EOpType.Sell:
		d = StringToEInstrumentType(b.InstrumentType) === EInstrumentType.Forex ? LangJSDict.strSELL :
			LangJSDict.strSHORT;
		$("#bs_btn_text").text(d);
		$buy_sell.find("#bs_current_rate").text(CurrentRateDisplay.getDisplayedCurrentRateSt());
		$buy_sell.find("#buy_sell_mode").text(LangJSDict.strSELLING);
		$buy_sell_close_at_profitSP.spinbox("destroy").spinbox({
			min: Math.max(b.AssetToExchangeFeed.BuyRate - GlobalBuySellDS.Delta * b.MaxLimitPips - GC.EPS, 0),
			max: b.AssetToExchangeFeed.BuyRate - GlobalBuySellDS.Delta * b.MinLimitPips + GC.EPS,
			step: GlobalBuySellDS.Delta * b.DeltaLimitPips,
			bigStep: 10 * GlobalBuySellDS.Delta * b.DeltaLimitPips,
			scale: b.PrecisionDigits
		}).spinbox("disable");
		$buy_sell_close_at_profitSP.val(roundToPrecisionDigits(b.AssetToExchangeFeed.BuyRate - GlobalBuySellDS.Delta * b.DefaultLimitPips, b.PrecisionDigits));
		updateCloseExpectedProfitLabel(EOpType.Sell, b.AssetToExchangeFeed.SellRate, $buy_sell_close_at_profitSP, b.ToUserBaseCurrencyRate, b.AtomicAmount);
		getTrailingStopExpectedProfit(EOpType.Sell, b.DefaultTrailingStopPips, b.AtomicAmount, b.ToUserBaseCurrencyRate, b.AssetToExchangeFeed.SellRate, b.SpreadPipsCount, b.PrecisionDigits);
		$buy_sell_close_at_lossSP.spinbox("destroy").spinbox({
			min: Math.max(b.AssetToExchangeFeed.BuyRate + GlobalBuySellDS.Delta * b.MinStopPips - GC.EPS, 0),
			max: b.AssetToExchangeFeed.BuyRate + GlobalBuySellDS.Delta * b.MaxStopPips + GC.EPS,
			step: GlobalBuySellDS.Delta * b.DeltaStopPips,
			bigStep: 10 * GlobalBuySellDS.Delta * b.DeltaStopPips,
			scale: b.PrecisionDigits
		}).spinbox("disable");
		$buy_sell_close_at_lossSP.val(roundToPrecisionDigits(b.AssetToExchangeFeed.BuyRate + GlobalBuySellDS.Delta * b.DefaultStopPips, b.PrecisionDigits));
		updateCloseExpectedProfitLabel(EOpType.Sell,
			b.AssetToExchangeFeed.SellRate, $buy_sell_close_at_lossSP, b.ToUserBaseCurrencyRate, b.AtomicAmount);
		$buy_sell_orderSP.val(roundToPrecisionDigits(b.AssetToExchangeFeed.SellRate - GlobalBuySellDS.Delta * b.DefaultOrderMarketPips, b.PrecisionDigits));
		getOrderChangePrecentForCurrentRate(b.AssetToExchangeFeed.SellRate, UIData.getFutureOrderValue());
		$buy_sell.find("#buy_sell_only_buy").text(LangJSDict.strONLY_SELL);
		break;
	default:
		ReportErrors("init " + c + " enum value!");
		return -1
	}
	switch (StringToEInstrumentType(b.InstrumentType)) {
	case EInstrumentType.Forex:
		$buy_sell.find(".buy-sell-amount-unit").text(b.AssetSymbol);
		$buy_sell_rate_line.find(".buy-sell-coin").addClass("display-none-class");
		$buy_sell_value_line.find(".buy-sell-sum-value").addClass("display-none-class");
		$buy_sell_value_line.find(".buy-sell-value").addClass("display-none-class");
		$buy_sell.find("#buy-sell-required-line").find(".buy-sell-sum").text(getRequiredSecuritiesString(b.InstrumentType, b.AssetToExchangeFeed.BuyRate, parseFloatCultured($("#bs_amount").val()), b.ToUserBaseCurrencyRate, b.InitialMarginPrecentage, GlobalDs.UserBaseCurrencySymbol, b.AssetSymbol,
			b.ExchangeSymbol));
		$buy_sell.find("#space_after_required").removeClass("display-none-class");
		b = addTitleToBuySellDialog(true, c, b.InstrumentName);
		$("#buy_sell_question_mark_type").attr("title", b);
		break;
	default:
		$buy_sell.find(".buy-sell-amount-unit").text(LangJSDict.AssetType[b.AssetType]);
		$buy_sell_value_line.find(".buy-sell-sum-value ").removeClass("display-none-class");
		$buy_sell_value_line.find(".buy-sell-value").removeClass("display-none-class");
		if (b.ExchangeMultiplier >= 1) {
			$buy_sell_rate_line.find(".buy-sell-coin").removeClass("display-none-class");
			$buy_sell_rate_line.find(".buy-sell-coin").text(b.ExchangeSymbol)
		}
		$buy_sell_value_line.find(".buy-sell-sum-value ").text(valueString(b.InstrumentType, GlobalBuySellDS.MainMode == EMainModeType.EditPositon ? GlobalBuySellDS.getCurrentOppRate() : GlobalBuySellDS.getCurrentRate(), UIData.getAmountValue(), b.ToUserBaseCurrencyRate, b.ExchangeSymbol, GlobalDs.UserBaseCurrencySymbol, b.AssetSymbol));
		$buy_sell.find("#buy-sell-required-line").find(".buy-sell-sum").text(getRequiredSecuritiesString(b.InstrumentType, b.AssetToExchangeFeed.BuyRate,
			parseFloatCultured($("#bs_amount").val()), b.ToUserBaseCurrencyRate, b.InitialMarginPrecentage, GlobalDs.UserBaseCurrencySymbol, b.AssetSymbol, b.ExchangeSymbol));
		$buy_sell.find("#space_after_required").addClass("display-none-class");
		b = addTitleToBuySellDialog(false, c, "");
		$("#buy_sell_question_mark_type").attr("title", b);
		break
	}
	$("#buy_sell_question_mark_type").tooltip();
	$("#bs_opening_rate_text").addClass("display-none-class");
	$("#bs_opening_rate").addClass("display-none-class");
	$("#bs_opening_coin_symbol").addClass("display-none-class");
	$("#only-sell-when-rate").removeClass("display-none-class");
	$buy_sell_close_at_profitSP.bind("spin.BUYSELL", closeAtProfitChanged);
	$buy_sell_close_at_lossSP.bind("spin.BUYSELL", closeAtLossChanged);
	$buy_sell_amountSP.bind("spin.BUYSELL", amountChanged).bind("change.BUYSELL", amountChanged);
	$buy_sell_trailing_stopSP.bind("spin.BUYSELL", trailingStopChanged);
	$buy_sell_orderSP.bind("change.BUYSELL", onChangeFutureOrderSpinBoxValue).bind("spin.BUYSELL", futureOrderChanged);
	FutureOrder.updateSpinBox();
	CloseAtProfit.updateSpinbox();
	CloseAtLoss.updateSpinbox();
	$buy_sell.find("#advanced_link").text(LangJSDict.strADVANCED + ">>");
	stopLoadingAnimGifBuySell();
	return 0
}

function addTitleToBuySellDialog(b, c, d) {
	if (b) {
		var e = d.indexOf("/");
		b = d.substring(0, e);
		d = d.substring(e + 1);
		c = c === EOpType.Buy ? LangJSDict.strYOUR_ASSESSMENT_IS_THAT_THE + " " + b + " " + LangJSDict.strWILL_RISE_AGAINST_THE + " " + d : LangJSDict.strYOUR_ASSESSMENT_IS_THAT_THE + " " + d + " " + LangJSDict.strWILL_RISE_AGAINST_THE + " " + b
	} else c = c === EOpType.Buy ? LangJSDict.strWILL_INCREASE_IN_VALUE : LangJSDict.strWILL_DECREASE_IN_VALUE;
	return c
}

function putStringIntoLabel(b, c) {
	b.text(c)
}

function requiredSecuritiesStringEditPosition(b) {
	return GlobalDs.formatMoneyAmount(b, true)
}

function getRequiredSecuritiesString(b, c, d, e, f, h, g, l) {
	if (StringToEInstrumentType(b) == EInstrumentType.Forex) {
		c = f * d / 100 * BuySellData.ExchangeMultiplier;
		e = c * e * BuySellData.AssetToExchangeFeed.BuyRate
	} else {
		c = c * d * BuySellData.ExchangeMultiplier;
		c = c * f / 100;
		e = c * e
	}
	b = getAssetValueSymbol(StringToEInstrumentType(b), g, l);
	return b === h ? GlobalDs.formatMoneyAmount(c, true, false, true) : genericFormatMoneyAmount(c, b, true, false, false, false) + " = " + GlobalDs.formatMoneyAmount(e, true, false, true)
}

function getAssetValueSymbol(b, c, d) {
	return b === EInstrumentType.Forex ? c : d
}

function valueString(b, c, d, e, f, h, g) {
	c = c * d * BuySellData.ExchangeMultiplier;
	e = c * e;
	b = getAssetValueSymbol(StringToEInstrumentType(b), g, f);
	return b === h ? GlobalDs.formatMoneyAmount(c, true, false, true) : genericFormatMoneyAmount(c, b, true, false, false, false) + " = " + GlobalDs.formatMoneyAmount(e, true, false, true)
}

function updateCloseExpectedProfitLabel(b, c, d, e, f) {
	var h = parseFloatCultured(d.val()),
		g = {
			profitPercent: 0,
			profitInUserBaseCurrency: 0
		};
	if (b == EOpType.Sell) {
		g.profitPercent = (c - h) / c * 100;
		g.profitInUserBaseCurrency = (c - h) * f * e * BuySellData.ExchangeMultiplier
	} else {
		g.profitPercent = (h - c) / c * 100;
		g.profitInUserBaseCurrency = (h - c) * f * e * BuySellData.ExchangeMultiplier
	} if (d == $buy_sell_close_at_profitSP) {
		b = LangJSDict.strPROFIT + ":" + GlobalDs.formatMoneyAmount(g.profitInUserBaseCurrency, true, false, true) + "  " + formatPercentCultured(g.profitPercent,
			GC.FRACTION_PERCENT_ACCURACY);
		c = $buy_sell.find("#close_at_profit_label")
	} else {
		c = $buy_sell.find("#close_at_loss_label");
		b = LangJSDict.strLOSS + ":" + GlobalDs.formatMoneyAmount(g.profitInUserBaseCurrency, true, false, true) + "  " + formatPercentCultured(g.profitPercent, GC.FRACTION_PERCENT_ACCURACY)
	}
	putStringIntoLabel(c, b);
	return g
}

function getTrailingStopExpectedProfit(b, c, d, e, f, h, g) {
	var l = getPipValue(g);
	g = {
		profitPercent: 0,
		profitInUserBaseCurrency: 0
	};
	switch (b) {
	case EOpType.Buy:
		g.profitPercent = 100 - (f - h * l) / (f - c * l) * 100;
		g.profitInUserBaseCurrency = c * l * d * e * BuySellData.ExchangeMultiplier;
		break;
	case EOpType.Sell:
		g.profitPercent = 100 - (f + h * l) / (f - c * l) * 100;
		g.profitInUserBaseCurrency = c * l * d * e * BuySellData.ExchangeMultiplier;
		break;
	default:
		ReportErrors("getTrailingStopExpectedProfit " + b + " enum value!");
		return -1
	}
	b = $buy_sell.find("#buy_sell_trailing_stop_label");
	c = GlobalDs.formatMoneyAmount(g.profitInUserBaseCurrency, true, false, true) + " " + formatPercentCultured(g.profitPercent, GC.FRACTION_PERCENT_ACCURACY);
	putStringIntoLabel(b, c);
	return g
}

function getOrderChangePrecentForCurrentRate(b, c) {
	b = (c / b - 1) * 100;
	c = $buy_sell.find("#buy_sell_future_order_label");
	var d = formatPercentCultured(b, GC.FRACTION_PERCENT_ACCURACY) + " " + LangJSDict.strFROM_CURRENT_RATE;
	putStringIntoLabel(c, d);
	return b
}

function writeInstrumentID(b, c) {
	b.data("InstrumentID", c)
}

function readInstrumentID(b) {
	return b.data("InstrumentID")
}
BuySellDialogHSM != undefined && alert("BuySellDialogHSM is included twice!");
var BuySellDialogHSM = {};
BuySellDialogHSM.BeforeHSM = function () {};
BuySellDialogHSM.AfterHSM = function () {};
BuySellDialogHSM.HandleBuySellDialogFeed = function (b) {
	var c = VerifyProperties(["BuySellDialogFeed"], b);
	if (c) ReportErrors(c);
	else {
		b = b.BuySellDialogFeed;
		(c = VerifyProperties(["BuyRate", "SellRate", "InstrumentID", "ToUserBaseCurrencyRate"], b)) ? ReportErrors(c) : handleBuySellDialogFeed(b.SellRate, b.BuyRate, b.InstrumentID, b.ToUserBaseCurrencyRate)
	}
};
BuySellDialogHSM.InstrumentsUpdate = function (b) {
	var c = VerifyProperties(["InstrumentTradeStatuses"], b);
	if (c) ReportErrors(c);
	else {
		b = b.InstrumentTradeStatuses;
		if (c = VerifyProperties(["InstrumentID", "IsTraded", "IsLive", "InstrumentStatus"], b[0])) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c) {
				var e = b[c];
				StringToEInstrumentStatus(e.InstrumentStatus) == EInstrumentStatus.TotallyFreezed && BuySellData.InstrumentID == e.InstrumentID && $buy_sell.dialog("close")
			}
		}
	}
};
BuySellDialogHSM.HandleMessages = function (b) {
	BuySellDialogHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.BuySellDialogFeed:
			BuySellDialogHSM.HandleBuySellDialogFeed(d);
			break;
		case EClientMessageType.InstrumentsUpdate:
			BuySellDialogHSM.InstrumentsUpdate(d);
			break;
		default:
			break
		}
	});
	BuySellDialogHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(BuySellDialogHSM.HandleMessages);
var $email_validation, $email_code, $email_box, $email_notification_lbl, $email_allFields, sendEmailValidationCB = decoratorVerifyReponseProperties(["SecuredResultCode"], function (b) {
		StringToESecuredServiceResult(b.SecuredResultCode) == ESecuredServiceResult.Success ? $email_notification_lbl.removeClass("display-none-class") : alertDialog(ALERT_TYPE.atError, LangJSDict.strEMAIL_VALIDATION_NOT_SENT + "\n" + LangJSDict["strREASON_" + b.SecuredResultCode], false, null, null)
	}, CloseProcessingForm),
	sendEmailValidationCodeCB =
		decoratorVerifyReponseProperties(["SecuredResultCode"], function (b) {
				if (StringToESecuredServiceResult(b.SecuredResultCode) == ESecuredServiceResult.Success) {
					alertDialog(ALERT_TYPE.atSuccess, LangJSDict.strEMAIL_VALIDATION_SUCCESSFUL, false, null, null);
					GlobalDs.PersonalInfo.IsEmailValidated = true;
					selectMenuOnSetIsEmailValidated(true);
					$email_validation.dialog("close")
				} else alertDialog(ALERT_TYPE.atError, LangJSDict.strEMAIL_VALIDATION_WRONG + "\n" + LangJSDict["strREASON_" + b.SecuredResultCode], false, null, null)
			},
			CloseProcessingForm);

function openEmailValidation() {
	$email_allFields.val("").removeClass(GC.FIELD_ERR_CLASS);
	$email_box.val(GlobalDs.UserName);
	$email_box.prop("disabled", true);
	$email_notification_lbl.addClass("display-none-class");
	$email_validation.dialog("open")
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$email_validation = $("#email_validation_dialog");
		var b = $("#text_email_validtion");
		$email_box = $("#email_text");
		$email_code = $("#text_email_validtion");
		$email_notification_lbl = $("#email_notification_lbl");
		$email_allFields = $([]).add($email_box).add(b);
		$email_validation.dialog({
			iphoneMaxWidth: 470,
			iphoneMaxHeight: 425,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.EmailValidationDialogWidth,
			close: function () {
				$email_allFields.val("").removeClass(GC.FIELD_ERR_CLASS)
			}
		});
		$("#button_test_area").find("#email_validation").click(function () {
			openEmailValidation();
			return false
		});
		$email_validation.find(".email-the-code").click(function () {
			$email_allFields.removeClass(GC.FIELD_ERR_CLASS);
			var c = true;
			c = checkEmail($email_box) && c;
			if (!c) return false;
			OpenProcessingForm();
			SENDImm_sendEmailVerificationImm(new VerifyEmail($email_box.val()), sendEmailValidationCB);
			return false
		});
		$email_validation.find(".email-submit").click(function () {
			$email_allFields.removeClass(GC.FIELD_ERR_CLASS);
			var c = true;
			c = checkLength(b, GC.VALIDATION_CODE_MIN_MAX, GC.VALIDATION_CODE_MIN_MAX) && c;
			c = checkEmail($email_box) && c;
			if (!c) return false;
			OpenProcessingForm();
			SENDImm_verifyEmailImm(new SendEmailVerificationCode($email_box.val(), $email_code.val()), sendEmailValidationCodeCB);
			return false
		});
		b.ivsNumeric()
	}
});
var $phone_validation, $phone_box, $3digit_code, $numeric_fields, $phone_send_sms_button, $phone_call_my_phone_button, $phone_submit_button, $phone_notification_lbl;

function OpenPhoneValidation() {
	$phone_validation.dialog("open")
}

function phoneValidatedSuccessfully() {
	GlobalDs.CashierInfo.IsNeedPhoneVerificationBeforeDeposit = false;
	GlobalDs.CashierInfo.IsNeedPhoneVerificationBeforeWithdraw = false;
	GlobalDs.CashierInfo.depositFailedPhoneVerifyNeeded = false;
	GlobalDs.PersonalInfo.IsPhoneValidated = true;
	$bonusLink.addClass("display-none-class");
	GlobalDs.getBonusesInfoFromServer();
	$phone_validation.dialog("close");
	alertDialog(ALERT_TYPE.atSuccess, LangJSDict.strPHONE_VALIDATION_SUCCESSFUL, false, startUpFlow.continueFlow, null)
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$phone_validation = $("#phone_validation_dialog");
		$phone_box = $("#phone_text");
		$3digit_code = $phone_validation.find("#text_phone_validtion");
		$numeric_fields = $([]).add($phone_box).add($3digit_code);
		$phone_send_sms_button = $("#phone-send-sms-button");
		$phone_call_my_phone_button = $("#phone-call-my-phone-button");
		$phone_submit_button = $("#phone-submit-button");
		$phone_notification_lbl = $("#phone_notification_lbl");
		$phone_notification_lbl.addClass("display-none-class");
		$phone_validation.dialog({
			iphoneMaxWidth: 550,
			iphoneMaxHeight: 435,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.PhoneValidationDialogWidth,
			open: function () {
				$numeric_fields.val("").removeClass(GC.FIELD_ERR_CLASS);
				$phone_box.val(GlobalDs.PersonalInfo.Phone).select();
				$phone_submit_button.removeClass("std-button-disabled");
				$phone_send_sms_button.removeClass("std-button-disabled");
				$phone_call_my_phone_button.removeClass("std-button-disabled");
				$phone_notification_lbl.addClass("display-none-class")
			},
			close: function () {
				startUpFlow.abortFlowIfFailed()
			}
		});
		$("#button_test_area").find("#phone_validation").click(function () {
			$phone_validation.dialog("open");
			return false
		});
		$phone_send_sms_button.click(function () {
			if ($(this).hasClass("std-button-disabled")) return false;
			$numeric_fields.removeClass(GC.FIELD_ERR_CLASS);
			var b = true;
			b = checkLength($phone_box, GC.PHONE_MIN_LENGTH, GC.PHONE_MAX_LENGTH) && b;
			if (b = isPhoneOk($phone_box) && b) {
				b = new SendPhoneVerificationCode(EPhoneVerifyType.SMS, $phone_box.val());
				OpenProcessingForm();
				SENDImm_sendPhoneVerificationImm(b, function (c) {
					CloseProcessingForm();
					var d = StringToESecuredServiceResult(c.SecuredResultCode);
					if (d == ESecuredServiceResult.Success) {
						alertDialog(ALERT_TYPE.atInfo, LangJSDict.strPHONE_VALIDATION_SMS_SENT, false, null, null);
						$phone_notification_lbl.text(LangJSDict.strPHONE_VALIDATION_SMS_SENT);
						$phone_notification_lbl.removeClass("display-none-class");
						$phone_send_sms_button.addClass("std-button-disabled")
					} else d == ESecuredServiceResult.VerifiedBefore || d == ESecuredServiceResult.ReachedMaxPhoneVerificationTrials ?
						alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" + c.SecuredResultCode], false, null, null) : alertDialog(ALERT_TYPE.atError, LangJSDict.strPHONE_VALIDATION_SMS_NOT_SENT, false, null, null)
				})
			}
			return false
		});
		$phone_call_my_phone_button.click(function () {
			if ($(this).hasClass("std-button-disabled")) return false;
			$numeric_fields.removeClass(GC.FIELD_ERR_CLASS);
			var b = true;
			b = checkLength($phone_box, GC.PHONE_MIN_LENGTH, GC.PHONE_MAX_LENGTH) && b;
			if (b = isPhoneOk($phone_box) && b) {
				b = new SendPhoneVerificationCode(EPhoneVerifyType.Phone,
					$phone_box.val());
				OpenProcessingForm();
				SENDImm_sendPhoneVerificationImm(b, function (c) {
					CloseProcessingForm();
					if (StringToESecuredServiceResult(c.SecuredResultCode) == ESecuredServiceResult.Success) {
						$phone_notification_lbl.text(LangJSDict.strPHONE_VALIDATION_CALL_SENT);
						$phone_notification_lbl.removeClass("display-none-class");
						$phone_call_my_phone_button.addClass("std-button-disabled")
					} else alertDialog(ALERT_TYPE.atError, LangJSDict.strPHONE_VALIDATION_CALL_NOT_SENT + "\n\n" + LangJSDict["strREASON_" + c.SecuredResultCode],
						false, null, null)
				})
			}
			return false
		});
		$phone_submit_button.click(function () {
			if ($(this).hasClass("std-button-disabled")) return false;
			$numeric_fields.removeClass(GC.FIELD_ERR_CLASS);
			var b = true;
			b = checkLength($phone_box, GC.PHONE_MIN_LENGTH, GC.PHONE_MAX_LENGTH) && b;
			if (b = checkLength($3digit_code, GC.VALIDATION_CODE_MIN_MAX, GC.VALIDATION_CODE_MIN_MAX) && b) {
				b = new VerifyPhone($phone_box.val(), $3digit_code.val());
				OpenProcessingForm();
				SENDImm_verifyPhoneImm(b, function (c) {
					CloseProcessingForm();
					if (StringToESecuredServiceResult(c.SecuredResultCode) ==
						ESecuredServiceResult.Success) {
						$phone_submit_button.addClass("std-button-disabled");
						phoneValidatedSuccessfully()
					} else alertDialog(ALERT_TYPE.atError, LangJSDict.strPHONE_VALIDATION_WRONG + "\n\n" + LangJSDict["strREASON_" + c.SecuredResultCode], false, null, null)
				})
			}
			return false
		});
		$numeric_fields.ivsNumeric()
	}
});
var $challenge_join;
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$challenge_join = $("#challenge_join_dialog");
		var b = $challenge_join.find("#challenge_join_code");
		$challenge_join.dialog({
			iphoneMaxWidth: 350,
			iphoneMaxHeight: 250,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.ChallengeJoinDialogWidth,
			open: function () {
				b.val("").removeClass(GC.FIELD_ERR_CLASS)
			},
			close: function () {
				b.val("").removeClass(GC.FIELD_ERR_CLASS)
			}
		});
		$challenge_join.find("#challenge_join_cancel").click(function () {
			$challenge_join.dialog("close");
			return false
		});
		$challenge_join.find("#challenge_join_submit").click(function () {
			b.removeClass(GC.FIELD_ERR_CLASS);
			if (b.val().length === 0) {
				b.addClass(GC.FIELD_ERR_CLASS);
				return false
			}
			OpenProcessingForm();
			SENDImm_challengeJoinImm({
				ChallengeCode: b.val()
			}, function (c) {
				CloseProcessingForm();
				var d = StringToESecuredServiceResult(c.SecuredResultCode);
				d == ESecuredServiceResult.Success ? alertDialog(ALERT_TYPE.atSuccess, LangJSDict.strCHALLENGE_JOINED.replace("%s", c.ChallengeName), false, function () {
						$challenge_join.dialog("close")
					},
					null) : alertDialog(ALERT_TYPE.atError, d == ESecuredServiceResult.InvalidChallengeCode ? LangJSDict.strCHALLENGE_JOIN_INVALID_CODE : d == ESecuredServiceResult.ChallengeMaxUsersExceeded ? LangJSDict.strCHALLENGE_MAX_USERS_EXCEEDED : d == ESecuredServiceResult.UserAlreadyHaveChallenge || d == ESecuredServiceResult.UserHasChallengeInProgress ? LangJSDict.strCHALLENGE_ALREADYINCHALLENGE : d == ESecuredServiceResult.ChallengeAlreadyStarted ? LangJSDict.strCHALLENGE_JOIN_ERR_ALREADYSTARTED : LangJSDict.strCHALLENGE_GENERAL_FAILURE,
					false, null, null)
			});
			return false
		});
		$("#button_test_area").find("#challenge_join_test").click(function () {
			$challenge_join.dialog("open");
			return false
		})
	}
});
var $ch_psw;
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$ch_psw = $("#change_password_dialog");
		var b = $ch_psw.find("#old_password"),
			c = $ch_psw.find("#new_password"),
			d = $ch_psw.find("#confirm_password"),
			e = $([]).add(b).add(c).add(d);
		$ch_psw.dialog({
			iphoneMaxWidth: 350,
			iphoneMaxHeight: 250,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.ChangePasswordDialogWidth,
			open: function () {
				e.val("").removeClass(GC.FIELD_ERR_CLASS)
			},
			close: function () {
				e.val("").removeClass(GC.FIELD_ERR_CLASS);
				$FundsManagementDiv.dialog("isOpen") ||
					startUpFlow.returnToNonSecureIfCurrentlySecure()
			}
		});
		$("#button_test_area").find("#change_password").click(function () {
			$ch_psw.dialog("open");
			return false
		});
		$ch_psw.find("#ch_psw_cancel").click(function () {
			$ch_psw.dialog("close");
			return false
		});
		$ch_psw.find("#ch_psw_submit").click(function () {
			e.removeClass(GC.FIELD_ERR_CLASS);
			if (!CheckPassword(b.val())) {
				b.addClass(GC.FIELD_ERR_CLASS);
				return false
			}
			if (!CheckPassword(c.val())) {
				c.addClass(GC.FIELD_ERR_CLASS);
				return false
			}
			if (c.val() != d.val()) {
				c.addClass(GC.FIELD_ERR_CLASS);
				d.addClass(GC.FIELD_ERR_CLASS);
				alertDialog(ALERT_TYPE.atError, LangJSDict.strPASSWORD_ERROR_PasswordInvalidConfirmation, false, null, null);
				return false
			}
			if (b.val() == c.val()) {
				b.addClass(GC.FIELD_ERR_CLASS);
				c.addClass(GC.FIELD_ERR_CLASS);
				alertDialog(ALERT_TYPE.atError, LangJSDict.strPASSWORD_ERROR_PasswordOldAndNewIdentical, false, null, null);
				return false
			}
			var f = new ChangePassword(GlobalDs.UserName, b.val(), c.val());
			OpenProcessingForm();
			SENDImm_ChangePasswordImm(f, function (h) {
				CloseProcessingForm();
				if (StringToELoginServiceResult(h.LoginResultCode) ==
					ELoginServiceResult.Success) {
					alertDialog(ALERT_TYPE.atSuccess, LangJSDict.strPASSWORD_CHANGED, false, function () {
						$ch_psw.dialog("close")
					}, null);
					readPasswordCookie() !== null && savePasswordCookie(c.val(), true)
				} else alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" + h.LoginResultCode], false, null, null)
			});
			return false
		})
	}
});
var $FundsManagementDiv, $funds_equity, $funds_initial_margin, $funds_maintenance_margin, $funds_bonuses, $funds_available_for_cash;

function initFundsManagement() {
	$("#funds_username").text(GlobalDs.PersonalInfo.FName + " " + GlobalDs.PersonalInfo.LName);
	$("#funds_user_address").text(GlobalDs.PersonalInfo.Address);
	$("#funds_user_city_zip").text(GlobalDs.PersonalInfo.City + " " + GlobalDs.PersonalInfo.Zip);
	$("#funds_user_country").text(GlobalDs.PersonalInfo.Country);
	$("#funds_user_email").text(GlobalDs.UserName);
	if (GlobalDs.IsWithdrawPrerequisiteFullFilled(EFlowPrerequisite.Documents)) {
		$("#funds_must_upload_docs").addClass("display-none-class");
		$("#funds-withdraw-button").text(LangJSDict.strCASHIER_WITHDRAW)
	} else {
		$("#funds_must_upload_docs").removeClass("display-none-class");
		$("#funds-withdraw-button").text(LangJSDict.strCASHIER_WITHDRAW + " *")
	}
	fillFundsManagementAccountFields(true)
}

function fillFundsManagementAccountFields(b) {
	if (!(b !== true && !$FundsManagementDiv.dialog("isOpen"))) {
		b = GlobalDs.formatMoneyAmount(GlobalDs.AccountValue.Equity, true);
		var c = GlobalDs.formatMoneyAmount(GlobalDs.AccountValue.InitialMargin, true),
			d = GlobalDs.formatMoneyAmount(GlobalDs.AccountValue.MaintenanceMargin, true),
			e = GlobalDs.formatMoneyAmount(GlobalDs.AccountValue.Bonuses, true),
			f = GlobalDs.formatMoneyAmount(GlobalDs.AccountValue.AvailableBalanceForCashout, true);
		$funds_equity.text(b);
		$funds_initial_margin.text(c);
		$funds_maintenance_margin.text(d);
		$funds_bonuses.text(e);
		$funds_available_for_cash.text(f)
	}
}

function openFundsManagement(b) {
	initFundsManagement();
	if (!$FundsManagementDiv.dialog("isOpen")) {
		$FundsManagementDiv.dialog("open");
		b && checkAddressValidationAutoOpenOnFundsManagementOpen()
	}
	return false
}

function CloseFundsManagement() {
	$FundsManagementDiv.dialog("isOpen") && $FundsManagementDiv.dialog("close")
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$FundsManagementDiv = $("#funds_management_dialog");
		$FundsManagementDiv.dialog({
			iphoneMaxWidth: 689,
			iphoneMaxHeight: 490,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.FundsManagementWidth,
			height: GeneralUI.FundsManagementHeight,
			stack: true,
			close: function () {
				startUpFlow.returnToNonSecureIfCurrentlySecure()
			}
		});
		$funds_equity = $("#funds_equity_sum");
		$funds_initial_margin = $("#funds-initial_margin_sum");
		$funds_maintenance_margin =
			$("#funds-maintenance_margin_sum");
		$funds_bonuses = $("#funds_bonuses_sum");
		$funds_available_for_cash = $("#funds_available_forcash");
		$FundsManagementDiv.find(".funds-monetary-history").click(function () {
			openHistoryDialog(false, false);
			return false
		});
		$FundsManagementDiv.find("#funds-bonus-account").click(function () {
			openBonusDialog();
			return false
		});
		$FundsManagementDiv.find(".funds-change-password").click(function () {
			runStartUpFlow(EStartUpPageState.SSLOpenWithChangePassword);
			return false
		});
		$("#funds-open-reports").click(function () {
			openReportsBehaviors();
			return false
		});
		$FundsManagementDiv.find(".funds-deposite-button").click(function () {
			runStartUpFlow(EStartUpPageState.SSLOpenWithDeposit);
			return false
		});
		$FundsManagementDiv.find(".funds-withdraw-button").click(function () {
			runStartUpFlow(EStartUpPageState.SSLOpenWithWithdraw);
			return false
		});
		$("#button_test_area").find("#funds_managment").click(function () {
			$FundsManagementDiv.dialog("open");
			return false
		});
		$("#funds_validate_address").click(function () {
			$addressValidation.dialog("open");
			return false
		});
		$FundsManagementDiv.find(".funds-exit").click(function () {
			CloseFundsManagement();
			return false
		})
	}
});

function getCashierInfoCB(b) {
	CloseProcessingForm();
	var c = VerifyProperties(["WCUserCashierInfo"], b);
	if (c) ReportErrors(c);
	else {
		GlobalDs.fillCashierInfo(b.WCUserCashierInfo);
		startUpFlow.continueFlow()
	}
}

function getCashierInfo() {
	OpenProcessingForm();
	SENDImm_getUserCashierInfoImm({
		GetLastSuccessfulPayMethodsInfo: true
	}, function (b) {
		getCashierInfoCB(b)
	})
}
var $aReg, $aRegCountrySelect, $name, $email, $last_name, $phone, $is_mobile_phoneCB, $street, $zip, $city, $is_18, $areg_day, $areg_month, $areg_year, $accept_agreement, $agree_all_fees, $fsa_local_id, $allFields, $aRegContainer, $aRegFrame, $areg_email, padDigitsWithoutMinus = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 71, 35, 36, 46],
	ranInitAccountRegistrationBehaviors = false,
	accountRegistrationDoneFlag = false,
	getRegulationTypeObject = null;

function sendGetRegulationTypeCB(b) {
	var c = VerifyProperties(["SecuredResultCode", "CountryCode", "RegulationType", "LinksInfo"], b);
	if (c) ReportErrors(c);
	else if (StringToESecuredServiceResult(b.SecuredResultCode) == ESecuredServiceResult.Success) {
		var d = $(".fsa-areg-risk-policy-line");
		if (b.CountryCode == getRegulationTypeObject.CountryCode) {
			c = $(".asic-areg-links");
			var e = $(".fsa-areg-links"),
				f = $("#areg-i-have-read-user-agreement"),
				h = f.hasClass("display-none-class");
			if (StringToERegulationType(b.RegulationType) ==
				ERegulationType.ASIC) {
				d.removeClass("display-none-class");
				c.removeClass("display-none-class");
				e.addClass("display-none-class");
				f.addClass("display-none-class")
			} else {
				if (StringToERegulationType(b.RegulationType) == ERegulationType.FSA) {
					d.removeClass("display-none-class");
					c.addClass("display-none-class");
					e.removeClass("display-none-class")
				} else {
					d.addClass("display-none-class");
					c.addClass("display-none-class");
					e.addClass("display-none-class")
				}
				f.removeClass("display-none-class")
			} if (h !== f.hasClass("display-none-class")) {
				$("#areg_checkbox__have_read").prop("checked",
					false);
				$agree_all_fees.removeClass(GC.FIELD_ERR_CLASS);
				$accept_agreement.removeClass(GC.FIELD_ERR_CLASS)
			}
		}
		b = b.LinksInfo;
		if (c = VerifyProperties(["UserAgreementLink", "ProductDisclosureStatementLink", "FinancialServiceGuideLink", "RiskWarningLink", "OrderExecutionPolicyLink", "PrivacyPolicyLink"], b)) ReportErrors(c);
		else {
			$(".areg_user_agreement_link").attr("href", b.UserAgreementLink);
			$(".areg_risk_warning_link").attr("href", b.RiskWarningLink);
			$("#areg_product_disclosure_link").attr("href", b.ProductDisclosureStatementLink);
			$("#areg_financial_services_link").attr("href", b.FinancialServiceGuideLink);
			d.find("#areg_order_execution_link").attr("href", b.OrderExecutionPolicyLink);
			d.find("#areg_privacy_policy_link").attr("href", b.PrivacyPolicyLink)
		}
	}
}

function onSelectedCountryChange() {
	getRegulationTypeObject = new GetRegulationType($("#areg_country option:selected").data().Code);
	SENDImm_getRegulationTypeImm(getRegulationTypeObject, sendGetRegulationTypeCB);
	initAccountRegistrationStatePart()
}

function initAccountRegistrationStatePart() {
	var b = $("#areg_state_country_div"),
		c = $("#arg_state_text"),
		d = $("#areg_country").val();
	c.children().remove();
	d === "13" || d === "38" ? b.removeClass("display-none-class") : b.addClass("display-none-class");
	if (d === "38") {
		$("<option>Alberta</option>").appendTo(c);
		$("<option>British Columbia</option>").appendTo(c);
		$("<option>Manitoba</option>").appendTo(c);
		$("<option>New Brunswick</option>").appendTo(c);
		$("<option>Newfoundland and Labrador</option>").appendTo(c);
		$("<option>Northwest Territories</option>").appendTo(c);
		$("<option>Nova Scotia</option>").appendTo(c);
		$("<option>Nunavut</option>").appendTo(c);
		$("<option>Ontario</option>").appendTo(c);
		$("<option>Prince Edward Island</option>").appendTo(c);
		$("<option>Quebec</option>").appendTo(c);
		$("<option>Saskatchewan</option>").appendTo(c);
		$("<option>Yukon</option>").appendTo(c)
	} else if (d === "13") {
		$("<option>Australian Capital Territory</option>").appendTo(c);
		$("<option>New South Wales</option>").appendTo(c);
		$("<option>Northern Territory</option>").appendTo(c);
		$("<option>Queensland</option>").appendTo(c);
		$("<option>South Australia</option>").appendTo(c);
		$("<option>Tasmania</option>").appendTo(c);
		$("<option>Victoria</option>").appendTo(c);
		$("<option>Western Australia</option>").appendTo(c)
	}
	if ($("#areg_country option:selected").text() == "Israel") {
		$("#local_id_label").text(LangJSDict.strLOCAL_ID);
		$("#local_id_line").removeClass("display-none-class")
	} else {
		$("#local_id_line").addClass("display-none-class");
		$("#local_id_label").text(LangJSDict.strID_PASSPORT)
	}
}

function startLoadingAnimGifAccountReg() {
	$aRegContainer.addClass("display-none-class");
	$aRegFrame.addClass("loading")
}

function stopLoadingAnimGifAccountReg() {
	$aRegContainer.removeClass("display-none-class");
	$aRegFrame.removeClass("loading")
}

function isAgeIsAboveEighteenAndValid(b, c, d) {
	var e = new Date(d, c, b);
	b = e.getFullYear() == d && e.getMonth() == c && e.getDate() == b;
	c = new Date;
	(b = b && c.getTime() - e.getTime() >= 18 * GC.SEC_IN_YEAR * 1E3) ? $aReg.find("#areg_drop_down").removeClass(GC.FIELD_ERR_CLASS) : $aReg.find("#areg_drop_down").addClass(GC.FIELD_ERR_CLASS);
	return b
}
var updatedPersonalInfoObject;

function sendAccountRegistrationCB(b) {
	CloseProcessingForm();
	if (StringToESecuredServiceResult(b.SecuredResultCode) == ESecuredServiceResult.Success) {
		GlobalDs.MarkFlowPrerequisiteAsFullFilled(EFlowPrerequisite.FullRegister);
		GlobalDs.fillPersonalInfo(updatedPersonalInfoObject.FirstName, updatedPersonalInfoObject.LastName, updatedPersonalInfoObject.PhoneNumber, updatedPersonalInfoObject.isEmailValidated, updatedPersonalInfoObject.isPhoneValidated, updatedPersonalInfoObject.Country, updatedPersonalInfoObject.City,
			updatedPersonalInfoObject.Address, updatedPersonalInfoObject.Zip, dateToStdFormat(new Date($areg_year.val(), $areg_month.val(), $areg_day.val())));
		var c = VerifyProperties(["RegulationType"], b);
		if (c) ReportErrors(c);
		else {
			c = isFSARegulated;
			var d = isASICRegulated;
			isFSARegulated = StringToERegulationType(b.RegulationType) == ERegulationType.FSA ? true : false;
			isASICRegulated = StringToERegulationType(b.RegulationType) == ERegulationType.ASIC ? true : false;
			if (!(isFSARegulated && c || isASICRegulated && d)) {
				startUpFlow.saveState();
				SaveWebClientConfigurationIfNeeded(function () {
					StartedLogOutPhase();
					startUpFlow.reloadCurrentPage()
				})
			}
		}
	} else alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" + b.SecuredResultCode], false, function () {
		$aReg.dialog("close")
	}, null)
}

function sendAccountRegistration() {
	OpenProcessingForm();
	var b = convertToStdFormat($areg_day.val(), $areg_month.val(), $areg_year.val()),
		c = $.trim($fsa_local_id.val());
	updatedPersonalInfoObject = new AccountRegistrationPersonalInfo($name.val(), $last_name.val(), $phone.val(), "", c, b, "", $is_mobile_phoneCB.is(":checked"), $("#areg_country option:selected").text(), $("#areg_country option:selected").data().Code, $("#arg_state_text :selected").text(), $city.val(), $street.val(), $zip.val());
	accountRegistrationDoneFlag =
		true;
	SENDImm_updateAccountRegistrationInfoImm(updatedPersonalInfoObject, sendAccountRegistrationCB)
}

function continueIfAccountRegistrationDone() {
	if (accountRegistrationDoneFlag) {
		accountRegistrationDoneFlag = false;
		startUpFlow.continueFlow()
	}
}

function accountRegistration_getCountriesXmlCB(b) {
	var c;
	$aRegCountrySelect.append('<option value="-1"> </option>');
	c = -1;
	$(b).find("Country").each(function (d) {
		var e = $(this).attr("Code"),
			f = $(this).attr("Name");
		if (f == GlobalDs.PersonalInfo.Country) c = d;
		$('<option class="countrey-box-width" value="' + d + '">' + f + "</option>").appendTo($aRegCountrySelect).data("Code", e)
	});
	$aRegCountrySelect.children("option[value=" + c + "]").prop("selected", true);
	$areg_email.val(GlobalDs.UserName);
	initAccountRegistrationStatePart();
	stopLoadingAnimGifAccountReg()
}

function isValidFSALocalIDUpdateUIError() {
	if (!$("#local_id_line").is(":visible")) return true;
	var b = isValidFSALocalID($.trim($fsa_local_id.val()), $("#areg_country option:selected").data().Code);
	b || $fsa_local_id.addClass(GC.FIELD_ERR_CLASS);
	return b
}

function isValidFSALocalID(b, c) {
	if (c == "IL") {
		if (b.length !== 9) return false;
		for (var d = c = 0; d < b.length; d++) {
			var e = parseInt(b.charAt(d), 10);
			e *= d % 2 + 1;
			if (e > 9) e -= 9;
			c += e
		}
		return c % 10 !== 0 ? false : true
	} else return true
}

function openAccountRegistration() {
	initIfNeededAccountRegistrationBehaviors();
	if ($aRegCountrySelect.children().size() > 1) {
		if (isFSARegulated || isASICRegulated) chooseStepAndOpenAccountRegistration(1);
		$aReg.addClass("display-none-class");
		$aRegContainer.addClass("display-none-class");
		$aReg.dialog("open");
		$aRegContainer.removeClass("display-none-class")
	} else {
		if (isFSARegulated || isASICRegulated) chooseStepAndOpenAccountRegistration(1);
		startLoadingAnimGifAccountReg();
		$aReg.dialog("open");
		getCountriesXml(accountRegistration_getCountriesXmlCB)
	}
}

function testAccountRegistrationInfoIsValidAndSubmit() {
	$allFields.removeClass(GC.FIELD_ERR_CLASS);
	var b = true;
	b = checkLength($name, GC.NAME_MIN_LENGTH, GC.NAME_MAX_LENGTH) && b;
	b = checkLength($last_name, GC.LAST_NAME_MIN_LENGTH, GC.LAST_NAME_MAX_LENGTH) && b;
	b = isPhoneOk($phone) && b;
	b = checkLength($street, GC.STREET_MIN_LENGTH, GC.MAX_LENGTH) && b;
	b = checkRegexp($name, GC.NON_ALPHANUM_CHARS_REG_EXP, false) && b;
	b = checkRegexp($name, GC.NAME_FAIL_REG_EXP, false) && b;
	b = checkRegexp($last_name, GC.NON_ALPHANUM_CHARS_REG_EXP, false) &&
		b;
	b = checkRegexp($last_name, GC.NAME_FAIL_REG_EXP, false) && b;
	b = checkEmail($areg_email) && b;
	b = checkRegexp($zip, GC.ZIP_CITY_REG_EXP) && b;
	b = checkRegexp($city, GC.NON_ALPHANUM_CHARS_REG_EXP, false) && b;
	b = checkRegexp($street, GC.NON_ALPHANUM_CHARS_REG_EXP, false) && b;
	b = isValidFSALocalIDUpdateUIError() && b;
	b = checkCheckBox($("#areg_checkbox_18"), $is_18) && b;
	b = checkCheckBox($("#areg_checkbox__have_read"), $accept_agreement) && b;
	$("#div_i_agree_all_fees").hasClass("display-none-class") || (b = checkCheckBox($("#areg_checkbox_agree_all_fees"),
		$agree_all_fees) && b);
	b = checkComboBox($("#areg_country"), $("#areg_country"), 1) && b;
	(b = isAgeIsAboveEighteenAndValid($areg_day.val(), $areg_month.val(), $areg_year.val()) && b) && sendAccountRegistration();
	return false
}

function closeAccountRegistrationBehaviors() {
	$allFields.filter("[class!=dont-empty-on-open]").removeClass("ui-state-error");
	$allFields.removeClass(GC.FIELD_ERR_CLASS);
	$("#account_reg_container").addClass("display-none-class");
	$aReg.addClass("display-none-class");
	startUpFlow.abortFlowIfFailed();
	return false
}

function initIfNeededAccountRegistrationBehaviors() {
	if (getDisplayPageType() === EPageType.Trade)
		if (!ranInitAccountRegistrationBehaviors) {
			$aRegCountrySelect = $("#areg_country");
			$name = $("#areg_first_name");
			$areg_email = $("#areg_email");
			$last_name = $("#areg_last_name");
			$areg_day = $("#areg_day");
			$areg_month = $("#areg_month");
			$areg_year = $("#areg_year");
			$phone = $("#areg_phone");
			$is_mobile_phoneCB = $("#areg_checkbox_phone");
			$street = $("#areg_street");
			$zip = $("#areg_zip");
			$city = $("#areg_city");
			$is_18 = $("#container_18");
			$accept_agreement = $("#container_i_have_read");
			$agree_all_fees = $("#container_i_agree_all_fees");
			$areg_day = $("#areg_day");
			$areg_month = $("#areg_month");
			$areg_year = $("#areg_year");
			$fsa_local_id = $("#fsa_local_id");
			$aRegContainer = $("#account_reg_container");
			$aRegFrame = $("#account_reg_frame");
			$allFields = $([]).add($name).add($email).add($phone).add($street).add($last_name).add($zip).add($city).add($is_18).add($accept_agreement).add($agree_all_fees).add($aRegCountrySelect).add($fsa_local_id).add($aReg.find("#areg_drop_down"));
			$name.alpha({
				allow: " "
			});
			$last_name.alpha({
				allow: " "
			});
			$fsa_local_id.ivsNumeric();
			for (var b = $aReg.find("#areg_drop_down #areg_day"), c = 1; c <= 31; c++) $('<option value="' + c + '">' + c + "</option>").appendTo(b);
			b = $aReg.find("#areg_drop_down #areg_year");
			for (c = 2E3; c >= 1920; c--) $('<option value="' + c + '">' + c + "</option>").appendTo(b);
			$("#areg_ok").click(testAccountRegistrationInfoIsValidAndSubmit);
			$("#areg_country").change(onSelectedCountryChange);
			$aReg.find("#areg_cancel").click(function () {
				$aReg.dialog("close");
				return false
			});
			$phone.bind("cut copy paste", function (f) {
				f.preventDefault()
			});
			$("#areg_phone").ivsNumeric();
			b = $(".fsa-areg-risk-policy-line");
			c = $(".asic-areg-links");
			var d = $(".fsa-areg-links"),
				e = $("#areg-i-have-read-user-agreement");
			if (isASICRegulated) {
				b.removeClass("display-none-class");
				c.removeClass("display-none-class");
				d.addClass("display-none-class");
				e.addClass("display-none-class")
			} else {
				if (isFSARegulated) {
					b.removeClass("display-none-class");
					c.addClass("display-none-class");
					d.removeClass("display-none-class")
				} else {
					b.addClass("display-none-class");
					c.addClass("display-none-class");
					d.addClass("display-none-class")
				}
				e.removeClass("display-none-class")
			}
			c = GlobalDs.LinksInfo;
			$(".areg_user_agreement_link").attr("href", c.UserAgreementLink);
			$(".areg_risk_warning_link").attr("href", c.RiskWarningLink);
			$("#areg_product_disclosure_link").attr("href", c.ProductDisclosureStatementLink);
			$("#areg_financial_services_link").attr("href", c.FinancialServiceGuideLink);
			b.find("#areg_order_execution_link").attr("href", c.OrderExecutionPolicyLink);
			b.find("#areg_privacy_policy_link").attr("href",
				c.PrivacyPolicyLink);
			ranInitAccountRegistrationBehaviors = true
		}
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$aReg = $("#account_registration_dialog");
		$aReg.dialog({
			iphoneMaxWidth: 725,
			iphoneMaxHeight: 537,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.AccountRegistrationWidth,
			height: isFSARegulated || isASICRegulated ? GeneralUI.FSAAccountRegistrationHeight : GeneralUI.AccountRegistrationHeight,
			open: function () {
				initIfNeededAccountRegistrationBehaviors();
				return false
			},
			close: closeAccountRegistrationBehaviors
		});
		$("#button_test_area").find("#account_regitration").click(function () {
			openAccountRegistration();
			return false
		})
	}
});
AccountRegistrationHSM != undefined && AccountRegistrationHSM("AccountRegistrationHSM is included twice!");
var AccountRegistrationHSM = {
	prevRegulationStatus: null
};
AccountRegistrationHSM.BeforeHSM = function () {};
AccountRegistrationHSM.AfterHSM = function () {};
AccountRegistrationHSM.HandleFileUploadResult = function (b) {
	var c = VerifyProperties(["Result", "FileType"], b);
	if (c) ReportErrors(c);
	else {
		CloseProcessingForm();
		if (StringToEFileUploadResultType(b.Result) == EFileUploadResult.Success) {
			SENDImm_getRequiredFilesStatusesImm(uploadDocsRequiredFilesStatusesType, getRequiredFilesStatusesImmCB);
			alertDialog(ALERT_TYPE.atSuccess, LangJSDict.strUPLOAD_COMPLETD_SUCCESS, false, null, null)
		} else {
			c = LangJSDict.strUPLOAD_GENERAL_ERROR;
			c = c.replace("%s", $("#upload_docs_file_input_" +
				b.FileType).val());
			c = c.replace("%s", LangJSDict.strSupportEmail);
			alertDialog(ALERT_TYPE.atError, c, false, null, null)
		}
		log(b)
	}
};
AccountRegistrationHSM.HandleGeneralInfo = function (b) {
	var c = VerifyProperties(["RegulationStatus"], b);
	if (c) ReportErrors(c);
	else {
		b = StringToEUserRegulationStatusType(b.RegulationStatus);
		if ($.inArray(AccountRegistrationHSM.prevRegulationStatus, [EUserRegulationStatus.Rejected, EUserRegulationStatus.Pending]) > -1 && $.inArray(b, [EUserRegulationStatus.Regulated, EUserRegulationStatus.RegulatedNotReviewed]) > -1) {
			GlobalDs.getBonusesInfoFromServer();
			c = null;
			$aReg.dialog("isOpen") && $aReg.dialog("close");
			if ($uploadDocsDialog.dialog("isOpen")) {
				$uploadDocsDialog.dialog("close");
				c = function () {
					startUpFlow.continueFlow()
				}
			}
			alertDialog(ALERT_TYPE.atSuccess, LangJSDict.strACCOUNT_IS_REGULATED, false, c, null);
			$("#main_lobby_bonus_link").addClass("display-none-class")
		}
		$.inArray(AccountRegistrationHSM.prevRegulationStatus, [EUserRegulationStatus.Regulated, EUserRegulationStatus.RegulatedNotReviewed]) > -1 && $.inArray(b, [EUserRegulationStatus.Rejected, EUserRegulationStatus.Pending]) > -1 && alertDialog(ALERT_TYPE.atError, LangJSDict.strREGULATION_REJECTED_CONTACT_SUPPORT, false, null, null);
		AccountRegistrationHSM.prevRegulationStatus =
			b
	}
};
AccountRegistrationHSM.HandleMessages = function (b) {
	AccountRegistrationHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.FileUploadResult:
			AccountRegistrationHSM.HandleFileUploadResult(d);
			break;
		case EClientMessageType.GeneralInfo:
			AccountRegistrationHSM.HandleGeneralInfo(d);
			break;
		default:
			break
		}
	});
	AccountRegistrationHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(AccountRegistrationHSM.HandleMessages);
var $close_position_amountSP, $close_position, $close_position_rate, $close_position_netpl, ClosePositionData = {
		PositionID: undefined,
		AtomicAmount: undefined,
		Rate: undefined,
		PrecisionDigits: undefined,
		Amount: undefined,
		InstrumentID: undefined,
		BuySellMode: undefined
	};

function getAmount() {
	return parseFloatCultured($close_position_amountSP.val())
}

function updateRate() {
	$close_position_rate.val(ClosePositionData.Rate)
}

function handlePositionFeedInClosePosition(b, c, d) {
	if (ClosePositionData.PositionID == b) {
		$close_position_netpl.val(GlobalDs.formatMoneyAmount(c, true, false, false));
		ClosePositionData.Rate = d;
		updateRate(d)
	}
}

function handleClosePositionInClosePositionDialog(b) {
	ClosePositionData.PositionID == b && $close_position.dialog("close")
}

function displayClosePositionDialog(b, c, d) {
	SENDImm_getClosePositionInfoImm({
		InstrumentID: c,
		PositionID: b
	}, function (e) {
		if (!(typeof e.PositionID !== "number" || e.PositionID !== b)) {
			ClosePositionData.PositionID = b;
			ClosePositionData.AtomicAmount = e.AtomicAmount;
			ClosePositionData.Rate = e.Rate;
			ClosePositionData.PrecisionDigits = e.PrecisionDigits;
			ClosePositionData.Amount = e.Amount;
			ClosePositionData.InstrumentID = e.InstrumentID;
			ClosePositionData.BuySellMode = d;
			$close_position.find("#cp_id_number").text(LangJSDict.strCLOSEPOSITION +
				"(" + b + ")");
			$close_position.find("#cp_inst_name").text(e.InstrumentName);
			$close_position_netpl.val(GlobalDs.formatMoneyAmount(e.NetPL, true, false, false));
			initClosePositionDialog(ClosePositionData);
			$close_position.dialog("open")
		}
	})
}

function initClosePositionDialog(b) {
	var c = b.Amount % b.AtomicAmount === 0 ? b.AtomicAmount : b.Amount % b.AtomicAmount;
	$close_position_amountSP.spinbox("destroy").spinbox({
		min: c,
		max: b.Amount,
		step: b.AtomicAmount,
		bigStep: 10 * b.AtomicAmount,
		atomicAmount: b.AtomicAmount,
		invalidClass: GC.FIELD_ERR_CLASS
	});
	$close_position_amountSP.val(b.Amount);
	c == b.Amount ? $close_position_amountSP.spinbox("disable") : $close_position_amountSP.spinbox("enable");
	b = roundToPrecisionDigits(b.Rate, b.PrecisionDigits);
	$close_position_rate.val(b)
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$close_position = $("#close_position_dialog");
		$close_position_amountSP = $("#close-position-spin");
		$close_position_rate = $("#cposition_rate");
		$close_position_netpl = $("#cposition_netpl");
		$close_position.dialog({
			iphoneMaxWidth: 250,
			iphoneMaxHeight: 210,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.ClosePositionFormWidth,
			close: function () {
				SENDImm_unregisterPositionFromRegularFeedsImm({
						PositionID: ClosePositionData.PositionID
					},
					null)
			}
		});
		$("#button_test_area");
		$close_position.find("#cposition_ok").click(function () {
			if ($close_position_amountSP.hasClass(GC.FIELD_ERR_CLASS)) return false;
			var b = new ClosePosition(ClosePositionData.PositionID, getAmount());
			SEND_closePosition(b);
			$close_position.dialog("close");
			return false
		});
		$close_position.find("#cposition_cancel").click(function () {
			$close_position.dialog("close");
			return false
		})
	}
});
ClosePositionDialogHSM != undefined && alert("ClosePositionDialogHSM is included twice!");
var ClosePositionDialogHSM = {};
ClosePositionDialogHSM.BeforeHSM = function () {};
ClosePositionDialogHSM.AfterHSM = function () {};
ClosePositionDialogHSM.HandlePositionsFeed = function (b) {
	var c = VerifyProperties(["PositionFeeds"], b);
	if (c) ReportErrors(c);
	else {
		b = b.PositionFeeds;
		if (c = VerifyProperties(["InstrumentID", "PositionID", "CurrentRate", "NetPLInUserCurrency"], b[0])) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c) StringToEInstrumentStatus(b[c].InstrumentStatus) != EInstrumentStatus.TotallyFreezed && handlePositionFeedInClosePosition(b[c].PositionID, b[c].NetPLInUserCurrency, b[c].CurrentRate)
		}
	}
};
ClosePositionDialogHSM.InstrumentsUpdate = function (b) {
	var c = VerifyProperties(["InstrumentTradeStatuses"], b);
	if (c) ReportErrors(c);
	else {
		b = b.InstrumentTradeStatuses;
		if (c = VerifyProperties(["InstrumentID", "IsTraded", "IsLive", "InstrumentStatus"], b[0])) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c) {
				var e = b[c];
				StringToEInstrumentStatus(e.InstrumentStatus) == EInstrumentStatus.TotallyFreezed && ClosePositionData.InstrumentID == e.InstrumentID && $close_position.dialog("close")
			}
		}
	}
};
ClosePositionDialogHSM.HandleClosePosition = function (b) {
	var c = VerifyProperties(["PositionID", "ClosePositionRespone", "RejectReason", "RejectReasonDesc", "ClosedPosition"], b);
	if (c) ReportErrors(c);
	else if ((b.ClosePositionRespone === null || StringToERequestStatus(b.ClosePositionRespone) != ERequestStatus.Rejected) && $close_position.dialog("isOpen")) handleClosePositionInClosePositionDialog(b.PositionID)
};
ClosePositionDialogHSM.HandleCancelPosition = function (b) {
	var c = VerifyProperties(["PositionID", "InstrumentID", "CancelReason", "CancelReasonDesc"], b);
	if (c) ReportErrors(c);
	else $close_position.dialog("isOpen") && handleClosePositionInClosePositionDialog(b.PositionID)
};
ClosePositionDialogHSM.HandleMessages = function (b) {
	ClosePositionDialogHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.InstrumentsUpdate:
			ClosePositionDialogHSM.InstrumentsUpdate(d);
			break;
		case EClientMessageType.PositionsFeed:
			ClosePositionDialogHSM.HandlePositionsFeed(d);
			break;
		case EClientMessageType.ClosePosition:
			ClosePositionDialogHSM.HandleClosePosition(d);
			break;
		case EClientMessageType.CancelPosition:
			ClosePositionDialogHSM.HandleCancelPosition(d);
			break;
		default:
			break
		}
	});
	ClosePositionDialogHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(ClosePositionDialogHSM.HandleMessages);
var $notifications, $not_open_mail, $not_open_sms, $not_close_mail, $not_close_sms, $not_price_mail, not_price_sms, $not_announcment_mail, $not_announcment_sms, $not_marin_email, $not_marin_sms, $not_price_sms, $not_price_email, not_open_push, not_close_push, not_price_push, not_announcment_push, not_margin_push;

function startLoadingAnimGifNotificationDialog() {
	$("#notification_container").addClass("loading")
}

function stopLoadingAnimGifNotificationDialog() {
	$("#notification_container").removeClass("loading")
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$notifications = $("#notifications_dialog");
		$not_open_mail = $("#notifacation_pos_open_email");
		$not_open_sms = $("#notifacation_pos_open_sms");
		$not_close_mail = $("#notifacation_pos_close_email");
		$not_close_sms = $("#notifacation_pos_close_sms");
		$not_price_mail = $("#notifacation_price_alert_email");
		$not_price_sms = $("#notifacation_price_alert_sms");
		$not_announcment_mail = $("#notifacation_announcment_email");
		$not_announcment_sms = $("#notifacation_announcment_sms");
		$not_marin_email = $("#notification_margin_email");
		$not_marin_sms = $("#notification_margin_sms");
		$notifications.dialog({
			iphoneMaxWidth: 260,
			iphoneMaxHeight: 530,
			autoOpen: false,
			modal: true,
			resizable: false,
			position: "center",
			width: GeneralUI.NotificationsDialogWidth
		});
		$("#button_test_area").find("#notifications").click(function () {
			$notifications.dialog("open");
			return false
		});
		$("#notification_cancel").click(function () {
			$notifications.dialog("close");
			return false
		});
		$("#notification_confirm").click(function () {
			var b =
				returnStringForCBStatus($not_open_mail, $not_open_sms, not_open_push),
				c = returnStringForCBStatus($not_close_mail, $not_close_sms, not_close_push),
				d = returnStringForCBStatus($not_price_mail, $not_price_sms, not_price_push),
				e = returnStringForCBStatus($not_announcment_mail, $not_announcment_sms, not_announcment_push),
				f = returnStringForCBStatus($not_marin_email, $not_marin_sms, not_margin_push),
				h = {};
			if (b !== null) h.OpenPositionNotification = b;
			if (c !== null) h.ClosePositionNotification = c;
			if (d !== null) h.AlertPriceNotification =
				d;
			if (e !== null) h.AnnouncementNotification = e;
			if (f !== null) h.MarginNotification = f;
			if ($.grep(getValues(h), function (g) {
				return g.indexOf("Email") != -1
			}).length > 0 && !GlobalDs.PersonalInfo.IsEmailValidated) {
				openEmailValidation();
				return false
			}
			if ($.grep(getValues(h), function (g) {
				return g.indexOf("SMS") != -1
			}).length > 0 && !GlobalDs.PersonalInfo.IsPhoneValidated) {
				GlobalDs.IsRealMode ? runStartUpFlow(EStartUpPageState.PhoneVer) : alertDialog(ALERT_TYPE.atConfirmation, LangJSDict.strYOU_MUST_TRADE_FOR_REAL_MONEY, false, function () {
						runStartUpFlow(EStartUpPageState.PhoneVer)
					},
					null);
				return false
			}
			OpenProcessingForm();
			SENDImm_UpdateNotificationImm(h, function (g) {
				CloseProcessingForm();
				StringToESecuredServiceResult(g.SecuredResultCode) !== ESecuredServiceResult.Success && alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" + g.SecuredResultCode], false, null, null);
				$notifications.dialog("close")
			});
			return false
		})
	}
});

function returnStringForCBStatus(b, c, d) {
	var e = null;
	if (b.is(":checked") && !c.is(":checked")) e = "Email";
	if (b.is(":checked") && c.is(":checked")) e = "Email,SMS";
	if (!b.is(":checked") && c.is(":checked")) e = "SMS";
	if (d) e = e === null ? "Push" : e + ",Push";
	return e
}

function openNotificationsDialog() {
	SENDImm_getNotificationImm({}, function (b) {
		startLoadingAnimGifNotificationDialog();
		clearNotificationCB();
		initNotificationDialog(b);
		$notifications.dialog("open")
	})
}

function initNotificationDialog(b) {
	var c = VerifyProperties(["AlertTypeExecutions"], b);
	if (c) ReportErrors(c);
	else {
		b = b.AlertTypeExecutions;
		if (b === null || b.length === 0) stopLoadingAnimGifBonusDialog();
		else if (c = VerifyProperties(["AlertType", "ExecutionMethods"], b[0])) ReportErrors(c);
		else {
			c = b.length;
			for (var d = 0; d < c; d++)
				for (var e = b[d], f = StringToEAlertType(e.AlertType), h = 0; h < e.ExecutionMethods.length; h++) {
					var g = StringToEAlertsExecutionMethod(e.ExecutionMethods[h]);
					checkedNotificationCB(f, g)
				}
			stopLoadingAnimGifNotificationDialog()
		}
	}
}

function clearNotificationCB() {
	$not_open_mail.prop("checked", false);
	$not_open_sms.prop("checked", false);
	$not_close_mail.prop("checked", false);
	$not_close_sms.prop("checked", false);
	$not_price_mail.prop("checked", false);
	$not_price_sms.prop("checked", false);
	$not_announcment_mail.prop("checked", false);
	$not_announcment_sms.prop("checked", false);
	$not_marin_email.prop("checked", false);
	$not_marin_sms.prop("checked", false);
	not_margin_push = not_announcment_push = not_price_push = not_close_push = not_open_push = false
}

function checkedNotificationCB(b, c) {
	switch (b) {
	case EAlertType.PositionOpened:
		if (c === EAlertsExecutionMethod.Email) $not_open_mail.prop("checked", true);
		else if (c === EAlertsExecutionMethod.SMS) $not_open_sms.prop("checked", true);
		else if (c === EAlertsExecutionMethod.Push) not_open_push = true;
		break;
	case EAlertType.PositionClosed:
		if (c === EAlertsExecutionMethod.Email) $not_close_mail.prop("checked", true);
		else if (c === EAlertsExecutionMethod.SMS) $not_close_sms.prop("checked", true);
		else if (c === EAlertsExecutionMethod.Push) not_close_push =
			true;
		break;
	case EAlertType.RateAlert:
		if (c === EAlertsExecutionMethod.Email) $not_price_mail.prop("checked", true);
		else if (c === EAlertsExecutionMethod.SMS) $not_price_sms.prop("checked", true);
		else if (c === EAlertsExecutionMethod.Push) not_price_push = true;
		break;
	case EAlertType.Announcement:
		if (c === EAlertsExecutionMethod.Email) $not_announcment_mail.prop("checked", true);
		else if (c === EAlertsExecutionMethod.SMS) $not_announcment_sms.prop("checked", true);
		else if (c === EAlertsExecutionMethod.Push) not_announcment_push =
			true;
		break;
	case EAlertType.MarginAlert:
		if (c === EAlertsExecutionMethod.Email) $not_marin_email.prop("checked", true);
		else if (c === EAlertsExecutionMethod.SMS) $not_marin_sms.prop("checked", true);
		else if (c === EAlertsExecutionMethod.Push) not_margin_push = true;
		break;
	default:
		ReportErrors("choosedNotificationCB: Unknwon " + b + " enum value!");
		return -1
	}
	return 0
}
var $favorites;
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$favorites = $("#favorites_dialog");
		$favorites.dialog({
			iphoneMaxWidth: 523,
			iphoneMaxHeight: 250,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.FavoritesWidth
		});
		$("#button_test_area").find("#favorites").click(function () {
			$favorites.dialog("open");
			return false
		});
		$favorites.find("#fav_cancel").click(function () {
			$favorites.dialog("close")
		})
	}
});

function openFavoritesDialog() {
	$favorites.dialog("open")
}
var $deposit, $deposit_header_max, $deposit_header_min, $deposit_symbol, $cc_card_number, $cc_bonus_code, $cc_amount, $cc_crad_type, $cc_expiration_container, $cc_holder, $cc_verification, $cc_tab, $cc_different_card, $dmb_amount, $dmb_email, $other_amount, $other_bonus_code, $other_tab, $dmb_bonus_code, $dmb_tab, $cashu_tab, $cashu_amount, $cashu_bonus_code, $paypal_tab, $dpaypal_amount, $dpaypal_email, $paypal_bonus_code, $alternative_methods_amount, $alternative_methods_bonus_code, $dnumeric_Fields, $dall_fields, $dhiddenFields,
	$demptyWhenOtherCCFields, needCreditCardDetails = true,
	lastPaymethodId = 0,
	ccTabIndex, ppTabIndex, mbTabIndex, wireTabIndex, $cc_details_fields, ranInitFundsDeposit = false;

function creditCardDepositIsSuccessful() {
	GlobalDs.IsDeposited = true;
	CloseFundsDeposit();
	enableDisableAddressValidationLink()
}

function clearAndShowCCfields() {
	$cc_different_card.addClass("display-none-class");
	$cc_details_fields.removeClass("display-none-class");
	$dall_fields.not(".dont-empty-on-open").removeClass(GC.FIELD_ERR_CLASS);
	$demptyWhenOtherCCFields.not(".dont-empty-on-open").val("");
	needCreditCardDetails = true;
	return false
}

function handleDepositFailed(b) {
	var c = null;
	if (StringToESecuredServiceResult(b.DepositResult.SecuredResultCode) == ESecuredServiceResult.PhoneVerifyNeeded) c = function () {
		GlobalDs.CashierInfo.depositFailedPhoneVerifyNeeded = true;
		runStartUpFlow(EStartUpPageState.SSLOpenWithDeposit)
	};
	if (StringToESecuredServiceResult(b.DepositResult.SecuredResultCode) == ESecuredServiceResult.SendDocsNeeded) c = function () {
		runStartUpFlow(EStartUpPageState.SSLOpenWithDepositTrustLevelUploadDocs)
	};
	alertDialog(ALERT_TYPE.atError, b.DepositResult.ErrorDesc,
		false, c, null)
}

function performCreditCardDeposit() {
	var b = $cc_bonus_code.hasClass("display-none-class") ? "" : $cc_bonus_code.val(),
		c = new RealDepositCreditCard(parseInt($cc_amount.val(), 10), b, $cc_card_number.val(), parseInt($("#deposit_month").val(), 10), parseInt($("#deposit_year").val(), 10), $cc_verification.val(), $("#deposit_card_name_box").val());
	OpenProcessingForm();
	SENDImm_realDepositCreditCardImm(c, function (d) {
		CloseProcessingForm();
		var e = VerifyProperties(["DepositResult", "CreditCardsErrorReason"], d);
		if (e) ReportErrors(e);
		else if (e = VerifyProperties(["ErrorDesc", "Succeeded", "SecuredResultCode"], d.DepositResult)) ReportErrors(e);
		else if (d.DepositResult.Succeeded) alertDialog(ALERT_TYPE.atSuccess, LangJSDict.strDEPOSIT_SUCCESSFUL, false, creditCardDepositIsSuccessful, null);
		else {
			var f = StringToECreditCardsErrorReason(d.CreditCardsErrorReason),
				h = GlobalDs.CashierInfo.GetPayMethod(EPayMethodType.CreditCards).MinDepositAmount;
			e = GlobalDs.CashierInfo.IsValidPayMethod(EPayMethodType.MoneyBookers, EPayMethodFunctionality.Deposit);
			var g =
				GlobalDs.CashierInfo.IsValidPayMethod(EPayMethodType.PayPal, EPayMethodFunctionality.Deposit),
				l = GlobalDs.CashierInfo.IsValidPayMethod(EPayMethodType.Wire, EPayMethodFunctionality.Deposit);
			if (f == ECreditCardsErrorReason.WrongCVV) $cc_verification.addClass(GC.FIELD_ERR_CLASS);
			else if ((f == ECreditCardsErrorReason.Denied || f == ECreditCardsErrorReason.DefaultReason) && c.Amount > h * 10 && (e || g || l)) {
				d = [];
				if (g) d.push({
					Id: "alternative_option_pp",
					Text: LangJSDict.strCASHIER_PayPal,
					Func: function () {
						$("#funds_deposit_tabs").tabs("option",
							"active", ppTabIndex)
					}
				});
				else e && d.push({
					Id: "alternative_option_mb",
					Text: LangJSDict.strCASHIER_MoneyBookers,
					Func: function () {
						$("#funds_deposit_tabs").tabs("option", "active", mbTabIndex)
					}
				});
				l && d.push({
					Id: "alternative_option_wire",
					Text: LangJSDict.strCASHIER_Wire,
					Func: function () {
						$("#funds_deposit_tabs").tabs("option", "active", wireTabIndex)
					}
				});
				d.push({
					Id: "alternative_option_cancel",
					Text: LangJSDict.strCANCEL,
					Func: null
				});
				alertDialogMultipleChoice(ALERT_TYPE.atConfirmation, GlobalDs.Brand, LangJSDict.strTRY_ALTERNATIVE_METHOD,
					true, d, null)
			} else handleDepositFailed(d)
		}
	})
}

function performUseLastDepositMethod(b) {
	b = new UseLastDepositMethod(b, lastPaymethodId);
	OpenProcessingForm();
	SENDImm_realDepositUseLastDepositMethodImm(b, function (c) {
		CloseProcessingForm();
		var d = VerifyProperties(["DepositResult"], c);
		if (d) ReportErrors(d);
		else if (d = VerifyProperties(["ErrorDesc", "Succeeded", "SecuredResultCode"], c.DepositResult)) ReportErrors(d);
		else c.DepositResult.Succeeded ? alertDialog(ALERT_TYPE.atSuccess, LangJSDict.strDEPOSIT_SUCCESSFUL, false, creditCardDepositIsSuccessful, null) : handleDepositFailed(c)
	})
}

function realDepositCB(b) {
	CloseProcessingForm();
	if (b.DepositResult.Succeeded) b.RedirectUrl.length === 0 && StringToEDeployEnvironemntType(LangJSDict.jsDeployEnv) == EDeployEnvironemnt.Prod ? alertDialog(ALERT_TYPE.atError, LangJSDict.strERROR_Server, false, null, null) : alertDialog(ALERT_TYPE.atInfo, LangJSDict.strDEPOSIT_IN_BROWSER, false, function () {
			window.open(b.RedirectUrl, "_blank") === null && alertDialog(ALERT_TYPE.atError, "Please disable pop up blocker and retry!", false, null, null);
			CloseFundsDeposit();
			openFundsManagement(false)
		},
		null);
	else handleDepositFailed(b)
}

function performMoneyBookersDeposit(b, c, d, e) {
	b = e === null ? new RealDepositMoneyBookers(b, c, d, null) : new RealDepositMoneyBookers(b, c, d, e);
	OpenProcessingForm();
	SENDImm_realDepositMoneyBookersImm(b, realDepositCB)
}

function performAlternativeMethodsDeposit(b, c, d) {
	b = new RealDepositAlternativeMethods(b, c, d);
	OpenProcessingForm();
	SENDImm_realDepositAlternativeMethodsImm(b, realDepositCB)
}

function performCashUDeposit(b, c) {
	b = new RealDepositCashU(b, c);
	OpenProcessingForm();
	SENDImm_realDepositCashUImm(b, realDepositCB)
}

function performPayPalDeposit(b, c, d) {
	b = new RealDepositPayPal(b, c, d);
	OpenProcessingForm();
	SENDImm_realDepositPayPalImm(b, realDepositCB)
}

function fundsDeposit_SetDisplayedtabs(b) {
	var c = ["#credit_cardLI", "#PayPalLI", "#money_bookersLI", "#tab_otherLI", "#wireLI", "#cashuLI"];
	c = c.concat(b);
	for (var d = [EPayMethodType.CreditCards, EPayMethodType.PayPal, EPayMethodType.MoneyBookers, EPayMethodType.MoneyBookers, EPayMethodType.Wire, EPayMethodType.CashU], e = 0; e < b.length; e++) d.push(EPayMethodType.AlternativeMethods);
	e = $("#funds_deposit_tabs").tabs("option", "active");
	b = e < 0 ? false : GlobalDs.CashierInfo.IsValidPayMethod(d[e], EPayMethodFunctionality.Deposit);
	if (c[e] == "#tab_otherLI" && GlobalDs.CashierInfo.MoneyBookersPMs.length === 0) b = false;
	for (e = 0; e < c.length; e++) {
		if (c[e] == "#credit_cardLI") ccTabIndex = e;
		else if (c[e] == "#PayPalLI") ppTabIndex = e;
		else if (c[e] == "#money_bookersLI") mbTabIndex = e;
		else if (c[e] == "#wireLI") wireTabIndex = e;
		if (!GlobalDs.CashierInfo.IsValidPayMethod(d[e], EPayMethodFunctionality.Deposit) || c[e] == "#tab_otherLI" && GlobalDs.CashierInfo.MoneyBookersPMs.length === 0) $deposit.find(c[e]).hide();
		else {
			$deposit.find(c[e]).show();
			if (!b) {
				b = true;
				$("#funds_deposit_tabs").tabs("option",
					"active", e)
			}
		}
	}
}

function fillMinMaxValues(b) {
	b = GlobalDs.CashierInfo.GetPayMethod(b);
	var c = b.MinDepositAmount;
	$deposit_header_max.text(GlobalDs.formatMoneyAmount(b.MaxDepositAmount, true, true));
	$deposit_header_min.text(GlobalDs.formatMoneyAmount(c, true, true))
}

function fundsDeposit_SetWireBankLogo() {
	var b = GlobalDs.CashierInfo.GetPayMethod(EPayMethodType.Wire);
	for (var c in EBankType) $("#deposit_wire_bank_logo").removeClass("wire_bank_name_" + c);
	$("#deposit_wire_bank_logo").addClass("wire_bank_name_" + EBankTypeToString(b.BankType))
}

function fundsDeposit_SetCreditCardOptions() {
	$cc_crad_type.empty();
	$("<option>" + LangJSDict.strSELECT + "</option>").appendTo($cc_crad_type).prop("selected", true);
	$("<option>Visa</option>").appendTo($cc_crad_type);
	$("<option>MasterCard</option>").appendTo($cc_crad_type);
	for (var b = 0; b < GlobalDs.CashierInfo.MoneyBookersCCs.length; b++) {
		var c = EMoneyBookersCCsToDisplayedString(GlobalDs.CashierInfo.MoneyBookersCCs[b]);
		$("<option>" + c + "</option>").appendTo($cc_crad_type).data("MoneyBookersType", GlobalDs.CashierInfo.MoneyBookersCCs[b])
	}
	$("<option>" +
		LangJSDict.strOTHER_CARD + "</option>").appendTo($cc_crad_type).data("MoneyBookersType", EMoneyBookersCCs.OTHER);
	$cc_holder.val(GlobalDs.PersonalInfo.FName + " " + GlobalDs.PersonalInfo.LName)
}

function fundsDeposit_SetOtherTab() {
	if (GlobalDs.CashierInfo.MoneyBookersPMs.length == 1) {
		$deposit.find("#tab_otherLI div a").text(EMoneyBookersPMsToDisplayedString(GlobalDs.CashierInfo.MoneyBookersPMs[0]));
		$deposit.find("#other_type_labelDIV").hide();
		$deposit.find("#other_type_selectDIV").hide()
	} else {
		var b = $deposit.find("#other_type_selectDIV"),
			c = b.find("select");
		$deposit.find("#other_type_labelDIV").show();
		b.show();
		b = "";
		var d = 0;
		for (d = 0; d < GlobalDs.CashierInfo.MoneyBookersPMs.length; d++)
			if (b.length <=
				GC.OTHER_TAB_HEADER_MAXLEN) {
				if (b !== "") b += " / ";
				b += EMoneyBookersPMsToDisplayedString(GlobalDs.CashierInfo.MoneyBookersPMs[d])
			} else {
				b += " / Other";
				break
			}
		$deposit.find("#tab_otherLI div a").text(b);
		c.empty();
		for (d = 0; d < GlobalDs.CashierInfo.MoneyBookersPMs.length; d++) $("<option>" + EMoneyBookersPMsToDisplayedString(GlobalDs.CashierInfo.MoneyBookersPMs[d]) + "</option>").appendTo(c).data("MoneyBookersPMType", GlobalDs.CashierInfo.MoneyBookersPMs[d])
	}
}
var alternativeMethodTabTemplate = "<li id='alternative_methods_#{suffix}LI' class='alternative_methods_li'><a href='#alternative_methods_#{suffix}'><span class='funds_pm_#{suffix} float'></span>#{label}</a></li>";

function createAlternativeMethodTab(b) {
	var c = EAlternativeMethodsPMsToString(b),
		d = "alternative_methods_" + c,
		e = $(alternativeMethodTabTemplate.replace(/#\{suffix\}/g, c).replace(/#\{label\}/g, EAlternativeMethodsPMsToDisplayedString(b)));
	c = {
		name: c,
		description: LangJSDict.strOTHER_DESC
	};
	$("#funds_deposit_tabs ul").append(e);
	$("#alternative_methods_template").jqote(c)[0].appendTo($("#funds_deposit_tabs"));
	var f = $("#funds_deposit_tabs").find("#" + d);
	f.find(".deposit-submit-button").click(function () {
		f.find("input").removeClass(GC.FIELD_ERR_CLASS);
		var h = f.find("#" + d + "_amount"),
			g = true;
		if (g = isDepositeAmountOk(h, EPayMethodType.AlternativeMethods)) {
			g = f.find("#" + d + "_bonus_code");
			g = g.hasClass("display-none-class") ? "" : g.val();
			performAlternativeMethodsDeposit(parseInt(h.val(), 10), g, b)
		}
		return false
	})
}

function openFundsDeposit(b) {
	initIfNeededFundsDeposit();
	if (!$deposit.dialog("isOpen"))
		if (GlobalDs.CashierInfo.NumOfPendingWithdrawals > 0) openHistoryDialog(true, false);
		else {
			var c = [];
			$("#funds_deposit_tabs").find(".alternative_methods_main_div").each(function () {
				c.push(this.id)
			});
			for (var d = false, e = [], f = 0; f < GlobalDs.CashierInfo.AlternativeMethodsPMs.length; f++) {
				var h = GlobalDs.CashierInfo.AlternativeMethodsPMs[f],
					g = "alternative_methods_" + EAlternativeMethodsPMsToString(h),
					l = $.inArray(g, c);
				if (l >= 0) c.splice(l,
					1);
				else {
					createAlternativeMethodTab(h);
					d = true
				}
				e.push(g + "LI")
			}
			for (f = 0; f < c.length; f++) {
				$("#funds_deposit_tabs").find("#" + c[f]).remove();
				$("#funds_deposit_tabs ul").find("#" + c[f] + "LI").remove();
				d = true
			}
			if (d) {
				$("#funds_deposit_tabs").tabs("destroy");
				$("#funds_deposit_tabs").tabs()
			}
			$alternative_methods_amount = $(".alternative_methods_amount");
			$alternative_methods_bonus_code = $(".alternative_methods_bonus_code");
			$deposit_symbol = $deposit.find(".depoist-symbol");
			fundsDeposit_SetDisplayedtabs(e);
			fundsDeposit_SetCreditCardOptions();
			fundsDeposit_SetOtherTab();
			fundsDeposit_SetWireBankLogo();
			$deposit_symbol.text(GlobalDs.UserBaseCurrencySymbol);
			d = $("#funds_deposit_tabs").tabs("option", "active");
			initMinMaxValues(d);
			$dall_fields.not(".dont-empty-on-open").removeClass(GC.FIELD_ERR_CLASS);
			$dhiddenFields.removeClass("display-none-class");
			$cc_crad_type.removeClass(GC.FIELD_ERR_CLASS);
			$dmb_email.val(GlobalDs.UserName);
			$dpaypal_email.val(GlobalDs.UserName);
			needCreditCardDetails = true;
			d = GlobalDs.CashierInfo.LastSuccessfulPayMethodsInfo;
			if (d !== null) {
				e = -1;
				f = false;
				for (h = 0; h < d.DepositItems.length; h++) {
					g = GetPropDefault(d.DepositItems[h], "PayMethodType", null);
					if (g == EPayMethodType.CreditCards && GlobalDs.CashierInfo.IsValidPayMethod(EPayMethodType.CreditCards, EPayMethodFunctionality.Deposit)) {
						g = GetPropDefault(d.DepositItems[h], "AdditionalInfo", null);
						lastPaymethodId = GetPropDefault(d.DepositItems[h], "PayMethodID", 0);
						if (g !== null && g.length > 0) {
							$cc_card_number.val("XXXXXXXXXXXX" + g);
							$cc_details_fields.addClass("display-none-class");
							$cc_tab.find(".div-card-different-cc").removeClass("display-none-class");
							needCreditCardDetails = false;
							e = f ? e : ccTabIndex;
							f = true
						} else $cc_details_fields.removeClass("display-none-class")
					} else {
						l = d.DepositItems[h].AdditionalInfo;
						if (typeof l == "string" && checkEmailString(l))
							if (g == EPayMethodType.MoneyBookers && GlobalDs.CashierInfo.IsValidPayMethod(EPayMethodType.MoneyBookers, EPayMethodFunctionality.Deposit)) {
								$dmb_email.val(l);
								e = f ? e : mbTabIndex;
								f = true
							} else if (g == EPayMethodType.PayPal && GlobalDs.CashierInfo.IsValidPayMethod(EPayMethodType.PayPal, EPayMethodFunctionality.Deposit)) {
							$dpaypal_email.val(l);
							e = f ? e : ppTabIndex;
							f = true
						}
					}
				}
				e >= 0 && $("#funds_deposit_tabs").tabs("option", "active", e)
			}
			initializeIfBonusAmountControls(b);
			GlobalDs.IsDeposited && showOrHideBonusCode(false);
			$deposit.dialog("open")
		}
}

function CloseFundsDeposit() {
	$deposit.dialog("isOpen") && $deposit.dialog("close")
}

function GetAmountForPayMethod(b, c) {
	if (c = GlobalDs.CashierInfo.GetPayMethod(c))
		if (b < c.MinDepositAmount) return c.MinDepositAmount;
		else if (b > c.MaxDepositAmount) return c.MaxDepositAmount;
	return b
}

function initializeIfBonusAmountControls(b) {
	if (b !== null) {
		var c = ApplicationState.readBonus();
		if (!(false in c)) {
			c = c.BonusCode;
			$cc_amount.val(GetAmountForPayMethod(b, EPayMethodType.CreditCards));
			$dmb_amount.val(GetAmountForPayMethod(b, EPayMethodType.MoneyBookers));
			$other_amount.val(GetAmountForPayMethod(b, EPayMethodType.MoneyBookers));
			$dpaypal_amount.val(GetAmountForPayMethod(b, EPayMethodType.PayPal));
			$cashu_amount.val(GetAmountForPayMethod(b, EPayMethodType.CashU));
			$alternative_methods_amount.val(GetAmountForPayMethod(b,
				EPayMethodType.AlternativeMethods));
			$cc_bonus_code.val(c);
			$dmb_bonus_code.val(c);
			$paypal_bonus_code.val(c);
			$other_bonus_code.val(c);
			$cashu_bonus_code.val(c);
			$alternative_methods_bonus_code.val(c);
			ApplicationState.writeStartUpPageState(null);
			ApplicationState.writeStartUpInitiatorSubSessionID(null)
		}
	}
}

function initMinMaxValues(b) {
	switch (b) {
	case 0:
		initializeDepositeMinMaxLimitValues("credit_card");
		break;
	case 1:
		initializeDepositeMinMaxLimitValues("PayPal");
		break;
	case 2:
		initializeDepositeMinMaxLimitValues("money_bookers");
		break;
	case 3:
		initializeDepositeMinMaxLimitValues("money_bookers");
		break;
	case 4:
		initializeDepositeMinMaxLimitValues("wire");
		break;
	case 5:
		initializeDepositeMinMaxLimitValues("cashu");
		break;
	default:
		break
	}
	b > 5 && initializeDepositeMinMaxLimitValues("alternative_methods")
}

function initializeDepositeMinMaxLimitValues(b) {
	if (b === "credit_card") fillMinMaxValues(EPayMethodType.CreditCards);
	else if (b === "money_bookers") fillMinMaxValues(EPayMethodType.MoneyBookers);
	else if (b === "wire") fillMinMaxValues(EPayMethodType.Wire);
	else if (b === "cashu") fillMinMaxValues(EPayMethodType.CashU);
	else if (b === "PayPal") fillMinMaxValues(EPayMethodType.PayPal);
	else if (b === "other") fillMinMaxValues(EPayMethodType.MoneyBookers);
	else b.indexOf("alternative_methods") >= 0 && fillMinMaxValues(EPayMethodType.AlternativeMethods)
}

function showOrHideBonusCode(b) {
	if (b) {
		$(".codeEDT").removeClass("display-none-class");
		$(".codeLBL").removeClass("display-none-class")
	} else {
		$(".codeEDT").addClass("display-none-class");
		$(".codeLBL").addClass("display-none-class")
	}
}
$(document).ready(function () {
	getDisplayPageType()
});

function initIfNeededFundsDeposit() {
	if (!ranInitFundsDeposit)
		if (getDisplayPageType() === EPageType.Trade) {
			$deposit = $("#funds_deposit_dialog");
			$deposit_header_max = $("#dep_max");
			$deposit_header_min = $("#dep_min");
			$cc_tab = $deposit.find("#cc_box");
			$dmb_tab = $deposit.find("#mb_box");
			$other_tab = $deposit.find("#other_box");
			$paypal_tab = $deposit.find("#paypal_box");
			$cashu_tab = $deposit.find("#cashu_box");
			$deposit_symbol = $deposit.find(".depoist-symbol");
			$cc_amount = $("#deposit_card_amount");
			$cc_card_number = $("#deposit_card_number");
			$cc_verification = $("#deposit_card_verification");
			$cc_expiration_container = $("#deposite_card_expiration_container");
			$cc_different_card = $cc_tab.find(".div-card-different-cc");
			$dmb_amount = $("#deposit_mb_amount");
			$dmb_email = $("#mb_email");
			$other_amount = $("#deposit_other_amount");
			$dpaypal_amount = $("#deposit_paypal_amount");
			$dpaypal_email = $("#deposit_paypal_email");
			$cashu_amount = $("#cashu_amount");
			$cc_bonus_code = $("#deposit_card_bonus_box");
			$dmb_bonus_code = $("#mb_bonus");
			$cashu_bonus_code = $("#cashu_bonus_code");
			$other_bonus_code = $("#other_bonus");
			$paypal_bonus_code = $("#deposit_paypal_bonus_code");
			$dnumeric_Fields = $([]).add($cc_amount).add($cc_card_number).add($cc_verification).add($dmb_amount).add($other_amount).add($dpaypal_amount).add($cashu_amount);
			$cc_crad_type = $cc_tab.find("#card_type");
			$cc_holder = $("#deposit_card_name_box");
			$demptyWhenOtherCCFields = $([]).add($cc_card_number).add($cc_verification).add($cc_holder).add($cc_expiration_container);
			$dall_fields = $([]).add($dnumeric_Fields).add($dmb_email).add($cc_holder).add($dpaypal_email).add($cc_expiration_container);
			$dhiddenFields = $([]).add($deposit.find(".deposit-card-number")).add($deposit.find(".deposit-card-number-box")).add($deposit.find(".deposit-card-verification")).add($deposit.find(".deposit-card-verification-box")).add($deposit.find(".deposit-last3")).add($("#deposite_card_expiration_container")).add($deposit.find(".deposit-card-expiration")).add($deposit.find(".div-card-expiration")).add($deposit.find(".deposit-card-name")).add($deposit.find(".div-card-name")).add($deposit.find(".deposit-card-bonus")).add($deposit.find(".div-card-bonus"));
			$cc_details_fields = $([]).add($cc_expiration_container).add($deposit.find(".deposit-card-verification")).add($deposit.find(".deposit-card-name")).add($deposit.find(".div-card-name")).add($cc_crad_type).add($deposit.find(".deposit-card-expiration")).add($deposit.find(".deposit-card-type")).add($deposit.find(".div-card-verification")).add($deposit.find(".deposit-div-type")).add($deposit.find(".deposit-last3"));
			$("#funds_deposit_tabs").tabs({
				active: 0
			});
			$deposit.dialog({
				iphoneMaxWidth: 755,
				iphoneMaxHeight: 500,
				autoOpen: false,
				modal: true,
				resizable: false,
				width: GeneralUI.DepositeWidth,
				height: GeneralUI.DepositeHeight,
				open: function () {},
				close: function () {}
			});
			$("#button_test_area").find("#deposit").click(function () {
				openFundsDeposit(null)
			});
			$deposit.find("#back_button").click(function () {
				CloseFundsDeposit();
				return false
			});
			var b = new Date,
				c = b.getFullYear(),
				d = b.getMonth(b) + 1;
			b = $("#deposit_month");
			for (var e = 1; e <= 12; e++) $("<option>" + e + "</option>").appendTo(b);
			b.children("option").filter(function () {
				return $(this).html() ==
					"" + d
			}).prop("selected", true);
			b = $deposit.find("#deposit_year");
			for (e = 2010; e <= 2030; e++) $("<option>" + e + "</option>").appendTo(b);
			b.children("option").filter(function () {
				return $(this).html() == "" + c
			}).prop("selected", true);
			$dnumeric_Fields.ivsNumeric();
			$("#funds_deposit_tabs").bind("tabsselect", function (h, g) {
				initializeDepositeMinMaxLimitValues(g.panel.id)
			});
			var f = false;
			$cc_crad_type.change(function () {
				$cc_crad_type.removeClass(GC.FIELD_ERR_CLASS);
				if ($("#card_type :selected").data("MoneyBookersType")) {
					$dhiddenFields.addClass("display-none-class");
					showOrHideBonusCode(false);
					f = true
				} else {
					$dhiddenFields.removeClass("display-none-class");
					GlobalDs.IsDeposited ? showOrHideBonusCode(false) : showOrHideBonusCode(true);
					f = false
				}
			});
			$cc_tab.find(".deposit-submit-button").click(function () {
				$dall_fields.removeClass(GC.FIELD_ERR_CLASS);
				var h = true;
				h = isDepositeAmountOk($cc_amount, EPayMethodType.CreditCards) && h;
				if (!f && needCreditCardDetails) {
					h = checkLength($cc_verification, GC.VALIDATION_CODE_MIN_MAX, GC.VALIDATION_CODE_MIN_MAX) && h;
					h = checkLength($cc_holder, GC.NAME_MIN_LENGTH,
						GC.LAST_NAME_MAX_LENGTH) && h;
					h = checkRegexp($cc_holder, GC.NON_ALPHANUM_CHARS_REG_EXP, false) && h;
					h = checkRegexp($cc_holder, GC.NAME_FAIL_REG_EXP, false) && h;
					h = checkExpiryDate() && h
				}
				if (!$cc_card_number.hasClass("display-none-class") && needCreditCardDetails) h = isValidCreditCard($cc_card_number, $cc_card_number.val()) && h;
				if (h)
					if (needCreditCardDetails)
						if ($("#card_type :selected").data("MoneyBookersType")) {
							h = $cc_bonus_code.hasClass("display-none-class") ? "" : $cc_bonus_code.val();
							performMoneyBookersDeposit(parseInt($cc_amount.val(),
								10), h, null)
						} else performCreditCardDeposit();
						else performUseLastDepositMethod(parseInt($cc_amount.val(), 10));
				return false
			});
			$dmb_tab.find(".deposit-submit-button").click(function () {
				$dmb_tab.find("input").removeClass(GC.FIELD_ERR_CLASS);
				var h = true;
				h = isDepositeAmountOk($dmb_amount, EPayMethodType.MoneyBookers) && h;
				if ($dmb_email.val() === null || $dmb_email.val().toLowerCase() === "null") $dmb_email.val("");
				if (h && $dmb_email.val().length > 0) h = checkEmail($dmb_email) && h;
				if (h) {
					h = $dmb_bonus_code.hasClass("display-none-class") ?
						"" : $dmb_bonus_code.val();
					performMoneyBookersDeposit(parseInt($dmb_amount.val(), 10), h, $dmb_email.val(), null)
				}
				return false
			});
			$cashu_tab.find(".deposit-submit-button").click(function () {
				$cashu_tab.find("input").removeClass(GC.FIELD_ERR_CLASS);
				var h = true;
				if (h = isDepositeAmountOk($cashu_amount, EPayMethodType.CashU) && h) {
					h = $cashu_bonus_code.hasClass("display-none-class") ? "" : $cashu_bonus_code.val();
					performCashUDeposit(parseInt($cashu_amount.val(), 10), h)
				}
				return false
			});
			$other_tab.find(".deposit-submit-button").click(function () {
				$other_tab.find("input").removeClass(GC.FIELD_ERR_CLASS);
				var h = true;
				h = isDepositeAmountOk($other_amount, EPayMethodType.MoneyBookers) && h;
				var g = $deposit.find("#other_type_selectDIV").find("select").find(":selected").data("MoneyBookersPMType");
				if (h) {
					h = $other_bonus_code.hasClass("display-none-class") ? "" : $other_bonus_code.val();
					performMoneyBookersDeposit(parseInt($other_amount.val(), 10), h, "", g)
				}
				return false
			});
			$cc_different_card.click(function () {
				clearAndShowCCfields()
			});
			$("#deposit-wire-button").click(function () {
				OpenProcessingForm();
				SENDImm_realDepositWireImm({},
					function (h) {
						CloseProcessingForm();
						h.DepositResult.Succeeded ? alertDialog(ALERT_TYPE.atSuccess, LangJSDict.strEMAIL_SENT, false, function () {
							CloseFundsDeposit();
							openFundsManagement(false)
						}, null) : alertDialog(ALERT_TYPE.atError, h.DepositResult.ErrorDesc, false, null, null)
					});
				return false
			});
			$paypal_tab.find(".deposit-submit-button").click(function () {
				$paypal_tab.find("input").removeClass(GC.FIELD_ERR_CLASS);
				var h = true;
				h = isDepositeAmountOk($dpaypal_amount, EPayMethodType.PayPal) && h;
				if (h = checkEmail($dpaypal_email) &&
					h) {
					h = $paypal_bonus_code.hasClass("display-none-class") ? "" : $paypal_bonus_code.val();
					performPayPalDeposit(parseInt($dpaypal_amount.val(), 10), h, $dpaypal_email.val())
				}
				return false
			});
			ranInitFundsDeposit = true
		}
}

function checkExpiryDate() {
	var b = true,
		c = parseInt($("#deposit_month").val(), 10),
		d = parseInt($("#deposit_year").val(), 10);
	c = new Date(d, c - 1, 2);
	d = new Date;
	d.setDate(1);
	if (d > c) {
		b = false;
		$cc_expiration_container.addClass(GC.FIELD_ERR_CLASS)
	}
	return b
}

function CheckCreditCardDetails(b, c, d, e) {
	return checkLength(b, c, d) & checkRegexp(b, e)
}

function isValidCreditCard(b, c) {
	var d = false;
	if (/^(34|37)/.test(c)) {
		if (c.length == 15) d = true
	} else if (/^(51|52|53|54|55)/.test(c)) {
		if (c.length == 16) d = true
	} else if (/^(4)/.test(c)) {
		if (c.length == 13 || c.length == 16) d = true
	} else if (/^(300|301|302|303|304|305|36|38)/.test(c)) {
		if (c.length == 14) d = true
	} else if (/^(2014|2149)/.test(c)) {
		if (c.length == 15) d = true
	} else if (/^(6011)/.test(c)) {
		if (c.length == 16) d = true
	} else if (/^(3)/.test(c)) {
		if (c.length == 16) d = true
	} else if (/^(2131|1800)/.test(c))
		if (c.length == 15) d = true;
	d || b.addClass(GC.FIELD_ERR_CLASS);
	return d
}

function isDepositeAmountOk(b, c) {
	var d = true,
		e = GlobalDs.CashierInfo.GetPayMethod(c);
	c = e.MinDepositAmount;
	e = e.MaxDepositAmount;
	var f = parseInt(b.val(), 10);
	if (isNaN(f)) d = false;
	else if (f.length < 1 || f > e || f < c || b.val().charAt(0) == "0") d = false;
	d || b.addClass(GC.FIELD_ERR_CLASS);
	return d
}
var $withdraw, $wire_bank_state, $withdraw_symbol, $mb_amount, $mb_email, $bank_draft_amount, $wire_amount, $wire_bank_account_number, $wire_bank_name, $wire_IBAN, $wire_bank_code, $wire_bank_number, $wire_bank_country, $wire_swift_branch, $wire_div_conatin_code, $paypal, $paypal_amount, $paypal_email, ppTabIndexWithdraw, mbTabIndexWithdraw;

function initWithdrawWireTab() {
	newSelectedCountryWithdrawWire($("#withdraw_wire_bank_country option:selected").data("Code"));
	$("#withdraw_wire_bank_country").change(function () {
		newSelectedCountryWithdrawWire($("#withdraw_wire_bank_country option:selected").data("Code"))
	})
}

function showOrRemoveIban(b) {
	if (b) {
		$("#withdraw_div_wire_iban_label").removeClass("display-none-class");
		$("#withdraw_wire_iban_div").removeClass("display-none-class")
	} else {
		$("#withdraw_div_wire_iban_label").addClass("display-none-class");
		$("#withdraw_wire_iban_div").addClass("display-none-class")
	}
}

function newSelectedCountryWithdrawWire(b) {
	$("#withdraw_bank_state").addClass("display-none-class");
	$("#withdraw_div_state").addClass("display-none-class");
	$("#withdraw_wire_swift_branch").removeClass("display-none-class");
	$("#withdraw_wire_bank_code2").removeClass("withdraw-wire-email-box");
	$("#withdraw_wire_bank_code2").addClass("withdraw-wire-bank-box");
	showOrRemoveIban(true);
	if (b === "IL" || b === "CA" || b === "AU") {
		$("#withdraw_div_wire_bank_code_box").addClass("display-none-class");
		$("#withdraw_div_wire_bank_code_text").addClass("display-none-class");
		$("#withdraw_div_wire_bank_number_box").removeClass("display-none-class");
		$("#withdraw_div_wire_bank_number_text").removeClass("display-none-class");
		if (b === "CA" || b === "AU") {
			showOrRemoveIban(false);
			$("#withdraw_bank_state").removeClass("display-none-class");
			$("#withdraw_div_state").removeClass("display-none-class");
			$wire_bank_state.find("option").remove();
			if (b === "CA") {
				$("<option >Alberta</option>").appendTo($wire_bank_state);
				$("<option >British Columbia</option>").appendTo($wire_bank_state);
				$("<option >Manitoba</option>").appendTo($wire_bank_state);
				$("<option >New Brunswick</option>").appendTo($wire_bank_state);
				$("<option >Newfoundland and Labrador</option>").appendTo($wire_bank_state);
				$("<option >Northwest Territories</option>").appendTo($wire_bank_state);
				$("<option >Nova Scotia</option>").appendTo($wire_bank_state);
				$("<option >Nunavut</option>").appendTo($wire_bank_state);
				$("<option >Ontario</option>").appendTo($wire_bank_state);
				$("<option >Prince Edward Island</option>").appendTo($wire_bank_state);
				$("<option>Quebec</option>").appendTo($wire_bank_state);
				$("<option >Saskatchewan</option>").appendTo($wire_bank_state);
				$("<option>Yukon</option>").appendTo($wire_bank_state)
			} else if (b === "AU") {
				$("<option>Australian Capital Territory</option>").appendTo($wire_bank_state);
				$("<option>New South Wales</option>").appendTo($wire_bank_state);
				$("<option>Northern Territory</option>").appendTo($wire_bank_state);
				$("<option>Queensland</option>").appendTo($wire_bank_state);
				$("<option>South Australia</option>").appendTo($wire_bank_state);
				$("<option>Tasmania</option>").appendTo($wire_bank_state);
				$("<option>Victoria</option>").appendTo($wire_bank_state);
				$("<option>Western Australia</option>").appendTo($wire_bank_state)
			}
		}
	} else {
		$("#withdraw_div_wire_bank_number_box").addClass("display-none-class");
		$("#withdraw_div_wire_bank_number_text").addClass("display-none-class");
		$("#withdraw_div_wire_bank_code_box").removeClass("display-none-class");
		$("#withdraw_div_wire_bank_code_text").removeClass("display-none-class");
		if (b === "GB") showOrRemoveIban($("#withdraw_wire_swift_branch").val() == "Swift");
		else {
			$("#withdraw_wire_swift_branch").addClass("display-none-class");
			$("#withdraw_wire_bank_code2").addClass("withdraw-wire-email-box");
			$("#withdraw_wire_bank_code2").removeClass("withdraw-wire-bank-box");
			if (b === "HK" || b === "MY" || b === "ZA" || b === "SG" || b === "MX" || b === "CL" || b === "OM") showOrRemoveIban(false)
		}
	}
}

function handleWithdrawImmCB(b) {
	CloseProcessingForm();
	var c = VerifyProperties(["SecuredResultCode"], b);
	if (c) ReportErrors(c);
	else {
		c = StringToESecuredServiceResult(b.SecuredResultCode);
		if (c == ESecuredServiceResult.Success) alertDialog(ALERT_TYPE.atInfo, LangJSDict.strWITHDRAW_SUCCESSFUL, false, function () {
			$withdraw.dialog("close")
		}, null);
		else {
			var d = null;
			if (c == ESecuredServiceResult.PhoneVerifyNeeded) d = function () {
				GlobalDs.CashierInfo.IsNeedPhoneVerificationBeforeWithdraw = true;
				runStartUpFlow(EStartUpPageState.SSLOpenWithWithdraw)
			};
			if (c == ESecuredServiceResult.SendDocsNeeded) d = function () {
				runStartUpFlow(EStartUpPageState.SSLOpenWithWithdrawTrustLevelUploadDocs)
			};
			alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" + b.SecuredResultCode], false, d, null)
		}
	}
}

function performMoneyBookersWithdraw() {
	var b = parseInt($mb_amount.val(), 10),
		c = $mb_email.val();
	b = new RealWithdrawMoneyBookers(b, c);
	OpenProcessingForm();
	SENDImm_realWithdrawMoneyBookersImm(b, handleWithdrawImmCB)
}

function performPayPalWithdraw() {
	var b = parseInt($paypal_amount.val(), 10),
		c = $paypal_email.val();
	b = new RealWithdrawPayPal(b, c);
	OpenProcessingForm();
	SENDImm_realWithdrawPayPalImm(b, handleWithdrawImmCB)
}

function performBankDraftWithdraw() {
	var b = parseInt($bank_draft_amount.val(), 10);
	b = new RealWithdrawBankDraft(b);
	OpenProcessingForm();
	SENDImm_realWithdrawBankDraftImm(b, handleWithdrawImmCB)
}

function performWireWithdraw() {
	var b = parseInt($wire_amount.val(), 10),
		c = $wire_bank_account_number.val(),
		d = $wire_bank_name.val(),
		e = $wire_IBAN.val(),
		f;
	f = $wire_bank_code.hasClass("display-none-class") ? $wire_bank_number.val() : $wire_bank_code.val();
	var h;
	h = $wire_div_conatin_code.hasClass("display-none-class") ? "Branch" : $wire_swift_branch.val();
	var g = $wire_bank_country.find("option:selected").data("Code");
	b = new RealWithdrawWire(c, d, f, e, h, g, "", b, "", "");
	OpenProcessingForm();
	SENDImm_realWithdrawWireImm(b, handleWithdrawImmCB)
}

function fundsWithdraw_SetDisplayedtabs() {
	var b = ["#withdraw_credit_cardLI", "#withdraw_paypalLI", "#withdraw_money_bookersLI", "#withdraw_wireLI"],
		c = [EPayMethodType.BankDraft, EPayMethodType.PayPal, EPayMethodType.MoneyBookers, EPayMethodType.Wire],
		d = $("#funds_withdraw_tabs").tabs("option", "active");
	d = d < 0 ? false : GlobalDs.CashierInfo.IsValidPayMethod(c[d], EPayMethodFunctionality.Withdraw);
	for (var e = 0; e < b.length; e++) {
		if (b[e] == "#withdraw_paypalLI") ppTabIndexWithdraw = e;
		else if (b[e] == "#withdraw_money_bookersLI") mbTabIndexWithdraw =
			e;
		if (GlobalDs.CashierInfo.IsValidPayMethod(c[e], EPayMethodFunctionality.Withdraw)) {
			$withdraw.find(b[e]).show();
			if (!d) {
				d = true;
				$("#funds_withdraw_tabs").tabs("option", "active", e)
			}
		} else $withdraw.find(b[e]).hide()
	}
}

function setCountryInWireWithdraw(b) {
	var c;
	if ($wire_bank_country.children().size() <= 1) {
		$wire_bank_country.append('<option value="-1"> </option>');
		c = -1;
		$(b).find("Country").each(function (d) {
			var e = $(this).attr("Code"),
				f = $(this).attr("Name");
			if (f == GlobalDs.PersonalInfo.Country) c = d;
			$('<option class="countrey-box-width" value="' + d + '">' + f + "</option>").appendTo($wire_bank_country).data("Code", e)
		})
	} else c = $wire_bank_country.val();
	$wire_bank_country.children("option[value=" + c + "]").prop("selected", true);
	initWithdrawWireTab();
	$withdraw.dialog("open")
}

function openFundsWithdraw() {
	if (GlobalDs.CashierInfo.NumOfPendingWithdrawals > 0) {
		$withdraw.dialog("close");
		openHistoryDialog(true, true)
	} else if (GlobalDs.CashierInfo.IsNeedPhoneVerificationBeforeWithdraw) {
		$withdraw.dialog("close");
		runStartUpFlow(EStartUpPageState.SSLOpenWithWithdraw)
	} else {
		fundsWithdraw_SetDisplayedtabs();
		$withdraw_symbol.text(GlobalDs.UserBaseCurrencySymbol);
		getCountriesXml(setCountryInWireWithdraw);
		$mb_email.val(GlobalDs.UserName);
		$paypal_email.val(GlobalDs.UserName);
		var b = GlobalDs.CashierInfo.LastSuccessfulPayMethodsInfo;
		if (b !== null) {
			for (var c = -1, d = false, e = 0; e < b.DepositItems.length; e++) {
				var f = GetPropDefault(b.DepositItems[e], "PayMethodType", null),
					h = b.DepositItems[e].AdditionalInfo;
				if (typeof h == "string" && checkEmailString(h))
					if (f == EPayMethodType.MoneyBookers && GlobalDs.CashierInfo.IsValidPayMethod(EPayMethodType.MoneyBookers, EPayMethodFunctionality.Withdraw)) {
						$mb_email.val(h);
						c = d ? c : mbTabIndexWithdraw;
						d = true
					} else if (f == EPayMethodType.PayPal && GlobalDs.CashierInfo.IsValidPayMethod(EPayMethodType.PayPal, EPayMethodFunctionality.Withdraw)) {
					$paypal_email.val(h);
					c = d ? c : ppTabIndexWithdraw;
					d = true
				}
			}
			c >= 0 && $("#funds_withdraw_tabs").tabs("option", "active", c)
		}
	}
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$withdraw = $("#withdraw_dialog");
		var b = $("#withdraw_bank_draft").find(".bank-draft-part3");
		$bank_draft_amount = $("#withdraw_bank_draft_amount");
		var c = $("#withdraw_money_bookers").find(".withdraw-mb-part3");
		$mb_amount = $("#withdraw_mb_amount");
		$mb_email = $("#withdraw_mb_email");
		var d = $([]).add($mb_amount).add($mb_email),
			e = $("#withdraw_wire");
		$wire_amount = $("#withdraw_wire_amount");
		$wire_bank_name = $("#withdraw_wire_bank_name");
		$wire_bank_account_number =
			$("#withdraw_wire_bank_account_nb");
		$wire_bank_number = $("#withdraw_wire_bank_number");
		$wire_swift_branch = $("#withdraw_wire_swift_branch");
		$wire_div_conatin_code = $("#withdraw_div_wire_bank_code_box");
		$wire_bank_code = $("#withdraw_wire_bank_code2");
		$wire_IBAN = $("#withdraw_wire_iban");
		$wire_bank_country = $("#withdraw_wire_bank_country");
		$wire_bank_state = $("#withdarw_bank_state_text");
		$paypal = $("#withdraw_PayPal").find(".withdraw-mb-part3");
		$paypal_amount = $("#withdraw_paypal_amount");
		$paypal_email = $("#withdraw_paypal_email");
		var f = $([]).add($paypal_amount).add($paypal_email);
		$withdraw_symbol = $withdraw.find(".withdraw-symbol");
		var h = $([]).add($wire_bank_account_number).add($wire_bank_country).add($wire_bank_code).add($wire_bank_name).add($wire_IBAN).add($wire_amount).add($wire_swift_branch).add($wire_bank_number),
			g = $([]).add($bank_draft_amount).add($mb_amount).add($wire_amount).add($paypal_amount),
			l = $([]).add(g).add($mb_email).add(h).add($paypal_email);
		$("#funds_withdraw_tabs").tabs({
			disabled: [4, 5],
			active: 0
		});
		$($withdraw).dialog({
			iphoneMaxWidth: 755,
			iphoneMaxHeight: 610,
			autoOpen: false,
			modal: true,
			resizable: false,
			selected: 0,
			width: GeneralUI.WithdrawWidth,
			height: GeneralUI.WithdrawHeight,
			open: function () {
				l.filter("[class!=dont-empty-on-open]").removeClass(GC.FIELD_ERR_CLASS)
			},
			close: function () {}
		});
		$("#withdraw_back_button").click(function () {
			$withdraw.dialog("close");
			return false
		});
		$("#button_test_area").find("#withdraw").click(function () {
			openFundsWithdraw();
			return false
		});
		g.ivsNumeric();
		e.find(".withdraw-submit-button").click(function () {
			h.removeClass(GC.FIELD_ERR_CLASS);
			var n = $wire_amount,
				m = true;
			if (m = checkLength($wire_amount, GC.WITHDRAW_AMOUNT_MIN_LENGTH, GC.MAX_LENGTH) && m) {
				m = isWithdrawAmountOk(n, EPayMethodType.Wire) && m;
				n = {
					show: m
				};
				m = checkLength($wire_bank_account_number, GC.WITHDRAW_WIRE_BANK_ACCOUNT_NUMBER_MIN_LENGTH, GC.MAX_LENGTH) && m;
				m = isTextValid($wire_bank_name, GC.WITHDRAW_WIRE_BANK_NAME_MIN_LENGTH, /^[\w|\s|\-|\.|\,|\'|\"|\/|\\]+$/, n) && m;
				m = checkLength($wire_bank_country, GC.WITHDRAW_WIRE_COUNTRY_MIN_LENGTH, GC.MAX_LENGTH) && m;
				var q;
				q = $wire_div_conatin_code.is(":visible") ?
					$wire_bank_code : $wire_bank_number;
				m = isTextValid(q, GC.WITHDRAW_WIRE_BANK_CODE_MIN_LENGTH, /^[a-zA-Z0-9]+$/, n) && m;
				if ($wire_IBAN.is(":visible")) m = isTextValid($wire_IBAN, GC.WITHDRAW_WIRE_BANK_NAME_MIN_LENGTH, /^[a-zA-Z][a-zA-Z][a-zA-Z0-9]*$/, n) && m
			}
			m && performWireWithdraw();
			return false
		});
		b.find(".withdraw-submit-button").click(function () {
			$bank_draft_amount.removeClass(GC.FIELD_ERR_CLASS);
			isWithdrawAmountOk($bank_draft_amount, EPayMethodType.BankDraft) && performBankDraftWithdraw();
			return false
		});
		c.find(".withdraw-submit-button").click(function () {
			d.removeClass(GC.FIELD_ERR_CLASS);
			var n = true;
			if (n = isWithdrawAmountOk($mb_amount, EPayMethodType.MoneyBookers) && n) n = checkEmail($mb_email) && n;
			n && performMoneyBookersWithdraw();
			return false
		});
		$paypal.find(".withdraw-submit-button").click(function () {
			f.removeClass(GC.FIELD_ERR_CLASS);
			var n = true;
			if (n = isWithdrawAmountOk($paypal_amount, EPayMethodType.PayPal) && n) n = checkEmail($paypal_email) && n;
			n && performPayPalWithdraw();
			return false
		});
		$wire_swift_branch.focusin(function () {
			$wire_swift_branch.children().filter(function () {
				return $(this).val().length <
					1
			}).remove()
		});
		$("#withdraw_wire_swift_branch").change(function () {
			$("#withdraw_wire_bank_country option:selected").data("Code") == "GB" && showOrRemoveIban($("#withdraw_wire_swift_branch").val() == "Swift")
		})
	}
});

function isTextValid(b, c, d, e) {
	if (c = checkLength(b, c, GC.MAX_LENGTH))
		if (!d.test(b.val())) {
			c = false;
			b.addClass(GC.FIELD_ERR_CLASS);
			if (e.show && !containsAllPrintableAscii(b.val())) {
				alertDialog(ALERT_TYPE.atError, LangJSDict.strENGLISH_LETTERS_ONLY, false, null, null);
				e.show = false
			}
		}
	return c
}

function containsAllPrintableAscii(b) {
	return /^[\u0020-\u007e]*$/.test(b)
}

function CheckWithdraw(b, c, d, e, f, h, g) {
	b.removeClass(GC.FIELD_ERR_CLASS);
	g && c.removeClass(GC.FIELD_ERR_CLASS);
	f = true;
	f = checkLength(b, d, e) && f;
	if (g && (h || c.val().length !== 0)) f = checkEmail(c) && f;
	return f
}

function isWithdrawAmountOk(b, c) {
	b.removeClass(GC.FIELD_ERR_CLASS);
	var d = GlobalDs.CashierInfo.GetPayMethod(c);
	c = d.MinWithdrawAmount;
	d = d.MaxWithdrawAmount;
	var e = GlobalDs.AccountValue.AvailableBalanceForCashout;
	if (e < d) d = e;
	e = true;
	var f = b.val();
	if (f.length < 1) e = false;
	else {
		f = parseInt(f, 10);
		if (f < c) {
			alertDialog(ALERT_TYPE.atError, LangJSDict.strMINIMUM_AMOUNT_MUST_BE_OVER + " " + GlobalDs.UserBaseCurrencySymbol + roundToPrecisionDigits(c, 2), false, null, null);
			e = false
		} else if (f > d) {
			alertDialog(ALERT_TYPE.atError, LangJSDict.strMAXIMUM_AMOUNT_MUST_BE_UNDER +
				" " + GlobalDs.UserBaseCurrencySymbol + roundToPrecisionDigits(d, 2), false, null, null);
			e = false
		}
	}
	e || b.addClass(GC.FIELD_ERR_CLASS);
	return e
}
var $details;

function startLoadingAnimGifDetails() {
	$("#details_container").addClass("display-none-class");
	$("#details_frame").addClass("loading")
}

function stopLoadingAnimGifDetails() {
	$("#details_frame").removeClass("loading");
	$("#details_container").removeClass("display-none-class")
}
var DetailsData = {
	InstrumentID: undefined,
	InstrumentName: undefined,
	InstrumentDescription: undefined,
	InstrumentType: undefined,
	AssetType: undefined,
	AtomicAmount: undefined,
	PremiumBuy: undefined,
	PremiumSell: undefined,
	PremiumTime: undefined,
	InitialMargin: undefined,
	MaintainanceMargin: undefined,
	ExpiresDaily: undefined,
	ExpiryDate: undefined,
	RelevantTradingInterval: {
		StartDateTime: undefined,
		EndDateTime: undefined
	}
};
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$details = $("#details_dialog");
		$details.dialog({
			iphoneMaxWidth: 510,
			iphoneMaxHeight: 275,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.DetailsWidth,
			minHeight: GeneralUI.DetailsHeight,
			height: GeneralUI.DetailsHeight,
			open: function () {
				$("#details_expiry_date_hour_part").removeClass("display-none-class")
			}
		});
		$("#button_test_area").find("#details").click(function () {
			$details.dialog("open");
			SENDImm_getInstrumentDetailsImm({
				InstrumentID: 2,
				ClientGMTOffsetMin: -(new Date).getTimezoneOffset()
			}, function () {});
			SENDImm_editPositionImm({
				InstrumentID: -1,
				PositionID: 3400
			}, function () {});
			return false
		});
		$details.find(".details-close").click(function () {
			$details.dialog("close");
			return false
		})
	}
});

function initDetailsDialog(b) {
	$("#details-description").text(b.InstrumentDescription);
	b.InstrumentType == "Forex" ? $("#details_amount_text").text(genericFormatMoneyAmount(b.AtomicAmount, b.AssetSymbol, true, false, false, false)) : $("#details_amount_text").text(roundToPrecisionDigits(b.AtomicAmount, 0) + " " + LangJSDict.AssetType[b.AssetType]);
	$("#details_prbuy").text(formatPercentCultured(b.PremiumBuy, GC.FRACTION_PERCENT_ACCURACY));
	$("#details_prsell").text(formatPercentCultured(b.PremiumSell, GC.FRACTION_PERCENT_ACCURACY));
	var c = stdFormatUTCToLocalDateTime(b.PremiumTime);
	$("#details_prtime").text(dateToDisplayOnlyTimeSt(c));
	c = "1:" + Math.round(100 / b.InitialMargin);
	$("#details_leverage").text(c);
	$("#details_initial_margin").text(formatPercentCultured(b.InitialMargin, 2));
	$("#details_maintenance_margin").text(formatPercentCultured(b.MaintainanceMargin, 2));
	b.ExpiresDaily === false ? $("#details_expires_daily").text(LangJSDict.strNO) : $("#details_expires_daily").text(b.ExpiresDaily);
	if (b.ExpiryDate == GC.NIL_DATEVALUE) {
		$("#details_expiry_date_day_part").text(LangJSDict.strNONE);
		$("#details_expiry_date_hour_part").addClass("display-none-class")
	} else {
		$("#details_expiry_date_hour_part").removeClass("display-none-class");
		c = stdFormatUTCToLocalDateTime(b.ExpiryDate);
		$("#details_expiry_date_hour_part").text(dateToDisplayOnlyTimeSt(c));
		$("#details_expiry_date_day_part").text(dateToDisplayOnlyDateSt(c))
	} if (b.RelevantTradingInterval === null) $("#details_trading_hours").text();
	else {
		var d = stdFormatUTCToLocalDateTime(b.RelevantTradingInterval.StartDateTime);
		c = d.getDay();
		c = convertDayIndexToDayInWeek(c);
		var e = d.getHours(),
			f = dateToDisplayOnlyTimeSt(d),
			h = stdFormatUTCToLocalDateTime(b.RelevantTradingInterval.EndDateTime);
		d = h.getDay();
		d = convertDayIndexToDayInWeek(d);
		var g = h.getHours();
		h = dateToDisplayOnlyTimeSt(h);
		if (c === d && e < g) {
			c = c + " " + f + " - " + h;
			e = ""
		} else {
			c = c + " " + f + "-";
			e = d + " " + h
		}
		$("#details_trading_hours_start_time").text(c);
		$("#details_trading_hours_end_time").text(e)
	} if (b.ExternalLinkURL !== null && b.ExternalLinkURL !== "") {
		$("#details_external_link").text(b.ExternalLinkTitle);
		$("#details_external_link").attr("href",
			b.ExternalLinkURL);
		$("#details_external_link").removeClass("display-none-class")
	} else $("#details_external_link").addClass("display-none-class");
	stopLoadingAnimGifDetails()
}

function ServerResponseDetailsDialogInfoImm(b, c) {
	var d = VerifyProperties(["InstrumentID", "InstrumentName", "InstrumentDescription", "InstrumentType", "AssetType", "AtomicAmount", "PremiumBuy", "PremiumSell", "PremiumTime", "AssetSymbol", "InitialMargin", "MaintainanceMargin", "ExpiresDaily", "ExpiryDate", "RelevantTradingInterval", "ExternalLinkURL", "ExternalLinkTitle"], b);
	d ? ReportErrors(d) : initDetailsDialog(b, c)
}

function OpenDetailsDialog(b, c) {
	startLoadingAnimGifDetails();
	$details.dialog("option", "title", b);
	$details.find(".details-header").text(b);
	$details.dialog("open");
	SENDImm_getInstrumentDetailsImm({
		InstrumentID: c,
		ClientGMTOffsetMin: -(new Date).getTimezoneOffset()
	}, function (d) {
		ServerResponseDetailsDialogInfoImm(d)
	})
}
var $bonus_account, bonusAccountEmptyHTML;

function startLoadingAnimGifBonusDialog() {
	$("#bonus_account_table_content").addClass("loading")
}

function stopLoadingAnimGifBonusDialog() {
	$("#bonus_account_table_content").removeClass("loading")
}
var UpdateBonusZebraRows = function () {
	$("#bonus_account_table_content > div").removeClass("main-tbl-content-even").not(".clear0").filter(":odd").addClass("main-tbl-content-even")
};
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$bonus_account = $("#bonus_account_dialog");
		$bonus_account.dialog({
			iphoneMaxWidth: 700,
			iphoneMaxHeight: 500,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.BonusAccountWidth
		});
		$("#bonus_back_button").click(function () {
			$bonus_account.dialog("close");
			return false
		});
		$("#button_test_area");
		$("#bonus_account").click(function () {
			$bonus_account.dialog("open");
			return false
		});
		bonusAccountEmptyHTML = $("#bonus_account_table_content").html()
	}
});

function openBonusDialog() {
	SENDImm_getBonusHistoryImm(new BonusHistory(dateToStdFormat(new Date(2E3, 0)), GC.NIL_DATEVALUE), function (b) {
		startLoadingAnimGifBonusDialog();
		$bonus_account.dialog("open");
		initBonusDialog(b)
	})
}

function initBonusDialog(b) {
	var c = VerifyProperties(["SecuredResultCode"], b);
	if (c) ReportErrors(c);
	else if (StringToESecuredServiceResult(b.SecuredResultCode) != ESecuredServiceResult.Success) {
		alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" + b.SecuredResultCode], false, null, null);
		$bonus_account.dialog("close")
	} else if (c = VerifyProperties(["Transactions"], b)) ReportErrors(c);
	else {
		b = b.Transactions;
		$("#bonus_account_table_content").html("");
		if (b === null || b.length === 0) {
			stopLoadingAnimGifBonusDialog();
			$("#bonus_account_table_content").html(bonusAccountEmptyHTML)
		} else if (c =
			VerifyProperties(["Status", "BonusEvent", "BonusType", "RequiredVolume", "ActualVolume", "Date", "ExpirationDate"], b[0])) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c) {
				var e = b[c],
					f = e.Status;
				if (StringToEBonusTrnsStatus(f) === EBonusTrnsStatus.BtsRequested) f = LangJSDict.strCASHIER_TRADER_POINTS + " " + Math.round(parseInt(e.ActualVolume, 10)) + "/" + Math.round(parseInt(e.RequiredVolume, 10));
				e = {
					trans: e.TransactionID,
					type: LangJSDict["strCASHIER_" + e.BonusEvent],
					cashFlow: LangJSDict["strCASHIER_" + e.BonusType],
					status: f,
					amount: GlobalDs.formatMoneyAmount(e.Amount, true),
					date: dateToDateOnlyString(stdFormatToDate(e.Date))
				};
				$("#bonus_row_template").jqote(e)[0].appendTo($("#bonus_account_table_content"))
			}
			UpdateBonusZebraRows();
			stopLoadingAnimGifBonusDialog()
		}
	}
}
var $account_history, $history_date_from, $history_date_to, accountHistoryEmptyHTML, ranInitOnAccountTransactionsSummaryBehaviors = false,
	initAccountTransactionsSummaryBehaviorsParams = null;

function startLoadingAnimGifHistoryDialog() {
	$("#account_history_table_p2").addClass("loading")
}

function stopLoadingAnimGifHistoryDialog() {
	$("#account_history_table_p2").removeClass("loading")
}
var UpdateHistoryZebraRows = function () {
	$("#account_history_table_p2 > div").removeClass("main-tbl-content-even").not(".clear0").filter(":odd").addClass("main-tbl-content-even")
};

function initIfNeededAccountTransactionsSummaryBehaviors() {
	if (!ranInitOnAccountTransactionsSummaryBehaviors)
		if (getDisplayPageType() === EPageType.Trade) {
			$account_history = $("#account_history_dialog");
			$history_date_from = $("#history_datepicker_from");
			$history_date_to = $("#history_datepicker_to");
			accountHistoryEmptyHTML = $("#account_history_table_p2").html();
			$("#account_history_table_p2 > div").addClass("display-none-class");
			$account_history.dialog({
				iphoneMaxWidth: 700,
				iphoneMaxHeight: 500,
				autoOpen: false,
				modal: true,
				width: GeneralUI.AccountHistoryWidth,
				minHeight: GeneralUI.AccountHistoryHeight,
				zIndex: 1E3,
				resizable: false,
				close: function () {
					$history_date_from.datepicker("hide");
					$history_date_to.datepicker("hide")
				}
			});
			$history_date_from.datepicker({
				showOn: "button",
				buttonImage: "../Content/Images/calendar.gif",
				buttonImageOnly: true
			});
			$history_date_to.datepicker({
				showOn: "button",
				buttonImage: "../Content/Images/calendar.gif",
				buttonImageOnly: true
			});
			$("#ui-datepicker-div").css("display", "none");
			setHistoryDefaultDateValues();
			$account_history.find("#history_back_button").click(function () {
				$account_history.dialog("close");
				return false
			});
			$("#button_test_area").find("#account_history").click(function () {
				$account_history.dialog("open");
				return false
			});
			$history_date_from.click(function () {
				$history_date_from.datepicker("show");
				return false
			});
			$history_date_to.click(function () {
				$history_date_to.datepicker("show");
				return false
			});
			$("#account_history_submit").click(function () {
				$("#history_datepicker_from").datepicker("getDate") > $("#history_datepicker_to").datepicker("getDate") ?
					alertDialog(ALERT_TYPE.atInfo, "The first date is later then the second one. Please correct it.  ", false, null, null) : submitMonetaryHistory();
				return false
			});
			startLoadingAnimGifHistoryDialog();
			$account_history.dialog("open");
			ranInitOnAccountTransactionsSummaryBehaviors = true
		}
}
$(document).ready(function () {
	getDisplayPageType()
});

function submitMonetaryHistory(b, c) {
	var d = $("#history_datepicker_from").datepicker("getDate"),
		e = new Date($("#history_datepicker_to").datepicker("getDate").getTime() + GC.SEC_IN_24_HOURS * 1E3);
	SENDImm_getCashierHistoryImm(new CashierHistory(dateToStdFormat(d), dateToStdFormat(e)), function (f) {
		initHistoryDialog(f, b, c)
	})
}

function openHistoryDialog(b, c) {
	initIfNeededAccountTransactionsSummaryBehaviors();
	b && setHistoryDefaultDateValues();
	submitMonetaryHistory(b, c)
}

function cancelWithdrawClicked() {
	var b = parseInt($(this).parents(".bonus_height").children(".bonus-trans-content").text(), 10);
	OpenProcessingForm();
	var c = $(this).parents(".bonus-status-content");
	SENDImm_cancelWithdrawImm(new CancelWithdraw(b), function (d) {
		CloseProcessingForm();
		StringToESecuredServiceResult(d.SecuredResultCode) == ESecuredServiceResult.Success ? c.html(LangJSDict.strCASHIER_Cancelled) : alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" + d.SecuredResultCode], false, null, null)
	});
	return false
}

function initHistoryDialog(b, c, d) {
	startLoadingAnimGifHistoryDialog();
	$account_history.dialog("open");
	var e = VerifyProperties(["SecuredResultCode"], b);
	if (e) ReportErrors(e);
	else if (StringToESecuredServiceResult(b.SecuredResultCode) != ESecuredServiceResult.Success) {
		alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" + b.SecuredResultCode], false, null, null);
		$account_history.dialog("close")
	} else if (e = VerifyProperties(["Transactions"], b)) ReportErrors(e);
	else {
		b = b.Transactions;
		$("#account_history_table_p2").html("");
		if (b === null || b.length === 0) {
			stopLoadingAnimGifHistoryDialog();
			$("#account_history_table_p2").html(accountHistoryEmptyHTML)
		} else if (e = VerifyProperties(["TransactionID", "Amount", "Date"], b[0])) ReportErrors(e);
		else {
			e = 0;
			for (var f = b.length; e < f; ++e) {
				var h = b[e],
					g = "";
				if ("Status" in h) g = h.Status;
				var l = GlobalDs.formatMoneyAmount(h.Amount, true);
				g = StringToEWCTransactionType(h.TransactionType) === EWCTransactionType.Withdraw ? StringToEWithdrawTrnsStatus(g) === EWithdrawTrnsStatus.WtsRequested ? " " : LangJSDict["strCASHIER_" +
					EWithdrawTrnsStatusToShortString(StringToEWithdrawTrnsStatus(h.Status))] : StringToEWCTransactionType(h.TransactionType) === EWCTransactionType.Bonus ? StringToEBonusTrnsStatus(g) === EBonusTrnsStatus.BtsRequested ? LangJSDict.strCASHIER_TRADER_POINTS + " " + Math.round(parseInt(h.ActualVolume, 10)) + "/" + Math.round(parseInt(h.RequiredVolume, 10)) : LangJSDict["strCASHIER_" + EBonusTrnsStatusToShortString(StringToEBonusTrnsStatus(h.Status))] : StringToEWCTransactionType(h.TransactionType) === EWCTransactionType.Deposit ? LangJSDict["strCASHIER_" +
					EDepositTrnsStatusToShortString(StringToEDepositTrnsStatus(h.Status))] : StringToEWCTransactionType(h.TransactionType) === EWCTransactionType.Adjustment ? LangJSDict.strCASHIER_Approved : "Unknown";
				var n;
				n = StringToEWCTransactionType(h.TransactionType) === EWCTransactionType.Bonus ? LangJSDict.strCASHIER_BONUS : StringToEWCTransactionType(h.TransactionType) === EWCTransactionType.Adjustment ? LangJSDict["strCASHIER_" + h.AdjustmentType] : LangJSDict["strCASHIER_" + h.PayMethodType];
				h = {
					trans: h.TransactionID,
					type: n,
					cashFlow: StringToEWCTransactionType(h.TransactionType) === EWCTransactionType.Bonus ? LangJSDict["strCASHIER_" + h.BonusType] : LangJSDict["strCASHIER_" + h.TransactionType.toUpperCase()],
					status: g,
					amount: l,
					date: dateToDateOnlyString(stdFormatToDate(h.Date))
				};
				$("#bonus_row_template").jqote(h)[0].appendTo($("#account_history_table_p2"));
				h.status === " " && $('<div id="history_cancel_withdraw" class="float"> <a id="history_cnacel" class=" float std-button" href="#"> <span id="history_cancel_text">' + LangJSDict.strHISTORY_CASHIER_CANCELWITHDRAW_BTN_CAPTION + "</span> </a> </div>").appendTo($("#bonus" +
					h.trans).children(":eq(3)")).children("a").click(cancelWithdrawClicked)
			}
			UpdateHistoryZebraRows();
			stopLoadingAnimGifHistoryDialog();
			if (c) d ? alertDialog(ALERT_TYPE.atInfo, LangJSDict.strTOO_MANY_PENDING_WITHDRAWALS, false, null, null) : alertDialog(ALERT_TYPE.atInfo, LangJSDict.strDO_NOT_DEPOSIT_WITH_PENDING_WITHDRAWAL, false, null, null)
		}
	}
}

function setHistoryDefaultDateValues() {
	$history_date_from.datepicker("setDate", new Date("01/1/2008"));
	$history_date_to.datepicker("setDate", new Date)
}
var $main_tab_CB, hide_tabs_class = "main_tab_invisible",
	visibleChart = null;

function main_current_tab_changed() {
	$("#header_main_tabs li").unbind("mouseenter mouseleave").removeClass("li_header_not_current_tab_hover");
	$("#header_main_tabs li.header_not_current_tab").hover(function () {
		$(this).addClass("li_header_not_current_tab_hover")
	}, function () {
		$(this).removeClass("li_header_not_current_tab_hover")
	});
	$("#header_main_tabs").trigger(GC.TAB_CHANGED)
}

function main_current_tab_clicked() {
	if ($(this).hasClass("header_current_tab")) return false;
	$("#header_main_tabs .header_current_tab").removeClass("header_current_tab").addClass("header_not_current_tab");
	$(this).removeClass("header_not_current_tab").addClass("header_current_tab");
	main_current_tab_changed();
	change_tab_visibility();
	return false
}

function chartStartVisibility(b) {
	b = getChart(b);
	if (b !== null) {
		b.stopGraphLoadingAnimGif();
		b.resumeUpdatingFlash();
		visibleChart = b
	}
}

function stopVisibleChartUpdatingFlash() {
	visibleChart !== null && visibleChart.stopUpdatingFlash()
}

function change_tab_visibility() {
	if (!loggedOut) {
		if (visibleChart !== null) {
			visibleChart.startGraphLoadingAnimGif();
			visibleChart.stopUpdatingFlash()
		}
		$("#li_cpositions").hasClass("header_current_tab") && initIfNeededCPositionsTable();
		$(".main-tab").addClass(hide_tabs_class);
		if ($("#li_opositions").hasClass("header_current_tab")) {
			$("#main_opositions_tbl").removeClass(hide_tabs_class);
			$("#main_opositions_tbl").removeClass("display-none-class");
			alignOPositionsDivRightIfNeeded();
			chartStartVisibility("main_opositions")
		} else if ($("#li_orders").hasClass("header_current_tab")) {
			$("#main_orders_tbl").removeClass(hide_tabs_class);
			$("#main_orders_tbl").removeClass("display-none-class");
			alignOrdersDivRightIfNeeded();
			chartStartVisibility("main_orders")
		} else if ($("#li_cpositions").hasClass("header_current_tab")) {
			$("#main_cpositions_tbl").removeClass(hide_tabs_class);
			$("#main_cpositions_tbl").removeClass("display-none-class")
		} else {
			$("#main_instruments_tbl").removeClass(hide_tabs_class);
			$("#main_trade_categories").removeClass(hide_tabs_class);
			chartStartVisibility("main_instruments")
		}
	}
}
var userHasRequestedLogout = false;

function StartedLogOutPhase() {
	StopCometRequest();
	userHasRequestedLogout = true
}

function resizeTable() {
	for (var b = ($("#main_instruments_tbl_p2_wrapper").width() - 725) / 9, c, d = [90, 80, 55, 80, 55, 83, 108, 86], e = [".tbl-instrumnet-cell", ".tbl-sell-cell", ".tbl-sell-btn-cell", ".tbl-buy-cell", ".tbl-buy-btn-cell", ".tbl-change-cell", ".tbl-highlow-cell", ".tbl-details-cell"], f = 0; f < e.length; ++f) {
		c = d[f];
		$(e[f]).width(c + b)
	}
	b = ($("#main_opositions_tbl_p1").width() - 1071) / 10;
	d = [100, 100, 90, 120, 90, 110, 110, 115, 130, 90];
	e = [".oposition-outer-name-id-header", ".outer-type-amount-header", ".outer-netpl-header",
		".outer-close-edit-header", ".outer-limit-stop-header", ".outer-opening-value-current-value-header", ".outer-premiumpl-header", ".outer-in-margin-m-margin-header", ".outer-open-time-header"
	];
	for (f = 0; f < e.length; ++f) {
		c = d[f];
		$(e[f]).width(c + b)
	}
	b = ($("#main_orders_tbl_p1").width() - 929) / 8;
	d = [100, 110, 134, 110, 130, 100, 139, 100];
	e = [".orders-outer-name-id-header", ".outer-orders-type-amount-header", ".outer-status-value-header", ".outer-cancel-edit-header", ".float outer-orders-limit-stop-header", ".outer-order-rate-current-rate-header",
		".outer-open-until-header"
	];
	for (f = 0; f < e.length; ++f) {
		c = d[f];
		$(e[f]).width(c + b)
	}
	b = ($("#main_cpositions_tbl_p1").width() - 1065) / 9;
	b = Math.max(b, 0);
	d = [100, 100, 90, 100, 130, 115, 110, 160, 120];
	e = [".cposition-outer-id-header", ".cposition-outer-type-amount-header", ".cposition-outer-netpl-header", ".cposition-outer-netpl-header", ".cposition-outer-open-close-rate-header", ".cposition-outer-value-header", ".cposition-outer-premiumpl-header", ".cposition-outer-close-reason-header", ".cposition-outer-open-time-header", ".cposition-outer-close-time-header"];
	for (f = 0; f < e.length; ++f) {
		c = d[f];
		$(e[f]).width(c + b)
	}
}

function resizeWindow() {
	var b = $(window).width(),
		c = 0.95 * $(window).height() - $("#HeaderLogo").height() - $("#header_main_tabs").height();
	b = Math.max(0.9 * b, 975);
	$("#mainBox").width(b);
	c = c - 33 - $("#search_instruments").height() - $("#main_trade_categories_funds_area").height() - $("#main_trade_categories_p3").height();
	var d = b - $("#main_trade_categories").width();
	d = Math.max(d, 725);
	$("#div_header").width(d);
	$("#main_instruments_tbl_p1").width(d - 30);
	$("#main_instruments_tbl_p2_wrapper").width(d - 15);
	$("#main_instruments_graph_tools").width(d -
		15);
	$("#main_instruments_graph_container").width(d - 15);
	$("#main_instruments_graph_over").width(d - 15 - 7);
	$("#main_instruments_tbl_p3").width(d);
	c = Math.max(c, 301);
	$("#main_trade_categories_p2").height(c);
	c = $("#search_instruments").height() + $("#main_trade_categories_funds_area").height() + $("#main_trade_categories_p3").height() + $("#main_trade_categories_p2").height() + 33;
	d = c - $("#main_instruments_tbl_p1").height() - $("#main_instruments_tbl_p2_wrapper").height() - $("#main_instruments_graph_tools").height() -
		$("#main_instruments_tbl_p3").height();
	d = Math.max(d, 276);
	$("#main_instruments_graph_container").height(d);
	$("#main_instruments_graph_over").height(d - $("#main_instruments_graph_title").height());
	$("#main_instruments_graph_flash").height($("#main_instruments_graph_over").height());
	$(".opositions-image-header").width(b);
	$("#inner_main_opositions_tbl").width(b - 30);
	$("#main_opositions_tbl_p3").width(b);
	$("#main_opositions_graph_over").width(b - 40);
	d = Math.max(b - 46.6, 1071);
	$("#main_opositions_tbl_p1").width(d);
	$("#main_opositions_tbl_p2").width(d);
	$(".opositions-tbl-content").width(d);
	d = c - $(".opositions-image-header").height() - $("#main_opositions_tbl_wrapper").height() - $("#main_opositions_graph_tools").height() - $("#main_opositions_tbl_p3").height();
	$("#main_opositions_graph_container").height(d);
	$("#main_opositions_graph_over").height(d - 15);
	$("#main_orders_tbl_content_and_header").width(b - 30);
	$("#main_orders_tbl_p3").width(b);
	$("#main_orders_graph_over").width(b - 40);
	d = Math.max(b - 47, 929);
	$("#main_orders_tbl_p1").width(d);
	$("#main_orders_tbl_p2").width(d);
	$(".orders-tbl-content").width(d);
	d = c - $(".opositions-image-header").height() - $("#main_orders_tbl_wrapper").height() - $("#main_orders_graph_tools").height() - $("#main_orders_tbl_p3").height();
	$("#main_orders_graph_container").height(d);
	$("#main_orders_graph_over").height(d - 15);
	$("#date_part").width(b - 30);
	$(".main_cpositions_tbl").width(b - 30);
	$("#main_cpositions_tbl_p3").width(b);
	$("#main_cpositions_tbl_p1").width(Math.max(b - 30, 1065));
	$("#main_cpositions_tbl_p2").width(Math.max(b -
		30, 1065));
	b = c - $(".opositions-image-header").height() - $("#date_part").height() - $("#main_cpositions_tbl_p3").height();
	$("#main_cpositions_tbl_p2").height(Math.max(b, 289));
	$(".main_cpositions_tbl").height(Math.max(b, 481));
	resizeTable()
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$main_tab_CB = $("#main-tabs-show-only");
		if (android) hide_tabs_class = "display-none-class";
		$("#header_main_tabs li:not(.header_current_tab)").addClass("header_not_current_tab");
		$("#header_main_tabs li").click(main_current_tab_clicked);
		main_current_tab_changed();
		change_tab_visibility();
		readApplicationStateCookies();
		$main_tab_CB.click(function () {
			if ($main_tab_CB.is(":checked")) {
				$("#main_orders_tbl_p2").children(".not-alive-order").addClass("display-none-class");
				updateOrdersChartIfOrderNotVisible()
			} else {
				if (GlobalDs.DSHasOnlyLiveOrders !== false) {
					OpenProcessingForm();
					SEND_getActiveOrders({
						IsOnlyLiveOrders: false
					});
					return
				}
				var b = null,
					c = $("#main_orders_tbl_p2").children(".not-alive-order");
				$.each(c, function () {
					var d = readOrderTableCurrentRate($(this));
					$(this).find(".current-rate-content").text(d);
					if (b === null) b = $(this)
				});
				c.removeClass("display-none-class");
				$("#main_orders_tbl_p2").find(".instrument-selected").length === 0 && b !== null && updateOrdersChartIfNeeded(readOrderTableInstrumentID(b),
					readOrderTableOrderID(b))
			}
			ordersUpdateZebraRows()
		})
	}
});

function isSecure() {
	return window.location.protocol.toLowerCase() == "https:"
}

function getBonusValuesFromServerAndSetBonusLinkText() {
	createBonusLinkText()
}

function createBonusLinkText() {
	var b = [{
		Type: EBonusEvent.PhotoIDApproved,
		Msg: "strCOMPLETE_YOUR_ACCOUNT_REGISTRATION_AND_GET_BONUS",
		Fields: ["BonusAmountInUBC"],
		StartUpPageState: EStartUpPageState.SSLFundsManagementAllRequirements
	}, {
		Type: EBonusEvent.PhoneApproved,
		Msg: "strVERIFY_YOUR_PHONE_AND_GET_BONUS",
		Fields: ["BonusAmountInUBC"],
		StartUpPageState: EStartUpPageState.PhoneVer
	}, {
		Type: EBonusEvent.InitialDeposit,
		Msg: "strFUND_YOUR_ACCOUNT_AND_GET_BONUS",
		Fields: ["MinDepositAmountInUBC", "BonusAmountInUBC"],
		StartUpPageState: EStartUpPageState.SSLOpenWithDepositWithBonus
	}],
		c = ApplicationState.readBonus();
	if (c !== null && c.BonusEventType == EBonusEvent.OngoingDeposit) return true;
	GlobalDs.ShowedBonus = null;
	for (var d = 0; d < b.length; d++) {
		var e = b[d],
			f = $.grep(GlobalDs.Bonuses, function (g) {
				return g.BonusEventType == e.Type
			}),
			h = false;
		if (!VerifyProperties(["BonusEventType", "BonusCode"], c, true) && c.BonusEventType == e.Type) h = true;
		if (h && c.BonusCode !== null) f = $.grep(f, function (g) {
			return g.BonusCode !== null && g.BonusCode == c.BonusCode
		});
		if (f.length !== 0) {
			b = f[Math.floor(Math.random() * f.length)];
			GlobalDs.ShowedBonus =
				b;
			d = LangJSDict[e.Msg];
			for (f = 0; f < e.Fields.length; f++) d = d.replace("%s", GlobalDs.formatMoneyAmount(b[e.Fields[f]], true, true));
			ApplicationState.writeBonus(b);
			$bonusLink.text(d);
			$bonusLink.data("StartUpPageState", e.StartUpPageState);
			$("#main_lobby_bonus_link").removeClass("display-none-class");
			break
		}
	}
	return true
}

function processAvailableBonuses() {
	getBonusValuesFromServerAndSetBonusLinkText()
}
var chartLiveFeedsDebug = 0,
	chartTimersDebug = {}, currentGraphInstrument = null,
	currentGraphPos = null,
	currentGraphOrder = null,
	$main_instrument_tbl;

function setInstrumnetEnabling(b, c, d, e, f, h) {
	var g = $("#trade_i" + c),
		l = g.data("Node"),
		n = l.isLive && l.isTraded,
		m = l.InstrumentStatus == EInstrumentStatus.TotallyFreezed,
		q = n || !l.isTraded && l.InstrumentStatus == EInstrumentStatus.Available;
	if (b === EInstrumentStatusChangeType.Initialize || b === EInstrumentStatusChangeType.InstrumentUpdate) {
		l.isLive = d;
		l.isTraded = e;
		l.InstrumentStatus = f;
		l.DisallowCharts = h
	}
	if (hasFlash && currentGraphInstrument == c && h) {
		$("#main_instruments_graph_title").text("");
		$("#main_instruments_graph_over").css("visibility",
			"hidden");
		currentGraphInstrument = null
	} else if (b === EInstrumentStatusChangeType.FeedReceive) l.isLive = true;
	f = (d = l.isLive && l.isTraded) || !e && f == EInstrumentStatus.Available;
	h = l.InstrumentStatus == EInstrumentStatus.TotallyFreezed;
	if (b === EInstrumentStatusChangeType.Initialize || n != d || q != f || m != h) enableGuiLine(c);
	b = l.PrecisionDigit;
	n = getPipValue(b);
	m = l.SpreadPipsCount;
	c = l.high + m * n;
	n = l.low - m * n;
	g.children(":eq(7)").text(getHighLowString(c, n, b, false, e));
	l.DisallowCharts && g.find(".high-low-content,.change-content,.buy-sell-content").text("-")
}

function enableGuiLine(b) {
	b = $("#container_i" + b);
	var c = b.children(":first"),
		d = c.data("Node"),
		e = d.isLive && d.isTraded,
		f = e || !d.isTraded && d.InstrumentStatus == EInstrumentStatus.Available;
	if (e) {
		b.find(".small-tbl-button").filter(".sp_close_positon_btn").removeClass("small-tbl-button-disabled");
		c.children(":eq(1)").removeClass("instrument-is-not-trade");
		c.children(":eq(2)").removeClass("instrument-is-not-trade");
		c.children(":eq(4)").removeClass("instrument-is-not-trade");
		c.children(":eq(7)").removeClass("instrument-is-not-trade")
	} else {
		b.find(".small-tbl-button").filter(".sp_close_positon_btn").addClass("small-tbl-button-disabled");
		c.children(":eq(1)").addClass("instrument-is-not-trade");
		c.children(":eq(2)").addClass("instrument-is-not-trade");
		c.children(":eq(4)").addClass("instrument-is-not-trade");
		c.children(":eq(7)").addClass("instrument-is-not-trade")
	}
	f ? b.find(".tbl-button").removeClass("tbl-button-disabled") : b.find(".tbl-button").addClass("tbl-button-disabled");
	d.IsShortEnabled || c.children(":eq(3)").children(":first").addClass("tbl-button-disabled");
	if (d.InstrumentStatus == EInstrumentStatus.TotallyFreezed) {
		b.find(".pl-sub-content").text("-");
		b.find(".amount-sub-content").addClass("display-none-class");
		b.find(".rate-sub-content").text("-");
		b.find(".amount-sub-order-content").addClass("display-none-class")
	}
}

function updateInstrumentsFavoritesGUI(b, c) {
	$("#main_instruments_tbl_p2").find(".instrument-favorite").removeClass("instrument-favorite-selected");
	$.each(b, function (f, h) {
		$("#container_i" + h).find(".instrument-favorite").addClass("instrument-favorite-selected")
	});
	if ($("#" + favoritesCategory).hasClass("sub_category_menu_item_selected") && c && gotFavorites) {
		c = $("#main_instruments_tbl_p2").children();
		for (var d = 0; d < c.length; d++)
			if ($(c[d]).attr("id").length !== 0) {
				var e = parseInt(getInstrumentID($(c[d]).attr("id"),
					"_i"), 10);
				if ($.inArray(e, b) == -1) {
					if (hasFlash && (currentGraphInstrument === null || e == currentGraphInstrument))
						if (b.length > 0) updateMainInstrumentsChartIfNeeded(b[0], 0, 0);
						else {
							$("#main_instruments_graph_title").text("");
							$("#main_instruments_graph_over").css("visibility", "hidden")
						}
					$(c[d]).fadeOut("300", function () {
						$(this).remove()
					})
				}
			}
		c.length === 0 && changedCategory && alertDialog(ALERT_TYPE.atInfo, LangJSDict.WEB_strFAVORITES_EXPLAINED, false, null, null)
	}
}

function updateRateAlertsGUI(b) {
	$("#main_instruments_tbl_p2").find(".instrument-alert").removeClass("instrument-alert-selected");
	$.each(b, function (c, d) {
		StringToERateAlertStatus(d.Status) == ERateAlertStatus.Pending && $("#container_i" + d.InstrumentID).find(".instrument-alert").addClass("instrument-alert-selected")
	})
}

function startLoadingAnimGif() {
	$("#main_instruments_tbl_p2").empty();
	$("#main_instruments_tbl_p2_wrapper").addClass("loading")
}

function stopLoadingAnimGif() {
	$("#main_instruments_tbl_p2_wrapper").removeClass("loading")
}

function favoritesUpdateTimerFunc() {
	favoritesUpdateTimer = null;
	favoritesPendingUpdateResponse = true;
	SEND_updateFavoritesInstruments(new UpdateFavoritesInstruments(favoritesInstruments, LastUpdateFavoriteInstrumentsSequenceNumber))
}

function updateMainInstrumentsChartIfNeeded(b, c, d) {
	var e = getChart("main_instruments");
	e && e.updateChartIfNeeded(b, c, d)
}

function updateMainInstrumentsChart(b, c, d, e) {
	var f = $("#container_i" + c),
		h = $("#trade_i" + c);
	if (!readInstrumentDisallowCharts(h)) {
		h = f.find(".instrument-name-content").text();
		var g = false;
		f = f.children().first();
		var l;
		if (typeof d != "undefined" && d !== null && d !== 0) {
			f = l = $("#sub_p" + d);
			l = readSubInstrumentTypeFromRow(l);
			if (l != EOpType.Buy) g = true
		}
		if (typeof e != "undefined" && e !== null && e !== 0) {
			f = l = $("#sub_o" + e);
			l = readSubInstrumentTypeFromRow(l);
			if (l == EOpType.Buy) g = true
		}
		l = parseInt($("#main_instruments_graph_tools_resolution").val(),
			10);
		$("#main_instruments_tbl_p2").find(".instrument-selected").removeClass("instrument-selected");
		f.addClass("instrument-selected");
		scrollIntoView(f, $("#main_instruments_tbl_p2_wrapper"));
		$("#main_instruments_graph_over").css("visibility", "");
		currentGraphPos = d;
		currentGraphOrder = e;
		if (l == b.currentGraphRes && currentGraphInstrument == c) b.ReloadChartOffsetIfNeeded(g);
		else {
			$.cookie(appCookies.LastInstrument, null, {
				path: "/Trade"
			});
			$.cookie(appCookies.LastInstrument, c, {
				expires: 3650,
				path: "/"
			});
			currentGraphInstrument =
				null;
			b.getNewChartData(c, h, g)
		}
	}
}

function startMainInstrumentsChartWithNewData(b, c) {
	var d = getChart("main_instruments");
	if (d) {
		var e = $("#trade_i" + b.InstrumentID);
		if (e.length !== 0) {
			e = e.find(".instrument-name-content").text();
			currentGraphInstrument = b.InstrumentID;
			c ? d.startChart(b, e) : d.startTickChart(b, e)
		}
	}
}
var inFavoritesSortMode = false;
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$main_instrument_tbl = $("#main_instruments_tbl_p2");
		$main_instrument_tbl.sortable({
			handle: ".instrument-favroites-handle",
			update: function () {
				$("#main_instruments_tbl_p2").children().removeClass("main-tbl-content-even");
				$("#main_instruments_tbl_p2 > div:nth-child(even)").addClass("main-tbl-content-even");
				var b = [];
				$("#main_instruments_tbl_p2").children().each(function () {
					var c = $(this);
					c = parseInt(getInstrumentID(c.attr("id"), "_i"), 10);
					b.push(c)
				});
				favoritesInstruments = $.map(b, function (c) {
					return $.inArray(c, favoritesInstruments) < 0 ? null : c
				});
				LastUpdateFavoriteInstrumentsSequenceNumber += 1;
				favoritesUpdateTimer !== null && clearTimeout(favoritesUpdateTimer);
				favoritesUpdateTimer = setTimeout(favoritesUpdateTimerFunc, 1E3);
				inFavoritesSortMode = false
			},
			start: function () {
				inFavoritesSortMode = true
			}
		});
		$main_instrument_tbl.click(function (b) {
			var c, d, e;
			if (IsBtnDisabled($(b.target)) || IsBtnDisabled($(b.target).parent())) return false;
			if ($(b.target).parent().is(".trade-buy-btn") ||
				$(b.target).is(".trade-buy-btn")) c = EOpType.Buy;
			else if ($(b.target).parent().is(".trade-sell-btn") || $(b.target).is(".trade-sell-btn")) c = EOpType.Sell;
			else return false;
			b = $(b.target).parents("div:eq(1)");
			var f = readInstrumentIsTraded(b);
			d = getInstrumentID(b.attr("id"), "_i");
			e = b.find(".instrument-name-content").text();
			b = $("#container_i" + d).children(".sub_position");
			var h = $.grep(b, function (l) {
				return readSubInstrumentTypeFromRow($(l)) == EOpType.Buy
			}),
				g = function (l) {
					l && $.cookie(appCookies.ConfirmShortDoesntCloseLongPos,
						"confirm", {
							expires: 3650,
							path: "/"
						})
				};
			c == EOpType.Sell && h.length == b.length && b.length > 0 && $.cookie(appCookies.ConfirmShortDoesntCloseLongPos) != "confirm" ? alertDialog(ALERT_TYPE.atConfirmation, LangJSDict.strCONFIRM_SELL, false, function (l) {
				g(l);
				OpenBuySellDialog(d, null, f ? EMainModeType.New : EMainModeType.NewOrderOnly, c, e)
			}, g, LangJSDict.strDONT_SHOW_THIS_AGAIN) : OpenBuySellDialog(d, null, f ? EMainModeType.New : EMainModeType.NewOrderOnly, c, e);
			return false
		});
		$main_instrument_tbl.click(function (b) {
			if ($(b.target).is(".sp_edit_position_link")) {
				var c =
					$(b.target).parents(".sub-tbl-content");
				if (c.length === 0) return false;
				c = readSubInstrumentIDFromRow(c);
				var d = $(b.target).parents(".instruments-tbl-content");
				d = getInstrumentID(d.attr("id"), "_i");
				b = $(b.target).parents(".instruments-tbl-content").children(":first").children(":first").text();
				OpenBuySellDialog(d, c, EMainModeType.EditPositon, null, b)
			}
			return false
		});
		$main_instrument_tbl.click(function (b) {
			if ($(b.target).is(".sub-order-edit")) {
				var c = $(b.target).parents(".sub-tbl-content");
				if (c.length === 0) return false;
				c = readSubInstrumentIDFromRow(c);
				var d = $(b.target).parents(".instruments-tbl-content");
				d = getInstrumentID(d.attr("id"), "_i");
				b = $(b.target).parents(".instruments-tbl-content").children(":first").children(":first").text();
				OpenBuySellDialog(d, c, EMainModeType.EditOrder, null, b)
			}
			return false
		});
		$main_instrument_tbl.click(function (b) {
			if (IsBtnDisabled($(b.target).parent())) return false;
			if ($(b.target).parent().is(".sp_close_positon_btn")) {
				if ($(b.target).parents(".sub_position").length === 0) return false;
				var c =
					$(b.target).parents(".sub-tbl-content");
				b = readSubInstrumentIDFromRow(c);
				var d = LangJSDict["str" + EOpTypeToString(readSubInstrumentTypeFromRow(c)).toUpperCase()];
				c = readInstrumentIDFromSubRow(c);
				displayClosePositionDialog(b, c, d)
			}
			return false
		});
		$main_instrument_tbl.click(function (b) {
			var c;
			if ($(b.target).parent().is(".so_cancel_btn")) {
				b = $(b.target).parents(".sub-tbl-content");
				if (b.length === 0) return false;
				c = readSubInstrumentIDFromRow(b);
				alertDialog(ALERT_TYPE.atConfirmation, LangJSDict.strSURE_CANCEL_ORDER +
					" " + c + "?", false, function () {
						SEND_userCancelOrder(new UserCancelOrder(c))
					}, null)
			}
			return false
		});
		$main_instrument_tbl.click(function (b) {
			if ($(b.target).hasClass("details")) {
				var c = $(b.target).parents("div:eq(1)").children(".instrument-name-content").text();
				b = $(b.target).parents("div:eq(1)");
				b = getInstrumentID(b.attr("id"), "_i");
				OpenDetailsDialog(c, b)
			}
			return false
		});
		$main_instrument_tbl.click(function (b) {
			if ($(b.target).hasClass("instrument-favorite")) {
				var c = parseInt(getInstrumentID($(b.target).parents(".instrument-single-row").attr("id"),
					"_i"), 10);
				if ($.inArray(c, favoritesInstruments) > -1) favoritesInstruments = $.grep(favoritesInstruments, function (d) {
					return d != c
				});
				else favoritesInstruments.push(c);
				updateInstrumentsFavoritesGUI(favoritesInstruments, false);
				LastUpdateFavoriteInstrumentsSequenceNumber += 1;
				favoritesUpdateTimer !== null && clearTimeout(favoritesUpdateTimer);
				favoritesUpdateTimer = setTimeout(favoritesUpdateTimerFunc, 1E3)
			}
			return false
		});
		$main_instrument_tbl.click(function (b) {
			if ($(b.target).hasClass("instrument-alert")) {
				b = parseInt(getInstrumentID($(b.target).parents(".instrument-single-row").attr("id"),
					"_i"), 10);
				openPriceAlertsListDialog(b)
			}
			return false
		})
	}
});

function LoopTestAddCandles(b) {
	var c = getChart("main_instruments");
	if (c) {
		c.TestAddCandle();
		if (chartLiveFeedsDebug) chartTimersDebug.TestAddCandles = setTimeout("LoopTestAddCandles(" + b + ");", b)
	}
}

function LoopTestAddTicks(b) {
	var c = getChart("main_instruments");
	if (c) {
		c.TestAddTickPoint();
		if (chartLiveFeedsDebug) chartTimersDebug.TestAddTicks = setTimeout("LoopTestAddTicks(" + b + ");", b)
	}
}

function LoopUpdateLastCandle(b) {
	var c = getChart("main_instruments");
	if (c) {
		c.UpdateLastCandle(genRandomTick(c.DataAndSettingsObject.hist_data.slice(0, c.DataAndSettingsObject.hist_data.length - 1), true));
		if (chartLiveFeedsDebug) chartTimersDebug.UpdateLastCandle = setTimeout("LoopUpdateLastCandle(" + b + ");", b)
	}
}

function LoopUpdateHorizontalLines(b) {
	var c = getChart("main_instruments");
	if (c) {
		c.DataAndSettingsObject.horiz_lines[0].Value += (Math.random() - 0.5) / 30;
		c.UpdateHorizontalLines(c.DataAndSettingsObject.horiz_lines);
		if (chartLiveFeedsDebug) chartTimersDebug.UpdateHorizontalLines = setTimeout("LoopUpdateHorizontalLines(" + b + ");", b)
	}
}

function LoopGetStatus() {
	var b = getChart("main_instruments");
	if (b) {
		b.chartMovie.GetVariable("_xmouse");
		chartTimersDebug.GetStatus = setTimeout("LoopGetStatus();", 100)
	}
}
$(document).ready(function () {
	$("#enable_feed").click(function () {
		SEND_sessionFeedControlImm({
			Enable: true
		});
		return false
	});
	$("#disable_feed").click(function () {
		SEND_sessionFeedControlImm({
			Enable: false
		});
		return false
	});
	if (hasFlash) {
		var b = getChart("main_instruments");
		if (b) {
			b.updateChartFunction = updateMainInstrumentsChart;
			b.chartDataCB = startMainInstrumentsChartWithNewData;
			$("#main_instruments_tbl_p2_wrapper").removeClass("main-instruments-tbl-p2-fullsize");
			$("#main_instruments_graph").removeClass("display-none-class");
			$("#main_instruments_graph_tools_resolution option[value='" + b.graphSavedSettings.feedResolutionLevel + "']").prop("selected", true);
			$("#main_instruments_graph_tools_resolution").change(function () {
				updateMainInstrumentsChartIfNeeded(currentGraphInstrument, currentGraphPos, currentGraphOrder)
			});
			$("#main_instruments_tbl_p2").click(function (d) {
				d = $(d.target);
				if (d.hasClass("instrument-favorite") || d.hasClass("instrument-alert")) return false;
				for (var e = 0, f = 0; !d.hasClass("instruments-tbl-content");) {
					if (d.length ===
						0) return false;
					if (d.hasClass("sub_position")) e = readSubInstrumentIDFromRow(d);
					if (d.hasClass("sub_order")) f = readSubInstrumentIDFromRow(d);
					d = d.parent()
				}
				updateMainInstrumentsChartIfNeeded(parseInt(getInstrumentID(d.attr("id"), "_i"), 10), e, f);
				return false
			});
			var c = $("#button_test_area");
			c.find("#TestInitializeCandleGraph").click(function () {
				b.TestInitializeCandleGraph(eval($("#indicators").val()), eval($("#extra_settings").val()), eval($("#horiz_lines").val()));
				return false
			});
			c.find("#TestInitializeTickGraph").click(function () {
				b.TestInitializeTickGraph(eval($("#indicators").val()),
					eval($("#extra_settings").val()), eval($("#horiz_lines").val()));
				return false
			});
			c.find("#ShowCandlesAsLines").click(function () {
				b.ShowCandlesAsLines(true);
				return false
			});
			c.find("#ShowCandlesAsCandles").click(function () {
				b.ShowCandlesAsLines(false);
				return false
			});
			c.find("#LoopTestAddCandles").click(function () {
				chartLiveFeedsDebug = 1;
				LoopTestAddCandles(parseInt(document.getElementById("interval").value, 10));
				return false
			});
			c.find("#LoopTestAddCandles").click(function () {
				chartLiveFeedsDebug = 1;
				LoopTestAddCandles(parseInt(document.getElementById("interval").value,
					10));
				return false
			});
			c.find("#LoopUpdateLastCandle").click(function () {
				chartLiveFeedsDebug = 1;
				LoopUpdateLastCandle(parseInt(document.getElementById("interval").value, 10));
				return false
			});
			c.find("#LoopTestAddTicks").click(function () {
				chartLiveFeedsDebug = 1;
				LoopTestAddTicks(parseInt(document.getElementById("interval").value, 10));
				return false
			});
			c.find("#UpdateHorizontalLines").click(function () {
				b.UpdateHorizontalLines(eval(document.getElementById("horiz_lines").value, 10));
				return false
			});
			c.find("#StopLiveFeed").click(function () {
				chartLiveFeedsDebug =
					0;
				return false
			});
			c.find("#ExportImage").click(function () {
				b.chartMovie.exportImage();
				return false
			});
			c.find("#LoopUpdateHorizontalLines").click(function () {
				chartLiveFeedsDebug = 1;
				LoopUpdateHorizontalLines(parseInt(document.getElementById("interval").value, 10));
				return false
			});
			c.find("#LoopGetStatus").click(function () {
				LoopGetStatus();
				return false
			});
			c.find("#UpdateIndicators").click(function () {
				b.ReloadChartNewIndicators(eval($("#indicators").val()));
				return false
			})
		}
	} else {
		$("#main_instruments_tbl_p2_wrapper").addClass("main-instruments-tbl-p2-fullsize");
		$("#main_instruments_graph").addClass("display-none-class")
	}
});
InstrumentsHSM != undefined && alert("InstrumentsHSM is included twice!");
var $main_inst_tbl_rows, $open_position_tab_header, $aorder_tab_header, favoritesInstruments = [],
	LastUpdateFavoriteInstrumentsSequenceNumber = 0,
	favoritesUpdateTimer = null,
	favoritesRefreshTimer = null,
	favoritesPendingUpdateResponse = false,
	favoritesPendingSwitchToCategory = false,
	gotFavorites = false;
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$open_position_tab_header = $("#header_main_tabs").find("#li_options_div");
		$aorder_tab_header = $("#header_main_tabs").find("#li_orders_div");
		$main_inst_tbl_rows = $("#main_instruments_tbl_p2")
	}
});
var InstrumentsHSM = {};
InstrumentsHSM.BeforeHSM = function () {};
InstrumentsHSM.AfterHSM = function () {
	scrollAndroid("main_instruments_tbl_p2_wrapper")
};

function addSubOrderToInstrument(b, c) {
	var d = $("#container_i" + c),
		e = $("#suborder_row_template").jqote(createSubOrder(b, $("#trade_i" + c)))[0];
	c = new CreateSubInstrumentFieldsObject(StringToEOpType(b.Type), b.OID, c);
	e.data("SubInfo", c);
	b = $("#sub_o" + b.OID);
	b.length > 0 ? b.replaceWith(e) : e.appendTo(d);
	hasFlash && e.hover(function () {
		$(this).find(".so_id_content,.type-sub-content,.amount-sub-order-content,.rate-sub-content,.pl-sub-title").addClass("instrument-hover")
	}, function () {
		$(this).find(".so_id_content,.type-sub-content,.amount-sub-order-content,.rate-sub-content,.pl-sub-title").removeClass("instrument-hover")
	})
}

function removeSubOrderUnderInstrument(b, c, d) {
	b = "#sub_o" + b;
	c = $("#container_i" + c).children(b);
	d && c.is(":visible") ? c.fadeOut("slow", function () {
		$(this).remove()
	}) : c.remove()
}

function removeSubPositionUnderInstrument(b, c, d) {
	b = "#sub_p" + b;
	c = $("#container_i" + c).children(b);
	d && c.is(":visible") ? c.fadeOut("slow", function () {
		$(this).remove()
	}) : c.remove()
}

function addSubPositionToInstrument(b, c, d, e) {
	var f = $("#container_i" + c),
		h = $("#subposition_row_template").jqote(createSubPosition(b, $("#trade_i" + c)))[0];
	b = new CreateSubInstrumentFieldsObject(StringToEOpType(b.Type), d, c);
	h.data("SubInfo", b);
	d = $("#sub_p" + d);
	if (d.length > 0) d.replaceWith(h);
	else if (e) h.appendTo(f);
	else {
		h.css("display", "none");
		e = f.children(".sub_position:last");
		e.length === 0 ? f.append(h) : h.insertAfter(e);
		h.fadeIn()
	}
	hasFlash && h.hover(function () {
			$(this).find(".sp_id_content,.type-sub-content,.amount-sub-content,.pl-sub-content,.pl-sub-title").addClass("instrument-hover")
		},
		function () {
			$(this).find(".sp_id_content,.type-sub-content,.amount-sub-content,.pl-sub-content,.pl-sub-title").removeClass("instrument-hover")
		})
}

function updateSubPositionUnderInstrument(b, c, d) {
	addSubPositionToInstrument(b, c, d, false);
	enableGuiLine(c)
}

function updateSubOrderUnderInstrument(b, c) {
	addSubOrderToInstrument(b, c);
	enableGuiLine(c)
}

function scrollToInstrument(b) {
	b = $("#container_i" + b).children().first();
	scrollIntoView(b, $("#main_instruments_tbl_p2_wrapper"))
}
InstrumentsHSM.HandleTradeInstruments = function (b) {
	$("#main_instruments_tbl_p2").html("");
	var c = VerifyProperties(["TradeInstruments"], b);
	if (c) ReportErrors(c);
	else {
		b = b.TradeInstruments.TradingInstrumentsList;
		if (b === null) b = [];
		if (b.length > 0) c = VerifyProperties(["IsLive", "IsShortEnabled", "IsTraded", "InstrumentStatus", "ID", "Name", "Sell", "Buy", "InstrumentType", "SpreadPipsCount", "AssetType", "AssetSymbol", "Change", "DailyHigh", "DailyLow", "PrecisionDigits", "AssetShowCents", "AssetShowOnLeft", "DisallowCharts"],
			b[0]);
		if (c) ReportErrors(c);
		else {
			for (var d = 0, e = b.length; d < e; ++d) {
				var f = b[d],
					h = getPipValue(f.PrecisionDigits),
					g = f.DailyHigh + f.SpreadPipsCount * h;
				h = f.DailyLow - f.SpreadPipsCount * h;
				g = {
					container_id: "container_i" + f.ID,
					div_id: "trade_i" + f.ID,
					instrument_name: f.Name,
					sell: roundToPrecisionDigits(f.Sell, f.PrecisionDigits),
					sell_txt: StringToEInstrumentType(f.InstrumentType) !== EInstrumentType.Forex ? LangJSDict.strSHORT : LangJSDict.strSELL,
					buy: roundToPrecisionDigits(f.Buy, f.PrecisionDigits),
					buy_txt: LangJSDict.strBUY,
					change: "",
					high_low: f.IsTraded === true ? getHighLowString(g, h, f.PrecisionDigits) : LangJSDict.strTRADING_CLOSED,
					details_txt: "Details"
				};
				g = $("#instrument_row_template").jqote(g)[0].appendTo($("#main_instruments_tbl_p2")).children(":first");
				$("#" + favoritesCategory).hasClass("sub_category_menu_item_selected") && g.children(":first").removeClass("instrument-favroites-handle-placeholder").addClass("instrument-favroites-handle");
				g.find("a.tbl-button").addClass("tbl-button-fixed-width");
				f.IsTraded || g.children(":eq(7)").addClass("instrument-trading-is-closed");
				h = new CreateInstrumentFieldsObject(f.IsLive, f.IsShortEnabled, f.IsTraded, StringToEInstrumentStatus(f.InstrumentStatus), f.PrecisionDigits, f.AssetType, f.AssetSymbol, f.InstrumentType, f.DailyHigh, f.DailyLow, f.SpreadPipsCount, f.AssetShowOnLeft, f.AssetShowCents, f.DisallowCharts);
				g.data("Node", h);
				hasFlash && g.hover(function () {
					$(this).find(".buy-sell-content,.instrument-name-content,.change-content,.high-low-content").addClass("instrument-hover")
				}, function () {
					$(this).find(".buy-sell-content,.instrument-name-content,.change-content,.high-low-content").removeClass("instrument-hover")
				});
				g = g.children("div:nth-child(" + GC.TI_CHANGE_COLUMN_IND + ")");
				updateChangePercentsDiv(g, f.Change);
				g = f.OSubPositions;
				if (g.length > 0) c = VerifyProperties(["PID", "Type", "Amount", "NetPL"], g[0]);
				if (c) {
					ReportErrors(c);
					return
				}
				if (g !== null) {
					h = 0;
					for (var l = g.length; h < l; ++h) {
						var n = g[h];
						addSubPositionToInstrument(n, f.ID, n.PID, true)
					}
				}
				setInstrumnetEnabling(EInstrumentStatusChangeType.Initialize, f.ID, f.IsLive, f.IsTraded, StringToEInstrumentStatus(f.InstrumentStatus), f.DisallowCharts);
				g = f.ASubOrders;
				if (g.length > 0) c = VerifyProperties(["OID",
					"Type", "Amount", "MinRate"
				], g[0]);
				if (c) {
					ReportErrors(c);
					return
				}
				if (g !== null) {
					h = 0;
					for (l = g.length; h < l; ++h) addSubOrderToInstrument(g[h], f.ID)
				}
			}
			$("#main_instruments_tbl_p2 > div:nth-child(even)").addClass("main-tbl-content-even");
			updateInstrumentsFavoritesGUI(favoritesInstruments, true);
			updateRateAlertsGUI(rateAlerts);
			stopLoadingAnimGif();
			if (b.length > 0) {
				c = $.cookie(appCookies.LastInstrument);
				if (c === null || $("#trade_i" + c).length === 0) c = b[0].ID;
				if (typeof c == "string") c = parseInt(c, 10);
				if (hasFlash) {
					$("#main_instruments_graph_over").css("visibility",
						"");
					updateMainInstrumentsChartIfNeeded(c, 0, 0)
				} else scrollToInstrument(c)
			}
			if (b.length > 0) {
				c = $("#main_trade_categories").find("a.sub_category_menu_item_selected").attr("id");
				$.cookie(appCookies.LastCategory, null, {
					path: "/Trade"
				});
				$.cookie(appCookies.LastCategory, c, {
					expires: 3650,
					path: "/"
				})
			} else $("#" + favoritesCategory).hasClass("sub_category_menu_item_selected") && !changedCategory && $("#cat0_sc0").click()
		}
	}
};

function updateChangePercentsDiv(b, c) {
	var d = c !== null ? formatPercentCultured(c, GC.PRICE_ACCURACY) : "-";
	b.text(d);
	if (c === null || c === 0) c = "values-black-color";
	else {
		if (GlobalDs.shouldReverseTrendColors()) c = -c;
		c = c > 0 ? "values-green-color" : "values-red-color"
	}
	b.removeClass("values-green-color values-black-color values-red-color").addClass(c)
}

function updateSellBuyDiv(b, c) {
	if (b.length !== 0) {
		var d = parseFloatCultured(b.text());
		b.stop(true, true);
		d = c - d;
		if (d === 0) d = "values-black-color";
		else {
			if (GlobalDs.shouldReverseTrendColors()) d = -d;
			d = d > 0 ? "values-green-color" : "values-red-color"
		}
		var e = readPrecisionDigitToInstRow(b.parents());
		b.text(roundToPrecisionDigits(c, e));
		b.removeClass("values-green-color values-black-color values-red-color").addClass(d)
	}
}

function updateHighLowInstrumentValuesIfNeeded(b, c, d) {
	d = $("#trade_i" + d);
	if (d.length !== 0)
		if (readInstrumentIsTraded(d)) {
			d.children(":eq(7)").removeClass("instrument-trading-is-closed");
			if (b === null || c === null) d.children(":eq(7)").text("-");
			else {
				var e = d.data("Node"),
					f = e.PrecisionDigit,
					h = getPipValue(f),
					g = e.SpreadPipsCount,
					l = e.high + g * h,
					n = e.low - g * h,
					m = e.isTraded,
					q = false;
				if (e.high === null || b + g * h > l) {
					e.high = b;
					q = true
				}
				if (e.low === null || c - g * h < n) {
					e.low = c;
					q = true
				}
				q && d.children(":eq(7)").text(getHighLowString(e.high +
					g * h, e.low - g * h, f, false, m))
			}
		} else d.children(":eq(7)").addClass("instrument-trading-is-closed").text(LangJSDict.strTRADING_CLOSED)
}
InstrumentsHSM.HandleFeeds = function (b) {
	var c = VerifyProperties(["Feeds"], b);
	if (c) ReportErrors(c);
	else {
		b = b.Feeds;
		if (b.length > 0) c = VerifyProperties(["BuyRate", "SellRate", "InstrumentID", "DailyHigh", "DailyLow", "Change"], b[0]);
		if (c) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c) {
				var e = b[c],
					f = "#trade_i" + e.InstrumentID,
					h = "#container_i" + e.InstrumentID,
					g = $(f).children("div:nth-child(3)");
				if (g.length !== 0) {
					var l = readInstrumentIsTraded($(f)),
						n = readInstrumentStatus($(f)),
						m = readInstrumentDisallowCharts($(f));
					setInstrumnetEnabling(EInstrumentStatusChangeType.FeedReceive, e.InstrumentID, true, l, n, m);
					if (n == EInstrumentStatus.TotallyFreezed) return;
					updateSellBuyDiv(g, e.SellRate);
					g = g.next().next();
					updateSellBuyDiv(g, e.BuyRate);
					f = $main_inst_tbl_rows.children(h).children(f).children("div:nth-child(" + GC.TI_CHANGE_COLUMN_IND + ")");
					if (f.length === 0) return;
					updateChangePercentsDiv(f, e.Change);
					updateHighLowInstrumentValuesIfNeeded(e.DailyHigh, e.DailyLow, e.InstrumentID);
					if (currentGraphInstrument == e.InstrumentID)(f = getChart("main_instruments")) &&
						f.updateChartOnFeed(e.SellRate)
				}
			}
		}
	}
};
InstrumentsHSM.HandleNewOrder = function (b) {
	var c = VerifyProperties(["NewOrder"], b);
	if (c) ReportErrors(c);
	else {
		b = b.NewOrder;
		if (c = VerifyProperties(["InstrumentName", "InstrumentID", "OID", "PrecisionDigits", "Type", "Amount", "Status", "Value", "Limit", "Stop", "TrailingStopPips", "OpenRate", "MinRate", "MaxRate", "CurrentRate", "OpenUntilDate", "CreationDate"], b)) ReportErrors(c);
		else if ($("#main_instruments_tbl_p2").find("#trade_i" + b.InstrumentID).length !== 0) {
			addSubOrderToInstrument(b, b.InstrumentID);
			enableGuiLine(b.InstrumentID)
		}
	}
};
InstrumentsHSM.HandleUserCancelOrder = function (b) {
	var c = VerifyProperties(["OrderId", "InstrumentID", "Result", "RejectReason"], b);
	if (c) ReportErrors(c);
	else {
		removeSubOrderUnderInstrument(b.OrderId, b.InstrumentID, true);
		currentGraphOrder == b.OrderId && currentGraphInstrument == b.InstrumentID && updateMainInstrumentsChartIfNeeded(b.InstrumentID, 0, 0)
	}
};
InstrumentsHSM.HandleCancelOrder = function (b) {
	var c = VerifyProperties(["OrderId", "InstrumentID", "CancelReason", "CancelReasonDesc"], b);
	if (c) ReportErrors(c);
	else {
		removeSubOrderUnderInstrument(b.OrderId, b.InstrumentID, true);
		currentGraphOrder == b.OrderId && currentGraphInstrument == b.InstrumentID && updateMainInstrumentsChartIfNeeded(b.InstrumentID, 0, 0)
	}
};
InstrumentsHSM.HandleChangeOrderToPosition = function (b) {
	var c = VerifyProperties(["OrderId", "NewPosition"], b);
	if (c) ReportErrors(c);
	else {
		var d = b.NewPosition;
		if (c = VerifyProperties(["PID", "InstrumentID", "InstrumentName", "PrecisionDigits", "Type", "Amount", "NetPL", "Limit", "Stop", "TrailingStopPips", "OpenRate", "CurrentRate", "OpenValue", "CurrentValue", "PremiumInUserBaseCurrency", "PL", "InitialMarginInUserCurrency", "MaintenanceMarginInUserCurrency", "OpenDate"], d)) ReportErrors(c);
		else if ($("#main_instruments_tbl_p2").find("#trade_i" +
			d.InstrumentID).length !== 0) {
			removeSubOrderUnderInstrument(b.OrderId, d.InstrumentID, false);
			addSubPositionToInstrument(d, d.InstrumentID, d.PID, false);
			enableGuiLine(d.InstrumentID);
			currentGraphOrder == b.OrderId && currentGraphInstrument == d.InstrumentID && updateMainInstrumentsChartIfNeeded(d.InstrumentID, d.PID, 0)
		}
	}
};
InstrumentsHSM.HandleFavoritesInstruments = function (b) {
	var c = VerifyProperties(["FavoritesInstruments", "LastUpdateFavoriteInstrumentsSequenceNumber"], b);
	if (c) ReportErrors(c);
	else {
		gotFavorites = true;
		favoritesInstruments = b.FavoritesInstruments;
		LastUpdateFavoriteInstrumentsSequenceNumber = b.LastUpdateFavoriteInstrumentsSequenceNumber;
		updateInstrumentsFavoritesGUI(favoritesInstruments, true)
	}
};

function favoritesRefreshTimerFunc() {
	favoritesRefreshTimer = null;
	updateInstrumentsFavoritesGUI(favoritesInstruments, true)
}
InstrumentsHSM.HandleFavoritesInstrumentsUpdate = function (b) {
	var c = VerifyProperties(["RequestStatus", "FavoritesInstruments", "FavoriteRejectReasons"], b);
	if (c) ReportErrors(c);
	else {
		favoritesPendingUpdateResponse = false;
		StringToERequestStatus(b.RequestStatus) != ERequestStatus.Approved && alertDialog(ALERT_TYPE.atError, LangJSDict["strFAVORITE_REJECT_REASONS_" + b.FavoriteRejectReasons], false, null, null);
		if (favoritesPendingSwitchToCategory) {
			favoritesPendingSwitchToCategory = false;
			CloseProcessingForm();
			SEND_getTradeInstruments(favoritesCategory)
		} else if (favoritesUpdateTimer ===
			null) {
			favoritesInstruments = b.FavoritesInstruments;
			favoritesRefreshTimer !== null && clearTimeout(favoritesRefreshTimer);
			favoritesRefreshTimer = setTimeout(favoritesRefreshTimerFunc, 1E3)
		}
	}
};

function CreateSubInstrumentFieldsObject(b, c, d) {
	this.Type = b;
	this.ID = c;
	this.instrumentID = d
}

function readInstrumentIDFromSubRow(b) {
	return b.data("SubInfo").instrumentID
}

function readSubInstrumentTypeFromRow(b) {
	return b.data("SubInfo").Type
}

function readSubInstrumentIDFromRow(b) {
	return b.data("SubInfo").ID
}

function readAssetSymbolFromInstRow(b) {
	return b.data("Node").assetSymbol
}

function readAssetTypelFromInstRow(b) {
	return b.data("Node").assetType
}

function writePrecisionDigitToInstRow(b, c) {
	b.data("PrecisionDigit", c)
}

function readPrecisionDigitToInstRow(b) {
	return b.data("Node").PrecisionDigit
}

function readInstrumentTypeFromInstRow(b) {
	return b.data("Node").InstrumentType
}

function readInstrumentEnabledFromInstRow(b) {
	return b.data("Node").Enabled
}

function readInstrumentHighValue(b) {
	return b.data("Node").high
}

function readInstrumentLowValue(b) {
	return b.data("Node").low
}

function readInstrumentSpreadPipsCount(b) {
	return b.data("Node").SpreadPipsCount
}

function readInstrumentIsLive(b) {
	return b.data("Node").isLive
}

function readInstrumentIsTraded(b) {
	return b.data("Node").isTraded
}

function readInstrumentStatus(b) {
	return b.data("Node").InstrumentStatus
}

function readInstrumentAssetShowOnLeft(b) {
	return b.data("Node").AssetShowOnLeft
}

function readInstrumentAssetShowCents(b) {
	return b.data("Node").AssetShowCents
}

function readInstrumentDisallowCharts(b) {
	return b.data("Node").DisallowCharts
}

function CreateInstrumentFieldsObject(b, c, d, e, f, h, g, l, n, m, q, o, t, w) {
	this.PrecisionDigit = f;
	this.assetType = h;
	this.assetSymbol = g;
	this.InstrumentType = l;
	this.isLive = b;
	this.IsShortEnabled = c;
	this.isTraded = d;
	this.high = n;
	this.low = m;
	this.SpreadPipsCount = q;
	this.InstrumentStatus = e;
	this.AssetShowOnLeft = o;
	this.AssetShowCents = t;
	this.DisallowCharts = w
}

function createSubPosition(b, c) {
	var d, e, f, h, g;
	if (c.length === 0) return null;
	d = readAssetSymbolFromInstRow(c);
	h = readInstrumentAssetShowOnLeft(c);
	g = readInstrumentAssetShowCents(c);
	e = LangJSDict.AssetType[readAssetTypelFromInstRow(c)];
	f = readInstrumentTypeFromInstRow(c);
	c = GlobalDs.formatMoneyAmount(b.NetPL, true, false, false);
	d = StringToEInstrumentType(f) === EInstrumentType.Forex ? d === "" ? roundToPrecisionDigits(b.Amount, GC.PRICE_ACCURACY, true) + " " + e : genericFormatMoneyAmount(b.Amount, d, false, g, h, false) : d === "" ? b.Amount +
		" " + e : genericFormatMoneyAmount(b.Amount, d, false, g, h, false);
	e = b.PL > 0 ? "sub-img-arrow-up" : b.PL === 0 ? "" : "sub-img-arrow-down";
	if (e.length > 0 && GlobalDs.shouldReverseTrendColors()) e += "-cn";
	return {
		div_ispd: b.PID,
		sp_id: b.PID,
		type: StringToEOpType(b.Type),
		type_text: LangJSDict["str" + b.Type.toUpperCase()],
		amount: d,
		arrow_direction_class: e,
		pl: c
	}
}

function createSubOrder(b, c) {
	if (c.length === 0) return null;
	var d = readAssetSymbolFromInstRow(c),
		e = LangJSDict.AssetType[readAssetTypelFromInstRow(c)],
		f = readInstrumentAssetShowOnLeft(c),
		h = readInstrumentAssetShowCents(c),
		g = readPrecisionDigitToInstRow(c);
	c = readInstrumentTypeFromInstRow(c);
	d = StringToEInstrumentType(c) === EInstrumentType.Forex ? d === "" ? roundToPrecisionDigits(b.Amount, GC.PRICE_ACCURACY, true) + " " + e : genericFormatMoneyAmount(b.Amount, d, false, h, f, false) : d === "" ? b.Amount + " " + e : genericFormatMoneyAmount(b.Amount,
		d, false, h, f, false);
	return {
		so_id: b.OID,
		type: LangJSDict["str" + b.Type.toUpperCase()],
		amount: d,
		rate: roundToPrecisionDigits(b.MinRate, g)
	}
}
InstrumentsHSM.HandlePositionUpdate = function (b) {
	var c = VerifyProperties(["PositionID", "RequestStatus", "PositionRejectReason", "PositionRejectReasonDesc", "UpdatedPosition"], b);
	if (c) ReportErrors(c);
	else {
		b = b.UpdatedPosition;
		if (c = VerifyProperties(["PID", "InstrumentID", "InstrumentName", "InstrumentStatus", "AssetType", "AssetSymbol", "ExchangeSymbol", "PrecisionDigits", "Type", "Amount", "NetPL", "Limit", "Stop", "TrailingStopPips", "OpenRate", "CurrentRate", "OpenValue", "CurrentValue", "PremiumInUserBaseCurrency", "PL",
			"InitialMarginInUserCurrency", "MaintenanceMarginInUserCurrency", "OpenDate"
		], b)) ReportErrors(c);
		else if ($("#sub_p" + b.PID).parent(".instruments-tbl-content").children(":first").length !== 0)
			if (StringToEInstrumentStatus(b.InstrumentStatus) != EInstrumentStatus.TotallyFreezed) {
				updateSubPositionUnderInstrument(b, b.InstrumentID, b.PID, b.IsTraded);
				currentGraphPos == b.PID && currentGraphInstrument == b.InstrumentID && updateMainInstrumentsChartIfNeeded(b.InstrumentID, b.PID, 0)
			}
	}
};
InstrumentsHSM.HandlePositionsFeed = function (b) {
	var c = VerifyProperties(["PositionFeeds"], b);
	if (c) ReportErrors(c);
	else {
		b = b.PositionFeeds;
		if (c = VerifyProperties(["InstrumentID", "PositionID", "CurrentRate", "NetPLInUserCurrency"], b[0])) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c) StringToEInstrumentStatus(b[c].InstrumentStatus) != EInstrumentStatus.TotallyFreezed && handlePositionFeedUnderInstrument(b[c].PositionID, b[c].NetPLInUserCurrency)
		}
	}
};

function handlePositionFeedUnderInstrument(b, c) {
	b = $("#sub_p" + b);
	if (b.length !== 0) {
		b.find(".amount-sub-content").removeClass("display-none-class");
		var d = GlobalDs.formatMoneyAmount(c, true, false, false);
		b.children(":first").children(":last").text(d);
		c = c > 0 ? "sub-img-arrow-up" : c === 0 ? "" : "sub-img-arrow-down";
		if (GlobalDs.shouldReverseTrendColors()) c += "-cn";
		b.children(":first").children(":first").removeClass("sub-img-arrow-up sub-img-arrow-down sub-img-arrow-up-cn sub-img-arrow-down-cn").addClass(c)
	}
}
InstrumentsHSM.RemovePosition = function (b, c) {
	removeSubPositionUnderInstrument(b, c, true);
	currentGraphPos == b && currentGraphInstrument == c && updateMainInstrumentsChartIfNeeded(c, 0, 0)
};
InstrumentsHSM.HandleClosePosition = function (b) {
	var c = VerifyProperties(["PositionID", "ClosePositionRespone", "RejectReason", "RejectReasonDesc", "ClosedPosition"], b);
	c ? ReportErrors(c) : InstrumentsHSM.RemovePosition(b.PositionID, b.ClosedPosition.InstrumentID)
};
InstrumentsHSM.HandleCancelPosition = function (b) {
	var c = VerifyProperties(["PositionID", "InstrumentID", "CancelReason", "CancelReasonDesc"], b);
	c ? ReportErrors(c) : InstrumentsHSM.RemovePosition(b.PositionID, b.InstrumentID)
};
InstrumentsHSM.InstrumentsUpdate = function (b) {
	var c = VerifyProperties(["InstrumentTradeStatuses"], b);
	if (c) ReportErrors(c);
	else {
		b = b.InstrumentTradeStatuses;
		if (c = VerifyProperties(["InstrumentID", "IsTraded", "IsLive", "InstrumentStatus", "DailyHigh", "DailyLow", "Change"], b[0])) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c) {
				var e = b[c],
					f = $("#trade_i" + e.InstrumentID);
				if (f.length !== 0) {
					var h = f.data("Node");
					h.high = e.DailyHigh;
					h.low = e.DailyLow;
					setInstrumnetEnabling(EInstrumentStatusChangeType.InstrumentUpdate,
						e.InstrumentID, e.IsLive, e.IsTraded, StringToEInstrumentStatus(e.InstrumentStatus), e.DisallowCharts);
					f = f.children("div:nth-child(" + GC.TI_CHANGE_COLUMN_IND + ")");
					updateChangePercentsDiv(f, e.Change);
					log("InstrumentsHSM.InstrumentsUpdate : Instrument - " + e.InstrumentID + " is " + (e.IsTraded ? "" : " not ") + " Trade and is " + (e.IsLive ? "" : " not") + " Live")
				}
			}
		}
	}
};
InstrumentsHSM.UpdateOrder = function (b) {
	var c = VerifyProperties(["UpdatedOrder"], b);
	if (c) ReportErrors(c);
	else {
		b = b.UpdatedOrder;
		if (c = VerifyProperties(["OID", "InstrumentName", "InstrumentID", "PrecisionDigits", "Type", "Amount", "Status", "Value", "Limit", "Stop", "TrailingStopPips", "OpenRate", "MinRate", "MaxRate", "CurrentRate", "OpenUntilDate", "CreationDate", "InstrumentStatus"], b)) ReportErrors(c);
		else if (StringToEInstrumentStatus(b.InstrumentStatus) != EInstrumentStatus.TotallyFreezed) {
			c = $("#main_instruments_tbl_p2").find("#trade_i" +
				b.InstrumentID);
			if (!(c.length === 0 || c === null)) {
				updateSubOrderUnderInstrument(b, b.InstrumentID, b.OID, false);
				currentGraphOrder == b.OID && currentGraphInstrument == b.InstrumentID && updateMainInstrumentsChartIfNeeded(b.InstrumentID, 0, b.OID)
			}
		}
	}
};
InstrumentsHSM.HandleOpenPositions = function (b) {
	var c = VerifyProperties(["OPositionsList", "ListType"], b);
	if (c) ReportErrors(c);
	else {
		c = b.OPositionsList;
		if (ECommListType.Update === StringToECommListType(b.ListType)) {
			b = 0;
			for (var d = c.length; b < d; ++b) {
				var e = c[b],
					f = $("#trade_i" + e.InstrumentID);
				$("#sub_p" + e.PID);
				if (f.length > 0)
					if (StringToEInstrumentStatus(e.InstrumentStatus) != EInstrumentStatus.TotallyFreezed) {
						addSubPositionToInstrument(e, e.InstrumentID, e.PID, false);
						setInstrumnetEnabling(EInstrumentStatusChangeType.InstrumentUpdate,
							e.InstrumentID, e.IsLive, e.IsTraded, StringToEInstrumentStatus(e.InstrumentStatus), e.DisallowCharts)
					}
			}
		}
	}
};
InstrumentsHSM.HandleMessages = function (b) {
	InstrumentsHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.TradeInstruments:
			InstrumentsHSM.HandleTradeInstruments(d);
			break;
		case EClientMessageType.Feed:
			InstrumentsHSM.HandleFeeds(d);
			break;
		case EClientMessageType.NewOrder:
			InstrumentsHSM.HandleNewOrder(d);
			break;
		case EClientMessageType.UserCancelOrder:
			InstrumentsHSM.HandleUserCancelOrder(d);
			break;
		case EClientMessageType.CancelOrder:
			InstrumentsHSM.HandleCancelOrder(d);
			break;
		case EClientMessageType.ChangeOrderToPosition:
			InstrumentsHSM.HandleChangeOrderToPosition(d);
			break;
		case EClientMessageType.PositionUpdate:
			InstrumentsHSM.HandlePositionUpdate(d);
			break;
		case EClientMessageType.ClosePosition:
			InstrumentsHSM.HandleClosePosition(d);
			break;
		case EClientMessageType.CancelPosition:
			InstrumentsHSM.HandleCancelPosition(d);
			break;
		case EClientMessageType.UpdateOrder:
			InstrumentsHSM.UpdateOrder(d);
			break;
		case EClientMessageType.PositionsFeed:
			InstrumentsHSM.HandlePositionsFeed(d);
			break;
		case EClientMessageType.OpenPositions:
			InstrumentsHSM.HandleOpenPositions(d);
			break;
		case EClientMessageType.InstrumentsUpdate:
			InstrumentsHSM.InstrumentsUpdate(d);
			break;
		case EClientMessageType.FavoritesInstruments:
			InstrumentsHSM.HandleFavoritesInstruments(d);
			break;
		case EClientMessageType.FavoritesInstrumentsUpdate:
			InstrumentsHSM.HandleFavoritesInstrumentsUpdate(d);
			break;
		default:
			break
		}
	});
	InstrumentsHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(InstrumentsHSM.HandleMessages);
OPositionsHSM != undefined && alert("OPositionsHSM is included twice!");
var OPositionsHSM = {};
OPositionsHSM.BeforeHSM = function () {};
OPositionsHSM.AfterHSM = function () {};

function updateOpenPositionsTabHeader() {
	updateOpenPositionsTotals();
	var b = $("#main_opositions_tbl_p2").children().length - 1;
	$open_position_tab_header.text(LangJSDict.strOPEN_POSITIONS + " (" + b + ")")
}
var $prevPos = null;

function afterClosePositionFadeOut() {
	$(this).remove();
	opositionsUpdateZebraRows();
	if ($prevPos !== null) {
		if ($prevPos.length === 0)
			if ($("#main_opositions_tbl_p2").children().length > 1) $prevPos = $("#main_opositions_tbl_p2").children(":first");
		if ($prevPos.length > 0) updateOpenPositionsChartIfNeeded(readPositionTableInstrumentID($prevPos), readPositionTablePositionID($prevPos));
		else {
			$("#main_opositions_graph_title").text("");
			$("#main_opositions_graph_over").css("visibility", "hidden");
			currentOpenPositionsGraphPos =
				currentOpenPositionsGraphInstrument = null;
			updateOpenPositionsChartIfNeeded(0, 0)
		}
		$prevPos = null
	}
	setTimeout(updateOpenPositionsTabHeader, 200)
}

function removePositionFromPositionsTable(b, c) {
	var d = "#oposition_pid" + b;
	d = $("#main_opositions_tbl_p2").children(d);
	if (currentOpenPositionsGraphPos === null || b == currentOpenPositionsGraphPos) $prevPos = d.prev();
	c && d.is(":visible") ? d.fadeOut("slow", afterClosePositionFadeOut) : afterClosePositionFadeOut.apply(d[0])
}

function addNewPositionToOpenPositionTable(b) {
	var c = VerifyProperties(["PID", "InstrumentID", "InstrumentName", "InstrumentType", "AssetType", "AssetSymbol", "ExchangeSymbol", "ExchangeMultiplier", "PrecisionDigits", "Type", "Amount", "NetPL", "Limit", "Stop", "TrailingStopPips", "OpenRate", "CurrentRate", "OpenValue", "CurrentValue", "PremiumInUserBaseCurrency", "PL", "TotalAdjustmentsInUserCurrency", "InitialMarginInUserCurrency", "MaintenanceMarginInUserCurrency", "OpenDate", "IsLive", "IsTraded", "InstrumentStatus", "AssetShowCents",
		"AssetShowOnLeft", "ExchangeShowCents", "ExchangeShowOnLeft", "DisallowCharts"
	], b);
	if (c) ReportErrors(c);
	else {
		c = GetOpenPositionsTotalsCreateIfMissing();
		var d = undefined,
			e;
		if (StringToEInstrumentType(b.InstrumentType) == EInstrumentType.Forex) d = b.AssetSymbol;
		else e = LangJSDict.AssetType[b.AssetType];
		var f = GlobalDs.formatMoneyAmount(b.NetPL, true, false, false),
			h = GlobalDs.formatMoneyAmount(b.PL, true, false, false),
			g = GlobalDs.formatMoneyAmount(b.PremiumInUserBaseCurrency, true, false, false);
		e = StringToEInstrumentType(b.InstrumentType) ===
			EInstrumentType.Forex ? d == undefined ? roundToPrecisionDigits(b.Amount, GC.PRICE_ACCURACY, true) + " " + e : genericFormatMoneyAmount(b.Amount, d, false, b.AssetShowCents, b.AssetShowOnLeft, false) : d == undefined ? b.Amount + " " + e : genericFormatMoneyAmount(b.Amount, d, false, b.AssetShowCents, b.AssetShowOnLeft, false);
		d = stdFormatToDate(b.OpenDate);
		d = GMTToLocalDate(d);
		h = {
			div_ipd: "oposition_pid" + b.PID,
			oposition_name: b.InstrumentName,
			oposition_id: LangJSDict.strID + " " + b.PID,
			type_txt: LangJSDict["str" + b.Type.toUpperCase()],
			amount: e,
			netpl: f,
			limit: b.Limit !== null ? roundToPrecisionDigits(b.Limit, b.PrecisionDigits) : b.Limit,
			stop: b.Stop !== null ? roundToPrecisionDigits(b.Stop, b.PrecisionDigits) : b.Stop,
			opening_rate: roundToPrecisionDigits(b.OpenRate, b.PrecisionDigits),
			current_rate: roundToPrecisionDigits(b.CurrentRate, b.PrecisionDigits),
			opening_value: genericFormatMoneyAmount(b.OpenValue, b.ExchangeSymbol, false, b.ExchangeShowCents, b.ExchangeShowOnLeft, false),
			current_value: genericFormatMoneyAmount(b.CurrentValue, b.ExchangeSymbol, false, b.ExchangeShowCents,
				b.ExchangeShowOnLeft, false),
			premium: g,
			dividend: b.TotalAdjustmentsInUserCurrency !== 0 ? GlobalDs.formatMoneyAmount(b.TotalAdjustmentsInUserCurrency, true, false, false) : "",
			pl: h,
			in_margin: GlobalDs.formatMoneyAmount(b.InitialMarginInUserCurrency, true, false, false),
			m_margin: GlobalDs.formatMoneyAmount(b.MaintenanceMarginInUserCurrency, true, false, false),
			open: dateToDisplayOnlyDateSt(d),
			time: dateToDisplayOnlyTimeSt(d, true)
		};
		f = new CreatePositionTemplateFieldsObject(b.PID, b.Amount, b.PremiumInUserBaseCurrency, b.PL,
			b.TotalAdjustmentsInUserCurrency, b.InitialMarginInUserCurrency, b.MaintenanceMarginInUserCurrency, b.ExchangeSymbol, b.InstrumentID, StringToEOpType(b.Type), b.PrecisionDigits, b.ExchangeMultiplier, b.IsLive, b.IsTraded, StringToEInstrumentStatus(b.InstrumentStatus), b.DisallowCharts);
		g = $("#oposition_row_template").jqote(h)[0];
		h = $("#oposition_pid" + b.PID);
		h.length === 0 ? c.before(g) : h.replaceWith(g);
		h = $("#oposition_pid" + b.PID);
		c = h.children(":eq(2)").children(":first");
		g = h.children(":eq(7)").children(":last");
		updateDiv(c,
			b.NetPL);
		updateDiv(g, b.PL);
		updatePositionTable(h, b.Limit, b.Stop, b.PrecisionDigits);
		h.data("PositionInfo", f)
	}
}
OPositionsHSM.RemovePosition = function (b) {
	removePositionFromPositionsTable(b, true);
	updateOpenPositionsTotals()
};
OPositionsHSM.HandleClosePosition = function (b) {
	var c = VerifyProperties(["PositionID", "ClosePositionRespone", "RejectReason", "RejectReasonDesc", "ClosedPosition"], b);
	c ? ReportErrors(c) : OPositionsHSM.RemovePosition(b.PositionID)
};
OPositionsHSM.HandleCancelPosition = function (b) {
	var c = VerifyProperties(["PositionID", "InstrumentID", "CancelReason", "CancelReasonDesc"], b);
	c ? ReportErrors(c) : OPositionsHSM.RemovePosition(b.PositionID)
};
OPositionsHSM.HandlePositionUpdate = function (b) {
	var c = VerifyProperties(["PositionID", "RequestStatus", "PositionRejectReason", "PositionRejectReasonDesc", "UpdatedPosition"], b);
	if (c) ReportErrors(c);
	else {
		b = b.UpdatedPosition;
		if (c = VerifyProperties(["PID", "InstrumentID", "InstrumentName", "InstrumentType", "AssetType", "AssetSymbol", "ExchangeSymbol", "PrecisionDigits", "Type", "Amount", "NetPL", "Limit", "Stop", "TrailingStopPips", "OpenRate", "CurrentRate", "OpenValue", "CurrentValue", "PremiumInUserBaseCurrency", "PL", "InitialMarginInUserCurrency",
			"MaintenanceMarginInUserCurrency", "OpenDate"
		], b)) ReportErrors(c);
		else {
			c = $("#oposition_pid" + b.PID);
			updatePositionTable(c, b.Limit, b.Stop, b.PrecisionDigits);
			updateOpenPositionsTotals();
			currentOpenPositionsGraphPos == b.PID && currentOpenPositionsGraphInstrument == b.InstrumentID && updateOpenPositionsChartIfNeeded(b.InstrumentID, b.PID)
		}
	}
};

function CreatePositionTemplateFieldsObject(b, c, d, e, f, h, g, l, n, m, q, o, t, w, D, v) {
	this.amount = c;
	this.premium = d;
	this.pl = e;
	this.TotalAdjustments = f;
	this.initMargin = h;
	this.maintMargin = g;
	this.assetSymbol = l;
	this.InstrumentID = n;
	this.type = m;
	this.precisionDigits = q;
	this.ExchangeMultiplier = o;
	this.positionID = b;
	this.isLive = t;
	this.isTraded = w;
	this.InstrumentStatus = D;
	this.DisallowCharts = v
}

function readPositionIsLive(b) {
	return b.data("PositionInfo").isLive
}

function readPositionIsTraded(b) {
	return b.data("PositionInfo").isTraded
}

function readPositionInstrumentStatus(b) {
	return b.data("PositionInfo").InstrumentStatus
}

function readPositionTableAmount(b) {
	return b.data("PositionInfo").amount
}

function readPositionTablePremium(b) {
	return b.data("PositionInfo").premium
}

function readPositionTableTotalAdjustments(b) {
	return b.data("PositionInfo").TotalAdjustments
}

function readPositionTablePL(b) {
	return b.data("PositionInfo").pl
}

function readPositionTableInitMargin(b) {
	return b.data("PositionInfo").initMargin
}

function readPositionTableMaintMargin(b) {
	return b.data("PositionInfo").maintMargin
}

function readPositionTableAssetSymbol(b) {
	return b.data("PositionInfo").assetSymbol
}

function readPositionTableExchangeMultiplier(b) {
	return b.data("PositionInfo").ExchangeMultiplier
}

function readPositionTableInstrumentID(b) {
	return b.data("PositionInfo").InstrumentID
}

function readPositionTablePositionID(b) {
	return b.data("PositionInfo").positionID
}

function readPositionTableType(b) {
	return b.data("PositionInfo").type
}

function readPositionTablePrecisionDigits(b) {
	return b.data("PositionInfo").precisionDigits
}

function readPositionTableDisallowCharts(b) {
	return b.data("PositionInfo").DisallowCharts
}
OPositionsHSM.HandlePositionsFeed = function (b) {
	var c = VerifyProperties(["PositionFeeds"], b);
	if (c) ReportErrors(c);
	else {
		b = b.PositionFeeds;
		if (c = VerifyProperties(["InstrumentID", "PositionID", "CurrentRate", "PLInUserCurrency", "NetPLInUserCurrency"], b[0])) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c)
				if (StringToEInstrumentStatus(b[c].InstrumentStatus) != EInstrumentStatus.TotallyFreezed) {
					handlePositionFeed(b[c].PositionID, b[c].CurrentRate, b[c].PLInUserCurrency, b[c].NetPLInUserCurrency);
					var e = $("#oposition_pid" +
						b[c].PositionID);
					if (e.length === 0) return;
					var f = readPositionIsTraded(e),
						h = readPositionInstrumentStatus(e);
					e = readPositionTableDisallowCharts(e);
					setPositionRowEnabling(b[c].PositionID, EInstrumentStatusChangeType.FeedReceive, true, f, h, e);
					if (currentOpenPositionsGraphPos == b[c].PositionID)
						if ((f = getChart("main_opositions")) && f.chartMovie !== null && f.chartInited) f.updateChartOnFeed(b[c].CurrentRate - (f.currentGraphBuy === true ? f.buyOffset : 0))
				}
			updateOpenPositionsTotals()
		}
	}
};

function handlePositionFeed(b, c, d, e) {
	b = $("#oposition_pid" + b);
	if (!(b === null || b.length === 0)) {
		var f = readPositionTableExchangeMultiplier(b);
		if (b.length !== 0) {
			var h = readPositionTableAmount(b);
			readPositionTablePremium(b);
			var g = readPositionTableAssetSymbol(b),
				l = readPositionTablePrecisionDigits(b);
			b.data("PositionInfo", $.extend({}, b.data("PositionInfo"), {
				pl: d
			}));
			var n = GlobalDs.formatMoneyAmount(d, true, false, false),
				m = b.children(":eq(7)").children(":last");
			updateDiv(m, d);
			m.text(n);
			d = GlobalDs.formatMoneyAmount(e,
				true, false, false);
			n = b.children(":eq(2)").children(":first");
			n.text(d);
			updateDiv(n, e);
			e = roundToPrecisionDigits(c, l);
			b.children(":eq(5)").children(":last").text(e);
			c = c * h * f;
			c = roundToPrecisionDigits(c, GC.STD_PERCENT_ACCURACY, true);
			b.children(":eq(6)").children(":last").text(g + " " + c)
		}
	}
}

function updateDiv(b, c) {
	if (GlobalDs.shouldReverseTrendColors()) c = -c;
	c = c > 0 ? "values-green-color" : c === 0 ? "values-black-color" : "values-red-color";
	b.removeClass("values-green-color values-black-color values-red-color").addClass(c)
}

function updatePositionTable(b, c, d, e) {
	var f = b.find(".op-close-at-profit");
	b = b.find(".op-close-at-loss");
	if (c === null) {
		f.empty();
		$('<a href="#">' + LangJSDict.strCLOSE_AT_PROFIT + "</a>").appendTo(f)
	} else {
		c = roundToPrecisionDigits(c, e);
		f.empty().text(c)
	} if (d === null) {
		b.empty();
		$('<a href="#">' + LangJSDict.strCLOSE_AT_LOSS + "</a>").appendTo(b)
	} else {
		c = roundToPrecisionDigits(d, e);
		b.empty().text(c)
	}
}
OPositionsHSM.HandleOpenPositions = function (b) {
	var c = VerifyProperties(["OPositionsList", "ListType"], b);
	if (c) ReportErrors(c);
	else {
		var d = b.OPositionsList,
			e;
		if (ECommListType.Update === StringToECommListType(b.ListType)) {
			b = 0;
			for (c = d.length; b < c; ++b) {
				e = d[b];
				$("#oposition_pid" + e.PID);
				addNewPositionToOpenPositionTable(e);
				setPositionRowEnabling(e.PID, EInstrumentStatusChangeType.Initialize, e.IsLive, e.IsTraded, StringToEInstrumentStatus(e.InstrumentStatus), e.DisallowCharts)
			}
			updateOpenPositionsTotals()
		} else {
			d = b.OPositionsList;
			if (d !== null) {
				$("#main_opositions_tbl_p2").html("");
				b = 0;
				for (c = d.length; b < c; ++b) {
					e = d[b];
					addNewPositionToOpenPositionTable(e);
					setPositionRowEnabling(e.PID, EInstrumentStatusChangeType.Initialize, e.IsLive, e.IsTraded, StringToEInstrumentStatus(e.InstrumentStatus), e.DisallowCharts)
				}
				opositionsUpdateZebraRows();
				if (hasFlash)
					if (d.length > 0) {
						b = d[0].PID;
						if (typeof b == "string") b = parseInt(b, 10);
						c = d[0].InstrumentID;
						if (typeof c == "string") c = parseInt(c, 10);
						updateOpenPositionsChartIfNeeded(c, b)
					} else updateOpenPositionsChartIfNeeded(0,
						0)
			}
			updateOpenPositionsTabHeader()
		}
	}
};
OPositionsHSM.HandleChangeOrderToPosition = function (b) {
	var c = VerifyProperties(["OrderId", "NewPosition"], b);
	if (c) ReportErrors(c);
	else {
		b = b.NewPosition;
		addNewPositionToOpenPositionTable(b);
		updateOpenPositionsTotals();
		updateOpenPositionsTabHeader();
		opositionsUpdateZebraRows();
		updateOpenPositionsChartIfNeeded(b.InstrumentID, b.PID)
	}
};
OPositionsHSM.InstrumentsUpdate = function (b) {
	var c = VerifyProperties(["InstrumentTradeStatuses"], b);
	if (c) ReportErrors(c);
	else {
		b = b.InstrumentTradeStatuses;
		if (c = VerifyProperties(["InstrumentID", "IsTraded", "IsLive", "InstrumentStatus", "DisallowCharts"], b[0])) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c)
				for (var e = $("#main_opositions_tbl_p2").children(), f = 0, h = e.length; f < h; f++) {
					var g = e.eq(f);
					if (g.length !== 0)
						if (readPositionTableInstrumentID(g) === b[c].InstrumentID) {
							g = g.data("PositionInfo").positionID;
							setPositionRowEnabling(g, EInstrumentStatusChangeType.InstrumentUpdate, b[c].IsLive, b[c].IsTraded, StringToEInstrumentStatus(b[c].InstrumentStatus), b[c].DisallowCharts)
						}
				}
		}
	}
};

function updateDivTextAndColor(b, c) {
	b.text(GlobalDs.formatMoneyAmount(c, true, false, false));
	updateDiv(b, c)
}

function GetOpenPositionsTotalsCreateIfMissing() {
	var b = $("#oposition_totals");
	if (b.length == 1) return b;
	b = {
		div_ipd: "oposition_totals",
		oposition_name: LangJSDict.strTOTAL,
		oposition_id: "",
		type_txt: "",
		amount: "",
		netpl: "0",
		limit: "",
		stop: "",
		dividends: "",
		opening_rate: "",
		current_rate: "",
		opening_value: "",
		current_value: "",
		premium: "0",
		pl: "0",
		in_margin: "0",
		m_margin: "0",
		open: "",
		time: ""
	};
	b = $("#oposition_row_template").jqote(b)[0];
	b.children(".close-edit-content").children().text("");
	b.addClass("opos_totals");
	b.addClass("display-none-class");
	var c = new CreatePositionTemplateFieldsObject(-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	$("#main_opositions_tbl_p2").append(b);
	b.data("PositionInfo", c);
	return $("#oposition_totals")
}

function updateOpenPositionsTotals() {
	var b = GetOpenPositionsTotalsCreateIfMissing(),
		c = $("#main_opositions_tbl_p2").children(),
		d = 0,
		e = 0,
		f = 0,
		h = 0,
		g = 0,
		l = 0,
		n = false;
	$.each(c, function () {
		if (readPositionTablePositionID($(this)) >= 0)
			if (readPositionInstrumentStatus($(this)) != EInstrumentStatus.TotallyFreezed) {
				l += 1;
				d += readPositionTablePL($(this));
				e += readPositionTablePremium($(this));
				f += readPositionTableTotalAdjustments($(this));
				if (f !== 0) n = true;
				h += readPositionTableInitMargin($(this));
				g += readPositionTableMaintMargin($(this))
			}
	});
	updateDivTextAndColor(b.children(":eq(2)").children(":first"), d + e + f);
	if (n) {
		updateDivTextAndColor(b.children(":eq(2)").children(":last"), f);
		$("#main_opositions_tbl_p1").find(".dividends-header").removeClass("display-none-class")
	} else {
		b.children(":eq(2)").children(":last").text("");
		$("#main_opositions_tbl_p1").find(".dividends-header").addClass("display-none-class")
	}
	updateDivTextAndColor(b.children(":eq(7)").children(":first"), e);
	updateDivTextAndColor(b.children(":eq(7)").children(":last"), d);
	updateDivTextAndColor(b.children(":eq(8)").children(":first"),
		h);
	updateDivTextAndColor(b.children(":eq(8)").children(":last"), g);
	b.removeClass("display-none-class");
	l === 0 && b.addClass("display-none-class")
}
OPositionsHSM.HandleMessages = function (b) {
	OPositionsHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.ClosePosition:
			OPositionsHSM.HandleClosePosition(d);
			break;
		case EClientMessageType.CancelPosition:
			OPositionsHSM.HandleCancelPosition(d);
			break;
		case EClientMessageType.OpenPositions:
			OPositionsHSM.HandleOpenPositions(d);
			break;
		case EClientMessageType.ChangeOrderToPosition:
			OPositionsHSM.HandleChangeOrderToPosition(d);
			break;
		case EClientMessageType.PositionUpdate:
			OPositionsHSM.HandlePositionUpdate(d);
			break;
		case EClientMessageType.PositionsFeed:
			OPositionsHSM.HandlePositionsFeed(d);
			break;
		case EClientMessageType.InstrumentsUpdate:
			OPositionsHSM.InstrumentsUpdate(d);
			break;
		default:
			break
		}
	});
	OPositionsHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(OPositionsHSM.HandleMessages);
var currentOpenPositionsGraphInstrument = null,
	currentOpenPositionsGraphPos = null;

function setPositionRowEnabling(b, c, d, e, f, h) {
	var g = $("#oposition_pid" + b),
		l = g.data("PositionInfo");
	if (l !== null) {
		var n = l.isLive && l.isTraded && l.InstrumentStatus == EInstrumentStatus.Available;
		if (c === EInstrumentStatusChangeType.Initialize || c === EInstrumentStatusChangeType.InstrumentUpdate) {
			l.isTraded = e;
			l.isLive = d;
			l.InstrumentStatus = f
		}
		if (hasFlash && currentOpenPositionsGraphPos == b && h) {
			$("#main_opositions_graph_title").text("");
			$("#main_opositions_graph_over").css("visibility", "hidden");
			currentOpenPositionsGraphInstrument =
				null
		} else if (c === EInstrumentStatusChangeType.FeedReceive) l.isLive = true;
		b = l.isLive && l.isTraded && l.InstrumentStatus == EInstrumentStatus.Available;
		if (c === EInstrumentStatusChangeType.Initialize || n != b) enablePositionGuiButton(b, g);
		f == EInstrumentStatus.TotallyFreezed && g.find(".opositions-type-amount-content,.netpl-content,.opening-rate-current-rate-content,.op-current-rate,.opening-value-current-value-content,.opening-value-current-value-content,.op-premium,.op-premium-pl,.in-margin-m-margin-content").text("-")
	}
}

function enablePositionGuiButton(b, c) {
	b ? c.find(".tbl-button").removeClass("tbl-button-disabled") : c.find(".tbl-button").addClass("tbl-button-disabled")
}

function startOpenPositionsChartWithFirstPosition() {
	var b = [];
	if ($("#main_opositions_tbl_p2").children().length > 1) b = $("#main_opositions_tbl_p2").children(":first");
	b.length > 0 && updateOpenPositionsChartIfNeeded(readPositionTableInstrumentID(b), readPositionTablePositionID(b))
}

function updateOpenPositionsChartIfNeeded(b, c) {
	if (typeof c == "number") {
		var d = getChart("main_opositions");
		if (d)
			if (c === 0) d.pendingUpdate = false;
			else d.updateChartIfNeeded(b, c, 0)
	}
}

function updateOpenPositionsChart(b, c, d) {
	var e = $("#oposition_pid" + d);
	if (!readPositionTableDisallowCharts(e)) {
		var f = e.find(".opositions-id-content-name").text(),
			h = false;
		if (readPositionTableType(e) != EOpType.Buy) h = true;
		var g = parseInt($("#main_opositions_graph_tools_resolution").val(), 10);
		$("#main_opositions_tbl_p2").find(".instrument-selected").removeClass("instrument-selected");
		e.addClass("instrument-selected");
		scrollIntoView(e, $("#main_opositions_tbl_wrapper"));
		$("#main_opositions_graph_over").css("visibility",
			"");
		currentOpenPositionsGraphPos = d;
		if (g == b.currentGraphRes && currentOpenPositionsGraphInstrument == c) b.ReloadChartOffsetIfNeeded(h);
		else {
			currentOpenPositionsGraphInstrument = null;
			b.getNewChartData(c, f, h)
		}
	}
}

function startOpenPositionsChartWithNewData(b, c) {
	var d = getChart("main_opositions");
	if (d) {
		var e = $("#oposition_pid" + currentOpenPositionsGraphPos);
		if (e.length !== 0) {
			e = e.find(".opositions-id-content-name").text();
			currentOpenPositionsGraphInstrument = b.InstrumentID;
			c ? d.startChart(b, e) : d.startTickChart(b, e)
		}
	}
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		if (hasFlash) {
			var b = getChart("main_opositions");
			if (!b) return;
			b.updateChartFunction = updateOpenPositionsChart;
			b.chartDataCB = startOpenPositionsChartWithNewData;
			$("#main_opositions_tbl_wrapper").removeClass("main-opositions-tbl-fullsize");
			$("#main_opositions_graph").removeClass("display-none-class");
			$("#main_opositions_graph_tools_resolution option[value='" + b.graphSavedSettings.feedResolutionLevel + "']").prop("selected", true);
			$("#main_opositions_graph_tools_resolution").change(function () {
				updateOpenPositionsChartIfNeeded(currentOpenPositionsGraphInstrument,
					currentOpenPositionsGraphPos)
			});
			$("#main_opositions_tbl_p2").click(function (c) {
				for (c = $(c.target); !c.hasClass("opositions-tbl-content");) {
					if (c.length === 0) return false;
					c = c.parent()
				}
				updateOpenPositionsChartIfNeeded(readPositionTableInstrumentID(c), readPositionTablePositionID(c));
				return false
			})
		} else {
			$("#main_opositions_tbl_wrapper").addClass("main-opositions-tbl-fullsize");
			$("#main_opositions_graph").addClass("display-none-class")
		}
		$("#main_opositions_tbl_p2").click(function (c) {
			var d = $(c.target).parents(".main-tbl-content");
			if (d.length === 0) return false;
			var e = readPositionTablePositionID(d);
			if (e < 0) return false;
			var f = readPositionTableType(d);
			d = readPositionTableInstrumentID(d);
			var h = $(c.target).parents("div:eq(2)").find(".opositions-id-content-name").text();
			if (IsBtnDisabled($(c.target).parent())) return false;
			if ($(c.target).parent().is(".opsition_close_position_btn")) {
				displayClosePositionDialog(e, d, f);
				$close_position.dialog("open")
			} else if ($(c.target).parent().is(".op-close-at-profit")) OpenBuySellDialog(d, e, EMainModeType.EditPositon,
				f, h, {
					closeAtProfit: true
				});
			else if ($(c.target).parent().is(".op-close-at-loss")) OpenBuySellDialog(d, e, EMainModeType.EditPositon, f, h, {
				closeAtLoss: true
			});
			else $(c.target).parent().is(".edit-position-link") && OpenBuySellDialog(d, e, EMainModeType.EditPositon, f, h);
			return false
		})
	}
});
var alreadyAlignOPositionsDivRightIfNeeded = false;

function alignOPositionsDivRightIfNeeded() {
	if ($(".language-dir:first").css("direction").toLowerCase() == "rtl" && !alreadyAlignOPositionsDivRightIfNeeded) {
		alreadyAlignOPositionsDivRightIfNeeded = true;
		$("#main_opositions_tbl_wrapper").scrollLeft($("#main_opositions_tbl_p2").width())
	}
}

function writeBuySellModeToInstRow(b, c) {
	b.data("Mode", c)
}

function readBuySellModeFromInstRow(b) {
	return b.data("Mode")
}
var opositionsUpdateZebraRows = function () {
	$("#main_opositions_tbl_p2 > div").removeClass("main-tbl-content-even").filter(":odd").not(".opos_totals").addClass("main-tbl-content-even");
	updateOpenPositionsTotals()
}, $cPositionsTableFrom, $cPositionsTableTo, ranInitCPositionsTable = false;

function setDatePickerRange(b) {
	var c = new Date,
		d = new Date;
	d.setTime(c.getTime() - b * GC.SEC_IN_24_HOURS * 1E3);
	$cPositionsTableFrom.datepicker("setDate", d);
	$cPositionsTableTo.datepicker("setDate", c)
}

function SendGetClosedPositionsReq() {
	var b = new GetClosedPositions($("#datepicker_from").datepicker("getDate"), new Date($("#datepicker_to").datepicker("getDate").getTime() + GC.SEC_IN_24_HOURS * 1E3));
	SEND_getClosedPositions(b)
}
$(document).ready(function () {
	getDisplayPageType()
});

function initIfNeededCPositionsTable() {
	if (!ranInitCPositionsTable)
		if (getDisplayPageType() === EPageType.Trade) {
			$("#main_cpositions_tbl").click(function () {
				$("#date_part").removeClass("display-none-class")
			});
			$cPositionsTableFrom = $("#datepicker_from");
			$cPositionsTableTo = $("#datepicker_to");
			$("#datepicker_from").datepicker({
				showOn: "button",
				buttonImage: "../Content/Images/calendar.gif",
				buttonImageOnly: true
			});
			$("#datepicker_to").datepicker({
				showOn: "button",
				buttonImage: "../Content/Images/calendar.gif",
				buttonImageOnly: true
			});
			$("#ui-datepicker-div").css("display", "none");
			$("#date_part").find("#cp_last_24").click(function () {
				setDatePickerRange(1);
				return false
			});
			$("#date_part").find("#cp_last_week").click(function () {
				setDatePickerRange(7);
				return false
			});
			$cPositionsTableFrom.click(function () {
				$cPositionsTableFrom.datepicker("show");
				return false
			});
			$cPositionsTableTo.click(function () {
				$cPositionsTableTo.datepicker("show");
				return false
			});
			$("#cp_submit").click(function () {
				$("#datepicker_from").datepicker("getDate") > $("#datepicker_to").datepicker("getDate") &&
					alertDialog(ALERT_TYPE.atError, "The first date is later then the second one. Please correct it.  ", false, null, null);
				SendGetClosedPositionsReq();
				return false
			});
			setDatePickerRange(GC.CP_DEFAULT_DAYS_BACK);
			OpenProcessingForm();
			SendGetClosedPositionsReq();
			ranInitCPositionsTable = true
		}
}
CPositionsHSM != undefined && alert("CPositionsHSM is included twice!");
var CPositionsHSM = {};
CPositionsHSM.BeforeHSM = function () {};
CPositionsHSM.AfterHSM = function () {};
CPositionsHSM.UpdateZebraRows = function () {
	updateClosedPositionsTotals();
	$("#main_cpositions_tbl_p2 > div").removeClass("main-tbl-content-even").filter(":odd").not(".cpos_totals").addClass("main-tbl-content-even")
};
CPositionsHSM.HandleClosedPositions = function (b) {
	$("#li_cpositions").hasClass("header_current_tab") && CloseProcessingForm();
	var c = VerifyProperties(["CPositionsList"], b);
	if (c) ReportErrors(c);
	else {
		b = b.CPositionsList;
		$("#main_cpositions_tbl_p2").html("");
		if (b.length === 0) this.UpdateZebraRows();
		else if (c = VerifyProperties(["PositionID", "InstrumentID", "ExchangeMultiplier", "InstrumentName", "InstrumentType", "PrecisionDigits", "AssetSymbol", "AssetType", "ExchangeSymbol", "Type", "Amount", "OpenRate", "CloseRate", "PremiumInUserCurrency",
			"ProfitLossInUserCurrency", "TotalAdjustmentsInUserCurrency", "CloseReason", "OpenDate", "CloseDate"
		], b[0])) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c) addPostionToClosePositionTable(b[c], true);
			this.UpdateZebraRows()
		}
	}
};

function addPostionToClosePositionTable(b, c) {
	var d = GetClosedPositionsTotalsCreateIfMissing(),
		e = b.AssetSymbol,
		f;
	if (e === "") f = LangJSDict.AssetType[b.AssetType];
	var h = b.Amount * b.CloseRate * b.ExchangeMultiplier,
		g = b.Amount * b.OpenRate * b.ExchangeMultiplier,
		l = b.PremiumInUserCurrency + b.ProfitLossInUserCurrency + b.TotalAdjustmentsInUserCurrency,
		n = GlobalDs.formatMoneyAmount(l, true, false, false),
		m = b.ProfitLossInUserCurrency,
		q = GlobalDs.formatMoneyAmount(m, true, false, false),
		o = b.PremiumInUserCurrency;
	o = GlobalDs.formatMoneyAmount(o,
		true, false, false);
	e = StringToEInstrumentType(b.InstrumentType) === EInstrumentType.Forex ? e === "" ? roundToPrecisionDigits(b.Amount, GC.PRICE_ACCURACY, true) + " " + f : genericFormatMoneyAmount(b.Amount, e, false, b.AssetShowCents, b.AssetShowOnLeft, false) : e === "" ? b.Amount + " " + f : genericFormatMoneyAmount(b.Amount, e, false, b.AssetShowCents, b.AssetShowOnLeft, false);
	f = stdFormatToDate(b.OpenDate);
	f = GMTToLocalDate(f);
	var t = stdFormatToDate(b.CloseDate);
	t = GMTToLocalDate(t);
	h = {
		div_cpid: b.PositionID,
		cposition_name: b.InstrumentName,
		cposition_id: b.PositionID,
		type_txt: LangJSDict["str" + b.Type.toUpperCase()],
		amount: e,
		netpl: n,
		opening_rate: roundToPrecisionDigits(b.OpenRate, b.PrecisionDigits),
		close_rate: roundToPrecisionDigits(b.CloseRate, b.PrecisionDigits),
		opening_value: genericFormatMoneyAmount(g, b.ExchangeSymbol, false, b.ExchangeShowCents, b.ExchangeShowOnLeft, false),
		close_value: genericFormatMoneyAmount(h, b.ExchangeSymbol, false, b.ExchangeShowCents, b.ExchangeShowOnLeft, false),
		premium: o,
		pl: q,
		dividends: b.TotalAdjustmentsInUserCurrency !== 0 ? GlobalDs.formatMoneyAmount(b.TotalAdjustmentsInUserCurrency, true, false, false) : "",
		close_reason: LangJSDict["strCLOSE_REASON_" + b.CloseReason],
		open: dateToDisplayOnlyDateSt(f),
		time: dateToDisplayOnlyTimeSt(f, true),
		close: dateToDisplayOnlyDateSt(t),
		ctime: dateToDisplayOnlyTimeSt(t, true)
	};
	c ? d.before($("#cposition_row_template").jqote(h)[0]) : $("#main_cpositions_tbl_p2").prepend($("#cposition_row_template").jqote(h)[0]);
	c = $("#cposition" + h.div_cpid);
	d = c.children(":eq(2)").children(":eq(0)");
	g = c.children(":eq(5)").children(":eq(2)");
	updateDiv(g, m);
	updateDiv(d, l);
	b = new CreatePositionTemplateFieldsObject(b.PositionID, 0, b.PremiumInUserCurrency, b.ProfitLossInUserCurrency, b.TotalAdjustmentsInUserCurrency, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	c.data("PositionInfo", b);
	return h
}
CPositionsHSM.HandleClosePosition = function (b) {
	var c = VerifyProperties(["PositionID", "ClosePositionRespone", "RejectReason", "RejectReasonDesc", "ClosedPosition"], b);
	if (c) ReportErrors(c);
	else {
		addPostionToClosePositionTable(b.ClosedPosition, false);
		this.UpdateZebraRows()
	}
};

function GetClosedPositionsTotalsCreateIfMissing() {
	var b = $("#cposition_totals");
	if (b.length == 1) return b;
	b = {
		div_cpid: "_totals",
		cposition_name: LangJSDict.strTOTAL,
		cposition_id: "",
		type_txt: "",
		amount: "",
		netpl: "",
		opening_rate: "",
		close_rate: "",
		opening_value: "",
		close_value: "",
		premium: "",
		pl: "",
		close_reason: "",
		open: "",
		time: "",
		close: "",
		ctime: ""
	};
	b = $("#cposition_row_template").jqote(b)[0];
	b.children(".close-edit-content").children().text("");
	b.addClass("cpos_totals");
	b.addClass("display-none-class");
	var c = new CreatePositionTemplateFieldsObject(-1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	$("#main_cpositions_tbl_p2").append(b);
	b.data("PositionInfo", c);
	return $("#cposition_totals")
}

function updateClosedPositionsTotals() {
	var b = GetClosedPositionsTotalsCreateIfMissing(),
		c = $("#main_cpositions_tbl_p2").children();
	if (c.length == 1) {
		b.addClass("display-none-class");
		$("#main_cpositions_tbl_p1").find(".cposition-dividends-header").addClass("display-none-class")
	} else {
		var d = 0,
			e = 0,
			f = 0,
			h = false;
		$.each(c, function () {
			if (readPositionTablePositionID($(this)) >= 0) {
				d += readPositionTablePL($(this));
				e += readPositionTablePremium($(this));
				f += readPositionTableTotalAdjustments($(this));
				if (f !== 0) h = true
			}
		});
		updateDivTextAndColor(b.find(".cp-netpl-content"), d + e + f);
		if (h) {
			$("#main_cpositions_tbl_p1").find(".cposition-dividends-header").removeClass("display-none-class");
			updateDivTextAndColor(b.find(".cposition-dividends"), f)
		} else {
			$("#main_cpositions_tbl_p1").find(".cposition-dividends-header").addClass("display-none-class");
			b.find(".cposition-dividends").text("")
		}
		updateDivTextAndColor(b.children(".cposition-outer-premiumpl-header").children(":first"), e);
		updateDivTextAndColor(b.children(".cposition-outer-premiumpl-header").children(":last"),
			d);
		b.removeClass("display-none-class")
	}
}
CPositionsHSM.HandleMessages = function (b) {
	CPositionsHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.ClosedPositions:
			CPositionsHSM.HandleClosedPositions(d);
			break;
		case EClientMessageType.ClosePosition:
			CPositionsHSM.HandleClosePosition(d);
			break;
		default:
			break
		}
	});
	CPositionsHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(CPositionsHSM.HandleMessages);
OrdersHSM != undefined && alert("OrdersHSM is included twice!");
var OrdersHSM = {};

function updateAOrderTabHeader() {
	var b = $("#main_orders_tbl_p2").children().not(".not-alive-order").length;
	$aorder_tab_header.text(LangJSDict.strORDERS + " (" + b + ")")
}
OrdersHSM.InstIdToOrdersCache = {};
OrdersHSM.ClearCache = function () {
	this.InstIdToOrdersCache = {}
};
OrdersHSM.NewOrderUpdateCache = function (b) {
	if (b.length !== 0) {
		var c = "inst" + readOrderTableInstrumentID(b);
		if (typeof OrdersHSM.InstIdToOrdersCache[c] === "undefined") OrdersHSM.InstIdToOrdersCache[c] = [];
		OrdersHSM.InstIdToOrdersCache[c].push(b)
	}
};
OrdersHSM.RemoveOrderUpdateCache = function (b) {
	if (b.length !== 0) {
		var c = readOrderTableInstrumentID(b);
		b = b.attr("id");
		for (var d = "inst" + c, e = OrdersHSM.InstIdToOrdersCache[d], f = 0, h = e.length; f < h; f++)
			if (e[f].attr("id") == b) {
				OrdersHSM.InstIdToOrdersCache[d].remove(f);
				return
			}
		ReportErrors("OrdersHSM.RemoveOrderUpdateCache cannot find instrument id :" + c)
	}
};
OrdersHSM.GetOrdersFromCache = function (b) {
	b = OrdersHSM.InstIdToOrdersCache["inst" + b];
	if (typeof b === "undefined") return [];
	return b
};
OrdersHSM.BeforeHSM = function () {};
OrdersHSM.AfterHSM = function () {};

function addOrderToOrdersTable(b, c) {
	var d = $("#order_row_template").jqote(b)[0].appendTo($("#main_orders_tbl_p2"));
	if (b.can_reason !== null && b.can_reason !== "") {
		d.children(":eq(3)").children(":first").text(b.can_reason);
		d.children(":eq(3)").children(":last").text("");
		d.addClass("reason")
	} else if (b.rej_reason !== null && b.rej_reason !== "") {
		d.children(":eq(3)").children(":first").text(b.rej_reason);
		d.children(":eq(3)").children(":last").text("");
		d.addClass("reason")
	}
	if (d.children("div:nth-child(3)").children("div:nth-child(1)").text() !== LangJSDict.strLive) {
		d.addClass("not-alive-order");
		$main_tab_CB.is(":checked") && d.addClass("display-none-class")
	}
	d.data("OrderInfo", c);
	OrdersHSM.NewOrderUpdateCache(d);
	return d
}

function removeOrderFromOrdersTable(b, c) {
	var d = $("#order_id" + b);
	c ? d.children(":eq(2)").children(":first").text(LangJSDict.strCancelled) : d.children(":eq(2)").children(":first").text(LangJSDict.strExecuted);
	d.addClass("not-alive-order");
	if ($("#main-tabs-show-only").is(":checked")) {
		d.addClass("display-none-class");
		if (currentOrdersGraphOrder === null || b == currentOrdersGraphOrder) findOtherOrderForChart(d)
	}
	NotALiveOrderShow(d)
}

function createOrderTemplateObject(b) {
	var c = undefined,
		d;
	if (StringToEInstrumentType(b.InstrumentType) == EInstrumentType.Forex) c = b.AssetSymbol;
	else d = LangJSDict.AssetType[b.AssetType];
	c = StringToEInstrumentType(b.InstrumentType) === EInstrumentType.Forex ? c == undefined ? roundToPrecisionDigits(b.Amount, GC.PRICE_ACCURACY, true) + " " + d : genericFormatMoneyAmount(b.Amount, c, false, b.AssetShowCents, b.AssetShowOnLeft, false) : c == undefined ? b.Amount + " " + d : genericFormatMoneyAmount(b.Amount, c, false, b.AssetShowCents, b.AssetShowOnLeft,
		false);
	d = "";
	if (StringToEOrderStatus(b.Status) === EOrderStatus.Rejected) d = b.RejectReason;
	var e = "";
	if (StringToEOrderStatus(b.Status) === EOrderStatus.Cancelled) e = b.CancelReason;
	var f = stdFormatToDate(b.OpenUntilDate);
	f = GMTToLocalDate(f);
	var h = stdFormatToDate(b.OpenUntilDate);
	h = GMTToLocalDate(h);
	var g = stdFormatToDate(b.CreationDate);
	g = GMTToLocalDate(g);
	var l = stdFormatToDate(b.CreationDate);
	l = GMTToLocalDate(l);
	return {
		div_iod: "order_id" + b.OID,
		order_name: b.InstrumentName,
		order_id: LangJSDict.strID + " " + b.OID,
		type_txt: LangJSDict["str" + b.Type.toUpperCase()],
		amount: c,
		rej_reason: d,
		can_reason: e,
		status: LangJSDict["str" + b.Status],
		value: genericFormatMoneyAmount(b.Value, b.ExchangeSymbol, false, b.ExchangeShowCents, b.ExchangeShowOnLeft, false),
		limit: b.Limit !== null ? roundToPrecisionDigits(b.Limit, b.PrecisionDigits) : b.Limit,
		stop: b.Stop !== null ? roundToPrecisionDigits(b.Stop, b.PrecisionDigits) : b.Stop,
		order_rate: roundToPrecisionDigits(b.MinRate, b.PrecisionDigits),
		current_rate: roundToPrecisionDigits(b.CurrentRate, b.PrecisionDigits),
		opening_until_date: dateToDisplayOnlyDateSt(f),
		open_until_time: dateToDisplayOnlyTimeSt(h),
		creation_date: dateToDisplayOnlyDateSt(g),
		creation_time: dateToDisplayOnlyTimeSt(l)
	}
}

function createOrderAndAddToOrdersTable(b) {
	var c = VerifyProperties(["OID", "InstrumentName", "InstrumentID", "InstrumentType", "AssetType", "AssetSymbol", "ExchangeSymbol", "ExchangeMultiplier", "PrecisionDigits", "Type", "Amount", "Value", "Status", "RejectReason", "CancelReason", "Value", "Limit", "Stop", "TrailingStopPips", "OpenRate", "MinRate", "MaxRate", "CurrentRate", "OpenUntilDate", "CreationDate", "InstrumentStatus", "DisallowCharts"], b);
	if (c) {
		ReportErrors(c);
		return false
	}
	var d = new CreateAorderTemplateFieldsObject(b.OID,
		b.InstrumentID, StringToEOpType(b.Type), b.CurrentRate, b.PrecisionDigits, b.AssetSymbol, b.AssetType, b.InstrumentType, b.DisallowCharts);
	c = createOrderTemplateObject(b);
	d = addOrderToOrdersTable(c, d);
	NotALiveOrderShow(d, c);
	c = d.find(".limit-stop-content").filter(function () {
		if ($(this).html() == "&nbsp;") return true
	});
	if (d.hasClass("not-alive-order")) c.html("-");
	else {
		c.filter(":nth-child(1)").html('<a class="aorder-close-at-profit" href="#">' + LangJSDict.strORDERS_ENTERLIMIT_BTN_CAPTION + "</a>");
		c.filter(":nth-child(3)").html('<a class="aorder-close-at-loss" href="#">' +
			LangJSDict.strORDERS_ENTERSTOP_BTN_CAPTION + "</a>")
	}
	hideOrdersOnFrozenInstruments(d, StringToEInstrumentStatus(b.InstrumentStatus));
	return !d.hasClass("display-none-class")
}

function NotALiveOrderShow(b) {
	if (b.hasClass("not-alive-order")) {
		if (!b.hasClass("reason")) {
			b.children(":eq(3)").children(":first").text("-");
			b.children(":eq(3)").children(":last").text("-")
		}
		b.children(":eq(4)").find("a").parent().html("-")
	}
}
OrdersHSM.HandleUserCancelOrder = function (b) {
	var c = VerifyProperties(["OrderId", "InstrumentID", "Result", "RejectReason"], b);
	if (c) ReportErrors(c);
	else {
		removeOrderFromOrdersTable(b.OrderId, true, true);
		ordersUpdateZebraRows();
		updateAOrderTabHeader()
	}
};
OrdersHSM.HandleCancelOrder = function (b) {
	var c = VerifyProperties(["OrderId", "InstrumentID", "CancelReason", "CancelReasonDesc"], b);
	if (c) ReportErrors(c);
	else {
		removeOrderFromOrdersTable(b.OrderId, true, true);
		ordersUpdateZebraRows();
		updateAOrderTabHeader()
	}
};
OrdersHSM.HandleNewOrder = function (b) {
	var c = VerifyProperties(["NewOrder"], b);
	if (c) ReportErrors(c);
	else {
		b = b.NewOrder;
		createOrderAndAddToOrdersTable(b) && updateOrdersChartIfNeeded(b.InstrumentID, b.OID);
		ordersUpdateZebraRows();
		updateAOrderTabHeader()
	}
};
OrdersHSM.HandleChangeOrderToPosition = function (b) {
	var c = VerifyProperties(["OrderId", "NewPosition"], b);
	if (c) ReportErrors(c);
	else if (c = VerifyProperties(["PID", "InstrumentID", "InstrumentName", "PrecisionDigits", "Type", "Amount", "NetPL", "Limit", "Stop", "TrailingStopPips", "OpenRate", "CurrentRate", "OpenValue", "CurrentValue", "PremiumInUserBaseCurrency", "PL", "InitialMarginInUserCurrency", "MaintenanceMarginInUserCurrency", "OpenDate"], b.NewPosition)) ReportErrors(c);
	else {
		removeOrderFromOrdersTable(b.OrderId, false,
			false);
		ordersUpdateZebraRows();
		updateAOrderTabHeader()
	}
};
OrdersHSM.UpdateOrder = function (b) {
	var c = VerifyProperties(["UpdatedOrder"], b);
	if (c) ReportErrors(c);
	else {
		b = b.UpdatedOrder;
		if (c = VerifyProperties(["OID", "InstrumentName", "InstrumentID", "PrecisionDigits", "Type", "Amount", "Status", "Value", "Limit", "Stop", "TrailingStopPips", "OpenRate", "MinRate", "MaxRate", "CurrentRate", "OpenUntilDate", "CreationDate"], b)) ReportErrors(c);
		else {
			c = $("#order_id" + b.OID);
			updateOrderTable(c, b.Limit, b.Stop, b.MinRate, b.PrecisionDigits)
		}
	}
};

function updateOrderTable(b, c, d, e, f) {
	var h = b.children(":eq(4)").children(":first"),
		g = b.children(":eq(4)").children(":last");
	b = b.children(":eq(5)").children(":first");
	if (c === null) {
		h.empty();
		$('<a href="#">' + LangJSDict.strCLOSE_AT_PROFIT + "</a>").appendTo(h)
	} else {
		c = roundToPrecisionDigits(c, f);
		h.empty().text(c)
	} if (d === null) {
		g.empty();
		$('<a href="#">' + LangJSDict.strCLOSE_AT_LOSS + "</a>").appendTo(g)
	} else {
		c = roundToPrecisionDigits(d, f);
		g.empty().text(c)
	} if (e !== null) {
		c = roundToPrecisionDigits(e, f);
		b.text(c)
	}
}

function debugTestOrdersUpdate() {
	OrdersHSM.HandleOrders({
		AOrdersList: [{
			InstrumentID: 2,
			InstrumentName: "Oil",
			OID: 5562,
			PrecisionDigits: 4,
			Type: "Buy",
			Amount: 150,
			Stop: -2995.23,
			MinRate: 100.12,
			MaxRate: 120.23,
			InstrumentType: "Forex",
			Status: "Executed",
			ClosetRate: 77.41,
			Value: 10970.25,
			Limit: 11572.5,
			OpenRate: -29.06,
			TrailingStopPips: 21,
			AssetType: "Barrels",
			AssetSymbol: "$",
			OpenUntilDate: "15/08/2009",
			OpenUntilTime: "15:45:05",
			CreationDate: "21/09/2010",
			CreationTime: "14:59:59",
			CurrentRate: 123.34,
			ExchangeSymbol: "c$"
		}],
		ListType: "Update"
	})
}
OrdersHSM.HandleOrders = function (b) {
	var c = VerifyProperties(["AOrdersList", "ListType", "IsOnlyLiveOrders"], b);
	if (c) ReportErrors(c);
	else {
		var d;
		GlobalDs.DSHasOnlyLiveOrders = b.IsOnlyLiveOrders;
		CloseProcessingForm();
		c = b.AOrdersList;
		if (c !== null)
			if (ECommListType.All === StringToECommListType(b.ListType)) {
				OrdersHSM.ClearCache();
				$("#main_orders_tbl_p2").html("");
				var e = null;
				b = 0;
				for (d = c.length; b < d; ++b) {
					var f = c[b];
					if (createOrderAndAddToOrdersTable(f) && e === null) e = f
				}
				if (hasFlash)
					if (e !== null) {
						c = e.OID;
						if (typeof c == "string") c =
							parseInt(c, 10);
						b = e.InstrumentID;
						if (typeof b == "string") b = parseInt(b, 10);
						updateOrdersChartIfNeeded(b, c)
					} else updateOrdersChartIfNeeded(0, 0)
			} else {
				b = 0;
				for (d = c.length; b < d; ++b) {
					e = c[b];
					if ($("#order_id" + e.OID).length === 0) break;
					f = createOrderTemplateObject(e);
					f = $("#order_row_template").jqote(f)[0];
					$orders_table_root.find("#order_id" + e.OID).replaceWith(f)
				}
			}
		ordersUpdateZebraRows();
		updateAOrderTabHeader()
	}
};

function CreateAorderTemplateFieldsObject(b, c, d, e, f, h, g, l, n) {
	this.InstrumentID = c;
	this.type = d;
	this.currentRate = e;
	this.precisionDigits = f;
	this.orderID = b;
	this.assetSymbol = h;
	this.assetType = g;
	this.instrumentType = l;
	this.DisallowCharts = n
}

function readOrderTableOrderID(b) {
	return b.data("OrderInfo").orderID
}

function readOrderTablePrecisionDigits(b) {
	return b.data("OrderInfo").precisionDigits
}

function readOrderTableCurrentRate(b) {
	return b.data("OrderInfo").currentRate
}

function readOrderTableInstrumentID(b) {
	return b.data("OrderInfo").InstrumentID
}

function readOrderTableType(b) {
	return b.data("OrderInfo").type
}

function readOrderTableDisallowCharts(b) {
	return b.data("OrderInfo").DisallowCharts
}
OrdersHSM.HandleOrdersFeed = function (b) {
	var c = VerifyProperties(["Feeds"], b);
	if (c) ReportErrors(c);
	else {
		var d = b.Feeds;
		if (c = VerifyProperties(["BuyRate", "SellRate", "InstrumentID", "DailyHigh", "DailyLow", "Change"], d[0])) ReportErrors(c);
		else {
			var e = 0;
			for (b = d.length; e < b; ++e) {
				c = OrdersHSM.GetOrdersFromCache(d[e].InstrumentID);
				$.each(c, function (f, h) {
					updateOrderFeed(h, d[e].BuyRate, d[e].SellRate)
				})
			}
		}
	}
};
OrdersHSM.HandleInstrumentsUpdate = function (b) {
	var c = VerifyProperties(["InstrumentTradeStatuses"], b);
	if (c) ReportErrors(c);
	else {
		b = b.InstrumentTradeStatuses;
		if (c = VerifyProperties(["InstrumentID", "IsTraded", "IsLive", "InstrumentStatus", "DisallowCharts"], b[0])) ReportErrors(c);
		else {
			c = 0;
			for (var d = b.length; c < d; ++c) {
				var e = b[c],
					f = StringToEInstrumentStatus(e.InstrumentStatus),
					h = b[c].DisallowCharts;
				e = OrdersHSM.GetOrdersFromCache(e.InstrumentID);
				$.each(e, function (g, l) {
					if (hasFlash && currentOrdersGraphOrder == readOrderTableOrderID(l) &&
						h) {
						$("#main_orders_graph_title").text("");
						$("#main_orders_graph_over").css("visibility", "hidden");
						currentOrdersGraphInstrument = null
					}
					hideOrdersOnFrozenInstruments(l, f)
				})
			}
		}
	}
};

function hideOrdersOnFrozenInstruments(b, c) {
	if (c == EInstrumentStatus.TotallyFreezed) {
		b.find(".order-type-amount-content").text("-");
		b.find(".status-value-content").text("-");
		b.find(".order-rate-content").text("-");
		b.find(".current-rate-content").text("-")
	}
}

function updateOrderFeed(b, c, d) {
	if (!(b === null || b.length === 0)) {
		c = readOrderTableType(b) === EOpType.Sell ? d : c;
		var e = readOrderTablePrecisionDigits(b);
		c = roundToPrecisionDigits(c, e);
		b.data("OrderInfo").currentRate = c;
		if (!b.hasClass("display-none-class")) {
			b.children(":eq(5)").children(":last").text(c);
			if (currentOrdersGraphOrder == readOrderTableOrderID(b))(b = getChart("main_orders")) && b.updateChartOnFeed(d)
		}
	}
}
OrdersHSM.HandleMessages = function (b) {
	OrdersHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.ActiveOrders:
			OrdersHSM.HandleOrders(d);
			break;
		case EClientMessageType.NewOrder:
			OrdersHSM.HandleNewOrder(d);
			break;
		case EClientMessageType.UserCancelOrder:
			OrdersHSM.HandleUserCancelOrder(d);
			break;
		case EClientMessageType.CancelOrder:
			OrdersHSM.HandleCancelOrder(d);
			break;
		case EClientMessageType.ChangeOrderToPosition:
			OrdersHSM.HandleChangeOrderToPosition(d);
			break;
		case EClientMessageType.UpdateOrder:
			OrdersHSM.UpdateOrder(d);
			break;
		case EClientMessageType.Feed:
			OrdersHSM.HandleOrdersFeed(d);
			break;
		case EClientMessageType.InstrumentsUpdate:
			OrdersHSM.HandleInstrumentsUpdate(d);
			break;
		default:
			break
		}
	});
	OrdersHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(OrdersHSM.HandleMessages);
var $orders_table_root, currentOrdersGraphInstrument = null,
	currentOrdersGraphOrder = null,
	ordersUpdateZebraRows = function () {
		$("#main-tabs-show-only").is(":checked") ? $("#main_orders_tbl_p2 > div").removeClass("main-tbl-content-even").not(".display-none-class").filter(":odd").addClass("main-tbl-content-even") : $("#main_orders_tbl_p2 > div").removeClass("main-tbl-content-even").filter(":odd").addClass("main-tbl-content-even")
	};

function update_showpending_visibility() {
	$("#li_orders").hasClass("header_current_tab") ? $("#show_only_live_orders").removeClass("display-none-class") : $("#show_only_live_orders").addClass("display-none-class")
}
var alreadyAlignOrdersDivRightIfNeeded = false;

function alignOrdersDivRightIfNeeded() {
	if ($(".language-dir:first").css("direction").toLowerCase() == "rtl" && !alreadyAlignOrdersDivRightIfNeeded) {
		alreadyAlignOrdersDivRightIfNeeded = true;
		$("#main_orders_tbl_wrapper").scrollLeft($("#main_orders_tbl_p2").width())
	}
}

function startOrdersChartWithFirstOrder() {
	var b = [];
	if ($("#main_orders_tbl_p2").children().length > 0) b = $("#main_orders_tbl_p2").children(":first");
	for (; b.length > 0 && b.hasClass("display-none-class");) b = b.next();
	b.length > 0 && updateOrdersChartIfNeeded(readOrderTableInstrumentID(b), readOrderTableOrderID(b))
}

function findOtherOrderForChart(b) {
	for (var c = b.prev(); c.length > 0 && c.hasClass("display-none-class");) c = c.prev();
	if (c.length === 0)
		if ($("#main_orders_tbl_p2").children().length > 0) c = $("#main_orders_tbl_p2").children(":first");
	for (; c.length > 0 && c.hasClass("display-none-class");) c = c.next();
	if (c.length > 0) updateOrdersChartIfNeeded(readOrderTableInstrumentID(c), readOrderTableOrderID(c));
	else {
		$("#main_orders_graph_title").text("");
		$("#main_orders_graph_over").css("visibility", "hidden");
		b.removeClass("instrument-selected");
		currentOrdersGraphOrder = currentOrdersGraphInstrument = null;
		updateOrdersChartIfNeeded(0, 0)
	}
}

function updateOrdersChartIfOrderNotVisible() {
	var b = $("#main_orders_tbl_p2").find(".instrument-selected");
	b.length > 0 && b.hasClass("display-none-class") && findOtherOrderForChart(b)
}

function updateOrdersChartIfNeeded(b, c) {
	if (typeof c == "number") {
		var d = getChart("main_orders");
		if (d)
			if (c === 0) d.pendingUpdate = false;
			else d.updateChartIfNeeded(b, 0, c)
	}
}

function updateOrdersChart(b, c, d, e) {
	d = $("#order_id" + e);
	if (!readOrderTableDisallowCharts(d)) {
		var f = d.find(".orders-name-content").text(),
			h = false;
		if (readOrderTableType(d) == EOpType.Buy) h = true;
		var g = parseInt($("#main_orders_graph_tools_resolution").val(), 10);
		$("#main_orders_tbl_p2").find(".instrument-selected").removeClass("instrument-selected");
		d.addClass("instrument-selected");
		scrollIntoView(d, $("#main_orders_tbl_wrapper"));
		$("#main_orders_graph_over").css("visibility", "");
		currentOrdersGraphOrder = e;
		if (g == b.currentGraphRes && currentOrdersGraphInstrument == c) b.ReloadChartOffsetIfNeeded(h);
		else {
			currentOrdersGraphInstrument = null;
			b.getNewChartData(c, f, h)
		}
	}
}

function startOrdersChartWithNewData(b, c) {
	var d = getChart("main_orders");
	if (d) {
		var e = $("#order_id" + currentOrdersGraphOrder);
		if (e.length !== 0) {
			e = e.find(".orders-name-content").text();
			currentOrdersGraphInstrument = b.InstrumentID;
			c ? d.startChart(b, e) : d.startTickChart(b, e)
		}
	}
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		if (hasFlash) {
			var b = getChart("main_orders");
			if (!b) return;
			b.updateChartFunction = updateOrdersChart;
			b.chartDataCB = startOrdersChartWithNewData;
			$("#main_orders_tbl_wrapper").removeClass("main-orders-tbl-fullsize");
			$("#main_orders_graph").removeClass("display-none-class");
			$("#main_orders_graph_tools_resolution option[value='" + b.graphSavedSettings.feedResolutionLevel + "']").prop("selected", true);
			$("#main_orders_graph_tools_resolution").change(function () {
				updateOrdersChartIfNeeded(currentOrdersGraphInstrument,
					currentOrdersGraphOrder)
			});
			$("#main_orders_tbl_p2").click(function (c) {
				for (c = $(c.target); !c.hasClass("orders-tbl-content");) {
					if (c.length === 0) return false;
					c = c.parent()
				}
				updateOrdersChartIfNeeded(readOrderTableInstrumentID(c), readOrderTableOrderID(c));
				return false
			})
		} else {
			$("#main_orders_tbl_wrapper").addClass("main-orders-tbl-fullsize");
			$("#main_orders_graph").addClass("display-none-class")
		}
		$orders_table_root = $("#main_orders_tbl_p2");
		$("#main_orders_tbl_p2").click(function (c) {
			var d = $(c.target).parents(".main-tbl-content");
			if (d.length === 0 || d.data("OrderInfo") === null) return false;
			var e = readOrderTableOrderID(d),
				f = d.find(".orders-name-content").text(),
				h = readBuySellModeFromInstRow(d);
			d = readOrderTableInstrumentID(d);
			if ($(c.target).parent().is(".order_cancel_btn")) alertDialog(ALERT_TYPE.atConfirmation, LangJSDict.strSURE_CANCEL_ORDER + " " + e + "?", false, function () {
				SEND_userCancelOrder(new UserCancelOrder(e))
			}, null);
			else if ($(c.target).parent().hasClass("order-edit-btn")) OpenBuySellDialog(d, e, EMainModeType.EditOrder, null, f);
			else if ($(c.target).parent().is(".orders-limit-content")) OpenBuySellDialog(d,
				e, EMainModeType.EditOrder, h, f, {
					closeAtProfit: true
				});
			else $(c.target).parent().is(".orders-stop-content") && OpenBuySellDialog(d, e, EMainModeType.EditOrder, h, f, {
				closeAtLoss: true
			});
			return false
		});
		$("#header_main_tabs").bind(GC.TAB_CHANGED, update_showpending_visibility);
		update_showpending_visibility()
	}
});
MainHSM != undefined && alert("MainHSM is included twice!");
var MainHSM = {};
MainHSM.TimeoutLogoutFlag = false;
MainHSM.BeforeHSM = function () {};
MainHSM.AfterHSM = function () {};
MainHSM.getAccountValueImmCB = function (b) {
	DSHSM.AccountValueArrived(b.AccountValueFeed);
	fillAccountValueRectangle();
	fillFundsManagementAccountFields(true)
};
MainHSM.runStartupFlowIfNeeded = function () {
	if (!GlobalDs.StartUpFlowExecuted) {
		GlobalDs.StartUpFlowExecuted = true;
		SEND_sessionFeedControlImm({
			Enable: true
		});
		selectMenuOnSetDemoOrReal(GlobalDs.IsRealMode);
		processAvailableBonuses();
		var b = !(isAppleMobileOS() || isAndroidOS());
		GlobalDs.IsChatEnabled && b && addLiveChatOption();
		!GlobalDs.IsRealMode && GlobalDs.Brand === "Plus500" && addChallengeOptions();
		b = ApplicationState.readStartUpPageState();
		runStartUpFlow(b, false)
	}
};
MainHSM.HandleGeneralInfo = function () {
	SENDImm_getAccountValueImm({}, MainHSM.getAccountValueImmCB);
	SENDImm_getAvailableBonusesImm({}, function (b) {
		if (!checkIfGeneralFailureReceive(b)) {
			log(b);
			var c = VerifyProperties(["Result", "AvailableBonuses"], b);
			if (c) ReportErrors(c);
			else if (b.Result === "Success") {
				GlobalDs.fillBonusesInfo(b.AvailableBonuses);
				createBonusLinkText();
				MainHSM.runStartupFlowIfNeeded();
				continueIfAccountRegistrationDone()
			}
		}
	})
};
MainHSM.HandleChallengeInfo = function (b) {
	var c = VerifyProperties(["HasRelevantChallengeInfo", "RelevantChallengeInfo"], b);
	if (c) ReportErrors(c);
	else {
		GlobalDs.fillChallengeInfo(b.HasRelevantChallengeInfo, b.RelevantChallengeInfo);
		selectMenuOnChallengeInfo();
		GlobalDs.ChallengeInfo && GlobalDs.ChallengeInfo.Status == EChallengeStatus.InProgress ? $("#in_challenge_notification").removeClass("display-none-class") : $("#in_challenge_notification").addClass("display-none-class")
	}
};
MainHSM.SendGetClosedPositions = function () {
	SEND_getClosedPositions({
		DaysBack: GC.CP_DEFAULT_DAYS_BACK
	})
};
MainHSM.HandleServerReady = function (b) {
	if (getDisplayPageType() === EPageType.Trade)(b = VerifyProperties(["WelcomeMsg"], b)) ? ReportErrors(b) : SEND_getGeneralInfo()
};
MainHSM.HandleCategoriesStructure = function (b) {
	var c = $("#main_trade_categories_p2_categories");
	scrollAndroid("main_trade_categories_p2");
	for (var d = 0, e = b.InstrumentsCategories.length; d < e; d++) {
		var f = createTradingCategoriesTree(b.InstrumentsCategories[d].Name, b.InstrumentsCategories[d].InstrumentsSubCategories, d === e - 1);
		c.append(f)
	}
	scrollAndroid("main_trade_categories_p2");
	TCB.tradingCategories_addClickHandlers();
	$("#cat1_sc0").addClass("sub_category_menu_item_selected");
	startLoadingAnimGif();
	b = $.cookie(appCookies.LastCategory);
	if (b === null || b === "" || $("#" + b).length === 0) b = "cat1_sc0";
	$("#" + b).click();
	changedCategory = false
};
MainHSM.ReconnectLogin = function () {
	OpenProcessingForm();
	var b = readIsRealModeToCookie(),
		c = $.cookie(appCookies.UserName);
	b = {
		isRealMode: b,
		userName: c,
		isReconnect: true
	};
	c = '<form action="' + LangJSDict.urlLOGIN + '" method="POST">';
	var d;
	for (d in b) c += '<input type="hidden" name="' + encodeURIComponent(d) + '" value="' + b[d] + '" />';
	c += "</form>";
	$(c).prependTo("body").submit()
};
MainHSM.HandleSubSessionEndedOrMissingALREADY_DONE = false;
MainHSM.HandleCometRetriesFailed = function () {
	log("Too many comet retries failed! aborting!");
	MainHSM.HandleSubSessionEndedOrMissing()
};
MainHSM.HandleSubSessionEndedOrMissing = function () {
	if (!this.HandleSubSessionEndedOrMissingALREADY_DONE) {
		this.HandleSubSessionEndedOrMissingALREADY_DONE = true;
		StopCometRequest();
		StopWebClientConfigurationTimer();
		var b = LangJSDict.strFORCE_LOGOUT_RECONNECT;
		if (this.TimeoutLogoutFlag) {
			this.TimeoutLogoutFlag = false;
			b = LangJSDict.strFORCE_INACTIVITY_LOGOUT_RECONNECT
		}
		userHasRequestedLogout || alertDialog(ALERT_TYPE.atConfirmation, b, true, MainHSM.ReconnectLogin, function () {
			OpenProcessingForm();
			window.open(LangJSDict.urlLOGIN,
				"_self")
		})
	}
};
MainHSM.HandleWebPublishTermination = function (b) {
	var c = VerifyProperties(["DelayBeforeReLogin"], b);
	if (c) ReportErrors(c);
	else if (!this.HandleSubSessionEndedOrMissingALREADY_DONE) {
		this.HandleSubSessionEndedOrMissingALREADY_DONE = true;
		StopCometRequest();
		StopWebClientConfigurationTimer();
		c = LangJSDict.strFORCE_LOGOUT_RECONNECT;
		var d = 0;
		if (typeof b.DelayBeforeReLogin == "number") d += b.DelayBeforeReLogin;
		var e = (new Date).getTime() + d * 1E3;
		b = new Date(e);
		$.cookie(appCookies.PreparingForPublish, b, {
			expires: b,
			path: "/"
		});
		alertDialog(ALERT_TYPE.atConfirmation, c, true, function () {
			var f = e - (new Date).getTime();
			OpenConnectingForm(undefined, undefined, f, MainHSM.ReconnectLogin)
		}, function () {
			OpenProcessingForm();
			window.open(LangJSDict.urlLOGIN, "_self")
		})
	}
};
MainHSM.HandleProcessOrderRejected = function (b) {
	var c = VerifyProperties(["OrderID", "ErrorMsg"], b);
	c ? ReportErrors(c) : alertDialog(ALERT_TYPE.atError, b.ErrorMsg, false, null, null)
};
MainHSM.HandleChangePositionRejected = function (b) {
	var c = VerifyProperties(["PositionID", "ErrorMsg"], b);
	c ? ReportErrors(c) : alertDialog(ALERT_TYPE.atError, b.ErrorMsg, false, null, null)
};
MainHSM.HandleAccountValueFeed = function (b) {
	var c = VerifyProperties(["AccountValueFeed"], b);
	if (c) ReportErrors(c);
	else {
		DSHSM.AccountValueArrived(b.AccountValueFeed);
		fillAccountValueRectangle();
		fillFundsManagementAccountFields()
	}
};
MainHSM.HandleDemoBalanceIncreased = function (b) {
	var c = VerifyProperties(["Amount", "UserMessage"], b);
	if (c) ReportErrors(c);
	else {
		alertDialog(ALERT_TYPE.atInfo, b.UserMessage, false, null, null);
		SENDImm_getAccountValueImm({}, MainHSM.getAccountValueImmCB)
	}
};
MainHSM.HandleMessages = function (b) {
	MainHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.ServerReady:
			MainHSM.HandleServerReady(d);
			break;
		case EClientMessageType.GeneralInfo:
			MainHSM.HandleGeneralInfo(d);
			break;
		case EClientMessageType.CategoriesStructure:
			MainHSM.HandleCategoriesStructure(d);
			break;
		case EClientMessageType.SubSessionEnded:
		case EClientMessageType.SubSessionMissing:
		case EClientMessageType.HttpSessionEnded:
			MainHSM.HandleSubSessionEndedOrMissing(d);
			break;
		case EClientMessageType.WebPublishTermination:
			MainHSM.HandleWebPublishTermination(d);
			break;
		case EClientMessageType.ProcessOrderRejected:
			MainHSM.HandleProcessOrderRejected(d);
			break;
		case EClientMessageType.ChangePositionRejected:
			MainHSM.HandleChangePositionRejected(d);
			break;
		case EClientMessageType.AccountValueFeed:
			MainHSM.HandleAccountValueFeed(d);
			break;
		case EClientMessageType.DemoBalanceIncreased:
			MainHSM.HandleDemoBalanceIncreased(d);
			break;
		case EClientMessageType.ChallengeInfo:
			MainHSM.HandleChallengeInfo(d);
			break;
		default:
			break
		}
	});
	MainHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(MainHSM.HandleMessages);

function setDisplayNoneToAccountRegistrationDivs() {
	$fsa1.addClass("display-none-class");
	$fsa2.addClass("display-none-class");
	$fsa3.addClass("display-none-class");
	$fsa1.removeClass("fsa_step1_of_2");
	$fsa2.removeClass("fsa_step2_of_2");
	$step1_text.removeClass("step1-text-wide");
	$step2_text.removeClass("step2-text-wide");
	$step1_text.removeClass("fsa-step-current fsa-step-done display-none-class");
	$step2_text.removeClass("fsa-step-current fsa-step-done fsa-step-future display-none-class");
	$step3_text.removeClass("fsa-step-current fsa-step-done fsa-step-future display-none-class")
}

function setUserQuetionnaireImmCB(b) {
	CloseProcessingForm();
	var c = VerifyProperties(["SecuredResultCode"], b);
	if (c) ReportErrors(c);
	else if (StringToESecuredServiceResult(b.SecuredResultCode) == ESecuredServiceResult.Success) {
		GlobalDs.MarkFlowPrerequisiteAsFullFilled(EFlowPrerequisite.Questionnaire);
		$aReg.dialog("close");
		startUpFlow.continueFlow()
	} else alertDialog(ALERT_TYPE.atError, LangJSDict.strQUESTIONNAIRE_NOT_SUFFICIENT, false, null, null)
}

function chooseStepAndOpenAccountRegistration(b) {
	initIfNeededAccountRegistrationBehaviors();
	setDisplayNoneToAccountRegistrationDivs();
	if (b !== -1) {
		$("#fsa_before_choose_step").addClass("display-none-class");
		var c = GlobalDs.IsDepositPrerequisiteFullFilled(EFlowPrerequisite.Documents) && b != 3,
			d = LangJSDict.strREGISTRATION_STEP_DONE_DEFAULT_DESC,
			e = $.grep(GlobalDs.Bonuses, function (f) {
				return f.BonusEventType == EBonusEvent.PhotoIDApproved
			});
		if (e.length > 0 && !c) d = LangJSDict.strREGISTRATION_STEP_DONE_DESC.replace("%s",
			e[0].BonusAmountInUBC + " " + GlobalDs.UserBaseCurrencySymbol);
		GeneralUI.RightToLeftLanguage ? $aReg.find(".fsa-trade-text").html("<PRE>" + d + "</PRE>") : $aReg.find(".fsa-trade-text").text(d);
		if (c) {
			$step3_text.addClass("display-none-class");
			$fsa1.addClass("fsa_step1_of_2");
			$fsa2.addClass("fsa_step2_of_2");
			$step1_text.addClass("step1-text-wide");
			$step2_text.addClass("step2-text-wide")
		} else {
			$fsa1.addClass("fsa_step1_of_3");
			$fsa2.addClass("fsa_step2_of_3")
		}
		switch (b) {
		case 1:
			$fsa1.removeClass("display-none-class");
			$step1_text.addClass("fsa-step-current");
			$step2_text.addClass("fsa-step-future");
			$step3_text.addClass("fsa-step-future");
			break;
		case 2:
			$fsa2.removeClass("display-none-class");
			$step1_text.addClass("fsa-step-done");
			$step2_text.addClass("fsa-step-current");
			$step3_text.addClass("fsa-step-future");
			$aReg.dialog("open");
			$("#fsa_step2").addClass("loading");
			SENDImm_getUserQuetionnaireImm({}, function (f) {
				$("#fsa_step2").removeClass("loading");
				if (StringToESecuredServiceResult(f.SecuredResultCode) == ESecuredServiceResult.Success &&
					f.Questions.length > 0) {
					requierdQuestions = [];
					f = f.Questions.split(",");
					for (var h = 0; h < f.length; h++) {
						requierdQuestions.push(StringToEAQuestionsType(f[h]));
						$fsa2.find(".question_" + f[h]).removeClass("display-none-class")
					}
				}
			});
			break;
		default:
			ReportErrors("goToAccountRegistrastionStep: the number of the step is not valid " + b);
			return
		}
	}
}

function checkComboBoxVisibleAndSelected(b) {
	return !b.is(":visible") || checkComboBox(b, b, 1)
}

function testFSAExperienceQuestionsValidAndSubmit() {
	var b = true;
	$("#fsa_step2").find("*").removeClass(GC.FIELD_ERR_CLASS);
	b = checkComboBoxVisibleAndSelected($("#fsa_selsect_securities")) && b;
	b = checkComboBoxVisibleAndSelected($("#fsa_selsect_forex")) && b;
	b = checkComboBoxVisibleAndSelected($("#fsa_selsect_futures")) && b;
	b = checkComboBoxVisibleAndSelected($("#fsa_selsect_cfds")) && b;
	b = checkComboBoxVisibleAndSelected($("#fsa_select_commodities")) && b;
	b = checkComboBoxVisibleAndSelected($("#fsa_select_knowledge_source")) &&
		b;
	b = checkComboBoxVisibleAndSelected($("#asic_select_knowledge_source")) && b;
	b = checkComboBoxVisibleAndSelected($("#fsa_select_trading_frequency")) && b;
	if (!$("#fsa_checkbox_").is(":checked") && $("#fsa_step2_checkbox_part").is(":visible") && b) {
		b = false;
		alertDialog(ALERT_TYPE.atError, LangJSDict.strQUESTIONNAIRE_OWN_USE, false, null, null)
	}
	if (!b) return false;
	b = [];
	for (var c = 0; c < requierdQuestions.length; c++) requierdQuestions[c] == EAQQuestions.FSAUnderstandCFD || requierdQuestions[c] == EAQQuestions.ASICWarning ? b.push($fsa2.find(".question_" +
		EAQuestionsTypeToString(requierdQuestions[c])).find("input").is(":checked") ? StringToEAQAnswersType("Yes") : StringToEAQAnswersType("No")) : b.push($fsa2.find(".question_" + EAQuestionsTypeToString(requierdQuestions[c])).find("select").val());
	OpenProcessingForm();
	SENDImm_setUserQuetionnaireImm(new UserQuetionnaire(requierdQuestions, b), setUserQuetionnaireImmCB);
	return true
}
var $fsa1, $fsa2, $fsa3, $step1_text, $step2_text, $step3_text, $steps_div, file_upload_status = {}, file_upload_input = {}, file_upload_submit = {}, requierdQuestions = [];
$(document).ready(function () {
	$aReg = $("#account_registration_dialog");
	$fsa1 = $("#fsa_step1");
	$fsa2 = $("#fsa_step2");
	$fsa3 = $("#fsa_step3");
	$step1_text = $(".step1-text");
	$step2_text = $(".step2-text");
	$step3_text = $(".step3-text");
	$("#step1").click(function () {
		openAccountRegistration();
		return false
	});
	$("#step2").click(function () {
		chooseStepAndOpenAccountRegistration(2);
		return false
	});
	for (var b = $("#fsa_drop_down #areg_day"), c = 1; c <= 31; c++) $('<option value="' + c + '">' + c + "</option>").appendTo(b);
	b = $("#fsa_drop_down #areg_year");
	for (c = 2E3; c >= 1920; c--) $('<option value="' + c + '">' + c + "</option>").appendTo(b);
	$("#fsa_step_btn #fsa_cancel").click(function () {
		$aReg.dialog("close");
		return false
	});
	$("#fsa_ok").click(function () {
		testAccountRegistrationInfoIsValidAndSubmit();
		return false
	});
	$("#fsa_step2_cancel").click(function () {
		$aReg.dialog("close");
		return false
	});
	$("#fsa_step2_ok").click(function () {
		testFSAExperienceQuestionsValidAndSubmit();
		return false
	})
});

function fillTheRightSumInFsaTrade() {
	var b = $("#fsa_trade_text"),
		c = b.text();
	c = c.replace("%s", "!!! " + GlobalDs.UserBaseCurrencySymbol);
	b.text(c);
	b.removeClass("display-none-class")
}
PriceAlertsListHSM != undefined && alert("PriceAlertsListHSM is included twice!");
var rateAlerts = {};
$(document).ready(function () {
	getDisplayPageType()
});
var PriceAlertsListHSM = {};
PriceAlertsListHSM.BeforeHSM = function () {};
PriceAlertsListHSM.AfterHSM = function () {};
PriceAlertsListHSM.HandleRateAlerts = function (b) {
	var c = VerifyProperties(["RateAlerts", "ListType"], b);
	if (c) ReportErrors(c);
	else {
		if (StringToECommListType(b.ListType) == ECommListType.All) rateAlerts = b.RateAlerts;
		else {
			var d = $.grep(getKeys(rateAlerts), function (e) {
				return StringToERateAlertStatus(rateAlerts[e].Status) == ERateAlertStatus.Fired
			});
			rateAlerts = $.extend({}, rateAlerts, b.RateAlerts);
			b = $.grep(getKeys(rateAlerts), function (e) {
				return StringToERateAlertStatus(rateAlerts[e].Status) == ERateAlertStatus.Fired
			});
			$.each(b, function (e, f) {
				$.inArray(f, d) == -1 && alertDialog(ALERT_TYPE.atInfo, LangJSDict.strRATE_ALERT_FIRED_LONG.replace("%s", rateAlerts[f].InstrumentName).replace("%s", roundToPrecisionDigits(rateAlerts[f].Rate, rateAlerts[f].PrecisionDigits)), false, null, null)
			})
		}
		updateRateAlertsGUI(rateAlerts);
		refreshPriceAlertsListDialog()
	}
};
PriceAlertsListHSM.HandleCancelRateAlert = function (b) {
	var c = VerifyProperties(["RateAlertID", "RequestStatus", "CancelRateAlertRejectReason"], b);
	if (c) ReportErrors(c);
	else if (StringToERequestStatus(b.RequestStatus) == ERequestStatus.Approved) {
		delete rateAlerts[b.RateAlertID];
		$("#alert_" + b.RateAlertID).fadeOut("slow", function () {
			refreshPriceAlertsListDialog()
		});
		updateRateAlertsGUI(rateAlerts)
	}
};
PriceAlertsListHSM.HandleProcessRateAlert = function (b) {
	var c = VerifyProperties(["RateAlertID", "RequestStatus", "RateAlertRejectReason", "RateAlert"], b);
	if (c) ReportErrors(c);
	else {
		if (StringToERequestStatus(b.RequestStatus) == ERequestStatus.Approved) {
			rateAlerts[b.RateAlertID] = b.RateAlert;
			refreshPriceAlertsListDialog();
			updateRateAlertsGUI(rateAlerts)
		} else StringToERateAlertRejectReason(b.RateAlertRejectReason) == ERateAlertRejectReason.InvalidRate ? alertDialog(ALERT_TYPE.atError, LangJSDict.strRATE_ALERT_SAME_ERR,
			false, null, null) : alertDialog(ALERT_TYPE.atError, LangJSDict.strRATE_ALERT_REJECT_ERR, false, null, null);
		$priceAlerts.dialog("close")
	}
};
PriceAlertsListHSM.HandleMessages = function (b) {
	PriceAlertsListHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.RateAlerts:
			PriceAlertsListHSM.HandleRateAlerts(d);
			break;
		case EClientMessageType.CancelRateAlert:
			PriceAlertsListHSM.HandleCancelRateAlert(d);
			break;
		case EClientMessageType.ProcessRateAlert:
			PriceAlertsListHSM.HandleProcessRateAlert(d);
			break;
		default:
			break
		}
	});
	PriceAlertsListHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(PriceAlertsListHSM.HandleMessages);
var $priceAlertsList, $priceAlertsTable, $priceAlertsAddAlert, priceAlertsInstrumentID = null;
$(document).ready(function () {
	if (getDisplayPageType() !== EPageType.Trade) return false;
	$priceAlertsTable = $("#price_alerts_list_data");
	$priceAlertsAddAlert = $("#price_al_list_add_alert");
	$priceAlertsList = $("#price_alerts_list_dialog");
	$priceAlertsList.dialog({
		iphoneMaxWidth: 300,
		iphoneMaxHeight: 210,
		autoOpen: false,
		modal: true,
		resizable: false,
		width: GeneralUI.PriceAlertsListWidth,
		open: function () {
			if (priceAlertsInstrumentID !== null) {
				$priceAlertsAddAlert.removeClass("std-button-disabled");
				$.grep(getKeys(rateAlerts),
					function (b) {
						return rateAlerts[b].InstrumentID == priceAlertsInstrumentID && StringToERateAlertStatus(rateAlerts[b].Status) == ERateAlertStatus.Pending
					}).length === 0 && openPriceAlertsDialog(EModificationType.New, priceAlertsInstrumentID)
			}
		}
	});
	$priceAlertsList.find(".price-al-list-notifications").click(function () {
		openNotificationsDialog();
		return false
	});
	$priceAlertsTable.click(function (b) {
		if ($(b.target).is(".price-al-list-edit-link")) {
			b = $(b.target).parents(".alert_row_class").attr("id");
			if (b.indexOf("alert_") !==
				0) return false;
			b = parseInt(b.split("alert_")[1], 10);
			openPriceAlertsDialog(EModificationType.Update, b)
		}
		return false
	});
	$priceAlertsTable.click(function (b) {
		if ($(b.target).is(".price-al-list-cancel-link")) {
			b = $(b.target).parents(".alert_row_class").attr("id");
			if (b.indexOf("alert_") !== 0) return false;
			b = parseInt(b.split("alert_")[1], 10);
			SEND_cancelRateAlert(new CancelRateAlert(b))
		}
		return false
	});
	$priceAlertsAddAlert.click(function () {
		priceAlertsInstrumentID !== null ? openPriceAlertsDialog(EModificationType.New,
			priceAlertsInstrumentID) : alertDialog(ALERT_TYPE.atInfo, LangJSDict.WEB_strADD_RATE_ALERT_FROM_INSTRUMENT_BELL, false, null, null);
		return false
	});
	$("#button_test_area").find("#price_alerts_list").click(function () {
		openPriceAlertsListDialog();
		return false
	});
	$priceAlertsList.find("#price_alerts_list_close").click(function () {
		$priceAlertsList.dialog("close");
		return false
	});
	return false
});

function refreshPriceAlertsListDialog() {
	$priceAlertsTable.empty();
	$.each(rateAlerts, function (b, c) {
		if (StringToERateAlertStatus(c.Status) == ERateAlertStatus.Pending) {
			b = {
				alert_id: c.RateAlertID,
				instrument_name: c.InstrumentName,
				rate: roundToPrecisionDigits(c.Rate, c.PrecisionDigits),
				above: c.IsAbove ? "above" : "below",
				date: dateToDisplayDateAndTime(stdFormatUTCToLocalDateTime(c.CreationDate)),
				extra_class: c.InstrumentID == priceAlertsInstrumentID ? "price-al-list-row-current-instrument" : ""
			};
			$("#alert_row_template").jqote(b)[0].appendTo($priceAlertsTable)
		}
	});
	$("#price_alerts_list_data > div").removeClass("main-tbl-content-even").not(".clear0").filter(":odd").addClass("main-tbl-content-even")
}

function openPriceAlertsListDialog(b) {
	priceAlertsInstrumentID = null;
	if (typeof b == "number") priceAlertsInstrumentID = b;
	refreshPriceAlertsListDialog();
	$priceAlertsList.dialog("open")
}
var $alert_price, $alert_instrument_name, $priceAlerts, priceAlertItemID = null,
	priceAlertModType = null,
	priceAlertInstrumentID = 0;

function submitPriceAlert() {
	if ($(this).hasClass("std-button-disabled")) return false;
	if ($.grep(getKeys(rateAlerts), function (c) {
		return rateAlerts[c].InstrumentID == priceAlertsInstrumentID && StringToERateAlertStatus(rateAlerts[c].Status) == ERateAlertStatus.Pending && rateAlerts[c].Rate == parseFloatCultured($alert_price.val())
	}).length > 0) {
		$priceAlerts.dialog("close");
		return false
	}
	var b = new Date;
	b.setTime(b.getTime() + GC.ALERT_EXPIRY_DISTANCE_SECONDS * 1E3);
	b = new ProcessRateAlert(EModificationTypeToString(priceAlertModType),
		priceAlertModType == EModificationType.New ? null : priceAlertItemID, priceAlertInstrumentID, $alert_instrument_name.text(), EOpTypeToString(EOpType.Sell), parseFloatCultured($alert_price.val()), dateToStdFormat(b));
	SEND_processRateAlert(b);
	return false
}
$(document).ready(function () {
	if (getDisplayPageType() !== EPageType.Trade) return false;
	$priceAlerts = $("#price_alerts_dialog");
	$("#button_test_area").find("#price_alerts").click(function () {
		var b = $("#main_instruments_tbl_p2").children().first();
		b = getInstrumentID(b.attr("id"), "_i");
		openPriceAlertsDialog(EModificationType.New, b);
		return false
	});
	$priceAlerts.find("#price_alerts_cancel").click(function () {
		$priceAlerts.dialog("close");
		return false
	});
	$alert_price = $("#alert_rate");
	$alert_instrument_name = $("#price_alert_instrument_name");
	$priceAlerts.dialog({
		iphoneMaxWidth: 300,
		iphoneMaxHeight: 210,
		autoOpen: false,
		modal: true,
		resizable: false,
		width: GeneralUI.PriceAlertsWidth,
		open: function () {
			var b, c;
			if (priceAlertModType == EModificationType.New) {
				priceAlertInstrumentID = priceAlertItemID;
				b = $("#trade_i" + priceAlertItemID);
				$alert_instrument_name.text(b.find(".instrument-name-content").text());
				c = parseFloatCultured(b.find(".buy-sell-content").first().text());
				b = readPrecisionDigitToInstRow(b);
				c += 10 * getPipValue(b)
			} else {
				priceAlertInstrumentID = rateAlerts[priceAlertItemID].InstrumentID;
				$alert_instrument_name.text(rateAlerts[priceAlertItemID].InstrumentName);
				c = rateAlerts[priceAlertItemID].Rate;
				b = rateAlerts[priceAlertItemID].PrecisionDigits
			}
			var d = getPipValue(b);
			d = {
				min: c / 2,
				max: c * 2,
				step: d,
				bigStep: d * 10,
				scale: b
			};
			$alert_price.spinbox("destroy").spinbox(d).spinbox("disable");
			$alert_price.val(roundToPrecisionDigits(c, b));
			$alert_price.spinbox("enable")
		}
	});
	$("#price_alerts_ok").click(submitPriceAlert);
	return false
});

function openPriceAlertsDialog(b, c) {
	priceAlertItemID = c;
	priceAlertModType = b;
	$priceAlerts.dialog("open")
}
AddressValidationDialogHSM != undefined && alert("AddressValidationDialogHSM is included twice!");
var AddressValidationDialogHSM = {};
AddressValidationDialogHSM.BeforeHSM = function () {};
AddressValidationDialogHSM.AfterHSM = function () {};
AddressValidationDialogHSM.HandleGeneralInfo = function () {
	enableDisableAddressValidationLink()
};
AddressValidationDialogHSM.HandleMessages = function (b) {
	AddressValidationDialogHSM.BeforeHSM(b);
	$.each(b, function (c, d) {
		(c = VerifyProperties(["Type"], d)) && ReportErrors(c);
		switch (d.Type) {
		case EClientMessageType.GeneralInfo:
			AddressValidationDialogHSM.HandleGeneralInfo(d);
			break;
		default:
			break
		}
	});
	AddressValidationDialogHSM.AfterHSM(b)
};
CentralHSM.RegisterMsgHandler(AddressValidationDialogHSM.HandleMessages);
var $addressValidation, $addressValidation_firstName, $addressValidation_lastName, $addressValidation_street, $addressValidation_city, $addressValidation_zip, $addressValidation_country, $addressValidation_addressFields, $addressValidation_code, $addressValidation_sendLetter, $addressValidation_sendCode;

function enableDisableAddressValidationLink() {
	var b = (isFSARegulated || isASICRegulated) && GlobalDs.IsDeposited && GlobalDs.AddressVerifyStatus != EAddressVerifyStatus.Verified;
	$("#funds_validate_address").toggleClass("display-none-class", !b)
}

function addressValidationOpened() {
	$addressValidation_firstName.val(GlobalDs.PersonalInfo.FName);
	$addressValidation_lastName.val(GlobalDs.PersonalInfo.LName);
	$addressValidation_street.val(GlobalDs.PersonalInfo.Address);
	$addressValidation_city.val(GlobalDs.PersonalInfo.City);
	$addressValidation_zip.val(GlobalDs.PersonalInfo.Zip);
	$addressValidation_country.empty();
	$('<option selected="selected">' + GlobalDs.PersonalInfo.Country + "</option>").appendTo($addressValidation_country);
	GlobalDs.AddressVerifyStatus ==
		EAddressVerifyStatus.NotSent ? $addressValidation_sendLetter.removeClass("std-button-disabled") : $addressValidation_sendLetter.addClass("std-button-disabled");
	if (GlobalDs.AddressVerifyStatus == EAddressVerifyStatus.Sent) {
		$addressValidation_sendCode.removeClass("std-button-disabled");
		$("#addval_letter_sent").removeClass("display-none-class")
	} else {
		$addressValidation_sendCode.addClass("std-button-disabled");
		$("#addval_letter_sent").addClass("display-none-class")
	}
}

function sendAddressValidationInfoRequestCB(b) {
	CloseProcessingForm();
	var c = VerifyProperties(["SecuredResultCode"], b);
	if (c) ReportErrors(c);
	else if (StringToESecuredServiceResult(b.SecuredResultCode) == ESecuredServiceResult.Success) {
		$addressValidation_sendLetter.addClass("std-button-disabled");
		$addressValidation_sendCode.removeClass("std-button-disabled");
		GlobalDs.AddressVerifyStatus = EAddressVerifyStatus.Sent;
		alertDialog(ALERT_TYPE.atInfo, LangJSDict.strADDRESS_VALIDATION_SENT_SUCCESSFULLY, false, null,
			null);
		$("#addval_letter_sent").removeClass("display-none-class")
	} else alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" + b.SecuredResultCode], false, null, null)
}

function sendAddressValidationInfoRequest() {
	OpenProcessingForm();
	var b = new SendAddressVerfication($addressValidation_city.val(), $addressValidation_street.val(), $addressValidation_zip.val());
	SENDImm_sendAddressVerificationImm(b, sendAddressValidationInfoRequestCB)
}

function testAddressValidationInfoIsValidAndSubmit() {
	if ($(this).hasClass("std-button-disabled")) return false;
	$addressValidation_addressFields.removeClass(GC.FIELD_ERR_CLASS);
	var b = true;
	b = checkLength($addressValidation_street, GC.STREET_MIN_LENGTH, GC.MAX_LENGTH) && b;
	b = checkRegexp($addressValidation_street, GC.NON_ALPHANUM_CHARS_REG_EXP, false) && b;
	b = checkRegexp($addressValidation_zip, GC.ZIP_CITY_REG_EXP) && b;
	(b = checkRegexp($addressValidation_city, GC.NON_ALPHANUM_CHARS_REG_EXP, false) && b) && sendAddressValidationInfoRequest();
	return false
}

function sendVerifyAddressRequestCB(b) {
	CloseProcessingForm();
	var c = VerifyProperties(["SecuredResultCode"], b);
	if (c) ReportErrors(c);
	else if (StringToESecuredServiceResult(b.SecuredResultCode) == ESecuredServiceResult.Success) {
		$addressValidation_sendCode.addClass("std-button-disabled");
		GlobalDs.AddressVerifyStatus = EAddressVerifyStatus.Verified;
		alertDialog(ALERT_TYPE.atInfo, LangJSDict.strADDRESS_VALIDATION_SUCCESSFUL, false, function () {
			$addressValidation.dialog("close")
		}, null);
		$("#funds_validate_address").addClass("display-none-class")
	} else alertDialog(ALERT_TYPE.atError, LangJSDict["strREASON_" +
		b.SecuredResultCode], false, null, null)
}

function sendVerifyAddressRequest() {
	OpenProcessingForm();
	var b = new VerifyAddress($addressValidation_code.val());
	SENDImm_verifyAddressImm(b, sendVerifyAddressRequestCB)
}

function testVerifyAddressIsValidAndSubmit() {
	if ($(this).hasClass("std-button-disabled")) return false;
	$addressValidation_code.removeClass(GC.FIELD_ERR_CLASS);
	var b = true;
	b = checkLength($addressValidation_code, GC.ADDRESS_VERIFICATION_CODE_LENGTH, GC.ADDRESS_VERIFICATION_CODE_LENGTH) && b;
	(b = checkRegexp($addressValidation_street, GC.DIGITS_REG_EXP, true) && b) && sendVerifyAddressRequest();
	return false
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$addressValidation = $("#address_validation_dialog");
		$addressValidation.dialog({
			iphoneMaxWidth: 660,
			iphoneMaxHeight: 520,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.AddressValidationDialogWidth,
			open: function () {
				addressValidationOpened()
			}
		});
		$addressValidation_firstName = $("#addval_zip_first_name");
		$addressValidation_lastName = $("#addval_zip_last_name");
		$addressValidation_street = $("#addval_zip_street");
		$addressValidation_city =
			$("#addval_zip_city");
		$addressValidation_zip = $("#addval_zip");
		$addressValidation_country = $("#addval_zip_country");
		$addressValidation_addressFields = $([]).add($addressValidation_firstName).add($addressValidation_lastName).add($addressValidation_street).add($addressValidation_city).add($addressValidation_zip).add($addressValidation_country);
		$addressValidation_code = $("#addval_code");
		$addressValidation_code.ivsNumeric();
		$addressValidation_sendLetter = $("#addval_send_letter");
		$addressValidation_sendLetter.click(testAddressValidationInfoIsValidAndSubmit);
		$addressValidation_sendCode = $("#addval_send_code");
		$addressValidation_sendCode.click(testVerifyAddressIsValidAndSubmit);
		$("#addval-close").click(function () {
			$addressValidation.dialog("close");
			return false
		});
		$("#button_test_area").find("#address_validation").click(function () {
			$addressValidation.dialog("open");
			return false
		})
	}
});

function checkAddressValidationAutoOpenOnFundsManagementOpen() {
	!$("#funds_validate_address").hasClass("display-none-class") && GlobalDs.AddressVerifyStatus != EAddressVerifyStatus.Sent && openAddressValidationDialog()
}

function openAddressValidationDialog() {
	$addressValidation.dialog("open")
}
var $rep_from, $rep_to, $rep_download, $reports, rep_download_baseurl, ranInitReportsBehaviors = false;
$(document).ready(function () {
	getDisplayPageType()
});

function initIfNeededReportsBehaviors() {
	if (!ranInitReportsBehaviors)
		if (getDisplayPageType() === EPageType.Trade) {
			$reports = $("#reports_dialog");
			$rep_from = $("#rep_datepicker_from");
			$rep_to = $("#rep_datepicker_to");
			$rep_download = $("#rep_download");
			$reports.dialog({
				iphoneMaxWidth: 630,
				iphoneMaxHeight: 260,
				autoOpen: false,
				modal: true,
				resizable: false,
				width: GeneralUI.ReportsWidth,
				minHeight: GeneralUI.ReportsHeight,
				open: function () {},
				close: function () {},
				iphoneMaxWidth: 500,
				iphoneMaxHeight: 700
			});
			$("#rep_dialog").click(function () {
				openReportsBehaviors();
				return false
			});
			$("#rep_back").click(function () {
				$reports.dialog("close");
				return false
			});
			$rep_from.click(function () {
				$rep_from.datepicker("show");
				return false
			});
			$rep_to.click(function () {
				$rep_to.datepicker("show");
				return false
			});
			rep_download_baseurl = $rep_download[0].href;
			$rep_download.click(function () {
				var c = $rep_from.datepicker("getDate"),
					d = new Date($rep_to.datepicker("getDate").getTime() + GC.SEC_IN_24_HOURS * 1E3);
				if (c > d) {
					alertDialog(ALERT_TYPE.atError, "The first date is later then the second one. Please correct it.  ",
						false, null, null);
					return false
				}
				c = c.format("yyyymmdd");
				d = d.format("yyyymmdd");
				$rep_download[0].href = rep_download_baseurl + "&fdt=" + c + "&tdt=" + d;
				return true
			});
			$rep_from.datepicker({
				showOn: "button",
				buttonImage: "../Content/Images/calendar.gif",
				buttonImageOnly: true
			});
			$rep_to.datepicker({
				showOn: "button",
				buttonImage: "../Content/Images/calendar.gif",
				buttonImageOnly: true
			});
			$("#ui-datepicker-div").css("display", "none");
			var b = new Date;
			b.setMonth(0, 1);
			$rep_from.datepicker("setDate", b);
			$rep_to.datepicker("setDate",
				new Date);
			ranInitReportsBehaviors = true
		}
}

function openReportsBehaviors() {
	initIfNeededReportsBehaviors();
	$reports.dialog("open")
}
var $uploadDocsDialog, $upload_docs_3steps, $upload_docs_forms_area, uploadDocsInit = true,
	uploadDocsRequiredFilesStatusesType = null,
	uploadDocsRequiredFilesFilter = null,
	uploadDocsPassed = false,
	uploadDocsTitles = {
		PhotoID: "strCOPY_OF_PASSPORT",
		ResidenceVerification: "strUTILITY_BILL_OR_BANK_STATEMENT",
		AuthorisationForm: "strAUTHORIZATION_FORM_IN_EMAIL",
		CreditCard: "strCREDIT_CARD_COPY",
		SelfPhoto: "strSELF_PHOTO",
		Other: "strCOPY_OF_PASSPORT"
	};

function UploadDocsFileUploadTemplateFieldsObject(b, c, d) {
	this.id = b;
	this.title = c;
	this.cnt = d
}

function testUploadFileTypeIsValidAndSubmit(b) {
	var c = $("#upload_docs_file_div_" + b),
		d = $("#upload_docs_file_input_" + b);
	c = c.find(".upload_form_class");
	d.removeClass(GC.FIELD_ERR_CLASS);
	if (d.is(":disabled")) return false;
	var e = /^.+\.([^.]+)$/.exec(d.val());
	e = e !== null && e.length == 2 ? e[1].toLowerCase() : "";
	var f = LangJSDict.jsFSAFileExtensions.split(",");
	if ($.inArray(e, f) == -1) {
		d.addClass(GC.FIELD_ERR_CLASS);
		alertDialog(ALERT_TYPE.atError, LangJSDict.strFILE_TYPE_NOT_SUPPORTED, false, null, null);
		return false
	}
	OpenProcessingForm();
	c.ajaxSubmit({
		data: {
			SessionID: pageSessionID,
			SubSessionID: pageSubSessionID
		},
		url: $.trim(c.attr("action")) + "?UserFileType=" + b,
		dataType: "json"
	});
	return false
}

function genTestUploadFileTypeIsValidAndSubmit(b) {
	function c() {
		return testUploadFileTypeIsValidAndSubmit(c.uploadFileType)
	}
	c.uploadFileType = b;
	return c
}

function getRequiredFilesStatusesImmCB(b) {
	CloseProcessingForm();
	var c = VerifyProperties(["SecuredResultCode"], b);
	if (c) ReportErrors(c);
	else if (StringToESecuredServiceResult(b.SecuredResultCode) == ESecuredServiceResult.Success) {
		var d = true;
		if (c = VerifyProperties(["FileStatusInfos"], b)) ReportErrors(c);
		else {
			b = b.FileStatusInfos;
			if (b === null) b = [];
			var e = 0,
				f = "\n",
				h = $(".language-dir:first").css("direction").toLowerCase() == "rtl";
			if (uploadDocsInit) {
				$upload_docs_forms_area.html("");
				for (c = 0; c < b.length; c++) {
					var g = b[c].FileType;
					if ($.inArray(StringToEUserFileType(g), uploadDocsRequiredFilesFilter) != -1) {
						e += 1;
						var l = new UploadDocsFileUploadTemplateFieldsObject(g, LangJSDict[uploadDocsTitles[g]], e);
						l = $("#upload_single_file_template").jqote(l)[0];
						l.appendTo($upload_docs_forms_area);
						l.find("upload_form_class");
						$("#upload_docs_file_input_" + g);
						f = h ? f + LangJSDict[uploadDocsTitles[g]] + " *\n" : f + "* " + LangJSDict[uploadDocsTitles[g]] + "\n";
						$("#upload_docs_file_upload_" + g).click(genTestUploadFileTypeIsValidAndSubmit(g))
					}
				}
			}
			for (c = 0; c < b.length; c++) {
				e =
					b[c].Status;
				h = b[c].FileType;
				if ($.inArray(StringToEUserFileType(h), uploadDocsRequiredFilesFilter) != -1) {
					if (StringToEUserFileStatusType(e) != EUserFileStatus.Accepted) {
						d = false;
						$("#upload_docs_file_input_" + h).prop("disabled", false);
						$("#upload_docs_file_upload_" + h).removeClass("std-button-disabled")
					} else {
						$("#upload_docs_file_input_" + h).prop("disabled", true);
						$("#upload_docs_file_input_" + h).val("");
						$("#upload_docs_file_upload_" + h).addClass("std-button-disabled")
					}
					for (var n in EUserFileStatus) $("#upload_docs_file_status_" +
						h).removeClass("UploadStatus" + n);
					$("#upload_docs_file_status_" + h).text(LangJSDict["strSTATUS_" + e]);
					$("#upload_docs_file_status_" + h).addClass("UploadStatus" + e)
				}
			}
			if (d) {
				if (uploadDocsRequiredFilesStatusesType.RequiredFilesStatusesType == ERequiredFilesStatusesType.Deposit) GlobalDs.MarkDepositFlowPrerequisiteAsFullFilled(EFlowPrerequisite.Documents);
				else uploadDocsRequiredFilesStatusesType.RequiredFilesStatusesType == ERequiredFilesStatusesType.Withdraw && GlobalDs.MarkWithdrawFlowPrerequisiteAsFullFilled(EFlowPrerequisite.Documents);
				uploadDocsPassed = true;
				startUpFlow.continueFlow()
			} else if (uploadDocsInit) {
				if (iphone) {
					f = LangJSDict[isASICRegulated ? "strNO_FS_SEND_DOCS_DESC_ASIC" : "strNO_FS_SEND_DOCS_DESC"].replace("%s", f);
					f = f.replace("%s", "<a href='mailto:" + LangJSDict.strSupportEmail + "'>" + LangJSDict.strSupportEmail + "</a>");
					$upload_docs_forms_area.addClass("display-none-class");
					$("#fsa_step3_bottom_page").html(f.replace(/\n/g, "<BR>"))
				}
				uploadDocsInit = false;
				$uploadDocsDialog.dialog("open")
			}
		}
	}
}

function openUploadDocs(b, c) {
	if (GlobalDs.IsDepositPrerequisiteFullFilled(EFlowPrerequisite.Documents)) $upload_docs_3steps.addClass("display-none-class");
	else {
		$upload_docs_3steps.removeClass("display-none-class");
		var d = LangJSDict.strREGISTRATION_STEP_DONE_DEFAULT_DESC,
			e = $.grep(GlobalDs.Bonuses, function (f) {
				return f.BonusEventType == EBonusEvent.PhotoIDApproved
			});
		if (e.length > 0) d = LangJSDict.strREGISTRATION_STEP_DONE_DESC.replace("%s", e[0].BonusAmountInUBC + " " + GlobalDs.UserBaseCurrencySymbol);
		$("#upload_docs_done_step").text(d)
	}
	uploadDocsInit =
		true;
	uploadDocsRequiredFilesStatusesType = b;
	uploadDocsRequiredFilesFilter = getValues(EUserFileType);
	uploadDocsPassed = false;
	if (typeof c != "undefined" && c !== null) uploadDocsRequiredFilesFilter = c;
	OpenProcessingForm();
	SENDImm_getRequiredFilesStatusesImm(b, function (f) {
		getRequiredFilesStatusesImmCB(f)
	})
}
$(document).ready(function () {
	if (getDisplayPageType() === EPageType.Trade) {
		$uploadDocsDialog = $("#upload_docs_dialog");
		$upload_docs_3steps = $("#upload_docs_3steps");
		$upload_docs_forms_area = $("#upload_docs_forms_area");
		$uploadDocsDialog.dialog({
			iphoneMaxWidth: 730,
			iphoneMaxHeight: 590,
			autoOpen: false,
			modal: true,
			resizable: false,
			width: GeneralUI.AccountRegistrationWidth,
			close: function () {
				uploadDocsInit = true;
				startUpFlow.abortFlowIfFailed()
			}
		});
		$("#fsa_step3_close").click(function () {
			$uploadDocsDialog.dialog("close");
			return false
		});
		$("#upload_docs").click(function () {
			openUploadDocs(new RequiredFilesStatuses(ERequiredFilesStatusesType.AllFiles));
			return false
		})
	}
});
var currChartSetupIndicators = null,
	displayedIndicatorConfig = null,
	$setupIndicators, $activeIndicatorsList, $allIndicatorsList, $ADXDMIIndicator, $AligatorIndicator, $BollingerBandsIndicator, $averageTrueRangeIndicator, $indicatorCCI, $demarkerIndicator, $EnvelopesIndicator, $indicatorTitlePeriodColor, $indicatorTPCPeriodSP, $indicatorTPCColor, $indicatorADXPeriodSP, $indicatorADXColor, $indicatorADXDIPlusColor, $indicatorADXDIMinusColor, $indicatorAligatorJawsColor, $indicatorAligatorJawsPeriodSP, $indicatorAligatorJawsShiftSP,
	$indicatorAligatorTeethPeriodSP, $indicatorAligatorTeethShiftSP, $indicatorAligatorTeethColor, $indicatorAligatorLipsPeriodSP, $indicatorAligatorLipsShiftSP, $indicatorAligatorLipsColor, $indicatorBollingerDeviationSP, $indicatorBollingerPeriodSP, $indicatorBollingerColor, $indicatorBollingerExponential, $indicatorEnvelopesPeriodSP, $indicatorEnvelopesDeviationSP, $indicatorEnvelopesUpColor, $indicatorEnvelopesDownColor, $MovingAverageIndicator, $indicatorMovingAverageTypeForm, $indicatorMovingAveragePeriodSP, $indicatorMovingAverageHistColor,
	$KAMAIndicator, $MACDOsMAIndicator, $indicatorMACDOsMAPeriodSP, $indicatorMACDOsMASignalPeriodSP, $indicatorMACDOsMAShorterPeriodSP, $indicatorMACDOsMALongerPeriodSP, $indicatorMACDOsMAColor, $indicatorMACDOsMASignalColor, $indicatorMACDOsMAHistColor, $MOMENTUMIndicator, $ParabolicSARIndicator, $indicatorParabolicSARStepSP, $indicatorParabolicSARMaximumSP, $indicatorParabolicSARColor, $LINEARREGIndicator, $RSIIndicator, $STDDEVIndicator, $StochasticIndicator, $indicatorStochasticTypeForm, $indicatorStochasticObservationPeriodSP,
	$indicatorStochasticAveragePeriodSP, $indicatorStochasticColorD, $indicatorStochasticColorK, $WILLIAMSIndicator, indicatorsRTL = false;

function IsIndicatorRequiresSepChart(b) {
	switch (b) {
	case "ind_ADXDMI_li":
		return true;
	case "ind_ALIGATOR_li":
		return false;
	case "ind_BOLLINGERBANDS_li":
		return false;
	case "ind_ATR_li":
		return true;
	case "ind_CCI_li":
		return true;
	case "ind_DEMARKER_li":
		return true;
	case "ind_ENVELOPES_li":
		return false;
	case "ind_KAMA_li":
		return false;
	case "ind_LINEARREG_li":
		return false;
	case "ind_MACDOSMA_li":
		return true;
	case "ind_MOMENTUM_li":
		return true;
	case "ind_MOVINGAVRAGE_li":
		return false;
	case "ind_PARABOLICSAR_li":
		return false;
	case "ind_RSI_li":
		return true;
	case "ind_STDDEV_li":
		return true;
	case "ind_STOCHASTIC_li":
		return true;
	case "ind_WILLIAMS_li":
		return true;
	default:
		return false
	}
}

function getNumberOfIndicatorSubChartsDisplayed() {
	var b = $activeIndicatorsList.children("li");
	if (b.size() === 0) return 0;
	var c = 0;
	$.each(b, function (d, e) {
		d = $(e);
		if (IsIndicatorRequiresSepChart(d.data("ActiveIndicator").listID)) c += 1
	});
	return c
}

function indicatorColorToHex(b) {
	switch (b) {
	case "black":
		return "000000";
	case "maroon":
		return "800000";
	case "green":
		return "008000";
	case "olive":
		return "808000";
	case "navy":
		return "000080";
	case "purple":
		return "800080";
	case "teal":
		return "008080";
	case "gray":
		return "808080";
	case "silver":
		return "C0C0C0";
	case "red":
		return "FF0000";
	case "lime":
		return "00FF00";
	case "yellow":
		return "FFFF00";
	case "blue":
		return "0000FF";
	case "fuchsia":
		return "FF00FF";
	case "aqua":
		return "00FFFF";
	case "white":
		return "FFFFFF";
	default:
		return b
	}
}

function getIndicatorsSettings(b) {
	var c = [];
	b = b.graphSavedSettings === null ? null : b.graphSavedSettings.indicators;
	for (var d = 0; b !== null && d < b.length; d++) {
		var e = b[d];
		switch (e.listID) {
		case "ind_ADXDMI_li":
			c.push({
				type: EIndicatorType.ADX,
				Period: parseInt(e.config.period, 10),
				Color: [e.config.color, e.config.DIPlusColor, e.config.DIMinusColor]
			});
			break;
		case "ind_ALIGATOR_li":
			c.push({
				type: EIndicatorType.Alligator,
				PeriodSlow: parseInt(e.config.jaws_period, 10),
				PeriodMid: parseInt(e.config.teeth_period, 10),
				PeriodFast: parseInt(e.config.lips_period,
					10),
				ShiftSlow: parseInt(e.config.jaws_shift, 10),
				ShiftMid: parseInt(e.config.teeth_shift, 10),
				ShiftFast: parseInt(e.config.lips_shift, 10),
				Color: [e.config.jaws_color, e.config.teeth_color, e.config.lips_color]
			});
			break;
		case "ind_ATR_li":
			c.push({
				type: EIndicatorType.TrueRange,
				Period: parseInt(e.config.period, 10),
				Color: [e.config.color]
			});
			break;
		case "ind_BOLLINGERBANDS_li":
			c.push({
				type: EIndicatorType.BollingerBands,
				Period: parseInt(e.config.period, 10),
				K: parseInt(e.config.deviation, 10),
				Exp: e.config.exponential,
				Color: [e.config.color,
					e.config.color, e.config.color
				]
			});
			break;
		case "ind_CCI_li":
			c.push({
				type: EIndicatorType.CCI,
				Period: parseInt(e.config.period, 10),
				Color: [e.config.color]
			});
			break;
		case "ind_DEMARKER_li":
			c.push({
				type: EIndicatorType.DeMarker,
				Period: parseInt(e.config.period, 10),
				Color: [e.config.color]
			});
			break;
		case "ind_ENVELOPES_li":
			c.push({
				type: EIndicatorType.Envelopes,
				Period: parseInt(e.config.period, 10),
				Distance: parseInt(e.config.deviation, 10) / 100,
				Color: [e.config.downColor, e.config.upColor]
			});
			break;
		case "ind_KAMA_li":
			c.push({
				type: EIndicatorType.KAMA,
				Period: parseInt(e.config.period, 10),
				Color: [e.config.color]
			});
			break;
		case "ind_LINEARREG_li":
			c.push({
				type: EIndicatorType.LinearReg,
				Period: parseInt(e.config.period, 10),
				Color: [e.config.color]
			});
			break;
		case "ind_MACDOSMA_li":
			c.push({
				type: EIndicatorType.MACD,
				Period: parseInt(e.config.signal_period, 10),
				PeriodShort: parseInt(e.config.shorter_period, 10),
				PeriodLong: parseInt(e.config.longer_period, 10),
				Color: [e.config.hist_color, e.config.color, e.config.signal_color]
			});
			break;
		case "ind_MOMENTUM_li":
			c.push({
				type: EIndicatorType.Momentum,
				Period: parseInt(e.config.period, 10),
				Color: [e.config.color]
			});
			break;
		case "ind_MOVINGAVRAGE_li":
			c.push({
				type: EIndicatorType.MovingAverage,
				Period: parseInt(e.config.period, 10),
				AverageType: e.config.moving_avg_type,
				Color: [e.config.color]
			});
			break;
		case "ind_PARABOLICSAR_li":
			c.push({
				type: EIndicatorType.ParabolicSAR,
				Alpha: e.config.step,
				MaxAlpha: e.config.maximum,
				Color: [e.config.color]
			});
			break;
		case "ind_RSI_li":
			c.push({
				type: EIndicatorType.RSI,
				Period: parseInt(e.config.period, 10),
				Color: [e.config.color]
			});
			break;
		case "ind_STDDEV_li":
			c.push({
				type: EIndicatorType.STDDEV,
				Period: parseInt(e.config.period, 10),
				Color: [e.config.color]
			});
			break;
		case "ind_STOCHASTIC_li":
			c.push({
				type: EIndicatorType.Stochastic,
				Fast: e.config.fast,
				Period: parseInt(e.config.observation_period, 10),
				AvgPeriod: parseInt(e.config.average_period, 10),
				Color: [e.config.color_k, e.config.color_d]
			});
			break;
		case "ind_WILLIAMS_li":
			c.push({
				type: EIndicatorType.WilliamsR,
				Period: parseInt(e.config.period, 10),
				Color: [e.config.color]
			});
			break;
		default:
			break
		}
		c[c.length -
			1].DisplayName = $("#" + e.listID).text()
	}
	return c
}

function initBasicIndicator() {
	$indicatorTitlePeriodColor = $("#indicator_title_period_color");
	$indicatorTPCPeriodSP = $("#ind_tpc_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorTPCColor = $("#ind_tpc_colorDIV").children(".colors_list_combo");
	$indicatorTPCPeriodSP.change(function () {
		displayedIndicatorConfig.period = $indicatorTPCPeriodSP.val()
	});
	$indicatorTPCColor.change(function () {
		displayedIndicatorConfig.color = $indicatorTPCColor.val()
	});
	$indicatorTitlePeriodColor.displayConfig =
		function (b) {
			displayedIndicatorConfig = b.config;
			$("#ind_tpc_titleDIV").text($("#" + b.listID).text());
			$indicatorTPCPeriodSP.val(b.config.period);
			$indicatorTPCColor.val(b.config.color);
			$indicatorTitlePeriodColor.removeClass("display-none-class")
	}
}

function initADXDMIIndicator() {
	$indicatorADXPeriodSP = $("#ind_adx_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorADXColor = $("#ind_adxdmi_colorDIV").children(".colors_list_combo");
	$indicatorADXDIPlusColor = $("#ind_adxdmi_plusDi").children(".colors_list_combo");
	$indicatorADXDIMinusColor = $("#ind_adxdmi_minusDi").children(".colors_list_combo");
	$indicatorADXPeriodSP.change(function () {
		displayedIndicatorConfig.period = $indicatorADXPeriodSP.val()
	});
	$indicatorADXColor.change(function () {
		displayedIndicatorConfig.color =
			$indicatorADXColor.val()
	});
	$indicatorADXDIPlusColor.change(function () {
		displayedIndicatorConfig.DIPlusColor = $indicatorADXDIPlusColor.val()
	});
	$indicatorADXDIMinusColor.change(function () {
		displayedIndicatorConfig.DIMinusColor = $indicatorADXDIMinusColor.val()
	})
}

function initAligatorIndicator() {
	$indicatorAligatorJawsPeriodSP = $("#ind_aligator_jaws_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorAligatorJawsShiftSP = $("#ind_aligator_jaws_shiftSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorAligatorJawsColor = $("#ind_aligator_color_jaws").children(".colors_list_combo");
	$indicatorAligatorJawsPeriodSP.change(function () {
		displayedIndicatorConfig.jaws_period = $indicatorAligatorJawsPeriodSP.val()
	});
	$indicatorAligatorJawsShiftSP.change(function () {
		displayedIndicatorConfig.jaws_shift =
			$indicatorAligatorJawsShiftSP.val()
	});
	$indicatorAligatorJawsColor.change(function () {
		displayedIndicatorConfig.jaws_color = $indicatorAligatorJawsColor.val()
	});
	$indicatorAligatorTeethPeriodSP = $("#ind_aligator_teeth_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorAligatorTeethShiftSP = $("#ind_aligator_teeth_shiftSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorAligatorTeethColor = $("#ind_aligator_color_teeth").children(".colors_list_combo");
	$indicatorAligatorTeethPeriodSP.change(function () {
		displayedIndicatorConfig.teeth_period =
			$indicatorAligatorTeethPeriodSP.val()
	});
	$indicatorAligatorTeethShiftSP.change(function () {
		displayedIndicatorConfig.teeth_shift = $indicatorAligatorTeethShiftSP.val()
	});
	$indicatorAligatorTeethColor.change(function () {
		displayedIndicatorConfig.teeth_color = $indicatorAligatorTeethColor.val()
	});
	$indicatorAligatorLipsPeriodSP = $("#ind_aligator_lips_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorAligatorLipsShiftSP = $("#ind_aligator_lips_shiftSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorAligatorLipsColor = $("#ind_aligator_color_lips").children(".colors_list_combo");
	$indicatorAligatorLipsPeriodSP.change(function () {
		displayedIndicatorConfig.lips_period = $indicatorAligatorLipsPeriodSP.val()
	});
	$indicatorAligatorLipsShiftSP.change(function () {
		displayedIndicatorConfig.lips_shift = $indicatorAligatorLipsShiftSP.val()
	});
	$indicatorAligatorLipsColor.change(function () {
		displayedIndicatorConfig.lips_color = $indicatorAligatorLipsColor.val()
	})
}

function initBolingerBandsIndicator() {
	$indicatorBollingerDeviationSP = $("#ind_bollinger_deviationSP").spinbox("destroy").spinbox({
		min: 2,
		max: 10,
		step: 1,
		bigStep: 5
	});
	$indicatorBollingerPeriodSP = $("#ind_bollinger_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorBollingerDeviationSP.change(function () {
		displayedIndicatorConfig.deviation = $indicatorBollingerDeviationSP.val()
	});
	$indicatorBollingerPeriodSP.change(function () {
		displayedIndicatorConfig.period = $indicatorBollingerPeriodSP.val()
	});
	$indicatorBollingerColor = $("#ind_Bollinger_colorDIV").children(".colors_list_combo");
	$indicatorBollingerColor.change(function () {
		displayedIndicatorConfig.color = $indicatorBollingerColor.val()
	});
	$indicatorBollingerExponential = $("#setupInd_Bollinger_checkbox");
	$indicatorBollingerExponential.click(function () {
		displayedIndicatorConfig.exponential = $indicatorBollingerExponential.is(":checked")
	})
}

function initEnvelopesIndicator() {
	$indicatorEnvelopesPeriodSP = $("#ind_envelopes_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorEnvelopesDeviationSP = $("#ind_envelopes_deviationSP").spinbox("destroy").spinbox({
		min: 2,
		max: 100,
		step: 1,
		bigStep: 5
	});
	$indicatorEnvelopesPeriodSP.change(function () {
		displayedIndicatorConfig.period = $indicatorEnvelopesPeriodSP.val()
	});
	$indicatorEnvelopesDeviationSP.change(function () {
		displayedIndicatorConfig.deviation = $indicatorEnvelopesDeviationSP.val()
	});
	$indicatorEnvelopesUpColor = $("#ind_envelopes_up_colorDIV").children(".colors_list_combo");
	$indicatorEnvelopesUpColor.change(function () {
		displayedIndicatorConfig.upColor = $indicatorEnvelopesUpColor.val()
	});
	$indicatorEnvelopesDownColor = $("#ind_envelopes_down_colorDIV").children(".colors_list_combo");
	$indicatorEnvelopesDownColor.change(function () {
		displayedIndicatorConfig.downColor = $indicatorEnvelopesDownColor.val()
	})
}

function createEnvelopesFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_ENVELOPES_li",
			panelID: "indicator_envelopes",
			config: {
				period: 15,
				deviation: 10,
				upColor: indicatorColorToHex("blue"),
				downColor: indicatorColorToHex("fuchsia")
			},
			displayPanel: function () {
				displayedIndicatorConfig = this.config;
				$indicatorEnvelopesPeriodSP.val(this.config.period);
				$indicatorEnvelopesDeviationSP.val(this.config.deviation);
				$indicatorEnvelopesUpColor.val(this.config.upColor);
				$indicatorEnvelopesDownColor.val(this.config.downColor);
				$("#indicator_envelopes").removeClass("display-none-class")
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function initMACDOsMAIndicator() {
	$indicatorMACDOsMAShorterPeriodSP = $("#ind_MACDOsMA_shorterEMA_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorMACDOsMALongerPeriodSP = $("#ind_MACDOsMA_lingerEMA_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorMACDOsMASignalPeriodSP = $("#ind_MACDOsMA_singal_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorMACDOsMAColor = $("#ind_macd_color").children(".colors_list_combo");
	$indicatorMACDOsMASignalColor = $("#ind_macd_signal_color").children(".colors_list_combo");
	$indicatorMACDOsMAHistColor = $("#ind_macd_hist_color").children(".colors_list_combo");
	$indicatorMACDOsMAShorterPeriodSP.change(function () {
		displayedIndicatorConfig.shorter_period = $indicatorMACDOsMAShorterPeriodSP.val()
	});
	$indicatorMACDOsMALongerPeriodSP.change(function () {
		displayedIndicatorConfig.longer_period = $indicatorMACDOsMALongerPeriodSP.val()
	});
	$indicatorMACDOsMASignalPeriodSP.change(function () {
		displayedIndicatorConfig.signal_period =
			$indicatorMACDOsMASignalPeriodSP.val()
	});
	$indicatorMACDOsMAColor.change(function () {
		displayedIndicatorConfig.color = $indicatorMACDOsMAColor.val()
	});
	$indicatorMACDOsMASignalColor.change(function () {
		displayedIndicatorConfig.signal_color = $indicatorMACDOsMASignalColor.val()
	});
	$indicatorMACDOsMAHistColor.change(function () {
		displayedIndicatorConfig.hist_color = $indicatorMACDOsMAHistColor.val()
	})
}

function initMovingAverageIndicator() {
	$indicatorMovingAverageTypeForm = $("#moving_avg_type_form");
	$indicatorMovingAveragePeriodSP = $("#ind_movingavrage_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorMovingAveragePeriodSP.change(function () {
		displayedIndicatorConfig.period = $indicatorMovingAveragePeriodSP.val()
	});
	$indicatorMovingAverageTypeForm.children("input[name='moving_avg_type']").change(function () {
		if ($(this).val() == "simple") displayedIndicatorConfig.moving_avg_type =
			EMovingAverageTypes.Simple;
		else if ($(this).val() == "exponential") displayedIndicatorConfig.moving_avg_type = EMovingAverageTypes.Exponential;
		else if ($(this).val() == "weighted") displayedIndicatorConfig.moving_avg_type = EMovingAverageTypes.Weighted
	});
	$indicatorMovingAverageHistColor = $("#ind_movingavrage_color").children(".colors_list_combo");
	$indicatorMovingAverageHistColor.change(function () {
		displayedIndicatorConfig.color = $indicatorMovingAverageHistColor.val()
	})
}

function initParabolicSARIndicator() {
	$indicatorParabolicSARStepSP = $("#ind_parabolicsar_stepSP").spinbox("destroy").spinbox({
		min: 0.0020,
		max: 0.2,
		step: 0.01,
		bigStep: 0.05,
		scale: 3
	});
	$indicatorParabolicSARStepSP.change(function () {
		displayedIndicatorConfig.step = parseFloatCultured($indicatorParabolicSARStepSP.val())
	});
	$indicatorParabolicSARMaximumSP = $("#ind_parabolicsar_maximumSP").spinbox("destroy").spinbox({
		min: 0.02,
		max: 2,
		step: 0.1,
		bigStep: 0.5,
		scale: 2
	});
	$indicatorParabolicSARMaximumSP.change(function () {
		displayedIndicatorConfig.maximum =
			parseFloatCultured($indicatorParabolicSARMaximumSP.val())
	});
	$indicatorParabolicSARColor = $("#ind_parabolicsar_color").children(".colors_list_combo");
	$indicatorParabolicSARColor.change(function () {
		displayedIndicatorConfig.color = $indicatorParabolicSARColor.val()
	})
}

function initStochasticIndicator() {
	$indicatorStochasticTypeForm = $("#stochastic_type_form");
	$indicatorStochasticObservationPeriodSP = $("#setupInd_stochastic_observation_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorStochasticAveragePeriodSP = $("#setupInd_stochastic_average_periodSP").spinbox("destroy").spinbox({
		min: 2,
		max: 200,
		step: 1,
		bigStep: 5
	});
	$indicatorStochasticColorK = $("#ind_stochastic_colorK").children(".colors_list_combo");
	$indicatorStochasticColorD = $("#ind_stochastic_colorD").children(".colors_list_combo");
	$indicatorStochasticTypeForm.children("input[name='stochastic_type']").change(function () {
		displayedIndicatorConfig.fast = $(this).val() == "fast"
	});
	$indicatorStochasticObservationPeriodSP.change(function () {
		displayedIndicatorConfig.observation_period = $indicatorStochasticObservationPeriodSP.val()
	});
	$indicatorStochasticAveragePeriodSP.change(function () {
		displayedIndicatorConfig.average_period = $indicatorStochasticAveragePeriodSP.val()
	});
	$indicatorStochasticColorK.change(function () {
		displayedIndicatorConfig.color_k =
			$indicatorStochasticColorK.val()
	});
	$indicatorStochasticColorD.change(function () {
		displayedIndicatorConfig.color_d = $indicatorStochasticColorD.val()
	})
}

function createMACDOsMAFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_MACDOSMA_li",
			panelID: "indicator_MACDOsMA",
			config: {
				shorter_period: 12,
				longer_period: 26,
				signal_period: 9,
				color: indicatorColorToHex("green"),
				signal_color: indicatorColorToHex("navy"),
				hist_color: indicatorColorToHex("red")
			},
			displayPanel: function () {
				displayedIndicatorConfig = this.config;
				$indicatorMACDOsMAShorterPeriodSP.val(this.config.shorter_period);
				$indicatorMACDOsMALongerPeriodSP.val(this.config.longer_period);
				$indicatorMACDOsMASignalPeriodSP.val(this.config.signal_period);
				$indicatorMACDOsMAColor.val(this.config.color);
				$indicatorMACDOsMASignalColor.val(this.config.signal_color);
				$indicatorMACDOsMAHistColor.val(this.config.hist_color);
				$("#indicator_MACDOsMA").removeClass("display-none-class")
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createADXDMIFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_ADXDMI_li",
			panelID: "indicator_adx_dmi",
			config: {
				period: 14,
				color: indicatorColorToHex("black"),
				DIPlusColor: indicatorColorToHex("green"),
				DIMinusColor: indicatorColorToHex("red")
			},
			displayPanel: function () {
				displayedIndicatorConfig = this.config;
				$indicatorADXPeriodSP.val(this.config.period);
				$indicatorADXColor.val(this.config.color);
				$indicatorADXDIPlusColor.val(this.config.DIPlusColor);
				$indicatorADXDIMinusColor.val(this.config.DIMinusColor);
				$("#indicator_adx_dmi").removeClass("display-none-class")
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createAligatorFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_ALIGATOR_li",
			panelID: "indicator_aligator",
			config: {
				jaws_period: 13,
				jaws_shift: 8,
				jaws_color: indicatorColorToHex("blue"),
				teeth_period: 8,
				teeth_shift: 5,
				teeth_color: indicatorColorToHex("red"),
				lips_period: 5,
				lips_shift: 3,
				lips_color: indicatorColorToHex("green")
			},
			displayPanel: function () {
				displayedIndicatorConfig = this.config;
				$indicatorAligatorJawsPeriodSP.val(this.config.jaws_period);
				$indicatorAligatorJawsShiftSP.val(this.config.jaws_shift);
				$indicatorAligatorJawsColor.val(this.config.jaws_color);
				$indicatorAligatorTeethPeriodSP.val(this.config.teeth_period);
				$indicatorAligatorTeethShiftSP.val(this.config.teeth_shift);
				$indicatorAligatorTeethColor.val(this.config.teeth_color);
				$indicatorAligatorLipsPeriodSP.val(this.config.lips_period);
				$indicatorAligatorLipsShiftSP.val(this.config.lips_shift);
				$indicatorAligatorLipsColor.val(this.config.lips_color);
				$("#indicator_aligator").removeClass("display-none-class")
			}
		};
		if (typeof b != "undefined") c.config =
			b;
		return c
	}
}

function createAverageTrueRangeFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_ATR_li",
			panelID: "indicator_title_period_color",
			config: {
				color: indicatorColorToHex("green"),
				period: 14
			},
			displayPanel: function () {
				$indicatorTitlePeriodColor.removeClass("display-none-class");
				$indicatorTitlePeriodColor.displayConfig(this)
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createBollingerBandsFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_BOLLINGERBANDS_li",
			panelID: "indicator_bollinger_bands",
			config: {
				deviation: "2",
				period: "10",
				color: indicatorColorToHex("olive"),
				exponential: false
			},
			displayPanel: function () {
				displayedIndicatorConfig = this.config;
				$indicatorBollingerDeviationSP.val(this.config.deviation);
				$indicatorBollingerPeriodSP.val(this.config.period);
				$indicatorBollingerColor.val(this.config.color);
				$indicatorBollingerExponential.prop("checked",
					this.config.exponential ? true : false);
				$("#indicator_bollinger_bands").removeClass("display-none-class")
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createDemarkerFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_DEMARKER_li",
			panelID: "indicator_title_period_color",
			config: {
				color: indicatorColorToHex("green"),
				period: 14
			},
			displayPanel: function () {
				$indicatorTitlePeriodColor.removeClass("display-none-class");
				$indicatorTitlePeriodColor.displayConfig(this)
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createMovingAverageFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_MOVINGAVRAGE_li",
			panelID: "indicator_moving_avrage",
			config: {
				color: indicatorColorToHex("purple"),
				period: 10,
				type: 0
			},
			displayPanel: function () {
				displayedIndicatorConfig = this.config;
				$indicatorMovingAveragePeriodSP.val(this.config.period);
				$indicatorMovingAverageHistColor.val(this.config.color);
				switch (this.config.moving_avg_type) {
				case EMovingAverageTypes.Simple:
					$indicatorMovingAverageTypeForm.children("input").eq(0).prop("checked",
						true);
					break;
				case EMovingAverageTypes.Exponential:
					$indicatorMovingAverageTypeForm.children("input").eq(1).prop("checked", true);
					break;
				case EMovingAverageTypes.Weighted:
					$indicatorMovingAverageTypeForm.children("input").eq(2).prop("checked", true);
					break;
				default:
					$indicatorMovingAverageTypeForm.children().eq(0).prop("checked", true);
					this.config.moving_avg_type = EMovingAverageTypes.Simple;
					break
				}
				$("#indicator_moving_avrage").removeClass("display-none-class")
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createParabolicSARFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_PARABOLICSAR_li",
			panelID: "indicator_parabolicsar",
			config: {
				color: indicatorColorToHex("green"),
				step: 0.02,
				maximum: 0.2
			},
			displayPanel: function () {
				displayedIndicatorConfig = this.config;
				$indicatorParabolicSARStepSP.val(roundToPrecisionDigits(this.config.step, 3));
				$indicatorParabolicSARMaximumSP.val(roundToPrecisionDigits(this.config.maximum, 2));
				$indicatorParabolicSARColor.val(this.config.color);
				$("#indicator_parabolicsar").removeClass("display-none-class")
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createStochasticFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_STOCHASTIC_li",
			panelID: "indicator_stochastic",
			config: {
				fast: true,
				observation_period: 5,
				average_period: 3,
				color_k: indicatorColorToHex("green"),
				color_d: indicatorColorToHex("navy")
			},
			displayPanel: function () {
				displayedIndicatorConfig = this.config;
				$indicatorStochasticObservationPeriodSP.val(this.config.observation_period);
				$indicatorStochasticAveragePeriodSP.val(this.config.average_period);
				$indicatorStochasticColorK.val(this.config.color_k);
				$indicatorStochasticColorD.val(this.config.color_d);
				this.config.fast ? $indicatorStochasticTypeForm.children().eq(0).prop("checked", true) : $indicatorStochasticTypeForm.children().eq(1).prop("checked", true);
				$("#indicator_stochastic").removeClass("display-none-class")
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createCCIFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_CCI_li",
			panelID: "indicator_title_period_color",
			config: {
				color: indicatorColorToHex("green"),
				period: 14
			},
			displayPanel: function () {
				$indicatorTitlePeriodColor.removeClass("display-none-class");
				$indicatorTitlePeriodColor.displayConfig(this)
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createKAMAFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_KAMA_li",
			panelID: "indicator_title_period_color",
			config: {
				color: indicatorColorToHex("black"),
				period: 14
			},
			displayPanel: function () {
				$indicatorTitlePeriodColor.removeClass("display-none-class");
				$indicatorTitlePeriodColor.displayConfig(this)
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createLINEARREGFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_LINEARREG_li",
			panelID: "indicator_title_period_color",
			config: {
				color: indicatorColorToHex("green"),
				period: 10
			},
			displayPanel: function () {
				$indicatorTitlePeriodColor.removeClass("display-none-class");
				$indicatorTitlePeriodColor.displayConfig(this)
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createMOMENTUMFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_MOMENTUM_li",
			panelID: "indicator_title_period_color",
			config: {
				color: indicatorColorToHex("green"),
				period: 14
			},
			displayPanel: function () {
				$indicatorTitlePeriodColor.removeClass("display-none-class");
				$indicatorTitlePeriodColor.displayConfig(this)
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createRSIFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_RSI_li",
			panelID: "indicator_title_period_color",
			config: {
				color: indicatorColorToHex("navy"),
				period: 14
			},
			displayPanel: function () {
				$indicatorTitlePeriodColor.removeClass("display-none-class");
				$indicatorTitlePeriodColor.displayConfig(this)
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createSTDDEVFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_STDDEV_li",
			panelID: "indicator_title_period_color",
			config: {
				color: indicatorColorToHex("green"),
				period: 10
			},
			displayPanel: function () {
				$indicatorTitlePeriodColor.removeClass("display-none-class");
				$indicatorTitlePeriodColor.displayConfig(this)
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function createWILLIAMSFactory() {
	this.createActiveIndicator = function (b) {
		var c = {
			listID: "ind_WILLIAMS_li",
			panelID: "indicator_title_period_color",
			config: {
				color: indicatorColorToHex("green"),
				period: 14
			},
			displayPanel: function () {
				$indicatorTitlePeriodColor.removeClass("display-none-class");
				$indicatorTitlePeriodColor.displayConfig(this)
			}
		};
		if (typeof b != "undefined") c.config = b;
		return c
	}
}

function setupIndicatorsOpened() {
	loadActiveIndicatorsFromDS()
}

function setupIndicatorsClosed() {
	$activeIndicatorsList.empty();
	clearIndicatorPropertiesPanel()
}

function initSetupIndicators() {
	$setupIndicators = $("#setup_indicators_dialog");
	$setupIndicators.dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		width: GeneralUI.SetupIndicatorsWidth,
		open: setupIndicatorsOpened,
		close: setupIndicatorsClosed
	});
	$setupIndicators.find("#setup_indicators_cancel").click(function () {
		$setupIndicators.dialog("close");
		return false
	});
	$("#setup_indicators").click(function () {
		$setupIndicators.dialog("open");
		return false
	})
}

function clearIndicatorPropertiesPanel() {
	$("#setup_indicators_properties").children().addClass("display-none-class")
}

function loadActiveIndicatorsFromDS() {
	var b = currChartSetupIndicators.graphSavedSettings.indicators;
	if (b !== null) {
		for (var c = 0; c < b.length; c++) {
			var d = b[c],
				e = $("#" + d.listID),
				f = $('<li class="setup-indicators-td">' + e.text() + "</li>");
			f.appendTo($activeIndicatorsList);
			f.data("ActiveIndicator", e.data("factory").createActiveIndicator(d.config))
		}
		selectActiveIndicator($activeIndicatorsList.children().first())
	}
}

function saveActiveIndicatorsToDS() {
	var b = [],
		c = $activeIndicatorsList.children("li");
	$.each(c, function (d, e) {
		d = $(e).data("ActiveIndicator");
		b.push(d)
	});
	currChartSetupIndicators.graphSavedSettings.indicators = b
}

function selectActiveIndicator(b) {
	clearIndicatorPropertiesPanel();
	$activeIndicatorsList.children(".ui-selected").removeClass("ui-selected");
	if (b.size() !== 0) {
		$("#setup_indicators_dialog").find(".colors_list_combo").empty();
		$("#" + b.addClass("ui-selected").data("ActiveIndicator").panelID).find(".colors_list_combo").each(function (c, d) {
			makeColorPalleteOfDiv($(d))
		});
		b.addClass("ui-selected").data("ActiveIndicator").displayPanel()
	}
}

function initSetupIndicatorsDialog() {
	if (getDisplayPageType() === EPageType.Trade) {
		initSetupIndicators();
		initBasicIndicator();
		initADXDMIIndicator();
		initAligatorIndicator();
		initBolingerBandsIndicator();
		initEnvelopesIndicator();
		initMACDOsMAIndicator();
		initMovingAverageIndicator();
		initParabolicSARIndicator();
		initStochasticIndicator();
		$ADXDMIIndicator = $("#ind_ADXDMI_li");
		$ADXDMIIndicator.data("factory", new createADXDMIFactory($ADXDMIIndicator.text()));
		$AligatorIndicator = $("#ind_ALIGATOR_li");
		$AligatorIndicator.data("factory",
			new createAligatorFactory($AligatorIndicator.text()));
		$BollingerBandsIndicator = $("#ind_BOLLINGERBANDS_li");
		$BollingerBandsIndicator.data("factory", new createBollingerBandsFactory($BollingerBandsIndicator.text()));
		$averageTrueRangeIndicator = $("#ind_ATR_li");
		$averageTrueRangeIndicator.data("factory", new createAverageTrueRangeFactory($averageTrueRangeIndicator.text()));
		$indicatorCCI = $("#ind_CCI_li");
		$indicatorCCI.data("factory", new createCCIFactory($indicatorCCI.text()));
		$demarkerIndicator = $("#ind_DEMARKER_li");
		$demarkerIndicator.data("factory", new createDemarkerFactory($demarkerIndicator.text()));
		$EnvelopesIndicator = $("#ind_ENVELOPES_li");
		$EnvelopesIndicator.data("factory", new createEnvelopesFactory($EnvelopesIndicator.text()));
		$MACDOsMAIndicator = $("#ind_MACDOSMA_li");
		$MACDOsMAIndicator.data("factory", new createMACDOsMAFactory($MACDOsMAIndicator.text()));
		$MovingAverageIndicator = $("#ind_MOVINGAVRAGE_li");
		$MovingAverageIndicator.data("factory", new createMovingAverageFactory($MovingAverageIndicator.text()));
		$KAMAIndicator = $("#ind_KAMA_li");
		$KAMAIndicator.data("factory", new createKAMAFactory($KAMAIndicator.text()));
		$LINEARREGIndicator = $("#ind_LINEARREG_li");
		$LINEARREGIndicator.data("factory", new createLINEARREGFactory($LINEARREGIndicator.text()));
		$MOMENTUMIndicator = $("#ind_MOMENTUM_li");
		$MOMENTUMIndicator.data("factory", new createMOMENTUMFactory($MOMENTUMIndicator.text()));
		$ParabolicSARIndicator = $("#ind_PARABOLICSAR_li");
		$ParabolicSARIndicator.data("factory", new createParabolicSARFactory($ParabolicSARIndicator.text()));
		$StochasticIndicator = $("#ind_STOCHASTIC_li");
		$StochasticIndicator.data("factory", new createStochasticFactory($StochasticIndicator.text()));
		$RSIIndicator = $("#ind_RSI_li");
		$RSIIndicator.data("factory", new createRSIFactory($RSIIndicator.text()));
		$STDDEVIndicator = $("#ind_STDDEV_li");
		$STDDEVIndicator.data("factory", new createSTDDEVFactory($STDDEVIndicator.text()));
		$WILLIAMSIndicator = $("#ind_WILLIAMS_li");
		$WILLIAMSIndicator.data("factory", new createWILLIAMSFactory($WILLIAMSIndicator.text()));
		$allIndicatorsList =
			$("#setup_indicators_all_indicators_list");
		$allIndicatorsList.selectable();
		$activeIndicatorsList = $("#setup_indicators_active_indicators_list");
		$activeIndicatorsList.selectable({
			selected: function (b) {
				selectActiveIndicator($(b.originalEvent.target))
			}
		});
		$("#setup_indicators_button_add_one").click(function () {
			var b = $allIndicatorsList.children(".ui-selected");
			if (b.size() === 0) return false;
			var c = false;
			$.each(b, function (d, e) {
				d = $(e);
				e = IsIndicatorRequiresSepChart(d.attr("id"));
				if (getNumberOfIndicatorSubChartsDisplayed() >=
					2 && e) c = true;
				else {
					e = $('<li class="setup-indicators-td">' + d.text() + "</li>");
					e.appendTo($activeIndicatorsList);
					e.data("ActiveIndicator", d.data("factory").createActiveIndicator())
				}
			});
			b.removeClass("ui-selected");
			selectActiveIndicator($activeIndicatorsList.children("li").last());
			c && alertDialog(ALERT_TYPE.atWarning, LangJSDict.strTOO_MANY_SUB_CHARTS, false, null, null);
			return false
		});
		$("#setup_indicators_button_remove_one").click(function () {
			var b = $activeIndicatorsList.children(".ui-selected");
			if (b.size() ===
				0) return false;
			b.remove();
			selectActiveIndicator($activeIndicatorsList.children("li").last());
			return false
		});
		$("#setup_indicators_button_remove_all").click(function () {
			if ($activeIndicatorsList.size() === 0) return false;
			$activeIndicatorsList.empty();
			selectActiveIndicator($activeIndicatorsList.children("li").last());
			return false
		});
		$("#setup_indicators_ok").click(function () {
			saveActiveIndicatorsToDS();
			$setupIndicators.dialog("close");
			currChartSetupIndicators.saveGraphCookie();
			currChartSetupIndicators.startGraphLoadingAnimGif();
			currChartSetupIndicators.ReloadChartNewIndicators(getIndicatorsSettings(currChartSetupIndicators));
			return false
		});
		$("#setup_indicators_apply").click(function () {
			saveActiveIndicatorsToDS();
			currChartSetupIndicators.saveGraphCookie();
			currChartSetupIndicators.startGraphLoadingAnimGif();
			currChartSetupIndicators.ReloadChartNewIndicators(getIndicatorsSettings(currChartSetupIndicators));
			return false
		});
		$("#setup_indicators_cancel").click(function () {
			$setupIndicators.dialog("close");
			return false
		});
		(function (b) {
			var c =
				b.fn.val;
			b.fn.val = function (d) {
				if (!b(this).hasClass("colors_list_combo")) {
					if (typeof d == "undefined") return c.call(this);
					return c.call(this, d)
				}
				var e = b(this).data("ColorData");
				if (typeof d == "undefined") return e.val;
				d = indicatorColorToHex(d);
				b(this).find(".color_list_line").addClass("display-none-class");
				b(this).css("background-color", "#" + d);
				b(this).addClass("colors_list_combo_closed");
				b(this).data("ColorData", {
					isOpen: false,
					val: d
				});
				b(this).change();
				return b(this)
			}
		})(jQuery)
	}
}

function makeColorPalleteOfDiv(b) {
	b.empty();
	var c = [0, 128, 192, 255],
		d = [];
	$.each(c, function (l, n) {
		$.each(c, function (m, q) {
			$.each(c, function (o, t) {
				d.push(RGBtoHex(n, q, t))
			})
		})
	});
	for (var e, f = 0; f < d.length; f++) {
		if (f % 8 === 0) e = $('<div class="color_list_line"></div>');
		var h = d[f],
			g = $('<div class="color_list_sample float" style="background-color:#' + h + '"></div>');
		g.data("Color", h);
		e.append(g);
		if (f % 8 == 7) {
			b.append(e);
			b.append($('<div class="clear0"></div>'))
		}
	}
	b.data("ColorData", {
		isOpen: false,
		val: RGBtoHex(0, 0, 0)
	});
	b.click(function (l) {
		for (var n =
			l = $(l.target); !n.hasClass("colors_list_combo");) {
			if (n.length === 0) return false;
			n = n.parent()
		}
		var m = n.data("ColorData");
		if (l.is(".color_list_sample")) m.isOpen && n.val(l.data("Color"));
		else {
			n.data("ColorData", {
				isOpen: true,
				val: m.val
			});
			n.find(".color_list_line").removeClass("display-none-class");
			n.removeClass("colors_list_combo_closed")
		}
		return false
	})
}

function openSetupIndicatorsDialog(b) {
	currChartSetupIndicators = b;
	$setupIndicators.dialog("open")
}
var configurationObject, serverTimeOnGetConfiguration, localTimeOnGetConfiguration, setConfigurationTimer, lastConfigurationSetTime, afterSetCallback;

function getCurrentServerTimeMiliseconds() {
	var b = (new Date).getTime() - localTimeOnGetConfiguration.getTime();
	return serverTimeOnGetConfiguration.getTime() + b
}

function SetConfigurationCB(b) {
	if (afterSetCallback && typeof afterSetCallback === "function") {
		afterSetCallback();
		afterSetCallback = null
	} else if (!loggedOut) {
		var c = VerifyProperties(["Success"], b);
		if (c) {
			ReportErrors(c);
			SaveWebClientConfiguration(configurationObject, false)
		} else b.Success !== true && SaveWebClientConfiguration(configurationObject, false)
	}
}

function SetWebClientConfiguration() {
	setConfigurationTimer = null;
	if (configurationObject !== null) {
		lastConfigurationSetTime = (new Date).getTime();
		SENDImm_setWebClientConfigurationImm({
			WebClientConfiguration: JSON.stringify(configurationObject)
		}, SetConfigurationCB)
	}
}

function StopWebClientConfigurationTimer() {
	typeof setConfigurationTimer != "undefined" && setConfigurationTimer !== null && clearTimeout(setConfigurationTimer)
}

function SaveWebClientConfiguration(b, c) {
	configurationObject = b;
	typeof setConfigurationTimer != "undefined" && setConfigurationTimer !== null && clearTimeout(setConfigurationTimer);
	b = lastConfigurationSetTime + GC.CONFIG_MIN_MILISECONDS_BETWEEN_SET_CONFIG - (new Date).getTime();
	if (b < 0) SetWebClientConfiguration();
	else if (c) SetWebClientConfiguration();
	else setConfigurationTimer = setTimeout(SetWebClientConfiguration, b)
}

function SaveWebClientConfigurationIfNeeded(b) {
	if (typeof setConfigurationTimer != "undefined" && setConfigurationTimer !== null) {
		clearTimeout(setConfigurationTimer);
		afterSetCallback = b;
		SetWebClientConfiguration()
	} else typeof b === "function" && b()
}

function SetNewConfiguration() {
	SaveWebClientConfiguration({}, false)
}

function GetConfigurationCB(b) {
	lastConfigurationSetTime = 0;
	if (!VerifyProperties(["Success", "WebClientConfiguration", "CurrentServerTime"], b)) {
		serverTimeOnGetConfiguration = stdFormatToDate(b.CurrentServerTime);
		localTimeOnGetConfiguration = new Date;
		if (b.Success !== true || b.WebClientConfiguration === null || b.WebClientConfiguration === "") SetNewConfiguration();
		else configurationObject = JSON.parse(b.WebClientConfiguration)
	}
}

function GetConfiguration() {
	if (typeof configurationObject == "undefined" || configurationObject === null) SENDImm_getWebClientConfigurationImm(GetConfigurationCB)
}
var EStartUpPageState = {
	Regular: 0,
	SSLOpenWithDeposit: 1,
	SSLOpenWithDepositWithBonus: 2,
	SSLOpenWithWithdraw: 3,
	OpenFundsManagement: 4,
	SSLOpenWithChangePassword: 5,
	PhoneVer: 6,
	SSLFundsManagementAllRequirements: 7,
	SSLOpenWithDepositTrustLevelUploadDocs: 8,
	SSLOpenWithWithdrawTrustLevelUploadDocs: 9,
	RegisterUser: 10
}, EStepPrerequisite = {
		None: 0,
		FullRegister: 1,
		Questionnaire: 2,
		PhoneVer: 3,
		DocumentsDeposit: 4,
		DocumentsWithdraw: 5,
		DocumentsTrustLevel: 6,
		DocumentsPhoto: 7,
		CashierInfo: 8
	}, EStartUpPageStateSecured = [EStartUpPageState.SSLOpenWithDeposit,
		EStartUpPageState.SSLOpenWithDepositWithBonus, EStartUpPageState.SSLOpenWithWithdraw, EStartUpPageState.SSLOpenWithChangePassword, EStartUpPageState.SSLFundsManagementAllRequirements, EStartUpPageState.SSLOpenWithDepositTrustLevelUploadDocs, EStartUpPageState.SSLOpenWithWithdrawTrustLevelUploadDocs
	],
	EStartUpPageStateNeedsDepositPrerequisite = [EStartUpPageState.SSLOpenWithDeposit, EStartUpPageState.SSLOpenWithDepositWithBonus, EStartUpPageState.OpenFundsManagement, EStartUpPageState.PhoneVer, EStartUpPageState.SSLFundsManagementAllRequirements,
		EStartUpPageState.SSLOpenWithDepositTrustLevelUploadDocs, EStartUpPageState.RegisterUser
	],
	EStartUpPageStateNeedsCashierInfo = [EStartUpPageState.SSLOpenWithDeposit, EStartUpPageState.SSLOpenWithDepositWithBonus, EStartUpPageState.SSLOpenWithWithdraw],
	EStartUpPageStateNeedsWithdrawPrerequisite = [EStartUpPageState.SSLOpenWithWithdraw, EStartUpPageState.SSLFundsManagementAllRequirements, EStartUpPageState.SSLOpenWithWithdrawTrustLevelUploadDocs],
	EStartUpPageStateNeedsRealMode = [EStartUpPageState.SSLOpenWithDeposit,
		EStartUpPageState.SSLOpenWithDepositWithBonus, EStartUpPageState.SSLOpenWithWithdraw, EStartUpPageState.OpenFundsManagement, EStartUpPageState.PhoneVer, EStartUpPageState.SSLFundsManagementAllRequirements, EStartUpPageState.SSLOpenWithDepositTrustLevelUploadDocs, EStartUpPageState.SSLOpenWithWithdrawTrustLevelUploadDocs, EStartUpPageState.RegisterUser
	],
	EStartUpPageStateEndFunctions = {
		Regular: function () {},
		SSLOpenWithDeposit: function () {
			$FundsManagementDiv.dialog("isOpen") || openFundsManagement(false);
			openFundsDeposit(null)
		},
		SSLOpenWithDepositWithBonus: function () {
			var b;
			b = ApplicationState.readBonus();
			b = b !== null && b.BonusEventType == EBonusEvent.OngoingDeposit ? b : GlobalDs.ShowedBonus;
			var c = null;
			if (b !== null) c = b.MinDepositAmountInUBC;
			$FundsManagementDiv.dialog("isOpen") || openFundsManagement(false);
			openFundsDeposit(c)
		},
		SSLOpenWithWithdraw: function () {
			$FundsManagementDiv.dialog("isOpen") || openFundsManagement(false);
			openFundsWithdraw()
		},
		OpenFundsManagement: function () {
			openFundsManagement(true)
		},
		SSLOpenWithChangePassword: function () {
			$ch_psw.dialog("open")
		},
		PhoneVer: function () {
			OpenPhoneValidation()
		},
		SSLFundsManagementAllRequirements: function () {
			openFundsManagement(false)
		},
		SSLOpenWithDepositTrustLevelUploadDocs: function () {
			$FundsManagementDiv.dialog("isOpen") || openFundsManagement(false);
			openFundsDeposit(null)
		},
		SSLOpenWithWithdrawTrustLevelUploadDocs: function () {
			$FundsManagementDiv.dialog("isOpen") || openFundsManagement(false);
			openFundsWithdraw()
		},
		RegisterUser: function () {}
	}, EStepPrerequisiteFunctions = {
		None: function () {},
		FullRegister: function () {
			openAccountRegistration()
		},
		Questionnaire: function () {
			chooseStepAndOpenAccountRegistration(2)
		},
		PhoneVer: function () {
			OpenPhoneValidation()
		},
		DocumentsDeposit: function () {
			openUploadDocs(new RequiredFilesStatuses(ERequiredFilesStatusesType.Deposit))
		},
		DocumentsWithdraw: function () {
			openUploadDocs(new RequiredFilesStatuses(ERequiredFilesStatusesType.Withdraw))
		},
		DocumentsTrustLevel: function () {
			openUploadDocs(new RequiredFilesStatuses(ERequiredFilesStatusesType.TrustLevelUpgrade))
		},
		DocumentsPhoto: function () {
			openUploadDocs(new RequiredFilesStatuses(ERequiredFilesStatusesType.AllFiles), [EUserFileType.PhotoID])
		},
		CashierInfo: function () {
			getCashierInfo()
		}
	}, startUpFlow = {
		nextAction: EStepPrerequisite.None,
		isUserInitiated: false
	};
startUpFlow.getNextPrerequisiteStep = function () {
	var b = ApplicationState.readStartUpPageState();
	if (b === null) return EStepPrerequisite.None;
	var c = $.inArray(b, EStartUpPageStateNeedsDepositPrerequisite) != -1,
		d = $.inArray(b, EStartUpPageStateNeedsCashierInfo) != -1;
	if (c) {
		c = startUpFlow.getNextDepositPrerequisiteStep(d);
		if (c == EStepPrerequisite.DocumentsDeposit && (b == EStartUpPageState.OpenFundsManagement || b == EStartUpPageState.RegisterUser)) c = EStepPrerequisite.None;
		if (c != EStepPrerequisite.None) return c
	}
	if ($.inArray(b,
		EStartUpPageStateNeedsWithdrawPrerequisite) != -1) {
		c = startUpFlow.getNextWithdrawPrerequisiteStep(d);
		if (c != EStepPrerequisite.None) return c
	}
	if ((b == EStartUpPageState.SSLOpenWithDepositTrustLevelUploadDocs || b == EStartUpPageState.SSLOpenWithWithdrawTrustLevelUploadDocs) && !uploadDocsPassed) return EStepPrerequisite.DocumentsTrustLevel;
	return EStepPrerequisite.None
};
startUpFlow.getNextDepositPrerequisiteStep = function (b) {
	var c = GlobalDs.RegulationStatus == EUserRegulationStatus.RegulatedNotReviewed || GlobalDs.RegulationStatus == EUserRegulationStatus.Regulated;
	if (!GlobalDs.IsDepositPrerequisiteFullFilled(EFlowPrerequisite.FullRegister) && !c) return EStepPrerequisite.FullRegister;
	else {
		if (!GlobalDs.IsDepositPrerequisiteFullFilled(EFlowPrerequisite.Questionnaire) && !c) return EStepPrerequisite.Questionnaire;
		else if (!GlobalDs.IsDepositPrerequisiteFullFilled(EFlowPrerequisite.Documents)) return EStepPrerequisite.DocumentsDeposit;
		if (b) {
			if (!GlobalDs.HasCashierInfo) return EStepPrerequisite.CashierInfo;
			if ((GlobalDs.CashierInfo.IsNeedPhoneVerificationBeforeDeposit || GlobalDs.CashierInfo.depositFailedPhoneVerifyNeeded) && !GlobalDs.PersonalInfo.IsPhoneValidated) return EStepPrerequisite.PhoneVer
		}
	}
	return EStepPrerequisite.None
};
startUpFlow.getNextWithdrawPrerequisiteStep = function (b) {
	var c = GlobalDs.RegulationStatus == EUserRegulationStatus.RegulatedNotReviewed || GlobalDs.RegulationStatus == EUserRegulationStatus.Regulated;
	if (!GlobalDs.IsWithdrawPrerequisiteFullFilled(EFlowPrerequisite.FullRegister) && !c) return EStepPrerequisite.FullRegister;
	else {
		if (!GlobalDs.IsWithdrawPrerequisiteFullFilled(EFlowPrerequisite.Questionnaire) && !c) return EStepPrerequisite.Questionnaire;
		else if (!GlobalDs.IsWithdrawPrerequisiteFullFilled(EFlowPrerequisite.Documents)) return EStepPrerequisite.DocumentsWithdraw;
		if (b) {
			if (!GlobalDs.HasCashierInfo) return EStepPrerequisite.CashierInfo;
			if (GlobalDs.CashierInfo.IsNeedPhoneVerificationBeforeWithdraw && !GlobalDs.PersonalInfo.IsPhoneValidated) return EStepPrerequisite.PhoneVer
		}
	}
	return EStepPrerequisite.None
};
startUpFlow.abortFlowIfFailed = function () {
	var b = startUpFlow.getNextPrerequisiteStep();
	if (startUpFlow.nextAction == b && startUpFlow.nextAction != EStepPrerequisite.None && startUpFlow.nextAction !== null) {
		clearStartUpPageStateCookie();
		ApplicationState.writeStartUpPageState(EStartUpPageState.Regular);
		startUpFlow.returnToNonSecureIfCurrentlySecure()
	}
};
startUpFlow.continueFlow = function () {
	var b = ApplicationState.readStartUpPageState();
	if (b !== null) {
		var c = startUpFlow.needsToBeSecured(b) != startUpFlow.currentSecured(),
			d = $.inArray(b, EStartUpPageStateNeedsRealMode) != -1;
		if ((d = d != GlobalDs.IsRealMode && d) || c)
			if (startUpFlow.isUserInitiated) {
				startUpFlow.saveState();
				d ? switchToReal() : startUpFlow.reloadCurrentPage()
			} else alertDialog(ALERT_TYPE.atError, LangJSDict.strREASON_ServerError, false, null, null);
			else {
				startUpFlow.nextAction = startUpFlow.getNextPrerequisiteStep();
				if (startUpFlow.nextAction != EStepPrerequisite.None) EStepPrerequisiteFunctions[EStepPrerequisiteToString(startUpFlow.nextAction)]();
				else {
					uploadDocsPassed = false;
					ApplicationState.writeStartUpPageState(null);
					EStartUpPageStateEndFunctions[EStartUpPageStateToString(b)]()
				}
			}
	}
};
startUpFlow.needsToBeSecured = function (b) {
	var c = false;
	if ($.inArray(b, EStartUpPageStateSecured) != -1) c = true;
	if (StringToEDeployEnvironemntType(LangJSDict.jsDeployEnv) == EDeployEnvironemnt.Local) c = false;
	return c
};
startUpFlow.currentSecured = function () {
	return window.location.protocol.toLowerCase() == "https:"
};
startUpFlow.reloadCurrentPage = function () {
	var b = ApplicationState.readStartUpPageState();
	b = startUpFlow.needsToBeSecured(b);
	var c = startUpFlow.currentSecured();
	if (b == c) {
		OpenProcessingForm();
		window.location.reload(true)
	} else {
		b ? OpenProcessingForm(undefined, LangJSDict.strREDIRECT_TO_SECURE_SITE) : OpenProcessingForm();
		c = window.location.href.substring(window.location.href.indexOf("//"));
		c = (b ? "https:" : "http:") + c;
		window.location.assign(c)
	}
};
startUpFlow.saveState = function () {
	ApplicationState.readStartUpPageState() === EStartUpPageState.SSLOpenWithDepositWithBonus && setBonusCookies(ApplicationState.bonus);
	ApplicationState.readStartUpPageState() != EStartUpPageState.Regular && ApplicationState.readStartUpPageState() !== null && writeStartUpPageStateCookie(ApplicationState.readStartUpPageState())
};
startUpFlow.returnToNonSecureIfCurrentlySecure = function () {
	if (startUpFlow.currentSecured() && !startUpFlow.needsToBeSecured(EStartUpPageState.Regular)) {
		clearStartUpPageStateCookie();
		ApplicationState.writeStartUpPageState(EStartUpPageState.Regular);
		startUpFlow.reloadCurrentPage()
	}
};
$(document).ready(function () {});

function runStartUpFlow(b, c) {
	if (typeof c == "undefined") c = true;
	uploadDocsPassed = false;
	startUpFlow.isUserInitiated = c;
	GlobalDs.emptyCashierInfo();
	ApplicationState.writeStartUpPageState(b);
	startUpFlow.continueFlow()
}
var StringToEStartUpPageState = GenericStringToEnum(EStartUpPageState, "EStartUpPageState"),
	EStartUpPageStateToString = GenericEnumToString(EStartUpPageState, "EStartUpPageState"),
	StringToEStepPrerequisite = GenericStringToEnum(EStepPrerequisite, "EStepPrerequisite"),
	EStepPrerequisiteToString = GenericEnumToString(EStepPrerequisite, "EStepPrerequisite");