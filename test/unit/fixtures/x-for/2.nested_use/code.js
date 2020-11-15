const a = (
  <div v-for={item in list} key={item.id}>
    <p v-for={i in item} key={i}>{i}</p>
  </div>
)
