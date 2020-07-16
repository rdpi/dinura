<script>
	import { onMount } from 'svelte';
    import ArticleSnippet from './ArticleSnippet.svelte';
    

    let articles = [];
    onMount(async () => {
		const res = await fetch(`http://localhost:1337/articles`);
        articles = await res.json();
        console.log(articles);
	});
</script>

<main>
    {#each articles as article}
    <div class="snippet">
        <ArticleSnippet {article}/>
    </div>
    {/each}
</main>

<style>
    main{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .snippet{
        padding: 1rem;
    }
</style>