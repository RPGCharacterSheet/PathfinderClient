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
  },
  {
    title: 'Initiative',
    styles: { border: '2px solid green' },
    content: '$Initiative'
  },
  {
    title: 'Saves',
    styles: { },
    content: [
      {
        title: 'Fort Save',
        content: '$FortSave'
      },
      {
        title: 'Will Save',
        content: '$WillSave'
      },
      {
        title: 'Reflex Save',
        content: '$ReflexSave'
      }
    ]
  }
]

function Ability (ab) {
  return {
    title: ab,
    content: [
      {
        title: 'Score',
        styles: { margin: '0 2px', display: 'block' },
        editable: 'updateCharacterAbility',
        content: `$AbilityScores.${ab}`
      },
      {
        title: 'Modifier',
        styles: { margin: '0 2px', display: 'block' },
        content: `$AbilityModifiers.${ab}`
      }
    ]
  }
}
