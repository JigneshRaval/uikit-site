import {reduce} from 'lodash-es';
import highlight from 'highlight.js';
import marked from './markdown';


export default {

    path: '/documentation',

    component: __dirname + '/components/DocPage.vue',

    routeMap(app, data) {

        return reduce(app.resources, (map, res) => {

            if (res.path.includes('/intro/')) {
                map[res.name] = res.resource;//res.resource;
            } else if(res.type === 'UIkitComponent' || (!res.isAsset && res.path.includes('/components/') )) {
                map['component/' + res.name] = res.resource;//res.resource;
            }
            return map;
        }, {});

    },

    highlight(code, lang, frame) {

        // console.log('lang', lang);

        if (!lang) {
            console.warn('you should define needed languages for highlighting');
        }

        const html = lang ? highlight.highlight(lang, code).value : highlight.highlightAuto(code).value;
        return frame ? `<pre><code class="language-${lang}">${html}</code></pre>` : html;

    },

    markdown(markdown) {

        const text = marked(markdown, {
            highlight: (code, lang) => {
                return this.highlight(code, lang || 'html');
            }
        });
        return text;

    },

    postProcess(app, html, desc) {

        html = html.replace(/src="\.\//g, `src="${app.config.base}/`);
        html = html.replace(/src="\.\.\/docs/g,`src="${app.config.base}/docs"` );
        html = html.replace(/src="\.\.\/assets\/uikit/g,`src="${app.config.base}"` );
        html = html.replace(/src="\.\.\/images\//g,`src="/images/` );

        return html;

    }

}