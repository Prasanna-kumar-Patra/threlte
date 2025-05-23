!(function () {
  'use strict'
  let e
  self.window = self
  const s = new Promise((s) => {
    e = s
  })
  self.addEventListener('message', async (c) => {
    switch (c.data.type) {
      case 'init':
        importScripts(c.data.svelteUrl + '/compiler.js'), e()
        break
      case 'compile':
        await s,
          postMessage(
            (function ({ id: e, source: s, options: c }) {
              try {
                const { js: n, css: i } = svelte.compile(s, Object.assign({}, t, c))
                return {
                  id: e,
                  result: {
                    js: n.code,
                    css: i.code || '/* Add a <style> tag to see compiled CSS */'
                  }
                }
              } catch (s) {
                let t = '/* Error compiling component\n\n' + s.message
                return (
                  s.frame && (t += '\n' + s.frame),
                  (t += '\n\n*/'),
                  { id: e, result: { js: t, css: t } }
                )
              }
            })(c.data)
          )
    }
  })
  const t = { dev: !1, css: !1 }
})()
