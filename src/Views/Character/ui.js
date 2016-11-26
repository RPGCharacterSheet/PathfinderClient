export default [
  {
    title: 'Name',
    styles: { border: '2px solid black' },
    editable: 'updateCharacter',
    content: '$Name'
  },
  {
    title: 'Abilities',
    styles: { border: '2px solid blue' },
    content: {
      styles: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' },
      content: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'].map(Ability)
    }
  }
]

function Ability (ab) {
  return {
    title: ab,
    content: [
      {
        title: 'Score',
        styles: { margin: '0 2px' },
        editable: 'updateCharacterAbility',
        content: `$AbilityScores.${ab}`
      },
      {
        title: 'Modifier',
        styles: { margin: '0 2px' },
        content: `$AbilityModifiers.${ab}`
      }
    ]
  }
}
