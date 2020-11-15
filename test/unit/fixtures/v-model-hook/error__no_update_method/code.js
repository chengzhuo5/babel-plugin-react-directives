const A = () => {
  const [data] = useState(0)
  return <input v-model-hook={data}/>
}
