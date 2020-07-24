<script>
	import { onMount } from 'svelte';
  	import { stores } from "@sapper/app";
	const { session } = stores();
	export let segment;
	let user = null;
	onMount(() => {
		user = $session.user;
		console.log($session);
		console.log($session.user);
		console.log(user);
	});
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		width: max-content;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	.user-info{
		text-decoration: none;
		padding: 1em 0.5em;
		display: flex;
		align-items: center;
		float: right;
	}

	.user-info > img {
		height: 2rem;
		width: 2rem;
		border-radius: 100%;
		margin-left: 1rem;
	}

</style>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>
		<li><a rel=prefetch aria-current="{segment === 'article' ? 'page' : undefined}" href="article">articles</a></li>
		{#if !user}
			<li><a rel=prefetch aria-current="{segment === 'login' ? 'page' : undefined}" href="login">login</a></li>
		{/if}
		{#if user}
			<li class="user-info">
				Welcome, {user.firstname}
				<img src="http://localhost:1337{user.avatar.url}" alt="avatar"/>
			</li>
		{/if}
	</ul>
</nav>

