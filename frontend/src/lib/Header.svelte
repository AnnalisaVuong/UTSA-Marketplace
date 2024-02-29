<script>
  import { readable } from "svelte/store";

  /** @type {HTMLAnchorElement} link */
  let link;

  $: linkHeight = link && (link.clientHeight / 6).toString();
</script>

<header>
  <div>
    <h1>Rowdy Marketplace</h1>
    <nav>
      <a bind:this={link} href="/login" style:line-height={linkHeight}>Log In</a
      >
    </nav>
  </div>
</header>

<style>
  header {
    background-color: inherit;
    background-color: #0c2340;
    color: #ffffff;
    padding: 1em 15vw;
  }
  h1 {
    margin: auto 0;
    font-size: 1.5rem;
  }
  header > div {
    display: flex;
    justify-content: space-between;
  }
  a {
    text-decoration: none;
    padding: 0;
    color: #ffffff;
    display: block;
    /*line-height: 40px;*/
  }
  a:hover {
    color: #f15a22;
  }
</style>
