const A = () => {
  const [data, setData] = Preact.useState(0)
  return <input v-model-hook={data}/>
}
