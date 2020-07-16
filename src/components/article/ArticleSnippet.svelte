<script>
    export let article;
    let thumbnail = article.featured[0].formats.small.url;
</script>

<main>
    <a href={`/article/${article.id}`}>
        <img src={`http://localhost:1337${thumbnail}`} alt=""/>
        <div class="headline">
            <h3>{article.headline}</h3>
        </div>
    </a>
</main>

<style type="text/scss" lang="scss">
    main{
        border: 1px solid lightgrey;
        width: 20rem;
        height: 25rem;
        
    }
    main:hover{
        border: 1px solid darkgray;
    }
    img{
        width:20rem;
        height:15rem;
    }
    .headline{
        padding: 1rem;
    }
    h3{
        font-weight: bold;
    }
    a{
        text-decoration: none;
    }
</style>