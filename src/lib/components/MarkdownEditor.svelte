<script>
    import Editor from "@deboxsoft/svelte-markdown/Editor.svelte";
    import {loadPlugins} from "@deboxsoft/svelte-markdown/load-plugins"
    import "@deboxsoft/svelte-markdown/main.css";
    import "highlight.js/styles/vs.css";
    import {getFormContext} from "@deboxsoft/svelte-form";
    import {writable} from "svelte/store";

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

    const { fields = writable({}) } = getFormContext() || {};

    export let name;
    export let sanitize = undefined;
    export let placeholder = undefined;
    export let editorConfig = {};
    export let value = $fields[name] ||  "";
    export let mode = "auto"
    export let localeKey = "en"
    export let uploadImages = (files) => Promise.all();
    // keep not undefined
    if (!$fields[name]) $fields[name] = value

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

    function changeHandler({detail}) {
        $fields[name] = value = detail.value || "";
    }
</script>

<Editor {...$$restProps} {plugins} bind:value={$fields[name]} {mode} locale={{...locales[localeKey], save: 'save', cancel: 'cancel'}} on:change={changeHandler} {sanitize} {placeholder} {editorConfig}>
    <slot name="header" slot="header" />
    <slot />
</Editor>
