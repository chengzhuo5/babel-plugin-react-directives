const a = (
  <div v-if={item.name === 'foo'} v-for={item in list} key={item.id}>
    {item.name}
  </div>
)
