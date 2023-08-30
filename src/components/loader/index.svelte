<script>
  // stroke="#266ed9"
</script>

<svg
  class={$$props.class || "icon"}
  viewBox="0 0 100 100"
  preserveAspectRatio="xMidYMid"
>
  <circle
    cx="50"
    cy="50"
    fill="none"
    stroke-width="8"
    stroke="#464646"
    r="35"
    stroke-dasharray="164.93361431346415 56.97787143782138"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      repeatCount="indefinite"
      dur="1s"
      values="0 50 50;360 50 50"
      keyTimes="0;1"
    />
  </circle>
</svg>

<style>
  .icon {
    width: 40px;
    height: 40px;
  }
</style>
