<script>
  import HeaderDropdown from "./HeaderDropdown.svelte";
  import { dropdownHeight } from "./stores.js";

  // Height of the dropdown menu in pixels
  const DROPDOWN_HEIGHT = 300;

  let innerWidth = 0;
  $: isUndersize = innerWidth < 850;

  $: adjustUndersize(isUndersize);

  let dropdownToggled = false;

  function toggleDropdown() {
    dropdownHeight.update(
      (height) =>
        height + (!dropdownToggled ? DROPDOWN_HEIGHT : -DROPDOWN_HEIGHT),
    );
    dropdownToggled = !dropdownToggled;
  }

  /** @param {boolean} isUndersize */
  function adjustUndersize(isUndersize) {
    if (!isUndersize) {
      dropdownHeight.set(0);
      dropdownToggled = false;
    }
  }
</script>

<svelte:window bind:innerWidth />

<div class="container">
  <h1>Rowdy Marketplace</h1>
  {#if !isUndersize}
    <div class="header-options">
      <a href="/home">Home</a>
      <a href="/features">Features</a>
      <a href="/overview">Overview</a>
    </div>
    <a href="/login">Log In</a>
  {:else}
    <button on:click={toggleDropdown}>Toggle Modal</button>
  {/if}
</div>

<HeaderDropdown />

<style>
  a {
    text-decoration: none;
    color: #ffffff;
  }

  .container {
    display: flex;
    justify-content: space-between;
    background-color: #0c2340;
    color: #ffffff;
    padding: 1em 8vw;
  }

  .container > h1 {
    margin: auto 0;
    font-size: 2rem;
  }

  .container > a {
    border: 2px solid #ffffff;
    border-radius: 5px;
    padding: 10px 25px;
  }

  a:hover {
    color: #f15a22;
    border-color: #f15a22;
  }

  .header-options {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4em;
    flex: 1;
  }

  .header-options {
    flex: 1;
  }

  @media (max-width: 800px) {
    .container > h1 {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 370px) {
    .container > h1 {
      font-size: 1rem;
    }
  }
</style>
