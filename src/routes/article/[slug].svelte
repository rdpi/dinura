<script context="module">
	import marked from 'marked';

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`http://localhost:1337/articles/${params.slug}`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
	let featuredImg;
	console.log(post.featured[0])
	if(post && post.featured[0] && post.featured[0].formats.medium){
		featuredImg = post.featured[0].formats.medium.url;
	}
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content{
		max-width: 50em;
		margin: auto;
	}
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}

	img, .content :global(img) {
		width: 100%
	}

	.biline{
		margin: 1rem 0rem;
		display: flex;
		align-items: center
	}

	img.author-avatar{
		height: 2.5rem;
		width: 2.5rem;
		border: 1px solid lightgrey;
		border-radius: 100%;
		margin-right: .5rem;
	}
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<div class="content">
	<h1>{post.title}</h1>
	<h2>{post.subtitle}</h2>
	<div class="biline">
		<img class="author-avatar" src="http://localhost:1337{post.author.avatar.formats.small.url}" alt=""/>
		<span>{`${post.author.firstname} ${post.author.lastname} - ${post.created_at}`}</span>
	</div>

	{#if featuredImg !== null}
	<img class="featured" src={`http://localhost:1337${featuredImg}`} alt=""/>
	{/if}
	{@html marked(post.content)}
</div>
