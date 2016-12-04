export default [
  // <summary>
  // This stat will grow by floor(2 + level/2)
  // </summary>
  function Good(level) { return Math.floor(2 + level/2) },
  // <summary>
  // This stat will grow by floor(level/3)
  // </summary>
  function Poor(level){ return Math.floor(level/3) }
]
