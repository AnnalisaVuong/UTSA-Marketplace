<script>
  import { dropdownHeight } from "./stores.js";
</script>

<div>
  <div class="dropdown" style="height: {$dropdownHeight}px">
    <a href="/home">Home</a>
    <a href="/features">Features</a>
    <a href="/overview">Overview</a>
  </div>
</div>

<style>
  @media (min-width: 600px) and (max-width: 800px) {
    div > .dropdown {
      width: 80vw;
    }
  }
  .dropdown {
    bottom: 4px;
    border: none;
    border-radius: 6px;
    display: flex;
    width: 90vw;
    background-color: #0c2340;
    margin: 0 auto;
    position: relative;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    overflow: hidden;
  }
  a {
    text-decoration: none;
    font-weight: 600;
    margin-left: 10%;
    color: #ffffff;
  }
</style>
