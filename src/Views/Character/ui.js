export default [
  {
    title: 'Name',
    styles: { border: '2px solid black' },
    content: '$Name'
  },
  {
    title: 'Abilities',
    styles: { border: '2px solid blue' },
    content: [
      {
        title: 'Strength',
        content: [
          { 
            title: 'Score',
            styles: { margin: '0 2px' },
            content: '$AbilityScores.Strength'
          },
          { 
            title: 'Modifier',
            styles: { margin: '0 2px' },
            content: '$AbilityModifiers.Strength'
          }
        ]
      }
    ]
  }
]