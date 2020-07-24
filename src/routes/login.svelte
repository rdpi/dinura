<script>
  import { goto, stores } from "@sapper/app";
  const { session } = stores();

  let password = "";
  let identifier = "";
  let error;

  const handleLogin = async () => {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ identifier, password })
    });

    const parsed = await response.json();

    if (parsed.error) {
      error = parsed.error;
    } else {
      $session.token = parsed.token;
      $session.user = parsed.user
      goto("/");
    }
  };
</script>

<div class="login-form">
  <form on:submit|preventDefault={handleLogin} method="post">
    <label>
      Email:
      <input type="email" bind:value={identifier} />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} />
    </label>
    <button type="submit">Login</button>
  </form>

  {#if error}
    <p>{error}</p>
  {/if}
</div>
<style>
  .login-form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  form{
    display: flex;
    flex-direction: column;
  }
</style>