<script>
    import Viewer from "@deboxsoft/svelte-markdown/Viewer.svelte";
    import {loadPlugins} from "@deboxsoft/svelte-markdown/load-plugins";


    function stripPrefixes(obj) {
        return Object.entries(obj).reduce((p, [key, value]) => {
            p[key.split("/").slice(-1)[0].replace(".json", "")] = value;
            return p;
        }, {});
    }
    const locales = stripPrefixes(import.meta.glob("/node_modules/bytemd/locales/*.json", { eager: true }));
    const gfmLocales = stripPrefixes(
        import.meta.glob("/node_modules/@bytemd/plugin-gfm/locales/*.json", {
            eager: true
        })
    );
    const mathLocales = stripPrefixes(
        import.meta.glob("/node_modules/@bytemd/plugin-math/locales/*.json", {
            eager: true
        })
    );
    const mermaidLocales = stripPrefixes(
        import.meta.glob("/node_modules/@bytemd/plugin-mermaid/locales/*.json", {
            eager: true
        })
    );
    export let localeKey = "id";
    export let value = "";
    $: plugins = loadPlugins({
        embed: true,
        gfm: true,
        breaks: true,
        math: true,
        "medium-zoom": true,
        gemoji: true,
        frontmatter: true,
        highlight: true,
        mermaid: true,
        localeKey,
        gfmLocales,
        mathLocales,
        mermaidLocales
    });

</script>
<div class="markdown-viewer ">
    <Viewer {plugins} {value}  />
</div>

<style lang="postcss">
     .markdown-viewer > :global(.markdown-body) {
        background-color: var(--color-markdown-viewer-bg, theme("colors.gray.100"));
     }
</style>
