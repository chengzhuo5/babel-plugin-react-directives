const A = () => {
  const [setData, data] = useState(0)
  return <input v-model-hook={data}/>
}
